"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Mail, Phone, Home, MessageSquare } from "lucide-react";

// Form data type
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const BookInspectionForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  // Watch form values to determine if inputs are filled
  const formValues = watch();

  // Handle form submission
  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Form Submitted", data);
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
              Inspection Scheduled!
            </h3>
            <p className="text-gray-600 mb-4">
              Thank you for booking with Osicon Homes. We’ll reach out to
              confirm your inspection details soon.
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <div className="relative">
                  <Input
                    id="firstName"
                    className="peer pl-10 pt-5 pb-2 border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-lg"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                  <label
                    htmlFor="firstName"
                    className={`absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all duration-300
                      ${
                        formValues.firstName || errors.firstName
                          ? "left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                          : ""
                      }
                      peer-focus:left-8 peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:px-1`}
                  >
                    First Name
                  </label>
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <div className="relative">
                  <Input
                    id="lastName"
                    className="peer pl-10 pt-5 pb-2 border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-lg"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                  <label
                    htmlFor="lastName"
                    className={`absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all duration-300
                      ${
                        formValues.lastName || errors.lastName
                          ? "left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                          : ""
                      }
                      peer-focus:left-8 peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:px-1`}
                  >
                    Last Name
                  </label>
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  className="peer pl-10 pt-5 pb-2 border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-lg"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
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
                  Email Address
                </label>
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="relative">
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  className="peer pl-10 pt-5 pb-2 border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-lg"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+?[1-9]\d{1,14}$/,
                      message: "Invalid phone number",
                    },
                  })}
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
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
                  Phone Number
                </label>
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Service/Property Selection */}
            <div className="relative">
              <label
                htmlFor="service"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Property of Interest
              </label>
              <div className="relative">
                <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400 z-10" />
                <Select
                  onValueChange={(val) =>
                    setValue("service", val, { shouldValidate: true })
                  }
                >
                  <SelectTrigger className="pl-10 border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-lg">
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="luxury-apartment-owerri">
                      Luxury Apartment in Owerri
                    </SelectItem>
                    <SelectItem value="family-home-port-harcourt">
                      Family Home in Port Harcourt
                    </SelectItem>
                    <SelectItem value="commercial-space-obinze">
                      Commercial Space in Obinze
                    </SelectItem>
                    <SelectItem value="land-for-development">
                      Land for Development
                    </SelectItem>
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  {...register("service", {
                    required: "Please select a property",
                  })}
                  value={watch("service")}
                />
              </div>
              {errors.service && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.service.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="relative">
              <div className="relative">
                <Textarea
                  id="message"
                  className="peer pl-10 pt-6 pb-2 border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-lg"
                  rows={4}
                  {...register("message", {
                    required: "Message is required",
                  })}
                />
                <MessageSquare className="absolute left-3 top-5 w-5 h-5 text-amber-400" />
                <label
                  htmlFor="message"
                  className={`absolute left-10 top-5 text-gray-500 text-sm transition-all duration-300
                    ${
                      formValues.message || errors.message
                        ? "left-8 top-1 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                        : ""
                    }
                    peer-focus:left-8 peer-focus:top-1 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:px-1`}
                >
                  Your message (e.g., preferred date, additional requests)
                </label>
              </div>
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
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
                    Scheduling...
                  </span>
                ) : (
                  "Book Inspection"
                )}
              </Button>
            </motion.div>
          </form>
        )}
      </motion.div>
    </>
  );
};

export default BookInspectionForm;
