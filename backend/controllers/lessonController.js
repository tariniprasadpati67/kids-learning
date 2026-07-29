const Lesson = require('../models/Lesson');
const { getIsConnected, memoryStore } = require('../config/database');

// @desc Get Lessons by Topic ID or Chapter ID
// @route GET /api/lessons/topic/:topicId
const getLessonsByTopic = async (req, res, next) => {
  try {
    const { topicId } = req.params;
    let lessons = [];

    if (getIsConnected()) {
      lessons = await Lesson.find({ topicId, isActive: true }).sort({ lessonNumber: 1 });
    } else {
      lessons = memoryStore.lessons.filter(l => (l.topicId === topicId || l.topicId?._id === topicId) && l.isActive !== false);
    }

    if (!lessons || lessons.length === 0) {
      return res.json({
        success: true,
        count: 0,
        data: [],
        message: 'ଏହି ପାଠ୍ୟପୁସ୍ତକର ତଥ୍ୟ ଯୋଡାଯାଇନାହିଁ।'
      });
    }

    res.json({
      success: true,
      count: lessons.length,
      data: lessons
    });
  } catch (error) {
    next(error);
  }
};

const getLessonsByChapter = async (req, res, next) => {
  try {
    const { chapterId } = req.params;
    let lessons = [];

    if (getIsConnected()) {
      lessons = await Lesson.find({ chapterId, isActive: true }).sort({ lessonNumber: 1 });
    } else {
      lessons = memoryStore.lessons.filter(l => l.chapterId === chapterId && l.isActive !== false);
    }

    res.json({
      success: true,
      count: lessons.length,
      data: lessons
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getLessonsByTopic, getLessonsByChapter };
