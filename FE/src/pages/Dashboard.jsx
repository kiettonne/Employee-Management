import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/authentication');
      return;
    }

    // Lấy danh sách nhân viên từ API
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(response.data);
      } catch (error) {
        setError('Lỗi khi lấy danh sách nhân viên');
      }
    };

    fetchEmployees();
  }, [navigate]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6">
        <button
          onClick={() => navigate('/employee-management')}
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Quản lý nhân viên
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <h2 className="text-xl font-semibold p-4">Danh sách nhân viên</h2>
        {employees.length === 0 ? (
          <p className="p-4 text-gray-500">Không có nhân viên</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Họ và tên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chức vụ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phòng ban
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mức lương
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;