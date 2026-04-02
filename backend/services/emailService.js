const { smtpTransporter, getSmtpConfigError, getResolvedSmtpEnv } = require('../config/smtpConfig');
const { getAutoReplyTemplate } = require('../utils/emailTemplates');

function htmlToText(html = '') {
  return String(html)
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#039;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function getFromAddress() {
  const { SMTP_FROM } = getResolvedSmtpEnv();
  return `"Unnathi CNC Website" <${SMTP_FROM}>`;
}

async function sendToCompany({ subject, html, replyTo }) {
  const configError = getSmtpConfigError();

  if (configError) {
    throw new Error(configError);
  }

  const { ADMIN_EMAIL } = getResolvedSmtpEnv();

  return smtpTransporter.sendMail({
    from: getFromAddress(),
    to: ADMIN_EMAIL,
    subject,
    html,
    text: htmlToText(html),
    replyTo: replyTo || undefined,
  });
}

async function sendAutoReply({ to, name, projectType }) {
  if (!to) {
    return null;
  }

  const configError = getSmtpConfigError();

  if (configError) {
    throw new Error(configError);
  }

  const subject = 'Thank you for contacting Unnathi CNC';
  const html = getAutoReplyTemplate({ name, projectType });

  return smtpTransporter.sendMail({
    from: getFromAddress(),
    to,
    subject,
    html,
    text: htmlToText(html),
  });
}

module.exports = {
  htmlToText,
  sendToCompany,
  sendAutoReply,
};
