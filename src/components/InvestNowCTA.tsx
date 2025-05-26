"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Animation variants for the button
const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

const InvestNowCTA = () => {
  return (
    <motion.section
      className="relative bg-gradient-to-r from-amber-500 to-orange-600 text-white py-16 px-6 rounded-xl shadow-lg overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Overlay with Subtle Pattern */}
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Start Your Investment Journey Today
        </h2>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Join thousands of investors growing their wealth with Osicon
          Investments. Secure, transparent, and rewarding opportunities await
          you.
        </p>

        {/* Invest Now Button */}
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Link
            href="/invest"
            className="inline-block bg-white text-amber-600 px-8 py-4 rounded-full text-lg font-semibold shadow-md hover:shadow-xl hover:bg-gray-100 transition-colors duration-300"
            aria-label="Invest now with Osicon Investments"
          >
            Invest Now
          </Link>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-amber-400/30 rounded-full -translate-x-16 -translate-y-16" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-400/30 rounded-full translate-x-20 translate-y-20" />
    </motion.section>
  );
};

export default InvestNowCTA;
