import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import SummaryHeader from './components/SummaryHeader';
import Dashboard from './components/Dashboard';
import ApplianceDetail from './components/ApplianceDetail';
import BiMonthlyTracking from './components/BiMonthlyTracking';
import ManageAppliances from './components/ManageAppliances';
import './index.css';

import Sidebar from './components/Sidebar';
import DataHistory from './components/DataHistory';
import { Menu } from 'lucide-react';

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="app-header">
        <button className="menu-btn" onClick={() => setIsSidebarOpen(true)}>
          <Menu size={24} />
        </button>
        <h1 style={{ margin: 0, flex: 1 }}>Smart Electricity Monitor</h1>
      </div>

      <SummaryHeader />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/data" element={<DataHistory />} />
        <Route path="/manage" element={<ManageAppliances />} />
        <Route path="/appliance/:id" element={<ApplianceDetail />} />
        <Route path="/tracking" element={<BiMonthlyTracking />} />
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
