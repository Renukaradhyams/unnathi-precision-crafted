const express = require('express');
const { submitContact } = require('../controllers/contactController');
const { validateContactInput } = require('../middleware/validateInput');
const { formRateLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/contact', formRateLimiter, validateContactInput, submitContact);

module.exports = router;
