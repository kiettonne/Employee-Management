const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  companyName: String,
  address: String,
  email: String,
  phone: String,
});

module.exports = mongoose.model('Settings', settingsSchema);