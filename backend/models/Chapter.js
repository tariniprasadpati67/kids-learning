const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  classNumber: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5]
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  chapterNumber: {
    type: Number,
    required: true,
    default: 1
  },
  chapterCode: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  odiaTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

chapterSchema.index({ classNumber: 1, subjectId: 1, bookId: 1 });

module.exports = mongoose.model('Chapter', chapterSchema);
