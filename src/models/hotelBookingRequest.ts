import mongoose from "mongoose";

const HotelBookingRequestSchema = new mongoose.Schema({
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
  roomType: {
    type: String,
    required: true,
    enum: ["Single", "Double", "Suite"],
  },
  mealPlan: {
    type: String,
    enum: ["Breakfast Included", "No Meals", ""],
    default: "",
  },
  accessibility: {
    type: String,
    trim: true,
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

export const HotelBookingRequest =
  mongoose.models.HotelBookingRequest ||
  mongoose.model("HotelBookingRequest", HotelBookingRequestSchema);
