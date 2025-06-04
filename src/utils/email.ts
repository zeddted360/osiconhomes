import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail(
  to: string,
  subject: string,
  data: Record<string, any>
) {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <h2 style="color: #F97316; text-align: center;">${subject}</h2>
      <table style="width: 100%; border-collapse: collapse;">
        ${Object.entries(data)
          .map(
            ([key, value]) => `
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; text-transform: capitalize; color: #111827;">
                  ${key.replace(/([A-Z])/g, " $1").trim()}
                </td>
                <td style="padding: 8px; border: 1px solid #ddd; color: #374151;">
                  ${Array.isArray(value) ? value.join(", ") : value || "None"}
                </td>
              </tr>
            `
          )
          .join("")}
      </table>
      <p style="color: #374151; text-align: center; margin-top: 20px;">
        Submitted on: ${new Date().toLocaleString()}
      </p>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error: (error as Error).message };
  }
}
