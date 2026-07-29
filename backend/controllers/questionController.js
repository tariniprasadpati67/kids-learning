const Question = require('../models/Question');
const { getIsConnected, memoryStore } = require('../config/database');

// @desc Get Questions for a Game
// @route GET /api/games/:gameId/questions
const getQuestionsByGame = async (req, res, next) => {
  try {
    const { gameId } = req.params;

    if (getIsConnected()) {
      const questions = await Question.find({ gameId, isActive: true })
        .sort({ createdAt: 1 });
      return res.json({ success: true, data: questions });
    } else {
      const questions = memoryStore.questions
        .filter(q => q.gameId === gameId && (q.isActive !== false));
      return res.json({ success: true, data: questions });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getQuestionsByGame };
