"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Home, Loader2 } from "lucide-react";

export default function RentHouse() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    budget: "",
    bedrooms: "",
    moveInDate: "",
    additionalInfo: "",
    amenities: [] as string[],
    leaseTerm: "",
    furnished: "",
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      amenities: e.target.checked
        ? [...prev.amenities, value]
        : prev.amenities.filter((a) => a !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/rent", {
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
          budget: "",
          bedrooms: "",
          moveInDate: "",
          additionalInfo: "",
          amenities: [],
          leaseTerm: "",
          furnished: "",
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
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Image
        src="/Real_estate_Hero.jpg"
        alt="Rent House Background"
        fill
        style={{ objectFit: "cover" }}
        className="absolute inset-0 z-0 opacity-20"
        quality={100}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10"></div>

      <div className="relative z-20 flex items-center justify-center min-h-screen px-6 py-12">
        <div className="max-w-lg w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Home className="w-6 h-6 mr-2 text-orange-500" />
            Rent a House
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-slate-300 font-medium"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-slate-800/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-amber-400 text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-slate-300 font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-slate-800/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-amber-400 text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-slate-300 font-medium"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 bg-slate-800/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-amber-400 text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-slate-300 font-medium"
              >
                Preferred City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 bg-slate-800/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-amber-400 text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="budget"
                className="block text-slate-300 font-medium"
              >
                Budget (per month)
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full p-3 bg-slate-800/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-amber-400 text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="bedrooms"
                className="block text-slate-300 font-medium"
              >
                Number of Bedrooms
              </label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full p-3 bg-slate-800/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-amber-400 text-white"
                required
              >
                <option value="">Select</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4+">4+ Bedrooms</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="moveInDate"
                className="block text-slate-300 font-medium"
              >
                Preferred Move-In Date
              </label>
              <input
                type="date"
                id="moveInDate"
                name="moveInDate"
                value={formData.moveInDate}
                onChange={handleChange}
                className="w-full p-3 bg-slate-800/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-amber-400 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium">
                Preferred Amenities
              </label>
              <div className="flex flex-wrap gap-4">
                {["Parking", "Pool", "Gym", "Pet-Friendly"].map((amenity) => (
                  <label key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      name="amenities"
                      value={amenity}
                      onChange={handleCheckboxChange}
                      className="mr-2 text-amber-400 focus:ring-amber-400"
                    />
                    <span className="text-slate-300">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="leaseTerm"
                className="block text-slate-300 font-medium"
              >
                Lease Term
              </label>
              <select
                id="leaseTerm"
                name="leaseTerm"
                value={formData.leaseTerm}
                onChange={handleChange}
                className="w-full p-3 bg-slate-800/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-amber-400 text-white"
              >
                <option value="">Select</option>
                <option value="6 months">6 Months</option>
                <option value="12 months">12 Months</option>
                <option value="24 months">24 Months</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-medium">
                Furnished
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="furnished"
                    value="Yes"
                    onChange={handleChange}
                    className="mr-2 text-amber-400 focus:ring-amber-400"
                  />
                  <span className="text-slate-300">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="furnished"
                    value="No"
                    onChange={handleChange}
                    className="mr-2 text-amber-400 focus:ring-amber-400"
                  />
                  <span className="text-slate-300">No</span>
                </label>
              </div>
            </div>
            <div>
              <label
                htmlFor="additionalInfo"
                className="block text-slate-300 font-medium"
              >
                Additional Requirements
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                className="w-full p-3 bg-slate-800/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-amber-400 text-white"
                rows={4}
              />
            </div>
            <button
                          type="submit"
                          disabled={isLoading}
                          className={`group relative w-full px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white ${isLoading && "bg-gray-400 text-gray-700"} font-semibold rounded-xl shadow-md hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                {isLoading && <Loader2 className="animate-spin" size={24} />}
                {isLoading ? "Submiting..." : "Submit Request"}
              </div>
            </button>
            {message && (
              <div
                className={`mt-4 border border-red-200 text-center ${
                  message.includes("Error") ? "text-red-500" : "text-green-400"
                }`}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
