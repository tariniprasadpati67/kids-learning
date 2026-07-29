const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  classNumber: { type: Number, required: true, unique: true, min: 1, max: 5 },
  title: { type: String, required: true }, // e.g. "ଶ୍ରେଣୀ ୧"
  description: { type: String, default: '' },
  icon: { type: String, default: '🎒' },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Class', classSchema);
