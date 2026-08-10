import React, { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { X, TrendingUp } from 'lucide-react';

export default function SummaryHeader() {
  const { getDailyTotals, appliances } = useAppContext();
  const { actualUnits, effectiveUnits, totalCost, breakdown } = getDailyTotals();
  const [showModal, setShowModal] = useState(false);

  // Sort appliances by actual units consumed
  const leaderboard = [...appliances]
    .filter(app => app.isOwned && (app.usageProfile.peak + app.usageProfile.normal + app.usageProfile.offPeak) > 0)
    .map(app => {
      const units = (app.watts * (app.usageProfile.peak + app.usageProfile.normal + app.usageProfile.offPeak)) / 1000;
      return { ...app, totalUnits: units };
    })
    .sort((a, b) => b.totalUnits - a.totalUnits);

  return (
    <>
      <div className="summary-header" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="summary-block">
            <span className="summary-label">TOTAL CONSUMED TODAY</span>
            <span className="summary-value" style={{ fontSize: '2.5rem' }}>{actualUnits.toFixed(2)} <span style={{ fontSize: '1.25rem', opacity: 0.8 }}>kWh</span></span>
          </div>
          <div className="summary-block text-right">
            <span className="summary-label">TODAY'S BILL IMPACT</span>
            <span className="summary-value" style={{ fontSize: '2.5rem' }}>₹ {totalCost.toFixed(2)}</span>
          </div>
        </div>

        <div className="summary-grid">
          <div className="summary-pill">
            <span className="summary-pill-label">Peak Hours</span>
            <span className="summary-pill-value">{breakdown.peak.toFixed(2)} kWh</span>
          </div>
          <div className="summary-pill">
            <span className="summary-pill-label">Normal Hours</span>
            <span className="summary-pill-value">{breakdown.normal.toFixed(2)} kWh</span>
          </div>
          <div className="summary-pill">
            <span className="summary-pill-label">Off-Peak</span>
            <span className="summary-pill-value">{breakdown.offPeak.toFixed(2)} kWh</span>
          </div>
        </div>
        
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => setShowModal(true)}>
          <TrendingUp size={18} /> View Today's Detailed Usage
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ margin: 0 }}>Today's Usage Breakdown</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={20}/></button>
            </div>
            <div className="modal-body">
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--accent)', margin: 0 }}>{actualUnits.toFixed(2)} kWh</h2>
                <p className="text-secondary" style={{ margin: 0 }}>Total Units Consumed</p>
                <h3 style={{ color: 'var(--status-red)', marginTop: '8px' }}>₹ {totalCost.toFixed(2)} Estimated Cost</h3>
              </div>
              
              <h4 style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>Most Energy Consumed (Leaderboard)</h4>
              <div className="leaderboard">
                {leaderboard.length === 0 ? (
                  <p className="text-secondary text-center">No appliances used today.</p>
                ) : (
                  leaderboard.map((app, index) => (
                    <div key={app.id} className="leaderboard-item">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>
                          {index + 1}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600' }}>{app.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            P: {app.usageProfile.peak}h | N: {app.usageProfile.normal}h | OP: {app.usageProfile.offPeak}h
                          </div>
                        </div>
                      </div>
                      <div style={{ fontWeight: 'bold', color: 'var(--accent)' }}>
                        {app.totalUnits.toFixed(2)} kWh
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
