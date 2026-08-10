import React from 'react';
import { useAppContext } from '../store/AppContext';

export default function SummaryHeader() {
  const { getDailyTotals } = useAppContext();
  const { totalUnits, totalCost } = getDailyTotals();

  return (
    <div className="summary-header">
      <div className="summary-block">
        <span className="summary-label">Today's Consumption</span>
        <span className="summary-value">{totalUnits.toFixed(2)} kWh</span>
      </div>
      <div className="summary-block text-right">
        <span className="summary-label">Estimated Bill Impact (Today)</span>
        <span className="summary-value">₹ {totalCost.toFixed(2)}</span>
      </div>
    </div>
  );
}
