"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock, Eye, EyeOff, Phone, Code } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Form data types
interface FormData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  referralCode: string;
}

interface FormErrors {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  referralCode?: string;
  server?: string;
}

const MemberForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  });
    const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, server: undefined }));
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.firstname.trim())
      newErrors.firstname = "First name is required";
    if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (
      !/^(?:\+234|0)([789][01]\d{8})$/.test(formData.phone.replace(/\s/g, ""))
    )
      newErrors.phone = "Invalid Nigerian phone number";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.referralCode.trim())
      newErrors.referralCode = "Referral code is required";
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsPending(true);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsPending(false);
      return;
    }

    try {
      const response = await fetch("/api/member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
        const result = await response.json();
        if (response.ok && result.success) {
          toast.success("Registration successful! Redirecting...");
            setIsSubmitted(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));
          router.push("/");
      } else {
        setErrors({ server: result.message || "An error occurred" });
      }
    } catch {
      setErrors({ server: "Network error, please try again later" });
    } finally {
        setIsPending(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const inputStyles =
    "peer pl-12 pt-5 pb-2 border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 rounded-2xl shadow-md bg-white";
  const labelStyles = (
    value: string | undefined,
    error?: string
  ) => `absolute left-12 top-1/2 transform -translate-y-1/2 text-sm transition-all duration-300
    ${
      value || error
        ? "left-10 top-0 text-xs text-amber-600 -translate-y-1/2 bg-white px-1"
        : "text-gray-500"
    }
    peer-focus:left-10 peer-focus:top-0 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:px-1`;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-xl mx-auto bg-gradient-to-br from-white to-amber-50 p-8 rounded-3xl shadow-xl"
    >
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.entries(formData).map(([key, value]) => {
            const Icon =
              key === "email"
                ? Mail
                : key === "password" || key === "confirmPassword"
                ? Lock
                : key === "phone"
                ? Phone
                : key === "referralCode"
                ? Code
                : User;
            const type = key.includes("password")
              ? key === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : showConfirmPassword
                ? "text"
                : "password"
              : key === "email"
              ? "email"
              : key === "phone"
              ? "tel"
              : "text";
            const toggleShow =
              key === "password"
                ? () => setShowPassword(!showPassword)
                : key === "confirmPassword"
                ? () => setShowConfirmPassword(!showConfirmPassword)
                : undefined;
            const showToggle = key.includes("password");

            return (
              <div key={key} className="relative">
                <Input
                  id={key}
                  name={key}
                  type={type}
                  value={value}
                  onChange={handleInputChange}
                  className={inputStyles}
                />
                <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                {showToggle && (
                  <button
                    type="button"
                    onClick={toggleShow}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400"
                    aria-label="Toggle password visibility"
                  >
                    {(key === "password" && showPassword) ||
                    (key === "confirmPassword" && showConfirmPassword) ? (
                      <EyeOff />
                    ) : (
                      <Eye />
                    )}
                  </button>
                )}
                <label
                  htmlFor={key}
                  className={labelStyles(
                    value,
                    errors[key as keyof FormErrors]
                  )}
                >
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                {errors[key as keyof FormErrors] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[key as keyof FormErrors]}
                  </p>
                )}
              </div>
            );
          })}
          {errors.server && (
            <p className="text-red-500 text-sm text-center">{errors.server}</p>
          )}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-xl shadow-lg"
            >
              {isPending ? "Submitting..." : "Register"}
            </Button>
          </motion.div>
        </form>
    
    </motion.div>
  );
};

export default MemberForm;
