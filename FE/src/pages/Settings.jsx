import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Settings() {
  const [settings, setSettings] = useState({
    companyName: '',
    address: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/settings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSettings(response.data);
    } catch (error) {
      setError('Lỗi khi lấy cài đặt');
    }
  };

  const handleInputChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/settings', settings, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Cập nhật cài đặt thành công');
      setError('');
    } catch (error) {
      setError('Lỗi khi cập nhật cài đặt');
      setSuccess('');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Company Settings</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="companyName"
            placeholder="Tên công ty"
            value={settings.companyName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            value={settings.address}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={settings.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={settings.phone}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Lưu cài đặt
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;