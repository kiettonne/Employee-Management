import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LeaveManagement() {
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    employeeName: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/leaves', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaves(response.data);
    } catch (error) {
      setError('Lỗi khi lấy danh sách nghỉ phép');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(`http://localhost:5000/api/leaves/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/api/leaves', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchLeaves();
      setFormData({ employeeName: '', leaveType: '', startDate: '', endDate: '', reason: '' });
    } catch (error) {
      setError(editingId ? 'Lỗi khi sửa nghỉ phép' : 'Lỗi khi thêm nghỉ phép');
    }
  };

  const handleEdit = (leave) => {
    setEditingId(leave._id);
    setFormData({
      employeeName: leave.employeeName,
      leaveType: leave.leaveType,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
    });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/leaves/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLeaves();
    } catch (error) {
      setError('Lỗi khi xóa nghỉ phép');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý Nghỉ phép</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Thay đổi nghỉ phép' : 'Thêm nghỉ phép'}</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="employeeName"
            placeholder="Tên nhân viên"
            value={formData.employeeName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="leaveType"
            placeholder="Loại nghỉ phép"
            value={formData.leaveType}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="startDate"
            placeholder="Ngày bắt đầu"
            value={formData.startDate}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="endDate"
            placeholder="Ngày kết thúc"
            value={formData.endDate}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="reason"
            placeholder="Lý do"
            value={formData.reason}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {editingId ? 'Cập nhật nghỉ phép' : 'Thêm nghỉ phép'}
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên nhân viên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại nghỉ phép</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày bắt đầu</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày kết thúc</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lý do</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td className="px-6 py-4 whitespace-nowrap">{leave.employeeName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{leave.leaveType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{leave.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{leave.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{leave.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleEdit(leave)}
                    className="text-blue-500 hover:underline focus:outline-none"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(leave._id)}
                    className="text-red-500 hover:underline focus:outline-none"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveManagement;