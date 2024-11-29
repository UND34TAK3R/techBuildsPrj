import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {
  return (
    <div className="d-flex flex-column vh-100 p-3 bg-dark text-white" style={{ width: '250px' }}>
      <h2 className="text-center mb-4">Admin Panel</h2>
      <nav>
        <ul className="nav flex-column">
        <li className="nav-item">
            <Link to="/admin" className="nav-link text-white">
              <i className="bi bi-person-plus-fill me-2"></i>Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin-users" className="nav-link text-white">
              <i className="bi bi-person-plus-fill me-2"></i>Add User
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin-cpu" className="nav-link text-white">
              <i className="bi bi-cpu me-2"></i>Add CPU
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin-gpu" className="nav-link text-white">
              <i className="bi bi-gpu-card me-2"></i>Add GPU
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin-motherboard" className="nav-link text-white">
              <i className="bi bi-motherboard me-2"></i>Add Motherboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin-psu" className="nav-link text-white">
              <i className="bi bi-battery-charging me-2"></i>Add PSU
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin-netadapter" className="nav-link text-white">
              <i className="bi bi-wifi me-2"></i>Add NetAdapter
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin-os" className="nav-link text-white">
              <i className="bi bi-windows me-2"></i>Add OS
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin-ram" className="nav-link text-white">
              <i className="bi bi-memory me-2"></i>Add RAM
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin-storage" className="nav-link text-white">
              <i className="bi bi-hdd me-2"></i>Add Storage
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin-case" className="nav-link text-white">
              <i className="bi bi-pc me-2"></i>Add Case
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin-cpu-cooler" className="nav-link text-white">
              <i className="bi bi-thermometer-half me-2"></i>Add CPU Cooler
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
