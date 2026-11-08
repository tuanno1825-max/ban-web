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

// Khởi tạo danh sách nhanh ở Hero section (hiển thị đầy đủ tất cả các ngành nghề với thanh cuộn tinh tế)
function renderHeroQuickList() {
  const container = document.getElementById('heroQuickList');
  if (!container) return;

  container.innerHTML = templatesData.map(tpl => `
    <div class="quick-industry-item" onclick="openLivePreview('${tpl.id}')">
      <div class="quick-industry-info">
        <div class="quick-industry-icon">${tpl.icon}</div>
        <div style="min-width: 0;">
          <div style="font-weight: 700; font-size: 0.92rem; color: #0f172a;">${tpl.industryName}</div>
          <div style="font-size: 0.77rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px;">${tpl.name}</div>
        </div>
      </div>
      <button class="btn btn-outline btn-sm" style="pointer-events: none; flex-shrink: 0; padding: 6px 12px; font-size: 0.8rem;">
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
      <div class="template-thumb" style="background: ${t.gradient};" onclick="openLivePreview('${t.id}')">
        ${t.thumbImg ? `<img src="${t.thumbImg}" alt="${t.name}" class="template-thumb-img" loading="lazy">` : ''}
        <div class="template-thumb-overlay"></div>
        <div class="template-thumb-top">
          <span class="template-badge">${t.icon} ${t.badge}</span>
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
  // Đặt lại hiển thị form ban đầu
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
  
  if (chatbotCheckbox.checked) {
    estChatbotRow.style.display = 'flex';
  } else {
    estChatbotRow.style.display = 'none';
  }

  estTotalVal.innerText = total.toLocaleString('vi-VN') + 'đ' + (comboSelect.value === '7900000' ? ' (Từ)' : '');
}

// Biến lưu trữ văn bản đơn hàng hiện tại
let compiledOrderMessage = '';

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

  // Soạn sẵn định dạng đơn hàng chuẩn cho chatbot duyệt tự động
  compiledOrderMessage = `[ĐƠN ĐĂNG KÝ TƯ VẤN WEBSITE]\n- Khách hàng: ${name}\n- Số điện thoại / Zalo: ${phone}\n- Mẫu giao diện: ${templateName}\n- Gói combo: ${comboName}\n- Gắn thêm Chatbot 24/7: ${hasChatbot ? 'Có (+500.000đ)' : 'Không'}\n- Dự toán tổng phí: ${total}\n- Yêu cầu thêm: ${note || 'Tư vấn triển khai chuẩn mẫu'}\n=> Nhờ Trợ Lý AI tiếp nhận & duyệt đơn ưu tiên giúp tôi!`;

  // Hiển thị khung thành công & hướng dẫn gửi chatbot
  document.getElementById('orderCompiledText').innerText = compiledOrderMessage;
  document.getElementById('orderForm').style.display = 'none';
  document.getElementById('orderSuccessBox').style.display = 'block';

  // Tự động copy vào clipboard ngay nếu trình duyệt cho phép
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(compiledOrderMessage).catch(() => {});
  }
}

// Hàm bấm copy toàn bộ thông tin
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
    // Fallback nếu clipboard API bị chặn
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

// Hàm mở Chatbot và dán tự động vào ô input
function openAndPasteChatbot() {
  copyOrderDetails();

  // Đóng modal đăng ký để lộ rõ chatbot
  closeOrderModal();

  // Tìm các phần tử của widget Chatbot
  const chatWindow = document.getElementById('pat-ai-chat-window');
  const widgetBtn = document.getElementById('pat-ai-widget-btn');
  const inputText = document.getElementById('pat-ai-input-text');

  // Mở khung chat nếu đang đóng
  if (chatWindow && (chatWindow.style.display === 'none' || chatWindow.style.display === '')) {
    if (widgetBtn) {
      widgetBtn.click();
    } else {
      chatWindow.style.display = 'flex';
    }
  }

  // Tự động điền nội dung vào ô nhập liệu của Chatbot
  setTimeout(() => {
    if (inputText) {
      inputText.value = compiledOrderMessage;
      inputText.focus();
      // Highlight nhẹ ô nhập để khách thấy rõ chỉ cần bấm gửi
      inputText.style.transition = 'all 0.3s ease';
      inputText.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.45)';
      setTimeout(() => {
        inputText.style.boxShadow = '';
      }, 3000);
    }
  }, 200);
}

// Khởi chạy khi tải trang
document.addEventListener('DOMContentLoaded', () => {
  renderHeroQuickList();
  renderIndustryFilterTabs();
  renderTemplatesGrid();
  renderPricingCombos();
});
