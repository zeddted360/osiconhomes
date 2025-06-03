import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/connectDb";
import { sendEmail } from "@/utils/email";
import { HotelBookingRequest } from "@/models/hotelBookingRequest";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const data = await request.json();
    const requiredFields = [
      "name",
      "email",
      "phone",
      "city",
      "checkInDate",
      "checkOutDate",
      "guests",
      "roomType",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate check-in and check-out dates
    const checkInDate = new Date(data.checkInDate);
    const checkOutDate = new Date(data.checkOutDate);
    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        { message: "Check-out date must be after check-in date" },
        { status: 400 }
      );
    }

    // Create a new hotel booking request
    const hotelBookingRequest = await HotelBookingRequest.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      checkInDate,
      checkOutDate,
      guests: Number(data.guests),
      roomType: data.roomType,
      mealPlan: data.mealPlan || "",
      accessibility: data.accessibility || "",
      additionalInfo: data.additionalInfo || "",
    });

    const to = process.env.ADMIN_EMAIL || "admin@yourdomain.com"; // Replace with your admin email or configure in .env
    const subject = "New Hotel Booking Request Submission";
    const emailData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      checkInDate: checkInDate.toLocaleDateString(),
      checkOutDate: checkOutDate.toLocaleDateString(),
      guests: data.guests,
      roomType: data.roomType,
      mealPlan: data.mealPlan || "None",
      accessibility: data.accessibility || "None",
      additionalInfo: data.additionalInfo || "None",
    };

    // Send email notification
    const emailResult = await sendEmail(to, subject, emailData);
    if (!emailResult.success) {
      console.error("Failed to send email:", emailResult.error);
    }

    return NextResponse.json(
      { message: "Hotel booking request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting hotel booking request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
