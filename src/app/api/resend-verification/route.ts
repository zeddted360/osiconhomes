import { Bde } from "@/models/bde";
import { connectDb } from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/utils/email";

export const POST = async (request: NextRequest) => {
  const { id } = await request.json();

  try {
    await connectDb();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    // Find the BDE by ID
    const bde = await Bde.findById(id);
    if (!bde) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check if email is already verified
    if (bde.isEmailVerified) {
      return NextResponse.json(
        { success: false, message: "Email is already verified" },
        { status: 400 }
      );
    }

    // Generate a new verification token and expiration
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    // Update the BDE with the new token
    bde.emailVerificationToken = verificationToken;
    bde.emailVerificationTokenExpires = verificationTokenExpires;
    await bde.save();

    // Send the new verification email
    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${verificationToken}&id=${bde._id}`;
    const emailResult = await sendEmail(
      bde.email,
      "Verify Your Email Address - Osicon Homes",
      {
        firstname: bde.firstname,
        lastname: bde.lastname,
        verificationLink,
      }
    );

    if (!emailResult.success) {
      console.error("Failed to send verification email:", emailResult.error);
      return NextResponse.json(
        { success: false, message: "Failed to send verification email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Verification email resent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Server error");
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while resending the verification email",
      },
      { status: 500 }
    );
  }
};
