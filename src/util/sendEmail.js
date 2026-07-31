import brevo from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async ({ to, subject, html }) => {
  const apiInstance = new brevo.TransactionalEmailsApi();

  apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY,
  );

  const email = new brevo.SendSmtpEmail();

  email.sender = {
    name: "Sunglasses Store",
    email: process.env.EMAIL_FROM,
  };

  email.to = [
    {
      email: to,
    },
  ];

  email.subject = subject;
  email.htmlContent = html;

  try {
    const response = await apiInstance.sendTransacEmail(email);

    console.log("Email sent successfully:", response.messageId);

    return response;
  } catch (error) {
    console.error("Brevo email error:", error.response?.body || error.message);

    throw error;
  }
};

export default sendEmail;
