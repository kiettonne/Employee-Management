const express = require('express');
const router = express.Router();
const Salary = require('../models/Salary');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const salaries = await Salary.find();
    res.json(salaries);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách lương' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const salary = new Salary(req.body);
    await salary.save();
    res.status(201).json(salary);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi thêm lương' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const salary = await Salary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!salary) return res.status(404).json({ error: 'Không tìm thấy lương' });
    res.json(salary);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi sửa lương' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const salary = await Salary.findByIdAndDelete(req.params.id);
    if (!salary) return res.status(404).json({ error: 'Không tìm thấy lương' });
    res.json({ message: 'Xóa lương thành công' });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi xóa lương' });
  }
});

module.exports = router;
