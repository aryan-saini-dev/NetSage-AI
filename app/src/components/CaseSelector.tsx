import React, { useState } from 'react';
import { Case } from '../types';
import { Layers } from 'lucide-react';

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

  const getTagClass = (layer: string) => {
    switch (layer) {
      case 'Layer 1': return 'tag-l1';
      case 'Layer 2': return 'tag-l2';
      case 'Layer 3': return 'tag-l3';
      case 'Layer 4': return 'tag-l4';
      default: return 'tag-l7';
    }
  };

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.case_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLayer = selectedLayer === 'All' || c.osi_layer === selectedLayer;
    return matchesSearch && matchesLayer;
  });

  return (
    <div className="flat-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1rem', color: 'var(--color-fg)' }}>
          <Layers size={18} color="#3b82f6" />
          <span>Troubleshooting Cases</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-light)', padding: '0.2rem 0.5rem', borderRadius: '9999px', border: '1px solid var(--color-primary)' }}>
          {filteredCases.length} / {cases.length}
        </span>
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: '0.75rem' }}>
        <input
          type="text"
          className="flat-input"
          placeholder="Filter by ID, fault, domain..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Layer Filters */}
      <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
        {layers.map((l) => (
          <button
            key={l}
            onClick={() => setSelectedLayer(l)}
            style={{
              backgroundColor: selectedLayer === l ? 'var(--color-primary)' : 'var(--bg-muted)',
              color: selectedLayer === l ? '#ffffff' : 'var(--color-fg-muted)',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.25rem 0.65rem',
              fontSize: '0.725rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'transform 0.15s ease, background-color 0.15s ease'
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Cases List */}
      <div style={{ maxHeight: 'calc(100vh - 270px)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {filteredCases.map((c) => (
          <div
            key={c.case_id}
            className="flat-card flat-card-interactive"
            style={{
              padding: '0.85rem 1rem',
              backgroundColor: selectedCase.case_id === c.case_id ? 'var(--color-primary-light)' : 'var(--bg-white)',
              borderColor: selectedCase.case_id === c.case_id ? 'var(--color-primary)' : 'var(--color-border-bold)',
              cursor: 'pointer'
            }}
            onClick={() => onSelectCase(c)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                {c.case_id}
              </span>
              <span className={`flat-badge ${getTagClass(c.osi_layer)}`}>{c.osi_layer}</span>
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-fg)', lineHeight: 1.35 }}>
              {c.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
