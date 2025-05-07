const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  employeeName: String,
  month: String,
  year: String,
  amount: String,
  status: String,
});

module.exports = mongoose.model('Salary', salarySchema);