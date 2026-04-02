const { sendToCompany, sendAutoReply } = require('../services/emailService');
const { getQuoteTemplate } = require('../utils/emailTemplates');

async function submitQuoteRequest(req, res) {
  const data = req.validatedData;

  try {
    await sendToCompany({
      subject: `New Industrial Quote Request - ${data.partName}`,
      html: getQuoteTemplate(data),
      replyTo: data.email,
    });

    if (data.email) {
      await sendAutoReply({
        to: data.email,
        name: data.name,
        projectType: 'industrial quote request',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your quote request is received. Our team will review and share details soon.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to submit quote request currently. Please try again later.',
    });
  }
}

module.exports = {
  submitQuoteRequest,
};
