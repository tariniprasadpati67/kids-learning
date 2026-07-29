const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  badgeCode: { type: String, required: true, unique: true }, // e.g. "badge_first_game"
  name: { type: String, required: true },
  odiaName: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: '🏆' },
  requirementType: { 
    type: String, 
    enum: ['first_game', 'total_stars', 'completed_games', 'perfect_quiz', 'subject_completed', 'memory_master'], 
    required: true 
  },
  requirementValue: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Badge', badgeSchema);
