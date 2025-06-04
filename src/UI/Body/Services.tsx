"use client";
import React, { useState } from "react";
import {
  Building,
  TrendingUp,
  Users,
  Settings,
  Home,
  ArrowRight,
  Shield,
  Clock,
  Award,
  ChevronDown,
  LucideProps,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SubService {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  features: string[];
}

interface Service {
  id: number;
  title: string;
  description: string;
  subServices: SubService[];
}

interface SubServiceCardProps {
  subService: SubService;
}

const ServicesSection: React.FC = () => {
  const services: Service[] = [
    {
      id: 1,
      title: "Real Estate",
      description:
        "We provide comprehensive real estate solutions to help you invest, consult, and manage properties effectively.",
      subServices: [
        {
          id: 1,
          title: "Real Estate Investment",
          description:
            "We understand that real estate investment can be a complex and challenging process, and that's where we come in. Our experts have the knowledge and experience to thoroughly analyze market trends, evaluate potential risks and returns, and make strategic investment decisions.",
          image: "/investment.avif",
          icon: TrendingUp,
          features: [
            "Portfolio Analysis",
            "Market Research",
            "ROI Optimization",
            "Risk Assessment",
          ],
        },
        {
          id: 2,
          title: "Real Estate Consultancy",
          description:
            "Personalized guidance through market analysis, property valuation, and strategic planning for your real estate journey.",
          image: "/consultancy.jpeg",
          icon: Users,
          features: [
            "Expert Advice",
            "Market Analysis",
            "Property Valuation",
            "Investment Strategy",
          ],
        },
        {
          id: 3,
          title: "Real Estate Management",
          description:
            "Our real estate management services include property maintenance, rental collection, tenant screening and selection, lease administration, and financial management. We are committed to ensuring that your properties are well-maintained, generating maximum returns, and attracting high-quality tenants.",
          image: "/management.jpeg",
          icon: Settings,
          features: [
            "Property Maintenance",
            "Tenant Management",
            "Rental Collection",
            "24/7 Support",
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Construction",
      description:
        "Our construction services are designed to deliver high-quality, sustainable, and innovative building solutions tailored to your needs.",
      subServices: [
        {
          id: 1,
          title: "Property Development",
          description:
            "Our team of experienced professionals will work with you to create a personalized plan that meets your unique needs and budget. We are dedicated to ensuring that your properties are built to the highest standards of quality and sustainability. We are confident that our innovative designs and attention to detail will provide you with the best value for your investment.",
          image: "/development.avif",
          icon: Home,
          features: [
            "Custom Homes",
            "Renovations",
            "Extensions",
            "Interior Design",
          ],
        },
        {
          id: 2,
          title: "Quantity Surveying",
          description:
            "Our professional services include providing cost estimates, quantity takeoff, bill of quantity preparation and cost control. Our focus is on providing comprehensive solutions for all your construction needs. With our quantity surveying services, we are poised to support your project from conception to completion.",
          image: "/survey.jpeg",
          icon: Building,
          features: [
            "Office Buildings",
            "Retail Spaces",
            "Warehouses",
            "Mixed-Use Developments",
          ],
        },
        {
          id: 3,
          title: "Building Construction",
          description:
            "We offer high-quality services to ensure that our clients receive top-notch construction works that meet their needs. We strive to provide professional and timely service to all customers, and we are committed to delivering excellence in every project we undertake.",
          image: "/building-construction.jpeg",
          icon: Shield,
          features: [
            "Timeline Management",
            "Budget Control",
            "Quality Assurance",
            "Safety Compliance",
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Home Management",
      description:
        "We offer personalized home management and interior design services to ensure your home is functional, beautiful, and well-maintained.",
      subServices: [
        {
          id: 1,
          title: "Home Service",
          description:
            "Personalized home management solutions including maintenance, financial oversight, and security services.",
          image: "/working-housing.png",
          icon: Home,
          features: [
            "Property Maintenance",
            "Financial Management",
            "Security Services",
            "24/7 Support",
          ],
        },
        {
          id: 2,
          title: "Interior Design",
          description:
            "Our team of experienced designers is passionate about creating beautiful and functional spaces that reflect your unique style and personality. From concept to execution, we are committed to delivering exceptional design solutions that transform your home into a comfortable and inviting environment.",
          image: "/Interior_design.jpg",
          icon: Building,
          features: [
            "Space Planning",
            "Custom Designs",
            "Furniture Selection",
            "Color Consultation",
          ],
        },
      ],
    },
  ];

  // SubServiceCard component for rendering sub-services
  const SubServiceCard: React.FC<SubServiceCardProps> = React.memo(
    ({ subService }) => (
      <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
        {/* Image section */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={subService.image}
            alt={subService.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-3xl transition-transform duration-500 group-hover:scale-105"
            quality={85}
            priority={subService.id === 1}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>

        {/* Content section */}
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <subService.icon className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors duration-300">
              {subService.title}
            </h4>
          </div>
          <div className="text-gray-600 text-sm leading-relaxed">
            <p>{subService.description}</p>
          </div>
          <div className="space-y-2">
            {subService.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    )
  );

  return (
    <section
      id="services"
      className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-amber-50"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-32 w-96 h-96 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 -left-32 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 space-y-20">
        {/* Section Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-500/20 border border-amber-400/30">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">
              Our Services
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            What We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Offer
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive real estate, construction, and home management
            solutions tailored to your needs.
          </p>
        </div>

        {/* Main Services with Expandable Sub-Services */}
        {services.map((service) => {
          const [isExpanded, setIsExpanded] = useState(false);

          const toggleExpand = () => {
            setIsExpanded((prev) => !prev);
          };

          return (
            <div key={service.id} className="space-y-8">
              {/* Service Header */}
              <div className="flex items-center space-x-4">
                <h3 className="text-3xl font-bold text-gray-900">
                  {service.title}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
              </div>

              {/* Service Description */}
              <div className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                <p>{service.description}</p>
              </div>

              {/* Read More Button */}
              <button
                aria-label={
                  isExpanded
                    ? `Collapse ${service.title} sub-services`
                    : `Expand ${service.title} sub-services`
                }
                aria-expanded={isExpanded}
                onClick={toggleExpand}
                className="group/btn relative flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl shadow-md hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <span className="relative">
                  {isExpanded ? "Read Less" : "Read More"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 relative transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Sub-Services (Expandable) */}
              <div
                className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ease-in-out ${
                  isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                {service.subServices.map((subService) => (
                  <SubServiceCard key={subService.id} subService={subService} />
                ))}
              </div>
            </div>
          );
        })}

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-center">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">250+</div>
              <div className="text-gray-300 text-sm">Projects Completed</div>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-gray-300 text-sm">Happy Clients</div>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">5+</div>
              <div className="text-gray-300 text-sm">Years Experience</div>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-gray-300 text-sm">Support Available</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6 bg-white rounded-3xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900">
            Ready to Start Your Project?
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Contact our expert team today to turn your real estate dreams into
            reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-started"
              aria-label="Get started with your project"
              className="group relative px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
            <Link
              href="/learn-more"
              aria-label="Learn more about our services"
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;