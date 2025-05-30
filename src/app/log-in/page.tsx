import  Login  from "@/components/Login";
import { Metadata } from "next";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

interface SearchParams {
  callbackUrl?: string;
  error?: string;
}
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

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }
  const SearchParams = await searchParams;

  return (
    <section aria-labelledby="sign-up-heading">
      <Login searchParams={SearchParams} />
    </section>
  );
}
