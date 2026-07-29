const Chapter = require('../models/Chapter');
const { getIsConnected, memoryStore } = require('../config/database');

// @desc Get Chapters for Subject
// @route GET /api/subjects/:subjectId/chapters
const getChaptersBySubject = async (req, res, next) => {
  try {
    const { subjectId } = req.params;

    if (getIsConnected()) {
      const chapters = await Chapter.find({ subjectId, isActive: true }).sort({ order: 1 });
      return res.json({ success: true, data: chapters });
    } else {
      const chapters = memoryStore.chapters
        .filter(c => (c.subjectId === subjectId || c.subjectId?._id === subjectId) && (c.isActive !== false))
        .sort((a, b) => (a.chapterNumber || a.order || 0) - (b.chapterNumber || b.order || 0));
      return res.json({ success: true, data: chapters });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Get Chapter by ID
// @route GET /api/chapters/:id
const getChapterById = async (req, res, next) => {
  try {
    let chapter;
    if (getIsConnected()) {
      chapter = await Chapter.findById(req.params.id);
    } else {
      chapter = memoryStore.chapters.find(c => c._id === req.params.id);
    }

    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: 'ଅଧ୍ୟାୟ ମିଳିଲା ନାହିଁ।',
        error: 'CHAPTER_NOT_FOUND'
      });
    }

    res.json({ success: true, data: chapter });
  } catch (err) {
    next(err);
  }
};

module.exports = { getChaptersBySubject, getChapterById };
