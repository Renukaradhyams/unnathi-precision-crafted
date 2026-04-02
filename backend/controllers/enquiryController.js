const { sendToCompany, sendAutoReply } = require('../services/emailService');
const { getEnquiryTemplate } = require('../utils/emailTemplates');

async function submitEnquiry(req, res) {
  const data = req.validatedData;

  try {
    await sendToCompany({
      subject: `New Manufacturing Enquiry - ${data.company}`,
      html: getEnquiryTemplate(data),
      replyTo: data.email,
    });

    let autoReplySent = false;
    if (data.email) {
      try {
        await sendAutoReply({
          to: data.email,
          name: data.name,
          projectType: 'manufacturing enquiry',
        });
        autoReplySent = true;
      } catch (error) {
        console.error('Auto-reply email failed for enquiry:', error.message);
      }
    }

    return res.status(200).json({
      success: true,
      autoReplySent,
      message: autoReplySent
        ? 'Your enquiry has been submitted. A confirmation email has been sent to your inbox.'
        : 'Your enquiry has been submitted. Our engineering team will contact you soon.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to submit enquiry at the moment. Please try again later.',
    });
  }
}

module.exports = {
  submitEnquiry,
};
