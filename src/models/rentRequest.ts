import mongoose from "mongoose";

const RentRequestSchema = new mongoose.Schema({
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
  budget: {
    type: Number,
    required: true,
    min: [0, "Budget cannot be negative"],
  },
  bedrooms: {
    type: String,
    required: true,
    enum: ["1", "2", "3", "4+"],
  },
  moveInDate: {
    type: Date,
    required: true,
  },
  amenities: {
    type: [String],
    default: [],
    enum: ["Parking", "Pool", "Gym", "Pet-Friendly"],
  },
  leaseTerm: {
    type: String,
    enum: ["6 months", "12 months", "24 months", ""],
    default: "",
  },
  furnished: {
    type: String,
    enum: ["Yes", "No", ""],
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

export const RentRequest =  mongoose.models.RentRequest ||
  mongoose.model("RentRequest", RentRequestSchema);
