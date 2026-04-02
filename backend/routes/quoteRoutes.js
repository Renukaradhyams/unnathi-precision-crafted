const express = require('express');
const { submitQuoteRequest } = require('../controllers/quoteController');
const { validateQuoteInput } = require('../middleware/validateInput');
const { formRateLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/quote', formRateLimiter, validateQuoteInput, submitQuoteRequest);

module.exports = router;
