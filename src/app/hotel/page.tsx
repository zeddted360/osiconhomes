"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Hotel, Loader2 } from "lucide-react";

export default function HotelBooking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    checkInDate: "",
    checkOutDate: "",
    guests: "",
    roomType: "",
    mealPlan: "",
    accessibility: "",
    additionalInfo: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/hotel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok) {
        setMessage("Your request has been submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          city: "",
          checkInDate: "",
          checkOutDate: "",
          guests: "",
          roomType: "",
          mealPlan: "",
          accessibility: "",
          additionalInfo: "",
        });
        setTimeout(() => router.push("/"), 2000);
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative z-10 flex items-center min-h-screen px-4 sm:px-6 lg:px-12">
      <Image
        src="/Real_estate_Hero.jpg"
        alt="Hotel Booking Background"
        fill
        style={{ objectFit: "cover" }}
        className="absolute inset-0 z-0"
        quality={100}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-1"></div>

      <div className="relative max-w-lg mx-auto w-full z-10 bg-white/95 backdrop-blur-lg rounded-xl p-6 shadow-lg animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Hotel className="w-6 h-6 mr-2 text-orange-500" />
          Book a Hotel
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-900 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 text-gray-900"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-900 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 text-gray-900"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-900 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 text-gray-900"
              required
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-gray-900 font-medium">
              Preferred City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 text-gray-900"
              required
            />
          </div>
          <div>
            <label
              htmlFor="checkInDate"
              className="block text-gray-900 font-medium"
            >
              Check-In Date
            </label>
            <input
              type="date"
              id="checkInDate"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 text-gray-900"
              required
            />
          </div>
          <div>
            <label
              htmlFor="checkOutDate"
              className="block text-gray-900 font-medium"
            >
              Check-Out Date
            </label>
            <input
              type="date"
              id="checkOutDate"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 text-gray-900"
              required
            />
          </div>
          <div>
            <label htmlFor="guests" className="block text-gray-900 font-medium">
              Number of Guests
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 text-gray-900"
              min="1"
              required
            />
          </div>
          <div>
            <label
              htmlFor="roomType"
              className="block text-gray-900 font-medium"
            >
              Room Type
            </label>
            <select
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 text-gray-900"
              required
            >
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="mealPlan"
              className="block text-gray-900 font-medium"
            >
              Meal Plan
            </label>
            <select
              id="mealPlan"
              name="mealPlan"
              value={formData.mealPlan}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 text-gray-900"
            >
              <option value="">Select</option>
              <option value="Breakfast Included">Breakfast Included</option>
              <option value="No Meals">No Meals</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="accessibility"
              className="block text-gray-900 font-medium"
            >
              Accessibility Needs
            </label>
            <textarea
              id="accessibility"
              name="accessibility"
              value={formData.accessibility}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 text-gray-900"
              rows={3}
            />
          </div>
          <div>
            <label
              htmlFor="additionalInfo"
              className="block text-gray-900 font-medium"
            >
              Additional Requirements
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 text-gray-900"
              rows={4}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`group relative w-full px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white ${
              isLoading && "bg-gray-400 text-gray-700"
            } font-semibold rounded-xl shadow-md hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            <div className="relative flex items-center justify-center">
              {isLoading && <Loader2 className="animate-spin mr-2" size={24} />}
              <span>{isLoading ? "Submitting..." : "Submit Request"}</span>
            </div>
          </button>
          {message && (
            <p
              className={`mt-4 text-center font-medium ${
                message.includes("Error") ? "text-red-500" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}
