const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách nhân viên' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi thêm nhân viên' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) return res.status(404).json({ error: 'Không tìm thấy nhân viên' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi sửa nhân viên' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Không tìm thấy nhân viên' });
    res.json({ message: 'Xóa nhân viên thành công' });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi xóa nhân viên' });
  }
});

module.exports = router;