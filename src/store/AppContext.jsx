import React, { createContext, useContext, useState } from 'react';
import { calculateToUUnits, calculateDailyCost } from '../utils/calculator';

const AppContext = createContext();

// Templates for creating new appliances
export const applianceTemplates = [
  { id: 't1', name: 'Air Conditioner', defaultWatts: 1500, defaultUsage: { peak: 0, normal: 0, offPeak: 4 }, icon: 'Wind' },
  { id: 't2', name: 'Refrigerator', defaultWatts: 200, defaultUsage: { peak: 8, normal: 9, offPeak: 7 }, icon: 'Refrigerator' },
  { id: 't3', name: 'Ceiling Fan', defaultWatts: 75, defaultUsage: { peak: 4, normal: 4, offPeak: 4 }, icon: 'Fan' },
  { id: 't4', name: 'Television', defaultWatts: 100, defaultUsage: { peak: 2, normal: 1, offPeak: 0 }, icon: 'Tv' },
  { id: 't5', name: 'Washing Machine', defaultWatts: 500, defaultUsage: { peak: 1, normal: 0, offPeak: 0 }, icon: 'WashingMachine' },
  { id: 't6', name: 'LED Light', defaultWatts: 15, defaultUsage: { peak: 4, normal: 0, offPeak: 1 }, icon: 'Lightbulb' },
  { id: 't7', name: 'Computer', defaultWatts: 300, defaultUsage: { peak: 2, normal: 6, offPeak: 0 }, icon: 'Monitor' },
  { id: 't8', name: 'Microwave Oven', defaultWatts: 1200, defaultUsage: { peak: 0.5, normal: 0, offPeak: 0 }, icon: 'Microwave' },
  { id: 't9', name: 'Water Heater', defaultWatts: 2000, defaultUsage: { peak: 1.5, normal: 0, offPeak: 0 }, icon: 'Thermometer' },
  { id: 't10', name: 'Iron Box', defaultWatts: 1000, defaultUsage: { peak: 0.5, normal: 0, offPeak: 0 }, icon: 'Shirt' },
  { id: 't11', name: 'Hair Dryer', defaultWatts: 1200, defaultUsage: { peak: 0.25, normal: 0, offPeak: 0 }, icon: 'Wind' },
  { id: 't12', name: 'Vacuum Cleaner', defaultWatts: 1400, defaultUsage: { peak: 0, normal: 0.5, offPeak: 0 }, icon: 'Power' },
  { id: 't13', name: 'Dishwasher', defaultWatts: 1800, defaultUsage: { peak: 1, normal: 0, offPeak: 0 }, icon: 'WashingMachine' },
  { id: 't14', name: 'Coffee Maker', defaultWatts: 800, defaultUsage: { peak: 0.5, normal: 0, offPeak: 0 }, icon: 'Power' },
  { id: 't15', name: 'Toaster', defaultWatts: 850, defaultUsage: { peak: 0.2, normal: 0, offPeak: 0 }, icon: 'Power' },
  { id: 't16', name: 'Electric Kettle', defaultWatts: 1500, defaultUsage: { peak: 0.5, normal: 0, offPeak: 0 }, icon: 'Thermometer' },
  { id: 't17', name: 'Router', defaultWatts: 10, defaultUsage: { peak: 8, normal: 9, offPeak: 7 }, icon: 'Monitor' },
  { id: 't18', name: 'Gaming Console', defaultWatts: 150, defaultUsage: { peak: 1, normal: 1, offPeak: 0 }, icon: 'Tv' }
];

// Generate an initial state based on the templates
const generateInitialState = () => {
  const defaults = [
    { templateId: 't1', watts: 1500 },
    { templateId: 't2', watts: 200 },
    { templateId: 't3', watts: 75 },
    { templateId: 't4', watts: 100 },
    { templateId: 't5', watts: 500 },
    { templateId: 't6', watts: 15 }
  ];

  return defaults.map((def, index) => {
    const template = applianceTemplates.find(t => t.id === def.templateId);
    const dailyUnits = (def.watts * (template.defaultUsage.peak + template.defaultUsage.normal + template.defaultUsage.offPeak)) / 1000;
    return {
      id: Date.now() + index, // unique instance ID
      templateId: template.id,
      name: template.name,
      watts: def.watts,
      isOn: true,
      usageProfile: template.defaultUsage,
      icon: template.icon,
      isOwned: true, // keeping this for legacy compatibility if needed
      biMonthlyAccumulated: dailyUnits * 45
    };
  });
};

export const AppProvider = ({ children }) => {
  const [appliances, setAppliances] = useState(generateInitialState());

  const toggleAppliance = (id) => {
    setAppliances(appliances.map(app => 
      app.id === id ? { ...app, isOn: !app.isOn } : app
    ));
  };

  const addAppliance = (templateId, customWatts) => {
    const template = applianceTemplates.find(t => t.id === templateId);
    if (!template) return;

    // Count existing appliances of this type to append a number (e.g. "Fan 2")
    const existingCount = appliances.filter(app => app.templateId === templateId).length;
    const nameSuffix = existingCount > 0 ? ` ${existingCount + 1}` : '';
    
    const newAppliance = {
      id: Date.now(),
      templateId: template.id,
      name: `${template.name}${nameSuffix}`,
      watts: parseInt(customWatts, 10) || template.defaultWatts,
      isOn: false,
      usageProfile: template.defaultUsage,
      icon: template.icon,
      isOwned: true,
      biMonthlyAccumulated: 0
    };

    setAppliances([...appliances, newAppliance]);
  };

  const removeAppliance = (id) => {
    setAppliances(appliances.filter(app => app.id !== id));
  };

  const getDailyTotals = () => {
    let actualUnits = 0;
    let effectiveUnits = 0;
    let breakdown = { peak: 0, normal: 0, offPeak: 0 };
    
    appliances.forEach(app => {
      const result = calculateToUUnits(app.watts, app.usageProfile);
      actualUnits += result.actualUnits;
      effectiveUnits += result.effectiveUnits;
      breakdown.peak += result.breakdown.peak;
      breakdown.normal += result.breakdown.normal;
      breakdown.offPeak += result.breakdown.offPeak;
    });

    const totalCost = calculateDailyCost(effectiveUnits);
    return { actualUnits, effectiveUnits, totalCost, breakdown };
  };

  const getBiMonthlyProjection = () => {
    const dailyTotals = getDailyTotals();
    return {
      monthlyUnits: dailyTotals.actualUnits * 30,
      biMonthlyUnits: dailyTotals.actualUnits * 60,
      biMonthlyEffectiveUnits: dailyTotals.effectiveUnits * 60,
      biMonthlyCost: calculateDailyCost(dailyTotals.effectiveUnits) * 60
    };
  };

  return (
    <AppContext.Provider value={{
      appliances,
      toggleAppliance,
      addAppliance,
      removeAppliance,
      getDailyTotals,
      getBiMonthlyProjection
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
