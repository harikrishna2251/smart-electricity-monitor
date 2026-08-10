import React from 'react';
import { useAppContext } from '../store/AppContext';

export default function SummaryHeader() {
  const { getDailyTotals } = useAppContext();
  const { actualUnits, effectiveUnits, totalCost, breakdown } = getDailyTotals();

  return (
    <div className="summary-header">
      <div className="flex justify-between items-start w-full">
        <div className="summary-block">
          <span className="summary-label">Today's Consumption</span>
          <span className="summary-value">{actualUnits.toFixed(2)} kWh</span>
          <div className="text-sm mt-1 text-blue-100 flex gap-3">
            <span>Peak: {breakdown.peak.toFixed(1)}</span>
            <span>Normal: {breakdown.normal.toFixed(1)}</span>
            <span>Off-Peak: {breakdown.offPeak.toFixed(1)}</span>
          </div>
        </div>
        <div className="summary-block text-right">
          <span className="summary-label">Estimated Bill Impact (Today)</span>
          <span className="summary-value">₹ {totalCost.toFixed(2)}</span>
          <div className="text-sm mt-1 text-blue-100">
            Billed as {effectiveUnits.toFixed(2)} effective kWh
          </div>
        </div>
      </div>
    </div>
  );
}
