"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    image: "/photo-testimony.avif",
    testimony: "Great experience buying my first home with this company!",
    name: "Nweke Sarah",
    role: "First-Time Homeowner",
  },
  {
    id: 2,
    image: "/photo-tetimony-2.avif", 
    testimony:
      "Professional and reliable real estate agents who know the market inside out. I found my dream home with their help.",
    name: "Nwibo Azubuike",
    role: "Property Investor",
  },
  {
    id: 3,
    image: "/photo-testimony-3.avif",
    testimony:
      "Impressed with the level of expertise and professionalism displayed by the team!",
    name: "John Udochukwu",
    role: "Homeowner",
  },
];

const Testimonials = () => {
  return (
    <section
      className="relative w-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 py-12 lg:py-16 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-3 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Testimonials Heading */}
        <div className="mb-8 lg:mb-12 text-center">
          <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400/30 to-orange-500/30 border border-amber-400/40">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-800 font-semibold text-sm uppercase tracking-wider">
              Testimonials
            </span>
          </div>
          <h2
            id="testimonials-heading"
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight"
          >
            What Our Clients Say
          </h2>
          <p className="mt-2 text-gray-700 text-base sm:text-lg max-w-2xl mx-auto">
            Hear from our satisfied clients about their experiences with our
            team.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 snap-x snap-mandatory overflow-x-auto sm:overflow-x-visible scrollbar-hide relative">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:border-amber-300 transition-all duration-300 snap-center min-w-[300px] sm:min-w-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              role="article"
              aria-labelledby={`testimonial-${testimonial.id}`}
            >
              <div className="p-6 flex flex-col items-center text-center relative">
                {/* Opening Quote SVG */}
                <span
                  className="absolute top-3 left-3 transform rotate-[-10deg] text-amber-400 opacity-60"
                  aria-hidden="true"
                >
                  <svg
                    width="32"
                    height="24"
                    viewBox="0 0 32 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 24V15C0 11.5 0.8 8.5 2.4 6C4 3.5 6.8 1 10 0L14 3C12.2 4.5 10.8 6.2 9.8 8C8.8 9.8 8.2 11.7 8 13.5H14V24H0ZM18 24V15C18 11.5 18.8 8.5 20.4 6C22 3.5 24.8 1 28 0L32 3C30.2 4.5 28.8 6.2 27.8 8C26.8 9.8 26.2 11.7 26 13.5H32V24H18Z"
                      fill="#FBBF24"
                    />
                  </svg>
                </span>
                {/* Client Image */}
                <div className="relative w-20 h-20 mb-4">
                  <Image
                    src={testimonial.image}
                    alt={`Photo of ${testimonial.name}, ${testimonial.role}`}
                    fill
                    className="object-cover rounded-full border-2 border-amber-200"
                  />
                </div>
                {/* Star Rating */}
                <div className="flex space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.27 9.397c-.784-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                    </svg>
                  ))}
                </div>
                {/* Client Testimony */}
                <p
                  id={`testimonial-${testimonial.id}`}
                  className="text-gray-800 text-sm sm:text-base leading-relaxed px-4"
                >
                  {testimonial.testimony}
                </p>
                {/* Client Name and Role */}
                <div className="mt-4">
                  <p className="text-gray-900 font-semibold text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-600 text-xs">{testimonial.role}</p>
                </div>
                {/* Closing Quote SVG */}
                <span
                  className="absolute bottom-3 right-3 transform rotate-[10deg] text-amber-400 opacity-60"
                  aria-hidden="true"
                >
                  <svg
                    width="32"
                    height="24"
                    viewBox="0 0 32 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transform scale-x-[-1]" // Flip for closing quote
                  >
                    <path
                      d="M0 24V15C0 11.5 0.8 8.5 2.4 6C4 3.5 6.8 1 10 0L14 3C12.2 4.5 10.8 6.2 9.8 8C8.8 9.8 8.2 11.7 8 13.5H14V24H0ZM18 24V15C18 11.5 18.8 8.5 20.4 6C22 3.5 24.8 1 28 0L32 3C30.2 4.5 28.8 6.2 27.8 8C26.8 9.8 26.2 11.7 26 13.5H32V24H18Z"
                      fill="#FBBF24"
                    />
                  </svg>
                </span>
              </div>
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-orange-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Carousel Navigation Dots (Mobile Only) */}
        <div className="flex justify-center mt-6 space-x-2 sm:hidden">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className="w-2 h-2 rounded-full bg-amber-400/50 hover:bg-amber-400 transition-colors duration-300"
              aria-label={`Go to testimonial ${index + 1}`}
              onClick={() =>
                document
                  .querySelector(`.snap-center:nth-child(${index + 1})`)
                  ?.scrollIntoView({ behavior: "smooth", inline: "center" })
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
