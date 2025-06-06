import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
// Interface for Bde document
export interface IBde extends Document {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  referralCode?: string;
  referred: string[];
  isAdmin: boolean;
  isVerified: boolean;
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationTokenExpires?: Date;
  resetPasswordToken: string | undefined;
  resetPasswordTokenExpires: Date | undefined;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Interface for Bde model
interface IBdeModel extends Model<IBde> {
  findByEmail(email: string): Promise<IBde | null>;
}

const bdeSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationTokenExpires: {
      type: Date,
    },
    referralCode: {
      type: String,
      unique: true,
      lowercase: true,
    },
    referred: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

bdeSchema.pre("save", async function (next) {
  if (
    this.username.toLowerCase() === "osicon-homes558" ||
    this.email.toLowerCase() === "osiconhomes558@gmail.com"
  ) {
    this.isAdmin = true;
  }

  // Hash password if modified
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
bdeSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

export const Bde = (mongoose.models.Bde ||
  mongoose.model<IBde, IBdeModel>("Bde", bdeSchema)) as IBdeModel;
