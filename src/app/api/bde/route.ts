import { Bde } from "@/models/bde";
import { connectDb } from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { sendEmail } from "@/utils/email";
import crypto from "crypto";

export const POST = async (request: NextRequest) => {
  const { firstname, lastname, username, email, phone, password } =
    await request.json();

  try {
    await connectDb();
    // Check if BDE already exists
    const existBde = await Bde.findOne({ $or: [{ email }, { username }] });
    if (existBde) {
      return NextResponse.json(
        { success: false, message: "Sorry, this BDE has already registered" },
        { status: 400 }
      );
    }

    // Generate a verification token and expiration
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    // Create the BDE with unverified email status
    const referralCode = `BDE_${nanoid(10)}`;
    const newBde = await Bde.create({
      firstname,
      lastname,
      username,
      email,
      phone,
      password, // Password will be hashed by the pre-save hook
      referralCode,
      isEmailVerified: false, // Email not verified yet
      emailVerificationToken: verificationToken,
      emailVerificationTokenExpires: verificationTokenExpires,
    });

    // Send verification email to the user
    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${verificationToken}&id=${newBde._id}`;
    const emailResult = await sendEmail(
      email, // Send to the user's email
      "Verify Your Email Address - Osicon Homes", // Subject
      {
        firstname,
        lastname,
        verificationLink,
      } // Data for the email template
    );

    if (!emailResult.success) {
      console.error("Failed to send verification email:", emailResult.error);
      // Delete the user if email sending fails
      await Bde.deleteOne({ _id: newBde._id });
      return NextResponse.json(
        { success: false, message: "Failed to send verification email" },
        { status: 500 }
      );
    }
    // Send email notification to admin
    const adminEmailResult = await sendEmail(
      process.env.ADMIN_EMAIL as string,
      "New BDE Registration",
      {
        firstname,
        lastname,
        username,
        email,
        phone,
        referralCode,
      }
    );

    if (!adminEmailResult.success) {
      console.error(
        "Failed to send admin notification email:",
        adminEmailResult.error
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "BDE successfully registered. Please check your email to verify your account.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Server error");
    return NextResponse.json(
      { success: false, message: "Error during registration" },
      { status: 500 }
    );
  }
};
