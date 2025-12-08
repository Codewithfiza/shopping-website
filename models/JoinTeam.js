const mongoose = require('mongoose');

const JoinTeamSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  skills: { type: String, required: true },
  experience: { type: String },
  reason: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("JoinTeam", JoinTeamSchema);
