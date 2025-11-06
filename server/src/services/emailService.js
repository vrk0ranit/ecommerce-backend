import { transporter } from '../config/nodemailer.js';
import { FRONTEND_URL } from '../config/env.js';

export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"E-Shop" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html
    });
  } catch (err) {
    console.error('sendEmail error', err);
    throw err;
  }
};

export const sendResetPassword = async (to, token) => {
  const url = `${FRONTEND_URL}/reset-password?token=${token}`;
  const html = `<p>Click to reset your password: <a href="${url}">${url}</a></p>`;
  await sendEmail(to, 'Reset your password', html);
};
