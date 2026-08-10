import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../store/AppContext';
import { calculateUnits, calculateDailyCost } from '../utils/calculator';

// Mock hourly data for the chart
const generateHourlyData = (totalHours, watts) => {
  const data = [];
  const hourlyKw = watts / 1000;
  for (let i = 0; i < 24; i++) {
    // Distribute hours randomly for mock effect, or just a simple curve
    let usage = 0;
    if (i >= 18 && i < 18 + totalHours) {
      usage = hourlyKw;
    } else if (i < totalHours - 6) {
       usage = hourlyKw;
    }
    data.push({ time: `${i}:00`, usage: usage.toFixed(2) });
  }
  return data;
};

export default function ApplianceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { appliances } = useAppContext();
  
  const appliance = appliances.find(app => app.id === parseInt(id));
  
  if (!appliance) return <div>Appliance not found</div>;

  const units = calculateUnits(appliance.watts, appliance.hoursToday);
  const cost = calculateDailyCost(units);
  const chartData = generateHourlyData(appliance.hoursToday, appliance.watts);

  return (
    <div className="details-container">
      <div className="details-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </button>
        <h2>{appliance.name} Details</h2>
      </div>

      <div className="dashboard-grid mb-4">
        <div className="appliance-card" style={{ minHeight: 'auto' }}>
          <div className="stat-label">Total Hours Today</div>
          <div className="stat-value" style={{ fontSize: '1.5rem' }}>{appliance.hoursToday}h</div>
        </div>
        <div className="appliance-card" style={{ minHeight: 'auto' }}>
          <div className="stat-label">Electricity Consumed</div>
          <div className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--accent)' }}>{units.toFixed(2)} kWh</div>
        </div>
        <div className="appliance-card" style={{ minHeight: 'auto' }}>
          <div className="stat-label">Estimated Cost</div>
          <div className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--status-red)' }}>₹ {cost.toFixed(2)}</div>
        </div>
      </div>

      <h3 className="mt-4">Hourly Usage</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#718096' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#718096' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            />
            <Line type="monotone" dataKey="usage" stroke="var(--accent)" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
