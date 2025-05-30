"use client";
import { Loader2, Send } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const GetStartedForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "",
  });
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      // Show success toast
      toast.success(
        "Form submitted successfully! Redirecting to home page...",
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

      // Reset form and navigate to home page after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          service: "",
        });
        setIsSubmitting(false);
        router.push("/");
      }, 3000);
    } catch (err: any) {
      // Show error toast
      toast.error(err.message || "An error occurred. Please try again.", {
        duration: 4000,
        style: {
          background: "#fff",
          color: "#1f2937",
          border: "1px solid #ef4444",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-white rounded-3xl shadow-xl p-10 border border-amber-400/20 bg-gradient-to-br from-amber-50/50 to-orange-50/50 overflow-hidden">
      {/* Toaster for toast notifications */}
      <Toaster position="top-center" />

      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label
              htmlFor="name"
              className="block text-base font-semibold text-gray-800 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="block w-full rounded-xl border-gray-200 shadow-sm py-3 px-4 text-base text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-gray-50/50 hover:bg-gray-50 disabled:opacity-50"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-base font-semibold text-gray-800 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="block w-full rounded-xl border-gray-200 shadow-sm py-3 px-4 text-base text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-gray-50/50 hover:bg-gray-50 disabled:opacity-50"
              placeholder="Enter your email address"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-base font-semibold text-gray-800 mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="block w-full rounded-xl border-gray-200 shadow-sm py-3 px-4 text-base text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-gray-50/50 hover:bg-gray-50 disabled:opacity-50"
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <label
            htmlFor="service"
            className="block text-base font-semibold text-gray-800 mb-2"
          >
            Service of Interest
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
            className="block w-full rounded-xl border-gray-200 shadow-sm py-3 px-4 text-base text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-gray-50/50 hover:bg-gray-50 disabled:opacity-50"
          >
            <option value="" disabled>
              Select a service
            </option>
            <option value="real-estate">Real Estate Services</option>
            <option value="construction">Construction Services</option>
            <option value="home-management">Home Management</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-base font-semibold text-gray-800 mb-2"
          >
            Project Details
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            disabled={isSubmitting}
            className="block w-full rounded-xl border-gray-200 shadow-sm py-3 px-4 text-base text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-gray-50/50 hover:bg-gray-50 disabled:opacity-50"
            placeholder="Tell us about your project..."
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105 overflow-hidden disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center space-x-3">
              <span className="text-lg">
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </span>
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default GetStartedForm;
