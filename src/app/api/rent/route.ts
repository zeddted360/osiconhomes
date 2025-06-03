import { NextRequest, NextResponse } from "next/server";
import { RentRequest } from "@/models/rentRequest";
import { connectDb } from "@/utils/connectDb";
import { sendEmail } from "@/utils/email";

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
      "bedrooms",
      "moveInDate",
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create a new rent request
    const rentRequest = await RentRequest.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      budget: Number(data.budget),
      bedrooms: data.bedrooms,
      moveInDate: new Date(data.moveInDate),
      amenities: data.amenities || [],
      leaseTerm: data.leaseTerm || "",
      furnished: data.furnished || "",
      additionalInfo: data.additionalInfo || "",
    });

    const to = process.env.ADMIN_EMAIL || "admin@yourdomain.com"; // Replace with your admin email or configure in .env
    const subject = "New Rent Request Submission";
    const emailData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      budget: data.budget,
      bedrooms: data.bedrooms,
      moveInDate: new Date(data.moveInDate).toLocaleDateString(),
      amenities: data.amenities || [],
      leaseTerm: data.leaseTerm || "None",
      furnished: data.furnished || "None",
      additionalInfo: data.additionalInfo || "None",
    };

    // Send email notification
    const emailResult = await sendEmail(to, subject, emailData);
    if (!emailResult.success) {
      console.error("Failed to send email:", emailResult.error);
    }

    return NextResponse.json(
      { message: "Rent request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting rent request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
