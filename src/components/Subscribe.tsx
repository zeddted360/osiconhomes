"use client";
import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { Button } from "./ui/button";
import toast, { Toaster } from "react-hot-toast";

// Define error type
interface FormErrors {
  email?: string;
  server?: string;
}

const Subscribe: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: undefined, server: undefined }));
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
    setIsSubmitting(true);

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
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

      if (response.ok) {
        setEmail("");
        toast.success(
          "Subscribed successfully! Check your email for confirmation.",
          {
            duration: 3000,
            style: {
              background: "#fff",
              color: "#1f2937",
              border: "1px solid #f59e0b",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            },
          }
        );
      } else {
        throw new Error(
          result.error || "An error occurred during subscription"
        );
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to subscribe. Please try again.", {
        duration: 4000,
        style: {
          background: "#fff",
          color: "#1f2937",
          border: "1px solid #ef4444",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400 group-focus-within:scale-110 transition-transform duration-300" />
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            disabled={isSubmitting}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200 backdrop-blur-md disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.email && (
            <div id="email-error" className="text-sm text-red-500 mt-1">
              {errors.email}
            </div>
          )}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-amber-500 hover:to-orange-600 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-amber-400/30 group disabled:opacity-50"
        >
          <span className="text-base">
            {isSubmitting ? "Subscribing..." : "Subscribe Now"}
          </span>
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          )}
        </Button>
        {errors.server && (
          <div className="text-sm text-red-500 text-center">
            {errors.server}
          </div>
        )}
      </form>
    </div>
  );
};

export default Subscribe;
