// ==========================================
// CẤU HÌNH HỆ THỐNG PAT TECH
// ==========================================
const PAT_CONFIG = {
  // Bảo mật: Tuyệt đối KHÔNG đặt Telegram Bot Token ở mã nguồn frontend (GitHub Pages là công khai).
  // Khi cần bắn đơn trực tiếp không qua Patbot, hãy trỏ ORDER_WEBHOOK_URL tới Serverless Proxy
  // (ví dụ: Cloudflare Worker, Vercel Function hoặc Patbot API) giữ token ở biến môi trường server.
  ORDER_WEBHOOK_URL: "",
  ANALYTICS: {
    GA4_ID: "",     // Ví dụ: "G-XXXXXXXXXX"
    CLARITY_ID: ""  // Ví dụ: "xxxxxxxxxx"
  },
  HOTLINE: "0387.637.982",
  BRAND_NAME: "PAT TECH"
};

// Gửi đơn hàng qua Webhook Proxy bảo mật (chỉ chạy khi đã cấu hình ORDER_WEBHOOK_URL)
async function sendOrderWebhook(payload) {
  if (!PAT_CONFIG.ORDER_WEBHOOK_URL) {
    return false;
  }

  try {
    const response = await fetch(PAT_CONFIG.ORDER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return response.ok;
  } catch (err) {
    console.error("[PAT TECH] Lỗi gửi webhook đơn hàng:", err);
    return false;
  }
}

// Khởi tạo công cụ đo lường (GA4 / Microsoft Clarity) khi đã điền ID
function initAnalytics() {
  const { GA4_ID, CLARITY_ID } = PAT_CONFIG.ANALYTICS || {};

  if (GA4_ID) {
    const gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA4_ID);
  }

  if (CLARITY_ID) {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + encodeURIComponent(i);
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_ID);
  }
}

// Ghi nhận sự kiện chuyển đổi (an toàn khi chưa bật Analytics)
function trackEvent(eventName, params = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
  if (typeof window.clarity === "function") {
    window.clarity("event", eventName);
  }
}
