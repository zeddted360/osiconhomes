"use client";
import { Calendar, Eye, UserPlus } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Hero = () => {
  const { data: session } = useSession();

  return (
    <section className="relative z-10 flex items-center min-h-screen px-4 sm:px-6 lg:px-12">
      {/* Background Image */}
      <Image
        src="/Real_estate_Hero.jpg"
        alt="Real Estate Hero Background"
        fill
        style={{ objectFit: "cover" }}
        className="absolute inset-0 z-0"
        quality={100}
        priority
      />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-1"></div>

      <div className="relative max-w-7xl mx-auto w-full z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">
                  Now Available
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
                <span className="block drop-shadow-md">Making Your</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 drop-shadow-md">
                  Real Estate
                </span>
                <span className="block drop-shadow-md">Dreams A Reality</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-xl">
                Explore our range of beautiful properties with the addition of
                separate accommodation suitable for you.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-inspection"
                className="group relative px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl shadow-md hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105 overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-400"
                aria-label="Book Inspection"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Book Inspection</span>
                </div>
              </Link>
                <Link
                  href="/bde-join"
                  className="group relative px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl shadow-md hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105 overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-400"
                  aria-label="Become a BDE"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <UserPlus className="w-5 h-5" />
                    <span>Become a BDE</span>
                  </div>
                </Link>
              {session?.user &&
                <Link
                  href="/bde"
                  className="group relative px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl shadow-md hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105 overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-400"
                  aria-label="View BDE's"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>View BDE&apos;s</span>
                  </div>
                </Link>
              }
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  500+
                </div>
                <div className="text-white/80 text-xs sm:text-sm">
                  Properties Sold
                </div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  15+
                </div>
                <div className="text-white/80 text-xs sm:text-sm">
                  Years Experience
                </div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  98%
                </div>
                <div className="text-white/80 text-xs sm:text-sm">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-105">
              <Image
                src="/Real_estate_Hero.jpg"
                alt="Luxury Villa Estate"
                fill
                style={{ objectFit: "cover" }}
                className="absolute inset-0"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-orange-500/20 to-red-500/20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-lg rounded-xl p-5 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Luxury Villa Estate
                  </h3>
                  <p className="text-gray-700 text-sm mb-2">
                    4 beds • 3 baths • 2,500 sq ft
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      $850,000
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl shadow-lg animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl shadow-lg animate-float delay-300"></div>
          </div>
        </div>
      </div>

      {/* Inline CSS for Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
