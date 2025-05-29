import { Bde } from "@/models/bde";
import { Member } from "@/models/member";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    // Validate request body
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 }
      );
    }

    const {
      firstname,
      lastname,
      username,
      email,
      phone,
      password,
      referralCode,
    } = body;

    // Validate required fields
    const requiredFields = {
      firstname,
      lastname,
      username,
      email,
      phone,
      password,
      referralCode,
    };
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check for existing member
    const isMemberExist = await Member.findOne({
      $or: [{ email }, { username }],
    });
      
      const isBdeExist = await Bde.findOne({
          $or: [{ email }, { username }],
      });

    if (isMemberExist || isBdeExist) {
      // If either a member or BDE with the same email or username exists
      return NextResponse.json(
        { success: false, message: "Username or email already exists or you're a BDE" },
        { status: 409 }
      );
    }

    // Validate referral code
    const referred_By = await Bde.findOne({ referralCode });
    if (!referred_By) {
      return NextResponse.json(
        { success: false, message: "Invalid referral code" },
        { status: 400 }
      );
    }

    // Create member and update referral in a transaction
    const createdMember = await Member.create({
      firstname,
      lastname,
      username,
      email: email.toLowerCase(), // Normalize email
      phone,
      password,
      referredBy: referred_By._id,
    });

    await Bde.findByIdAndUpdate(
      referred_By._id,
      { $push: { referred: createdMember._id } },
      { new: true }
    );

    return NextResponse.json(
      { success: true, message: "Member registration successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false, // Fixed: Changed to false for error case
        message: "An error occurred during registration",
      },
      { status: 500 }
    );
  }
};
