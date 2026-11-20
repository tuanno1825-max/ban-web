// Danh sách các mẫu web demo theo ngành nghề (dễ dàng thêm bớt sửa đổi tại đây)
const templatesData = [
  {
    id: "bat-dong-san",
    name: "Vinhomes Elite Residence - Sky Penthouse & Biệt Thự Nghỉ Dưỡng 3D",
    industry: "bat-dong-san",
    industryName: "Bất Động Sản",
    styleGroup: "luxury",
    flagship: true,
    badge: "🔥 Flagship 3D • Combo 3",
    gradient: "linear-gradient(135deg, #071c24 0%, #c59b27 50%, #f9f6f0 100%)",
    thumbImg: "demos/bat-dong-san/image/penthouse-tower.webp",
    palette: ["#071C24", "#C59B27", "#F9F6F0"],
    icon: "🏰",
    desc: "Phiên bản Flagship kiến trúc 3D tương tác: Chọn tầng 11–15 thời gian thực, chuyển chế độ Ngày/Đêm, tour xuyên 4 không gian Penthouse với HUD kính mờ và tính lãi vay Private Banking.",
    highlights: [
      "Tour không gian Penthouse 4 góc nhìn (Tháp Ven Biển → Hồ Bơi → Phòng Khách → Master)",
      "Bộ chọn tầng Floor 11–15 HUD kính mờ & chuyển ánh sáng Ngày / Đêm",
      "Bộ lọc tìm kiếm BĐS theo vị trí, loại hình & ngân sách",
      "Công cụ dự toán tài chính & lãi suất vay ngân hàng Realtime"
    ],
    demoUrl: "demos/bat-dong-san/index.html"
  },
  {
    id: "spa-beauty",
    name: "LUMIÈRE AESTHETIC & SPA - Thẩm Mỹ Viện & Spa Công Nghệ Cao 5 Sao",
    industry: "spa-beauty",
    industryName: "Spa / Thẩm Mỹ Viện",
    styleGroup: "luxury",
    badge: "Champagne Rose VIP",
    gradient: "linear-gradient(135deg, #fbf8f5 0%, #c69c6d 50%, #b76e79 100%)",
    thumbImg: "demos/spa-beauty/image/hero-spa.webp",
    palette: ["#FBF8F5", "#B76E79", "#C69C6D"],
    icon: "🌸",
    desc: "Giao diện thẩm mỹ viện & spa cao cấp phong cách Champagne Rose Gold thanh lịch: Bộ lọc bảng giá liệu trình, chọn chuyên viên thẩm mỹ, khung giờ hẹn trống & cấp phiếu VIP.",
    highlights: [
      "Bảng giá liệu trình lọc theo nhóm: Chăm sóc da, Tắm trắng, Diode Laser, Phun xăm",
      "Trải nghiệm không gian phòng VIP riêng tư & cam kết hiệu quả bằng văn bản",
      "Đặt lịch hẹn thông minh chọn liệu trình, chuyên viên & khung giờ trống",
      "Tự động xuất Phiếu Đặt Lịch VIP giảm 30% cho khách mới"
    ],
    demoUrl: "demos/spa-beauty/index.html"
  },
  {
    id: "ban-hang",
    name: "ATELIER NOIR - Thời Trang Thiết Kế & Boutique Cao Cấp 2026",
    industry: "ban-hang",
    industryName: "Thời Trang / Boutique",
    styleGroup: "modern",
    badge: "Vogue Editorial",
    gradient: "linear-gradient(135deg, #f5efe6 0%, #d4af37 50%, #1c1917 100%)",
    thumbImg: "demos/ban-hang/image/hero-fashion.webp",
    palette: ["#FAF7F2", "#111111", "#A67C52"],
    icon: "👗",
    desc: "Giao diện tạp chí thời trang thiết kế Haute Couture (nền Ivory & Noir sắc cạnh): Shoppable Lookbook gắn ghim mua trực tiếp trên ảnh mẫu, đo size thông minh AI và giỏ hàng hỏa tốc.",
    highlights: [
      "Shoppable Lookbook: Chạm ghim trực tiếp trên trang phục để chọn size & thêm vào túi",
      "Công cụ đo size thông minh AI theo chiều cao & cân nặng",
      "Chọn màu sắc & kích thước trực quan với giỏ hàng nhanh",
      "Cam kết đổi size miễn phí 7 ngày tận nhà & đồng kiểm COD"
    ],
    demoUrl: "demos/ban-hang/index.html"
  },
  {
    id: "my-pham",
    name: "The History of Whoo - Mỹ Phẩm Hoàng Cung Cao Cấp",
    industry: "my-pham",
    industryName: "Mỹ Phẩm / Làm Đẹp",
    styleGroup: "luxury",
    badge: "Lụa Gấm Hoàng Cung",
    gradient: "linear-gradient(135deg, #f6eae4 0%, #d4af37 50%, #6b1426 100%)",
    thumbImg: "demos/my-pham/image/hero-muse.webp",
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
    styleGroup: "modern",
    badge: "Swiss Clinical Lab",
    gradient: "linear-gradient(135deg, #e0f2fe 0%, #0284c7 55%, #0d9488 100%)",
    thumbImg: "demos/da-lieu/image/hero-doctor.webp",
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
    styleGroup: "vibrant",
    badge: "Bento Neo-Pop 2026",
    gradient: "linear-gradient(135deg, #4f46e5 0%, #ff5722 55%, #facc15 100%)",
    thumbImg: "demos/giao-duc/image/hero-student.webp",
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
    styleGroup: "luxury",
    badge: "Tropical Zen 5 Sao",
    gradient: "linear-gradient(135deg, #f6f2ea 0%, #c88a4b 48%, #1b4332 100%)",
    thumbImg: "demos/khach-san/image/hero-resort.webp",
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
    styleGroup: "vibrant",
    badge: "Polaroid & Boba Cafe",
    gradient: "linear-gradient(135deg, #fdf8f0 0%, #f59e0b 50%, #e0533c 100%)",
    thumbImg: "demos/ca-nhan/image/hero-person.webp",
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
    styleGroup: "luxury",
    badge: "Michelin Dark Grill",
    gradient: "linear-gradient(135deg, #ff2a4b 0%, #991b1b 50%, #15171d 100%)",
    thumbImg: "demos/fnb-cafe/image/wagyu.webp",
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
    id: "doanh-nghiep",
    name: "LIFETEC & PARTNERS - Tư Vấn Quản Trị Doanh Nghiệp, Pháp Lý & B2B",
    industry: "doanh-nghiep",
    industryName: "Doanh Nghiệp / B2B",
    styleGroup: "modern",
    badge: "Swiss Blueprint B2B",
    gradient: "linear-gradient(135deg, #f8fafc 0%, #0052cc 55%, #0a192f 100%)",
    thumbImg: "demos/doanh-nghiep/image/hero-consulting.webp",
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
    styleGroup: "luxury",
    badge: "Dưỡng Sinh Hoàng Cung",
    gradient: "linear-gradient(135deg, #c2410c 0%, #7c2d12 45%, #180905 100%)",
    thumbImg: "demos/massage-spa/image/hero-lounge.webp",
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
  },
  {
    id: "nha-khoa",
    name: "AURORA DENTAL LAB - Viện Nha Khoa Thẩm Mỹ & Chỉnh Nha Chuẩn Thụy Sĩ",
    industry: "nha-khoa",
    industryName: "Nha Khoa Thẩm Mỹ",
    styleGroup: "modern",
    badge: "Swiss Dental 3D",
    gradient: "linear-gradient(135deg, #eef6f6 0%, #0f766e 55%, #0b3b3c 100%)",
    thumbImg: "demos/nha-khoa/image/hero-dental.webp",
    palette: ["#F8FAFC", "#0F766E", "#C9A45C"],
    icon: "🦷",
    desc: "Giao diện nha khoa thẩm mỹ chuẩn y khoa Thụy Sĩ: Thanh kéo Before/After nụ cười thực tế, máy tính trả góp 0% lãi suất theo tháng và đặt lịch chụp CT 3D theo chi nhánh.",
    highlights: [
      "Thanh trượt Before / After nụ cười trước & sau dán sứ Veneer, Invisalign",
      "Máy tính trả góp 0% lãi suất từ 6–24 tháng đổ thẳng thông tin vào form",
      "Bảng giá niêm yết theo nhóm: Niềng răng, Răng sứ, Implant Straumann",
      "Đặt lịch khám & chụp phim CT ConeBeam 3D cấp mã ưu tiên qua Telegram"
    ],
    demoUrl: "demos/nha-khoa/index.html"
  },
  {
    id: "noi-that",
    name: "ATELIER MỘC & ĐÁ - Kiến Trúc & Thi Công Nội Thất Trọn Gói",
    industry: "noi-that",
    industryName: "Nội Thất & Kiến Trúc",
    styleGroup: "luxury",
    badge: "Bespoke Interior",
    gradient: "linear-gradient(135deg, #f5f1eb 0%, #b68d4c 52%, #2b211a 100%)",
    thumbImg: "demos/noi-that/image/hero-interior.webp",
    palette: ["#F5F1EB", "#B68D4C", "#2B211A"],
    icon: "🛋️",
    desc: "Không gian kiến trúc gỗ óc chó & đá Travertine sang trọng: Thanh kéo so sánh Hiện trạng thô → Bàn giao hoàn thiện, thư viện phong cách Indochine/Wabi-Sabi và dự toán m².",
    highlights: [
      "Thanh kéo so sánh trực quan Hiện trạng bàn giao thô → Hoàn thiện 100%",
      "Công cụ dự toán thiết kế 3D & thi công trọn gói theo diện tích m²",
      "Tuyển tập công trình lọc theo phong cách: Modern Luxury, Indochine, Wabi-Sabi",
      "Đăng ký khảo sát đo đạc Laser miễn phí cấp mã hồ sơ kiến trúc"
    ],
    demoUrl: "demos/noi-that/index.html"
  },
  {
    id: "tra-sua-cafe",
    name: "SƠN TRÀ BREW - Trà Sữa Thủ Công & Specialty Coffee Order 1 Chạm",
    industry: "tra-sua-cafe",
    industryName: "Cafe / Trà Sữa Order",
    styleGroup: "vibrant",
    badge: "Order Topping 10s",
    gradient: "linear-gradient(135deg, #fffdf7 0%, #27664f 52%, #c86d2d 100%)",
    thumbImg: "demos/tra-sua-cafe/image/hero-boba.webp",
    palette: ["#FFFDF7", "#1F4E3D", "#C86D2D"],
    icon: "🧋",
    desc: "Web đặt đồ uống không mất 25–30% hoa hồng sàn: Khách tự chọn Size M/L, % Đường, Đá, nhiều loại Topping, áp mã giảm giá GIAM15K và bắn hóa đơn bếp về Telegram 1s.",
    highlights: [
      "Modal tùy chỉnh ly chuẩn app: Size M/L, Đường 0–100%, Đá riêng & 5 Topping",
      "Giỏ hàng nổi tăng giảm số lượng ly, áp mã giảm giá GIAM15K tức thì",
      "Chọn Giao tận nơi hoặc Tự đến lấy, xuất Hóa đơn bếp điện tử",
      "Bắn chi tiết từng ly + topping về Telegram chủ quán trong 1 giây"
    ],
    demoUrl: "demos/tra-sua-cafe/index.html"
  },
  {
    id: "o-to-detailing",
    name: "APEX MOTOR LAB - Dán PPF TPU, Phủ Ceramic 9H & Detailing Siêu Xe",
    industry: "o-to-detailing",
    industryName: "Ô Tô / Detailing",
    styleGroup: "luxury",
    badge: "PPF & Ceramic Pro",
    gradient: "linear-gradient(135deg, #1b212e 0%, #e11d48 52%, #0b0d12 100%)",
    thumbImg: "demos/o-to-detailing/image/hero-auto.webp",
    palette: ["#0B0D12", "#E11D48", "#FDE68A"],
    icon: "🚗",
    desc: "Giao diện Dark Carbon chuẩn Studio siêu xe: Thanh kéo so sánh độ bóng sơn Ceramic 9H, bộ cấu hình tự tính giá theo dòng xe (Sedan / SUV / Siêu xe) & đặt cầu nâng qua Telegram.",
    highlights: [
      "Thanh kéo Before / After bề mặt sơn mờ xước → bóng gương Ceramic 9H",
      "Bộ cấu hình thông minh theo phân khúc xe & giảm ngay 10% khi chọn Combo",
      "Bảng dịch vụ lọc theo Dán PPF TPU, Ceramic, Nội thất da & Rửa xe 14 bước",
      "Đặt lịch cầu nâng ghi biển số xe & báo ngay về Telegram quản lý xưởng"
    ],
    demoUrl: "demos/o-to-detailing/index.html"
  },
  {
    id: "thiep-cuoi-studio",
    name: "MINH QUÂN & KHÁNH LINH - Thiệp Cưới Online & Studio L'Amour Wedding",
    industry: "thiep-cuoi-studio",
    industryName: "Thiệp Cưới / Studio",
    styleGroup: "vibrant",
    badge: "RSVP & QR Mừng Cưới",
    gradient: "linear-gradient(135deg, #fcf9f6 0%, #b76e79 52%, #c59b27 100%)",
    thumbImg: "demos/thiep-cuoi-studio/image/hero-wedding.webp",
    palette: ["#FCF9F6", "#B76E79", "#C59B27"],
    icon: "💍",
    desc: "Thiệp cưới điện tử lãng mạn phong cách Ivory & Rose Gold: Đồng hồ đếm ngược, Album Pre-Wedding phóng to sắc nét, RSVP đếm khách dự tiệc báo Telegram 1s & Hộp Mừng Cưới QR.",
    highlights: [
      "Đồng hồ đếm ngược ngày cưới, cột mốc Love Story & dải màu Dress Code",
      "Album ảnh cưới WebP siêu nét với Lightbox phóng to mượt mà trên điện thoại",
      "Form RSVP đếm số người đi cùng + thực đơn chay/mặn cập nhật Sổ Lưu Bút live",
      "Hộp Mừng Cưới VietQR tách riêng Cô Dâu / Chú Rể & nút lưu lịch hẹn (.ics)"
    ],
    demoUrl: "demos/thiep-cuoi-studio/index.html"
  }
];

// Danh sách 16 ngành nghề khớp 1-1 với các trang dịch vụ chuyên sâu
const industriesList = [
  { id: "all", name: "Tất cả ngành nghề", icon: "🌐" },
  { id: "bat-dong-san", name: "Bất Động Sản", icon: "🏰" },
  { id: "o-to-detailing", name: "Ô Tô / Detailing", icon: "🚗" },
  { id: "thiep-cuoi-studio", name: "Thiệp Cưới / Studio", icon: "💍" },
  { id: "nha-khoa", name: "Nha Khoa Thẩm Mỹ", icon: "🦷" },
  { id: "noi-that", name: "Nội Thất & Kiến Trúc", icon: "🛋️" },
  { id: "tra-sua-cafe", name: "Cafe / Trà Sữa Order", icon: "🧋" },
  { id: "spa-beauty", name: "Spa / Thẩm Mỹ Viện", icon: "🌸" },
  { id: "my-pham", name: "Mỹ Phẩm / Làm Đẹp", icon: "👑" },
  { id: "da-lieu", name: "Phòng Khám / Da Liễu", icon: "🩺" },
  { id: "massage-spa", name: "Massage / Dưỡng Sinh", icon: "🏮" },
  { id: "ban-hang", name: "Thời Trang / Shop", icon: "👗" },
  { id: "fnb-cafe", name: "Nhà Hàng / F&B", icon: "🍽️" },
  { id: "khach-san", name: "Khách Sạn / Resort", icon: "🏖️" },
  { id: "doanh-nghiep", name: "Doanh Nghiệp / B2B", icon: "💼" },
  { id: "giao-duc", name: "Giáo Dục / Đào Tạo", icon: "🎓" },
  { id: "ca-nhan", name: "Cá Nhân / Creator", icon: "☕" }
];

// Danh sách bộ lọc phong cách thiết kế
const styleFiltersList = [
  { id: "all", name: "Tất cả phong cách", icon: "✨" },
  { id: "luxury", name: "Sang trọng VIP", icon: "👑" },
  { id: "modern", name: "Tối giản & Y khoa", icon: "🤍" },
  { id: "vibrant", name: "Năng động & Sáng tạo", icon: "⚡" }
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
    popular: true,
    desc: "Dành cho cá nhân, shop nhỏ, chạy Ads cần web đẹp chốt đơn nhanh mà không tốn chi phí nuôi database.",
    features: [
      "Giao diện chuẩn UX/UI theo mẫu ngành nghề",
      "Tương thích 100% Máy tính & Điện thoại",
      "Nút gọi Hotline, Chat Zalo, Messenger gắn nổi",
      "Form đặt hàng / đặt lịch BẮN ĐƠN VỀ TELEGRAM trong 1s",
      "Tối ưu tốc độ tải trang cực nhanh (PageSpeed 90+)",
      "Bàn giao toàn bộ mã nguồn & quyền sở hữu 100%"
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
    popular: false,
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
