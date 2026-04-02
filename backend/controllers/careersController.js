const { sendToCompany, sendAutoReply } = require('../services/emailService');
const { getCareersTemplate } = require('../utils/emailTemplates');

async function submitCareerApplication(req, res) {
  const data = req.validatedData;

  try {
    await sendToCompany({
      subject: `New Career Application - ${data.role}`,
      html: getCareersTemplate(data),
      replyTo: data.email,
    });

    if (data.email) {
      await sendAutoReply({
        to: data.email,
        name: data.name,
        projectType: 'career application',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your application has been submitted successfully. We will get back to you soon.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to submit application currently. Please try again later.',
    });
  }
}

module.exports = {
  submitCareerApplication,
};
