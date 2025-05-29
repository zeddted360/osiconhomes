import { Metadata } from "next";
import Image from "next/image";
import SignUpForm from "@/components/BdeForm";

// SEO Metadata
export const metadata: Metadata = {
  title: "Sign Up | Osicon Homes",
  description:
    "Create an account with Osicon Homes to explore luxury properties in Port Harcourt & Owerri, Nigeria. Sign up now to book inspections and view homes!",
  keywords: [
    "sign up Osicon Homes",
    "create account real estate Nigeria",
    "Port Harcourt property sign up",
    "Owerri luxury homes account",
  ],
  openGraph: {
    title: "Sign Up | Osicon Homes",
    description:
      "Join Osicon Homes to explore properties in Port Harcourt & Owerri. Sign up today!",
    url: "https://www.osiconhomes.com/sign-up",
    siteName: "Osicon Homes",
    images: [
      {
        url: "https://www.osiconhomes.com/og-image-signup.jpg",
        width: 1200,
        height: 630,
        alt: "Sign Up with Osicon Homes",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up | Osicon Homes",
    description:
      "Join Osicon Homes to explore properties in Port Harcourt & Owerri. Sign up today!",
    images: ["https://www.osiconhomes.com/twitter-image-signup.jpg"],
    creator: "@OsiconHomes",
  },
  alternates: {
    canonical: "https://www.osiconhomes.com/sign-up",
  },
};

export default function SignUp() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-amber-50 px-4 py-12 lg:py-16 overflow-hidden"
      aria-labelledby="sign-up-heading"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-amber-200/50">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/OSICON_LOGO.png"
              alt="Osicon Homes Logo"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
          </div>

          {/* Header */}
          <h2
            id="sign-up-heading"
            className="text-xl sm:text-4xl font-bold text-gray-900 text-center mb-4"
            role="heading"
            aria-level={2}
          >
           Business Development Executive (BDE)
          </h2>

          {/* Client Component for Form */}
          <SignUpForm />
        </div>
      </div>
    </section>
  );
}
