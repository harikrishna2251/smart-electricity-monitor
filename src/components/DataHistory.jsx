import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_HISTORY_DATA = Array.from({ length: 60 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (59 - i));
  return {
    date: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
    units: (Math.random() * 5 + 8).toFixed(1) // Random daily units between 8 and 13 kWh
  };
});

export default function DataHistory() {
  const navigate = useNavigate();

  return (
    <div className="details-container">
      <div className="details-header mb-4">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </button>
        <h2>Historical Data</h2>
      </div>

      <div className="appliance-card mb-4">
        <h3 className="mb-2">Past 60 Days Consumption (Mock Data)</h3>
        <p className="text-secondary mb-4" style={{ fontSize: '0.9rem' }}>
          Since we are not storing real data in a database yet, this chart simulates a 2-month history of your daily electricity usage.
        </p>
        
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_HISTORY_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#718096' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#718096' }} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                formatter={(value) => [`${value} kWh`, 'Consumption']}
              />
              <Area type="monotone" dataKey="units" stroke="var(--accent)" fillOpacity={1} fill="url(#colorUnits)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
