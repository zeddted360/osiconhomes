import { Bde } from "@/models/bde";
import { connectDb } from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { sendEmail } from "@/utils/email";

export const POST = async (request: NextRequest) => {
  const { firstname, lastname, username, email, phone, password } =
    await request.json();
  try {
    await connectDb();
    const existBde = await Bde.findOne({ $or: [{ email }, { username }] });
    const referralCode = `BDE_${nanoid(10)}`;

    if (existBde) {
      throw new Error("Sorry this BDE has already registered");
    }

    await Bde.create({
      firstname,
      lastname,
      username,
      email,
      phone,
      password,
      referralCode,
    });

    // Send email notification to admin
    const emailResult = await sendEmail(
      process.env.ADMIN_EMAIL as string, // Admin email address
      "New BDE Registration", // Email subject
      {
        firstname,
        lastname,
        username,
        email,
        phone,
        referralCode,
      } // Data to include in the email
    );

    if (!emailResult.success) {
      console.error("Failed to send email notification:", emailResult.error);
      // Note: Not throwing an error here to avoid failing the registration
      // You can choose to handle this differently based on your requirements
    }

    return NextResponse.json(
      { success: true, message: "BDE successfully added" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : "server error");
    return NextResponse.json(
      { success: false, message: "Error during registration" },
      { status: 500 }
    );
  }
};
