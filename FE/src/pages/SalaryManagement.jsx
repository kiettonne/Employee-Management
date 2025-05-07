import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SalaryManagement() {
  const [salaries, setSalaries] = useState([]);
  const [formData, setFormData] = useState({
    employeeName: '',
    month: '',
    year: '',
    amount: '',
    status: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/salaries', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSalaries(response.data);
    } catch (error) {
      setError('Lỗi khi lấy danh sách lương');
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
        await axios.put(`http://localhost:5000/api/salaries/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/api/salaries', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchSalaries();
      setFormData({ employeeName: '', month: '', year: '', amount: '', status: '' });
    } catch (error) {
      setError(editingId ? 'Lỗi khi sửa lương' : 'Lỗi khi thêm lương');
    }
  };

  const handleEdit = (salary) => {
    setEditingId(salary._id);
    setFormData({
      employeeName: salary.employeeName,
      month: salary.month,
      year: salary.year,
      amount: salary.amount,
      status: salary.status,
    });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/salaries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSalaries();
    } catch (error) {
      setError('Lỗi khi xóa lương');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý lương</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Thay đổi lương' : 'Thêm lương'}</h2>
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
            name="month"
            placeholder="Tháng"
            value={formData.month}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="year"
            placeholder="Năm"
            value={formData.year}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="amount"
            placeholder="Mức lương"
            value={formData.amount}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="status"
            placeholder="Trạng thái (Đã trả/Chưa trả)"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {editingId ? 'Thay đổi' : 'Thêm'}
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên nhân viên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tháng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Năm</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mức lương</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salaries.map((salary) => (
              <tr key={salary._id}>
                <td className="px-6 py-4 whitespace-nowrap">{salary.employeeName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{salary.month}</td>
                <td className="px-6 py-4 whitespace-nowrap">{salary.year}</td>
                <td className="px-6 py-4 whitespace-nowrap">{salary.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{salary.status}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleEdit(salary)}
                    className="text-blue-500 hover:underline focus:outline-none"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(salary._id)}
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

export default SalaryManagement;