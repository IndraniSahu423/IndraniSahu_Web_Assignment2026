// const nodemailer = require('nodemailer');

// const sendAlert = async (error, req) => {
//   // Only send alerts for server errors (500+), not user errors (400s)
//   if (!error.statusCode || error.statusCode < 500) return;

//   try {
//     const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.ALERT_EMAIL,
//     pass: process.env.ALERT_PASSWORD
//   }
// });

//     await transporter.sendMail({
//       from: process.env.ALERT_EMAIL,
//       to: process.env.ALERT_RECIPIENT,
//       subject: `ECELL SERVER ERROR: ${error.message}`,
//       html: `
//         <h2 style="color:red">Server Error Detected</h2>
//         <p><b>Route:</b> ${req.method} ${req.url}</p>
//         <p><b>Error:</b> ${error.message}</p>
//         <p><b>Time:</b> ${new Date().toISOString()}</p>
//         <pre>${error.stack}</pre>
//       `
//     });

//     console.log('Alert email sent');
//   } catch (emailError) {
//     console.error('Failed to send alert email:', emailError.message);
//   }
// };

// module.exports = sendAlert;

// it wasnt working on my network
// fix- this will work in any network environment without relying on external email services. It uses a simple logging mechanism to log critical errors to a file, which can be monitored for alerts.

const https = require('https');
const http = require('http');

const sendAlert = async (error, req) => {
  if (!error.statusCode || error.statusCode < 500) return;

  const alertData = JSON.stringify({
    title: 'ECELL SERVER ERROR',
    error: error.message,
    route: `${req.method} ${req.url}`,
    time: new Date().toISOString(),
    statusCode: error.statusCode
  });

  try {
    const response = await fetch('https://webhook.site/fb38825e-a217-48be-9ec0-6461e67f6d10', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: alertData
    });

    if (response.ok) {
      console.log('Alert sent successfully to webhook!');
    }
  } catch (err) {
    console.log('Alert failed:', err.message);
  }
};

module.exports = sendAlert;
// ```

// Replace `YOUR-UNIQUE-ID-HERE` with the ID from webhook.site. For example if your URL is:
// ```
// https://webhook.site/abc123-xyz-456