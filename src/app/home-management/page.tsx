"use client";

import Link from "next/link";
import {
  Home,
  Bed,
  Hotel,
  Building2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";

// Define types for the service object
interface Service {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  delay: string;
}

// Define type for mouse position
interface MousePosition {
  x: number;
  y: number;
}

export default function HomeManagement() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const services: Service[] = [
    {
      title: "Rent a House",
      description: "Find your perfect rental home",
      icon: Home,
      href: "/rent",
      delay: "0ms",
    },
    {
      title: "Short-Let Apartment",
      description: "Flexible stays for any duration",
      icon: Bed,
      href: "/short-let",
      delay: "100ms",
    },
    {
      title: "Book a Hotel",
      description: "Luxury accommodations await",
      icon: Hotel,
      href: "/hotel",
      delay: "200ms",
    },
    {
      title: "Buy a Property",
      description: "Invest in your future home",
      icon: Building2,
      href: "/buy",
      delay: "300ms",
    },
  ];

  return (
    <section className="relative min-h-screen md:pt-10 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/15 to-red-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-gradient-to-r from-transparent via-amber-500/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-30 animate-float"
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Text */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Sparkles className="w-8 h-8 text-amber-400 animate-bounce" />
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight">
                <span className="block text-white mb-2 drop-shadow-2xl">
                  Discover Your
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 animate-gradient-x">
                  Dream Space
                </span>
              </h1>
            </div>

            <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              Transform your living experience with our curated collection of
              premium properties, from cozy rentals to luxury investments.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-4xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className={`group relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl hover:border-amber-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20 animate-slide-up`}
                  style={{ animationDelay: service.delay }}
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-orange-500/0 to-red-500/0 group-hover:from-amber-400/10 group-hover:via-orange-500/10 group-hover:to-red-500/10 rounded-2xl transition-all duration-500"></div>

                  {/* Card Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl shadow-lg group-hover:shadow-amber-400/30 transition-all duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 transition-all duration-300 group-hover:translate-x-1" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Subtle Border Animation */}
                  <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ padding: "1px" }}
                  >
                    <div className="w-full h-full bg-slate-800/90 rounded-2xl"></div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div
            className={`mt-16 transition-all duration-1000 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-slate-400 text-lg">
              Ready to find your perfect match?
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 font-semibold ml-2">
                Start exploring today.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out both;
        }
      `}</style>
    </section>
  );
}
