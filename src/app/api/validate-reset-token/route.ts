import { Bde } from "@/models/bde";
import { Member } from "@/models/member";
import { connectDb } from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  try {
    await connectDb();

    if (!token || !id) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing reset link" },
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

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Server error");
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while validating the reset link",
      },
      { status: 500 }
    );
  }
};
