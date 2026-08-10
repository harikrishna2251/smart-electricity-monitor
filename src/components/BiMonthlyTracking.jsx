import React from 'react';
import { useAppContext } from '../store/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BiMonthlyTracking() {
  const { getBiMonthlyProjection, getDailyTotals } = useAppContext();
  const { monthlyUnits, biMonthlyUnits, biMonthlyCost } = getBiMonthlyProjection();
  const { actualUnits } = getDailyTotals();

  // Mocking 60 days of data for the chart based on current average
  const generateBiMonthData = () => {
    const data = [];
    let cumulative = 0;
    for (let i = 1; i <= 60; i++) {
      // simulate slight daily variation
      const daily = actualUnits * (0.8 + Math.random() * 0.4);
      cumulative += daily;
      // Only plot every 5 days to keep chart clean
      if (i % 5 === 0 || i === 1) {
        data.push({ day: i, units: daily.toFixed(1), cumulative: cumulative.toFixed(1) });
      }
    }
    return data;
  };

  const monthData = generateBiMonthData();

  return (
    <div className="tracking-container">
      <div className="details-container">
        <h2>Bi-Monthly Tracking & Bills</h2>
        <p className="stat-label mb-4">Track your 60-day billing cycle progress.</p>

        <div className="dashboard-grid mb-4">
          <div className="bill-card mid-month">
            <h3 className="card-title">1 Month Progress</h3>
            <div className="stat-value mt-4" style={{ fontSize: '2rem' }}>{monthlyUnits.toFixed(0)} kWh</div>
            <div className="text-sm mt-1 text-blue-100">Halfway through billing cycle</div>
          </div>
          <div className="bill-card">
            <h3 className="card-title">Total Bi-Monthly Projection</h3>
            <div className="stat-value mt-4" style={{ fontSize: '2rem' }}>{biMonthlyUnits.toFixed(0)} kWh</div>
            <div className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--status-red)' }}>₹ {biMonthlyCost.toFixed(2)}</div>
          </div>
        </div>

        <h3 className="mt-4 mb-4">60-Day Cumulative Usage (kWh)</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#718096' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#718096' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              />
              <Line type="monotone" dataKey="cumulative" stroke="var(--accent)" strokeWidth={3} dot={true} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
