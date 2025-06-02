require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


app.post('/submit', async (req, res) => {
  const { complaint } = req.body;

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
      subject: 'Mood Mailbox Complaint Registered',
      text: `New Complaint: ${complaint}`,
    });
    console.log('Email sent:', info.response);
    
    // Send success response to client
    res.status(200).send('Mood mail sent! 📨');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Failed to send mood mail.');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));