import React from "react";
import {
  ArrowRight,
  Building,
  Home,
  TrendingUp,
  LucideProps,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ServiceOverview {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  linkText: string;
}

const LearnMorePage: React.FC = () => {
  const serviceOverviews: ServiceOverview[] = [
    {
      id: 1,
      title: "Real Estate Services",
      description:
        "From investment opportunities to property management, our real estate services are designed to maximize value and ensure seamless operations. Explore our comprehensive solutions tailored to your needs.",
      image: "/real-estate-overview.jpeg",
      icon: TrendingUp,
      linkText: "Explore Real Estate",
    },
    {
      id: 2,
      title: "Construction Services",
      description:
        "We deliver high-quality construction projects, from custom homes to commercial developments, with a focus on sustainability, innovation, and client satisfaction.",
      image: "/construction-overview.jpeg",
      icon: Building,
      linkText: "Discover Construction",
    },
    {
      id: 3,
      title: "Home Management",
      description:
        "Our home management services provide personalized solutions for maintenance, security, and interior design, ensuring your home is both functional and beautiful.",
      image: "/home-management-overview.jpeg",
      icon: Home,
      linkText: "Learn About Home Management",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-amber-50 min-h-screen">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-32 w-96 h-96 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 -left-32 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 space-y-20">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-500/20 border border-amber-400/30">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">
              Learn More
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Discover Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Services
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dive deeper into our comprehensive offerings in real estate,
            construction, and home management. Learn how we can transform your
            vision into reality.
          </p>
        </div>

        {/* Service Overviews */}
        <div className="space-y-12">
          {serviceOverviews.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Image Section */}
                <div className="relative h-80 md:h-auto overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-3xl md:rounded-l-3xl transition-transform duration-500 group-hover:scale-105"
                    quality={85}
                    priority={service.id === 1}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>
                {/* Content Section */}
                <div className="p-8 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors duration-300">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6 bg-white rounded-3xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900">
            Ready to Take the Next Step?
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Contact our team to discuss how we can bring your project to life
            with our expert services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started"
              aria-label="Get started with your project"
              className="group relative px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnMorePage;
