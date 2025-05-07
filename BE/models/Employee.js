const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  position: String,
  department: String,
  salary: String,
});

module.exports = mongoose.model('Employee', employeeSchema);