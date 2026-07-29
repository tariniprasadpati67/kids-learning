const express = require('express');
const router = express.Router();
const { getMyProgress, getLeaderboard } = require('../controllers/progressController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/me', requireAuth, getMyProgress);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
