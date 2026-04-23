const fs = require('fs');
const { sendToCompany, sendAutoReply } = require('../services/emailService');
const { getQuoteTemplate } = require('../utils/emailTemplates');

async function submitQuoteRequest(req, res) {
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
      subject: `New Industrial Quote Request - ${data.partName}`,
      html: getQuoteTemplate(data),
      replyTo: data.email,
      attachments,
    });

    if (data.email) {
      try {
        await sendAutoReply({
          to: data.email,
          name: data.name,
          projectType: 'industrial quote request',
        });
      } catch (autoReplyError) {
        console.error('Auto-reply failed for quote:', autoReplyError.message);
      }
    }

    // Cleanup: Delete the temp file after email is sent
    if (file) {
      fs.unlink(file.path, (err) => {
        if (err) console.error('Error deleting temp file after quote submission:', err);
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your quote request is received. Our team will review and share details soon.',
    });
  } catch (error) {
    // Ensure cleanup even on error
    if (file) {
      fs.unlink(file.path, () => {});
    }
    
    console.error('Quote submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to submit quote request currently. Please try again later.',
    });
  }
}

module.exports = {
  submitQuoteRequest,
};
