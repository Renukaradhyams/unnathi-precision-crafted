const express = require('express');
const { submitContact } = require('../controllers/contactController');
const { validateContactInput } = require('../middleware/validateInput');
const { formRateLimiter } = require('../middleware/rateLimiter');

const { uploadDrawing } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/contact', formRateLimiter, uploadDrawing, validateContactInput, submitContact);

module.exports = router;
