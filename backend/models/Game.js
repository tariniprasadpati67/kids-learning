const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  classNumber: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  gameCode: { type: String, required: true },
  title: { type: String, required: true },
  odiaTitle: { type: String, required: true },
  gameType: { 
    type: String, 
    enum: [
      'quiz',
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
    default: 'quiz'
  },
  description: { type: String, default: '' },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
  timeLimit: { type: Number, default: 60 },
  questionCount: { type: Number, default: 5 },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

gameSchema.index({ classNumber: 1, subjectId: 1, bookId: 1, chapterId: 1, topicId: 1 });

module.exports = mongoose.model('Game', gameSchema);
