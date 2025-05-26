"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import Link from "next/link";
import Image from "next/image";

// Form data type
type FormData = {
  name: string;
  email: string;
  address: string;
  phone: string;
  propertyType: string;
  propertyFrontView?: FileList;
  propertySideView: FileList;
  propertyBackView: FileList;
  priceRange: string;
  propertyLegalDocument?: FileList;
  comments?: string;
};

const SellPropertyFormV2 = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [priceRange, setPriceRange] = useState(5000000); // Default price range (5M NGN)
  const [frontViewPreview, setFrontViewPreview] = useState<string | null>(null);
  const [sideViewPreview, setSideViewPreview] = useState<string | null>(null);
  const [backViewPreview, setBackViewPreview] = useState<string | null>(null);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      propertyType: "",
      priceRange: "5000000",
      comments: "",
    },
  });

  // Watch form values to determine if inputs are filled
  const formValues = watch();

  // Handle file preview
  const handleFilePreview = (
    files: FileList | undefined,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    if (files && files[0]) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url); // Clean up
    }
  };

  // Handle form submission (open modal)
  const onSubmit = (data: FormData) => {
    setFormData(data);
    setShowModal(true);
  };

  // Confirm submission
  const confirmSubmission = () => {
    setIsLoading(true);
    setShowModal(false);
    // Simulate API call
    setTimeout(() => {
      console.log("Sell Property Form V2 Submitted", formData);
      setIsLoading(false);
      setIsSubmitted(true);
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <>
      {/* Confetti on successful submission */}
      {isSubmitted && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
        />
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Success Message */}
        {isSubmitted ? (
          <div className="text-center p-6 bg-amber-50 rounded-lg">
            <h3 className="text-2xl font-semibold text-amber-700 mb-2">
              Property Submission Successful!
            </h3>
            <p className="text-gray-600 mb-4">
              Thank you for submitting your property details to Osicon Homes.
              Our team will review your submission and contact you within 24
              hours.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors duration-300"
              aria-label="Return to Osicon Homes homepage"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Notice */}
              <p className="text-sm text-gray-500 text-center mb-4">
                The name, email, and photo associated with your account will be
                recorded when you upload files and submit this form.
              </p>

              {/* Name */}
              <div className="relative">
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    className="peer w-full pl-10 pt-5 pb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400">
                    👤
                  </span>
                  <label
                    htmlFor="name"
                    className={`absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all duration-300
                      ${
                        formValues.name || errors.name
                          ? "left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                          : ""
                      }
                      peer-focus:left-8 peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:px-1`}
                  >
                    Name
                  </label>
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    className="peer w-full pl-10 pt-5 pb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400">
                    ✉️
                  </span>
                  <label
                    htmlFor="email"
                    className={`absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all duration-300
                      ${
                        formValues.email || errors.email
                          ? "left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                          : ""
                      }
                      peer-focus:left-8 peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:px-1`}
                  >
                    Email
                  </label>
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="relative">
                <div className="relative">
                  <input
                    id="address"
                    type="text"
                    className="peer w-full pl-10 pt-5 pb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                    {...register("address", {
                      required: "Address is required",
                    })}
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400">
                    📍
                  </span>
                  <label
                    htmlFor="address"
                    className={`absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all duration-300
                      ${
                        formValues.address || errors.address
                          ? "left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                          : ""
                      }
                      peer-focus:left-8 peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:px-1`}
                  >
                    Address
                  </label>
                </div>
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="relative">
                <div className="relative">
                  <input
                    id="phone"
                    type="tel"
                    className="peer w-full pl-10 pt-5 pb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^\+?[1-9]\d{1,14}$/,
                        message: "Invalid phone number",
                      },
                    })}
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400">
                    📞
                  </span>
                  <label
                    htmlFor="phone"
                    className={`absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all duration-300
                      ${
                        formValues.phone || errors.phone
                          ? "left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                          : ""
                      }
                      peer-focus:left-8 peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:px-1`}
                  >
                    Phone number
                  </label>
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Property Type */}
              <div className="relative">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400">
                    🏠
                  </span>
                  <select
                    id="propertyType"
                    className="w-full pl-10 pt-2 pb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                    onChange={(e) =>
                      setValue("propertyType", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <option value="">Property Type</option>
                    <option value="Landed Property">Landed Property</option>
                    <option value="Rental Property">Rental Property</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="hidden"
                    {...register("propertyType", {
                      required: "Property type is required",
                    })}
                    value={watch("propertyType")}
                  />
                </div>
                {errors.propertyType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.propertyType.message}
                  </p>
                )}
              </div>

              {/* Property Front View (optional) - No Animation */}
              <div className="relative">
                <div className="relative">
                  <input
                    id="propertyFrontView"
                    type="file"
                    accept="image/*"
                    className="w-full pl-10 pt-5 pb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    {...register("propertyFrontView", {
                      onChange: (e) =>
                        handleFilePreview(e.target.files, setFrontViewPreview),
                    })}
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400">
                    📸
                  </span>
                  <label
                    htmlFor="propertyFrontView"
                    className="absolute left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                  >
                    Property Front View (optional)
                  </label>
                </div>
                {frontViewPreview && (
                  <div className="mt-2">
                    <Image
                      src={frontViewPreview}
                      alt="Front View Preview"
                      width={200}
                      height={150}
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Property Side View - No Animation */}
              <div className="relative">
                <div className="relative">
                  <input
                    id="propertySideView"
                    type="file"
                    accept="image/*"
                    className="w-full pl-10 pt-5 pb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    {...register("propertySideView", {
                      required: "Property side view is required",
                      onChange: (e) =>
                        handleFilePreview(e.target.files, setSideViewPreview),
                    })}
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400">
                    📸
                  </span>
                  <label
                    htmlFor="propertySideView"
                    className="absolute left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                  >
                    Property Side View
                  </label>
                </div>
                {errors.propertySideView && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.propertySideView.message}
                  </p>
                )}
                {sideViewPreview && (
                  <div className="mt-2">
                    <Image
                      src={sideViewPreview}
                      alt="Side View Preview"
                      width={200}
                      height={150}
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Property Back View - No Animation */}
              <div className="relative">
                <div className="relative">
                  <input
                    id="propertyBackView"
                    type="file"
                    accept="image/*"
                    className="w-full pl-10 pt-5 pb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    {...register("propertyBackView", {
                      required: "Property back view is required",
                      onChange: (e) =>
                        handleFilePreview(e.target.files, setBackViewPreview),
                    })}
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400">
                    📸
                  </span>
                  <label
                    htmlFor="propertyBackView"
                    className="absolute left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                  >
                    Property Back View
                  </label>
                </div>
                {errors.propertyBackView && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.propertyBackView.message}
                  </p>
                )}
                {backViewPreview && (
                  <div className="mt-2">
                    <Image
                      src={backViewPreview}
                      alt="Back View Preview"
                      width={200}
                      height={150}
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Price Range (Slider) */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range (NGN)
                </label>
                <input
                  type="range"
                  min={1000000}
                  max={100000000}
                  step={100000}
                  value={priceRange}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setPriceRange(value);
                    setValue("priceRange", value.toString(), {
                      shouldValidate: true,
                    });
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <input
                  type="hidden"
                  {...register("priceRange", {
                    required: "Price range is required",
                  })}
                />
                <p className="text-gray-600 mt-2">
                  Selected: ₦{priceRange.toLocaleString()}
                </p>
                {errors.priceRange && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.priceRange.message}
                  </p>
                )}
              </div>

              {/* Property Legal Document (optional) - No Animation */}
              <div className="relative">
                <div className="relative">
                  <input
                    id="propertyLegalDocument"
                    type="file"
                    className="w-full pl-10 pt-5 pb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    {...register("propertyLegalDocument")}
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400">
                    📜
                  </span>
                  <label
                    htmlFor="propertyLegalDocument"
                    className="absolute left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                  >
                    Property Legal Document (optional)
                  </label>
                </div>
              </div>

              {/* Comments */}
              <div className="relative">
                <div className="relative">
                  <textarea
                    id="comments"
                    className="peer w-full pl-10 pt-6 pb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                    rows={4}
                    {...register("comments")}
                  />
                  <span className="absolute left-3 top-5 text-amber-400">
                    💬
                  </span>
                  <label
                    htmlFor="comments"
                    className={`absolute left-10 top-5 text-gray-500 text-sm transition-all duration-300
                      ${
                        formValues.comments
                          ? "left-8 top-1 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                          : ""
                      }
                      peer-focus:left-8 peer-focus:top-1 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:px-1`}
                  >
                    Comments (optional)
                  </label>
                </div>
              </div>

              {/* Submit Button with Confirmation Modal */}
              <div className="relative">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all duration-300 disabled:opacity-50"
                  >
                    Submit
                  </button>
                </motion.div>

                {/* Custom Modal */}
                {showModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full animate-zoom-in">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Confirm Submission
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">
                        Are you sure you want to submit your property details?
                        Our team will review your submission and contact you
                        within 24 hours.
                      </p>
                      <div className="mt-4 flex justify-end space-x-2">
                        <button
                          type="button"
                          onClick={() => setShowModal(false)}
                          className="px-4 py-2 border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-50 transition-colors duration-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={confirmSubmission}
                          className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300 flex items-center"
                        >
                          {isLoading ? (
                            <>
                              <svg
                                className="animate-spin h-5 w-5 mr-2 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v8H4z"
                                />
                              </svg>
                              Submitting...
                            </>
                          ) : (
                            "Confirm"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Clear Form Link */}
              <p className="text-center text-gray-600">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setFrontViewPreview(null);
                    setSideViewPreview(null);
                    setBackViewPreview(null);
                    setPriceRange(5000000);
                  }}
                  className="text-amber-500 hover:text-amber-600 font-semibold"
                >
                  Clear form
                </button>
              </p>

              {/* Footer Notice */}
              <p className="text-center text-xs text-gray-500 mt-4">
                Never submit passwords through this form. This content is
                neither created nor endorsed by Osicon Homes.
              </p>
            </form>
          </>
        )}
      </motion.div>

      {/* Custom CSS for Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes zoom-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
        .animate-zoom-in {
          animation: zoom-in 0.3s ease-in-out;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: #f59e0b; /* amber-500 */
          border-radius: 50%;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #f59e0b; /* amber-500 */
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default SellPropertyFormV2;
