const Subject = require('../models/Subject');
const { getIsConnected, memoryStore } = require('../config/database');

// @desc Get Subjects for a Class
// @route GET /api/classes/:classId/subjects
const getSubjectsByClass = async (req, res, next) => {
  try {
    const { classId } = req.params;

    if (getIsConnected()) {
      let query = { isActive: true };
      if (!isNaN(classId)) {
        query.classNumber = parseInt(classId, 10);
      } else {
        query.classId = classId;
      }
      const subjects = await Subject.find(query).sort({ order: 1 });
      return res.json({ success: true, data: subjects });
    } else {
      let subjects;
      if (!isNaN(classId)) {
        // Match by classNumber OR classId string (e.g. 'c1')
        subjects = memoryStore.subjects.filter(s =>
          (s.classNumber === parseInt(classId, 10) || s.classId === `c${classId}`) &&
          (s.isActive !== false)
        );
      } else {
        subjects = memoryStore.subjects.filter(s =>
          s.classId === classId && (s.isActive !== false)
        );
      }
      subjects.sort((a, b) => (a.order || 0) - (b.order || 0));
      return res.json({ success: true, data: subjects });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Get Single Subject by ID
// @route GET /api/subjects/:id
const getSubjectById = async (req, res, next) => {
  try {
    let subject;
    if (getIsConnected()) {
      subject = await Subject.findById(req.params.id);
    } else {
      subject = memoryStore.subjects.find(s => s._id === req.params.id);
    }

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'ବିଷୟ ମିଳିଲା ନାହିଁ।',
        error: 'SUBJECT_NOT_FOUND'
      });
    }

    res.json({ success: true, data: subject });
  } catch (err) {
    next(err);
  }
};

module.exports = { getSubjectsByClass, getSubjectById };
