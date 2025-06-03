import mongoose from "mongoose";

const ShortLetRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
    min: [1, "Number of guests must be at least 1"],
  },
  budget: {
    type: Number,
    required: true,
    min: [0, "Budget cannot be negative"],
  },
  amenities: {
    type: [String],
    default: [],
    enum: [
      "Wi-Fi",
      "Kitchen",
      "Parking",
      "Pet-Friendly",
      "Pool",
      "Gym",
      "Air Conditioning",
      "Balcony",
    ],
  },
  furnished: {
    type: String,
    enum: ["Yes", "No", "Partially", ""],
    default: "",
  },
  additionalInfo: {
    type: String,
    trim: true,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ShortLetRequest =
  mongoose.models.ShortLetRequest ||
  mongoose.model("ShortLetRequest", ShortLetRequestSchema);
