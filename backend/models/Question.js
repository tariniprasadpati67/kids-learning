const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
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
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  },
  type: {
    type: String,
    enum: [
      'mcq',
      'true-false',
      'fill-blank',
      'matching',
      'picture',
      'ordering',
      'memory',
      'word-puzzle',
      'number-puzzle',
      'drag-drop',
      'timed-quiz'
    ],
    default: 'mcq'
  },
  question: {
    type: String,
    required: true,
    trim: true
  },
  questionNormalized: {
    type: String,
    trim: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  explanation: {
    type: String,
    default: ''
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  status: {
    type: String,
    enum: ['DRAFT', 'REVIEW', 'APPROVED', 'REJECTED'],
    default: 'APPROVED'
  },
  icon: {
    type: String,
    default: '❓'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

questionSchema.index({ classNumber: 1, subjectId: 1, bookId: 1, chapterId: 1, topicId: 1, status: 1 });

module.exports = mongoose.model('Question', questionSchema);
