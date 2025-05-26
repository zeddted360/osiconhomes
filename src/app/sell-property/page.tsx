import { Metadata } from "next";
import Image from "next/image";
import SellPropertyForm from "@/components/SellPropertyForm";

// SEO Metadata
export const metadata: Metadata = {
  title: "Sell A Property | Osicon Homes",
  description:
    "Sell your property to Osicon Homes in Port Harcourt & Owerri, Nigeria. Submit your property details and our team will respond within 24 hours!",
  keywords: [
    "sell property Port Harcourt",
    "sell home Owerri",
    "Osicon Homes sell property",
    "real estate Nigeria sell",
  ],
  openGraph: {
    title: "Sell A Property | Osicon Homes",
    description:
      "Submit your property details to sell with Osicon Homes in Port Harcourt & Owerri.",
    url: "https://www.osiconhomes.com/sell-property",
    siteName: "Osicon Homes",
    images: [
      {
        url: "https://www.osiconhomes.com/og-image-sell-property.jpg",
        width: 1200,
        height: 630,
        alt: "Sell A Property with Osicon Homes",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sell A Property | Osicon Homes",
    description:
      "Submit your property details to sell with Osicon Homes in Port Harcourt & Owerri.",
    images: ["https://www.osiconhomes.com/twitter-image-sell-property.jpg"],
    creator: "@OsiconHomes",
  },
  alternates: {
    canonical: "https://www.osiconhomes.com/sell-property",
  },
};

export default function SellProperty() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-amber-50 px-4 py-12 lg:py-16 overflow-hidden"
      aria-labelledby="sell-property-heading"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-amber-200/50">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.ico"
              alt="Osicon Homes Logo"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
          </div>

          {/* Header */}
          <h2
            id="sell-property-heading"
            className="text-xl sm:text-4xl font-bold text-gray-900 text-center mb-4"
            role="heading"
            aria-level={2}
          >
            Sell A Property to Osicon Homes
          </h2>
          <p className="text-gray-600 text-center mb-6">
            To sell your property to Osicon Homes, please fill out the form
            below. Our support team will respond via email within 24 hours.
          </p>

          {/* Client Component for Form */}
          <SellPropertyForm />
        </div>
      </div>
    </section>
  );
}
