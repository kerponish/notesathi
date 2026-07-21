import nodemailer from "nodemailer";
import { EMAIL_USER, EMAIL_APP_PASSWORD } from "../config/constant";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!EMAIL_USER || !EMAIL_APP_PASSWORD) {
    return null;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD,
      },
    });
  }
  return transporter;
}

export async function sendPasswordResetEmail(to: string, code: string) {
  const mailer = getTransporter();
  if (!mailer) {
    throw new Error("Email is not configured");
  }

  await mailer.sendMail({
    from: `"Notesathi" <${EMAIL_USER}>`,
    to,
    subject: "Your Notesathi password reset code",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #7c3aed;">Reset your password</h2>
        <p>We received a request to reset your Notesathi password. Enter this code in the app to choose a new one. It expires in 10 minutes.</p>
        <p style="margin: 24px 0; font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #1B1B1F;">
          ${code}
        </p>
        <p style="color: #666; font-size: 13px;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}
