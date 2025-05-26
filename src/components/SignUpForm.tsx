"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock, Gift } from "lucide-react";

// Form data type
type FormData = {
  username: string;
  email: string;
  password: string;
  referralCode: string; // Now required (removed optional ?)
};

const SignUpForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      referralCode: "", // Removed "Nill" default since it's now required
    },
  });

  // Watch form values to determine if inputs are filled
  const formValues = watch();

  // Handle form submission
  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Sign Up Form Submitted", data);
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
              Account Created!
            </h3>
            <p className="text-gray-600 mb-4">
              Welcome to Osicon Homes! Your account has been successfully
              created. Start exploring properties now.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors duration-300"
              aria-label="Go to Osicon Homes homepage"
            >
              Explore Properties
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <div className="relative">
              <div className="relative">
                <Input
                  id="username"
                  className="peer pl-10 pt-5 pb-2 border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-lg"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                <label
                  htmlFor="username"
                  className={`absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all duration-300
                    ${
                      formValues.username || errors.username
                        ? "left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                        : ""
                    }
                    peer-focus:left-8 peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:px-1`}
                >
                  Username
                </label>
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
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
                  Email address
                </label>
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  className="peer pl-10 pt-5 pb-2 border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-lg"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                <label
                  htmlFor="password"
                  className={`absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all duration-300
                    ${
                      formValues.password || errors.password
                        ? "left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                        : ""
                    }
                    peer-focus:left-8 peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:px-1`}
                >
                  Password
                </label>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Referral Code (now compulsory) */}
            <div className="relative">
              <div className="relative">
                <Input
                  id="referralCode"
                  className="peer pl-10 pt-5 pb-2 border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-lg"
                  {...register("referralCode", {
                    required: "Referral code is required",
                  })}
                />
                <Gift className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                <label
                  htmlFor="referralCode"
                  className={`absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all duration-300
                    ${
                      formValues.referralCode || errors.referralCode
                        ? "left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                        : ""
                    }
                    peer-focus:left-8 peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:px-1`}
                >
                  Referral Code
                </label>
              </div>
              {errors.referralCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.referralCode.message}
                </p>
              )}
            </div>

            {/* Continue Button */}
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
                    Signing Up...
                  </span>
                ) : (
                  "Continue"
                )}
              </Button>
            </motion.div>

            {/* Sign In Link */}
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-amber-500 hover:text-amber-600 font-semibold"
              >
                Sign in
              </Link>
            </p>
          </form>
        )}
      </motion.div>
    </>
  );
};

export default SignUpForm;
