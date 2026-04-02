const express = require('express');
const { submitCareerApplication } = require('../controllers/careersController');
const { validateCareersInput } = require('../middleware/validateInput');
const { formRateLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/careers', formRateLimiter, validateCareersInput, submitCareerApplication);

module.exports = router;
