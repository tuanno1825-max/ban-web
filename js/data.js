// Danh sách các mẫu web demo theo ngành nghề (dễ dàng thêm bớt sửa đổi tại đây)
const templatesData = [
  {
    id: "ban-hang",
    name: "ATELIER NOIR - Thời Trang Thiết Kế & Boutique Cao Cấp 2026",
    industry: "ban-hang",
    industryName: "Thời Trang / Boutique",
    badge: "Vogue Editorial",
    gradient: "linear-gradient(135deg, #f5efe6 0%, #d4af37 50%, #1c1917 100%)",
    thumbImg: "demos/ban-hang/image/hero-fashion.jpg",
    palette: ["#FAF7F2", "#111111", "#A67C52"],
    icon: "👗",
    desc: "Giao diện tạp chí thời trang thiết kế Haute Couture (nền Ivory & Noir sắc cạnh): Lookbook thời thượng, bảng đo size thông minh AI, chọn màu trực quan và giỏ hàng chốt đơn hỏa tốc.",
    highlights: [
      "Lookbook tạp chí phối đồ theo dịp: Office Chic, Street, Party",
      "Công cụ đo size thông minh AI theo chiều cao & cân nặng",
      "Chọn màu sắc & kích thước trực quan với giỏ hàng nhanh",
      "Cam kết đổi size miễn phí 7 ngày tận nhà & đồng kiểm COD"
    ],
    demoUrl: "demos/ban-hang/index.html"
  },
  {
    id: "my-pham",
    name: "The History of Whoo - Mỹ Phẩm Hoàng Cung Cao Cấp",
    industry: "spa-beauty",
    industryName: "Mỹ Phẩm / Làm Đẹp",
    badge: "Lụa Gấm Hoàng Cung",
    gradient: "linear-gradient(135deg, #f6eae4 0%, #d4af37 50%, #6b1426 100%)",
    thumbImg: "demos/my-pham/image/hero-muse.jpg",
    palette: ["#FDF8F5", "#8B1E3F", "#D4AF37"],
    icon: "👑",
    desc: "Tuyệt tác thương hiệu mỹ phẩm Đông Y Hoàng Cung (Lụa Hồng Phấn & Cung Điện Chu Sa): Phiên bản Yeheonbo dát vàng, kiệt tác Hwanyu, 8 dòng bảo vật và Thái Y Viện soi da AI.",
    highlights: [
      "Kiệt tác Yeheonbo & Hwanyu phong cách lụa sứ & chu sa dát vàng",
      "8 Bộ sưu tập hoàng cung: Bichup, Cheongidan, Cheonyuldan...",
      "Trợ lý AI trắc nghiệm soi da & đề xuất pháp đồ Đông Y",
      "Đăng ký nhận Hộp quà trải nghiệm (Discovery Kit) tận nhà"
    ],
    demoUrl: "demos/my-pham/index.html"
  },
  {
    id: "da-lieu",
    name: "PAT DERMA - Phòng Khám Chuyên Khoa Da Liễu Chuẩn Y Khoa",
    industry: "da-lieu",
    industryName: "Phòng Khám / Da Liễu",
    badge: "Swiss Clinical Lab",
    gradient: "linear-gradient(135deg, #e0f2fe 0%, #0284c7 55%, #0d9488 100%)",
    thumbImg: "demos/da-lieu/image/hero-doctor.jpg",
    palette: ["#F0F9FF", "#0284C7", "#0D9488"],
    icon: "🩺",
    desc: "Giao diện phòng khám da liễu chuẩn Swiss Clinical sáng trong & vô trùng: Đội ngũ Bác sĩ CKI-II, máy phân tích Before/After, dự toán chi phí phác đồ và Kiosk lấy số khám ưu tiên.",
    highlights: [
      "Đội ngũ Bác sĩ Chuyên khoa CKI-CKII & chứng nhận FDA Hoa Kỳ",
      "Thanh trượt tương tác so sánh ảnh Trước & Sau (Before/After) trực quan",
      "Công cụ dự toán chi phí & số buổi điều trị theo tình trạng da",
      "Form đặt lịch khám 1:1 tự động cấp Phiếu Khám Ưu Tiên VIP"
    ],
    demoUrl: "demos/da-lieu/index.html"
  },
  {
    id: "giao-duc",
    name: "PAT ACADEMY - Học Viện Đào Tạo Kỹ Năng Số & Công Nghệ Thực Chiến",
    industry: "giao-duc",
    industryName: "Giáo Dục / Đào Tạo",
    badge: "Bento Neo-Pop 2026",
    gradient: "linear-gradient(135deg, #4f46e5 0%, #ff5722 55%, #facc15 100%)",
    thumbImg: "demos/giao-duc/image/hero-student.jpg",
    palette: ["#EEF2FF", "#4F46E5", "#FF5722"],
    icon: "🎓",
    desc: "Giao diện học viện công nghệ phong cách Bento Grid & Neo-Pop đa sắc năng động: Lộ trình 4 chặng, bộ đếm ngược tuyển sinh, trắc nghiệm nghề nghiệp AI và săn học bổng 50%.",
    highlights: [
      "Catalog 4 khóa học đón đầu xu hướng: Lập trình, Marketing, UI/UX, IELTS",
      "Đồng hồ đếm ngược tuyển sinh và số liệu việc làm 98.2%",
      "Trắc nghiệm AI gợi ý ngành nghề phù hợp theo sở thích & mức lương",
      "Đăng ký xét tuyển tự động cấp Mã Học Bổng Giảm 50% học phí"
    ],
    demoUrl: "demos/giao-duc/index.html"
  },
  {
    id: "khach-san",
    name: "An Nhiên Retreat - Resort Sinh Thái & Biệt Thự Nghỉ Dưỡng 5 Sao",
    industry: "khach-san",
    industryName: "Khách Sạn / Resort",
    badge: "Tropical Zen 5 Sao",
    gradient: "linear-gradient(135deg, #f6f2ea 0%, #c88a4b 48%, #1b4332 100%)",
    thumbImg: "demos/khach-san/image/hero-resort.jpg",
    palette: ["#F6F2EA", "#1B4332", "#C88A4B"],
    icon: "🏖️",
    desc: "Không gian nghỉ dưỡng Six Senses Tropical Zen (Màu cát ấm & Rừng trúc): Kiến trúc vòm Villa nghệ thuật, thanh tìm phòng thông minh, tour ảo 360° và Quản gia tính giá kỳ nghỉ.",
    highlights: [
      "Smart Booking Bar lọc phòng theo ngày check-in & số khách",
      "Bộ sưu tập Oceanfront Pool Villa, Bungalow đồi thông & Glamping",
      "Tour thực tế ảo đổi góc nhìn: Hồ bơi vô cực, Onsen, Bữa sáng nổi",
      "Bảng dự toán chi phí kỳ nghỉ tự động áp dụng chiết khấu đặt sớm"
    ],
    demoUrl: "demos/khach-san/index.html"
  },
  {
    id: "ca-nhan",
    name: "Hoàng (黃) - Du Học Sinh Đài Loan & Góc Donate Trà Sữa",
    industry: "ca-nhan",
    industryName: "Cá Nhân / Blogger",
    badge: "Polaroid & Boba Cafe",
    gradient: "linear-gradient(135deg, #fdf8f0 0%, #f59e0b 50%, #e0533c 100%)",
    thumbImg: "demos/ca-nhan/image/hero-person.jpg",
    palette: ["#FDF8F0", "#E0533C", "#FEF08A"],
    icon: "🧋",
    desc: "Nhật ký Scrapbook & Quán Trà Sữa Đài Bắc ấm áp của Hoàng: Khung ảnh Polaroid dán băng keo, cẩm nang săn học bổng, hóa đơn Mời Trà Sữa QR thật và tường giấy nhớ tri ân.",
    highlights: [
      "Bộ ảnh Polaroid đời sống du học sinh: Taipei, MRT, Đồ án...",
      "Cẩm nang chia sẻ: Học bổng MOE, thi TOCFL Phồn thể, việc làm",
      "Góc Donate trà sữa / cà phê tích hợp mã QR thanh toán thật",
      "Bảng Vàng Tri Ân phong cách giấy nhớ Sticky-Note trực tiếp"
    ],
    demoUrl: "demos/ca-nhan/index.html"
  },
  {
    id: "fnb-cafe",
    name: "Huff & Puff - Ẩm Thực Fine Dining & Đặt Bàn VIP",
    industry: "fnb-cafe",
    industryName: "Nhà Hàng / F&B",
    badge: "Michelin Dark Grill",
    gradient: "linear-gradient(135deg, #ff2a4b 0%, #991b1b 50%, #15171d 100%)",
    thumbImg: "demos/fnb-cafe/image/wagyu.jpg",
    palette: ["#131417", "#FF2A4B", "#F59E0B"],
    icon: "🍽️",
    desc: "Tuyệt tác nhà hàng Fine Dining phong cách Michelin Dark Gastronomy: Thực đơn tương tác xoay đĩa ăn 1 chạm, chọn món trước vào bàn và khung giờ giữ bàn sinh mã thẻ VIP.",
    highlights: [
      "Thực đơn tương tác Interactive Menu xoay đĩa cao cấp",
      "Mâm của bạn: Khách tự chọn món trước khi đến",
      "Chọn khung giờ giữ bàn trực quan (Sắp hết / Còn chỗ)",
      "Sinh vé đặt bàn có Mã Booking VIP & bắn về Telegram"
    ],
    demoUrl: "demos/fnb-cafe/index.html"
  },
  {
    id: "bat-dong-san",
    name: "Vinhomes Elite Residence - Tuyệt Tác Nghỉ Dưỡng Hạng Sang",
    industry: "bat-dong-san",
    industryName: "Bất Động Sản",
    badge: "Marble & Ocean VIP",
    gradient: "linear-gradient(135deg, #f9f6f0 0%, #d4af37 50%, #071c24 100%)",
    thumbImg: "demos/bat-dong-san/image/hero-villa.jpg",
    palette: ["#F9F6F0", "#071C24", "#C59B27"],
    icon: "🏰",
    desc: "Kiến trúc Đá Cẩm Thạch Champagne & Vịnh Biển Thượng Lưu: Bộ 3 phân khúc Bán/Cho Thuê/Chính Sách, bộ lọc dinh thự thông minh và trung tâm tính lãi vay Private Banking.",
    highlights: [
      "Bộ 3 Card phân khúc Bán - Thuê - Chính sách VIP",
      "Bộ lọc tìm kiếm BĐS theo vị trí, loại hình & ngân sách",
      "Công cụ dự toán tài chính & lãi suất vay ngân hàng Realtime",
      "Đăng ký xe Limousine đón xem sa bàn & dự án thực tế"
    ],
    demoUrl: "demos/bat-dong-san/index.html"
  },
  {
    id: "doanh-nghiep",
    name: "LIFETEC & PARTNERS - Tư Vấn Quản Trị Doanh Nghiệp, Pháp Lý & B2B",
    industry: "doanh-nghiep",
    industryName: "Doanh Nghiệp / B2B",
    badge: "Swiss Blueprint B2B",
    gradient: "linear-gradient(135deg, #f8fafc 0%, #0052cc 55%, #0a192f 100%)",
    thumbImg: "demos/doanh-nghiep/image/hero-consulting.jpg",
    palette: ["#F8FAFC", "#0052CC", "#0A192F"],
    icon: "📊",
    desc: "Cổng tư vấn quản trị doanh nghiệp chuẩn McKinsey / Swiss Architectural Grid: Bản đồ Hologram tương tác, 4 trụ cột pháp lý FDI và công cụ dự toán phí tư vấn Realtime.",
    highlights: [
      "Interactive Hologram: Bản đồ chiến lược quản trị Kỹ thuật & Môi trường",
      "Bộ 4 trụ cột B2B: Tối ưu vận hành, Môi giới thương mại, Pháp lý FDI & Kiểm toán",
      "Bảng dự toán phí dịch vụ tư vấn theo quy mô nhân sự & phạm vi",
      "Đặt lịch tư vấn kín 1:1 cấp Mã Phiếu Tiếp Nhận Doanh Nghiệp VIP"
    ],
    demoUrl: "demos/doanh-nghiep/index.html"
  },
  {
    id: "massage-spa",
    name: "DƯỠNG TÂM CÁC (養心閣) - Viện Massage & Trị Liệu Dưỡng Sinh Cổ Truyền",
    industry: "massage-spa",
    industryName: "Massage / Dưỡng Sinh",
    badge: "Dưỡng Sinh Hoàng Cung",
    gradient: "linear-gradient(135deg, #c2410c 0%, #7c2d12 45%, #180905 100%)",
    thumbImg: "demos/massage-spa/image/hero-lounge.jpg",
    palette: ["#1B0D08", "#991B1B", "#D4AF37"],
    icon: "🏮",
    desc: "Tuyệt tác không gian thiền tịnh cổ truyền phong cách Hoàng Cung Á Đông: Đả thông 108 huyệt đạo kinh lạc, ngâm tắm lá thuốc Dao Đỏ bồn pơ-mu, bắt bệnh đau mỏi AI và đặt phòng VIP 1 chạm.",
    highlights: [
      "Không gian sảnh trà & phòng VIP cổ phong Á Đông trầm ấm, cách âm tuyệt đối",
      "Kỹ thuật đả thông kinh lạc cổ vai gáy, lưng eo & massage đá nóng núi lửa",
      "Trợ lý AI Bắt bệnh đau mỏi & tự động chỉ định phác đồ Đông Y theo thể trạng",
      "Đặt phòng VIP nhận Phiếu hẹn Hoàng Cung giảm 35% & trà thực dưỡng miễn phí"
    ],
    demoUrl: "demos/massage-spa/index.html"
  }
];

// Danh sách ngành nghề để lọc
const industriesList = [
  { id: "all", name: "Tất cả ngành nghề", icon: "🌐" },
  { id: "ca-nhan", name: "Cá Nhân / Creator", icon: "☕" },
  { id: "khach-san", name: "Khách Sạn / Resort", icon: "🏖️" },
  { id: "giao-duc", name: "Giáo Dục / Đào Tạo", icon: "🎓" },
  { id: "da-lieu", name: "Phòng Khám / Da Liễu", icon: "🩺" },
  { id: "spa-beauty", name: "Mỹ Phẩm / Spa", icon: "👑" },
  { id: "fnb-cafe", name: "Nhà Hàng / F&B", icon: "🍽️" },
  { id: "bat-dong-san", name: "Bất Động Sản", icon: "🏢" },
  { id: "ban-hang", name: "Thời Trang / Shop", icon: "👗" },
  { id: "doanh-nghiep", name: "Doanh Nghiệp", icon: "💼" },
  { id: "massage-spa", name: "Massage / Dưỡng Sinh", icon: "🏮" }
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
