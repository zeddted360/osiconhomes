"use client"
import React, { useState,MouseEvent,FormEvent } from "react";
import { Instagram, Music, Facebook, Youtube, Send, Mail } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e:MouseEvent<HTMLButtonElement> | FormEvent) => {
    // e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <footer className="relative w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black py-16 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-xl border border-amber-400/30">
                <img src="/logo.ico" alt="Osicon Homes" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">OSICON HOMES</h3>
                <p className="text-amber-200 text-sm font-medium">
                  Making Your Real Estate Dreams A Reality
                </p>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">
                Subscribe to our newsletter
              </h4>
              <p className="text-gray-300 text-sm">
                Stay updated with our latest properties, investment
                opportunities, and real estate insights.
              </p>
              <div
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
                  />
                </div>
                <button
                  onClick={handleSubscribe}
                  className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-500 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white border-b border-amber-400/30 pb-2">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "About us",
                "Careers",
                "Terms & Conditions",
                "Privacy & Policy",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm hover:pl-2"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white border-b border-amber-400/30 pb-2">
              Social Media
            </h4>
            <div className="flex flex-wrap gap-4">
              {[
                {
                  icon: Instagram,
                  label: "Instagram",
                  color: "hover:bg-pink-500",
                },
                { icon: Music, label: "TikTok", color: "hover:bg-black" },
                {
                  icon: Facebook,
                  label: "Facebook",
                  color: "hover:bg-blue-600",
                },
                { icon: Youtube, label: "YouTube", color: "hover:bg-red-600" },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`p-3 bg-white/10 border border-gray-600 rounded-xl text-gray-300 hover:text-white transition-all duration-200 ${social.color} hover:border-transparent group`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </a>
              ))}
            </div>

            {/* Additional Contact Info */}
            <div className="pt-4 space-y-2">
              <p className="text-gray-300 text-sm">Connect with us:</p>
              <div className="space-y-1">
                <a
                  href="mailto:info@osiconhomes.com"
                  className="text-amber-400 hover:text-amber-300 text-sm block transition-colors duration-200"
                >
                  info@osiconhomes.com
                </a>
                <a
                  href="tel:+2349048681289"
                  className="text-amber-400 hover:text-amber-300 text-sm block transition-colors duration-200"
                >
                  +234 904 868 1289
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Osicon Homes. All Rights Reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-400/5 to-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-amber-400/5 to-orange-500/5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
};

export default Footer;
