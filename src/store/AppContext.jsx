import React, { createContext, useContext, useState } from 'react';
import { calculateUnits, calculateDailyCost } from '../utils/calculator';

const AppContext = createContext();

const initialAppliances = [
  { id: 1, name: 'Air Conditioner', watts: 1500, isOn: false, hoursToday: 4, icon: 'Wind', isOwned: true },
  { id: 2, name: 'Refrigerator', watts: 200, isOn: true, hoursToday: 24, icon: 'Refrigerator', isOwned: true },
  { id: 3, name: 'Ceiling Fan', watts: 75, isOn: true, hoursToday: 12, icon: 'Fan', isOwned: true },
  { id: 4, name: 'Television', watts: 100, isOn: false, hoursToday: 3, icon: 'Tv', isOwned: true },
  { id: 5, name: 'Washing Machine', watts: 500, isOn: false, hoursToday: 1, icon: 'WashingMachine', isOwned: true },
  { id: 6, name: 'LED Light', watts: 15, isOn: true, hoursToday: 5, icon: 'Lightbulb', isOwned: true },
  { id: 7, name: 'Computer', watts: 300, isOn: true, hoursToday: 8, icon: 'Monitor', isOwned: false },
  { id: 8, name: 'Microwave Oven', watts: 1200, isOn: false, hoursToday: 0.5, icon: 'Microwave', isOwned: false },
  { id: 9, name: 'Water Heater', watts: 2000, isOn: false, hoursToday: 1.5, icon: 'Thermometer', isOwned: false },
  { id: 10, name: 'Iron Box', watts: 1000, isOn: false, hoursToday: 0.5, icon: 'Shirt', isOwned: false },
  { id: 11, name: 'Hair Dryer', watts: 1200, isOn: false, hoursToday: 0.25, icon: 'Wind', isOwned: false },
  { id: 12, name: 'Vacuum Cleaner', watts: 1400, isOn: false, hoursToday: 0.5, icon: 'Power', isOwned: false },
  { id: 13, name: 'Dishwasher', watts: 1800, isOn: false, hoursToday: 1, icon: 'WashingMachine', isOwned: false },
  { id: 14, name: 'Coffee Maker', watts: 800, isOn: false, hoursToday: 0.5, icon: 'Power', isOwned: false },
  { id: 15, name: 'Toaster', watts: 850, isOn: false, hoursToday: 0.2, icon: 'Power', isOwned: false },
  { id: 16, name: 'Electric Kettle', watts: 1500, isOn: false, hoursToday: 0.5, icon: 'Thermometer', isOwned: false },
  { id: 17, name: 'Router', watts: 10, isOn: true, hoursToday: 24, icon: 'Monitor', isOwned: false },
  { id: 18, name: 'Gaming Console', watts: 150, isOn: false, hoursToday: 2, icon: 'Tv', isOwned: false }
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
    let totalUnits = 0;
    
    appliances.forEach(app => {
      // Only count owned appliances
      if (app.isOwned) {
        totalUnits += calculateUnits(app.watts, app.hoursToday);
      }
    });

    const totalCost = calculateDailyCost(totalUnits);
    return { totalUnits, totalCost };
  };

  const getMonthlyProjection = () => {
    const dailyTotals = getDailyTotals();
    return {
      monthlyUnits: dailyTotals.totalUnits * 30,
      monthlyCost: calculateDailyCost(dailyTotals.totalUnits) * 30
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
