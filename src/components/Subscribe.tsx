"use client";
import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

// Define error type
interface FormErrors {
  email?: string;
  server?: string;
}

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: undefined, server: undefined }));
    setSuccessMessage("");
  };

  // Validate email
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    setIsPending(true);

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsPending(false);
      return;
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setEmail("");
        setSuccessMessage(result.message || "Subscribed successfully!");
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      } else {
        setErrors({
          server: result.message || "An error occurred during subscription",
        });
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      }
    } catch (error) {
      setErrors({ server: "Network error, please try again later" });
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative group">
        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400 group-focus-within:scale-110 transition-transform duration-200" />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Enter your email address"
          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
        />
        {errors.email && (
          <div className="text-sm text-red-400 mt-1">{errors.email}</div>
        )}
      </div>
      <Button
        type="submit"
        disabled={isPending}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-4 rounded-2xl font-semibold hover:from-amber-500 hover:to-orange-600 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-amber-400/25 group"
      >
        <span>{isPending ? "Subscribing..." : "Subscribe Now"}</span>
        <ArrowRight
          className={`w-5 h-5 transition-transform duration-300 ${
            isHovered ? "translate-x-1" : ""
          }`}
        />
      </Button>
      {(errors.server || successMessage) && showMessage && (
        <div
          className={`text-sm ${
            successMessage ? "text-green-400" : "text-red-400"
          }`}
        >
          {successMessage || errors.server}
        </div>
      )}
    </form>
  );
};

export default Subscribe;
