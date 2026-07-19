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

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const mailer = getTransporter();
  if (!mailer) {
    throw new Error("Email is not configured");
  }

  await mailer.sendMail({
    from: `"Notesathi" <${EMAIL_USER}>`,
    to,
    subject: "Reset your Notesathi password",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #7c3aed;">Reset your password</h2>
        <p>We received a request to reset your Notesathi password. Click the button below to choose a new one. This link expires in 1 hour.</p>
        <p style="margin: 24px 0;">
          <a href="${resetUrl}" style="background: #7c3aed; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Reset Password
          </a>
        </p>
        <p style="color: #666; font-size: 13px;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}
