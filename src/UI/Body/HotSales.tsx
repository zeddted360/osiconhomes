"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const HotSales = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-32 w-96 h-96 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 -left-32 w-96 h-96 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-amber-100/20 via-orange-100/20 to-yellow-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
        {/* Hot Sales Badge */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-500/20 border border-amber-400/30">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">
              Hot Sales
            </span>
          </div>
        </div>

        <div className="space-y-12">
          {/* Best Recommendation Section */}
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Best{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                recommendation
              </span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              Discover our exclusive selection of the finest one-of-a-kind
              luxury properties architectural masterpieces.
            </p>
            <button className="group relative px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-2">
                <span>Learn More</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          </div>

          {/* Side-by-Side Keys Image and Property Worth Section */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Keys Image Container */}
            <div className="relative h-80 lg:h-80 md:h-64 sm:h-56">
              <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 h-full">
                <div className="relative h-full overflow-hidden">
                  <Image
                    src="/photo-key.avif"
                    alt="Key"
                    fill
                    className="object-cover rounded-t-3xl"
                    priority
                  />
                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-amber-400 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-6 left-6 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>

            {/* Sell To Us Section */}
            <div className="relative h-80 lg:h-80 md:h-64 sm:h-56 bg-white rounded-3xl shadow-xl flex flex-col">
              <div className="flex-1 p-6">
                <div className="mb-4">
                  <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-500/20 border border-amber-400/30">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    <span className="text-amber-700 font-semibold text-xs uppercase tracking-wider">
                      Sell To Us
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  How much is your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                    property worth
                  </span>{" "}
                  now?
                </h2>

                <p className="text-gray-600 leading-relaxed text-sm">
                  Choose us for a hassle-free property selling experience. Our
                  expert team will showcase your property on our website and
                  social media platforms, reaching a wider audience and ensuring
                  a quicker transaction. Sell with confidence.
                </p>
              </div>
            </div>
          </div>

          {/* Sell to Us Button */}
          <button className="group relative w-full lg:w-1/2 px-6 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative">Sell to us</span>
          </button>
        </div>

        <div className="partnarship_offers flex py-8 justify-between">
          <div>
            <h1 className="text-xl font-bold capitalize">partnership Offers</h1>
            <span className="text-base text-gray-500">
              OSICON HOMES Ltd Partnership offers the following packages
            </span>
          </div>

          <button className="group relative px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative">Invest Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotSales;
