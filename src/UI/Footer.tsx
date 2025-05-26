import Subscribe from "@/components/Subscribe";
import {
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  Instagram,
  Youtube,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const socialMedia = [
    {
      name: "Instagram",
      icon: Instagram,
      color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500",
      href: "https://www.instagram.com/osiconhomes",
    },
    {
      name: "TikTok",
      icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      ),
      color: "hover:bg-gradient-to-r hover:from-black hover:to-gray-800",
      href: "https://www.tiktok.com/@osiconhomes",
    },
    {
      name: "Facebook",
      icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      color: "hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700",
      href: "https://www.facebook.com/OSICONHOMESLTD?mibextid=ZbWKwL",
    },
    {
      name: "YouTube",
      icon: Youtube,
      color: "hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700",
      href: "https://www.youtube.com/@osiconhomes",
    },
  ];

  const services = [
    "About us",
    "Investment Properties",
    "Property Management",
    "Real Estate Consulting",
    "Careers",
    "Terms & Conditions",
    "Privacy Policy",
  ];

  return (
    <footer className="relative w-full bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-amber-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-orange-500/8 to-amber-400/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-amber-300/8 to-orange-400/8 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(251,191,36,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section - Enhanced */}
          <div className="lg:col-span-5 space-y-8">
            <div className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative p-3 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-2xl border border-amber-400/30 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">O</span>
                  </div>
                  <div className="absolute -top-1 -right-1">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    OSICON HOMES
                  </h3>
                  <p className="text-amber-300 text-sm font-medium mt-1">
                    Making Your Real Estate Dreams A Reality
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              Transform your property aspirations into reality with Nigeria's
              premier real estate partner. We deliver excellence through
              innovation, integrity, and unmatched service.
            </p>

            {/* Enhanced Newsletter */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Stay In The Loop
                </h4>
                <p className="text-gray-400">
                  Get exclusive access to premium properties and market
                  insights.
                </p>
              </div>
              {/* subscribe */}
              <Subscribe />
            </div>
          </div>

          {/* Services Section - Redesigned */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-xl font-bold text-white relative">
              <span className="relative z-10">Our Services</span>
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
            </h4>
            <ul className="space-y-4">
              {services.map((item, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-amber-400 transition-all duration-300 text-sm flex items-center group hover:translate-x-2"
                  >
                    <ArrowRight className="w-3 h-3 mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social Section - Enhanced */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-xl font-bold text-white relative">
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
            </h4>

            {/* Contact Info */}
            <div className="space-y-4">
              <Link
                href="mailto:info@osiconhomes.com"
                className="flex items-center space-x-3 text-gray-300 hover:text-amber-400 transition-colors duration-300 group"
              >
                <div className="p-2 bg-amber-400/10 rounded-lg group-hover:bg-amber-400/20 transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@osiconhomes.com</span>
              </Link>
              <Link
                href="tel:+2349132502360"
                className="flex items-center space-x-3 text-gray-300 hover:text-amber-400 transition-colors duration-300 group"
              >
                <div className="p-2 bg-amber-400/10 rounded-lg group-hover:bg-amber-400/20 transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+234 913 250 2360</span>
              </Link>
            </div>

            {/* Social Media - Enhanced */}
            <div className="space-y-6">
              <h5 className="text-lg font-semibold text-white">
                Follow Our Journey
              </h5>
              <div className="grid grid-cols-2 gap-4">
                {socialMedia.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative p-4 bg-white/5 border border-gray-700 rounded-2xl text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-sm hover:border-amber-400/50 ${social.color} overflow-hidden`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="group-hover:scale-110 transition-transform duration-300 relative z-10">
                          <IconComponent />
                        </div>
                        <span className="text-sm font-medium relative z-10">
                          {social.name}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 to-orange-500/0 group-hover:from-amber-400/10 group-hover:to-orange-500/10 transition-all duration-300" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Enhanced */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-6">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Osicon Homes. All Rights Reserved.
              </p>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse hidden lg:block" />
              <p className="text-gray-500 text-sm">
                Crafted with excellence in Nigeria
              </p>
            </div>

            <div className="flex items-center space-x-8">
              <Link
                href="#"
                className="text-gray-500 hover:text-amber-400 text-sm transition-colors duration-300 relative group"
              >
                Privacy Policy
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-amber-400 text-sm transition-colors duration-300 relative group"
              >
                Terms of Service
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-amber-400 text-sm transition-colors duration-300 relative group"
              >
                Sitemap
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
