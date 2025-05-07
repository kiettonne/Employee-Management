import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard';
import EmployeeManagement from './pages/EmployeeManagement';
import DepartmentManagement from './pages/DepartmentManagement';
import LeaveManagement from './pages/LeaveManagement';
import SalaryManagement from './pages/SalaryManagement';
import Settings from './pages/Settings';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/authentication" />;
};

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/authentication" element={<Authentication />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/employee-management"
            element={
              <PrivateRoute>
                <EmployeeManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/department-management"
            element={
              <PrivateRoute>
                <DepartmentManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/leave-management"
            element={
              <PrivateRoute>
                <LeaveManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/salary-management"
            element={
              <PrivateRoute>
                <SalaryManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/authentication" />} />
          <Route path="*" element={<div className="text-center mt-10 text-xl">404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;