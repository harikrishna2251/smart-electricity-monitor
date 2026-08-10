import React from 'react';
import { useAppContext } from '../store/AppContext';
import { Plus, Minus } from 'lucide-react';

export default function ManageAppliances() {
  const { appliances, toggleOwnership } = useAppContext();

  return (
    <div className="details-container">
      <div className="details-header mb-4">
        <h2>Manage Appliances</h2>
      </div>
      <p className="stat-label mb-4">Add or remove appliances from your dashboard.</p>

      <div className="dashboard-grid">
        {appliances.map(app => (
          <div key={app.id} className="appliance-card manage-card" style={{ minHeight: 'auto' }}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="card-title" style={{ marginBottom: 0 }}>{app.name}</h3>
                <span className="stat-label">{app.watts} W</span>
              </div>
              <button 
                className={`manage-btn ${app.isOwned ? 'btn-remove' : 'btn-add'}`}
                onClick={() => toggleOwnership(app.id)}
              >
                {app.isOwned ? (
                  <><Minus size={16} /> Remove</>
                ) : (
                  <><Plus size={16} /> Add</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
