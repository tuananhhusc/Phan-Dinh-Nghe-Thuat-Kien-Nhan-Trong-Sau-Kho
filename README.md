# Phân Định | Khi Mọi Thứ Chùng Xuống (PDTSK Reader)

Một ứng dụng web đọc bài nghiên cứu chuyên sâu (Long-read) cao cấp, được thiết kế chuyên biệt để mang lại trải nghiệm đọc mang tính học thuật, linh thánh và sâu lắng. Nội dung tập trung vào đề tài phân định thần khí trong sầu khổ thiêng liêng, kết hợp hài hòa giữa linh đạo Kitô giáo (đặc biệt là linh đạo Inhaxiô), triết học Phật giáo Tây Tạng, và lý thuyết tâm lý học kiên cường hiện đại.

---

## 🌟 Tính Năng Nổi Bật

### 🏛️ Thẩm Mỹ & Trải Nghiệm Đọc Thánh Thiêng (Theological Aesthetics)
*   **Giao diện Giấy Da (Parchment):** Sử dụng tông màu nền kem giấy da ấm áp (`#FAF9F5`) phối hợp với màu chữ than đá sâu (`#1A1A1A`) tạo cảm giác dễ chịu khi đọc lâu.
*   **Họa tiết Kính Màu (Stained Glass):** Nền trang trí chứa họa tiết hình học kính màu nhà thờ mờ dịu (độ đậm chỉ 2.5%), mang lại không gian tĩnh lặng, suy tư.
*   **Họa tiết Thánh Giá Celtic (Celtic Cross Motif):** Được lồng ghép tinh tế vào Đầu trang (Header) và Chân trang (Footer).
*   **Chữ Đầu Dòng Lớn (Drop Cap):** Tự động tạo chữ hoa trang trí lớn ở đầu bài viết theo phong cách bản thảo chép tay thời Trung Cổ.
*   **Đường chia Vàng (Golden Dividers):** Các đường phân đoạn mờ dần sang trọng giúp ngăn cách các phần nội dung rõ ràng.

### 🌗 Bảng Điều Khiển Giao Diện Đọc (Reader Settings)
Bảng điều khiển nổi (Floating Settings) nằm ở góc dưới bên trái cho phép tùy chỉnh:
*   **Chế độ Đêm ("Đêm Tối Tâm Hồn"):** Chuyển toàn bộ giao diện sang màu Slate/Midnight Blue huyền bí kết hợp chữ màu đồng nhạt, bảo vệ mắt khi đọc đêm hoặc trong phòng tối.
*   **Điều chỉnh Cỡ Chữ:** 3 nấc tương ứng (A-, A, A+) co giãn linh hoạt và mượt mà.
*   **Thay đổi Phông Chữ:** Chuyển đổi giữa phông có chân truyền thống (`Lora` - Serif, mang tính suy niệm) và phông không chân hiện đại (`Inter` - Sans-serif, dễ đọc trên màn hình nhỏ).
*   *Lưu trữ tùy chọn:* Tự động nhớ các cấu hình này thông qua `localStorage` cho lần truy cập sau.

### 📖 Tương Tác Học Thuật Cao Cấp
*   **Mục Lục Động (Sticky Table of Contents):** Sidebar hiển thị danh sách các đề mục chính và phụ. Sử dụng `IntersectionObserver` để tự động tô sáng (active) phần độc giả đang đọc khi cuộn trang. Trên mobile, mục lục tự động ẩn vào một ngăn kéo (drawer) trượt ra từ cạnh trái rất tiện lợi.
*   **Chú Thích Tương Tác (Interactive Footnotes):** Rê chuột hoặc chạm vào các số chú thích để hiển thị trực tiếp popup nguồn trích dẫn mà không cần cuộn xuống cuối trang.
*   **Sao Chép Trích Dẫn Nhanh (Quote Sharing):** Khối trích dẫn (blockquote) hỗ trợ nút "Sao chép" kèm phản hồi trực quan (biến đổi thành dấu tích xanh khi copy thành công).
*   **Thanh Tiến Trình Đọc (Reading Progress Bar):** Một thanh tiến trình siêu mảnh nằm cố định ở sát mép trên màn hình hiển thị tỉ lệ phần trăm bài viết đã hoàn thành.

### 🔌 Công Nghệ Hiện Đại
*   **Đọc Ngoại Tuyến (PWA - Progressive Web App):** Tích hợp công nghệ Service Worker (`@serwist/next`) giúp lưu trữ (cache) bài viết và phông chữ vào bộ nhớ thiết bị. Người đọc có thể thêm ứng dụng vào màn hình chính điện thoại và đọc hoàn toàn offline (không cần mạng internet).
*   **Tối Ưu Bản In / PDF (Print Stylesheet):** Tự động ẩn các thành phần giao diện thừa (nút bấm, thanh cuộn, sidebar) khi nhấn lệnh in (`Ctrl + P`), định dạng văn bản sang dạng sách học thuật nền trắng chữ đen chuẩn mực.

---

## 🛠️ Công Nghệ Sử Dụng

*   **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
*   **Ngôn ngữ:** TypeScript
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Markdown Parsing:** `react-markdown` kết hợp với `remark-gfm` (hỗ trợ bảng biểu) và `rehype-raw` (cho phép chèn mã HTML an toàn).
*   **PWA Engine:** `@serwist/next` & `@serwist/sw`

---

## 📂 Cấu Trúc Thư Mục Chính

```text
pdtsk-reader/
├── src/
│   ├── app/
│   │   ├── globals.css      # Hệ thống CSS variables, Dark Mode và Print CSS
│   │   ├── layout.tsx       # Khai báo Metadata SEO, Open Graph & nhúng Google Fonts
│   │   ├── page.tsx         # Trang chủ Server Component đọc & xử lý file Markdown
│   │   ├── manifest.ts      # Khai báo manifest cho PWA
│   │   └── sw.ts            # Cấu hình Service Worker cho Serwist (offline cache)
│   ├── components/
│   │   ├── Header.tsx       # Thanh đầu trang và nút Menu Mobile
│   │   ├── Footer.tsx       # Thanh chân trang và bản quyền
│   │   ├── ArticlePage.tsx  # Bố cục trang bài viết chính (Sidebar + Main Content)
│   │   ├── ArticleRenderer.tsx # Bộ dựng Markdown, custom blockquote & footnote sup
│   │   ├── TableOfContents.tsx  # Thanh mục lục động (Desktop Sidebar & Mobile Drawer)
│   │   ├── Tooltip.tsx      # Hộp chú thích nhỏ hiển thị trích dẫn
│   │   ├── SettingsPanel.tsx # Bảng cài đặt giao diện đọc
│   │   ├── CrossMotif.tsx   # Component vẽ Thánh giá Vector SVG
│   │   ├── ReadingProgress.tsx  # Thanh tiến trình đọc trên cùng
│   │   └── BackToTop.tsx    # Nút cuộn nhanh lên đầu trang
│   ├── content/
│   │   └── article.md       # Tệp nội dung bài viết gốc (định dạng Markdown sạch)
│   └── lib/
│       └── parseContent.ts  # Bộ tiền xử lý chuyển đổi văn bản và bảng biểu sang MD chuẩn
├── public/                  # Chứa các tài nguyên tĩnh (Icons PWA, ảnh OG...)
├── next.config.ts           # Cấu hình Next.js tích hợp Serwist PWA
└── package.json             # Danh sách thư viện phụ thuộc và các lệnh chạy dự án
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### Yêu Cầu Hệ Thống
*   Đã cài đặt [Node.js](https://nodejs.org/) (Khuyến nghị phiên bản LTS 18 trở lên).

### Bước 1: Cài đặt thư viện
Mở terminal tại thư mục dự án và chạy lệnh:
```bash
npm install
```

### Bước 2: Chạy môi trường phát triển (Development)
Chạy lệnh bên dưới để khởi động Dev Server. Lệnh này sử dụng cờ `--webpack` để tương thích hoàn toàn với thư viện PWA (do Turbopack chưa hỗ trợ build Service Worker tự động):
```bash
npm run dev
```
Sau đó mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)

### Bước 3: Build sản phẩm thực tế (Production)
Để tối ưu tốc độ tải và đóng gói sản phẩm hoàn chỉnh:
```bash
npm run build
```

Sau khi build xong, bạn có thể chạy thử bản build chính thức bằng lệnh:
```bash
npm run start
```

---

## 📝 Cập Nhật Nội Dung Bài Viết
Để thay đổi nội dung bài đọc hiển thị trên trang web:
1. Mở file `src/content/article.md`.
2. Thay thế bằng văn bản định dạng Markdown của bạn.
3. Phần cuối bài viết, hãy giữ nguyên cấu trúc tiêu đề `Nguồn trích dẫn` viết liền với các dòng link bên dưới để bộ parse tự động nhận diện danh sách footnote:
   ```text
   Nguồn trích dẫn
   Tên bài viết tham khảo 1, https://link-lien-ket-1.com
   Tên bài viết tham khảo 2, https://link-lien-ket-2.com
   ```

---

## 🔒 Bản Quyền
Dự án được phát triển nhằm phục vụ mục đích học tập, nghiên cứu chuyên sâu về Tâm lý học kiên cường và Phân định linh đạo.
