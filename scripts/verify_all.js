import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  analyzeBuildLocal,
  buildBestForBudgetLocal,
  synthesizePartFromQuery
} from '../public/js/hardware_engine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runVerification() {
  console.log('🔍 Starting Full Build & Functional Verification for AI PC Builder Pro...');

  const catalogPath = path.join(__dirname, '..', 'public', 'data', 'hardware_catalog.json');
  if (!fs.existsSync(catalogPath)) {
    throw new Error('hardware_catalog.json is missing!');
  }

  const catalogData = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const cats = catalogData.categories;
  const requiredCategories = ['cpu', 'motherboard', 'gpu', 'ram', 'storage', 'cooler', 'psu', 'case', 'monitor'];

  for (const c of requiredCategories) {
    if (!Array.isArray(cats[c]) || cats[c].length === 0) {
      throw new Error(`Category ${c} is empty or missing!`);
    }
    for (const part of cats[c]) {
      if (!part.amazonUrl || !part.amazonUrl.startsWith('https://www.amazon.com/s?k=')) {
        throw new Error(`Invalid Amazon URL for part ${part.name}`);
      }
      if (!part.manufacturerUrl || !part.manufacturerUrl.startsWith('http')) {
        throw new Error(`Invalid Manufacturer URL for part ${part.name}`);
      }
    }
    console.log(`  ✓ Category [${c}]: ${cats[c].length} parts verified (USD prices + Amazon + Official Manufacturer URLs)`);
  }

  // Test Service 1: AI Custom Build Analyzer
  const sampleBuild = {
    cpu: cats.cpu[0],
    motherboard: cats.motherboard[0],
    gpu: cats.gpu[0],
    ram: cats.ram[0],
    storage: cats.storage[0],
    cooler: cats.cooler[0],
    psu: cats.psu[0],
    case: cats.case[0],
    monitor: cats.monitor[0]
  };
  const analysis = analyzeBuildLocal(sampleBuild);
  if (!analysis.isFullyCompatible) {
    throw new Error('Default flagship build should be 100% compatible!');
  }
  if (analysis.gaming.gamesFps.length !== 5) {
    throw new Error('Expected 5 games in FPS benchmark table!');
  }
  console.log(`  ✓ Service 1 (AI Build Analyzer): Gaming ${analysis.gaming.rating}/100, Workstation ${analysis.workstation.rating}/100, Bottleneck ${analysis.bottleneck.percentage}%, Total $${analysis.totalCostUSD}`);

  // Test Service 2: Smart Budget Auto-Builder across all budgets
  for (const budget of [750, 1200, 2000, 3500, 5000]) {
    for (const use of ['gaming', 'programming', 'montage', 'ultimate']) {
      const bResult = buildBestForBudgetLocal(cats, budget, use, true);
      if (!bResult.analysis.isFullyCompatible) {
        throw new Error(`Budget build for $${budget} (${use}) had compatibility issue!`);
      }
    }
  }
  console.log('  ✓ Service 2 (AI Smart Budget Auto-Builder): Verified $750, $1200, $2000, $3500, $5000 across all 4 use-cases with 100% socket & DDR compatibility');

  // Test Live AI Part Finder
  const customPart = synthesizePartFromQuery('ASUS ROG Crosshair X870E Extreme', 'motherboard');
  if (!customPart.amazonUrl.includes('amazon.com') || customPart.manufacturerDomain !== 'rog.asus.com') {
    throw new Error('Live AI Part Finder failed URL synthesis!');
  }
  console.log(`  ✓ Live AI Part Finder verified: ${customPart.name} ($${customPart.price}) -> ${customPart.manufacturerDomain}`);

  console.log('✅ ALL TESTS PASSED WITH ZERO ERRORS!');
}

runVerification().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
