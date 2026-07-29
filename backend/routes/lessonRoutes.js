const express = require('express');
const router = express.Router();
const { getLessonsByTopic, getLessonsByChapter } = require('../controllers/lessonController');

router.get('/topic/:topicId', getLessonsByTopic);
router.get('/chapter/:chapterId', getLessonsByChapter);

module.exports = router;
