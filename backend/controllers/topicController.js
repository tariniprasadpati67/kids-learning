const Topic = require('../models/Topic');
const { getIsConnected, memoryStore } = require('../config/database');

// @desc Get Topics by Chapter ID
// @route GET /api/topics/chapter/:chapterId
const getTopicsByChapter = async (req, res, next) => {
  try {
    const { chapterId } = req.params;

    if (getIsConnected()) {
      const topics = await Topic.find({ chapterId, isActive: true }).sort({ topicNumber: 1 });
      return res.json({ success: true, data: topics });
    } else {
      const topics = memoryStore.topics
        .filter(t => t.chapterId === chapterId && (t.isActive !== false))
        .sort((a, b) => a.topicNumber - b.topicNumber);
      return res.json({ success: true, data: topics });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Get Single Topic by ID
// @route GET /api/topics/:id
const getTopicById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let topic;

    if (getIsConnected()) {
      topic = await Topic.findById(id);
    } else {
      topic = memoryStore.topics.find(t => t._id === id);
    }

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'ଏହି ପାଠ୍ୟପୁସ୍ତକର ତଥ୍ୟ ଯୋଡାଯାଇନାହିଁ।',
        error: 'TOPIC_NOT_FOUND'
      });
    }

    return res.json({ success: true, data: topic });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTopicsByChapter,
  getTopicById
};
