import config from '../config';
import nodemailer from 'nodemailer';

export const sendMail = async ({
  to,
  subject,
  message,
}: {
  to: string;
  subject: string;
  message: string;
}) => {
  try {
    const mailOptions = {
      from: config.mail.nodemailer_email,
      to: to,
      subject: subject,
      text: message,
    };

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      service: 'gmail',
      secure: true,
      auth: {
        user: config.mail.nodemailer_email,
        pass: config.mail.email_app_password,
      },
    });

    const res = await transporter.sendMail(mailOptions);
    return res;
  } catch (error) {
    return false;
  }
};
