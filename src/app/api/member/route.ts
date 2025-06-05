import { Bde } from "@/models/bde";
import { Member } from "@/models/member";
import { connectDb } from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/utils/email";

export const POST = async (request: NextRequest) => {
  try {
    await connectDb();
    // Validate request body
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Invalid request" },
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

    // Check for existing member or BDE
    const isMemberExist = await Member.findOne({
      $or: [{ email }, { username }],
    });

    const isBdeExist = await Bde.findOne({
      $or: [{ email }, { username }],
    });

    if (isMemberExist || isBdeExist) {
      return NextResponse.json(
        { success: false, message: "Username or email already exists" },
        { status: 409 }
      );
    }

    // Validate referral code
    const referredBy = await Bde.findOne({ referralCode });
    if (!referredBy) {
      return NextResponse.json(
        { success: false, message: "Invalid referral code" },
        { status: 400 }
      );
    }

    // Generate a verification token and expiration
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now


    try {
        // Create member
        const createdMember = await Member.create({
              firstname,
              lastname,
              username,
              email: email.toLowerCase(),
              phone,
              password,
              referredBy: [referredBy._id],
              isEmailVerified: false,
              emailVerificationToken: verificationToken,
              emailVerificationTokenExpires: verificationTokenExpires,
            }
        );
        console.log("the created member is ", createdMember);

        // Update BDE's referred array
        await Bde.findByIdAndUpdate(
          referredBy._id,
          { $push: { referred: createdMember._id } },
          { new: true }
        );

      // Check if createdMember is defined before proceeding
      if (!createdMember) {
        throw new Error("Failed to create member");
      }

      // Send verification email to the user
      const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${verificationToken}&id=${createdMember._id}`;
      const emailResult = await sendEmail(
        email,
        "Verify Your Email Address - Osicon Homes",
        {
          firstname,
          lastname,
          verificationLink,
        }
      );

      if (!emailResult.success) {
        console.error("Failed to send verification email:", emailResult.error);
        await Member.deleteOne({ _id: createdMember._id });
        return NextResponse.json(
          { success: false, message: "Failed to send verification email" },
          { status: 500 }
        );
      }

      // Send email notification to admin
      const adminEmailResult = await sendEmail(
        process.env.ADMIN_EMAIL as string,
        "New Member Registration",
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
            "Member successfully registered. Please check your email to verify your account.",
        },
        { status: 201 }
      );
    } catch (transactionError) {
      console.error("Transaction error:", transactionError);
      return NextResponse.json(
        {
          success: false,
          message: "Error during registration transaction",
        },
        { status: 500 }
      );
    } 
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "An error occurred during registration",
      },
      { status: 500 }
    );
  }
};
