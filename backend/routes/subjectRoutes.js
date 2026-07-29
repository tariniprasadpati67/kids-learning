const express = require('express');
const router = express.Router();
const { getSubjectById } = require('../controllers/subjectController');
const { getChaptersBySubject } = require('../controllers/chapterController');

router.get('/:id', getSubjectById);
router.get('/:subjectId/chapters', getChaptersBySubject);

module.exports = router;
