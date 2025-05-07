const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({ companyName: '', address: '', email: '', phone: '' });
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy cài đặt' });
  }
});

router.put('/', authenticateToken, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      settings = await Settings.findOneAndUpdate({}, req.body, { new: true });
    }
    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi cập nhật cài đặt' });
  }
});

module.exports = router;