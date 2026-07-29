const User = require('../models/User');
const Game = require('../models/Game');
const Question = require('../models/Question');
const { getIsConnected, memoryStore } = require('../config/database');

// @desc Get Admin Overview Metrics
// @route GET /api/admin/dashboard
const getDashboardMetrics = async (req, res, next) => {
  try {
    if (getIsConnected()) {
      const totalStudents = await User.countDocuments({ role: 'student' });
      const totalGames = await Game.countDocuments({ isActive: true });
      const totalQuestions = await Question.countDocuments({ isActive: true });
      
      const starsResult = await User.aggregate([
        { $match: { role: 'student' } },
        { $group: { _id: null, totalStars: { $sum: '$totalStars' }, completedGames: { $sum: '$completedGames' } } }
      ]);

      const totalStars = starsResult.length > 0 ? starsResult[0].totalStars : 0;
      const totalCompletedGames = starsResult.length > 0 ? starsResult[0].completedGames : 0;

      return res.json({
        success: true,
        data: { totalStudents, totalGames, totalQuestions, totalStars, totalCompletedGames }
      });
    } else {
      const students = memoryStore.users.filter(u => u.role === 'student');
      const totalStudents = students.length;
      const totalGames = memoryStore.games.filter(g => g.isActive).length;
      const totalQuestions = memoryStore.questions.filter(q => q.isActive).length;
      const totalStars = students.reduce((sum, s) => sum + (s.totalStars || 0), 0);
      const totalCompletedGames = students.reduce((sum, s) => sum + (s.completedGames || 0), 0);

      return res.json({
        success: true,
        data: { totalStudents, totalGames, totalQuestions, totalStars, totalCompletedGames }
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Get Students List
// @route GET /api/admin/users
const getUsers = async (req, res, next) => {
  try {
    if (getIsConnected()) {
      const users = await User.find({ role: 'student' }).select('-passwordHash').sort({ createdAt: -1 });
      return res.json({ success: true, data: users });
    } else {
      const users = memoryStore.users
        .filter(u => u.role === 'student')
        .map(({ passwordHash, ...u }) => u);
      return res.json({ success: true, data: users });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Toggle Student Account Status
// @route PATCH /api/admin/users/:id/toggle-status
const toggleUserStatus = async (req, res, next) => {
  try {
    if (getIsConnected()) {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ success: false, message: 'ଛାତ୍ର ମିଳିଲେ ନାହିଁ' });
      user.isActive = !user.isActive;
      await user.save();
      return res.json({ success: true, message: `ଆକାଉଣ୍ଟ ${user.isActive ? 'ସକ୍ରିୟ' : 'ନିଷ୍କ୍ରିୟ'} କରାଗଲା।`, data: { id: user._id, isActive: user.isActive } });
    } else {
      const user = memoryStore.users.find(u => u._id === req.params.id);
      if (!user) return res.status(404).json({ success: false, message: 'ଛାତ୍ର ମିଳିଲେ ନାହିଁ' });
      user.isActive = !user.isActive;
      return res.json({ success: true, message: `ଆକାଉଣ୍ଟ ${user.isActive ? 'ସକ୍ରିୟ' : 'ନିଷ୍କ୍ରିୟ'} କରାଗଲା।`, data: { id: user._id, isActive: user.isActive } });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Get All Questions (Admin)
// @route GET /api/admin/questions
const getAdminQuestions = async (req, res, next) => {
  try {
    if (getIsConnected()) {
      const questions = await Question.find()
        .populate('classId', 'title classNumber')
        .populate('subjectId', 'name odiaName')
        .sort({ createdAt: -1 });
      return res.json({ success: true, data: questions });
    } else {
      return res.json({ success: true, data: memoryStore.questions });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Create Question (Admin)
// @route POST /api/admin/questions
const createQuestion = async (req, res, next) => {
  try {
    const { classId, subjectId, chapterId, gameId, question, options, correctAnswer, explanation, points } = req.body;

    if (!classId || !subjectId || !chapterId || !gameId || !question || !options || correctAnswer === undefined) {
      return res.status(400).json({
        success: false,
        message: 'ସମସ୍ତ ଆବଶ୍ୟକୀୟ ତଥ୍ୟ ପୂରଣ କରନ୍ତୁ।',
        error: 'MISSING_FIELDS'
      });
    }

    if (getIsConnected()) {
      const newQuestion = await Question.create({
        classId,
        subjectId,
        chapterId,
        gameId,
        question: question.trim(),
        options,
        correctAnswer: parseInt(correctAnswer, 10),
        explanation: explanation || ''
      });
      return res.status(201).json({ success: true, message: 'ପ୍ରଶ୍ନ ସଫଳତାର ସହ ଯୋଡ଼ାଗଲା!', data: newQuestion });
    } else {
      const newQ = {
        _id: `q_${Date.now()}`,
        classId,
        subjectId,
        chapterId,
        gameId,
        question: question.trim(),
        options,
        correctAnswer: parseInt(correctAnswer, 10),
        explanation: explanation || '',
        isActive: true
      };
      memoryStore.questions.push(newQ);
      return res.status(201).json({ success: true, message: 'ପ୍ରଶ୍ନ ସଫଳତାର ସହ ଯୋଡ଼ାଗଲା!', data: newQ });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Delete Question (Admin)
// @route DELETE /api/admin/questions/:id
const deleteQuestion = async (req, res, next) => {
  try {
    if (getIsConnected()) {
      await Question.findByIdAndDelete(req.params.id);
    } else {
      memoryStore.questions = memoryStore.questions.filter(q => q._id !== req.params.id);
    }
    res.json({ success: true, message: 'ପ୍ରଶ୍ନ ହଟାଇ ଦିଆଗଲା!' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDashboardMetrics,
  getUsers,
  toggleUserStatus,
  getAdminQuestions,
  createQuestion,
  deleteQuestion
};
