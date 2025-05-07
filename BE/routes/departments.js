const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách phòng ban' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi thêm phòng ban' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!department) return res.status(404).json({ error: 'Không tìm thấy phòng ban' });
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi sửa phòng ban' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).json({ error: 'Không tìm thấy phòng ban' });
    res.json({ message: 'Xóa phòng ban thành công' });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi xóa phòng ban' });
  }
});

module.exports = router;