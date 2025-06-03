import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/connectDb";
import { sendEmail } from "@/utils/email";
import { BuyPropertyRequest } from "@/models/buyPropertyRequest";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const data = await request.json();
    const requiredFields = [
      "name",
      "email",
      "phone",
      "city",
      "budget",
      "propertyType",
      "bedrooms",
      "financing",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create a new buy property request
    const buyPropertyRequest = await BuyPropertyRequest.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      budget: Number(data.budget),
      propertyType: data.propertyType,
      bedrooms: data.bedrooms,
      financing: data.financing,
      lotSize: data.lotSize ? Number(data.lotSize) : null,
      neighborhood: data.neighborhood || "",
      additionalInfo: data.additionalInfo || "",
    });

    const to = process.env.ADMIN_EMAIL || "admin@yourdomain.com"; // Replace with your admin email or configure in .env
    const subject = "New Buy Property Request Submission";
    const emailData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      budget: data.budget,
      propertyType: data.propertyType,
      bedrooms: data.bedrooms,
      financing: data.financing,
      lotSize: data.lotSize || "None",
      neighborhood: data.neighborhood || "None",
      additionalInfo: data.additionalInfo || "None",
    };

    // Send email notification
    const emailResult = await sendEmail(to, subject, emailData);
    if (!emailResult.success) {
      console.error("Failed to send email:", emailResult.error);
    }

    return NextResponse.json(
      { message: "Buy property request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting buy property request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
