"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Search } from "lucide-react";
import { useRouter } from "next/navigation";


const Custom404 = () => {
  const router = useRouter();

  const handleServiceNavigate = () => {
    router.push('/');
    setTimeout(() => {
      const serviceContainer = document.getElementById("services");
      console.log("the services is",serviceContainer);
      if (serviceContainer) {
        serviceContainer.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    },3000)
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-12 bg-gray-100">
      {/* Background Image */}
      <Image
        src="/Real_estate_Hero.jpg"
        alt="404 Background"
        fill
        style={{ objectFit: "cover" }}
        className="absolute inset-0 z-0 opacity-30"
        quality={100}
        priority
      />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-1"></div>

      <div className="relative z-10 text-center space-y-8 max-w-3xl mx-auto animate-fade-in">
        {/* 404 Graphic */}
        <div className="relative flex justify-center">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64">
            <Image
              src="/404.jpg"
              alt="404 House Illustration"
              fill
              style={{ objectFit: "contain" }}
              className="drop-shadow-lg animate-bounce"
            />
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-pulse">
              404
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-md">
            Oops! Page Not Found
          </h1>
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
            Looks like this page doesn’t exist on our map. Let’s find you a new
            dream home instead!
          </p>
        </div>

        {/* Back to Home Button */}
        <div>
          <Link
            href="/"
            className="group relative inline-flex items-center px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl shadow-md hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105 overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Return to Home"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-3">
              <Home className="w-5 h-5 shrink-0" />
              <span className="whitespace-nowrap">Back to Home</span>
            </div>
          </Link>
        </div>

        {/* Fun Suggestion */}
        <div className="text-white/80 text-sm">
          <p>
            Or explore our{" "}
            <span
              onClick={handleServiceNavigate}
              className="text-amber-400 cursor-pointer hover:text-amber-300 underline transition-colors duration-300"
            >
              services
            </span>{" "}
            to find what you’re looking for!
          </p>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl shadow-lg animate-float opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl shadow-lg animate-float delay-300 opacity-50"></div>

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
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Custom404;
