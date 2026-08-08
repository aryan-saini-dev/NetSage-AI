import React, { useState } from 'react';
import { Case } from '../types';
import { Search, Layers } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');

  const getPillClass = (layer: string) => {
    switch (layer) {
      case 'Layer 1': return 'pill-layer1';
      case 'Layer 2': return 'pill-layer2';
      case 'Layer 3': return 'pill-layer3';
      case 'Layer 4': return 'pill-layer4';
      default: return 'pill-layer7';
    }
  };

  const filteredCases = cases.filter(
    (c) =>
      c.case_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.osi_layer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.9rem', color: '#f3f4f6' }}>
          <Layers size={16} color="#3b82f6" />
          <span>Troubleshooting Cases</span>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#9ca3af', background: 'rgba(255,255,255,0.05)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
          {filteredCases.length} / {cases.length}
        </span>
      </div>

      <div style={{ position: 'relative' }}>
        <input
          type="text"
          className="search-input"
          placeholder="Search by ID, VLAN, OSI Layer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="case-scroll-list">
        {filteredCases.map((c) => (
          <div
            key={c.case_id}
            className={`case-card-item ${selectedCase.case_id === c.case_id ? 'active' : ''}`}
            onClick={() => onSelectCase(c)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600, color: '#38bdf8' }}>
                {c.case_id}
              </span>
              <span className={`badge-pill ${getPillClass(c.osi_layer)}`}>{c.osi_layer}</span>
            </div>
            <div style={{ fontSize: '0.825rem', fontWeight: 500, color: '#e5e7eb', lineHeight: 1.3 }}>
              {c.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
