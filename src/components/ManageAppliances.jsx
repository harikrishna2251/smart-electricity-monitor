import React, { useState } from 'react';
import { useAppContext, applianceTemplates } from '../store/AppContext';
import { Plus, Minus, X } from 'lucide-react';

export default function ManageAppliances() {
  const { appliances, addAppliance, removeAppliance } = useAppContext();
  const [addingTemplate, setAddingTemplate] = useState(null);
  const [customWatts, setCustomWatts] = useState('');

  const handleAddClick = (template) => {
    setAddingTemplate(template);
    setCustomWatts(template.defaultWatts.toString());
  };

  const handleConfirmAdd = () => {
    if (addingTemplate) {
      addAppliance(addingTemplate.id, customWatts);
      setAddingTemplate(null);
      setCustomWatts('');
    }
  };

  return (
    <div className="details-container">
      <div className="details-header mb-4">
        <h2>Your Appliances</h2>
      </div>
      <div className="dashboard-grid mb-6">
        {appliances.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No appliances added yet.</p>}
        {appliances.map(app => (
          <div key={app.id} className="appliance-card manage-card" style={{ minHeight: 'auto' }}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="card-title" style={{ marginBottom: 0 }}>{app.name}</h3>
                <span className="stat-label">{app.watts} W</span>
              </div>
              <button 
                className="manage-btn btn-remove"
                onClick={() => removeAppliance(app.id)}
              >
                <Minus size={16} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="details-header mb-4 mt-6">
        <h2>Add New Appliance</h2>
      </div>
      
      {addingTemplate && (
        <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid var(--border-color)' }}>
          <div className="flex justify-between items-center mb-4">
            <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Add {addingTemplate.name}</h3>
            <button onClick={() => setAddingTemplate(null)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Wattage Rating (W)</label>
              <input 
                type="number" 
                value={customWatts}
                onChange={(e) => setCustomWatts(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
              />
            </div>
            <button 
              onClick={handleConfirmAdd}
              style={{ padding: '10px 20px', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '18px' }}
            >
              Add Appliance
            </button>
          </div>
        </div>
      )}

      <div className="dashboard-grid">
        {applianceTemplates.map(template => (
          <div key={template.id} className="appliance-card manage-card" style={{ minHeight: 'auto', opacity: addingTemplate ? 0.5 : 1 }}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="card-title" style={{ marginBottom: 0 }}>{template.name}</h3>
                <span className="stat-label">Default: {template.defaultWatts} W</span>
              </div>
              <button 
                className="manage-btn btn-add"
                onClick={() => handleAddClick(template)}
                disabled={!!addingTemplate}
              >
                <Plus size={16} /> Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
