import React from 'react';
import { useAppContext } from '../store/AppContext';
import { TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SummaryHeader() {
  const { getDailyTotals } = useAppContext();
  const { actualUnits, totalCost, breakdown } = getDailyTotals();
  const navigate = useNavigate();

  return (
    <div className="summary-header">
      <div className="summary-header-top">
        <div className="summary-block">
          <span className="summary-label">Total Consumed Today</span>
          <div className="summary-value-group">
            <span className="summary-value">{actualUnits.toFixed(2)}</span>
            <span className="summary-unit">kWh</span>
          </div>
        </div>
        <div className="summary-divider"></div>
        <div className="summary-block right">
          <span className="summary-label">Today's Bill Impact</span>
          <div className="summary-value-group">
            <span className="summary-unit">₹</span>
            <span className="summary-value">{totalCost.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="summary-grid">
        <div className="summary-pill" onClick={() => navigate('/today-usage?filter=peak')} style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
          <span className="summary-pill-label">Peak</span>
          <span className="summary-pill-value">{breakdown.peak.toFixed(2)} <small>kWh</small></span>
        </div>
        <div className="summary-pill" onClick={() => navigate('/today-usage?filter=normal')} style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
          <span className="summary-pill-label">Normal</span>
          <span className="summary-pill-value">{breakdown.normal.toFixed(2)} <small>kWh</small></span>
        </div>
        <div className="summary-pill" onClick={() => navigate('/today-usage?filter=offPeak')} style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
          <span className="summary-pill-label">Off-Peak</span>
          <span className="summary-pill-value">{breakdown.offPeak.toFixed(2)} <small>kWh</small></span>
        </div>
      </div>
      
      <button className="btn-primary outline mt-4" onClick={() => navigate('/today-usage')}>
        <TrendingUp size={18} /> View Today's Detailed Usage
      </button>
    </div>
  );
}
