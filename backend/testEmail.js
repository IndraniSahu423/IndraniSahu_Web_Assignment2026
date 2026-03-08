require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.ALERT_EMAIL,
    pass: process.env.ALERT_PASSWORD
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log('Connection FAILED:', error.message);
  } else {
    console.log('Connection SUCCESS! Sending test email...');
    
    transporter.sendMail({
      from: process.env.ALERT_EMAIL,
      to: process.env.ALERT_RECIPIENT,
      subject: 'Test Alert Email',
      text: 'If you see this, email alerts are working!'
    }, (err, info) => {
      if (err) {
        console.log('Send FAILED:', err.message);
      } else {
        console.log('Email SENT successfully!', info.messageId);
      }
    });
  }
});