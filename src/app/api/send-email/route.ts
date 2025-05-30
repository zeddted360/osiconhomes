import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Define the expected shape of the form data
interface FormData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message?: string;
}

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service (e.g., "gmail", "sendgrid")
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email app password or API key
  },
});

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming form data
    const body: FormData = await req.json();

    // Validate required fields
    if (!body.name || !body.email || !body.service) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, email, and service are required",
        },
        { status: 400 }
      );
    }

    // Prepare email content with enhanced HTML template
    const mailOptions = {
      from: `"Form Submission" <${process.env.EMAIL_USER}>`, // Sender address
      to: process.env.EMAIL_USER, // Your email address to receive the form data
      subject: `New Form Submission from ${body.name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Form Submission</title>
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
            .highlight {
              background-color: #fef3c7;
              padding: 15px;
              border-left: 4px solid #f59e0b;
              margin: 15px 0;
              border-radius: 8px;
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
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <p><strong>Name:</strong> ${body.name}</p>
              <p><strong>Email:</strong> ${body.email}</p>
              <p><strong>Phone:</strong> ${body.phone || "Not provided"}</p>
              <p><strong>Service:</strong> ${body.service}</p>
              <div class="highlight">
                <p><strong>Message:</strong> ${
                  body.message || "Not provided"
                }</p>
              </div>
              <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <div class="footer">
              <p>Thank you for choosing our services!</p>
              <p>Contact us at <a href="mailto:${process.env.EMAIL_USER}">${
        process.env.EMAIL_USER
      }</a> for any inquiries.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Form submitted successfully! Email sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
