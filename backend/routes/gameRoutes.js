const express = require('express');
const router = express.Router();
const { getGameById, submitGameAnswers } = require('../controllers/gameController');
const { getQuestionsByGame } = require('../controllers/questionController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/:gameId', getGameById);
router.get('/:gameId/questions', getQuestionsByGame);
router.post('/:gameId/submit', requireAuth, submitGameAnswers);
router.post('/:gameId/complete', requireAuth, submitGameAnswers);

module.exports = router;
