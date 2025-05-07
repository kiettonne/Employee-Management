import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/authentication');
  };

  // Ẩn Navbar trên trang Authentication
  if (location.pathname === '/authentication' || !token) {
    return null;
  }

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Employee Management</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="hover:underline focus:outline-none"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('/employee-management')}
            className="hover:underline focus:outline-none"
          >
            Employees
          </button>
          <button
            onClick={() => navigate('/department-management')}
            className="hover:underline focus:outline-none"
          >
            Departments
          </button>
          <button
            onClick={() => navigate('/leave-management')}
            className="hover:underline focus:outline-none"
          >
            Leaves
          </button>
          <button
            onClick={() => navigate('/salary-management')}
            className="hover:underline focus:outline-none"
          >
            Salaries
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="hover:underline focus:outline-none"
          >
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="hover:underline focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;