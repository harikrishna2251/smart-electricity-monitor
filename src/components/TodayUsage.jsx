import React from 'react';
import { useAppContext } from '../store/AppContext';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TodayUsage() {
  const { getDailyTotals, appliances } = useAppContext();
  const { actualUnits, totalCost } = getDailyTotals();
  const navigate = useNavigate();

  // Sort appliances by actual units consumed
  const leaderboard = [...appliances]
    .filter(app => app.isOwned && (app.usageProfile.peak + app.usageProfile.normal + app.usageProfile.offPeak) > 0)
    .map(app => {
      const units = (app.watts * (app.usageProfile.peak + app.usageProfile.normal + app.usageProfile.offPeak)) / 1000;
      return { ...app, totalUnits: units };
    })
    .sort((a, b) => b.totalUnits - a.totalUnits);

  return (
    <div className="today-usage-container">
      <div className="today-usage-header">
        <button className="back-button glass" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
        <h2 style={{ color: 'white', margin: 0 }}>Today's Usage Breakdown</h2>
      </div>

      <div className="glass-panel text-center mb-4 mt-4">
        <h2 style={{ fontSize: '3.5rem', color: 'white', margin: '0 0 8px 0', lineHeight: 1 }}>{actualUnits.toFixed(2)} <span style={{ fontSize: '1.5rem', opacity: 0.8 }}>kWh</span></h2>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Units Consumed</p>
        <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '8px 16px', borderRadius: '24px', display: 'inline-block', marginTop: '16px', fontWeight: 'bold' }}>
          ₹ {totalCost.toFixed(2)} Estimated Cost
        </div>
      </div>
      
      <div className="glass-panel">
        <h4 style={{ marginBottom: '24px', color: 'white', opacity: 0.9 }}>Most Energy Consumed (Leaderboard)</h4>
        <div className="leaderboard glass">
          {leaderboard.length === 0 ? (
            <p className="text-center" style={{ color: 'rgba(255,255,255,0.7)' }}>No appliances used today.</p>
          ) : (
            leaderboard.map((app, index) => (
              <div key={app.id} className="leaderboard-item glass-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="rank-badge">
                    {index + 1}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: 'white', fontSize: '1.1rem' }}>{app.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                      Peak: {app.usageProfile.peak}h | Normal: {app.usageProfile.normal}h | Off-Peak: {app.usageProfile.offPeak}h
                    </div>
                  </div>
                </div>
                <div style={{ fontWeight: 'bold', color: 'white', fontSize: '1.25rem' }}>
                  {app.totalUnits.toFixed(2)} kWh
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
