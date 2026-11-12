// ============================================================================
// AI PC BUILDER PRO - CORE HARDWARE BENCHMARK, COMPATIBILITY & FALLBACK ENGINE
// Works seamlessly in both Node.js (Backend) and Browser (Client)
// ============================================================================

export function getOfficialManufacturer(name = '') {
  const n = name.toLowerCase();
  const enc = encodeURIComponent(name);

  if (n.includes('rog') || n.includes('strix') || n.includes('crosshair') || n.includes('maximus') || n.includes('astral') || n.includes('ryujin') || n.includes('hyperion') || n.includes('thor') || n.includes('asus') || n.includes('tuf')) {
    return { brand: 'ASUS ROG', domain: 'rog.asus.com', url: `https://rog.asus.com/searchresult?searchType=products&searchKey=${enc}` };
  }
  if (n.includes('msi') || n.includes('godlike') || n.includes('suprim') || n.includes('tomahawk') || n.includes('mag ') || n.includes('mpg ') || n.includes('meg ')) {
    return { brand: 'MSI', domain: 'msi.com', url: `https://www.msi.com/search/${enc}` };
  }
  if (n.includes('gigabyte') || n.includes('aorus') || n.includes('windforce')) {
    return { brand: 'Gigabyte', domain: 'gigabyte.com', url: `https://www.gigabyte.com/Search?kw=${enc}` };
  }
  if (n.includes('asrock') || n.includes('taichi') || n.includes('steel legend') || n.includes('phantom gaming')) {
    return { brand: 'ASRock', domain: 'asrock.com', url: `https://www.asrock.com/general/search.asp?k=${enc}` };
  }
  if (n.includes('samsung') || n.includes('990 pro') || n.includes('990 evo') || n.includes('980 pro') || n.includes('odyssey')) {
    return { brand: 'Samsung', domain: 'samsung.com', url: `https://www.samsung.com/us/search/searchMain/?listType=g&searchTerm=${enc}` };
  }
  if (n.includes('corsair') || n.includes('dominator') || n.includes('vengeance') || n.includes('mp700') || n.includes('rm1000') || n.includes('rm850') || n.includes('hx1500')) {
    return { brand: 'Corsair', domain: 'corsair.com', url: `https://www.corsair.com/us/en/search?q=${enc}` };
  }
  if (n.includes('wd') || n.includes('western digital') || n.includes('sn850x') || n.includes('sn770')) {
    return { brand: 'WD Black', domain: 'westerndigital.com', url: `https://www.westerndigital.com/search?q=${enc}` };
  }
  if (n.includes('kingston') || n.includes('fury') || n.includes('kc3000') || n.includes('nv3')) {
    return { brand: 'Kingston', domain: 'kingston.com', url: `https://www.kingston.com/en/search?q=${enc}` };
  }
  if (n.includes('crucial') || n.includes('t705') || n.includes('t700') || n.includes('p3 plus')) {
    return { brand: 'Crucial', domain: 'crucial.com', url: `https://www.crucial.com/search?q=${enc}` };
  }
  if (n.includes('g.skill') || n.includes('gskill') || n.includes('trident') || n.includes('ripjaws')) {
    return { brand: 'G.Skill', domain: 'gskill.com', url: `https://www.gskill.com/products/1/165/Desktop-Memory` };
  }
  if (n.includes('amd') || n.includes('ryzen') || n.includes('radeon') || n.includes('rx ')) {
    return { brand: 'AMD', domain: 'amd.com', url: `https://www.amd.com/en/search.html?q=${enc}` };
  }
  if (n.includes('intel') || n.includes('core i') || n.includes('core ultra')) {
    return { brand: 'Intel', domain: 'intel.com', url: `https://www.intel.com/content/www/us/en/search.html#q=${enc}` };
  }
  if (n.includes('nvidia') || n.includes('geforce') || n.includes('rtx')) {
    return { brand: 'NVIDIA', domain: 'nvidia.com', url: `https://www.nvidia.com/en-us/geforce/graphics-cards/` };
  }
  if (n.includes('nzxt') || n.includes('kraken')) {
    return { brand: 'NZXT', domain: 'nzxt.com', url: `https://nzxt.com/search?q=${enc}` };
  }
  if (n.includes('seasonic') || n.includes('vertex')) {
    return { brand: 'Seasonic', domain: 'seasonic.com', url: `https://seasonic.com/` };
  }
  if (n.includes('lian li') || n.includes('o11') || n.includes('galahad')) {
    return { brand: 'Lian Li', domain: 'lian-li.com', url: `https://lian-li.com/?s=${enc}` };
  }
  if (n.includes('hyte') || n.includes('y70') || n.includes('y60')) {
    return { brand: 'Hyte', domain: 'hyte.com', url: `https://hyte.com/search?q=${enc}` };
  }
  if (n.includes('sabrent') || n.includes('rocket')) {
    return { brand: 'Sabrent', domain: 'sabrent.com', url: `https://sabrent.com/pages/search-results-page?q=${enc}` };
  }
  if (n.includes('lexar') || n.includes('nm790')) {
    return { brand: 'Lexar', domain: 'lexar.com', url: `https://www.lexar.com/?s=${enc}` };
  }
  if (n.includes('teamgroup') || n.includes('t-force')) {
    return { brand: 'TeamGroup', domain: 'teamgroupinc.com', url: `https://www.teamgroupinc.com/en/search.php?k=${enc}` };
  }
  return { brand: name.split(' ')[0] || 'Official', domain: 'rog.asus.com', url: `https://www.google.com/search?q=${enc}+official+site` };
}

// ============================================================================
// SERVICE 1: FULL BUILD COMPATIBILITY, BOTTLENECK, GAMING FPS & WORKSTATION ANALYZER
// ============================================================================
export function analyzeBuildLocal(build = {}) {
  const cpu = build.cpu || { name: 'AMD Ryzen 7 9800X3D', price: 479, socket: 'AM5', ddr: 'DDR5', cores: 8, threads: 16, boostClock: 5.2, tdp: 120, pcieGen: '5.0', gamingScore: 100, workstationScore: 86 };
  const mb = build.motherboard || { name: 'ASUS ROG Crosshair X870E Hero', price: 699, socket: 'AM5', ddr: 'DDR5', pcieGen: '5.0', formFactor: 'ATX' };
  const gpu = build.gpu || { name: 'ASUS ROG Astral GeForce RTX 5080 16GB', price: 1349, chipset: 'RTX 5080', vram: 16, tdp: 360, recPsu: 850, pcieGen: '5.0', gamingScore: 95, workstationScore: 94 };
  const ram = build.ram || { name: 'G.Skill Trident Z5 Neo RGB 32GB DDR5-6000', price: 112, ddr: 'DDR5', speedMHz: 6000, capacityGB: 32 };
  const storage = build.storage || { name: 'Samsung 990 PRO 2TB NVMe', price: 159, capacityGB: 2000, pcieGen: '4.0', readSpeedMBs: 7450 };
  const cooler = build.cooler || { name: 'ASUS ROG Ryujin III 360 ARGB', price: 349, type: '360mm AIO', maxTdp: 350 };
  const psu = build.psu || { name: 'Corsair RM1000x Shift 1000W ATX 3.1', price: 189, wattage: 1000, efficiency: '80+ Gold' };
  const pcCase = build.case || { name: 'Lian Li O11 Dynamic EVO RGB', price: 159, formFactor: 'E-ATX / ATX' };
  const monitor = build.monitor || { name: 'ASUS ROG Swift OLED PG32UCDM 32" 4K 240Hz', price: 1199, resolution: '3840x2160 (4K)', refreshRate: 240 };

  // 1. Compatibility Checks
  const checks = [];
  let isFullyCompatible = true;

  // Socket Check
  const cpuSocket = (cpu.socket || 'AM5').toUpperCase();
  const mbSocket = (mb.socket || 'AM5').toUpperCase();
  const socketMatch = cpuSocket === mbSocket;
  if (!socketMatch) isFullyCompatible = false;
  checks.push({
    title: 'توافق مقبس المعالج واللوحة الأم (CPU & Motherboard Socket)',
    status: socketMatch ? 'compatible' : 'error',
    badge: socketMatch ? `متوافق 100% (${cpuSocket})` : `غير متوافق (${cpuSocket} ≠ ${mbSocket})`,
    detail: socketMatch
      ? `المعالج ${cpu.name} يتطابق تماماً مع مقبس اللوحة الأم ${mb.name} (${cpuSocket}) ويعمل بكامل طاقته.`
      : `تحذير حرج: المعالج يعمل بمقبس ${cpuSocket} بينما اللوحة الأم بمقبس ${mbSocket}! يرجى اختيار لوحة أم بمقبس ${cpuSocket}.`
  });

  // RAM DDR Check
  const ramDdr = (ram.ddr || 'DDR5').toUpperCase();
  const mbDdr = (mb.ddr || 'DDR5').toUpperCase();
  const cpuDdr = (cpu.ddr || 'DDR5').toUpperCase();
  const ddrMatch = mbDdr.includes(ramDdr) && cpuDdr.includes(ramDdr);
  if (!ddrMatch) isFullyCompatible = false;
  checks.push({
    title: 'توافق جيل الرامات (RAM DDR4 / DDR5 Match)',
    status: ddrMatch ? 'compatible' : 'error',
    badge: ddrMatch ? `متوافق 100% (${ramDdr} @ ${ram.speedMHz || 6000}MHz)` : `تعارض (${ramDdr} vs ${mbDdr})`,
    detail: ddrMatch
      ? `الرامات ${ram.name} (${ramDdr}) متوافقة بالكامل مع اللوحة الأم والمعالج بتردد ${ram.speedMHz || 6000}MHz.`
      : `تحذير: الرامات المختارة من جيل ${ramDdr} بينما اللوحة الأم تتطلب ${mbDdr}.`
  });

  // PCIe Bandwidth Check
  const mbPcie = String(mb.pcieGen || '5.0');
  const gpuPcie = String(gpu.pcieGen || '4.0');
  const ssdPcie = String(storage.pcieGen || '4.0');
  const pcieOptimal = !(mbPcie === '4.0' && (gpuPcie === '5.0' || ssdPcie === '5.0'));
  checks.push({
    title: 'مسارات نقل البيانات (PCIe Gen4 / Gen5 Bandwidth)',
    status: pcieOptimal ? 'compatible' : 'warning',
    badge: `اللوحة PCIe ${mbPcie} • الكرت Gen${gpuPcie} • التخزين Gen${ssdPcie}`,
    detail: pcieOptimal
      ? `مسارات PCIe ${mbPcie} في اللوحة الأم تمنح كرت الشاشة ووحدة التخزين NVMe (${storage.readSpeedMBs || 7450} MB/s) السرعة القصوى بدون أي تقييد.`
      : `اللوحة الأم تدعم PCIe 4.0 بينما بعض القطع تدعم PCIe 5.0؛ ستعمل القطع بتوافق عكسي ممتاز ولكن بسرعة مسارات Gen4.`
  });

  // PSU Wattage Check
  const estimatedLoadW = (Number(cpu.tdp) || 120) + (Number(gpu.tdp) || 285) + 125;
  const recommendedPsuW = Math.max(Number(gpu.recPsu) || 650, Math.ceil((estimatedLoadW * 1.3) / 50) * 50);
  const selectedPsuW = Number(psu.wattage) || 850;
  const psuOk = selectedPsuW >= recommendedPsuW;
  const psuMarginal = !psuOk && selectedPsuW >= estimatedLoadW + 60;
  if (!psuOk && !psuMarginal) isFullyCompatible = false;
  checks.push({
    title: 'فحص الطاقة ومزود الطاقة (PSU Wattage & ATX 3.1 Safety)',
    status: psuOk ? 'compatible' : (psuMarginal ? 'warning' : 'error'),
    badge: `${selectedPsuW}W المتوفر / ${recommendedPsuW}W الموصى به (استهلاك فعلي ~${estimatedLoadW}W)`,
    detail: psuOk
      ? `مزود الطاقة ${psu.name} (${selectedPsuW}W) يوفر هامش أمان ممتاز يتجاوز الاستهلاك الفعلي (${estimatedLoadW}W) ويحمي الكرت من قفزات الطاقة اللحظية (Transient Spikes).`
      : `تنبيه طاقة: التجميعة تستهلك حوالي ${estimatedLoadW}W ويُنصح بمزود طاقة ${recommendedPsuW}W على الأقل بدلاً من ${selectedPsuW}W لضمان الثبات الكامل.`
  });

  // 2. Bottleneck Calculation
  const cpuScore = Number(cpu.gamingScore) || 88;
  const gpuScore = Number(gpu.gamingScore) || 88;
  const diff = gpuScore - cpuScore;
  // Positive diff means GPU is stronger than CPU -> potential CPU bottleneck at 1080p/1440p
  let bottleneckPercent = 0;
  let bottleneckType = 'توازن مثالي (Zero Bottleneck)';
  let bottleneckRecommendation = 'التناغم بين المعالج وكرت الشاشة مثالي جداً ولا يحتاج لأي تعديل.';

  if (diff > 6) {
    bottleneckPercent = Number(Math.min(34, (diff - 3) * 1.35).toFixed(1));
    bottleneckType = 'عنق زجاجة من المعالج (CPU Bottleneck)';
    bottleneckRecommendation = `كرت الشاشة ${gpu.name} قوي جداً مقارنة بالمعالج الحالي. للحصول على كامل الفريمات ننصح بالترقية إلى AMD Ryzen 7 9800X3D أو Ryzen 9 9950X3D أو Intel Core Ultra 9 285K.`;
  } else if (diff < -10) {
    bottleneckPercent = Number(Math.min(28, (Math.abs(diff) - 6) * 1.15).toFixed(1));
    bottleneckType = 'تركيز الأداء على كرت الشاشة (GPU Bound)';
    bottleneckRecommendation = `المعالج ${cpu.name} يمتلك فائض قوة كبير ويستطيع تشغيل كروت شاشة أقوى مثل RTX 5080 أو RTX 5090 مستقبلاً بدون أي عنق زجاجة.`;
  } else {
    bottleneckPercent = Number(Math.max(1.2, Math.abs(diff) * 0.65).toFixed(1));
  }

  // 3. Gaming Performance & FPS Table
  const ramBonus = (Number(ram.speedMHz) >= 6000 ? 1.04 : 1.0) * (Number(ram.capacityGB) >= 32 ? 1.02 : 1.0);
  const x3dBonus = cpu.name.toLowerCase().includes('x3d') ? 1.11 : 1.0;
  const gamingRating = Math.min(100, Math.round((gpuScore * 0.68 + cpuScore * 0.32) * (ramBonus > 1.03 ? 1.02 : 1)));

  const scaleFps = (base1080, base1440, base4k, cpuWeight = 0.35) => {
    const perfFactor1080 = ((gpuScore / 90) * (1 - cpuWeight) + (cpuScore / 90) * cpuWeight) * ramBonus * x3dBonus;
    const perfFactor1440 = ((gpuScore / 90) * 0.78 + (cpuScore / 90) * 0.22) * ramBonus * (x3dBonus > 1 ? 1.06 : 1);
    const perfFactor4k = ((gpuScore / 90) * 0.90 + (cpuScore / 90) * 0.10) * ramBonus;
    return {
      fps1080p: Math.round(base1080 * perfFactor1080),
      low1080p: Math.round(base1080 * perfFactor1080 * 0.79),
      fps1440p: Math.round(base1440 * perfFactor1440),
      low1440p: Math.round(base1440 * perfFactor1440 * 0.81),
      fps4k: Math.round(base4k * perfFactor4k),
      low4k: Math.round(base4k * perfFactor4k * 0.82)
    };
  };

  const gamesFps = [
    {
      game: 'Fortnite',
      subtitle: 'DirectX 12 Competitive / Performance Mode',
      icon: '⚡',
      ...scaleFps(390, 285, 165, 0.48)
    },
    {
      game: 'Call of Duty: Modern Warfare / Warzone',
      subtitle: 'Extreme Preset + DLSS / FSR Quality',
      icon: '🎯',
      ...scaleFps(245, 195, 132, 0.38)
    },
    {
      game: 'PUBG: BATTLEGROUNDS',
      subtitle: 'Ultra Competitive Esports Settings',
      icon: '🏆',
      ...scaleFps(310, 235, 148, 0.42)
    },
    {
      game: 'Cyberpunk 2077',
      subtitle: 'Ray Tracing Ultra + DLSS Frame Generation',
      icon: '🌆',
      ...scaleFps(175, 138, 96, 0.22)
    },
    {
      game: 'Crimson Desert',
      subtitle: 'Next-Gen Ultra Engine Preset (BlackSpace Engine)',
      icon: '⚔️',
      ...scaleFps(160, 126, 84, 0.26)
    }
  ];

  // 4. Workstation, Programming, 4K/120fps Montage & AI Evaluation
  const cpuWork = Number(cpu.workstationScore) || 85;
  const gpuWork = Number(gpu.workstationScore) || 85;
  const ramCap = Number(ram.capacityGB) || 32;
  const ssdSpeed = Number(storage.readSpeedMBs) || 7000;
  const vram = Number(gpu.vram) || 16;

  const ramWorkBonus = ramCap >= 64 ? 6 : (ramCap >= 32 ? 3 : -4);
  const ssdWorkBonus = ssdSpeed >= 12000 ? 4 : (ssdSpeed >= 7000 ? 2 : 0);
  const workstationRating = Math.min(100, Math.max(55, Math.round(cpuWork * 0.48 + gpuWork * 0.38 + 10 + ramWorkBonus + ssdWorkBonus)));

  const programmingScore = Math.min(100, Math.round(cpuWork * 0.65 + (ramCap >= 32 ? 28 : 18) + (ssdSpeed >= 7000 ? 7 : 4)));
  const montageScore = Math.min(100, Math.round(gpuWork * 0.45 + cpuWork * 0.38 + (ramCap >= 64 ? 12 : 8) + (ssdSpeed >= 10000 ? 5 : 3)));
  const aiWorkloadScore = Math.min(100, Math.round(gpuWork * 0.62 + (vram >= 24 ? 28 : vram >= 16 ? 20 : 10) + (cpuWork * 0.10)));

  const workstationDetails = [
    {
      category: 'تطوير الأنظمة والبرمجة الثقيلة (Docker, Databases, IDEs)',
      score: programmingScore,
      grade: programmingScore >= 92 ? 'خارق (Enterprise Grade)' : programmingScore >= 82 ? 'ممتاز جداً (Pro Dev)' : 'جيد جداً',
      summary: `بفضل معالج ${cpu.name} (${cpu.cores || 8} أنوية) مع رامات ${ramCap}GB ${ram.ddr || 'DDR5'} وتخزين بسرعة ${ssdSpeed.toLocaleString()} MB/s، يمكنك تشغيل عشرات حاويات Docker وقواعد البيانات الضخمة (PostgreSQL / SQLite WAL) مع بيئات VS Code و JetBrains وبناء المشاريع الضخمة (Compilation) في ثوانٍ معدودة.`
    },
    {
      category: 'المونتاج السينمائي 4K @ 120FPS والريندر (Premiere Pro, DaVinci Resolve, After Effects)',
      score: montageScore,
      grade: montageScore >= 92 ? 'استوديو سينمائي 8K/4K 120FPS' : montageScore >= 82 ? 'احترافي 4K 120FPS سلس' : 'ممتاز للمونتاج 4K/2K',
      summary: `كرت الشاشة ${gpu.name} بذاكرة ${vram}GB VRAM مع مسرعات الترميز العتادية يضمن تشغيل Timeline بدقة 4K 120FPS في DaVinci Resolve و Premiere Pro بدون تقطيع (Zero Dropped Frames)، مع سرعة تصدير (Render) فائقة وتأثيرات After Effects فورية.`
    },
    {
      category: 'الذكاء الاصطناعي وتدريب النماذج محلياً (Local LLMs, Stable Diffusion, CUDA/Tensor)',
      score: aiWorkloadScore,
      grade: vram >= 24 ? 'محطة ذكاء اصطناعي فائقة (24GB-32GB VRAM)' : vram >= 16 ? 'ممتاز للنماذج الذكية (16GB VRAM)' : 'مناسب للنماذج المتوسطة',
      summary: `ذاكرة كرت الشاشة (${vram}GB) تتيح تشغيل نماذج الذكاء الاصطناعي المحلية (Llama 3 / DeepSeek / Qwen) وتوليد الصور والفيديو بالذكاء الاصطناعي (Flux / ComfyUI) بسرعة معالجة عالية جداً.`
    }
  ];

  const totalCostUSD = Object.values({ cpu, mb, gpu, ram, storage, cooler, psu, pcCase, monitor })
    .reduce((acc, item) => acc + (Number(item?.price) || 0), 0);

  return {
    engineMode: 'AI Hybrid Hardware Benchmark Engine v2.5',
    isFullyCompatible,
    totalCostUSD,
    compatibilityChecks: checks,
    powerAnalysis: {
      estimatedLoadW,
      recommendedPsuW,
      selectedPsuW,
      headroomPercent: Math.max(0, Math.round(((selectedPsuW - estimatedLoadW) / selectedPsuW) * 100))
    },
    bottleneck: {
      percentage: bottleneckPercent,
      type: bottleneckType,
      status: bottleneckPercent <= 10 ? 'optimal' : 'warning',
      recommendation: bottleneckRecommendation
    },
    gaming: {
      rating: gamingRating,
      summary: gamingRating >= 94
        ? 'أداء أسطوري يشغل جميع الألعاب العالمية على 4K 120Hz+ و 2K 240Hz+ بأعلى إعدادات Ultra و Ray Tracing.'
        : gamingRating >= 84
          ? 'أداء احترافي ممتاز لدقة 2K (1440p @ 144Hz/240Hz) و 4K بسلاسة فائقة.'
          : 'أداء تنافسي رائع لدقة 1080p و 2K بمعدلات إطارات عالية ومستقرة.',
      gamesFps
    },
    workstation: {
      rating: workstationRating,
      programmingScore,
      montageScore,
      aiWorkloadScore,
      details: workstationDetails
    }
  };
}

// ============================================================================
// SERVICE 2: SMART BUDGET AUTO-BUILDER (أفضل تجميعة حسب الميزانية)
// ============================================================================
export function buildBestForBudgetLocal(catalog, budgetUSD = 2000, targetUse = 'gaming', includeMonitor = true) {
  const cleanBudget = Math.max(550, Number(budgetUSD) || 2000);

  // Allocation weights depending on targetUse & whether monitor is included
  const weights = {
    gaming: includeMonitor
      ? { cpu: 0.16, gpu: 0.35, motherboard: 0.10, ram: 0.06, storage: 0.06, cooler: 0.04, psu: 0.05, case: 0.05, monitor: 0.13 }
      : { cpu: 0.19, gpu: 0.42, motherboard: 0.11, ram: 0.07, storage: 0.07, cooler: 0.04, psu: 0.05, case: 0.05, monitor: 0 },
    programming: includeMonitor
      ? { cpu: 0.23, gpu: 0.22, motherboard: 0.12, ram: 0.10, storage: 0.09, cooler: 0.05, psu: 0.05, case: 0.05, monitor: 0.09 }
      : { cpu: 0.26, gpu: 0.25, motherboard: 0.13, ram: 0.11, storage: 0.10, cooler: 0.05, psu: 0.05, case: 0.05, monitor: 0 },
    montage: includeMonitor
      ? { cpu: 0.20, gpu: 0.31, motherboard: 0.11, ram: 0.09, storage: 0.09, cooler: 0.04, psu: 0.05, case: 0.04, monitor: 0.07 }
      : { cpu: 0.22, gpu: 0.35, motherboard: 0.12, ram: 0.10, storage: 0.09, cooler: 0.04, psu: 0.04, case: 0.04, monitor: 0 },
    ultimate: includeMonitor
      ? { cpu: 0.16, gpu: 0.36, motherboard: 0.11, ram: 0.07, storage: 0.07, cooler: 0.05, psu: 0.05, case: 0.05, monitor: 0.08 }
      : { cpu: 0.18, gpu: 0.40, motherboard: 0.12, ram: 0.08, storage: 0.08, cooler: 0.05, psu: 0.05, case: 0.04, monitor: 0 }
  };

  const w = weights[targetUse] || weights.gaming;

  const pickClosest = (list, targetPrice, filterFn = () => true, scoreFn = null) => {
    const candidates = (list || []).filter(filterFn);
    const pool = candidates.length ? candidates : (list || []);
    return [...pool].sort((a, b) => {
      const priceDiffA = Math.abs((a.price || 0) - targetPrice);
      const priceDiffB = Math.abs((b.price || 0) - targetPrice);
      if (scoreFn) {
        return (priceDiffA - scoreFn(a) * 2) - (priceDiffB - scoreFn(b) * 2);
      }
      return priceDiffA - priceDiffB;
    })[0];
  };

  // 1. Pick CPU based on budget & targetUse
  const cpuTarget = cleanBudget * w.cpu;
  const cpu = pickClosest(
    catalog.cpu,
    cpuTarget,
    c => c.price <= cpuTarget * 1.35 && (cleanBudget < 1500 ? c.socket !== 'LGA1851' : true),
    c => targetUse === 'gaming' ? (c.gamingScore || 80) : (c.workstationScore || 80)
  );

  // 2. Pick Motherboard strictly matching CPU socket
  const mbTarget = cleanBudget * w.motherboard;
  const socketBoards = (catalog.motherboard || []).filter(m => m.socket === cpu.socket);
  const motherboard = pickClosest(
    socketBoards,
    mbTarget,
    m => m.price <= mbTarget * 1.45
  );

  // 3. Pick RAM strictly matching Motherboard DDR type
  const ramTarget = cleanBudget * w.ram;
  const ddrRams = (catalog.ram || []).filter(r => r.ddr === motherboard.ddr);
  const ram = pickClosest(
    ddrRams,
    ramTarget,
    r => (targetUse === 'gaming' ? r.capacityGB >= 16 : r.capacityGB >= 32) && r.price <= ramTarget * 1.5
  );

  // 4. Pick GPU
  const gpuTarget = cleanBudget * w.gpu;
  const gpu = pickClosest(
    catalog.gpu,
    gpuTarget,
    g => g.price <= gpuTarget * 1.3 || cleanBudget >= 4000,
    g => targetUse === 'gaming' ? (g.gamingScore || 80) : (g.workstationScore || 80)
  );

  // 5. Pick Storage
  const storageTarget = cleanBudget * w.storage;
  const storage = pickClosest(
    catalog.storage,
    storageTarget,
    s => motherboard.pcieGen === '4.0' ? s.pcieGen === '4.0' : true
  );

  // 6. Pick Cooler
  const coolerTarget = cleanBudget * w.cooler;
  const cooler = pickClosest(
    catalog.cooler,
    coolerTarget,
    c => (cpu.tdp >= 170 ? (c.maxTdp || 250) >= 250 : true)
  );

  // 7. Pick PSU (strictly satisfy required wattage!)
  const estimatedLoadW = (Number(cpu?.tdp) || 120) + (Number(gpu?.tdp) || 285) + 125;
  const minWatts = Math.max(Number(gpu?.recPsu) || 650, Math.ceil((estimatedLoadW * 1.3) / 50) * 50);
  const psuTarget = cleanBudget * w.psu;
  const validPsus = (catalog.psu || []).filter(p => (Number(p.wattage) || 750) >= minWatts);
  const psu = pickClosest(validPsus.length ? validPsus : catalog.psu, psuTarget);

  // 8. Pick Case
  const caseTarget = cleanBudget * w.case;
  const pcCase = pickClosest(catalog.case, caseTarget);

  // 9. Pick Monitor
  const monitorTarget = includeMonitor ? cleanBudget * w.monitor : cleanBudget * 0.14;
  const monitor = pickClosest(catalog.monitor, monitorTarget);

  const selectedParts = { cpu, motherboard, gpu, ram, storage, cooler, psu, case: pcCase, monitor };

  const targetUseLabels = {
    gaming: 'الألعاب التنافسية وأعلى معدل إطارات (Esports & AAA Gaming)',
    programming: 'برمجة وتطوير الأنظمة والحاويات وقواعد البيانات (Systems Architecture & Dev)',
    montage: 'المونتاج السينمائي 4K 120FPS وصناعة المحتوى (4K Video Editing & VFX)',
    ultimate: 'التجميعة الشاملة الخارقة للألعاب والمونتاج والذكاء الاصطناعي (Ultimate Flagship)'
  };

  const reasons = {
    cpu: `تم اختيار ${cpu.name} لأنه يقدم أفضل أداء في فئته السعرية ($${cpu.price}) لـ ${targetUseLabels[targetUse] || targetUse} مع دعم مقبس ${cpu.socket}.`,
    motherboard: `لوحة ${motherboard.name} متوافقة 100% مع مقبس ${cpu.socket} وتوفر دوائر طاقة VRM قوية ومسارات PCIe ${motherboard.pcieGen}.`,
    gpu: `كرت الشاشة ${gpu.name} بذاكرة ${gpu.vram}GB يمنحك القوة الرسومية القصوى ضمن ميزانية $${cleanBudget} بدون أي عنق زجاجة.`,
    ram: `الذاكرة ${ram.name} (${ram.ddr} بسرعة ${ram.speedMHz}MHz) توفر استجابة فورية وسعة مثالية (${ram.capacityGB}GB).`,
    storage: `وحدة التخزين ${storage.name} بسرعة قراءة تصل إلى ${(storage.readSpeedMBs || 7000).toLocaleString()} MB/s لإقلاع النظام وتحميل المشاريع والألعاب في أجزاء من الثانية.`,
    cooler: `المبرد ${cooler.name} يحافظ على درجات حرارة منخفضة وثبات ترددات Boost تحت أقصى ضغط.`,
    psu: `مزود الطاقة ${psu.name} بقدرة ${psu.wattage}W (${psu.efficiency}) يضمن تغذية آمنة ومستقرة لكامل القطع.`,
    case: `الكيس ${pcCase.name} يجمع بين تدفق الهواء الممتاز والتصميم الفاخر وسهولة إدارة الكابلات.`,
    monitor: `الشاشة ${monitor.name} (${monitor.resolution} @ ${monitor.refreshRate}Hz) تترجم قوة الكرت إلى تجربة بصرية مذهلة.`
  };

  const analysis = analyzeBuildLocal(selectedParts);

  return {
    budgetRequestedUSD: cleanBudget,
    targetUse,
    targetUseLabel: targetUseLabels[targetUse] || targetUse,
    totalCostUSD: analysis.totalCostUSD,
    selectedParts,
    reasons,
    analysis
  };
}

// ============================================================================
// LIVE GLOBAL AI PART FINDER FALLBACK PARSER (Instant Spec & Link Synthesizer)
// ============================================================================
export function synthesizePartFromQuery(query = '', category = 'gpu') {
  const cleanName = query.trim();
  const n = cleanName.toLowerCase();
  const mfg = getOfficialManufacturer(cleanName);
  const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(cleanName)}`;
  const id = `ai-${category}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  const base = {
    id,
    name: cleanName,
    category,
    brand: mfg.brand,
    manufacturerDomain: mfg.domain,
    manufacturerUrl: mfg.url,
    amazonUrl,
    isAiDiscovered: true
  };

  if (category === 'cpu') {
    const isIntel = n.includes('intel') || n.includes('core') || n.includes('i9') || n.includes('i7') || n.includes('i5') || n.includes('285k') || n.includes('265k');
    const socket = n.includes('285') || n.includes('265') || n.includes('245') || n.includes('ultra') ? 'LGA1851' : isIntel ? 'LGA1700' : (n.includes('5800') || n.includes('5700') || n.includes('5600') ? 'AM4' : 'AM5');
    const ddr = socket === 'AM4' ? 'DDR4' : 'DDR5';
    const price = n.includes('9950') ? 649 : n.includes('9800x3d') ? 479 : n.includes('285k') ? 589 : n.includes('14900') ? 449 : 329;
    return { ...base, price, socket, ddr, cores: 12, threads: 24, boostClock: 5.4, tdp: 125, pcieGen: '5.0', gamingScore: 93, workstationScore: 91, badge: `تم الجلب بالذكاء الاصطناعي • ${socket}` };
  }

  if (category === 'motherboard') {
    const socket = n.includes('z890') || n.includes('b860') ? 'LGA1851' : n.includes('z790') || n.includes('b760') ? 'LGA1700' : n.includes('b550') || n.includes('x570') ? 'AM4' : 'AM5';
    const ddr = socket === 'AM4' || n.includes('ddr4') ? 'DDR4' : 'DDR5';
    const pcieGen = n.includes('x870') || n.includes('z890') || n.includes('b650e') || n.includes('z790') ? '5.0' : '4.0';
    const price = n.includes('godlike') ? 1099 : n.includes('hero') || n.includes('xtreme') ? 699 : n.includes('master') || n.includes('carbon') || n.includes('strix') ? 449 : 249;
    return { ...base, price, socket, ddr, pcieGen, formFactor: 'ATX', badge: `AI Live • ${socket} • ${ddr}` };
  }

  if (category === 'gpu') {
    const vram = n.includes('5090') ? 32 : (n.includes('4090') || n.includes('7900 xtx')) ? 24 : (n.includes('5080') || n.includes('4080') || n.includes('5070 ti') || n.includes('7800 xt')) ? 16 : 12;
    const price = n.includes('5090') ? 2399 : n.includes('4090') ? 1899 : n.includes('5080') ? 1249 : n.includes('4080') ? 1049 : n.includes('5070 ti') ? 849 : 599;
    const gamingScore = n.includes('5090') ? 100 : n.includes('4090') ? 97 : n.includes('5080') ? 95 : 86;
    return { ...base, price, vram, tdp: vram >= 24 ? 450 : 300, recPsu: vram >= 24 ? 850 : 750, pcieGen: '5.0', gamingScore, workstationScore: gamingScore, badge: `AI Live • ${vram}GB VRAM` };
  }

  if (category === 'ram') {
    const ddr = n.includes('ddr4') ? 'DDR4' : 'DDR5';
    const speedMatch = cleanName.match(/(3200|3600|5200|5600|6000|6400|6600|7200|7600|8000|8400)/);
    const speedMHz = speedMatch ? Number(speedMatch[1]) : (ddr === 'DDR5' ? 6000 : 3600);
    const capMatch = cleanName.match(/\b(16|32|48|64|96|128|192)\s*gb/i);
    const capacityGB = capMatch ? Number(capMatch[1]) : 32;
    const price = capacityGB >= 64 ? 229 : 115;
    return { ...base, price, ddr, speedMHz, capacityGB, casLatency: 30, badge: `AI Live • ${capacityGB}GB ${ddr}-${speedMHz}` };
  }

  if (category === 'storage') {
    const pcieGen = n.includes('gen5') || n.includes('t705') || n.includes('t700') || n.includes('rocket 5') || n.includes('mp700') ? '5.0' : '4.0';
    const capMatch = cleanName.match(/\b(1|2|4|8)\s*tb/i);
    const capacityGB = capMatch ? Number(capMatch[1]) * 1000 : 2000;
    const readSpeedMBs = pcieGen === '5.0' ? 14000 : 7400;
    const price = capacityGB >= 4000 ? 299 : (pcieGen === '5.0' ? 259 : 149);
    return { ...base, price, capacityGB, pcieGen, readSpeedMBs, badge: `AI Live • ${capacityGB / 1000}TB Gen${pcieGen}` };
  }

  if (category === 'psu') {
    const wMatch = cleanName.match(/\b(650|750|850|1000|1200|1300|1500|1600)\s*w/i);
    const wattage = wMatch ? Number(wMatch[1]) : 850;
    const price = wattage >= 1200 ? 289 : wattage >= 1000 ? 189 : 129;
    return { ...base, price, wattage, efficiency: '80+ Gold / Platinum', atxVersion: 'ATX 3.1', badge: `AI Live • ${wattage}W ATX 3.1` };
  }

  if (category === 'cooler') {
    return { ...base, price: 169, type: '360mm AIO Liquid Cooler', maxTdp: 320, badge: 'AI Live • 360mm AIO' };
  }

  if (category === 'case') {
    return { ...base, price: 149, formFactor: 'ATX Mid/Full Tower', badge: 'AI Live • Tempered Glass' };
  }

  return { ...base, price: 499, resolution: '2560x1440 (2K)', refreshRate: 240, panel: 'OLED / Fast IPS', badge: 'AI Live • 240Hz Gaming Monitor' };
}
