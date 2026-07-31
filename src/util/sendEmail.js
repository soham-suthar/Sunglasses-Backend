import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  console.log("Sending email to:", to);

  const { data, error } = await resend.emails.send({
    from: "Sunglasses Store <onboarding@resend.dev>",
    to,
    subject,
    html,
  });

  if (error) {
    console.error("Resend Error:", error);
    throw new Error(error.message);
  }

  console.log("Email sent successfully:", data.id);

  return data;
};

export default sendEmail;
