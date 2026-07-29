const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/me', requireAuth, getUserProfile);
router.patch('/me', requireAuth, updateUserProfile);

module.exports = router;
