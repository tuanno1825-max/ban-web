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

// Khởi tạo danh sách nhanh ở Hero section (hiển thị đầy đủ các ngành nghề, thoáng mắt, dễ bấm trên mobile)
function renderHeroQuickList() {
  const container = document.getElementById('heroQuickList');
  if (!container) return;

  const demoCountBadge = document.getElementById('heroDemoCount');
  if (demoCountBadge) {
    demoCountBadge.textContent = templatesData.length + " Mẫu Demo";
  }

  container.innerHTML = templatesData.map(tpl => `
    <div class="quick-industry-item" onclick="openLivePreview('${tpl.id}')" title="Nhấn để xem thử giao diện ${tpl.industryName}">
      <div class="quick-industry-info">
        <div class="quick-industry-icon">${tpl.icon}</div>
        <div class="quick-industry-text">
          <div class="quick-industry-name">${tpl.industryName}</div>
          <div class="quick-industry-desc">${tpl.name}</div>
        </div>
      </div>
      <button class="btn btn-outline btn-sm quick-view-btn" style="pointer-events: none;">
        <span>Xem thử</span> 👁️
      </button>
    </div>
  `).join('');
}

// Khởi tạo các Sub-tabs lọc ngành nghề ở Kho giao diện (đồng bộ cả Desktop Tabs & Mobile Dropdown Menu)
let currentIndustryFilter = 'all';

function renderIndustryFilterTabs() {
  const tabsContainer = document.getElementById('industryFilterTabs');
  const mobileSelect = document.getElementById('mobileIndustrySelect');
  const countEl = document.getElementById('mobileFilterCount');

  // Render thanh pills trên Desktop
  if (tabsContainer) {
    tabsContainer.innerHTML = industriesList.map(ind => `
      <button class="industry-tab ${ind.id === currentIndustryFilter ? 'active' : ''}" onclick="filterByIndustry('${ind.id}')">
        <span>${ind.icon}</span> ${ind.name}
      </button>
    `).join('');
  }

  // Render menu chọn dropdown trên Mobile
  if (mobileSelect) {
    mobileSelect.innerHTML = industriesList.map(ind => `
      <option value="${ind.id}" ${ind.id === currentIndustryFilter ? 'selected' : ''}>
        ${ind.icon} ${ind.name}
      </option>
    `).join('');
  }

  // Cập nhật số lượng mẫu tương ứng
  if (countEl) {
    const count = currentIndustryFilter === 'all' 
      ? templatesData.length 
      : templatesData.filter(t => t.industry === currentIndustryFilter).length;
    countEl.innerText = `${count} Mẫu`;
  }
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
            <span>👁️</span> Trải Nghiệm
          </button>
          <a href="${t.demoUrl}" target="_blank" class="btn btn-outline btn-sm btn-icon-only" title="Mở trang web độc lập (Tab mới)">
            <span>🔗</span>
          </a>
          <button class="btn btn-primary btn-sm" onclick="openOrderModal('${t.id}')">
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
      <button class="btn ${c.popular ? 'btn-primary' : 'btn-outline'}" onclick="openOrderModal('', '${c.tier}')">
        <span>⚡</span> Chọn Gói Này
      </button>
    </div>
  `).join('');
}

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

  // Cập nhật URL sạch trên trình duyệt (tự động xóa bỏ chữ /public/ nếu còn sót lại trong lịch sử)
  try {
    let cleanPath = window.location.pathname.replace(/\/public\/?/, '/');
    if (!cleanPath.endsWith('/')) cleanPath += '/';
    history.replaceState(null, '', cleanPath + '#demo=' + template.id);
  } catch (e) {}

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

  // Xóa hash trên URL khi đóng modal và chuẩn hóa đường dẫn sạch
  try {
    let cleanPath = window.location.pathname.replace(/\/public\/?/, '/');
    if (!cleanPath.endsWith('/')) cleanPath += '/';
    history.replaceState(null, '', cleanPath);
  } catch (e) {}
}

// Mở trang web độc lập ở tab mới
function openDirectTemplateTab() {
  if (currentPreviewTemplate && currentPreviewTemplate.demoUrl) {
    window.open(currentPreviewTemplate.demoUrl, '_blank');
  }
}

// Sao chép link trực tiếp của mẫu web này
function copyDemoLink() {
  if (!currentPreviewTemplate) return;
  // Tạo link tuyệt đối trực tiếp của file demo (ví dụ: https://webgiatot.me/demos/ca-nhan/index.html)
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

  // 1. Chuẩn hóa số điện thoại: Lọc sạch chỉ giữ lại đúng 10 chữ số liền mạch (chống lỗi regex của Bot)
  let cleanPhone = phone.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('84') && cleanPhone.length === 11) {
    cleanPhone = '0' + cleanPhone.slice(2);
  }

  // 2. Lấy tên mẫu web gọn gàng
  let shortTemplate = templateName.replace(/^[👗👑🩺🎓🏖️🧋🍽️🏰📊\s]+/, '').split('-')[0].trim();
  if (!shortTemplate || shortTemplate.includes('chọn mẫu')) {
    shortTemplate = 'Theo tư vấn kỹ thuật';
  }

  // 3. Soạn tin nhắn tự nhiên chuẩn "Lead Capture" để AI nhận diện và bắn Telegram 100%
  compiledOrderMessage = `Chào bạn, tôi muốn đăng ký làm website mẫu: ${shortTemplate} (${comboName}${hasChatbot ? ' + Chatbot AI' : ''}). Tên tôi là ${name}, số điện thoại của tôi là: ${cleanPhone}. Dự toán tổng phí: ${total}. Ghi chú: ${note || 'Tư vấn triển khai sớm giúp tôi'}. Bạn tiếp nhận và duyệt đơn giúp tôi nhé!`;

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

// Hàm mở Chatbot và dán tự động vào ô input, đồng thời tự bấm gửi luôn
function openAndPasteChatbot() {
  copyOrderDetails();

  // Đóng modal đăng ký để lộ rõ chatbot
  closeOrderModal();

  // Tìm các phần tử của widget Chatbot
  const chatWindow = document.getElementById('pat-ai-chat-window');
  const widgetBtn = document.getElementById('pat-ai-widget-btn');
  const inputText = document.getElementById('pat-ai-input-text');
  const sendBtn = document.getElementById('pat-ai-send-btn');

  // Mở khung chat nếu đang đóng
  if (chatWindow && (chatWindow.style.display === 'none' || chatWindow.style.display === '')) {
    if (widgetBtn) {
      widgetBtn.click();
    } else {
      chatWindow.style.display = 'flex';
    }
  }

  // Tự động điền nội dung vào ô nhập liệu của Chatbot và bấm Gửi luôn
  setTimeout(() => {
    if (inputText) {
      inputText.value = compiledOrderMessage;
      inputText.dispatchEvent(new Event('input', { bubbles: true }));
      inputText.focus();

      // Tự động kích hoạt nút Gửi sau 300ms để khách không cần phải bấm Enter
      setTimeout(() => {
        if (sendBtn && !sendBtn.disabled) {
          sendBtn.click();
        }
      }, 350);
    }
  }, 250);
}

// Toggle FAQ Accordion
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isActive = item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
  if (!isActive) {
    item.classList.add('active');
  }
}

// Khởi chạy khi tải trang
document.addEventListener('DOMContentLoaded', () => {
  renderHeroQuickList();
  renderIndustryFilterTabs();
  renderTemplatesGrid();
  renderPricingCombos();

  // Kiểm tra nếu đường dẫn có mã demo (ví dụ: #demo=fnb-cafe) thì tự động mở xem thử mẫu đó luôn
  const hash = window.location.hash;
  if (hash && hash.includes('demo=')) {
    const demoId = hash.split('demo=')[1]?.split('&')[0];
    if (demoId) {
      setTimeout(() => openLivePreview(demoId), 300);
    }
  }
});
