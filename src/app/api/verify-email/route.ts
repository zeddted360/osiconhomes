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
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/verify-failure${
          id ? `?id=${id}` : ""
        }`
      );
    }

    let user = await Bde.findOne({
      _id: id,
      emailVerificationToken: token,
      emailVerificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      user = await Member.findOne({
        _id: id,
        emailVerificationToken: token,
        emailVerificationTokenExpires: { $gt: new Date() },
      });
    }

    if (!user) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/verify-failure${
          id ? `?id=${id}` : ""
        }`
      );
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpires = undefined;
    await user.save();

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/verify-success`
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Server error");
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/verify-failure${
        id ? `?id=${id}` : ""
      }`
    );
  }
};
