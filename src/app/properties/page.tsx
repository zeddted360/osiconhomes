import { Metadata } from "next";
import PropertiesList from "@/components/PropertiesList";

// Mock data (in a real app, fetch this from an API or database)
const propertiesData = [
  {
    id: 1,
    name: "Luxury Apartment in Owerri",
    type: "Luxury Apartment",
    state: "Imo",
    city: "Owerri",
    image: "/property1.jpg",
    description: "A modern luxury apartment in the heart of Owerri.",
  },
  {
    id: 2,
    name: "Family Home in Port Harcourt",
    type: "Family Home",
    state: "Rivers",
    city: "Port Harcourt",
    image: "/property2.jpg",
    description: "A spacious family home with a garden in Port Harcourt.",
  },
  {
    id: 3,
    name: "Commercial Space in Obinze",
    type: "Commercial Space",
    state: "Imo",
    city: "Obinze",
    image: "/property3.jpg",
    description: "A commercial space perfect for businesses in Obinze.",
  },
  {
    id: 4,
    name: "Land for Development in Port Harcourt",
    type: "Land",
    state: "Rivers",
    city: "Port Harcourt",
    image: "/property1.jpg",
    description: "A large plot of land for development in Port Harcourt.",
  },
];

// SEO Metadata
export const metadata: Metadata = {
  title: "Properties | Osicon Homes",
  description:
    "Explore luxury properties in Port Harcourt & Owerri, Nigeria with Osicon Homes. Filter by property type, state, and city to find your dream home!",
  keywords: [
    "properties Port Harcourt",
    "luxury homes Owerri",
    "Osicon Homes properties",
    "real estate Nigeria",
    "commercial spaces Obinze",
  ],
  openGraph: {
    title: "Properties | Osicon Homes",
    description:
      "Explore properties in Port Harcourt & Owerri with Osicon Homes. Filter by type, state, and city!",
    url: "https://www.osiconhomes.com/properties",
    siteName: "Osicon Homes",
    images: [
      {
        url: "https://www.osiconhomes.com/og-image-properties.jpg",
        width: 1200,
        height: 630,
        alt: "Explore Properties with Osicon Homes",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Properties | Osicon Homes",
    description:
      "Explore properties in Port Harcourt & Owerri with Osicon Homes. Filter by type, state, and city!",
    images: ["https://www.osiconhomes.com/twitter-image-properties.jpg"],
    creator: "@OsiconHomes",
  },
  alternates: {
    canonical: "https://www.osiconhomes.com/properties",
  },
};

export default function Properties() {
  return (
    <section className="relative py-12 lg:py-16 bg-gradient-to-br from-gray-50 via-gray-100 to-amber-50 px-4">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center mb-4">
          Properties
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-8">
          Our Properties
        </h2>

        {/* Client Component for Filtering and Properties List */}
        <PropertiesList initialProperties={propertiesData} />
      </div>
    </section>
  );
}
