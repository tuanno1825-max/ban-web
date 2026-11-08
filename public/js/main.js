// Quản lý chuyển đổi Tab chính (Giới thiệu, Kho giao diện, Bảng giá)
function switchPageTab(tabName) {
  // Active nút tab trên header
  document.querySelectorAll('.main-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-target') === tabName);
  });

  // Hiển thị nội dung tương ứng
  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.remove('active');
  });
  const targetView = document.getElementById(`tab-home`);
  if (tabName === 'home') document.getElementById('tab-home').classList.add('active');
  if (tabName === 'templates') document.getElementById('tab-templates').classList.add('active');
  if (tabName === 'pricing') document.getElementById('tab-pricing').classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Khởi tạo danh sách nhanh ở Hero section
function renderHeroQuickList() {
  const container = document.getElementById('heroQuickList');
  if (!container) return;

  container.innerHTML = templatesData.slice(0, 4).map(tpl => `
    <div class="quick-industry-item" onclick="openLivePreview('${tpl.id}')">
      <div class="quick-industry-info">
        <div class="quick-industry-icon">${tpl.icon}</div>
        <div>
          <div style="font-weight: 700; font-size: 0.95rem;">${tpl.industryName}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">${tpl.name}</div>
        </div>
      </div>
      <button class="btn btn-outline btn-sm" style="pointer-events: none;">
        Xem thử 👁️
      </button>
    </div>
  `).join('');
}

// Khởi tạo các Sub-tabs lọc ngành nghề ở Kho giao diện
let currentIndustryFilter = 'all';

function renderIndustryFilterTabs() {
  const tabsContainer = document.getElementById('industryFilterTabs');
  if (!tabsContainer) return;

  tabsContainer.innerHTML = industriesList.map(ind => `
    <button class="industry-tab ${ind.id === currentIndustryFilter ? 'active' : ''}" onclick="filterByIndustry('${ind.id}')">
      <span>${ind.icon}</span> ${ind.name}
    </button>
  `).join('');
}

function filterByIndustry(industryId) {
  currentIndustryFilter = industryId;
  renderIndustryFilterTabs();
  renderTemplatesGrid();
}

// Render lưới các thẻ template
function renderTemplatesGrid() {
  const container = document.getElementById('templatesContainer');
  if (!container) return;

  const filtered = currentIndustryFilter === 'all' 
    ? templatesData 
    : templatesData.filter(t => t.industry === currentIndustryFilter);

  container.innerHTML = filtered.map(t => `
    <div class="template-card">
      <div class="template-thumb" style="background: ${t.gradient};">
        <span class="template-badge">${t.icon} ${t.badge}</span>
        <div class="template-mock-window">
          <h4>${t.industryName}</h4>
          <p>${t.name}</p>
        </div>
      </div>
      <div class="template-body">
        <h3>${t.name}</h3>
        <p>${t.desc}</p>
        <ul class="template-highlights">
          ${t.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
        <div class="template-actions">
          <button class="btn btn-outline btn-sm" onclick="openLivePreview('${t.id}')">
            <span>👁️</span> Trải Nghiệm Demo
          </button>
          <button class="btn btn-primary btn-sm" onclick="openOrderModal('${t.id}')">
            <span>🛒</span> Báo Giá Mẫu Này
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
      <div style="background: rgba(255,255,255,0.04); padding: 8px 12px; border-radius: 8px; font-size: 0.8rem; margin-bottom: 16px; border: 1px dashed rgba(255,255,255,0.15);">
        <span style="color: var(--accent); font-weight: 600;">🔄 Duy trì từ năm 2:</span><br>
        <span style="color: #cbd5e1;">${c.renewalPrice}</span>
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
      <button class="btn ${c.popular ? 'btn-primary' : 'btn-outline'}" onclick="openOrderModal('', '${c.tier}')">
        <span>⚡</span> Chọn Gói Này
      </button>
    </div>
  `).join('');
}

// Live Preview Modal
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

  setDeviceView('desktop');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePreviewModal() {
  const modal = document.getElementById('previewModal');
  const iframe = document.getElementById('previewIframe');
  modal.classList.remove('open');
  iframe.src = 'about:blank';
  document.body.style.overflow = '';
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

  // Populate template select
  templateSelect.innerHTML = `
    <option value="">-- Tôi muốn tư vấn chọn mẫu sau --</option>
    ${templatesData.map(t => `<option value="${t.id}">${t.icon} ${t.name} (${t.industryName})</option>`).join('')}
  `;

  if (templateId) {
    templateSelect.value = templateId;
  }

  if (comboTier) {
    if (comboTier.includes('Combo 1')) comboSelect.value = '1500000';
    if (comboTier.includes('Combo 2')) comboSelect.value = '3900000';
    if (comboTier.includes('Combo 3')) comboSelect.value = '7900000';
  }

  if (isChatbotOnly) {
    chatbotCheckbox.checked = true;
  }

  calculateTotalEstimate();
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  document.getElementById('orderModalBackdrop').classList.remove('open');
  document.body.style.overflow = '';
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
  
  if (chatbotCheckbox.checked) {
    estChatbotRow.style.display = 'flex';
  } else {
    estChatbotRow.style.display = 'none';
  }

  estTotalVal.innerText = total.toLocaleString('vi-VN') + 'đ' + (comboSelect.value === '7900000' ? ' (Từ)' : '');
}

function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const templateSelect = document.getElementById('orderTemplateSelect');
  const templateName = templateSelect.options[templateSelect.selectedIndex].text;
  const comboSelect = document.getElementById('orderComboSelect');
  const comboName = comboSelect.options[comboSelect.selectedIndex].text;
  const hasChatbot = document.getElementById('orderAddonChatbot').checked;
  const note = document.getElementById('custNote').value.trim();
  const total = document.getElementById('estTotalVal').innerText;

  // Mô phỏng bắn thông tin về Telegram hoặc mở Zalo
  const msg = `🔔 PAT TECH - YÊU CẦU BÁO GIÁ MỚI:\n- Họ tên: ${name}\n- SĐT: ${phone}\n- Mẫu: ${templateName}\n- Gói: ${comboName}\n- Kèm Chatbot: ${hasChatbot ? 'Có (+500k)' : 'Không'}\n- Dự kiến: ${total}\n- Ghi chú: ${note || 'Không'}`;
  
  alert(`Cảm ơn ${name}! PAT TECH đã tiếp nhận yêu cầu và bắn thông báo về hệ thống Telegram của kỹ thuật viên.\n\nThông tin đơn:\n${msg}\n\nKỹ thuật viên phụ trách (Hotline: 0387.637.982) sẽ liên hệ kết nối với bạn theo đúng lịch hẹn!`);
  closeOrderModal();
  e.target.reset();
}

// Khởi chạy khi tải trang
document.addEventListener('DOMContentLoaded', () => {
  renderHeroQuickList();
  renderIndustryFilterTabs();
  renderTemplatesGrid();
  renderPricingCombos();
});
