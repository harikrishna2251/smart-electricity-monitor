import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Database, Settings, BarChart2, X } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} onClick={onClose}>
            <Home size={20} />
            Dashboard
          </NavLink>
          <NavLink to="/data" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} onClick={onClose}>
            <Database size={20} />
            Data (History)
          </NavLink>
          <NavLink to="/manage" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} onClick={onClose}>
            <Settings size={20} />
            Manage Appliances
          </NavLink>
          <NavLink to="/tracking" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} onClick={onClose}>
            <BarChart2 size={20} />
            Bi-Monthly Tracking
          </NavLink>
        </div>
      </div>
    </>
  );
}
