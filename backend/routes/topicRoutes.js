const express = require('express');
const router = express.Router();
const { getTopicsByChapter, getTopicById } = require('../controllers/topicController');

router.get('/chapter/:chapterId', getTopicsByChapter);
router.get('/:id', getTopicById);

module.exports = router;
