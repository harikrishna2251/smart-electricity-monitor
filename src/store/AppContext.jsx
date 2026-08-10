import React, { createContext, useContext, useState } from 'react';
import { calculateToUUnits, calculateDailyCost } from '../utils/calculator';

const AppContext = createContext();

const initialAppliances = [
  { id: 1, name: 'Air Conditioner', watts: 1500, isOn: false, usageProfile: { peak: 0, normal: 0, offPeak: 4 }, icon: 'Wind', isOwned: true },
  { id: 2, name: 'Refrigerator', watts: 200, isOn: true, usageProfile: { peak: 8, normal: 9, offPeak: 7 }, icon: 'Refrigerator', isOwned: true },
  { id: 3, name: 'Ceiling Fan', watts: 75, isOn: true, usageProfile: { peak: 4, normal: 4, offPeak: 4 }, icon: 'Fan', isOwned: true },
  { id: 4, name: 'Television', watts: 100, isOn: false, usageProfile: { peak: 2, normal: 1, offPeak: 0 }, icon: 'Tv', isOwned: true },
  { id: 5, name: 'Washing Machine', watts: 500, isOn: false, usageProfile: { peak: 1, normal: 0, offPeak: 0 }, icon: 'WashingMachine', isOwned: true },
  { id: 6, name: 'LED Light', watts: 15, isOn: true, usageProfile: { peak: 4, normal: 0, offPeak: 1 }, icon: 'Lightbulb', isOwned: true },
  { id: 7, name: 'Computer', watts: 300, isOn: true, usageProfile: { peak: 2, normal: 6, offPeak: 0 }, icon: 'Monitor', isOwned: false },
  { id: 8, name: 'Microwave Oven', watts: 1200, isOn: false, usageProfile: { peak: 0.5, normal: 0, offPeak: 0 }, icon: 'Microwave', isOwned: false },
  { id: 9, name: 'Water Heater', watts: 2000, isOn: false, usageProfile: { peak: 1.5, normal: 0, offPeak: 0 }, icon: 'Thermometer', isOwned: false },
  { id: 10, name: 'Iron Box', watts: 1000, isOn: false, usageProfile: { peak: 0.5, normal: 0, offPeak: 0 }, icon: 'Shirt', isOwned: false },
  { id: 11, name: 'Hair Dryer', watts: 1200, isOn: false, usageProfile: { peak: 0.25, normal: 0, offPeak: 0 }, icon: 'Wind', isOwned: false },
  { id: 12, name: 'Vacuum Cleaner', watts: 1400, isOn: false, usageProfile: { peak: 0, normal: 0.5, offPeak: 0 }, icon: 'Power', isOwned: false },
  { id: 13, name: 'Dishwasher', watts: 1800, isOn: false, usageProfile: { peak: 1, normal: 0, offPeak: 0 }, icon: 'WashingMachine', isOwned: false },
  { id: 14, name: 'Coffee Maker', watts: 800, isOn: false, usageProfile: { peak: 0.5, normal: 0, offPeak: 0 }, icon: 'Power', isOwned: false },
  { id: 15, name: 'Toaster', watts: 850, isOn: false, usageProfile: { peak: 0.2, normal: 0, offPeak: 0 }, icon: 'Power', isOwned: false },
  { id: 16, name: 'Electric Kettle', watts: 1500, isOn: false, usageProfile: { peak: 0.5, normal: 0, offPeak: 0 }, icon: 'Thermometer', isOwned: false },
  { id: 17, name: 'Router', watts: 10, isOn: true, usageProfile: { peak: 8, normal: 9, offPeak: 7 }, icon: 'Monitor', isOwned: false },
  { id: 18, name: 'Gaming Console', watts: 150, isOn: false, usageProfile: { peak: 1, normal: 1, offPeak: 0 }, icon: 'Tv', isOwned: false }
];

export const AppProvider = ({ children }) => {
  const [appliances, setAppliances] = useState(initialAppliances);

  const toggleAppliance = (id) => {
    setAppliances(appliances.map(app => 
      app.id === id ? { ...app, isOn: !app.isOn } : app
    ));
  };

  const toggleOwnership = (id) => {
    setAppliances(appliances.map(app => 
      app.id === id ? { ...app, isOwned: !app.isOwned, isOn: !app.isOwned ? false : app.isOn } : app
    ));
  };

  const getDailyTotals = () => {
    let actualUnits = 0;
    let effectiveUnits = 0;
    let breakdown = { peak: 0, normal: 0, offPeak: 0 };
    
    appliances.forEach(app => {
      if (app.isOwned) {
        const result = calculateToUUnits(app.watts, app.usageProfile);
        actualUnits += result.actualUnits;
        effectiveUnits += result.effectiveUnits;
        breakdown.peak += result.breakdown.peak;
        breakdown.normal += result.breakdown.normal;
        breakdown.offPeak += result.breakdown.offPeak;
      }
    });

    const totalCost = calculateDailyCost(effectiveUnits);
    return { actualUnits, effectiveUnits, totalCost, breakdown };
  };

  const getMonthlyProjection = () => {
    const dailyTotals = getDailyTotals();
    return {
      monthlyUnits: dailyTotals.actualUnits * 30,
      monthlyEffectiveUnits: dailyTotals.effectiveUnits * 30,
      monthlyCost: calculateDailyCost(dailyTotals.effectiveUnits) * 30
    };
  };

  return (
    <AppContext.Provider value={{
      appliances,
      toggleAppliance,
      toggleOwnership,
      getDailyTotals,
      getMonthlyProjection
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
