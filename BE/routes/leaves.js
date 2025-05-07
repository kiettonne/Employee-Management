const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách nghỉ phép' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi thêm nghỉ phép' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!leave) return res.status(404).json({ error: 'Không tìm thấy nghỉ phép' });
    res.json(leave);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi sửa nghỉ phép' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave) return res.status(404).json({ error: 'Không tìm thấy nghỉ phép' });
    res.json({ message: 'Xóa nghỉ phép thành công' });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi xóa nghỉ phép' });
  }
});

module.exports = router;