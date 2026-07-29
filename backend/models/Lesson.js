const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
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
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  lessonNumber: {
    type: Number,
    default: 1
  },
  title: {
    type: String,
    required: true
  },
  odiaTitle: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

lessonSchema.index({ classNumber: 1, bookId: 1, chapterId: 1, topicId: 1 });

module.exports = mongoose.model('Lesson', lessonSchema);
