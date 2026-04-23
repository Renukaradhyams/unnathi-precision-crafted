const fs = require('fs');
const { sendToCompany, sendAutoReply } = require('../services/emailService');
const { getContactTemplate } = require('../utils/emailTemplates');

async function submitContact(req, res) {
  const data = req.validatedData;
  const file = req.file;

  try {
    const attachments = [];
    if (file) {
      attachments.push({
        filename: file.originalname,
        path: file.path,
      });
    }

    await sendToCompany({
      subject: `New Contact Form Submission - ${data.name}`,
      html: getContactTemplate(data),
      replyTo: data.email,
      attachments,
    });

    if (data.email) {
      try {
        await sendAutoReply({
          to: data.email,
          name: data.name,
          projectType: 'contact enquiry',
        });
      } catch (autoReplyError) {
        console.error('Auto-reply failed for contact:', autoReplyError.message);
      }
    }

    // Cleanup: Delete the temp file after email is sent
    if (file) {
      fs.unlink(file.path, (err) => {
        if (err) console.error('Error deleting temp file after contact submission:', err);
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you for contacting Unnathi CNC. Our team will reach out shortly.',
    });
  } catch (error) {
    // Ensure cleanup even on error
    if (file) {
      fs.unlink(file.path, () => {});
    }
    
    console.error('Contact submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'We could not process your request right now. Please try again later.',
    });
  }
}

module.exports = {
  submitContact,
};
