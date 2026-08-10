import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import SummaryHeader from './components/SummaryHeader';
import Dashboard from './components/Dashboard';
import ApplianceDetail from './components/ApplianceDetail';
import MonthlyTracking from './components/MonthlyTracking';
import ManageAppliances from './components/ManageAppliances';
import './index.css';

function MainLayout() {
  return (
    <div className="app-container">
      <h1>Smart Electricity Monitor</h1>
      
      <div className="nav-bar mt-4">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Dashboard
        </NavLink>
        <NavLink to="/manage" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Manage Appliances
        </NavLink>
        <NavLink to="/tracking" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Monthly Tracking
        </NavLink>
      </div>

      <SummaryHeader />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/manage" element={<ManageAppliances />} />
        <Route path="/appliance/:id" element={<ApplianceDetail />} />
        <Route path="/tracking" element={<MonthlyTracking />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <MainLayout />
      </Router>
    </AppProvider>
  );
}

export default App;
