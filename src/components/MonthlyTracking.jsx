import React from 'react';
import { useAppContext } from '../store/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export default function MonthlyTracking() {
  const { getMonthlyProjection, getDailyTotals } = useAppContext();
  const { monthlyUnits, monthlyCost } = getMonthlyProjection();
  const { totalUnits } = getDailyTotals();

  // Mocking 30 days of data for the chart based on current average
  const generateMonthData = () => {
    const data = [];
    let cumulative = 0;
    for (let i = 1; i <= 30; i++) {
      // simulate slight daily variation
      const daily = totalUnits * (0.8 + Math.random() * 0.4);
      cumulative += daily;
      data.push({ day: i, units: daily.toFixed(1), cumulative: cumulative.toFixed(1) });
    }
    return data;
  };

  const monthData = generateMonthData();
  
  // Mid-month projections
  const units15Days = (monthlyUnits / 2);
  const midMonthBill = getDailyTotals().totalCost * 15;

  return (
    <div className="tracking-container">
      <div className="details-container">
        <h2>Monthly Tracking & Bills</h2>
        <p className="stat-label mb-4">Track your energy consumption and projected bills.</p>

        <div className="dashboard-grid mb-4">
          <div className="bill-card">
            <h3 className="card-title">Total Monthly Projection</h3>
            <div className="stat-value mt-4" style={{ fontSize: '2rem' }}>{monthlyUnits.toFixed(0)} kWh</div>
            <div className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--status-red)' }}>₹ {monthlyCost.toFixed(2)}</div>
          </div>
          <div className="bill-card mid-month">
            <h3 className="card-title">Mid-Month Bill (15th)</h3>
            <div className="stat-value mt-4" style={{ fontSize: '2rem' }}>{units15Days.toFixed(0)} kWh</div>
            <div className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--status-yellow)' }}>₹ {midMonthBill.toFixed(2)}</div>
          </div>
        </div>

        <h3 className="mt-4 mb-4">Day-by-Day Usage (kWh)</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#718096' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#718096' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              />
              <Line type="monotone" dataKey="units" stroke="var(--accent)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
