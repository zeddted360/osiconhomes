import mongoose, { Schema, Document } from "mongoose";

export interface ISubscriber extends Document {
  email: string;
  subscribedAt: Date;
  status: "active" | "unsubscribed" | "pending";
  source?: string;
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriberSchema: Schema<ISubscriber> = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    subscribedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["active", "unsubscribed", "pending"],
      default: "active",
    },
    source: {
      type: String,
      trim: true,
      default: "website",
    },
    ipAddress: {
      type: String,
      trim: true,
    },
  },
    {
        timestamps: true, 
    }
);

// Export the model
const Subscriber =
  mongoose.models.Subscriber ||
  mongoose.model<ISubscriber>("Subscriber", SubscriberSchema);

export default Subscriber;
