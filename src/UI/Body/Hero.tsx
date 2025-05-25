import { Calendar } from 'lucide-react';
import React from 'react';
import Image from 'next/image'; 

const Hero = () => {
  return (
    <section className="relative z-10 flex items-center min-h-screen px-6 lg:px-12">
      {/* Background Image */}
      <Image
        src="/Real_estate_Hero.jpg" 
        alt="Real Estate Hero Background"
        fill 
        style={{ objectFit: 'cover' }} 
        className="absolute inset-0 z-0" 
        quality={100} 
        priority
      />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 z-1"></div>

      <div className="relative max-w-7xl mx-auto w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 text-sm font-medium">
                  Now Available
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-white block">Making Your</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 block animate-pulse">
                  Real Estate
                </span>
                <span className="text-white block">Dreams A Reality</span>
              </h1>

              <p className="text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl">
                Explore our range of beautiful properties with the addition of
                separate accommodation suitable for you.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-3">
                  <Calendar className="w-5 h-5" />
                  <span className="text-lg">Book Inspection</span>
                </div>
              </button>

              <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <span className="text-lg">View Properties</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-white">
                  500+
                </div>
                <div className="text-white/70 text-sm">Properties Sold</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-white">
                  15+
                </div>
                <div className="text-white/70 text-sm">Years Experience</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-white">
                  98%
                </div>
                <div className="text-white/70 text-sm">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 via-orange-500/30 to-red-500/30"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Luxury Villa Estate
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    4 beds • 3 baths • 2,500 sq ft
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-800">
                      $850,000
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl shadow-xl animate-bounce delay-1000"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl shadow-xl animate-bounce delay-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;