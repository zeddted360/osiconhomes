"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Info,
  Building,
  Settings,
  HelpCircle,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: Info, label: "About", href: "#about" },
    { icon: Building, label: "Property", href: "/property" },
    { icon: Settings, label: "Service", href: "#service" },
    { icon: Settings, label: "Contact", href: "#contact" },
    { icon: HelpCircle, label: "FAQs", href: "#faqs" },
  ];

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-amber-100"
            : "bg-gradient-to-r from-amber-50/80 via-orange-50/70 to-amber-50/80 backdrop-blur-sm"
        }`}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-orange-400/3 to-amber-400/5 pointer-events-none" />

        <div className="relative flex items-center justify-between p-4 lg:px-12 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div
                className={`w-12 h-12 rounded-xl shadow-lg transform transition-all duration-300 ${
                  isScrolled ? "rotate-0 scale-95" : "rotate-3 scale-100"
                } group-hover:rotate-6 group-hover:scale-105`}
              >
                <div className="w-full h-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-xl border border-amber-400/30 p-1">
                  <img
                    width="100"
                    height="100"
                    src="/logo.ico"
                    alt="Osicon Homes"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-md animate-pulse"></div>
            </div>

            {/* Brand Name - Hidden on small screens when scrolled */}
            <div
              className={`transition-all duration-300 ${
                isScrolled ? "hidden sm:block" : "block"
              }`}
            >
              <h1
                className={`font-bold transition-all duration-300 ${
                  isScrolled ? "text-gray-900 text-lg" : "text-gray-800 text-xl"
                }`}
              >
                OSICON HOMES
              </h1>
              <p
                className={`text-amber-700 text-xs font-medium transition-all duration-300 ${
                  isScrolled ? "opacity-70" : "opacity-100"
                }`}
              >
                Real Estate Dreams
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`relative px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 group ${
                  isScrolled
                    ? "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                    : "text-gray-800 hover:text-amber-700 hover:bg-white/50"
                }`}
              >
                <item.icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="font-medium">{item.label}</span>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-300 group-hover:w-3/4"></div>
              </a>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                isScrolled
                  ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600"
                  : "bg-gradient-to-r from-amber-400/90 to-orange-500/90 text-white hover:from-amber-500 hover:to-orange-600"
              }`}
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`lg:hidden relative z-50 p-3 rounded-xl transition-all duration-300 ${
              isScrolled
                ? "bg-amber-50 border border-amber-200 hover:bg-amber-100"
                : "bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30"
            }`}
          >
            {isMenuOpen ? (
              <X
                className={`w-6 h-6 transition-colors duration-300 ${
                  isScrolled ? "text-gray-700" : "text-gray-800"
                }`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 transition-colors duration-300 ${
                  isScrolled ? "text-gray-700" : "text-gray-800"
                }`}
              />
            )}
          </button>
        </div>

        {/* Bottom border gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-20"></div>

      {/* Mobile Menu Placeholder - Replace with your MobileMenu component */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleMenu}
          ></div>
          <div className="fixed top-20 left-4 right-4 bg-white rounded-2xl shadow-2xl border border-amber-100 p-6">
            <nav className="space-y-4">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={toggleMenu}
                  className="flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
              <div className="pt-4 border-t border-amber-100">
                <a
                  href="#contact"
                  onClick={toggleMenu}
                  className="block w-full px-4 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-center rounded-xl font-semibold hover:from-amber-500 hover:to-orange-600 transition-all duration-200"
                >
                  Get Started
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
