import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const user = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendMail = async (mail) => {
  const sentMail = await transporter.sendMail(mail);

  console.log(`Message sent:${sentMail.messageId}`);
  console.log(`Preview URL:${nodemailer.getTestMessageUrl(sentMail)}`);

  return sentMail;
};
