const express = require('express');
const { submitQuoteRequest } = require('../controllers/quoteController');
const { validateQuoteInput } = require('../middleware/validateInput');
const { formRateLimiter } = require('../middleware/rateLimiter');

const { uploadDrawing } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/quote', formRateLimiter, uploadDrawing, validateQuoteInput, submitQuoteRequest);

module.exports = router;
