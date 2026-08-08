import React, { useState } from 'react';
import { Case } from '../types';
import { Layers, Search, Filter } from 'lucide-react';

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
  const [selectedLayer, setSelectedLayer] = useState<string>('All');

  const layers = ['All', 'Layer 1', 'Layer 2', 'Layer 3', 'Layer 4', 'Layer 7'];

  const getOsiClass = (layer: string) => {
    switch (layer) {
      case 'Layer 1': return 'osi-l1';
      case 'Layer 2': return 'osi-l2';
      case 'Layer 3': return 'osi-l3';
      case 'Layer 4': return 'osi-l4';
      default: return 'osi-l7';
    }
  };

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.case_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.symptom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLayer = selectedLayer === 'All' || c.osi_layer === selectedLayer;
    return matchesSearch && matchesLayer;
  });

  return (
    <div className="glass-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 700, fontSize: '0.95rem', color: '#f8fafc' }}>
          <Layers size={17} color="#3b82f6" />
          <span>Packet Tracer Lab Cases</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', background: 'rgba(255,255,255,0.05)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
          {filteredCases.length} / {cases.length}
        </span>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
        <input
          type="text"
          className="search-input"
          placeholder="Filter cases by ID, VLAN, fault..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Domain Filter Pills */}
      <div className="domain-filter-group">
        {layers.map((l) => (
          <button
            key={l}
            className={`filter-pill ${selectedLayer === l ? 'active' : ''}`}
            onClick={() => setSelectedLayer(l)}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Case List */}
      <div style={{ maxHeight: 'calc(100vh - 240px)', overflowY: 'auto', paddingRight: '0.2rem' }}>
        {filteredCases.map((c) => (
          <div
            key={c.case_id}
            className={`case-item-card ${selectedCase.case_id === c.case_id ? 'active' : ''}`}
            onClick={() => onSelectCase(c)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8' }}>
                {c.case_id}
              </span>
              <span className={`badge-osi ${getOsiClass(c.osi_layer)}`}>{c.osi_layer}</span>
            </div>
            <div style={{ fontSize: '0.835rem', fontWeight: 600, color: '#f1f5f9', lineHeight: 1.35 }}>
              {c.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
