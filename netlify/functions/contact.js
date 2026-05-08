const nodemailer = require('nodemailer');

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Method not allowed',
      }),
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const {
      name,
      email,
      company,
      website,
      service,
      budget,
      meetingTime,
      message,
    } = data;

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error('Missing Gmail credentials in environment variables.');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New Lead: ${name || 'Website'} from ${company || 'Website'}`,
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Message sent successfully!',
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Failed to send message. Please try again later.',
      }),
    };
  }
};
