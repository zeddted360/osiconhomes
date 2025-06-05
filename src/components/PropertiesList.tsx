"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Home, MapPin, Building2 } from "lucide-react";

// Define Property type
type Property = {
  id: number;
  name: string;
  type: string;
  state: string;
  city: string;
  image: string;
  description: string;
};

type PropertiesListProps = {
  initialProperties: Property[];
};

const PropertiesList = ({ initialProperties }: PropertiesListProps) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [filters, setFilters] = useState({
    propertyType: "All",
    state: "All",
    city: "All",
  });

  // Unique values for dropdowns
  const propertyTypes = [
    "All",
    ...new Set(initialProperties.map((p) => p.type)),
  ];
  const states = ["All", ...new Set(initialProperties.map((p) => p.state))];
  const cities = ["All", ...new Set(initialProperties.map((p) => p.city))];

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...initialProperties];

    if (filters.propertyType !== "All") {
      filtered = filtered.filter((p) => p.type === filters.propertyType);
    }
    if (filters.state !== "All") {
      filtered = filtered.filter((p) => p.state === filters.state);
    }
    if (filters.city !== "All") {
      filtered = filtered.filter((p) => p.city === filters.city);
    }

    setProperties(filtered);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="space-y-8">
      {/* Filter Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-amber-200/50">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Filter Properties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Property Type */}
          <div className="relative">
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400 z-10" />
              <Select
                onValueChange={(val) => handleFilterChange("propertyType", val)}
              >
                <SelectTrigger className="pl-10 border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-lg">
                  <SelectValue placeholder="Property type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* State */}
          <div className="relative">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400 z-10" />
              <Select onValueChange={(val) => handleFilterChange("state", val)}>
                <SelectTrigger className="pl-10 border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-lg">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* City */}
          <div className="relative">
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400 z-10" />
              <Select onValueChange={(val) => handleFilterChange("city", val)}>
                <SelectTrigger className="pl-10 border-gray-300 focus:ring-amber-500 focus:border-amber-500 rounded-lg">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Button */}
          <Button
            onClick={applyFilters}
            className="bg-amber-500 hover:bg-amber-600 text-white rounded-lg"
          >
            Filter
          </Button>
        </div>
      </div>

      {/* Properties Grid */}
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <motion.div
              key={property.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl shadow-xl p-6 border border-amber-200/50"
            >
              <Image
                src={property.image}
                alt={property.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onError={(e) => {
                  e.currentTarget.src = "/fallback-property-image.webp";
                }}
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {property.name}
              </h3>
              <p className="text-gray-600 mb-2">{property.description}</p>
              <p className="text-gray-500 text-sm mb-1">
                <strong>Type:</strong> {property.type}
              </p>
              <p className="text-gray-500 text-sm mb-1">
                <strong>State:</strong> {property.state}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                <strong>City:</strong> {property.city}
              </p>
              <Link
                href={`/properties/${property.id}`}
                className="px-4 py-2 hidden bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors duration-300"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No properties found matching your criteria.
        </p>
      )}
    </div>
  );
};

export default PropertiesList;