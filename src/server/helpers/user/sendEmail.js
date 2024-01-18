import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
dotenv.config();

const sendPwResetEmail = (recipient, resetLink) => {

    const transport = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS 
        }
      });

    const mailOptions = {
        from: "info@summitselector.com",
        to: `${recipient}`,
        subject: "Reset password",
        text: `This is a test email sent using Nodemailer with Mailtrap. Reset your password by clicking this link: ${resetLink}. This link expires in 1 hour.`
        };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("email sent:", info.messageId);
        });
}

export default sendPwResetEmail;
