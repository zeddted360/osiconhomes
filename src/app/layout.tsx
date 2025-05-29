import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Header from "@/UI/Header/Header";
import Footer from "@/UI/Footer";
import { Toaster } from "react-hot-toast";
import SessionWrapper from "@/components/SessionWrapper";
export const metadata: Metadata = {
  title: {
    default: "Osicon Homes - Real Estate & Construction in Nigeria",
    template: "%s | Osicon Homes",
  },
  description:
    "Osicon Homes: Trusted real estate & construction company in Port Harcourt & Owerri, Nigeria. Buy, sell, or build your dream home with us. Contact us today!",
  keywords: [
    "real estate Port Harcourt",
    "real estate Owerri",
    "construction company Nigeria",
    "Osicon Homes",
    "property development Nigeria",
    "buy home Owerri",
    "sell home Port Harcourt",
    "FUTO real estate",
    "luxury homes Nigeria",
  ],
  authors: [{ name: "Osicon Homes Team" }],
  openGraph: {
    title: "Osicon Homes - Real Estate & Construction in Nigeria",
    description:
      "Discover top real estate and construction services with Osicon Homes in Port Harcourt & Owerri, Nigeria. Your dream home awaits!",
    url: "https://www.osiconhomes.com",
    siteName: "Osicon Homes",
    images: [
      {
        url: "https://www.osiconhomes.com/og-image.jpg", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Osicon Homes - Real Estate and Construction Services",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Osicon Homes - Real Estate & Construction in Nigeria",
    description:
      "Looking for real estate or construction in Port Harcourt & Owerri? Osicon Homes offers expert services. Contact us now!",
    images: ["https://www.osiconhomes.com/twitter-image.jpg"], // Replace with your actual image URL
    creator: "@OsiconHomes", // Replace with your actual Twitter handle
  },
  alternates: {
    canonical: "https://www.osiconhomes.com",
  },
  icons: {
    icon: "/favicon.ico", // Replace with your actual favicon path
    apple: "/apple-touch-icon.png", // Replace with your actual Apple touch icon
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Toaster position="top-right" reverseOrder={false} />
        <SessionWrapper>
          <Header />
          {children}
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
