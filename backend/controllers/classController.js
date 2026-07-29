const Class = require('../models/Class');
const { getIsConnected, memoryStore } = require('../config/database');

// @desc Get All Active Classes (1 to 5)
// @route GET /api/classes
const getClasses = async (req, res, next) => {
  try {
    if (getIsConnected()) {
      const classes = await Class.find({ isActive: true }).sort({ classNumber: 1 });
      return res.json({ success: true, data: classes });
    } else {
      const classes = memoryStore.classes.filter(c => c.isActive).sort((a, b) => a.classNumber - b.classNumber);
      return res.json({ success: true, data: classes });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Get Class by ID or Class Number
// @route GET /api/classes/:id
const getClassById = async (req, res, next) => {
  try {
    const param = req.params.id;
    let cls;

    if (getIsConnected()) {
      if (!isNaN(param)) {
        cls = await Class.findOne({ classNumber: parseInt(param, 10), isActive: true });
      } else {
        cls = await Class.findById(param);
      }
    } else {
      if (!isNaN(param)) {
        cls = memoryStore.classes.find(c => c.classNumber === parseInt(param, 10) && c.isActive);
      } else {
        cls = memoryStore.classes.find(c => c._id === param);
      }
    }

    if (!cls) {
      return res.status(404).json({
        success: false,
        message: 'ଶ୍ରେଣୀ ମିଳିଲା ନାହିଁ।',
        error: 'CLASS_NOT_FOUND'
      });
    }

    res.json({ success: true, data: cls });
  } catch (err) {
    next(err);
  }
};

module.exports = { getClasses, getClassById };
