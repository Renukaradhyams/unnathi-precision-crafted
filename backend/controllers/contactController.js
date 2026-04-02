const { sendToCompany, sendAutoReply } = require('../services/emailService');
const { getContactTemplate } = require('../utils/emailTemplates');

async function submitContact(req, res) {
  const data = req.validatedData;

  try {
    await sendToCompany({
      subject: `New Contact Form Submission - ${data.name}`,
      html: getContactTemplate(data),
      replyTo: data.email,
    });

    if (data.email) {
      await sendAutoReply({
        to: data.email,
        name: data.name,
        projectType: 'contact enquiry',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you for contacting Unnathi CNC. Our team will reach out shortly.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'We could not process your request right now. Please try again later.',
    });
  }
}

module.exports = {
  submitContact,
};
