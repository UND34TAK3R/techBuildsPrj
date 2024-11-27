// src/components/Sidebar.js
import React from 'react';
 // Create CSS for sidebar styling
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li><Link to="/admin-users">Add User</Link></li>
          <li><Link to="/admin-cpu">Add CPU</Link></li>
          <li><Link to="/admin-gpu">Add GPU</Link></li>
          <li><Link to="/admin-motherboard">Add Motherboard</Link></li>
          <li><Link to="/admin-psu">Add PSU</Link></li>
          <li><Link to="/admin-netadapter">Add NetAdapter</Link></li>
          <li><Link to="/admin-os">Add OS</Link></li>
          <li><Link to="/admin-ram">Add RAM</Link></li>
          <li><Link to="/admin-storage">Add Storage</Link></li>
          <li><Link to="/admin-case">Add Case</Link></li>
          <li><Link to="/admin-cpu-cooler">Add CPU Cooler</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
