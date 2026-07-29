const Game = require('../models/Game');
const Question = require('../models/Question');
const Attempt = require('../models/Attempt');
const Progress = require('../models/Progress');
const User = require('../models/User');
const Subject = require('../models/Subject');
const calculateScore = require('../utils/calculateScore');
const { checkAndAwardBadges } = require('../utils/badgeEngine');
const { getIsConnected, memoryStore } = require('../config/database');

// @desc Get Games for a Chapter
// @route GET /api/chapters/:chapterId/games
const getGamesByChapter = async (req, res, next) => {
  try {
    const { chapterId } = req.params;

    if (getIsConnected()) {
      const games = await Game.find({ chapterId, isActive: true });
      return res.json({ success: true, data: games });
    } else {
      const games = memoryStore.games.filter(g => g.chapterId === chapterId && (g.isActive !== false));
      return res.json({ success: true, data: games });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Get Single Game Details
// @route GET /api/games/:gameId
const getGameById = async (req, res, next) => {
  try {
    let game;
    if (getIsConnected()) {
      game = await Game.findById(req.params.gameId);
    } else {
      game = memoryStore.games.find(g => g._id === req.params.gameId);
    }

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'ଖେଳ ମିଳିଲା ନାହିଁ।',
        error: 'GAME_NOT_FOUND'
      });
    }

    res.json({ success: true, data: game });
  } catch (err) {
    next(err);
  }
};

// @desc Secure Game Answer Submission & Evaluation Engine
// @route POST /api/games/:gameId/submit
const submitGameAnswers = async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const { answers, timeTaken } = req.body;

    let game;
    let questions;

    if (getIsConnected()) {
      game = await Game.findById(gameId);
      questions = await Question.find({ gameId, isActive: true });
    } else {
      game = memoryStore.games.find(g => g._id === gameId);
      questions = memoryStore.questions.filter(q => q.gameId === gameId && q.isActive);
    }

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'ଖେଳ ମିଳିଲା ନାହିଁ।',
        error: 'GAME_NOT_FOUND'
      });
    }

    let correctAnswersCount = 0;
    const itemResults = [];

    questions.forEach((q) => {
      const qidStr = q._id.toString();
      const submittedAnswer = answers ? answers[qidStr] : undefined;
      const isCorrect = submittedAnswer === q.correctAnswer;

      if (isCorrect) correctAnswersCount++;

      itemResults.push({
        questionId: q._id,
        isCorrect,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || ''
      });
    });

    const totalQuestions = questions.length || 1;
    const wrongAnswersCount = totalQuestions - correctAnswersCount;
    const { score, percentage, stars } = calculateScore(correctAnswersCount, totalQuestions);

    let newBadges = [];

    if (req.user) {
      if (getIsConnected()) {
        await Attempt.create({
          userId: req.user._id,
          gameId: game._id,
          score,
          correctAnswers: correctAnswersCount,
          wrongAnswers: wrongAnswersCount,
          totalQuestions,
          percentage,
          stars,
          timeTaken: timeTaken || 0
        });

        let progress = await Progress.findOne({ userId: req.user._id, gameId: game._id });
        if (!progress) {
          progress = new Progress({
            userId: req.user._id,
            classId: game.classId,
            subjectId: game.subjectId,
            chapterId: game.chapterId,
            gameId: game._id,
            completed: true,
            bestScore: score,
            stars: stars,
            attempts: 1,
            lastPlayedAt: new Date()
          });
        } else {
          progress.attempts += 1;
          progress.completed = true;
          progress.lastPlayedAt = new Date();
          if (score > progress.bestScore) progress.bestScore = score;
          if (stars > progress.stars) progress.stars = stars;
        }
        await progress.save();

        const user = await User.findById(req.user._id);
        if (user) {
          user.totalGames += 1;
          user.completedGames += 1;
          const userProgressList = await Progress.find({ userId: user._id });
          user.totalStars = userProgressList.reduce((acc, p) => acc + p.stars, 0);
          await user.save();

          const subject = await Subject.findById(game.subjectId);
          newBadges = await checkAndAwardBadges(user, { percentage }, subject ? subject.name : '');
        }
      } else {
        // Memory store update
        const user = memoryStore.users.find(u => u._id === req.user._id);
        if (user) {
          user.totalGames += 1;
          user.completedGames += 1;
          user.totalStars += stars;
        }
      }
    }

    res.json({
      success: true,
      message: 'ଖେଳ ସମାପ୍ତ ହେଲା!',
      data: {
        score,
        correctAnswers: correctAnswersCount,
        wrongAnswers: wrongAnswersCount,
        totalQuestions,
        percentage,
        stars,
        timeTaken: timeTaken || 0,
        itemResults,
        newBadges
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getGamesByChapter, getGameById, submitGameAnswers };
