const express = require('express');
const router = express.Router();
const { getClasses, getClassById } = require('../controllers/classController');
const { getSubjectsByClass } = require('../controllers/subjectController');

router.get('/', getClasses);
router.get('/:id', getClassById);
router.get('/:classId/subjects', getSubjectsByClass);

module.exports = router;
