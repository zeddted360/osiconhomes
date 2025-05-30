"use client";
import React, { useState, useEffect, MouseEvent } from "react";
import {
  Menu,
  X,
  Home,
  Info,
  Building,
  Settings,
  HelpCircle,
  UserPlus,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();


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
    { icon: Building, label: "Property", href: "/properties" },
    { icon: Settings, label: "Service", href: "#service" },
    { icon: Settings, label: "Contact", href: "#contact" },
    { icon: HelpCircle, label: "FAQs", href: "#faqs" },
  ];

  const handleClick = (
    e: MouseEvent<HTMLAnchorElement>,
    item: { href: string }
  ) => {
    e.preventDefault();
    const paths = [
      "/properties",
      "/bde-join",
      "/log-in",
      "/sign-up",
      "/learn-more",
      "/get-started"
    ];
    const isPathIncluded = paths.includes(pathname);

    if (item.href.startsWith("#")) {
      if (isPathIncluded) {
        const section = document.querySelector(item.href);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push(`/${item.href}`);
        }
      }
    } else {
      router.push(item.href);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/log-in");
    if (isMenuOpen) toggleMenu();
  };

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
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-orange-400/3 to-amber-400/5 pointer-events-none" />

        <div className="relative flex items-center justify-between p-4 lg:px-12 max-w-7xl mx-auto">
          {/* Logo (Unchanged) */}
          <Link
            href="/"
            className="flex items-center space-x-3"
            aria-label="Osicon Homes Homepage"
          >
            <div className="relative group">
              <div
                className={`w-12 h-12 rounded-xl shadow-lg transform transition-all duration-300 ${
                  isScrolled ? "rotate-0 scale-95" : "rotate-3 scale-100"
                } group-hover:rotate-6 group-hover:scale-105`}
              >
                <div className="w-full h-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-xl border border-amber-400/30 p-1 flex items-center justify-center">
                  <Image
                    src="/OSICON_LOGO.png"
                    alt="Logo"
                    fill
                    className="object-cover rounded-full"
                    priority
                    quality={100}
                    sizes="(max-width: 640px) 32px, (max-width: 768px) 48px, 64px"
                    loading="eager"
                  />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-md animate-pulse"></div>
            </div>

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
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {menuItems.map((item, index) => (
              <Link
                onClick={(e) => handleClick(e, item)}
                key={index}
                href={item.href}
                className={`relative px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 group text-sm font-medium ${
                  isScrolled
                    ? "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                    : "text-gray-800 hover:text-amber-700 hover:bg-white/50"
                } focus:outline-none focus:ring-2 focus:ring-amber-400`}
                aria-label={item.label}
              >
                <item.icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span>{item.label}</span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-300 group-hover:w-3/4"></div>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center space-x-3">
            {status === "loading" ? (
              <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
            ) : session?.user ? (
              <>
                <div
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                    isScrolled
                      ? "bg-amber-50 text-gray-700"
                      : "bg-white/20 text-gray-800"
                  }`}
                >
                  <User className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold text-sm truncate max-w-[120px]">
                    {session.user.username}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border shadow-sm hover:shadow-md ${
                    isScrolled
                      ? "text-gray-700 border-gray-300 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50"
                      : "text-gray-800 border-gray-400/50 hover:text-amber-700 hover:border-amber-400 hover:bg-white/50"
                  } focus:outline-none focus:ring-2 focus:ring-amber-400`}
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/log-in"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border shadow-sm hover:shadow-md ${
                    isScrolled
                      ? "text-gray-700 border-gray-300 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50"
                      : "text-gray-800 border-gray-400/50 hover:text-amber-700 hover:border-amber-400 hover:bg-white/50"
                  } focus:outline-none focus:ring-2 focus:ring-amber-400`}
                  aria-label="Sign In"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/sign-up"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                    isScrolled
                      ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600"
                      : "bg-gradient-to-r from-amber-400/90 to-orange-500/90 text-white hover:from-amber-500 hover:to-orange-600"
                  } focus:outline-none focus:ring-2 focus:ring-amber-400`}
                  aria-label="Join"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Join</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`lg:hidden relative z-50 p-2 rounded-xl transition-all duration-300 border shadow-sm ${
              isScrolled
                ? "bg-amber-50 border-amber-200 hover:bg-amber-100"
                : "bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30"
            } focus:outline-none focus:ring-2 focus:ring-amber-400`}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
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

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
      </header>

      <div className="h-20"></div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleMenu}
            aria-hidden="true"
          ></div>
          <div className="fixed top-20 left-4 right-4 bg-white rounded-2xl shadow-2xl border border-amber-100 overflow-hidden animate-slide-in">
            <div className="p-6">
              <nav className="space-y-3 mb-6">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={(e) => {
                      toggleMenu();
                      handleClick(e, item);
                    }}
                    className="flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200 group text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                    aria-label={item.label}
                  >
                    <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>

              <div className="border-t border-amber-100 pt-6 space-y-4">
                {status === "loading" ? (
                  <div className="w-full h-10 bg-gray-200 rounded animate-pulse mx-auto" />
                ) : session?.user ? (
                  <>
                    <div className="flex items-center justify-center space-x-2 px-3 py-2 bg-amber-50 rounded-full">
                      <User className="w-5 h-5 text-amber-600" />
                      <span className="font-semibold text-gray-700 text-sm truncate max-w-[200px]">
                        {session.user.username}
                      </span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center justify-center space-x-2 w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                      aria-label="Sign Out"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      onClick={() => toggleMenu()}
                      href="/log-in"
                      className="flex items-center justify-center space-x-2 w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                      aria-label="Sign In"
                    >
                      <LogIn className="w-5 h-5" />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      onClick={() => toggleMenu()}
                      href="/sign-up"
                      className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl text-sm font-semibold hover:from-amber-500 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                      aria-label="Join"
                    >
                      <UserPlus className="w-5 h-5" />
                      <span>Join Now</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inline CSS for Animation */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Header;
