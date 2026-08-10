import React from 'react';
import { Link } from 'react-router-dom';
import { Wind, Refrigerator, Fan, Tv, WashingMachine, Lightbulb, Power, Monitor, Microwave, Thermometer, Shirt } from 'lucide-react';
import { calculateToUUnits } from '../utils/calculator';
import { useAppContext } from '../store/AppContext';

const getIcon = (name) => {
  switch (name) {
    case 'Wind': return <Wind size={24} />;
    case 'Refrigerator': return <Refrigerator size={24} />;
    case 'Fan': return <Fan size={24} />;
    case 'Tv': return <Tv size={24} />;
    case 'WashingMachine': return <WashingMachine size={24} />;
    case 'Lightbulb': return <Lightbulb size={24} />;
    case 'Monitor': return <Monitor size={24} />;
    case 'Microwave': return <Microwave size={24} />;
    case 'Thermometer': return <Thermometer size={24} />;
    case 'Shirt': return <Shirt size={24} />;
    default: return <Power size={24} />;
  }
};

export default function ApplianceCard({ appliance }) {
  const { toggleAppliance } = useAppContext();
  const { actualUnits } = calculateToUUnits(appliance.watts, appliance.usageProfile);
  
  // Usage indicator logic
  let usageClass = 'usage-low';
  if (actualUnits > 5) usageClass = 'usage-high';
  else if (actualUnits > 2) usageClass = 'usage-medium';

  const handleToggle = (e) => {
    e.preventDefault(); // Prevent navigation when toggling
    toggleAppliance(appliance.id);
  };

  return (
    <Link to={`/appliance/${appliance.id}`} className="appliance-card">
      <div className="card-header">
        <div className="icon-wrapper">
          {getIcon(appliance.icon)}
        </div>
        <div className="toggle-switch" onClick={handleToggle}>
          <input type="checkbox" checked={appliance.isOn} readOnly />
          <span className="slider"></span>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="card-title">{appliance.name}</h3>
        <div className="card-status flex items-center">
          <span className={`status-indicator ${appliance.isOn ? 'status-on' : 'status-off'}`}></span>
          {appliance.isOn ? 'ON' : 'OFF'}
        </div>
      </div>

      <div className="card-stats">
        <div className="stat-item">
          <span className="stat-label">Usage Today</span>
          <span className={`stat-value ${usageClass}`}>{actualUnits.toFixed(1)} kWh</span>
        </div>
        <div className="stat-item text-right">
          <span className="stat-label">2-Month Total</span>
          <span className="stat-value">{(appliance.biMonthlyAccumulated || 0).toFixed(1)} kWh</span>
        </div>
      </div>
    </Link>
  );
}
