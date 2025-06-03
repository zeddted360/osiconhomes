import mongoose from "mongoose";

const BuyPropertyRequestSchema = new mongoose.Schema({
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
  propertyType: {
    type: String,
    required: true,
    enum: ["House", "Condo", "Land"],
  },
  bedrooms: {
    type: String,
    required: true,
    enum: ["1", "2", "3", "4+"],
  },
  financing: {
    type: String,
    required: true,
    enum: ["Yes", "No"],
  },
  lotSize: {
    type: Number,
    min: [0, "Lot size cannot be negative"],
    default: null,
  },
  neighborhood: {
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

export const BuyPropertyRequest =
  mongoose.models.BuyPropertyRequest ||
  mongoose.model("BuyPropertyRequest", BuyPropertyRequestSchema);
