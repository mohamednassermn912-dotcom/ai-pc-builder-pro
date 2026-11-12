import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_DATASET_BASE = 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/';

const DATASET_FILES = {
  cpu: 'cpu.json',
  motherboard: 'motherboard.json',
  gpu: 'video-card.json',
  ram: 'memory.json',
  storage: 'internal-hard-drive.json',
  cooler: 'cpu-cooler.json',
  psu: 'power-supply.json',
  case: 'case.json',
  monitor: 'monitor.json'
};

export function getManufacturerInfo(name = '', category = '') {
  const n = name.toLowerCase();
  const enc = encodeURIComponent(name);

  if (n.includes('rog') || n.includes('strix') || n.includes('crosshair') || n.includes('maximus') || n.includes('astral') || n.includes('ryujin') || n.includes('hyperion') || n.includes('thor')) {
    return { brand: 'ASUS ROG', domain: 'rog.asus.com', url: `https://rog.asus.com/searchresult?searchType=products&searchKey=${enc}` };
  }
  if (n.includes('asus') || n.includes('tuf') || n.includes('proart') || n.includes('prime')) {
    return { brand: 'ASUS', domain: 'rog.asus.com', url: `https://rog.asus.com/searchresult?searchType=products&searchKey=${enc}` };
  }
  if (n.includes('msi') || n.includes('godlike') || n.includes('suprim') || n.includes('tomahawk') || n.includes('mag ') || n.includes('mpg ') || n.includes('meg ')) {
    return { brand: 'MSI', domain: 'msi.com', url: `https://www.msi.com/search/${enc}` };
  }
  if (n.includes('gigabyte') || n.includes('aorus') || n.includes('windforce')) {
    return { brand: 'Gigabyte AORUS', domain: 'gigabyte.com', url: `https://www.gigabyte.com/Search?kw=${enc}` };
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
  if (n.includes('wd ') || n.includes('western digital') || n.includes('sn850x') || n.includes('sn770') || n.includes('wd_black')) {
    return { brand: 'WD Black', domain: 'westerndigital.com', url: `https://www.westerndigital.com/search?q=${enc}` };
  }
  if (n.includes('kingston') || n.includes('fury') || n.includes('kc3000') || n.includes('nv3')) {
    return { brand: 'Kingston', domain: 'kingston.com', url: `https://www.kingston.com/en/search?q=${enc}` };
  }
  if (n.includes('crucial') || n.includes('t705') || n.includes('t700') || n.includes('p3 plus')) {
    return { brand: 'Crucial', domain: 'crucial.com', url: `https://www.crucial.com/search?q=${enc}` };
  }
  if (n.includes('g.skill') || n.includes('trident z') || n.includes('ripjaws')) {
    return { brand: 'G.Skill', domain: 'gskill.com', url: `https://www.gskill.com/products/1/165/Desktop-Memory` };
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
  if (n.includes('nzxt') || n.includes('kraken')) {
    return { brand: 'NZXT', domain: 'nzxt.com', url: `https://nzxt.com/search?q=${enc}` };
  }
  if (n.includes('seasonic') || n.includes('vertex') || n.includes('focus gx')) {
    return { brand: 'Seasonic', domain: 'seasonic.com', url: `https://seasonic.com/` };
  }
  if (n.includes('lian li') || n.includes('o11') || n.includes('galahad')) {
    return { brand: 'Lian Li', domain: 'lian-li.com', url: `https://lian-li.com/?s=${enc}` };
  }
  if (n.includes('hyte') || n.includes('y70') || n.includes('y60')) {
    return { brand: 'Hyte', domain: 'hyte.com', url: `https://hyte.com/search?q=${enc}` };
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
  if (n.includes('sapphire')) {
    return { brand: 'Sapphire', domain: 'sapphiretech.com', url: `https://www.sapphiretech.com/` };
  }
  if (n.includes('noctua')) {
    return { brand: 'Noctua', domain: 'noctua.at', url: `https://noctua.at/en/products/cpu-cooler-retail` };
  }
  if (n.includes('arctic')) {
    return { brand: 'ARCTIC', domain: 'arctic.de', url: `https://www.arctic.de/en/products/cooling/cpu-cooler/` };
  }
  if (n.includes('thermalright')) {
    return { brand: 'Thermalright', domain: 'thermalright.com', url: `https://www.thermalright.com/` };
  }
  if (n.includes('lg ') || n.includes('ultragear')) {
    return { brand: 'LG', domain: 'lg.com', url: `https://www.lg.com/us/gaming-monitors` };
  }
  return { brand: name.split(' ')[0] || 'Official', domain: 'amazon.com', url: `https://www.google.com/search?q=${enc}+official+specs` };
}

export function decoratePart(part, category) {
  const mfg = getManufacturerInfo(part.name, category);
  const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(part.name)}`;
  return {
    ...part,
    category,
    brand: part.brand || mfg.brand,
    manufacturerDomain: part.manufacturerDomain || mfg.domain,
    manufacturerUrl: part.manufacturerUrl || mfg.url,
    amazonUrl
  };
}

// ============================================================================
// FLAGSHIP HARDWARE CATALOG (ALL LATEST WORLDWIDE RELEASES IN USD $)
// ============================================================================
export const FLAGSHIP_CATALOG = {
  cpu: [
    { id: 'cpu-r9-9950x3d', name: 'AMD Ryzen 9 9950X3D 16-Core 5.7GHz 3D V-Cache', price: 699, socket: 'AM5', ddr: 'DDR5', cores: 16, threads: 32, baseClock: 4.3, boostClock: 5.7, tdp: 170, pcieGen: '5.0', gamingScore: 100, workstationScore: 100, tier: 'Flagship', badge: 'الأقوى عالمياً للألعاب والمونتاج' },
    { id: 'cpu-r7-9800x3d', name: 'AMD Ryzen 7 9800X3D 8-Core 5.2GHz 3D V-Cache', price: 479, socket: 'AM5', ddr: 'DDR5', cores: 8, threads: 16, baseClock: 4.7, boostClock: 5.2, tdp: 120, pcieGen: '5.0', gamingScore: 100, workstationScore: 86, tier: 'Flagship', badge: 'ملك الألعاب التنافسية #1' },
    { id: 'cpu-r9-9950x', name: 'AMD Ryzen 9 9950X 16-Core 5.7GHz Zen 5', price: 599, socket: 'AM5', ddr: 'DDR5', cores: 16, threads: 32, baseClock: 4.3, boostClock: 5.7, tdp: 170, pcieGen: '5.0', gamingScore: 95, workstationScore: 99, tier: 'Flagship', badge: 'وحش الريندر والذكاء الاصطناعي' },
    { id: 'cpu-r9-7950x3d', name: 'AMD Ryzen 9 7950X3D 16-Core 5.7GHz 3D V-Cache', price: 549, socket: 'AM5', ddr: 'DDR5', cores: 16, threads: 32, baseClock: 4.2, boostClock: 5.7, tdp: 120, pcieGen: '5.0', gamingScore: 98, workstationScore: 96, tier: 'High-End', badge: 'أداء مزدوج خارق' },
    { id: 'cpu-r7-7800x3d', name: 'AMD Ryzen 7 7800X3D 8-Core 5.0GHz 3D V-Cache', price: 399, socket: 'AM5', ddr: 'DDR5', cores: 8, threads: 16, baseClock: 4.2, boostClock: 5.0, tdp: 120, pcieGen: '5.0', gamingScore: 97, workstationScore: 81, tier: 'High-End', badge: 'الأكثر مبيعاً للألعاب' },
    { id: 'cpu-r7-9700x', name: 'AMD Ryzen 7 9700X 8-Core 5.5GHz Zen 5', price: 329, socket: 'AM5', ddr: 'DDR5', cores: 8, threads: 16, baseClock: 3.8, boostClock: 5.5, tdp: 65, pcieGen: '5.0', gamingScore: 91, workstationScore: 85, tier: 'Upper-Mid', badge: 'كفاءة عالية وحرارة منخفضة' },
    { id: 'cpu-r5-9600x', name: 'AMD Ryzen 5 9600X 6-Core 5.4GHz Zen 5', price: 245, socket: 'AM5', ddr: 'DDR5', cores: 6, threads: 12, baseClock: 3.9, boostClock: 5.4, tdp: 65, pcieGen: '5.0', gamingScore: 86, workstationScore: 76, tier: 'Mid-Range', badge: 'أفضل معالج متوسط حديث' },
    { id: 'cpu-r5-7600x', name: 'AMD Ryzen 5 7600X 6-Core 5.3GHz AM5', price: 198, socket: 'AM5', ddr: 'DDR5', cores: 6, threads: 12, baseClock: 4.7, boostClock: 5.3, tdp: 105, pcieGen: '5.0', gamingScore: 83, workstationScore: 72, tier: 'Mid-Range', badge: 'ملك التجميعات الاقتصادية AM5' },
    { id: 'cpu-u9-285k', name: 'Intel Core Ultra 9 285K 24-Core (8P+16E) 5.7GHz Arrow Lake', price: 589, socket: 'LGA1851', ddr: 'DDR5', cores: 24, threads: 24, baseClock: 3.7, boostClock: 5.7, tdp: 250, pcieGen: '5.0', gamingScore: 94, workstationScore: 99, tier: 'Flagship', badge: 'أقوى معالج إنتل للمونتاج والبرمجة' },
    { id: 'cpu-u7-265k', name: 'Intel Core Ultra 7 265K 20-Core (8P+12E) 5.5GHz Arrow Lake', price: 394, socket: 'LGA1851', ddr: 'DDR5', cores: 20, threads: 20, baseClock: 3.9, boostClock: 5.5, tdp: 250, pcieGen: '5.0', gamingScore: 91, workstationScore: 93, tier: 'High-End', badge: 'قوة جبارة للـ Workstation' },
    { id: 'cpu-u5-245k', name: 'Intel Core Ultra 5 245K 14-Core (6P+8E) 5.2GHz Arrow Lake', price: 309, socket: 'LGA1851', ddr: 'DDR5', cores: 14, threads: 14, baseClock: 4.2, boostClock: 5.2, tdp: 159, pcieGen: '5.0', gamingScore: 87, workstationScore: 85, tier: 'Upper-Mid', badge: 'الجيل الجديد LGA1851' },
    { id: 'cpu-i9-14900k', name: 'Intel Core i9-14900K 24-Core (8P+16E) 6.0GHz LGA1700', price: 439, socket: 'LGA1700', ddr: 'DDR5/DDR4', cores: 24, threads: 32, baseClock: 3.2, boostClock: 6.0, tdp: 253, pcieGen: '5.0', gamingScore: 95, workstationScore: 97, tier: 'Flagship', badge: 'تردد يصل إلى 6.0GHz' },
    { id: 'cpu-i7-14700k', name: 'Intel Core i7-14700K 20-Core (8P+12E) 5.6GHz LGA1700', price: 349, socket: 'LGA1700', ddr: 'DDR5/DDR4', cores: 20, threads: 28, baseClock: 3.4, boostClock: 5.6, tdp: 253, pcieGen: '5.0', gamingScore: 92, workstationScore: 92, tier: 'High-End', badge: 'ممتاز للألعاب وصناعة المحتوى' },
    { id: 'cpu-i5-14600k', name: 'Intel Core i5-14600K 14-Core (6P+8E) 5.3GHz LGA1700', price: 255, socket: 'LGA1700', ddr: 'DDR5/DDR4', cores: 14, threads: 20, baseClock: 3.5, boostClock: 5.3, tdp: 181, pcieGen: '5.0', gamingScore: 87, workstationScore: 83, tier: 'Mid-Range', badge: 'قيمة مقابل سعر ممتازة' },
    { id: 'cpu-i5-14400f', name: 'Intel Core i5-14400F 10-Core 4.7GHz LGA1700', price: 149, socket: 'LGA1700', ddr: 'DDR5/DDR4', cores: 10, threads: 16, baseClock: 2.5, boostClock: 4.7, tdp: 148, pcieGen: '4.0', gamingScore: 76, workstationScore: 70, tier: 'Budget', badge: 'خيار اقتصادي ممتاز' },
    { id: 'cpu-r7-5700x3d', name: 'AMD Ryzen 7 5700X3D 8-Core 4.1GHz AM4 3D V-Cache', price: 199, socket: 'AM4', ddr: 'DDR4', cores: 8, threads: 16, baseClock: 3.0, boostClock: 4.1, tdp: 105, pcieGen: '4.0', gamingScore: 84, workstationScore: 71, tier: 'Mid-Range', badge: 'أقوى ترقية لمنصة AM4' },
    { id: 'cpu-r5-5600x', name: 'AMD Ryzen 5 5600X 6-Core 4.6GHz AM4', price: 119, socket: 'AM4', ddr: 'DDR4', cores: 6, threads: 12, baseClock: 3.7, boostClock: 4.6, tdp: 65, pcieGen: '4.0', gamingScore: 73, workstationScore: 65, tier: 'Budget', badge: 'الأفضل للميزانيات المحدودة' }
  ],

  motherboard: [
    // ASUS ROG / TUF
    { id: 'mb-rog-x870e-hero', name: 'ASUS ROG Crosshair X870E Hero WiFi 7 ATX', price: 699, socket: 'AM5', chipset: 'X870E', ddr: 'DDR5', maxMemory: 192, pcieGen: '5.0', formFactor: 'ATX', wifi: 'WiFi 7', m2Slots: 5, badge: 'فئة النخبة ROG Crosshair' },
    { id: 'mb-rog-z890-hero', name: 'ASUS ROG Maximus Z890 Hero WiFi 7 ATX', price: 699, socket: 'LGA1851', chipset: 'Z890', ddr: 'DDR5', maxMemory: 192, pcieGen: '5.0', formFactor: 'ATX', wifi: 'WiFi 7', m2Slots: 6, badge: 'فئة النخبة ROG Maximus' },
    { id: 'mb-rog-strix-x870e-e', name: 'ASUS ROG Strix X870E-E Gaming WiFi 7 ATX', price: 499, socket: 'AM5', chipset: 'X870E', ddr: 'DDR5', maxMemory: 192, pcieGen: '5.0', formFactor: 'ATX', wifi: 'WiFi 7', m2Slots: 5, badge: 'الأفضل لكسر السرعة AM5' },
    { id: 'mb-rog-strix-x870-f', name: 'ASUS ROG Strix X870-F Gaming WiFi 7 ATX', price: 419, socket: 'AM5', chipset: 'X870', ddr: 'DDR5', maxMemory: 192, pcieGen: '5.0', formFactor: 'ATX', wifi: 'WiFi 7', m2Slots: 4, badge: 'ROG Strix الجيل الجديد' },
    { id: 'mb-rog-strix-b650e-f', name: 'ASUS ROG Strix B650E-F Gaming WiFi ATX', price: 259, socket: 'AM5', chipset: 'B650E', ddr: 'DDR5', maxMemory: 192, pcieGen: '5.0', formFactor: 'ATX', wifi: 'WiFi 6E', m2Slots: 3, badge: 'الأكثر شعبية PCIe 5.0' },
    { id: 'mb-tuf-x870-plus', name: 'ASUS TUF Gaming X870-Plus WiFi 7 ATX', price: 309, socket: 'AM5', chipset: 'X870', ddr: 'DDR5', maxMemory: 192, pcieGen: '5.0', formFactor: 'ATX', wifi: 'WiFi 7', m2Slots: 4, badge: 'اعتمادية عسكرية TUF' },
    { id: 'mb-tuf-b650-plus', name: 'ASUS TUF Gaming B650-Plus WiFi ATX', price: 189, socket: 'AM5', chipset: 'B650', ddr: 'DDR5', maxMemory: 192, pcieGen: '4.0', formFactor: 'ATX', wifi: 'WiFi 6', m2Slots: 3, badge: 'أفضل قيمة مقابل سعر AM5' },
    { id: 'mb-tuf-z890-plus', name: 'ASUS TUF Gaming Z890-Plus WiFi 7 ATX', price: 299, socket: 'LGA1851', chipset: 'Z890', ddr: 'DDR5', maxMemory: 192, pcieGen: '5.0', formFactor: 'ATX', wifi: 'WiFi 7', m2Slots: 4, badge: 'مثالية لمعالجات Core Ultra' },
    { id: 'mb-tuf-z790-plus', name: 'ASUS TUF Gaming Z790-Plus WiFi ATX (DDR5)', price: 219, socket: 'LGA1700', chipset: 'Z790', ddr: 'DDR5', maxMemory: 192, pcieGen: '5.0', formFactor: 'ATX', wifi: 'WiFi 6E', m2Slots: 4, badge: 'مثالية للجيل 14 من إنتل' },
    // MSI MEG / MPG / MAG
    { id: 'mb-msi-x870e-godlike', name: 'MSI MEG X870E GODLIKE WiFi 7 E-ATX', price: 1099, socket: 'AM5', chipset: 'X870E', ddr: 'DDR5', maxMemory: 256, pcieGen: '5.0', formFactor: 'E-ATX', wifi: 'WiFi 7', m2Slots: 5, badge: 'الأسطورة المطلقة GODLIKE' },
    { id: 'mb-msi-x870e-carbon', name: 'MSI MPG X870E Carbon WiFi 7 ATX', price: 499, socket: 'AM5', chipset: 'X870E', ddr: 'DDR5', maxMemory: 256, pcieGen: '5.0', formFactor: 'ATX', wifi: 'WiFi 7', m2Slots: 4, badge: 'MPG Carbon الاحترافية' },
    { id: 'mb-msi-z890-carbon', name: 'MSI MPG Z890 Carbon WiFi 7 ATX', price: 489, socket: 'LGA1851', chipset: 'Z890', ddr: 'DDR5', maxMemory: 256, pcieGen: '5.0', formFactor: 'ATX', wifi: 'WiFi 7', m2Slots: 5, badge: 'قوة تحمل فائقة Z890' },
    { id: 'mb-msi-x870-tomahawk', name: 'MSI MAG X870 Tomahawk WiFi 7 ATX', price: 299, socket: 'AM5', chipset: 'X870', ddr: 'DDR5', maxMemory: 256, pcieGen: '5.0', formFactor: 'ATX', wifi: 'WiFi 7', m2Slots: 4, badge: 'ملكة الفئة العليا الاقتصادية' },
    { id: 'mb-msi-b650-tomahawk', name: 'MSI MAG B650 Tomahawk WiFi ATX', price: 199, socket: 'AM5', chipset: 'B650', ddr: 'DDR5', maxMemory: 192, pcieGen: '4.0', formFactor: 'ATX', wifi: 'WiFi 6E', m2Slots: 3, badge: 'الأعلى تقييماً في العالم' },
    { id: 'mb-msi-z790-tomahawk', name: 'MSI MAG Z790 Tomahawk MAX WiFi 7 ATX', price: 239, socket: 'LGA1700', chipset: 'Z790', ddr: 'DDR5', maxMemory: 192, pcieGen: '5.0', formFactor: 'ATX', wifi: 'WiFi 7', m2Slots: 4, badge: 'تبريد VRM جبار' },
    // Gigabyte AORUS
    { id: 'mb-gb-x870e-xtreme', name: 'Gigabyte X870E AORUS Xtreme AI TOP E-ATX', price: 799, socket: 'AM5', chipset: 'X870E', ddr: 'DDR5', maxMemory: 256, pcieGen: '5.0', formFactor: 'E-ATX', wifi: 'WiFi 7', m2Slots: 4, badge: 'مصممة للذكاء الاصطناعي و Multi-GPU' },
    { id: 'mb-gb-x870e-master', name: 'Gigabyte X870E AORUS Master WiFi 7 ATX', price: 499, socket: 'AM5', chipset: 'X870E', ddr: 'DDR5', maxMemory: 256, pcieGen: '5.0', formFactor: 'ATX', wifi: 'WiFi 7', m2Slots: 4, badge: 'AORUS Master الفاخرة' },
    { id: 'mb-gb-z890-master', name: 'Gigabyte Z890 AORUS Master WiFi 7 ATX', price: 549, socket: 'LGA1851', chipset: 'Z890', ddr: 'DDR5', maxMemory: 256, pcieGen: '5.0', formFactor: 'ATX', wifi: 'WiFi 7', m2Slots: 5, badge: 'أقوى لوحة Z890 AORUS' },
    { id: 'mb-gb-b650-elite', name: 'Gigabyte B650 AORUS Elite AX V2 ATX', price: 195, socket: 'AM5', chipset: 'B650', ddr: 'DDR5', maxMemory: 192, pcieGen: '4.0', formFactor: 'ATX', wifi: 'WiFi 6E', m2Slots: 3, badge: 'خيار اللاعبين المفضل' },
    // ASRock
    { id: 'mb-asr-x870e-taichi', name: 'ASRock X870E Taichi WiFi 7 E-ATX', price: 449, socket: 'AM5', chipset: 'X870E', ddr: 'DDR5', maxMemory: 256, pcieGen: '5.0', formFactor: 'E-ATX', wifi: 'WiFi 7', m2Slots: 4, badge: '24+2+1 مراحل طاقة خارقة' },
    { id: 'mb-asr-x870-steel', name: 'ASRock X870 Steel Legend WiFi 7 ATX', price: 259, socket: 'AM5', chipset: 'X870', ddr: 'DDR5', maxMemory: 256, pcieGen: '5.0', formFactor: 'ATX', wifi: 'WiFi 7', m2Slots: 3, badge: 'تصميم أبيض ثلجي رائع' },
    { id: 'mb-asr-x870e-phantom', name: 'ASRock Phantom Gaming X870E Nova WiFi 7 ATX', price: 349, socket: 'AM5', chipset: 'X870E', ddr: 'DDR5', maxMemory: 256, pcieGen: '5.0', formFactor: 'ATX', wifi: 'WiFi 7', m2Slots: 5, badge: 'Phantom Gaming الاحترافية' },
    { id: 'mb-asus-b550-plus', name: 'ASUS TUF Gaming B550-Plus WiFi II ATX (AM4)', price: 129, socket: 'AM4', chipset: 'B550', ddr: 'DDR4', maxMemory: 128, pcieGen: '4.0', formFactor: 'ATX', wifi: 'WiFi 6', m2Slots: 2, badge: 'الأفضل للميزانية الاقتصادية AM4' }
  ],

  gpu: [
    // RTX 50 Series
    { id: 'gpu-rtx5090-rog', name: 'ASUS ROG Astral GeForce RTX 5090 32GB GDDR7 OC Edition', price: 2499, chipset: 'RTX 5090', vram: 32, vramType: 'GDDR7', tdp: 575, recPsu: 1000, pcieGen: '5.0', gamingScore: 100, workstationScore: 100, badge: 'أقوى كرت شاشة في التاريخ 32GB GDDR7' },
    { id: 'gpu-rtx5090-suprim', name: 'MSI GeForce RTX 5090 32G SUPRIM SOC GDDR7', price: 2399, chipset: 'RTX 5090', vram: 32, vramType: 'GDDR7', tdp: 575, recPsu: 1000, pcieGen: '5.0', gamingScore: 100, workstationScore: 100, badge: 'تبريد SUPRIM فائق الهدوء' },
    { id: 'gpu-rtx5080-rog', name: 'ASUS ROG Astral GeForce RTX 5080 16GB GDDR7 OC', price: 1349, chipset: 'RTX 5080', vram: 16, vramType: 'GDDR7', tdp: 360, recPsu: 850, pcieGen: '5.0', gamingScore: 95, workstationScore: 94, badge: 'الجيل الجديد 4K 240Hz DLSS 4' },
    { id: 'gpu-rtx5080-trio', name: 'MSI GeForce RTX 5080 16G Gaming Trio OC GDDR7', price: 1199, chipset: 'RTX 5080', vram: 16, vramType: 'GDDR7', tdp: 360, recPsu: 850, pcieGen: '5.0', gamingScore: 94, workstationScore: 93, badge: 'أداء 4K خارق' },
    { id: 'gpu-rtx5070ti-tuf', name: 'ASUS TUF Gaming GeForce RTX 5070 Ti 16GB GDDR7 OC', price: 849, chipset: 'RTX 5070 Ti', vram: 16, vramType: 'GDDR7', tdp: 300, recPsu: 750, pcieGen: '5.0', gamingScore: 89, workstationScore: 88, badge: 'ملك الـ 2K 240Hz و 4K' },
    { id: 'gpu-rtx5070ti-aorus', name: 'Gigabyte AORUS GeForce RTX 5070 Ti Master 16GB GDDR7', price: 869, chipset: 'RTX 5070 Ti', vram: 16, vramType: 'GDDR7', tdp: 300, recPsu: 750, pcieGen: '5.0', gamingScore: 89, workstationScore: 88, badge: '16GB GDDR7 مع DLSS 4' },
    // RTX 40 Series
    { id: 'gpu-rtx4090-strix', name: 'ASUS ROG Strix GeForce RTX 4090 OC Edition 24GB GDDR6X', price: 1899, chipset: 'RTX 4090', vram: 24, vramType: 'GDDR6X', tdp: 450, recPsu: 850, pcieGen: '4.0', gamingScore: 97, workstationScore: 97, badge: '24GB VRAM للذكاء الاصطناعي و 4K' },
    { id: 'gpu-rtx4080s-strix', name: 'ASUS ROG Strix GeForce RTX 4080 Super 16GB GDDR6X OC', price: 1099, chipset: 'RTX 4080 Super', vram: 16, vramType: 'GDDR6X', tdp: 320, recPsu: 750, pcieGen: '4.0', gamingScore: 90, workstationScore: 90, badge: 'ممتاز للألعاب 4K والمونتاج' },
    { id: 'gpu-rtx4070tis-trio', name: 'MSI GeForce RTX 4070 Ti Super 16G Gaming X Slim', price: 799, chipset: 'RTX 4070 Ti Super', vram: 16, vramType: 'GDDR6X', tdp: 285, recPsu: 700, pcieGen: '4.0', gamingScore: 85, workstationScore: 85, badge: '16GB VRAM بسعر متوازن' },
    { id: 'gpu-rtx4070s-dual', name: 'ASUS Dual GeForce RTX 4070 Super EVO OC 12GB GDDR6X', price: 599, chipset: 'RTX 4070 Super', vram: 12, vramType: 'GDDR6X', tdp: 220, recPsu: 650, pcieGen: '4.0', gamingScore: 80, workstationScore: 79, badge: 'أفضل كرت 1440p مقابل السعر' },
    { id: 'gpu-rtx4060ti-16g', name: 'MSI Gaming GeForce RTX 4060 Ti 16GB Ventus 2X Black OC', price: 449, chipset: 'RTX 4060 Ti', vram: 16, vramType: 'GDDR6', tdp: 165, recPsu: 550, pcieGen: '4.0', gamingScore: 72, workstationScore: 76, badge: '16GB VRAM للمونتاج والبرمجة' },
    { id: 'gpu-rtx4060-8g', name: 'ASUS Dual GeForce RTX 4060 OC Edition 8GB GDDR6', price: 299, chipset: 'RTX 4060', vram: 8, vramType: 'GDDR6', tdp: 115, recPsu: 550, pcieGen: '4.0', gamingScore: 65, workstationScore: 66, badge: 'ملك التجميعات الاقتصادية 1080p/2K' },
    // AMD Radeon
    { id: 'gpu-rx7900xtx-nitro', name: 'Sapphire Nitro+ AMD Radeon RX 7900 XTX Vapor-X 24GB GDDR6', price: 929, chipset: 'RX 7900 XTX', vram: 24, vramType: 'GDDR6', tdp: 355, recPsu: 850, pcieGen: '4.0', gamingScore: 91, workstationScore: 86, badge: '24GB VRAM قوة خام هائلة' },
    { id: 'gpu-rx7900xt-pulse', name: 'Sapphire Pulse AMD Radeon RX 7900 XT 20GB GDDR6', price: 689, chipset: 'RX 7900 XT', vram: 20, vramType: 'GDDR6', tdp: 315, recPsu: 750, pcieGen: '4.0', gamingScore: 85, workstationScore: 81, badge: '20GB VRAM قيمة استثنائية' },
    { id: 'gpu-rx7800xt-gigabyte', name: 'Gigabyte Radeon RX 7800 XT Gaming OC 16GB GDDR6', price: 489, chipset: 'RX 7800 XT', vram: 16, vramType: 'GDDR6', tdp: 263, recPsu: 700, pcieGen: '4.0', gamingScore: 78, workstationScore: 75, badge: 'بطل دقة 2K بذاكرة 16GB' }
  ],

  ram: [
    { id: 'ram-gskill-z5neo-32', name: 'G.Skill Trident Z5 Neo RGB 32GB (2x16GB) DDR5-6000 CL30 AMD EXPO', price: 112, ddr: 'DDR5', speedMHz: 6000, capacityGB: 32, casLatency: 30, modules: '2x16GB', badge: 'السرعة المثالية لمعالجات Ryzen AM5' },
    { id: 'ram-gskill-z5rgb-64', name: 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5-6400 CL32', price: 214, ddr: 'DDR5', speedMHz: 6400, capacityGB: 64, casLatency: 32, modules: '2x32GB', badge: 'مثالية للمونتاج الثقيل والبرمجة' },
    { id: 'ram-gskill-z5ck-48-8400', name: 'G.Skill Trident Z5 CK 48GB (2x24GB) DDR5-8400 CL40 CUDIMM', price: 329, ddr: 'DDR5', speedMHz: 8400, capacityGB: 48, casLatency: 40, modules: '2x24GB', badge: 'أقصى سرعة عالمية 8400MHz' },
    { id: 'ram-corsair-dom-64', name: 'Corsair Dominator Titanium RGB 64GB (2x32GB) DDR5-6600 CL32', price: 279, ddr: 'DDR5', speedMHz: 6600, capacityGB: 64, casLatency: 32, modules: '2x32GB', badge: 'فئة النخبة Dominator Titanium' },
    { id: 'ram-corsair-veng-192', name: 'Corsair Vengeance RGB 192GB (4x48GB) DDR5-5600 Workstation Kit', price: 649, ddr: 'DDR5', speedMHz: 5600, capacityGB: 192, casLatency: 40, modules: '4x48GB', badge: 'سعة 192GB للذكاء الاصطناعي و 8K' },
    { id: 'ram-corsair-veng-32-6000', name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5-6000 CL30', price: 109, ddr: 'DDR5', speedMHz: 6000, capacityGB: 32, casLatency: 30, modules: '2x16GB', badge: 'الأكثر مبيعاً DDR5' },
    { id: 'ram-kingston-renegade-48-8000', name: 'Kingston FURY Renegade RGB 48GB (2x24GB) DDR5-8000 CL38', price: 269, ddr: 'DDR5', speedMHz: 8000, capacityGB: 48, casLatency: 38, modules: '2x24GB', badge: 'سرعة فائقة 8000MHz' },
    { id: 'ram-kingston-beast-32', name: 'Kingston FURY Beast RGB 32GB (2x16GB) DDR5-6000 CL30', price: 105, ddr: 'DDR5', speedMHz: 6000, capacityGB: 32, casLatency: 30, modules: '2x16GB', badge: 'ثبات وأداء ممتاز' },
    { id: 'ram-team-delta-32', name: 'TeamGroup T-Force Delta RGB 32GB (2x16GB) DDR5-6000 CL30', price: 96, ddr: 'DDR5', speedMHz: 6000, capacityGB: 32, casLatency: 30, modules: '2x16GB', badge: 'أفضل قيمة DDR5-6000 CL30' },
    { id: 'ram-gskill-ripjaws-16-d5', name: 'G.Skill Ripjaws S5 16GB (2x8GB) DDR5-5600 CL36', price: 64, ddr: 'DDR5', speedMHz: 5600, capacityGB: 16, casLatency: 36, modules: '2x8GB', badge: 'خيار اقتصادي DDR5' },
    { id: 'ram-corsair-veng-32-d4', name: 'Corsair Vengeance RGB Pro 32GB (2x16GB) DDR4-3600 CL18', price: 72, ddr: 'DDR4', speedMHz: 3600, capacityGB: 32, casLatency: 18, modules: '2x16GB', badge: 'الأفضل لمنصات DDR4' },
    { id: 'ram-corsair-lpx-16-d4', name: 'Corsair Vengeance LPX 16GB (2x8GB) DDR4-3200 CL16', price: 42, ddr: 'DDR4', speedMHz: 3200, capacityGB: 16, casLatency: 16, modules: '2x8GB', badge: 'اقتصادية وموثوقة DDR4' }
  ],

  storage: [
    { id: 'ssd-crucial-t705-2tb', name: 'Crucial T705 2TB PCIe Gen5 NVMe M.2 SSD (14,500 MB/s)', price: 269, capacityGB: 2000, pcieGen: '5.0', readSpeedMBs: 14500, type: 'NVMe Gen5', badge: 'أسرع SSD في العالم 14,500 MB/s' },
    { id: 'ssd-crucial-t700-2tb', name: 'Crucial T700 2TB PCIe Gen5 NVMe M.2 SSD (12,400 MB/s)', price: 229, capacityGB: 2000, pcieGen: '5.0', readSpeedMBs: 12400, type: 'NVMe Gen5', badge: 'سرعة Gen5 خارقة للمونتاج' },
    { id: 'ssd-sabrent-rocket5-2tb', name: 'Sabrent Rocket 5 2TB PCIe Gen5 NVMe M.2 SSD (14,000 MB/s)', price: 279, capacityGB: 2000, pcieGen: '5.0', readSpeedMBs: 14000, type: 'NVMe Gen5', badge: 'أداء احترافي للـ 8K' },
    { id: 'ssd-corsair-mp700pro-2tb', name: 'Corsair MP700 PRO SE 2TB PCIe Gen5 NVMe M.2 (14,000 MB/s)', price: 264, capacityGB: 2000, pcieGen: '5.0', readSpeedMBs: 14000, type: 'NVMe Gen5', badge: 'قمة الأداء من Corsair' },
    { id: 'ssd-samsung-990pro-4tb', name: 'Samsung 990 PRO 4TB PCIe Gen4 NVMe M.2 SSD (7,450 MB/s)', price: 309, capacityGB: 4000, pcieGen: '4.0', readSpeedMBs: 7450, type: 'NVMe Gen4', badge: 'مساحة ضخمة 4TB وأعلى موثوقية' },
    { id: 'ssd-samsung-990pro-2tb', name: 'Samsung 990 PRO 2TB PCIe Gen4 NVMe M.2 SSD (7,450 MB/s)', price: 159, capacityGB: 2000, pcieGen: '4.0', readSpeedMBs: 7450, type: 'NVMe Gen4', badge: 'الأكثر مبيعاً واعتمادية عالمياً' },
    { id: 'ssd-samsung-990evo-1tb', name: 'Samsung 990 EVO Plus 1TB PCIe 4.0/5.0 NVMe M.2 (7,250 MB/s)', price: 89, capacityGB: 1000, pcieGen: '4.0', readSpeedMBs: 7250, type: 'NVMe Gen4', badge: 'سريع وبارد جداً' },
    { id: 'ssd-samsung-980pro-2tb', name: 'Samsung 980 PRO 2TB PCIe Gen4 NVMe M.2 SSD (7,000 MB/s)', price: 149, capacityGB: 2000, pcieGen: '4.0', readSpeedMBs: 7000, type: 'NVMe Gen4', badge: 'كلاسيكي موثوق' },
    { id: 'ssd-wd-sn850x-2tb', name: 'WD_BLACK SN850X 2TB PCIe Gen4 NVMe M.2 SSD (7,300 MB/s)', price: 149, capacityGB: 2000, pcieGen: '4.0', readSpeedMBs: 7300, type: 'NVMe Gen4', badge: 'المفضل للاعبين Game Mode 2.0' },
    { id: 'ssd-wd-sn770-1tb', name: 'WD_BLACK SN770 1TB PCIe Gen4 NVMe M.2 SSD (5,150 MB/s)', price: 69, capacityGB: 1000, pcieGen: '4.0', readSpeedMBs: 5150, type: 'NVMe Gen4', badge: 'أفضل SSD اقتصادي للألعاب' },
    { id: 'ssd-kingston-renegade-2tb', name: 'Kingston FURY Renegade 2TB PCIe Gen4 NVMe M.2 (7,300 MB/s)', price: 144, capacityGB: 2000, pcieGen: '4.0', readSpeedMBs: 7300, type: 'NVMe Gen4', badge: 'مشتت حراري graphene مدمج' },
    { id: 'ssd-kingston-kc3000-2tb', name: 'Kingston KC3000 2TB PCIe Gen4 NVMe M.2 (7,000 MB/s)', price: 139, capacityGB: 2000, pcieGen: '4.0', readSpeedMBs: 7000, type: 'NVMe Gen4', badge: 'DRAM Cache كامل للمونتاج' },
    { id: 'ssd-lexar-nm790-2tb', name: 'Lexar NM790 2TB PCIe Gen4 NVMe M.2 SSD (7,400 MB/s)', price: 124, capacityGB: 2000, pcieGen: '4.0', readSpeedMBs: 7400, type: 'NVMe Gen4', badge: 'أفضل قيمة 2TB بسرعة 7400MB/s' },
    { id: 'ssd-crucial-p3plus-1tb', name: 'Crucial P3 Plus 1TB PCIe Gen4 NVMe M.2 SSD (5,000 MB/s)', price: 59, capacityGB: 1000, pcieGen: '4.0', readSpeedMBs: 5000, type: 'NVMe Gen4', badge: 'السعر الاقتصادي الأفضل' }
  ],

  cooler: [
    { id: 'cool-rog-ryujin3-360', name: 'ASUS ROG Ryujin III 360 ARGB Extreme AIO Liquid Cooler (3.5" LCD)', price: 349, type: '360mm AIO LCD', maxTdp: 350, badge: 'شاشة LCD ومضخة Asetek Emma Gen8 V2' },
    { id: 'cool-nzxt-kraken-elite-360', name: 'NZXT Kraken Elite 360 RGB (2024) AIO Liquid Cooler IPS LCD', price: 299, type: '360mm AIO LCD', maxTdp: 340, badge: 'أجمل شاشة عرض دائرية' },
    { id: 'cool-lianli-galahad2-lcd', name: 'Lian Li Galahad II LCD SL-INF 360 ARGB Liquid Cooler', price: 249, type: '360mm AIO LCD', maxTdp: 330, badge: 'مراوح Infinity ساحرة' },
    { id: 'cool-arctic-lf3-360', name: 'ARCTIC Liquid Freezer III 360 A-RGB High-Performance AIO', price: 115, type: '360mm AIO', maxTdp: 320, badge: 'أقوى أداء تبريد مقابل السعر' },
    { id: 'cool-noctua-nhd15-g2', name: 'Noctua NH-D15 G2 Flagship Dual-Tower CPU Air Cooler', price: 149, type: 'Dual-Tower Air', maxTdp: 280, badge: 'ملك التبريد الهوائي مدى الحياة' },
    { id: 'cool-thermalright-pa120', name: 'Thermalright Peerless Assassin 120 SE ARGB Dual-Tower', price: 36, type: 'Dual-Tower Air', maxTdp: 245, badge: 'الأسطورة الاقتصادية رقم #1' }
  ],

  psu: [
    { id: 'psu-rog-thor-1600t', name: 'ASUS ROG Thor 1600W Titanium ATX 3.1 (OLED Display, Dual 12V-2x6)', price: 699, wattage: 1600, efficiency: '80+ Titanium', atxVersion: 'ATX 3.1', badge: 'مخصص لـ RTX 5090 وكسر السرعة الأقصى' },
    { id: 'psu-rog-thor-1200p2', name: 'ASUS ROG Thor 1200W Platinum II ATX 3.1 OLED Modular PSU', price: 359, wattage: 1200, efficiency: '80+ Platinum', atxVersion: 'ATX 3.1', badge: 'شاشة OLED لقياس استهلاك الواط لحظياً' },
    { id: 'psu-seasonic-vertex-1200', name: 'Seasonic VERTEX PX-1200 1200W 80+ Platinum ATX 3.1 Full Modular', price: 269, wattage: 1200, efficiency: '80+ Platinum', atxVersion: 'ATX 3.1', badge: 'ضمان 12 سنة وجودة يابانية 100%' },
    { id: 'psu-corsair-rm1000x-shift', name: 'Corsair RM1000x Shift 1000W 80+ Gold ATX 3.1 PCIe 5.1 Modular', price: 189, wattage: 1000, efficiency: '80+ Gold', atxVersion: 'ATX 3.1', badge: 'منافذ جانبية لتنظيم الكابلات بسهولة' },
    { id: 'psu-corsair-rm850e', name: 'Corsair RM850e (2025) 850W 80+ Gold ATX 3.1 PCIe 5.1 Modular', price: 119, wattage: 850, efficiency: '80+ Gold', atxVersion: 'ATX 3.1', badge: 'مثالي لكروت RTX 5080 / 4080 Super' },
    { id: 'psu-msi-a850gl', name: 'MSI MAG A850GL PCIE5 850W 80+ Gold ATX 3.1 Full Modular', price: 109, wattage: 850, efficiency: '80+ Gold', atxVersion: 'ATX 3.1', badge: 'كابل 12V-2x6 بلون أصفر للأمان' },
    { id: 'psu-corsair-rm750e', name: 'Corsair RM750e 750W 80+ Gold ATX 3.1 Low-Noise Modular', price: 99, wattage: 750, efficiency: '80+ Gold', atxVersion: 'ATX 3.1', badge: 'الأفضل للتجميعات المتوسطة والعليا' },
    { id: 'psu-msi-a650bn', name: 'MSI MAG A650BN 650W 80+ Bronze Power Supply', price: 59, wattage: 650, efficiency: '80+ Bronze', atxVersion: 'ATX 3.0', badge: 'خيار اقتصادي موثوق' }
  ],

  case: [
    { id: 'case-rog-hyperion', name: 'ASUS ROG Hyperion GR701 E-ATX Full-Tower Gaming Case (Aluminum)', price: 429, formFactor: 'E-ATX Full Tower', badge: 'تحفة فنية عملاقة من ROG' },
    { id: 'case-hyte-y70-touch', name: 'HYTE Y70 Touch Infinite Dual-Chamber Case with 14.9" 2.5K Screen', price: 379, formFactor: 'ATX Mid Tower', badge: 'شاشة لمس تفاعلية مدمجة 14.9 بوصة' },
    { id: 'case-lianli-o11-evo-rgb', name: 'Lian Li O11 Dynamic EVO RGB Tempered Glass Dual-Chamber', price: 159, formFactor: 'E-ATX / ATX', badge: 'الكيس الأكثر شهرة وجمالاً في العالم' },
    { id: 'case-lianli-o11-vision', name: 'Lian Li O11 Vision Three-Sided Frameless Tempered Glass', price: 139, formFactor: 'E-ATX / ATX', badge: 'واجهة زجاجية بانورامية من 3 جهات' },
    { id: 'case-nzxt-h9-flow', name: 'NZXT H9 Flow Dual-Chamber Mid-Tower Airflow Case', price: 159, formFactor: 'ATX Mid Tower', badge: 'تدفق هواء مثالي وتصميم أنيق' },
    { id: 'case-corsair-4000d', name: 'Corsair 4000D Airflow Tempered Glass Mid-Tower ATX Case', price: 94, formFactor: 'ATX Mid Tower', badge: 'الأكثر مبيعاً وسهولة في التركيب' },
    { id: 'case-montech-xr', name: 'Montech XR Panoramic Tempered Glass ATX Case with 3x ARGB Fans', price: 69, formFactor: 'ATX Mid Tower', badge: 'أفضل كيس بانورامي اقتصادي' }
  ],

  monitor: [
    { id: 'mon-rog-pg32ucdm', name: 'ASUS ROG Swift OLED PG32UCDM 32" 4K UHD 240Hz 0.03ms QD-OLED', price: 1199, resolution: '3840x2160 (4K)', refreshRate: 240, panel: 'QD-OLED', size: 32, badge: 'أفضل شاشة 4K 240Hz OLED في العالم' },
    { id: 'mon-rog-pg27aqdp', name: 'ASUS ROG Swift OLED PG27AQDP 27" 2K QHD 480Hz 0.03ms WOLED', price: 999, resolution: '2560x1440 (2K)', refreshRate: 480, panel: 'WOLED', size: 27, badge: 'سرعة خارقة 480Hz للألعاب التنافسية' },
    { id: 'mon-msi-321urx', name: 'MSI MPG 321URX QD-OLED 32" 4K UHD 240Hz 0.03ms Gaming Monitor', price: 949, resolution: '3840x2160 (4K)', refreshRate: 240, panel: 'QD-OLED', size: 32, badge: 'أفضل قيمة لشاشة 4K 240Hz QD-OLED' },
    { id: 'mon-rog-xg27aqdmg', name: 'ASUS ROG Strix OLED XG27AQDMG 27" 2K 240Hz Glossy OLED', price: 649, resolution: '2560x1440 (2K)', refreshRate: 240, panel: 'Glossy WOLED', size: 27, badge: 'ألوان OLED مذهلة بدقة 2K 240Hz' },
    { id: 'mon-tuf-vg27aqml1a', name: 'ASUS TUF Gaming VG27AQML1A 27" 2K QHD 260Hz 1ms Fast IPS', price: 289, resolution: '2560x1440 (2K)', refreshRate: 260, panel: 'Fast IPS', size: 27, badge: 'مثالية لـ 2K بمعدل 260Hz' },
    { id: 'mon-aoc-q27g3xmn', name: 'AOC Q27G3XMN 27" 2K QHD 180Hz Mini-LED HDR1000 Gaming Monitor', price: 279, resolution: '2560x1440 (2K)', refreshRate: 180, panel: 'Mini-LED VA', size: 27, badge: 'سطوع HDR1000 حقيقي بسعر اقتصادي' },
    { id: 'mon-tuf-vg249q3a', name: 'ASUS TUF Gaming VG249Q3A 24" 1080p FHD 180Hz 1ms Fast IPS', price: 129, resolution: '1920x1080 (FHD)', refreshRate: 180, panel: 'Fast IPS', size: 24, badge: 'أفضل شاشة اقتصادية 180Hz' }
  ]
};

function inferCpuSpecs(item) {
  const name = item.name || '';
  const n = name.toLowerCase();
  let socket = 'AM5';
  let ddr = 'DDR5';
  if (n.includes('9950') || n.includes('9900') || n.includes('9800') || n.includes('9700') || n.includes('9600') || n.includes('7950') || n.includes('7900') || n.includes('7800') || n.includes('7700') || n.includes('7600') || n.includes('7500') || n.includes('8700') || n.includes('8600')) {
    socket = 'AM5'; ddr = 'DDR5';
  } else if (n.includes('5950') || n.includes('5900') || n.includes('5800') || n.includes('5700') || n.includes('5600') || n.includes('5500') || n.includes('3600')) {
    socket = 'AM4'; ddr = 'DDR4';
  } else if (n.includes('ultra ') || n.includes('285k') || n.includes('265k') || n.includes('245k')) {
    socket = 'LGA1851'; ddr = 'DDR5';
  } else if (n.includes('14900') || n.includes('14700') || n.includes('14600') || n.includes('14400') || n.includes('13900') || n.includes('13700') || n.includes('13600') || n.includes('13400') || n.includes('12900') || n.includes('12700') || n.includes('12600') || n.includes('12400')) {
    socket = 'LGA1700'; ddr = 'DDR5/DDR4';
  }
  const cores = item.core_count || 8;
  const boost = item.boost_clock || item.core_clock || 4.8;
  const gamingScore = Math.min(98, Math.max(55, Math.round(50 + boost * 6 + (n.includes('x3d') ? 16 : 0) + Math.min(cores, 12) * 1.2)));
  const workstationScore = Math.min(99, Math.max(50, Math.round(40 + cores * 2.5 + boost * 3)));
  return {
    id: `gh-cpu-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name,
    price: Number(item.price) || 249,
    socket,
    ddr,
    cores,
    threads: cores * 2,
    baseClock: item.core_clock || 3.8,
    boostClock: boost,
    tdp: item.tdp || 105,
    pcieGen: socket === 'AM4' ? '4.0' : '5.0',
    gamingScore,
    workstationScore,
    badge: `${cores} أنوية • ${boost}GHz`
  };
}

function inferMotherboardSpecs(item) {
  const name = item.name || '';
  const n = name.toLowerCase();
  const socket = item.socket || (n.includes('z890') || n.includes('b860') ? 'LGA1851' : n.includes('z790') || n.includes('b760') || n.includes('z690') ? 'LGA1700' : n.includes('b550') || n.includes('x570') ? 'AM4' : 'AM5');
  const ddr = (socket === 'AM4' || n.includes('ddr4') || n.includes(' d4')) ? 'DDR4' : 'DDR5';
  const pcieGen = (n.includes('x870') || n.includes('z890') || n.includes('b650e') || n.includes('x670e') || n.includes('z790')) ? '5.0' : '4.0';
  return {
    id: `gh-mb-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name,
    price: Number(item.price) || 189,
    socket,
    ddr,
    maxMemory: item.max_memory || 192,
    pcieGen,
    formFactor: item.form_factor || 'ATX',
    badge: `${socket} • ${ddr} • ${item.form_factor || 'ATX'}`
  };
}

function inferGpuSpecs(item) {
  const name = `${item.name || ''} ${item.chipset || ''}`.trim();
  const n = name.toLowerCase();
  const vram = item.memory || 12;
  let gamingScore = 70;
  if (n.includes('5090')) gamingScore = 100;
  else if (n.includes('4090')) gamingScore = 97;
  else if (n.includes('5080')) gamingScore = 94;
  else if (n.includes('7900 xtx') || n.includes('4080')) gamingScore = 90;
  else if (n.includes('5070 ti') || n.includes('4070 ti')) gamingScore = 86;
  else if (n.includes('7900 xt') || n.includes('4070 super')) gamingScore = 81;
  else if (n.includes('7800 xt') || n.includes('4070')) gamingScore = 77;
  else if (n.includes('4060 ti') || n.includes('7700 xt')) gamingScore = 72;
  else if (n.includes('4060') || n.includes('7600')) gamingScore = 65;
  return {
    id: `gh-gpu-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name,
    price: Number(item.price) || 499,
    chipset: item.chipset || 'GPU',
    vram,
    tdp: vram >= 24 ? 420 : vram >= 16 ? 285 : 190,
    recPsu: vram >= 24 ? 850 : vram >= 16 ? 750 : 650,
    pcieGen: n.includes('5090') || n.includes('5080') || n.includes('5070') ? '5.0' : '4.0',
    gamingScore,
    workstationScore: Math.min(100, gamingScore + (vram >= 16 ? 4 : 0)),
    badge: `${vram}GB VRAM • ${item.chipset || 'GPU'}`
  };
}

function inferRamSpecs(item) {
  const ddrNum = Array.isArray(item.speed) ? item.speed[0] : 5;
  const speedMHz = Array.isArray(item.speed) ? item.speed[1] : 6000;
  const capacityGB = Array.isArray(item.modules) ? item.modules[0] * item.modules[1] : 32;
  const ddr = `DDR${ddrNum}`;
  const fullName = `${item.name} ${ddr}-${speedMHz} CL${item.cas_latency || 32}`;
  return {
    id: `gh-ram-${fullName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name: fullName,
    price: Number(item.price) || 99,
    ddr,
    speedMHz,
    capacityGB,
    casLatency: item.cas_latency || 32,
    badge: `${capacityGB}GB • ${ddr}-${speedMHz}`
  };
}

function inferStorageSpecs(item) {
  const capGB = item.capacity || 1000;
  const capLabel = capGB >= 1000 ? `${capGB / 1000}TB` : `${capGB}GB`;
  const iface = item.interface || 'M.2 PCIe 4.0 X4';
  const pcieGen = iface.includes('5.0') ? '5.0' : '4.0';
  const fullName = item.name.includes('TB') || item.name.includes('GB') ? item.name : `${item.name} ${capLabel} NVMe SSD`;
  return {
    id: `gh-ssd-${fullName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name: fullName,
    price: Number(item.price) || 99,
    capacityGB: capGB,
    pcieGen,
    readSpeedMBs: pcieGen === '5.0' ? 12000 : 7000,
    type: `NVMe Gen${pcieGen === '5.0' ? '5' : '4'}`,
    badge: `${capLabel} • ${iface}`
  };
}

async function fetchJsonDataset(fileName) {
  const url = `${GITHUB_DATASET_BASE}${fileName}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return await res.json();
}

export async function buildSeededCatalog() {
  console.log('🌐 Fetching open-source worldwide PC parts dataset from GitHub (docyx/pc-part-dataset)...');
  const catalog = {};
  const stats = { totalFetchedFromGithub: 0, totalSeededInCatalog: 0 };

  for (const [category, fileName] of Object.entries(DATASET_FILES)) {
    const flagships = (FLAGSHIP_CATALOG[category] || []).map(p => decoratePart(p, category));
    const seenNames = new Set(flagships.map(p => p.name.toLowerCase()));
    const extraParts = [];

    try {
      const rawData = await fetchJsonDataset(fileName);
      stats.totalFetchedFromGithub += rawData.length;
      console.log(`  ✓ ${fileName}: ${rawData.length.toLocaleString()} worldwide parts fetched`);

      // Filter valid priced items and pick popular / well-known models so the catalog stays fast & rich
      const validItems = rawData.filter(x => x && x.name && x.price && Number(x.price) > 25);
      for (const raw of validItems) {
        if (extraParts.length >= 45) break;
        let parsed = null;
        if (category === 'cpu') parsed = inferCpuSpecs(raw);
        else if (category === 'motherboard') parsed = inferMotherboardSpecs(raw);
        else if (category === 'gpu') parsed = inferGpuSpecs(raw);
        else if (category === 'ram') parsed = inferRamSpecs(raw);
        else if (category === 'storage' && String(raw.interface || '').includes('PCIe')) parsed = inferStorageSpecs(raw);
        else if (category === 'cooler') {
          parsed = {
            id: `gh-cool-${raw.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
            name: raw.name,
            price: Number(raw.price),
            type: raw.size ? `${raw.size}mm AIO` : 'Air Cooler',
            maxTdp: raw.size >= 360 ? 320 : 220,
            badge: raw.size ? `${raw.size}mm Liquid` : 'CPU Cooler'
          };
        } else if (category === 'psu' && raw.wattage >= 600) {
          parsed = {
            id: `gh-psu-${raw.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
            name: `${raw.name} ${raw.wattage}W`,
            price: Number(raw.price),
            wattage: Number(raw.wattage),
            efficiency: `80+ ${raw.efficiency || 'Gold'}`,
            atxVersion: 'ATX 3.0',
            badge: `${raw.wattage}W • 80+ ${(raw.efficiency || 'Gold').toUpperCase()}`
          };
        } else if (category === 'case') {
          parsed = {
            id: `gh-case-${raw.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
            name: raw.name,
            price: Number(raw.price),
            formFactor: raw.type || 'ATX Mid Tower',
            badge: `${raw.type || 'ATX'} • ${raw.side_panel || 'Tempered Glass'}`
          };
        } else if (category === 'monitor' && raw.refresh_rate >= 144) {
          const resStr = Array.isArray(raw.resolution) ? `${raw.resolution[0]}x${raw.resolution[1]}` : '2560x1440';
          parsed = {
            id: `gh-mon-${raw.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
            name: `${raw.name} ${raw.screen_size || 27}" ${resStr} ${raw.refresh_rate}Hz`,
            price: Number(raw.price),
            resolution: resStr,
            refreshRate: raw.refresh_rate,
            panel: raw.panel_type || 'IPS',
            size: raw.screen_size || 27,
            badge: `${raw.screen_size || 27}" • ${resStr} • ${raw.refresh_rate}Hz`
          };
        }

        if (parsed && !seenNames.has(parsed.name.toLowerCase())) {
          seenNames.add(parsed.name.toLowerCase());
          extraParts.push(decoratePart(parsed, category));
        }
      }
    } catch (err) {
      console.warn(`  ⚠ Warning fetching ${fileName}: ${err.message} (using built-in flagship catalog)`);
    }

    catalog[category] = [...flagships, ...extraParts];
    stats.totalSeededInCatalog += catalog[category].length;
  }

  const outDir = path.join(__dirname, '..', 'public', 'data');
  fs.mkdirSync(outDir, { recursive: true });
  const payload = {
    generatedAt: new Date().toISOString(),
    sourceRepo: 'https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/',
    stats,
    categories: catalog
  };
  const outPath = path.join(outDir, 'hardware_catalog.json');
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`✅ Seeded ${stats.totalSeededInCatalog} curated + flagship parts (from ${stats.totalFetchedFromGithub.toLocaleString()} global GitHub dataset records) -> ${outPath}`);
  return payload;
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  buildSeededCatalog().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
