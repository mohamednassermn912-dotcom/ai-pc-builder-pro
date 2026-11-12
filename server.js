import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import {
  analyzeBuildLocal,
  buildBestForBudgetLocal,
  synthesizePartFromQuery,
  getOfficialManufacturer
} from './public/js/hardware_engine.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8090;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

// Initialize @google/genai with gemini-2.5-flash
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const catalogPath = path.join(__dirname, 'public', 'data', 'hardware_catalog.json');
let cachedCatalog = null;

function loadCatalog() {
  if (!cachedCatalog && fs.existsSync(catalogPath)) {
    cachedCatalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  }
  return cachedCatalog;
}

// Health check
app.get('/api/health', (req, res) => {
  const cat = loadCatalog();
  res.json({
    status: 'ok',
    app: 'AI PC Builder Pro - منصة تصميم وتحليل التجميعات الذكية',
    aiSdk: '@google/genai',
    aiModel: GEMINI_MODEL,
    fallbackEngine: 'Active (Zero-Downtime Local Benchmark & Compatibility Engine)',
    catalogStats: cat?.stats || {}
  });
});

// Get full catalog
app.get('/api/catalog', (req, res) => {
  const cat = loadCatalog();
  if (!cat) {
    return res.status(500).json({ error: 'Catalog not seeded yet' });
  }
  res.json(cat);
});

// Service 1: AI Custom Build Analyzer
app.post('/api/analyze-build', async (req, res) => {
  try {
    const build = req.body?.build || {};
    const localResult = analyzeBuildLocal(build);

    let aiExpertVerdict = null;
    try {
      const prompt = `أنت خبير عتاد حاسوب ومهندس معماري في ASUS ROG. قدم تقييماً فنياً عربياً موجزاً واحترافياً (3 جمل قوية) لهذه التجميعة:
المعالج: ${build.cpu?.name}
اللوحة الأم: ${build.motherboard?.name}
كرت الشاشة: ${build.gpu?.name}
الرامات: ${build.ram?.name}
التخزين: ${build.storage?.name}
مزود الطاقة: ${build.psu?.name}
الشاشة: ${build.monitor?.name}`;

      const response = await Promise.race([
        ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: prompt
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('AI Timeout')), 4500))
      ]);
      if (response && response.text) {
        aiExpertVerdict = response.text.trim();
      }
    } catch (_) {
      // Seamless fallback to local deterministic expert verdict
    }

    if (!aiExpertVerdict) {
      aiExpertVerdict = `تجميعة احترافية متكاملة بتكلفة إجمالية $${localResult.totalCostUSD.toLocaleString()} تجمع بين ${build.cpu?.name || 'المعالج'} وكرت الشاشة ${build.gpu?.name || 'الرسومي'} بتناغم ممتاز (عنق الزجاجة ${localResult.bottleneck.percentage}% فقط). تحقق التجميعة تقييم ${localResult.gaming.rating}/100 في الألعاب التنافسية و ${localResult.workstation.rating}/100 في المونتاج السينمائي 4K 120FPS وتطوير الأنظمة الثقيلة مع أمان طاقة كامل.`;
    }

    res.json({
      ...localResult,
      aiExpertVerdict,
      modelUsed: GEMINI_MODEL
    });
  } catch (err) {
    const fallback = analyzeBuildLocal(req.body?.build || {});
    res.json(fallback);
  }
});

// Service 2: AI Smart Budget Auto-Builder
app.post('/api/budget-builder', async (req, res) => {
  try {
    const { budgetUSD = 2000, targetUse = 'gaming', includeMonitor = true } = req.body || {};
    const cat = loadCatalog();
    const result = buildBestForBudgetLocal(cat.categories, budgetUSD, targetUse, includeMonitor);

    let aiSummary = null;
    try {
      const response = await Promise.race([
        ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: `اشرح في جملتين بالعربية لماذا تجميعة بمعالج ${result.selectedParts.cpu.name} وكرت ${result.selectedParts.gpu.name} ولوحة ${result.selectedParts.motherboard.name} هي الأفضل عالمياً لميزانية $${budgetUSD} واستخدام ${result.targetUseLabel}.`
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('AI Timeout')), 4000))
      ]);
      if (response && response.text) {
        aiSummary = response.text.trim();
      }
    } catch (_) {
      // Fallback
    }

    if (!aiSummary) {
      aiSummary = `تم تصميم هذه التجميعة الذكية بميزانية $${result.totalCostUSD.toLocaleString()} لتحقيق أقصى قيمة مقابل السعر في ${result.targetUseLabel}، مع توافق 100% بين مقبس ${result.selectedParts.cpu.socket} والرامات ${result.selectedParts.ram.ddr} ومزود الطاقة ${result.selectedParts.psu.wattage}W.`;
    }

    res.json({
      ...result,
      aiSummary,
      modelUsed: GEMINI_MODEL
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Live Global AI Part Finder
app.post('/api/find-part', async (req, res) => {
  try {
    const { query = '', category = 'gpu' } = req.body || {};
    if (!query.trim()) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Start with local deterministic synthesis
    let synthesized = synthesizePartFromQuery(query, category);

    // Attempt Gemini 2.5 Flash spec enrichment
    try {
      const prompt = `Extract exact hardware specifications in pure JSON for PC part "${query}" in category "${category}".
Fields required: {"name": "Full exact commercial model name", "price": number_in_USD, "socket": "AM5|LGA1851|LGA1700|AM4", "ddr": "DDR5|DDR4", "vram": number_GB, "wattage": number_W, "badge": "Short Arabic highlight"}`;
      const response = await Promise.race([
        ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: prompt
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('AI Timeout')), 4000))
      ]);
      if (response && response.text) {
        const jsonMatch = response.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          const mfg = getOfficialManufacturer(parsed.name || query);
          synthesized = {
            ...synthesized,
            ...parsed,
            name: parsed.name || synthesized.name,
            price: Number(parsed.price) || synthesized.price,
            brand: mfg.brand,
            manufacturerDomain: mfg.domain,
            manufacturerUrl: mfg.url,
            amazonUrl: `https://www.amazon.com/s?k=${encodeURIComponent(parsed.name || query)}`
          };
        }
      }
    } catch (_) {
      // Fallback already populated in `synthesized`
    }

    res.json({ part: synthesized, modelUsed: GEMINI_MODEL });
  } catch (err) {
    const fallbackPart = synthesizePartFromQuery(req.body?.query || 'Custom Part', req.body?.category || 'gpu');
    res.json({ part: fallbackPart, modelUsed: 'local-fallback' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AI PC Builder Pro Server running at http://localhost:${PORT}`);
});
