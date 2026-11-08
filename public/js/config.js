// ==========================================
// CẤU HÌNH HỆ THỐNG PAT TECH
// ==========================================
const PAT_CONFIG = {
  // Thay thông tin Bot Telegram của bạn vào đây khi cần kích hoạt bắn đơn thật
  // 1. Tạo bot qua @BotFather trên Telegram để lấy TOKEN
  // 2. Chat với @userinfobot để lấy CHAT_ID cá nhân hoặc nhóm
  TELEGRAM: {
    ENABLED: false, // Đổi thành true khi bạn đã điền TOKEN và CHAT_ID
    BOT_TOKEN: "YOUR_TELEGRAM_BOT_TOKEN_HERE",
    CHAT_ID: "YOUR_TELEGRAM_CHAT_ID_HERE"
  },
  HOTLINE: "0387.637.982",
  BRAND_NAME: "PAT TECH"
};

// Hàm dùng chung để gửi thông báo về Telegram
async function sendTelegramNotification(messageText) {
  if (!PAT_CONFIG.TELEGRAM.ENABLED || PAT_CONFIG.TELEGRAM.BOT_TOKEN === "YOUR_TELEGRAM_BOT_TOKEN_HERE") {
    console.log("ℹ️ [PAT TECH] Telegram chưa bật cấu hình thật. Nội dung đơn hàng:", messageText);
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${PAT_CONFIG.TELEGRAM.BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: PAT_CONFIG.TELEGRAM.CHAT_ID,
        text: messageText,
        parse_mode: 'HTML'
      })
    });
    return response.ok;
  } catch (err) {
    console.error("❌ [PAT TECH] Lỗi khi gửi Telegram:", err);
    return false;
  }
}
