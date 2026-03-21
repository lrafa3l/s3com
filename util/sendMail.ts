"use server"
import { Resend } from "resend";

interface SendMailProps {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMail({ to, subject, text, html }: SendMailProps) {
  try {
    if (!html) {
      throw new Error("You must provide either react or html content");
    }

    const data = await resend.emails.send({
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