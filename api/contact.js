/* global process */
// Serverless function to handle contact form submissions using Gmail SMTP
import nodemailer from 'nodemailer';

const MAX_NAME_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_CLIENTS = 1000;
const rateLimitClients = new Map();

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return value?.split(',')[0]?.trim() || req.socket?.remoteAddress || null;
}

function checkRateLimit(ip, now = Date.now()) {
  if (!ip) return null;

  for (const [clientIp, entry] of rateLimitClients) {
    if (entry.resetAt <= now) rateLimitClients.delete(clientIp);
  }

  const current = rateLimitClients.get(ip);
  if (!current) {
    if (rateLimitClients.size >= RATE_LIMIT_MAX_CLIENTS) {
      rateLimitClients.delete(rateLimitClients.keys().next().value);
    }
    rateLimitClients.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return null;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return Math.max(1, Math.ceil((current.resetAt - now) / 1000));
  }

  current.count += 1;
  return null;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, website } = req.body;

  // Honeypot field: real users never see or fill this input.
  // Pretend success so bots don't learn they were caught.
  if (website) {
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  }

  const retryAfter = checkRateLimit(getClientIp(req));
  if (retryAfter) {
    res.setHeader('Retry-After', String(retryAfter));
    return res.status(429).json({ error: 'Too many messages. Please try again later.' });
  }

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (name.length > MAX_NAME_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: 'Name or message is too long' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const { EMAIL_USER, EMAIL_PASSWORD } = process.env;

  if (!EMAIL_USER || !EMAIL_PASSWORD) {
    console.error('Missing Gmail configuration: EMAIL_USER or EMAIL_PASSWORD');
    return res.status(500).json({ error: 'Email service not configured. Please try again later.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    const safeName = escapeHtml(name);
    const safeMessage = escapeHtml(message);

    const subject = `Portfolio Contact: Message from ${name}`;
    const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #0d9488; border-bottom: 2px solid #0d9488; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
          </div>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `;

    const text = `
Name: ${name}
Email: ${email}

Message:
${message}
      `;

    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_USER,
      replyTo: email,
      subject,
      html,
      text,
    });

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully!'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      error: 'Failed to send email. Please try again later.'
    });
  }
}
