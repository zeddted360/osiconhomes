import { Building, HelpCircle, Home, Settings } from "lucide-react";
import React from "react";
import Image from "next/image"; 
import Link from "next/link";

export default function About() {
  return (
    <div id="about">
      {/* About Us Section */}
      <section
        id="about"
        className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 py-20"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 -left-32 w-96 h-96 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="relative order-1 lg:order-1">
              <div className="relative group">
                {/* Main image container */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src="/real-estate-consultancy.png"
                    alt="Osicon Homes Real Estate Consultancy"
                    width={500}
                    height={625}
                    style={{ objectFit: "cover" }}
                    className="w-full h-auto"
                    quality={85}
                    priority
                  />
                  {/* Subtle overlay for polish */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>

                {/* Floating stats cards */}
                <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">15+</div>
                    <div className="text-gray-600 text-sm">Years</div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-2xl p-4 shadow-xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <div className="text-center">
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm opacity-90">Projects</div>
                  </div>
                </div>

                {/* Decorative dots */}
                <div className="absolute top-1/4 -left-4 grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 100}ms` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-8 order-2 lg:order-2">
              {/* Section label */}
              <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-500/20 border border-amber-400/30">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">
                  About Us
                </span>
              </div>

              {/* Main heading */}
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                  Your Home is Our{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
                    Priority
                  </span>
                </h2>
              </div>

              {/* Description */}
              <div className="space-y-6">
                <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                  Osicon Homes is a leading real estate firm specializing in
                  construction, property sales, and home management. We provide
                  end-to-end solutions, ensuring your real estate journey is
                  seamless and tailored to your needs.
                </p>

                {/* Feature highlights */}
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {[
                    {
                      icon: Building,
                      title: "Construction",
                      desc: "Expert building services",
                    },
                    {
                      icon: Home,
                      title: "Property Sales",
                      desc: "Premium home listings",
                    },
                    {
                      icon: Settings,
                      title: "Home Management",
                      desc: "Complete property care",
                    },
                    {
                      icon: HelpCircle,
                      title: "Consultation",
                      desc: "Professional guidance",
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-100 hover:bg-white/90 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="p-3 rounded-lg bg-gradient-to-br from-amber-400/20 to-orange-500/20 group-hover:from-amber-400/30 group-hover:to-orange-500/30 transition-all duration-300">
                        <feature.icon className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <Link
                  href="/sign-up"
                  aria-label="Join Osicon Homes"
                  className="group inline-block relative px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center space-x-3">
                    <span className="text-lg">Join Us</span>
                    <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full transform group-hover:translate-x-1 transition-transform duration-300"></div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Company stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-gray-800">98%</div>
                  <div className="text-gray-600 text-sm">Success Rate</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-gray-800">24/7</div>
                  <div className="text-gray-600 text-sm">Support</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-gray-800">100+</div>
                  <div className="text-gray-600 text-sm">Team Members</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
