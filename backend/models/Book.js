const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
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
  subjectName: {
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
  code: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  coverImage: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

bookSchema.index({ classNumber: 1, subjectId: 1 });

module.exports = mongoose.model('Book', bookSchema);
