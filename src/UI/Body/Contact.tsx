import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import Link from "next/link";

const Contact = () => {
  return (
    <section id="contact" className="relative w-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 py-16 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-3 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map Section */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:border-amber-300 transition-all duration-300 overflow-hidden">
              <div className="aspect-w-16 aspect-h-12 h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2!2d7.0!3d5.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzAnMDAuMCJOIDfCsDAwJzAwLjAiRQ!5e0!3m2!1sen!2sng!4v1635000000000!5m2!1sen!2sng&q=Port+Harcourt+Owerri+Express+way+Beside+Federal+University+of+Technology+FUTO+Junction+Obinze+Owerri+Imo+State+Nigeria"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>

              {/* Map Overlay with Location Pin */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-md p-3 flex items-center space-x-2 border border-amber-200">
                <MapPin className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-semibold text-gray-900">
                  OSICON Homes
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400/30 to-orange-500/30 border border-amber-400/40 mb-4">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-amber-800 font-semibold text-sm uppercase tracking-wider">
                  Contact Us
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-2">
                Get In Touch
              </h2>
              <p className="text-gray-700 text-base">
                Reach out to us for all your real estate needs. We're here to
                help you every step of the way.
              </p>
            </div>

            {/* Head Office */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:border-amber-300 transition-all duration-300 p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-xl border border-amber-400/30">
                  <MapPin className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Head Office:
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Floor 1 BUTINGS ROYAL PLAZA, km 10, Port Harcourt – Owerri
                    Express way Beside Federal University of Technology (FUTO)
                    Junction, Obinze, Owerri, Imo State, Nigeria.
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:border-amber-300 transition-all duration-300 p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-xl border border-amber-400/30">
                  <Mail className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Email:
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="mailto:info@osiconhomes.com"
                      className="block text-amber-600 hover:text-amber-800 transition-colors duration-200 font-medium"
                    >
                      info@osiconhomes.com
                    </Link>
                    <Link
                      href="mailto:support@osiconhomes.com"
                      className="block text-amber-600 hover:text-amber-800 transition-colors duration-200 font-medium"
                    >
                      support@osiconhomes.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:border-amber-300 transition-all duration-300 p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-xl border border-amber-400/30">
                  <Phone className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Call:
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="tel:+2349048681289"
                      className="block text-amber-600 hover:text-amber-800 transition-colors duration-200 font-medium"
                    >
                      +234 9132502360
                    </Link>
                    <Link
                      href="tel:+2348074824989"
                      className="block text-amber-600 hover:text-amber-800 transition-colors duration-200 font-medium"
                    >
                      +234 7025786581
                    </Link>
                    <Link
                      href="tel:+2347049073432"
                      className="block text-amber-600 hover:text-amber-800 transition-colors duration-200 font-medium"
                    >
                      +234 7016720434
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:border-amber-300 transition-all duration-300 p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-xl border border-amber-400/30">
                  <svg
                    className="w-6 h-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Ready to Get Started?
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Contact us today to discuss your real estate needs. Our team
                    is ready to help you find your dream home.
                  </p>
                  <button className="bg-gradient-to-r from-amber-400/30 to-orange-500/30 border border-amber-400/40 text-amber-800 px-6 py-3 rounded-xl font-semibold hover:from-amber-400/40 hover:to-orange-500/40 transition-all duration-200">
                    Get in Touch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
