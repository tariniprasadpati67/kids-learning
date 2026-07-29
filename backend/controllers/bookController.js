const Book = require('../models/Book');
const Class = require('../models/Class');
const { getIsConnected, memoryStore } = require('../config/database');

const getBooksByClass = async (req, res, next) => {
  try {
    const classNum = parseInt(req.params.classNumber);
    if (isNaN(classNum) || classNum < 1 || classNum > 5) {
      return res.status(400).json({ success: false, message: 'ଅସିଦ୍ଧ ଶ୍ରେଣୀ ସଂଖ୍ୟା (Class must be 1 to 5)' });
    }

    let books = [];
    if (getIsConnected()) {
      books = await Book.find({ classNumber: classNum, isActive: true }).sort({ createdAt: 1 });
    } else {
      books = memoryStore.books.filter(b => b.classNumber === classNum);
    }

    res.json({
      success: true,
      classNumber: classNum,
      count: books.length,
      data: books
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBooksByClass };
