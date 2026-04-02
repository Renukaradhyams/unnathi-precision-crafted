const express = require('express');
const { submitEnquiry } = require('../controllers/enquiryController');
const { validateEnquiryInput } = require('../middleware/validateInput');
const { formRateLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/enquiry', formRateLimiter, validateEnquiryInput, submitEnquiry);

module.exports = router;
