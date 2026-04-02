const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeString(value) {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value).trim().replace(/\s+/g, ' ');
}

function sanitizeText(value) {
  return normalizeString(value).replace(/[<>]/g, '');
}

function validateEmail(value) {
  return EMAIL_REGEX.test(value);
}

function buildValidator({ requiredFields, optionalFields = [] }) {
  return (req, res, next) => {
    const payload = req.body && typeof req.body === 'object' ? req.body : {};
    const errors = [];
    const validatedData = {};

    requiredFields.forEach((field) => {
      const rawValue = payload[field];
      const value = sanitizeText(rawValue);

      if (!value) {
        errors.push(`${field} is required`);
        return;
      }

      if (field === 'email' && !validateEmail(value)) {
        errors.push('email must be a valid email address');
        return;
      }

      validatedData[field] = value;
    });

    optionalFields.forEach((field) => {
      const rawValue = payload[field];
      const value = sanitizeText(rawValue);

      if (value) {
        if (field === 'email' && !validateEmail(value)) {
          errors.push('email must be a valid email address');
          return;
        }

        validatedData[field] = value;
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please check your input and try again.',
        errors,
      });
    }

    req.validatedData = validatedData;
    return next();
  };
}

const validateContactInput = buildValidator({
  requiredFields: ['name', 'email', 'message'],
  optionalFields: ['phone', 'interestArea'],
});

const validateEnquiryInput = buildValidator({
  requiredFields: ['name', 'email', 'company', 'requirement'],
  optionalFields: ['phone', 'material', 'quantity', 'leadTime'],
});

const validateCareersInput = buildValidator({
  requiredFields: ['name', 'email', 'role', 'experience', 'message'],
  optionalFields: ['phone', 'skills', 'resumeLink'],
});

const validateQuoteInput = buildValidator({
  requiredFields: ['name', 'email', 'company', 'partName', 'material', 'quantity', 'notes'],
  optionalFields: ['phone', 'tolerance', 'leadTime', 'attachments', 'batchProduction'],
});

module.exports = {
  validateContactInput,
  validateEnquiryInput,
  validateCareersInput,
  validateQuoteInput,
};
