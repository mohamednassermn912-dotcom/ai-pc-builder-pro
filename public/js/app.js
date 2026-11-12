import {
  analyzeBuildLocal,
  buildBestForBudgetLocal,
  synthesizePartFromQuery,
  getOfficialManufacturer
} from './hardware_engine.js';

const SLOT_DEFINITIONS = [
  { key: 'cpu', title: '1. المعالج (CPU)', icon: '🧠', ghFile: 'cpu.json' },
  { key: 'motherboard', title: '2. اللوحة الأم (Motherboard)', icon: '🎛️', ghFile: 'motherboard.json' },
  { key: 'gpu', title: '3. كرت الشاشة (GPU)', icon: '🎮', ghFile: 'video-card.json' },
  { key: 'ram', title: '4. الرامات (RAM)', icon: '⚡', ghFile: 'memory.json' },
  { key: 'storage', title: '5. التخزين (SSD / NVMe)', icon: '💾', ghFile: 'internal-hard-drive.json' },
  { key: 'cooler', title: '6. مبرد المعالج (CPU Cooler)', icon: '❄️', ghFile: 'cpu-cooler.json' },
  { key: 'psu', title: '7. مزود الطاقة (Power Supply - PSU)', icon: '🔌', ghFile: 'power-supply.json' },
  { key: 'case', title: '8. الكيس (Case)', icon: '🖥️', ghFile: 'case.json' },
  { key: 'monitor', title: '9. الشاشة (Monitor)', icon: '🖵', ghFile: 'monitor.json' }
];

const state = {
  catalog: {},
  selectedBuild: {},
  partReasons: {},
  slotSearchFilters: {},
  activeModalCategory: null
};

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'toast-msg';
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 300);
  }, 3800);
}

function formatUsd(num) {
  const n = Number(num) || 0;
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

function getSpecBadges(part, category) {
  if (!part) return [];
  const chips = [];
  if (part.badge) chips.push({ text: part.badge, highlight: true });
  if (category === 'cpu') {
    if (part.socket) chips.push({ text: `المقبس: ${part.socket}` });
    if (part.cores) chips.push({ text: `${part.cores} أنوية / ${part.threads || part.cores * 2} مسار` });
    if (part.boostClock) chips.push({ text: `Boost: ${part.boostClock}GHz` });
    if (part.tdp) chips.push({ text: `TDP: ${part.tdp}W` });
  } else if (category === 'motherboard') {
    if (part.socket) chips.push({ text: `Socket: ${part.socket}` });
    if (part.ddr) chips.push({ text: `RAM: ${part.ddr}` });
    if (part.pcieGen) chips.push({ text: `PCIe ${part.pcieGen}` });
    if (part.formFactor) chips.push({ text: part.formFactor });
  } else if (category === 'gpu') {
    if (part.vram) chips.push({ text: `${part.vram}GB VRAM` });
    if (part.pcieGen) chips.push({ text: `PCIe ${part.pcieGen}` });
    if (part.recPsu) chips.push({ text: `موصى به: ${part.recPsu}W` });
  } else if (category === 'ram') {
    if (part.ddr) chips.push({ text: part.ddr });
    if (part.speedMHz) chips.push({ text: `${part.speedMHz}MHz` });
    if (part.capacityGB) chips.push({ text: `${part.capacityGB}GB` });
  } else if (category === 'storage') {
    if (part.capacityGB) chips.push({ text: part.capacityGB >= 1000 ? `${part.capacityGB / 1000}TB` : `${part.capacityGB}GB` });
    if (part.readSpeedMBs) chips.push({ text: `${part.readSpeedMBs.toLocaleString()} MB/s` });
    if (part.pcieGen) chips.push({ text: `PCIe ${part.pcieGen}` });
  } else if (category === 'psu') {
    if (part.wattage) chips.push({ text: `${part.wattage}W` });
    if (part.efficiency) chips.push({ text: part.efficiency });
    if (part.atxVersion) chips.push({ text: part.atxVersion });
  } else if (category === 'cooler') {
    if (part.type) chips.push({ text: part.type });
    if (part.maxTdp) chips.push({ text: `حتى ${part.maxTdp}W TDP` });
  } else if (category === 'case') {
    if (part.formFactor) chips.push({ text: part.formFactor });
  } else if (category === 'monitor') {
    if (part.resolution) chips.push({ text: part.resolution });
    if (part.refreshRate) chips.push({ text: `${part.refreshRate}Hz` });
    if (part.panel) chips.push({ text: part.panel });
  }
  return chips;
}

// Render all 9 Interactive PC Builder Slots
function renderBuilderSlots() {
  const container = document.getElementById('slotsContainer');
  if (!container) return;
  container.innerHTML = '';

  for (const slot of SLOT_DEFINITIONS) {
    const partsList = state.catalog[slot.key] || [];
    const selected = state.selectedBuild[slot.key] || partsList[0];
    if (selected && !state.selectedBuild[slot.key]) {
      state.selectedBuild[slot.key] = selected;
    }

    const filterText = (state.slotSearchFilters[slot.key] || '').toLowerCase().trim();
    const filteredParts = filterText
      ? partsList.filter(p => p.name.toLowerCase().includes(filterText) || (p.badge || '').toLowerCase().includes(filterText) || (p.socket || '').toLowerCase().includes(filterText))
      : partsList;

    // Ensure currently selected part is always in the dropdown options
    const optionsList = filteredParts.some(p => p.id === selected?.id)
      ? filteredParts
      : (selected ? [selected, ...filteredParts] : filteredParts);

    const chips = getSpecBadges(selected, slot.key);
    const reason = state.partReasons[slot.key];
    const amazonUrl = selected?.amazonUrl || `https://www.amazon.com/s?k=${encodeURIComponent(selected?.name || '')}`;
    const mfgInfo = getOfficialManufacturer(selected?.name || '');
    const mfgUrl = selected?.manufacturerUrl || mfgInfo.url;
    const mfgDomain = selected?.manufacturerDomain || mfgInfo.domain;

    const card = document.createElement('div');
    card.className = 'part-slot-card';
    card.innerHTML = `
      <div>
        <div class="slot-top">
          <div class="slot-category-title">
            <span class="slot-icon">${slot.icon}</span>
            <span>${slot.title}</span>
          </div>
          <span class="slot-price-tag">${formatUsd(selected?.price || 0)}</span>
        </div>

        <div class="slot-filter-row" style="margin-top:0.65rem;">
          <input type="text" class="slot-QuickSearch" data-slot-filter="${slot.key}" value="${state.slotSearchFilters[slot.key] || ''}" placeholder="تصفية سريعة في ${slot.title}..." />
          <button type="button" class="btn-catalog-modal" data-open-modal="${slot.key}">📋 الكتالوج (${partsList.length})</button>
        </div>

        <div style="margin-top:0.55rem;">
          <select class="rog-select" data-slot-select="${slot.key}">
            ${optionsList.map(p => `
              <option value="${p.id}" ${p.id === selected?.id ? 'selected' : ''}>
                ${p.name} — $${Number(p.price || 0).toLocaleString()}
              </option>
            `).join('')}
          </select>
        </div>

        <div class="selected-part-meta" style="margin-top:0.65rem;">
          ${chips.map(c => `<span class="meta-chip ${c.highlight ? 'highlight' : ''}">${c.text}</span>`).join('')}
        </div>

        ${reason ? `<div class="ai-reason-box" style="margin-top:0.6rem;">💡 <strong>سبب اختيار الذكاء الاصطناعي:</strong> ${reason}</div>` : ''}
      </div>

      <div class="store-links-row">
        <a href="${amazonUrl}" target="_blank" rel="noopener noreferrer" class="btn-amazon">
          <span>🛒 الشراء من أمازون</span>
        </a>
        <a href="${mfgUrl}" target="_blank" rel="noopener noreferrer" class="btn-manufacturer" title="${mfgDomain}">
          <span>🌐 موقع الشركة (${mfgDomain})</span>
        </a>
      </div>
    `;

    container.appendChild(card);
  }

  // Attach listeners for dropdown change, quick filter, and modal open
  container.querySelectorAll('[data-slot-select]').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const key = e.target.getAttribute('data-slot-select');
      const partId = e.target.value;
      const found = (state.catalog[key] || []).find(p => p.id === partId);
      if (found) {
        state.selectedBuild[key] = found;
        delete state.partReasons[key];
        renderBuilderSlots();
        renderSmartCart();
        runBuildAnalysis(false);
      }
    });
  });

  container.querySelectorAll('[data-slot-filter]').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const key = e.target.getAttribute('data-slot-filter');
      state.slotSearchFilters[key] = e.target.value;
      const cursorPos = e.target.selectionStart;
      renderBuilderSlots();
      const restored = container.querySelector(`[data-slot-filter="${key}"]`);
      if (restored) {
        restored.focus();
        restored.setSelectionRange(cursorPos, cursorPos);
      }
    });
  });

  container.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = e.currentTarget.getAttribute('data-open-modal');
      openCategoryModal(key);
    });
  });
}

// Render Smart Shopping Cart
function renderSmartCart() {
  const listEl = document.getElementById('cartItemsList');
  const totalEl = document.getElementById('cartTotalUsd');
  const navTotalEl = document.getElementById('navTotalUsd');
  const compatBadge = document.getElementById('cartCompatBadge');
  if (!listEl) return;

  let totalUsd = 0;
  listEl.innerHTML = '';

  for (const slot of SLOT_DEFINITIONS) {
    const part = state.selectedBuild[slot.key];
    if (!part) continue;
    const price = Number(part.price) || 0;
    totalUsd += price;

    const amazonUrl = part.amazonUrl || `https://www.amazon.com/s?k=${encodeURIComponent(part.name)}`;
    const mfg = getOfficialManufacturer(part.name);
    const mfgUrl = part.manufacturerUrl || mfg.url;
    const mfgDomain = part.manufacturerDomain || mfg.domain;

    const row = document.createElement('div');
    row.className = 'cart-item-row';
    row.innerHTML = `
      <div class="cart-item-top">
        <div>
          <div style="font-size:0.7rem; color:var(--cyber-cyan); font-weight:700;">${slot.icon} ${slot.title}</div>
          <div class="cart-item-name">${part.name}</div>
        </div>
        <div class="cart-item-price">${formatUsd(price)}</div>
      </div>
      <div class="cart-item-links">
        <a href="${amazonUrl}" target="_blank" rel="noopener noreferrer" class="btn-amazon">🛒 الشراء من أمازون</a>
        <a href="${mfgUrl}" target="_blank" rel="noopener noreferrer" class="btn-manufacturer">🌐 موقع الشركة (${mfgDomain})</a>
      </div>
    `;
    listEl.appendChild(row);
  }

  const formattedTotal = formatUsd(totalUsd);
  if (totalEl) totalEl.textContent = formattedTotal;
  if (navTotalEl) navTotalEl.textContent = formattedTotal;

  const localCheck = analyzeBuildLocal(state.selectedBuild);
  if (compatBadge) {
    if (localCheck.isFullyCompatible) {
      compatBadge.textContent = '✅ متوافق 100%';
      compatBadge.style.background = 'rgba(16, 185, 129, 0.16)';
      compatBadge.style.color = '#34d399';
    } else {
      compatBadge.textContent = '⚠️ تنبيه توافق';
      compatBadge.style.background = 'rgba(255, 0, 60, 0.2)';
      compatBadge.style.color = '#ff4d79';
    }
  }
}

// Run Service 1: AI Custom Build Analyzer
async function runBuildAnalysis(scrollToSection = false) {
  let result = analyzeBuildLocal(state.selectedBuild);

  // Also call backend /api/analyze-build if available for Gemini 2.5 Flash verdict
  try {
    const res = await fetch('./api/analyze-build', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ build: state.selectedBuild })
    });
    if (res.ok) {
      const apiData = await res.json();
      if (apiData && apiData.gaming) {
        result = apiData;
      }
    }
  } catch (_) {
    // Seamless offline / static fallback already computed in `result`
  }

  renderAnalysisDashboard(result);
  if (scrollToSection) {
    document.getElementById('aiAnalyzerSection')?.scrollIntoView({ behavior: 'smooth' });
  }
}

function renderAnalysisDashboard(data) {
  const verdictBox = document.getElementById('aiExpertVerdictBox');
  if (verdictBox) {
    verdictBox.innerHTML = `
      <div style="font-size:0.78rem; color:var(--cyber-cyan); font-weight:800; margin-bottom:0.25rem;">🤖 التقرير الهندسي الذكي (Gemini 2.5 Flash Hardware Architect):</div>
      <div>${data.aiExpertVerdict || `تجميعة احترافية بتكلفة ${formatUsd(data.totalCostUSD)} تحقق تقييم ${data.gaming.rating}/100 في الألعاب و ${data.workstation.rating}/100 في المونتاج والبرمجة مع نسبة عنق زجاجة ${data.bottleneck.percentage}% فقط.`}</div>
    `;
  }

  // KPIs
  const kpiGaming = document.getElementById('kpiGamingScore');
  const kpiWork = document.getElementById('kpiWorkstationScore');
  const kpiBottle = document.getElementById('kpiBottleneckPercent');
  const kpiBottleType = document.getElementById('kpiBottleneckType');
  const kpiPower = document.getElementById('kpiPowerUsage');
  const kpiPowerLabel = document.getElementById('kpiPowerLabel');

  if (kpiGaming) kpiGaming.textContent = `${data.gaming.rating} / 100`;
  if (kpiWork) kpiWork.textContent = `${data.workstation.rating} / 100`;
  if (kpiBottle) {
    kpiBottle.textContent = `${data.bottleneck.percentage}%`;
    kpiBottle.style.color = data.bottleneck.percentage <= 10 ? '#10b981' : '#f59e0b';
  }
  if (kpiBottleType) kpiBottleType.textContent = data.bottleneck.type;
  if (kpiPower) kpiPower.textContent = `${data.powerAnalysis.estimatedLoadW}W / ${data.powerAnalysis.selectedPsuW}W`;
  if (kpiPowerLabel) kpiPowerLabel.textContent = `الموصى به: ${data.powerAnalysis.recommendedPsuW}W (فائض أمان ${data.powerAnalysis.headroomPercent}%)`;

  // Compatibility cards
  const compatGrid = document.getElementById('compatChecksGrid');
  if (compatGrid) {
    compatGrid.innerHTML = data.compatibilityChecks.map(c => `
      <div class="compat-card ${c.status}">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:0.45rem;">
          <strong style="font-size:0.92rem;">${c.title}</strong>
          <span class="meta-chip highlight">${c.badge}</span>
        </div>
        <p style="font-size:0.83rem; color:#cbd5e1;">${c.detail}</p>
      </div>
    `).join('');
  }

  const bottleAdvice = document.getElementById('bottleneckAdviceBanner');
  if (bottleAdvice) {
    bottleAdvice.innerHTML = `
      <strong>🎯 تحليل عنق الزجاجة والترقية الفورية (Bottleneck & Upgrade Analysis):</strong>
      <span style="color:#e2e8f0;"> ${data.bottleneck.recommendation}</span>
    `;
  }

  // FPS Table
  const fpsBody = document.getElementById('fpsTableBody');
  if (fpsBody) {
    fpsBody.innerHTML = data.gaming.gamesFps.map(g => `
      <tr>
        <td>
          <div style="font-weight:800; font-size:0.96rem;">${g.icon} ${g.game}</div>
        </td>
        <td style="font-size:0.8rem; color:var(--text-muted);">${g.subtitle}</td>
        <td>
          <span class="fps-pill fps-high">${g.fps1080p} FPS</span>
          <div class="mono" style="font-size:0.72rem; color:var(--text-muted); margin-top:0.2rem;">1% Low: ${g.low1080p} FPS</div>
        </td>
        <td>
          <span class="fps-pill fps-high">${g.fps1440p} FPS</span>
          <div class="mono" style="font-size:0.72rem; color:var(--text-muted); margin-top:0.2rem;">1% Low: ${g.low1440p} FPS</div>
        </td>
        <td>
          <span class="fps-pill fps-mid">${g.fps4k} FPS</span>
          <div class="mono" style="font-size:0.72rem; color:var(--text-muted); margin-top:0.2rem;">1% Low: ${g.low4k} FPS</div>
        </td>
      </tr>
    `).join('');
  }

  // Workstation cards
  const workGrid = document.getElementById('workstationCardsGrid');
  if (workGrid) {
    workGrid.innerHTML = data.workstation.details.map(w => `
      <div class="workstation-card">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
          <strong style="font-size:0.95rem;">${w.category}</strong>
          <span class="fps-pill fps-mid">${w.score}/100</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width:${w.score}%"></div>
        </div>
        <div style="font-size:0.78rem; color:var(--neon-green); font-weight:700; margin-bottom:0.35rem;">التصنيف: ${w.grade}</div>
        <p style="font-size:0.84rem; color:#cbd5e1;">${w.summary}</p>
      </div>
    `).join('');
  }
}

// Service 2: Smart Budget Auto-Builder Handler
async function handleSuggestBudgetBuild() {
  const budgetInput = document.getElementById('budgetUsdInput');
  const targetSelect = document.getElementById('targetUseSelect');
  const includeMonitor = document.getElementById('includeMonitorToggle')?.checked ?? true;
  const summaryBanner = document.getElementById('budgetAiSummaryBanner');

  const budgetUSD = Number(budgetInput?.value) || 2000;
  const targetUse = targetSelect?.value || 'gaming';

  let result = buildBestForBudgetLocal(state.catalog, budgetUSD, targetUse, includeMonitor);

  try {
    const res = await fetch('./api/budget-builder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ budgetUSD, targetUse, includeMonitor })
    });
    if (res.ok) {
      const apiRes = await res.json();
      if (apiRes && apiRes.selectedParts) {
        result = apiRes;
      }
    }
  } catch (_) {
    // Local fallback already ready
  }

  // Apply selected parts to build and cart
  state.selectedBuild = { ...result.selectedParts };
  state.partReasons = { ...(result.reasons || {}) };

  if (summaryBanner) {
    summaryBanner.style.display = 'block';
    summaryBanner.innerHTML = `✅ <strong>تم بناء أفضل تجميعة لميزانية $${budgetUSD.toLocaleString()} (${result.targetUseLabel}):</strong> التكلفة الفعلية <strong>${formatUsd(result.totalCostUSD)}</strong> — تم إضافة جميع القطع إلى سلة التجميعة الذكية وتفعيل روابط أمازون والشركات الأصلية!`;
  }

  renderBuilderSlots();
  renderSmartCart();
  renderAnalysisDashboard(result.analysis);
  showToast(`تم اختيار أفضل تجميعة بميزانية ${formatUsd(result.totalCostUSD)} بنجاح!`);
}

// Live Global AI Part Finder Handler
async function handleAiFindPart() {
  const catSelect = document.getElementById('aiFinderCategory');
  const queryInput = document.getElementById('aiFinderInput');
  const btn = document.getElementById('btnAiFindPart');

  const category = catSelect?.value || 'motherboard';
  const query = (queryInput?.value || '').trim();
  if (!query) {
    showToast('يرجى كتابة اسم القطعة أو الموديل للبحث عنه وإضافته.');
    return;
  }

  const origText = btn.innerHTML;
  btn.innerHTML = '<span>⏳ جاري الجلب بالذكاء الاصطناعي...</span>';

  let discoveredPart = null;

  // 1. Check if it exists in the live 51,025 GitHub dataset first
  const slotDef = SLOT_DEFINITIONS.find(s => s.key === category);
  if (slotDef) {
    try {
      const ghUrl = `https://raw.githubusercontent.com/docyx/pc-part-dataset/main/data/json/${slotDef.ghFile}`;
      const ghRes = await fetch(ghUrl);
      if (ghRes.ok) {
        const ghList = await ghRes.json();
        const qLower = query.toLowerCase();
        const match = ghList.find(x => x && x.name && x.name.toLowerCase().includes(qLower));
        if (match) {
          discoveredPart = synthesizePartFromQuery(match.name, category);
          if (match.price) discoveredPart.price = Number(match.price);
        }
      }
    } catch (_) {
      // Ignore network error, proceed to AI & synthesizer
    }
  }

  // 2. Call Backend Gemini 2.5 Flash AI Finder
  if (!discoveredPart) {
    try {
      const res = await fetch('./api/find-part', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, category })
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.part) discoveredPart = data.part;
      }
    } catch (_) {
      // Fallback
    }
  }

  if (!discoveredPart) {
    discoveredPart = synthesizePartFromQuery(query, category);
  }

  // Add to catalog & select it immediately
  if (!state.catalog[category]) state.catalog[category] = [];
  state.catalog[category].unshift(discoveredPart);
  state.selectedBuild[category] = discoveredPart;
  state.partReasons[category] = `تم جلب "${discoveredPart.name}" وإضافتها فوراً عبر باحث القطع العالمي الذكي (Live AI Part Finder).`;

  btn.innerHTML = origText;
  queryInput.value = '';
  renderBuilderSlots();
  renderSmartCart();
  runBuildAnalysis(false);
  showToast(`تم جلب "${discoveredPart.name}" (${formatUsd(discoveredPart.price)}) وإضافتها للتجميعة!`);
}

// Category Modal & Multi-Amazon Cart Launcher
function openCategoryModal(categoryKey) {
  state.activeModalCategory = categoryKey;
  const slot = SLOT_DEFINITIONS.find(s => s.key === categoryKey);
  const modal = document.getElementById('catalogModal');
  const titleEl = document.getElementById('modalTitle');
  const searchInp = document.getElementById('modalSearchInput');
  if (!modal || !slot) return;

  titleEl.textContent = `${slot.icon} الكتالوج العالمي الكامل — ${slot.title}`;
  if (searchInp) searchInp.value = '';
  renderModalItems('');
  modal.classList.add('open');
}

function renderModalItems(filterQuery = '') {
  const bodyEl = document.getElementById('modalBodyList');
  const categoryKey = state.activeModalCategory;
  if (!bodyEl || !categoryKey) return;

  const list = state.catalog[categoryKey] || [];
  const q = filterQuery.toLowerCase().trim();
  const filtered = q
    ? list.filter(p => p.name.toLowerCase().includes(q) || (p.badge || '').toLowerCase().includes(q) || (p.socket || '').toLowerCase().includes(q))
    : list;

  bodyEl.innerHTML = filtered.map(p => {
    const amazonUrl = p.amazonUrl || `https://www.amazon.com/s?k=${encodeURIComponent(p.name)}`;
    const mfg = getOfficialManufacturer(p.name);
    const mfgUrl = p.manufacturerUrl || mfg.url;
    const mfgDomain = p.manufacturerDomain || mfg.domain;

    return `
      <div class="catalog-item-row">
        <div style="flex:1; min-width:240px;">
          <div style="font-weight:800; font-size:0.95rem; color:#fff;">${p.name}</div>
          <div style="font-size:0.78rem; color:var(--cyber-cyan); margin-top:0.15rem;">${p.badge || ''}</div>
        </div>
        <div style="display:flex; align-items:center; gap:0.55rem; flex-wrap:wrap;">
          <span class="slot-price-tag">${formatUsd(p.price)}</span>
          <a href="${amazonUrl}" target="_blank" rel="noopener noreferrer" class="btn-amazon">🛒 أمازون</a>
          <a href="${mfgUrl}" target="_blank" rel="noopener noreferrer" class="btn-manufacturer">🌐 ${mfgDomain}</a>
          <button type="button" class="btn-rog-primary" style="padding:0.45rem 0.9rem; font-size:0.8rem;" data-pick-part="${p.id}">✓ اختيار</button>
        </div>
      </div>
    `;
  }).join('');

  bodyEl.querySelectorAll('[data-pick-part]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-pick-part');
      const found = (state.catalog[categoryKey] || []).find(x => x.id === id);
      if (found) {
        state.selectedBuild[categoryKey] = found;
        document.getElementById('catalogModal')?.classList.remove('open');
        renderBuilderSlots();
        renderSmartCart();
        runBuildAnalysis(false);
        showToast(`تم اختيار ${found.name} في التجميعة.`);
      }
    });
  });
}

// Open All Cart Items on Amazon Modal + Multi-Tab Launcher
function handleOpenAllCartAmazon() {
  const modal = document.getElementById('catalogModal');
  const titleEl = document.getElementById('modalTitle');
  const bodyEl = document.getElementById('modalBodyList');
  if (!modal || !bodyEl) return;

  state.activeModalCategory = null;
  const parts = SLOT_DEFINITIONS.map(s => ({ slot: s, part: state.selectedBuild[s.key] })).filter(x => x.part);
  const combinedKeywords = parts.map(x => x.part.name.split(' ').slice(0, 3).join(' ')).slice(0, 4).join(' + ');
  const firstAmazonUrl = parts[0]?.part?.amazonUrl || `https://www.amazon.com/s?k=${encodeURIComponent(combinedKeywords)}`;

  // Open the primary item in a new tab immediately on user click
  window.open(firstAmazonUrl, '_blank', 'noopener,noreferrer');

  titleEl.textContent = '🛍️ شراء كامل السلة من أمازون والشركات الأصلية (All 9 Build Parts)';
  bodyEl.innerHTML = `
    <div style="padding:0.9rem 1rem; background:rgba(255,153,0,0.12); border:1px solid rgba(255,153,0,0.4); border-radius:10px; margin-bottom:0.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.8rem;">
      <div>
        <strong>روابط الشراء المباشرة لجميع قطع التجميعة (${parts.length} قطع)</strong>
        <div style="font-size:0.8rem; color:#cbd5e1;">اضغط على أي قطعة لفتح صفحتها المباشرة على Amazon.com أو موقع الشركة المصنعة الأصلية.</div>
      </div>
      <button type="button" id="btnLaunchAllTabsNow" class="btn-amazon" style="padding:0.6rem 1.1rem;">🚀 فتح جميع روابط أمازون تباعاً</button>
    </div>
    ${parts.map(({ slot, part }) => {
      const mfg = getOfficialManufacturer(part.name);
      return `
        <div class="catalog-item-row">
          <div>
            <div style="font-size:0.75rem; color:var(--cyber-cyan); font-weight:700;">${slot.icon} ${slot.title}</div>
            <div style="font-weight:800; color:#fff;">${part.name}</div>
          </div>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <span class="slot-price-tag">${formatUsd(part.price)}</span>
            <a href="${part.amazonUrl}" target="_blank" rel="noopener noreferrer" class="btn-amazon">🛒 الشراء من أمازون</a>
            <a href="${part.manufacturerUrl || mfg.url}" target="_blank" rel="noopener noreferrer" class="btn-manufacturer">🌐 ${part.manufacturerDomain || mfg.domain}</a>
          </div>
        </div>
      `;
    }).join('')}
  `;

  modal.classList.add('open');

  document.getElementById('btnLaunchAllTabsNow')?.addEventListener('click', () => {
    parts.forEach(({ part }, idx) => {
      setTimeout(() => {
        window.open(part.amazonUrl, '_blank', 'noopener,noreferrer');
      }, idx * 250);
    });
  });
}

// Share Build Link
function handleShareBuildLink() {
  const params = new URLSearchParams();
  for (const slot of SLOT_DEFINITIONS) {
    const p = state.selectedBuild[slot.key];
    if (p?.id) params.set(slot.key, p.id);
  }
  const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', shareUrl);

  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareUrl).catch(() => {});
  }
  showToast('🔗 تم نسخ رابط التجميعة التفاعلي إلى الحافظة بنجاح!');
}

// Export PDF / Copy Build List
function handleExportPdfAndCopy() {
  const lines = [
    '====================================================',
    '⚡ AI PC Builder Pro - قائمة التجميعة الذكية المعتمدة',
    '===================================================='
  ];
  let total = 0;
  for (const slot of SLOT_DEFINITIONS) {
    const p = state.selectedBuild[slot.key];
    if (!p) continue;
    total += Number(p.price) || 0;
    lines.push(`${slot.title}: ${p.name} — $${p.price}`);
    lines.push(`  • الشراء من أمازون: ${p.amazonUrl}`);
    lines.push(`  • موقع الشركة الأصلية: ${p.manufacturerUrl}`);
  }
  lines.push('----------------------------------------------------');
  lines.push(`الإجمالي الكلي بالدولار (Total Build Cost): $${total.toLocaleString()}`);
  lines.push(`رابط التجميعة: ${window.location.href}`);

  if (navigator.clipboard) {
    navigator.clipboard.writeText(lines.join('\n')).catch(() => {});
  }
  showToast('📄 تم نسخ القائمة الكاملة مع الروابط للحافظة، وجاري فتح نافذة التصدير PDF!');
  setTimeout(() => window.print(), 450);
}

// Restore build from URL query params if shared
function restoreBuildFromUrl() {
  const params = new URLSearchParams(window.location.search);
  for (const slot of SLOT_DEFINITIONS) {
    const id = params.get(slot.key);
    if (id && state.catalog[slot.key]) {
      const match = state.catalog[slot.key].find(p => p.id === id);
      if (match) state.selectedBuild[slot.key] = match;
    }
  }
}

async function initApp() {
  try {
    const res = await fetch('./data/hardware_catalog.json');
    const data = await res.json();
    state.catalog = data.categories || {};

    // Default flagship selection
    for (const slot of SLOT_DEFINITIONS) {
      if (state.catalog[slot.key]?.length) {
        state.selectedBuild[slot.key] = state.catalog[slot.key][0];
      }
    }

    // Override with shared URL parameters if present
    restoreBuildFromUrl();

    renderBuilderSlots();
    renderSmartCart();
    await runBuildAnalysis(false);
  } catch (err) {
    console.error('Initialization error:', err);
  }

  // Wire up UI buttons
  document.querySelectorAll('#budgetPresetButtons .preset-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#budgetPresetButtons .preset-chip').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const val = e.currentTarget.getAttribute('data-budget');
      const inp = document.getElementById('budgetUsdInput');
      if (inp) inp.value = val;
    });
  });

  document.getElementById('btnSuggestBudgetBuild')?.addEventListener('click', handleSuggestBudgetBuild);
  document.getElementById('btnAiFindPart')?.addEventListener('click', handleAiFindPart);
  document.getElementById('aiFinderInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleAiFindPart();
  });

  document.getElementById('btnAnalyzeNowTop')?.addEventListener('click', () => runBuildAnalysis(true));
  document.getElementById('btnAnalyzeNowCart')?.addEventListener('click', () => runBuildAnalysis(true));
  document.getElementById('btnBuyAllAmazon')?.addEventListener('click', handleOpenAllCartAmazon);
  document.getElementById('btnShareBuildLink')?.addEventListener('click', handleShareBuildLink);
  document.getElementById('btnExportPdfCopy')?.addEventListener('click', handleExportPdfAndCopy);

  document.getElementById('btnCloseModal')?.addEventListener('click', () => {
    document.getElementById('catalogModal')?.classList.remove('open');
  });
  document.getElementById('modalSearchInput')?.addEventListener('input', (e) => {
    if (state.activeModalCategory) {
      renderModalItems(e.target.value);
    }
  });
}

document.addEventListener('DOMContentLoaded', initApp);
