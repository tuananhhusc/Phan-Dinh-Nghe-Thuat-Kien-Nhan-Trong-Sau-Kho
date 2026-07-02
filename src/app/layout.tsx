import type { Metadata } from "next";
import { Playfair_Display, Lora, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pdtsk-reader.vercel.app"), // Placeholder URL, should be replaced with actual domain
  title: {
    default: "Phân Định | Khi Mọi Thứ Chùng Xuống",
    template: "%s | PDTSK",
  },
  description:
    "Báo cáo phân tích chuyên sâu về phân định thần khí, nghệ thuật kiên nhẫn trong sầu khổ thiêng liêng, tổng hòa linh đạo Inhaxiô, triết học Phật giáo và tâm lý học kiên cường.",
  keywords: [
    "phân định thần khí",
    "sầu khổ thiêng liêng",
    "Inhaxiô Loyola",
    "kiên nhẫn",
    "Đêm tối tâm hồn",
    "linh đạo Công giáo",
    "tâm lý học kiên cường",
  ],
  authors: [{ name: "PDTSK", url: "https://pdtsk-reader.vercel.app" }],
  creator: "PDTSK",
  publisher: "PDTSK",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Phân Định | Khi Mọi Thứ Chùng Xuống",
    description:
      "Nghệ thuật kiên nhẫn trong sầu khổ — Tổng hòa linh đạo, triết học và tâm lý học",
    url: "/",
    siteName: "Tài Liệu Phân Định",
    locale: "vi_VN",
    type: "article",
    images: [
      {
        url: "/og-image.jpg", // Placeholder for Open Graph Image
        width: 1200,
        height: 630,
        alt: "Khi Mọi Thứ Chùng Xuống - Nghệ Thuật Kiên Nhẫn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phân Định | Khi Mọi Thứ Chùng Xuống",
    description: "Nghệ thuật kiên nhẫn trong sầu khổ thiêng liêng.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${lora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
