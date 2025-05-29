"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock, Eye, EyeOff, Phone } from "lucide-react"; // Added Phone icon
import Link from "next/link";
import SuccessMessage from "./SuccessMessage";

// Form data type
interface FormData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// Form errors type
interface FormErrors {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  phone?: string; // Added phone error field
  password?: string;
  confirmPassword?: string;
  server?: string;
}

const SignUpForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // Initialize window size for SSR compatibility
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, server: undefined }));
  };

  // Validate form fields
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Firstname validation
    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }

    // Lastname validation
    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^(?:\+234|0)([789][01]\d{8})$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Invalid Nigerian phone number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsPending(true);

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsPending(false);
      return;
    }

    try {
      const response = await fetch("/api/bde", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result: { success: boolean; message: string } =
        await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
      } else {
        setErrors({
          server: result.message || "An error occurred during signup",
        });
      }
    } catch (error) {
      setErrors({ server: "Network error, please try again later" });
    } finally {
      setIsPending(false);
    }
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
          width={windowSize.width || 800}
          height={windowSize.height || 600}
          recycle={false}
        />
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {isSubmitted ? (
          <SuccessMessage />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Firstname */}
            <div className="relative">
              <div className="relative">
                <Input
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className="peer pl-10 pt-5 pb-2 border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-lg"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                <label
                  htmlFor="firstname"
                  className={`absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all duration-300
                    ${
                      formData.firstname || errors.firstname
                        ? "left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                        : ""
                    }
                    peer-focus:left-8 peer blower-focus:top-0 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:px-1`}
                >
                  First Name
                </label>
              </div>
              {errors.firstname && (
                <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>
              )}
            </div>

            {/* Lastname */}
            <div className="relative">
              <div className="relative">
                <Input
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="peer pl-10 pt-5 pb-2 border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-lg"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                <label
                  htmlFor="lastname"
                  className={`absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all duration-300
                    ${
                      formData.lastname || errors.lastname
                        ? "left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                        : ""
                    }
                    peer-focus:left-8 peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:px-1`}
                >
                  Last Name
                </label>
              </div>
              {errors.lastname && (
                <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>
              )}
            </div>

            {/* Username */}
            <div className="relative">
              <div className="relative">
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="peer pl-10 pt-5 pb-2 border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-lg"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                <label
                  htmlFor="username"
                  className={`absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all duration-300
                    ${
                      formData.username || errors.username
                        ? "left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                        : ""
                    }
                    peer-focus:left-8 peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:px-1`}
                >
                  Username
                </label>
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="peer pl-10 pt-5 pb-2 border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-lg"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                <label
                  htmlFor="email"
                  className={`absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all duration-300
                    ${
                      formData.email || errors.email
                        ? "left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                        : ""
                    }
                    peer-focus:left-8 peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:px-1`}
                >
                  Email Address
                </label>
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="relative">
              <div className="relative">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="peer pl-10 pt-5 pb-2 border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-lg"
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                <label
                  htmlFor="phone"
                  className={`absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all duration-300
                    ${
                      formData.phone || errors.phone
                        ? "left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                        : ""
                    }
                    peer-focus:left-8 peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:px-1`}
                >
                  Phone Number
                </label>
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="peer pl-10 pr-10 pt-5 pb-2 border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-lg"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
                <label
                  htmlFor="password"
                  className={`absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all duration-300
                    ${
                      formData.password || errors.password
                        ? "left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                        : ""
                    }
                    peer-focus:left-8 peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:px-1`}
                >
                  Password
                </label>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="peer pl-10 pr-10 pt-5 pb-2 border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-lg"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
                <label
                  htmlFor="confirmPassword"
                  className={`absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all duration-300
                    ${
                      formData.confirmPassword || errors.confirmPassword
                        ? "left-8 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
                        : ""
                    }
                    peer-focus:left-8 peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:px-1`}
                >
                  Confirm Password
                </label>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Server Error Message */}
            {errors.server && (
              <p className="text-red-500 text-xs mt-1">{errors.server}</p>
            )}

            {/* Continue Button */}
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
              >
                {isPending ? (
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
