import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DepartmentManagement() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/departments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepartments(response.data);
    } catch (error) {
      setError('Lỗi khi lấy danh sách phòng ban');
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
        await axios.put(`http://localhost:5000/api/departments/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/api/departments', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchDepartments();
      setFormData({ name: '', description: '' });
    } catch (error) {
      setError(editingId ? 'Lỗi khi sửa phòng ban' : 'Lỗi khi thêm phòng ban');
    }
  };

  const handleEdit = (department) => {
    setEditingId(department._id);
    setFormData({
      name: department.name,
      description: department.description,
    });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/departments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDepartments();
    } catch (error) {
      setError('Lỗi khi xóa phòng ban');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý phòng ban</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Sửa Phòng Ban' : 'Thêm Phòng ban'}</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Tên phòng ban"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="description"
            placeholder="Mô tả"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {editingId ? 'Cập nhật' : 'Thêm'}
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên Phòng ban</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {departments.map((department) => (
              <tr key={department._id}>
                <td className="px-6 py-4 whitespace-nowrap">{department.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{department.description}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleEdit(department)}
                    className="text-blue-500 hover:underline focus:outline-none"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(department._id)}
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

export default DepartmentManagement;