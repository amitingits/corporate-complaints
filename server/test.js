require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendTest() {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    let info = await transporter.sendMail({
      from: `"Mood Mailbox" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: 'Test Email',
      text: 'Hello! This is a test email.',
    });
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error:', error);
  }
}

sendTest();
