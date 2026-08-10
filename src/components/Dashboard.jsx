import React from 'react';
import ApplianceCard from './ApplianceCard';
import { useAppContext } from '../store/AppContext';

export default function Dashboard() {
  const { appliances } = useAppContext();
  
  const ownedAppliances = appliances.filter(app => app.isOwned);

  return (
    <div className="dashboard-grid">
      {ownedAppliances.length === 0 ? (
        <p className="text-muted col-span-full">You haven't added any appliances yet. Go to Manage Appliances to add some!</p>
      ) : (
        ownedAppliances.map(app => (
          <ApplianceCard key={app.id} appliance={app} />
        ))
      )}
    </div>
  );
}
