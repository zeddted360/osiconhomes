import { Metadata } from "next";
import PropertiesList from "@/components/PropertiesList";

// Expanded properties data with images from Pexels.com
const propertiesData = [
  {
    id: 1,
    name: "Luxury Apartment in Owerri",
    type: "Luxury Apartment",
    state: "Imo",
    city: "Owerri",
    image:
      "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "A modern luxury apartment in the heart of Owerri with stunning city views.",
  },
  {
    id: 2,
    name: "Family Home in Port Harcourt",
    type: "Family Home",
    state: "Rivers",
    city: "Port Harcourt",
    image:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "A spacious family home with a garden in a serene neighborhood of Port Harcourt.",
  },
  {
    id: 3,
    name: "Commercial Space in Abuja",
    type: "Commercial Space",
    state: "FCT",
    city: "Abuja",
    image:
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "A commercial space perfect for businesses in the bustling area of Obinze.",
  },
  {
    id: 4,
    name: "Land for Development in Port Harcourt",
    type: "Land",
    state: "Rivers",
    city: "Port Harcourt",
    image:
      "https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "A large plot of land ideal for development projects in Port Harcourt.",
  },
  {
    id: 5,
    name: "Beachfront Villa in Lagos",
    type: "Villa",
    state: "Lagos",
    city: "Lagos",
    image:
      "https://images.pexels.com/photos/3288102/pexels-photo-3288102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "A luxurious beachfront villa in Lagos with private access to the shore.",
  },
  {
    id: 6,
    name: "Duplex in Enugu",
    type: "Duplex",
    state: "Enugu",
    city: "Enugu",
    image:
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "A modern duplex in Enugu, perfect for families looking for space and comfort.",
  },
  {
    id: 7,
    name: "Office Space in Abuja",
    type: "Office Space",
    state: "FCT",
    city: "Abuja",
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "A modern office space in the business district of Abuja, ready for immediate use.",
  },
  {
    id: 8,
    name: "Penthouse in Ikeja",
    type: "Penthouse",
    state: "Lagos",
    city: "Ikeja",
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "A luxurious penthouse in Ikeja with panoramic views of the city.",
  },
  {
    id: 9,
    name: "Farmland in Ibadan",
    type: "Land",
    state: "Oyo",
    city: "Ibadan",
    image:
      "https://images.pexels.com/photos/1628086/pexels-photo-1628086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "A vast farmland in Ibadan, ideal for agricultural projects or investment.",
  },
  {
    id: 10,
    name: "Bungalow in Calabar",
    type: "Bungalow",
    state: "Cross River",
    city: "Calabar",
    image:
      "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "A cozy bungalow in Calabar, perfect for small families or retirees.",
  },
];

// SEO Metadata (unchanged)
export const metadata: Metadata = {
  title: "Properties | Osicon Homes",
  description:
    "Explore luxury properties in Port Harcourt, Owerri, Lagos, Abuja, and more with Osicon Homes. Filter by property type, state, and city to find your dream home!",
  keywords: [
    "properties Port Harcourt",
    "luxury homes Owerri",
    "Osicon Homes properties",
    "real estate Nigeria",
    "commercial spaces Obinze",
    "villas Lagos",
    "office spaces Abuja",
  ],
  openGraph: {
    title: "Properties | Osicon Homes",
    description:
      "Explore properties in Port Harcourt, Owerri, Lagos, Abuja, and more with Osicon Homes. Filter by type, state, and city!",
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
      "Explore properties in Port Harcourt, Owerri, Lagos, Abuja, and more with Osicon Homes. Filter by type, state, and city!",
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