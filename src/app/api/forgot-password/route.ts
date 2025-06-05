// src/app/api/forgot-password/route.ts
import { Bde } from "@/models/bde";
import { Member } from "@/models/member";
import { connectDb } from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/utils/email";

export const POST = async (request: NextRequest) => {
  try {
    await connectDb();

    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Find the user (either BDE or Member)
    let user = await Bde.findOne({ email: email.toLowerCase() });
    let userType = "Bde";

    if (!user) {
      user = await Member.findOne({ email: email.toLowerCase() });
      userType = "Member";
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Generate a reset token and expiration
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 1 * 60 * 60 * 1000);

    // Update the user with the reset token
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpires = resetTokenExpires;
    await user.save();

    // Send the reset email
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}&id=${user._id}`;
    const emailResult = await sendEmail(
      email,
      "Password Reset Request - Osicon Homes",
      {
        firstname: user.firstname,
        lastname: user.lastname,
        resetLink,
      }
    );

    if (!emailResult.success) {
      console.error("Failed to send reset email:", emailResult.error);
      return NextResponse.json(
        { success: false, message: "Failed to send reset email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Password reset link sent to your email" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Server error");
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request",
      },
      { status: 500 }
    );
  }
};
