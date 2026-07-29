const express = require('express');
const router = express.Router();
const { getQuestionsByGame } = require('../controllers/questionController');

router.get('/game/:gameId', getQuestionsByGame);

module.exports = router;
