const express = require('express');
const router = express.Router();
const { getInsights } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.post('/insights', protect, getInsights);

module.exports = router;