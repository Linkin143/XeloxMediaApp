// ===== XELOX MEDIA — STATIC SERVER =====
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Verify transporter credentials on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('');
    console.error('  ⚠️  EMAIL AUTH FAILED:', error.message);
    console.error('  ➡  Make sure your GMAIL_APP_PASSWORD in .env is correct.');
    console.error('  ➡  Generate a new one at: https://myaccount.google.com/apppasswords');
    console.error('');
  } else {
    console.log('  ✅ Email transporter is ready');
  }
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, website, service, budget, meetingTime, message } = req.body;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to yourself
      replyTo: email, // So you can reply directly to the sender
      subject: `New Lead: ${name} from ${company || 'Website'}`,
      html: `
        <h2>New Strategy Meeting Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name || 'N/A')}</p>
        <p><strong>Email:</strong> ${escapeHtml(email || 'N/A')}</p>
        <p><strong>Company:</strong> ${escapeHtml(company || 'N/A')}</p>
        <p><strong>Website:</strong> ${escapeHtml(website || 'N/A')}</p>
        <p><strong>Service:</strong> ${escapeHtml(service || 'N/A')}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budget || 'N/A')}</p>
        <p><strong>Meeting Time:</strong> ${escapeHtml(meetingTime || 'N/A')}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(message || 'N/A')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    console.error('Full error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('  ╔═══════════════════════════════════════╗');
  console.log('  ║   XELOX MEDIA — Server Running        ║');
  console.log(`  ║   http://localhost:${PORT}               ║`);
  console.log('  ╚═══════════════════════════════════════╝');
  console.log('');
});
