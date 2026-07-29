const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  classNumber: { type: Number, required: true }, // 1 to 5 index for direct queries
  name: { type: String, required: true }, // e.g. "odia", "math"
  odiaName: { type: String, required: true }, // e.g. "ଓଡ଼ିଆ"
  icon: { type: String, default: '📚' },
  description: { type: String, default: '' },
  color: { type: String, default: 'linear-gradient(135deg, #FF6B6B, #FF8E53)' },
  order: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Subject', subjectSchema);
