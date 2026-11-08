// Danh sách các mẫu web demo theo ngành nghề (dễ dàng thêm bớt sửa đổi tại đây)
const templatesData = [
  {
    id: "ban-hang",
    name: "Cửa Hàng Thời Trang & Phụ Kiện (Shop Modern)",
    industry: "ban-hang",
    industryName: "Bán Hàng / Shop",
    badge: "Bán chạy nhất",
    gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
    icon: "🛍️",
    desc: "Giao diện bán hàng hiện đại, tối ưu hiển thị sản phẩm, hỗ trợ lọc theo danh mục, kích thước, màu sắc và giỏ hàng nhanh.",
    highlights: [
      "Bộ sưu tập sản phẩm & danh mục trực quan",
      "Giỏ hàng & Đặt hàng nhanh 1 chạm",
      "Chuẩn responsive điện thoại & máy tính",
      "Nút mua hàng bắn thông báo về Telegram"
    ],
    demoUrl: "demos/ban-hang/index.html"
  },
  {
    id: "spa-beauty",
    name: "Thẩm Mỹ Viện & Spa Cao Cấp (Aura Beauty)",
    industry: "spa-beauty",
    industryName: "Spa / Làm Đẹp",
    badge: "Sang trọng",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)",
    icon: "💆‍♀️",
    desc: "Thiết kế tông màu nhẹ nhàng, tôn vinh dịch vụ chăm sóc sắc đẹp, kèm form đặt lịch hẹn dịch vụ thông minh gửi thẳng về điện thoại.",
    highlights: [
      "Menu bảng giá dịch vụ & liệu trình chi tiết",
      "Form đặt lịch hẹn chọn ngày giờ & chi nhánh",
      "Góc feedback khách hàng & hình ảnh Before/After",
      "Tích hợp gọi tư vấn nhanh Zalo/Hotline"
    ],
    demoUrl: "demos/spa-beauty/index.html"
  },
  {
    id: "fnb-cafe",
    name: "MÂM SƠN - Ẩm Thực Fine Dining & Giữ Bàn Tự Động",
    industry: "fnb-cafe",
    industryName: "Nhà Hàng / F&B",
    badge: "VIP 15 Triệu",
    gradient: "linear-gradient(135deg, #d4af37 0%, #15171d 100%)",
    icon: "🍽️",
    desc: "Mẫu nhà hàng chuẩn VIP lấy cảm hứng từ Mâm Sơn & Sushi Zeron: Thực đơn tương tác đổi đĩa ăn 1 chạm, mâm gọi món trước và chọn khung giờ giữ bàn sinh mã đặt chỗ tức thì.",
    highlights: [
      "Thực đơn tương tác Interactive Menu cao cấp",
      "Mâm của bạn: Khách tự chọn món trước khi đến",
      "Chọn khung giờ giữ bàn trực quan (Sắp hết / Còn chỗ)",
      "Sinh vé đặt bàn có Mã Booking VIP & bắn về Telegram"
    ],
    demoUrl: "demos/fnb-cafe/index.html"
  },
  {
    id: "bat-dong-san",
    name: "Dự Án Bất Động Sản & Đất Nền (Skyline Landmark)",
    industry: "bat-dong-san",
    industryName: "Bất Động Sản",
    badge: "Tỷ lệ chốt cao",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    icon: "🏢",
    desc: "Landing Page dự án BĐS chuyên nghiệp: Tổng quan, vị trí, mặt bằng, tiện ích và form tải trọn bộ hồ sơ pháp lý & bảng giá.",
    highlights: [
      "Form nhận bảng giá & mặt bằng qua Telegram",
      "Bản đồ quy hoạch & tiện ích nội ngoại khu",
      "Thư viện hình ảnh thực tế căn hộ mẫu 360",
      "Đếm ngược ưu đãi đợt 1 tạo tính khan hiếm"
    ],
    demoUrl: "demos/bat-dong-san/index.html"
  },
  {
    id: "doanh-nghiep",
    name: "Công Ty Dịch Vụ & Xuất Nhập Khẩu (Nova Corp)",
    industry: "doanh-nghiep",
    industryName: "Doanh Nghiệp / Dịch Vụ",
    badge: "Uy tín thương hiệu",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
    icon: "💼",
    desc: "Giao diện khẳng định uy tín tổ chức, giới thiệu năng lực công ty, đội ngũ chuyên gia, các đối tác và các dự án đã triển khai.",
    highlights: [
      "Hồ sơ năng lực (Profile công ty) trực tuyến",
      "Danh sách dự án & khách hàng tiêu biểu",
      "Form yêu cầu báo giá dự án / tư vấn hợp tác",
      "Tối ưu SEO Google chuẩn quốc tế"
    ],
    demoUrl: "demos/doanh-nghiep/index.html"
  }
];

// Danh sách ngành nghề để lọc
const industriesList = [
  { id: "all", name: "Tất cả ngành nghề", icon: "🌐" },
  { id: "ban-hang", name: "Bán Hàng / Shop", icon: "🛍️" },
  { id: "spa-beauty", name: "Spa / Làm Đẹp", icon: "💆‍♀️" },
  { id: "fnb-cafe", name: "Nhà Hàng / F&B", icon: "🍽️" },
  { id: "bat-dong-san", name: "Bất Động Sản", icon: "🏢" },
  { id: "doanh-nghiep", name: "Doanh Nghiệp", icon: "💼" }
];

// Bảng giá Combos
const pricingCombos = [
  {
    tier: "Combo 1",
    name: "Tinh Gọn (Landing Page)",
    priceNum: 1500000,
    priceStr: "1.500.000đ",
    unit: "Năm đầu tiên trọn gói",
    renewalPrice: "Chỉ ~350k/năm (Phí tên miền, Hosting 0đ trọn đời)",
    popular: false,
    desc: "Dành cho cá nhân, shop nhỏ, chạy Ads cần web đẹp chốt đơn nhanh mà không tốn chi phí nuôi database.",
    features: [
      "Giao diện chuẩn UX/UI theo mẫu ngành nghề",
      "Tương thích 100% Máy tính & Điện thoại",
      "Nút gọi Hotline, Chat Zalo, Messenger gắn nổi",
      "Form đặt hàng / đặt lịch BẮN ĐƠN VỀ TELEGRAM trong 1s",
      "Tối ưu tốc độ tải trang cực nhanh (PageSpeed 90+)",
      "Bàn giao toàn bộ mã nguồn HTML/CSS/JS"
    ],
    note: "Duy trì từ năm 2: Server 0đ vĩnh viễn (chỉ đóng gia hạn tên miền)."
  },
  {
    tier: "Combo 2",
    name: "Quản Trị Chuyên Nghiệp",
    priceNum: 3900000,
    priceStr: "3.900.000đ",
    unit: "Bao gồm Domain + Cloud Hosting năm đầu",
    renewalPrice: "800.000đ - 1.200.000đ / năm (~70k/tháng)",
    popular: true,
    desc: "Lựa chọn hàng đầu cho các Shop & Doanh nghiệp vừa và nhỏ cần quản lý sản phẩm, đơn hàng và thống kê doanh thu.",
    features: [
      "Bao gồm TOÀN BỘ quyền lợi của Combo 1",
      "Hệ thống Đăng ký / Đăng nhập tài khoản khách hàng",
      "Trang Admin Quản Trị riêng biệt dễ dùng không cần biết code",
      "Tự do thêm / sửa / xóa sản phẩm, bài viết, banner",
      "Phân quyền quản trị theo yêu cầu (Chủ shop / Nhân viên)",
      "Báo cáo & Thống kê doanh thu theo ngày / tháng / năm"
    ],
    note: "Duy trì từ năm 2: Trọn gói Tên miền + Cloud Hosting + Backup dữ liệu."
  },
  {
    tier: "Combo 3",
    name: "Toàn Diện & Tự Động Hóa",
    priceNum: 7900000,
    priceStr: "Từ 7.900.000đ",
    unit: "Hệ thống cao cấp theo yêu cầu",
    renewalPrice: "1.500.000đ - 2.000.000đ / năm",
    popular: false,
    desc: "Giải pháp cho thương hiệu lớn cần tự động hóa thanh toán, giữ chân khách hàng và thiết kế độc quyền 100%.",
    features: [
      "Bao gồm TOÀN BỘ quyền lợi của Combo 2",
      "Thanh toán tự động 24/7 (Quét mã VietQR tự khớp đơn)",
      "Hệ thống Marketing: Voucher giảm giá, Flash Sale",
      "Tích điểm thành viên hoặc tính hoa hồng CTV",
      "Thiết kế giao diện ĐỘC QUYỀN theo nhận diện thương hiệu",
      "Hỗ trợ kỹ thuật & Sao lưu (Backup) dữ liệu định kỳ"
    ],
    note: "Duy trì từ năm 2: Cloud VPS chịu tải lớn + Tên miền + Hỗ trợ kỹ thuật VIP."
  }
];

// Thông tin Chatbot Add-on
const chatbotAddon = {
  setupPrice: 500000,
  setupStr: "500.000đ",
  monthlyPrice: 300000,
  monthlyStr: "300.000đ/tháng"
};
