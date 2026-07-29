const Progress = require('../models/Progress');
const User = require('../models/User');
const Subject = require('../models/Subject');
const Chapter = require('../models/Chapter');
const { getIsConnected, memoryStore } = require('../config/database');

// @desc Get Current Student's Progress Dashboard
// @route GET /api/progress/me
const getMyProgress = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (getIsConnected()) {
      const progressList = await Progress.find({ userId })
        .populate('subjectId', 'name odiaName')
        .populate('chapterId', 'title odiaTitle')
        .populate('gameId', 'title odiaTitle gameType');

      const userClass = req.user.classLevel || 1;
      const subjects = await Subject.find({ classNumber: userClass, isActive: true });

      const subjectProgress = {};
      for (const sub of subjects) {
        const subChapters = await Chapter.find({ subjectId: sub._id, isActive: true });
        const totalChapters = subChapters.length || 1;

        const completedInSub = progressList.filter(
          p => p.subjectId && p.subjectId._id.toString() === sub._id.toString() && p.completed
        ).length;

        const percentage = Math.round((completedInSub / totalChapters) * 100);

        subjectProgress[sub.name] = {
          subjectId: sub._id,
          name: sub.name,
          odiaName: sub.odiaName,
          icon: sub.icon,
          totalChapters,
          completedChapters: completedInSub,
          percentage: Math.min(percentage, 100)
        };
      }

      const lastProgress = await Progress.findOne({ userId })
        .sort({ lastPlayedAt: -1 })
        .populate('gameId')
        .populate('subjectId')
        .populate('chapterId');

      return res.json({
        success: true,
        data: {
          totalStars: req.user.totalStars,
          completedGames: req.user.completedGames,
          totalGamesPlayed: req.user.totalGames,
          subjectProgress,
          lastPlayed: lastProgress ? {
            game: lastProgress.gameId,
            subject: lastProgress.subjectId,
            chapter: lastProgress.chapterId,
            lastPlayedAt: lastProgress.lastPlayedAt
          } : null,
          progressList
        }
      });
    } else {
      // Memory Store fallback
      return res.json({
        success: true,
        data: {
          totalStars: req.user.totalStars || 15,
          completedGames: req.user.completedGames || 3,
          totalGamesPlayed: req.user.totalGames || 3,
          subjectProgress: {},
          lastPlayed: null,
          progressList: []
        }
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Safe Public Leaderboard
// @route GET /api/progress/leaderboard
const getLeaderboard = async (req, res, next) => {
  try {
    let topStudents = [];

    if (getIsConnected()) {
      topStudents = await User.find({ role: 'student', isActive: true })
        .select('name avatar classLevel totalStars completedGames')
        .sort({ totalStars: -1, completedGames: -1 })
        .limit(20);
    } else {
      topStudents = memoryStore.users
        .filter(u => u.role === 'student' && u.isActive)
        .sort((a, b) => b.totalStars - a.totalStars);
    }

    const formattedLeaderboard = topStudents.map((student, index) => ({
      rank: index + 1,
      name: student.name,
      avatar: student.avatar || '🎓',
      classLevel: `ଶ୍ରେଣୀ ${student.classLevel}`,
      stars: student.totalStars || 0,
      gamesCompleted: student.completedGames || 0
    }));

    res.json({
      success: true,
      data: formattedLeaderboard
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMyProgress, getLeaderboard };
