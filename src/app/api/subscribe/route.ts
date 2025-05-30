import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import Subscriber, { ISubscriber } from "@/models/subScriber";
import { connectDb } from "@/utils/connectDb";


// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Validate email format
const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI || "", {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  });
};

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { email } = await req.json();

    // Validate email
    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDb();

    // Check for existing subscriber
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 409 }
      );
    }
console.log(req.headers.get("x-forwarded-for"), req.headers.get("x-real-ip"));
    // Create new subscriber
    const subscriber: ISubscriber = new Subscriber({
      email,
      source: "footer", // Matches Footer context
      ipAddress: req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || undefined,
    });
    await subscriber.save();

    // Prepare confirmation email
    const mailOptions = {
      from: `"Osicon Homes Newsletter" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Osicon Homes Newsletter!",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Osicon Homes Newsletter</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: 'Arial', 'Helvetica', sans-serif;
              background-color: #f4f4f4;
              color: #333333;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #f59e0b;
            }
            .header {
              background: linear-gradient(to right, #f59e0b, #f97316);
              padding: 20px;
              text-align: center;
              color: #ffffff;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: bold;
            }
            .content {
              padding: 30px;
              text-align: center;
            }
            .content p {
              margin: 10px 0;
              font-size: 16px;
              line-height: 1.6;
            }
            .content strong {
              color: #1f2937;
              font-weight: 600;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background: linear-gradient(to right, #f59e0b, #f97316);
              color: #ffffff;
              text-decoration: none;
              border-radius: 8px;
              font-size: 16px;
              font-weight: 600;
              margin: 20px 0;
            }
            .button:hover {
              background: linear-gradient(to right, #f97316, #ef4444);
            }
            .footer {
              background-color: #1f2937;
              color: #ffffff;
              text-align: center;
              padding: 15px;
              font-size: 14px;
            }
            .footer a {
              color: #f59e0b;
              text-decoration: none;
              font-weight: 600;
            }
            .footer a:hover {
              text-decoration: underline;
            }
            @media only screen and (max-width: 600px) {
              .container {
                margin: 10px;
              }
              .header h1 {
                font-size: 20px;
              }
              .content {
                padding: 20px;
              }
              .content p {
                font-size: 14px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Osicon Homes!</h1>
            </div>
            <div class="content">
              <p><strong>Thank you for subscribing to our newsletter!</strong></p>
              <p>
                You're now part of the Osicon Homes community. Get ready to receive
                exclusive updates on premium properties, market insights, and real estate tips.
              </p>
              <p>
                Stay tuned for our latest offerings and let us help you make your
                real estate dreams a reality.
              </p>
              <a href="https://osiconhomes.com" class="button">Explore Our Services</a>
            </div>
            <div class="footer">
              <p>Osicon Homes © ${new Date().getFullYear()}</p>
              <p>
                <a href="mailto:info@osiconhomes.com">info@osiconhomes.com</a> | 
                <a href="tel:+2349132502360">+234 913 250 2360</a>
              </p>
              <p>
                <a href="https://osiconhomes.com/unsubscribe?email=${encodeURIComponent(
                  email
                )}">Unsubscribe</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Welcome to Osicon Homes Newsletter!
        
        Thank you for subscribing! You're now part of the Osicon Homes community.
        Get ready to receive exclusive updates on premium properties, market insights, and real estate tips.
        
        Explore our services: https://osiconhomes.com
        Contact us: info@osiconhomes.com | +234 913 250 2360
        Unsubscribe: https://osiconhomes.com/unsubscribe?email=${encodeURIComponent(
          email
        )}
      `,
    };

    // Send confirmation email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Subscription successful! Confirmation email sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing subscription:", error);
    return NextResponse.json(
      { error: "Failed to process subscription. Please try again later." },
      { status: 500 }
    );
  }
}
