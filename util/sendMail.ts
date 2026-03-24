"use server"
import { Resend } from "resend";

interface SendMailProps {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
}

// Lazy initialization to avoid crash when RESEND_API_KEY is not set
let resend: Resend | null = null;

function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured - email sending disabled");
    return null;
  }
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function sendMail({ to, subject, text, html }: SendMailProps) {
  try {
    const client = getResendClient();
    if (!client) {
      console.warn("Email not sent - Resend not configured");
      return { success: false, error: "Email service not configured" };
    }

    if (!html) {
      throw new Error("You must provide either react or html content");
    }

    const data = await client.emails.send({
      from: "Sara3com <info@hellena.app>",
      to,
      subject,
      html: html || text,
    });

    console.log("E-mail enviado:", data.data?.id);
    return true;

  } catch (error) {
    console.error("Email error:", error);

    return {
      success: false,
      error: "Failed to send email",
    };
  }
}