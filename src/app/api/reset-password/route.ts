import { Bde } from "@/models/bde";
import { Member } from "@/models/member";
import { connectDb } from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    await connectDb();

      const { token, id, newPassword } = await request.json();
      
    if (!token || !id || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the user (either BDE or Member)
    let user = await Bde.findOne({
      _id: id,
      resetPasswordToken: token,
      resetPasswordTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      user = await Member.findOne({
        _id: id,
        resetPasswordToken: token,
        resetPasswordTokenExpires: { $gt: new Date() },
      });
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired reset link" },
        { status: 400 }
      );
    }
    user.password = newPassword;
    // Clear the reset token
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
      await user.save();

    return NextResponse.json(
      { success: true, message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while resetting your password",
      },
      { status: 500 }
    );
  }
};
