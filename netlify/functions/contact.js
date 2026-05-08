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

const jsonResponse = (statusCode, payload) => ({
  statusCode,
  headers,
  body: JSON.stringify(payload),
});

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, {});
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, {
      success: false,
      message: 'Method not allowed',
    });
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
      return jsonResponse(500, {
        success: false,
        message: 'Missing Gmail credentials in Netlify environment variables.',
      });
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

    return jsonResponse(200, {
      success: true,
      message: 'Message sent successfully!',
    });
  } catch (error) {
    console.error('Contact function error:', error);

    return jsonResponse(500, {
      success: false,
      message: error && error.message
        ? error.message
        : 'Failed to send message. Please try again later.',
    });
  }
};
