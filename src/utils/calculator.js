// Bi-monthly slab rates
// 0 - 100 Units: ₹0
// 101 - 200 Units: ₹2.35
// 201 - 400 Units: ₹4.70
// 401 - 500 Units: ₹6.30
// 501 - 600 Units: ₹8.80
// 601 - 800 Units: ₹9.95
// 801 - 1000 Units: ₹11.05
// 1001+ Units: ₹12.15

export const TOU_MULTIPLIERS = {
  peak: 1.25,
  normal: 1.0,
  offPeak: 0.95
};

export function calculateToUUnits(watts, usageProfile) {
  const peakUnits = (watts * usageProfile.peak) / 1000;
  const normalUnits = (watts * usageProfile.normal) / 1000;
  const offPeakUnits = (watts * usageProfile.offPeak) / 1000;
  
  const actualUnits = peakUnits + normalUnits + offPeakUnits;
  
  // Apply the advanced multipliers to calculate "billed" units
  const effectiveUnits = 
    (peakUnits * TOU_MULTIPLIERS.peak) + 
    (normalUnits * TOU_MULTIPLIERS.normal) + 
    (offPeakUnits * TOU_MULTIPLIERS.offPeak);

  return { 
    actualUnits, 
    effectiveUnits, 
    breakdown: { peak: peakUnits, normal: normalUnits, offPeak: offPeakUnits } 
  };
}

export function calculateBiMonthlyBill(totalUnits) {
  let bill = 0;

  if (totalUnits <= 500) {
    // Slab for <= 500 Units
    let remaining = totalUnits;
    
    // First 200 Units
    if (remaining > 0) {
      let units = Math.min(remaining, 200);
      bill += units * 0; 
      remaining -= units;
    }
    
    // 201 - 400 Units
    if (remaining > 0) {
      let units = Math.min(remaining, 200);
      bill += units * 4.70;
      remaining -= units;
    }
    
    // 401 - 500 Units
    if (remaining > 0) {
      bill += remaining * 6.30;
    }
  } else {
    // Slab for > 500 Units
    let remaining = totalUnits;
    
    // First 200 Units (Updated as per 200 units free for everyone rule)
    if (remaining > 0) {
      let units = Math.min(remaining, 200);
      bill += units * 0; 
      remaining -= units;
    }
    
    // 201 - 400 Units
    if (remaining > 0) {
      let units = Math.min(remaining, 200);
      bill += units * 4.50;
      remaining -= units;
    }
    
    // 401 - 500 Units
    if (remaining > 0) {
      let units = Math.min(remaining, 100);
      bill += units * 6.00;
      remaining -= units;
    }
    
    // Above 500 Units
    if (remaining > 0) {
      bill += remaining * 8.00;
    }
  }

  return bill;
}

// Calculate the effective daily cost of a set of units
export function calculateDailyCost(dailyUnits) {
  const biMonthlyUnits = dailyUnits * 60;
  const biMonthlyBill = calculateBiMonthlyBill(biMonthlyUnits);
  return biMonthlyBill / 60;
}
