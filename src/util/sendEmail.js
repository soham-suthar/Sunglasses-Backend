import { BrevoClient } from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

const sendEmail = async ({ to, subject, html }) => {
  console.log("Sending email to:", to);

  try {
    const response = await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        name: "Sunglasses Store",
        email: process.env.EMAIL_FROM,
      },

      to: [
        {
          email: to,
        },
      ],

      subject,
      htmlContent: html,
    });

    console.log("Email sent successfully:", response);

    return response;
  } catch (error) {
    console.error("Brevo error:", error.body || error.message);

    throw error;
  }
};

export default sendEmail;
