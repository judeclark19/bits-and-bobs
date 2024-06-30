import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

const { GMAIL_USER, GMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Use port 465 for secure connections
  secure: true, // Use true since port 465 uses SSL
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

const mailOptions = {
  from: GMAIL_USER,
  to: GMAIL_USER,
  subject: "New message from bits-and-bobs",
  text: "New message from bits-and-bobs"
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    mailOptions.text = `${JSON.stringify(body, null, 2)}`;

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(info);
        }
      });
    });

    return new Response(JSON.stringify({ "message sent": mailOptions.text }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred", { status: 500 });
  }
}
