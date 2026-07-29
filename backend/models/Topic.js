const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
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
  topicNumber: {
    type: Number,
    required: true,
    default: 1
  },
  title: {
    type: String,
    required: true
  },
  odiaTitle: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  description: {
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

topicSchema.index({ classNumber: 1, subjectId: 1, bookId: 1, chapterId: 1 });

module.exports = mongoose.model('Topic', topicSchema);
