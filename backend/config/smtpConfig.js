const nodemailer = require('nodemailer');

const REQUIRED_SMTP_ENV_VARS = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];

function getResolvedSmtpEnv() {
  const resolved = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_FROM: process.env.SMTP_FROM || process.env.SMTP_USER,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || process.env.MAIL_RECEIVER,
  };

  return resolved;
}

function getMissingSmtpEnvVars() {
  const env = getResolvedSmtpEnv();
  const missing = [];

  REQUIRED_SMTP_ENV_VARS.forEach((key) => {
    if (!env[key]) {
      missing.push(key);
    }
  });

  if (!env.SMTP_FROM) {
    missing.push('SMTP_FROM (or SMTP_USER as fallback)');
  }

  if (!env.ADMIN_EMAIL) {
    missing.push('ADMIN_EMAIL (or MAIL_RECEIVER as fallback)');
  }

  return missing;
}

function getSmtpConfigError() {
  const missingVars = getMissingSmtpEnvVars();

  if (missingVars.length > 0) {
    return `SMTP is not configured correctly. Missing environment variables: ${missingVars.join(', ')}`;
  }

  const { SMTP_PORT } = getResolvedSmtpEnv();
  const portAsNumber = Number(SMTP_PORT);

  if (!Number.isInteger(portAsNumber) || portAsNumber <= 0) {
    return 'SMTP_PORT must be a valid positive integer.';
  }

  return null;
}

function createSmtpTransporter() {
  const env = getResolvedSmtpEnv();
  const portAsNumber = Number(env.SMTP_PORT) || 465;
  const secure = portAsNumber === 465;

  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: portAsNumber,
    secure,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
    tls: {
      minVersion: 'TLSv1.2',
    },
  });
}

const smtpTransporter = createSmtpTransporter();

async function verifySmtpConnection() {
  const configError = getSmtpConfigError();

  if (configError) {
    return {
      ok: false,
      message: configError,
    };
  }

  try {
    await smtpTransporter.verify();
    return {
      ok: true,
      message: 'SMTP connection verified successfully.',
    };
  } catch (error) {
    return {
      ok: false,
      message: `SMTP verification failed: ${error.message}`,
    };
  }
}

module.exports = {
  getResolvedSmtpEnv,
  getMissingSmtpEnvVars,
  getSmtpConfigError,
  smtpTransporter,
  verifySmtpConnection,
};
