// Quản lý chuyển đổi Tab chính (Giới thiệu, Kho giao diện, Bảng giá)
const VALID_TABS = new Set(['home', 'templates', 'pricing']);

function getCleanBasePath() {
  let cleanPath = window.location.pathname.replace(/\/public\/?/, '/');
  if (!cleanPath.endsWith('/')) cleanPath += '/';
  return cleanPath;
}

function switchPageTab(tabName, updateHash = true) {
  const safeTab = VALID_TABS.has(tabName) ? tabName : 'home';

  document.querySelectorAll('.main-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-target') === safeTab);
  });

  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.remove('active');
  });
  const activeView = document.getElementById(`tab-${safeTab}`);
  if (activeView) {
    activeView.classList.add('active');
  }

  if (updateHash) {
    try {
      const basePath = getCleanBasePath();
      const targetUrl = safeTab === 'home' ? basePath : `${basePath}#${safeTab}`;
      history.replaceState(null, '', targetUrl);
    } catch (e) {}
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleCardKeydown(event, callback) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    callback();
  }
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Khởi tạo danh sách nhanh ở Hero section
function renderHeroQuickList() {
  const container = document.getElementById('heroQuickList');
  if (!container) return;

  const demoCountBadge = document.getElementById('heroDemoCount');
  if (demoCountBadge) {
    demoCountBadge.textContent = `${templatesData.length} Mẫu Demo`;
  }

  container.innerHTML = templatesData.map(tpl => `
    <div class="quick-industry-item ${tpl.flagship ? 'is-flagship' : ''}" role="button" tabindex="0" onclick="openLivePreview('${tpl.id}')" onkeydown="handleCardKeydown(event, () => openLivePreview('${tpl.id}'))" title="Nhấn để xem thử giao diện ${tpl.industryName}">
      <div class="quick-industry-info">
        <div class="quick-industry-icon">${tpl.icon}</div>
        <div class="quick-industry-text">
          <div class="quick-industry-name">${tpl.industryName}${tpl.flagship ? '<span class="quick-flagship-tag">3D VIP</span>' : ''}</div>
          <div class="quick-industry-desc">${tpl.name}</div>
        </div>
      </div>
      <span class="btn btn-outline btn-sm quick-view-btn" aria-hidden="true">
        <span>Xem thử</span> 👁️
      </span>
    </div>
  `).join('');
}

// Bộ lọc Ngành Nghề + Phong Cách Thiết Kế
let currentIndustryFilter = 'all';
let currentStyleFilter = 'all';

function getFilteredTemplates() {
  return templatesData.filter(t => {
    const matchIndustry = currentIndustryFilter === 'all' || t.industry === currentIndustryFilter;
    const matchStyle = currentStyleFilter === 'all' || t.styleGroup === currentStyleFilter;
    return matchIndustry && matchStyle;
  });
}

function renderIndustryFilterTabs() {
  const tabsContainer = document.getElementById('industryFilterTabs');
  const mobileSelect = document.getElementById('mobileIndustrySelect');
  const countEl = document.getElementById('mobileFilterCount');

  if (tabsContainer) {
    tabsContainer.innerHTML = industriesList.map(ind => `
      <button type="button" class="industry-tab ${ind.id === currentIndustryFilter ? 'active' : ''}" onclick="filterByIndustry('${ind.id}')">
        <span>${ind.icon}</span> ${ind.name}
      </button>
    `).join('');
  }

  if (mobileSelect) {
    mobileSelect.innerHTML = industriesList.map(ind => `
      <option value="${ind.id}" ${ind.id === currentIndustryFilter ? 'selected' : ''}>
        ${ind.icon} ${ind.name}
      </option>
    `).join('');
  }

  if (countEl) {
    countEl.innerText = `${getFilteredTemplates().length} Mẫu`;
  }
}

function renderStyleFilterBar() {
  const bar = document.getElementById('styleFilterBar');
  if (!bar || typeof styleFiltersList === 'undefined') return;

  bar.innerHTML = styleFiltersList.map(st => `
    <button type="button" class="style-pill ${st.id === currentStyleFilter ? 'active' : ''}" onclick="filterByStyle('${st.id}')">
      <span>${st.icon}</span> ${st.name}
    </button>
  `).join('');
}

function filterByIndustry(industryId) {
  currentIndustryFilter = industryId;
  renderIndustryFilterTabs();
  renderTemplatesGrid();
}

function filterByStyle(styleId) {
  currentStyleFilter = styleId;
  renderStyleFilterBar();
  renderIndustryFilterTabs();
  renderTemplatesGrid();
}

function resetAllFilters() {
  currentIndustryFilter = 'all';
  currentStyleFilter = 'all';
  renderStyleFilterBar();
  renderIndustryFilterTabs();
  renderTemplatesGrid();
}

// Render lưới các thẻ template
function renderTemplatesGrid() {
  const container = document.getElementById('templatesContainer');
  if (!container) return;

  const filtered = getFilteredTemplates();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="templates-empty-box">
        <p style="font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">Chưa có mẫu trùng khớp đồng thời ngành và phong cách này</p>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 16px;">Bạn có thể đặt thiết kế may đo theo đúng gu riêng hoặc xem lại toàn bộ ${templatesData.length} mẫu sẵn có.</p>
        <button type="button" class="btn btn-primary btn-sm" onclick="resetAllFilters()">✨ Xem Tất Cả ${templatesData.length} Mẫu</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(t => `
    <div class="template-card ${t.flagship ? 'is-flagship' : ''}">
      <div class="template-thumb" role="button" tabindex="0" style="background: ${t.gradient};" onclick="openLivePreview('${t.id}')" onkeydown="handleCardKeydown(event, () => openLivePreview('${t.id}'))">
        ${t.thumbImg ? `<img src="${t.thumbImg}" alt="${t.name}" class="template-thumb-img" loading="lazy">` : ''}
        <div class="template-thumb-overlay"></div>
        <div class="template-thumb-top">
          <span class="template-badge">${t.flagship ? t.badge : `${t.icon} ${t.badge}`}</span>
          ${t.palette ? `
            <div class="template-palette" title="Bảng màu chủ đạo của giao diện">
              ${t.palette.map(color => `<span class="palette-dot" style="background:${color}"></span>`).join('')}
            </div>
          ` : ''}
        </div>
        <div class="template-hover-cta">
          <span>👁️ Nhấn xem giao diện thực tế</span>
        </div>
        <div class="template-mock-window">
          <div class="mock-industry-tag">${t.industryName}</div>
        </div>
      </div>
      <div class="template-body">
        <h3>${t.name}</h3>
        <p>${t.desc}</p>
        <ul class="template-highlights">
          ${t.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
        <div class="template-actions">
          <button type="button" class="btn btn-outline btn-sm" onclick="openLivePreview('${t.id}')">
            <span>👁️</span> Trải Nghiệm
          </button>
          <a href="${t.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm btn-icon-only" title="Mở trang web độc lập (Tab mới)">
            <span>🔗</span>
          </a>
          <button type="button" class="btn btn-primary btn-sm" onclick="openOrderModal('${t.id}')">
            <span>🛒</span> Báo Giá
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Render 3 Combo bảng giá
function renderPricingCombos() {
  const container = document.getElementById('pricingGrid');
  if (!container) return;

  container.innerHTML = pricingCombos.map(c => `
    <div class="combo-card ${c.popular ? 'popular' : ''}">
      ${c.popular ? '<div class="popular-ribbon">⭐ Bán chạy nhất</div>' : ''}
      <div class="combo-tier">${c.tier}</div>
      <h3>${c.name}</h3>
      <p class="combo-desc">${c.desc}</p>
      <div class="combo-price">
        <div class="amount">${c.priceStr}</div>
        <span class="unit">${c.unit}</span>
      </div>
      <div class="combo-renewal-box">
        <span class="combo-renewal-label">🔄 Duy trì từ năm 2:</span><br>
        <span class="combo-renewal-val">${c.renewalPrice}</span>
      </div>
      <ul class="combo-features">
        ${c.features.map(f => `
          <li>
            <span class="check">✓</span>
            <span>${f}</span>
          </li>
        `).join('')}
      </ul>
      <div class="combo-note">${c.note}</div>
      <button type="button" class="btn ${c.popular ? 'btn-primary' : 'btn-outline'}" onclick="openOrderModal('', '${c.tier}')">
        <span>⚡</span> Chọn Gói Này
      </button>
    </div>
  `).join('');
}

// ==========================================================
// LIVE BRAND CUSTOMIZER (POSTMESSAGE) & TELEGRAM 1S SIMULATOR
// ==========================================================
const customizerState = {
  brandName: '',
  phone: '',
  palette: 'default'
};

function toggleBrandCustomizer() {
  const bar = document.getElementById('brandCustomizerBar');
  const btn = document.getElementById('btnToggleCustomizer');
  if (!bar) return;
  const isOpen = bar.classList.toggle('open');
  if (btn) btn.classList.toggle('is-active-tool', isOpen);
}

function updateBrandCustomizer() {
  const brandInput = document.getElementById('customBrandInput');
  const phoneInput = document.getElementById('customPhoneInput');
  customizerState.brandName = brandInput ? brandInput.value : '';
  customizerState.phone = phoneInput ? phoneInput.value : '';
  pushCustomizerToIframe();
}

function selectCustomPalette(paletteId) {
  customizerState.palette = paletteId || 'default';
  document.querySelectorAll('.palette-swatch-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-palette') === customizerState.palette);
  });
  pushCustomizerToIframe();
}

function resetBrandCustomizer() {
  customizerState.brandName = '';
  customizerState.phone = '';
  customizerState.palette = 'default';

  const brandInput = document.getElementById('customBrandInput');
  const phoneInput = document.getElementById('customPhoneInput');
  if (brandInput) brandInput.value = '';
  if (phoneInput) phoneInput.value = '';

  document.querySelectorAll('.palette-swatch-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-palette') === 'default');
  });

  pushCustomizerToIframe();
}

function pushCustomizerToIframe() {
  const iframe = document.getElementById('previewIframe');
  if (!iframe || !iframe.contentWindow) return;
  iframe.contentWindow.postMessage({
    type: 'PAT_BRAND_PREVIEW',
    brandName: customizerState.brandName,
    phone: customizerState.phone,
    palette: customizerState.palette
  }, '*');
}

let tgAudioCtx = null;
let tgToastTimer = null;

function playTelegramChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!tgAudioCtx) tgAudioCtx = new AudioCtx();
    if (tgAudioCtx.state === 'suspended') {
      tgAudioCtx.resume().catch(() => {});
    }
    const now = tgAudioCtx.currentTime;
    [880, 1174.66].forEach((freq, idx) => {
      const osc = tgAudioCtx.createOscillator();
      const gain = tgAudioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.28);
      osc.connect(gain);
      gain.connect(tgAudioCtx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.3);
    });
  } catch (e) {}
}

function hideTelegramSimToast() {
  const toast = document.getElementById('tgSimToast');
  if (!toast) return;
  toast.classList.remove('open');
  clearTimeout(tgToastTimer);
}

function showTelegramSimToast(order) {
  const toast = document.getElementById('tgSimToast');
  if (!toast) return;

  playTelegramChime();

  const brand = order && order.brand ? order.brand : 'PAT TECH';
  const name = order && order.name ? order.name : 'Nguyễn Minh Anh';
  const phone = order && order.phone ? order.phone : '0912.345.678';
  const service = order && order.service ? order.service : 'Đăng ký tư vấn dịch vụ';
  const note = order && order.note ? order.note : '';

  toast.innerHTML = `
    <div class="tg-toast-head">
      <div class="tg-toast-app">
        <div class="tg-toast-icon">✈</div>
        <div>
          <div class="tg-toast-title">TELEGRAM BOT • BÁO ĐƠN 0.8s</div>
          <div class="tg-toast-sub">Nguồn: Website ${escapeHtml(brand)}</div>
        </div>
      </div>
      <button type="button" class="tg-toast-close" onclick="hideTelegramSimToast()" aria-label="Đóng thông báo">✕</button>
    </div>
    <div class="tg-toast-body">
      <span class="tg-toast-badge">⚡ KHÁCH HÀNG MỚI ĐẶT LỊCH / ĐẶT HÀNG</span>
      <div>👤 <strong>${escapeHtml(name)}</strong> — 📞 <strong>${escapeHtml(phone)}</strong></div>
      <div>📌 ${escapeHtml(service)}</div>
      ${note ? `<div style="color:#cbd5e1;">📝 ${escapeHtml(note)}</div>` : ''}
    </div>
  `;

  toast.classList.add('open');
  clearTimeout(tgToastTimer);
  tgToastTimer = setTimeout(hideTelegramSimToast, 6500);
}

function triggerSampleTelegramSim(fromPreview = false) {
  const activeBrand = customizerState.brandName.trim()
    || (fromPreview && currentPreviewTemplate ? currentPreviewTemplate.name.split(' - ')[0].trim() : 'PAT TECH Demo');
  const activePhone = customizerState.phone.trim() || '0988.686.999';
  const activeService = (fromPreview && currentPreviewTemplate)
    ? `Trải nghiệm ${currentPreviewTemplate.industryName}`
    : 'Gói Combo 1 Tinh Gọn (1.500.000đ)';

  showTelegramSimToast({
    brand: activeBrand,
    name: 'Trần Minh Khôi (Demo)',
    phone: activePhone,
    service: activeService,
    note: 'Tin nhắn bắn về điện thoại chủ shop trong 1 giây!'
  });
}

window.addEventListener('message', (event) => {
  const data = event && event.data;
  if (!data || typeof data !== 'object') return;
  if (data.type === 'PAT_DEMO_READY') {
    pushCustomizerToIframe();
  } else if (data.type === 'PAT_TELEGRAM_SIM') {
    showTelegramSimToast(data.order || {});
  }
});

// Live Preview Modal & Quản lý Link Riêng
let currentPreviewTemplate = null;

function openLivePreview(templateId) {
  const template = templatesData.find(t => t.id === templateId) || templatesData[0];
  currentPreviewTemplate = template;

  const modal = document.getElementById('previewModal');
  const title = document.getElementById('previewModalTitle');
  const iframe = document.getElementById('previewIframe');
  const btnBuy = document.getElementById('btnBuyThisTemplate');

  title.innerText = `${template.icon} ${template.name}`;
  iframe.src = template.demoUrl;
  btnBuy.onclick = () => {
    closePreviewModal();
    openOrderModal(template.id);
  };

  try {
    history.replaceState(null, '', `${getCleanBasePath()}#demo=${template.id}`);
  } catch (e) {}

  setDeviceView('desktop');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  if (typeof trackEvent === 'function') {
    trackEvent('demo_preview', { demo_id: template.id, industry: template.industryName });
  }
}

function closePreviewModal(restoreHash = true) {
  const modal = document.getElementById('previewModal');
  const iframe = document.getElementById('previewIframe');
  if (!modal || !modal.classList.contains('open')) return;

  modal.classList.remove('open');
  iframe.src = 'about:blank';
  document.body.style.overflow = '';

  if (restoreHash) {
    try {
      const activeBtn = document.querySelector('.main-tab-btn.active');
      const activeTab = activeBtn ? activeBtn.getAttribute('data-target') : 'home';
      const basePath = getCleanBasePath();
      const targetUrl = activeTab && activeTab !== 'home' ? `${basePath}#${activeTab}` : basePath;
      history.replaceState(null, '', targetUrl);
    } catch (e) {}
  }
}

function openDirectTemplateTab() {
  if (currentPreviewTemplate && currentPreviewTemplate.demoUrl) {
    window.open(currentPreviewTemplate.demoUrl, '_blank', 'noopener,noreferrer');
  }
}

function copyDemoLink() {
  if (!currentPreviewTemplate) return;
  const directUrl = new URL(currentPreviewTemplate.demoUrl, window.location.href).href;
  const btnText = document.getElementById('copyLinkText');
  const btnIcon = document.getElementById('copyLinkIcon');

  navigator.clipboard.writeText(directUrl).then(() => {
    if (btnText) btnText.innerText = 'Đã chép!';
    if (btnIcon) btnIcon.innerText = '✓';
    setTimeout(() => {
      if (btnText) btnText.innerText = 'Copy Link';
      if (btnIcon) btnIcon.innerText = '📋';
    }, 2200);
  }).catch(() => {
    prompt('Link trực tiếp của mẫu web này:', directUrl);
  });
}

function setDeviceView(device) {
  const stage = document.getElementById('previewStage');
  stage.className = `preview-stage ${device}`;

  document.querySelectorAll('.device-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-device') === device);
  });
}

// Order & Quote Modal Logic
function openOrderModal(templateId = '', comboTier = '', isChatbotOnly = false) {
  const backdrop = document.getElementById('orderModalBackdrop');
  const templateSelect = document.getElementById('orderTemplateSelect');
  const comboSelect = document.getElementById('orderComboSelect');
  const chatbotCheckbox = document.getElementById('orderAddonChatbot');
  const orderForm = document.getElementById('orderForm');
  const successBox = document.getElementById('orderSuccessBox');

  if (orderForm) orderForm.style.display = 'block';
  if (successBox) successBox.style.display = 'none';

  templateSelect.innerHTML = `
    <option value="">-- Tôi muốn tư vấn chọn mẫu sau --</option>
    ${templatesData.map(t => `<option value="${t.id}">${t.icon} ${t.name} (${t.industryName})</option>`).join('')}
  `;

  templateSelect.value = templateId || '';

  let comboValue = '1500000';
  if (comboTier) {
    if (comboTier.includes('Combo 2')) comboValue = '3900000';
    else if (comboTier.includes('Combo 3')) comboValue = '7900000';
  }
  comboSelect.value = comboValue;

  chatbotCheckbox.checked = Boolean(isChatbotOnly);

  calculateTotalEstimate();
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  const backdrop = document.getElementById('orderModalBackdrop');
  if (!backdrop || !backdrop.classList.contains('open')) return;

  backdrop.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => {
    const orderForm = document.getElementById('orderForm');
    const successBox = document.getElementById('orderSuccessBox');
    if (orderForm) orderForm.style.display = 'block';
    if (successBox) successBox.style.display = 'none';
  }, 300);
}

function calculateTotalEstimate() {
  const comboSelect = document.getElementById('orderComboSelect');
  const chatbotCheckbox = document.getElementById('orderAddonChatbot');
  const estComboVal = document.getElementById('estComboVal');
  const estChatbotRow = document.getElementById('estChatbotRow');
  const estTotalVal = document.getElementById('estTotalVal');

  const comboPrice = parseInt(comboSelect.value, 10) || 0;
  const chatbotPrice = chatbotCheckbox.checked ? chatbotAddon.setupPrice : 0;
  const total = comboPrice + chatbotPrice;

  estComboVal.innerText = comboPrice.toLocaleString('vi-VN') + 'đ';
  estChatbotRow.style.display = chatbotCheckbox.checked ? 'flex' : 'none';
  estTotalVal.innerText = total.toLocaleString('vi-VN') + 'đ' + (comboSelect.value === '7900000' ? ' (Từ)' : '');
}

let compiledOrderMessage = '';

function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const templateSelect = document.getElementById('orderTemplateSelect');
  const selectedTpl = templatesData.find(t => t.id === templateSelect.value);
  const comboSelect = document.getElementById('orderComboSelect');
  const comboName = comboSelect.options[comboSelect.selectedIndex].text;
  const hasChatbot = document.getElementById('orderAddonChatbot').checked;
  const note = document.getElementById('custNote').value.trim();
  const total = document.getElementById('estTotalVal').innerText;

  let cleanPhone = phone.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('84') && cleanPhone.length === 11) {
    cleanPhone = '0' + cleanPhone.slice(2);
  }

  const shortTemplate = selectedTpl
    ? selectedTpl.name.split(' - ')[0].trim()
    : 'Theo tư vấn kỹ thuật';

  compiledOrderMessage = `Chào bạn, tôi muốn đăng ký làm website mẫu: ${shortTemplate} (${comboName}${hasChatbot ? ' + Chatbot AI' : ''}). Tên tôi là ${name}, số điện thoại của tôi là: ${cleanPhone}. Dự toán tổng phí: ${total}. Ghi chú: ${note || 'Tư vấn triển khai sớm giúp tôi'}. Bạn tiếp nhận và duyệt đơn giúp tôi nhé!`;

  document.getElementById('orderCompiledText').innerText = compiledOrderMessage;
  document.getElementById('orderForm').style.display = 'none';
  document.getElementById('orderSuccessBox').style.display = 'block';

  if (typeof trackEvent === 'function') {
    trackEvent('order_submit', {
      template: shortTemplate,
      combo: comboName,
      chatbot: hasChatbot
    });
  }
  if (typeof sendOrderWebhook === 'function') {
    sendOrderWebhook({
      name,
      phone: cleanPhone,
      template: shortTemplate,
      combo: comboName,
      chatbot: hasChatbot,
      total,
      note,
      message: compiledOrderMessage
    });
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(compiledOrderMessage).catch(() => {});
  }
}

function copyOrderDetails() {
  if (!compiledOrderMessage) return;
  const btnText = document.getElementById('copyBtnText');
  const btnIcon = document.getElementById('copyBtnIcon');

  navigator.clipboard.writeText(compiledOrderMessage).then(() => {
    btnText.innerText = 'ĐÃ SAO CHÉP THÀNH CÔNG! ✓';
    btnIcon.innerText = '✅';
    setTimeout(() => {
      btnText.innerText = 'Sao Chép Toàn Bộ Đơn Hàng';
      btnIcon.innerText = '📋';
    }, 2500);
  }).catch(() => {
    const pre = document.getElementById('orderCompiledText');
    const range = document.createRange();
    range.selectNodeContents(pre);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand('copy');
    btnText.innerText = 'ĐÃ SAO CHÉP THÀNH CÔNG! ✓';
    btnIcon.innerText = '✅';
    setTimeout(() => {
      btnText.innerText = 'Sao Chép Toàn Bộ Đơn Hàng';
      btnIcon.innerText = '📋';
    }, 2500);
  });
}

function openAndPasteChatbot() {
  copyOrderDetails();
  closeOrderModal();

  const chatWindow = document.getElementById('pat-ai-chat-window');
  const widgetBtn = document.getElementById('pat-ai-widget-btn');
  const inputText = document.getElementById('pat-ai-input-text');
  const sendBtn = document.getElementById('pat-ai-send-btn');

  if (chatWindow && (chatWindow.style.display === 'none' || chatWindow.style.display === '')) {
    if (widgetBtn) {
      widgetBtn.click();
    } else {
      chatWindow.style.display = 'flex';
    }
  }

  setTimeout(() => {
    if (inputText) {
      inputText.value = compiledOrderMessage;
      inputText.dispatchEvent(new Event('input', { bubbles: true }));
      inputText.focus();

      setTimeout(() => {
        if (sendBtn && !sendBtn.disabled) {
          sendBtn.click();
        }
      }, 350);
    }
  }, 250);
}

function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isActive = item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
  if (!isActive) {
    item.classList.add('active');
  }
}

function syncStateFromHash() {
  const hash = window.location.hash || '';

  if (hash.startsWith('#demo=')) {
    const demoId = hash.slice('#demo='.length).split('&')[0];
    if (demoId) {
      openLivePreview(demoId);
    }
    return;
  }

  closePreviewModal(false);

  if (hash === '#templates') {
    switchPageTab('templates', false);
  } else if (hash === '#pricing') {
    switchPageTab('pricing', false);
  } else if (hash === '#home' || hash === '') {
    switchPageTab('home', false);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const orderBackdrop = document.getElementById('orderModalBackdrop');
  const previewModal = document.getElementById('previewModal');
  if (orderBackdrop && orderBackdrop.classList.contains('open')) {
    closeOrderModal();
  } else if (previewModal && previewModal.classList.contains('open')) {
    closePreviewModal();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  renderHeroQuickList();
  renderStyleFilterBar();
  renderIndustryFilterTabs();
  renderTemplatesGrid();
  renderPricingCombos();

  if (typeof initAnalytics === 'function') {
    initAnalytics();
  }

  syncStateFromHash();
});

window.addEventListener('hashchange', syncStateFromHash);
