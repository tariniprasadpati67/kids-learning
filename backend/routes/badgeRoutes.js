const express = require('express');
const router = express.Router();
const { getAllBadges, getMyBadges } = require('../controllers/badgeController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/', getAllBadges);
router.get('/me', requireAuth, getMyBadges);

module.exports = router;
