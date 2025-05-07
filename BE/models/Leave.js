const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  employeeName: String,
  leaveType: String,
  startDate: String,
  endDate: String,
  reason: String,
});

module.exports = mongoose.model('Leave', leaveSchema);