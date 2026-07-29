const express = require('express');
const router = express.Router();
const { getChapterById } = require('../controllers/chapterController');
const { getGamesByChapter } = require('../controllers/gameController');

router.get('/:id', getChapterById);
router.get('/:chapterId/games', getGamesByChapter);

module.exports = router;
