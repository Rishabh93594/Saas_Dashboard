const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  matchId: {
    type: String,
    required: true,
    unique: true
  },
  teams: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&h=100&fit=crop'
  },
  status: {
    type: String,
    enum: ['Completed', 'Live', 'Scheduled'],
    default: 'Scheduled'
  },
  date: {
    type: String,
    required: true
  },
  score: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Match', MatchSchema);
