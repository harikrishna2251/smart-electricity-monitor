// Bi-monthly slab rates
// 0 - 100 Units: ₹0
// 101 - 200 Units: ₹2.35
// 201 - 400 Units: ₹4.70
// 401 - 500 Units: ₹6.30
// 501 - 600 Units: ₹8.80
// 601 - 800 Units: ₹9.95
// 801 - 1000 Units: ₹11.05
// 1001+ Units: ₹12.15

export function calculateUnits(watts, hoursPerDay) {
  return (watts * hoursPerDay) / 1000;
}

export function calculateBiMonthlyBill(totalUnits) {
  let bill = 0;
  let remaining = totalUnits;

  // 0 - 100
  if (remaining > 0) {
    let unitsInSlab = Math.min(remaining, 100);
    bill += unitsInSlab * 0;
    remaining -= unitsInSlab;
  }

  // 101 - 200
  if (remaining > 0) {
    let unitsInSlab = Math.min(remaining, 100);
    bill += unitsInSlab * 2.35;
    remaining -= unitsInSlab;
  }

  // 201 - 400
  if (remaining > 0) {
    let unitsInSlab = Math.min(remaining, 200);
    bill += unitsInSlab * 4.70;
    remaining -= unitsInSlab;
  }

  // 401 - 500
  if (remaining > 0) {
    let unitsInSlab = Math.min(remaining, 100);
    bill += unitsInSlab * 6.30;
    remaining -= unitsInSlab;
  }

  // 501 - 600
  if (remaining > 0) {
    let unitsInSlab = Math.min(remaining, 100);
    bill += unitsInSlab * 8.80;
    remaining -= unitsInSlab;
  }

  // 601 - 800
  if (remaining > 0) {
    let unitsInSlab = Math.min(remaining, 200);
    bill += unitsInSlab * 9.95;
    remaining -= unitsInSlab;
  }

  // 801 - 1000
  if (remaining > 0) {
    let unitsInSlab = Math.min(remaining, 200);
    bill += unitsInSlab * 11.05;
    remaining -= unitsInSlab;
  }

  // 1001+
  if (remaining > 0) {
    bill += remaining * 12.15;
  }

  return bill;
}

// Calculate the effective daily cost of a set of units
export function calculateDailyCost(dailyUnits) {
  const biMonthlyUnits = dailyUnits * 60;
  const biMonthlyBill = calculateBiMonthlyBill(biMonthlyUnits);
  return biMonthlyBill / 60;
}
