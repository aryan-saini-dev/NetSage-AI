import React from 'react';
import { Case } from '../types';
import { Network, Server } from 'lucide-react';

interface CaseSelectorProps {
  cases: Case[];
  selectedCase: Case;
  onSelectCase: (c: Case) => void;
}

export const CaseSelector: React.FC<CaseSelectorProps> = ({
  cases,
  selectedCase,
  onSelectCase,
}) => {
  const getBadgeClass = (layer: string) => {
    switch (layer) {
      case 'Layer 1': return 'badge-layer1';
      case 'Layer 2': return 'badge-layer2';
      case 'Layer 3': return 'badge-layer3';
      case 'Layer 4': return 'badge-layer4';
      default: return 'badge-layer7';
    }
  };

  return (
    <div className="glass-card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Server size={18} color="#38bdf8" />
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Lab Scenarios (30)</h3>
      </div>

      <div className="case-list">
        {cases.map((c) => (
          <div
            key={c.case_id}
            className={`case-item ${selectedCase.case_id === c.case_id ? 'active' : ''}`}
            onClick={() => onSelectCase(c)}
          >
            <div className="case-item-header">
              <span className="case-id">{c.case_id}</span>
              <span className={`badge ${getBadgeClass(c.osi_layer)}`}>{c.osi_layer}</span>
            </div>
            <div className="case-title">{c.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
