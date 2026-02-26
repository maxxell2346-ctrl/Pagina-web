const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendVerificationCode(email, code) {
  // mail “simple” para dev
  const subject = "Tu código de verificación";
  const text = `Tu código es: ${code}. Vence en ${process.env.EMAIL_VERIFY_CODE_TTL_MIN} minutos.`;

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject,
    text,
  });
}

module.exports = { sendVerificationCode };