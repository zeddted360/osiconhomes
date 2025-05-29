import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";

// Interface for User document
interface IMember extends Document {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  referredBy: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Interface for Member model
interface IMemberModel extends Model<IMember> {
  findByEmail(email: string): Promise<IMember | null>;
}

const memberSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    referredBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bde",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
memberSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare passwords
memberSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

// Static method to find user by email
memberSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

// Handle duplicate key errors
memberSchema.post("save", function (error: any, doc: any, next: any) {
  if (error.code === 11000) {
    next(new Error("Email already exists"));
  } else {
    next(error);
  }
});

export const Member = (mongoose.models.Member ||
  mongoose.model<IMember, IMemberModel>(
    "Member",
    memberSchema
  )) as IMemberModel;
