import React, { useState } from 'react';
import { Case } from '../types';
import { X, Search, CheckCircle2, List } from 'lucide-react';

interface ProblemDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cases: Case[];
  selectedCase: Case;
  onSelectCase: (c: Case) => void;
}

export const ProblemDrawer: React.FC<ProblemDrawerProps> = ({
  isOpen,
  onClose,
  cases,
  selectedCase,
  onSelectCase,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLayer, setSelectedLayer] = useState('All');

  if (!isOpen) return null;

  const layers = ['All', 'Layer 1', 'Layer 2', 'Layer 3', 'Layer 4', 'Layer 7'];

  const getDiffClass = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'diff-easy';
      case 'medium': return 'diff-medium';
      default: return 'diff-hard';
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
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 999,
        display: 'flex'
      }}
      onClick={onClose}
    >
      {/* Slide-out Drawer Box */}
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100%',
          backgroundColor: 'var(--bg)',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 0 40px rgba(0,0,0,0.8)',
          animation: 'fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: 'var(--fg)' }}>
            <List size={18} color="var(--accent)" />
            <span>Problem List ({cases.length})</span>
          </div>
          <button
            onClick={onClose}
            style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--muted-fg)', cursor: 'pointer', padding: '0.25rem' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              style={{
                width: '100%',
                backgroundColor: 'var(--input)',
                border: '1px solid var(--border)',
                color: 'var(--fg)',
                padding: '0.55rem 0.75rem',
                fontSize: '0.825rem',
                outline: 'none'
              }}
              placeholder="Search problem ID, VLAN, protocol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            {layers.map((l) => (
              <button
                key={l}
                onClick={() => setSelectedLayer(l)}
                style={{
                  backgroundColor: selectedLayer === l ? 'var(--accent)' : 'var(--card)',
                  color: selectedLayer === l ? 'var(--accent-fg)' : 'var(--muted-fg)',
                  border: '1px solid var(--border)',
                  padding: '0.2rem 0.55rem',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Case Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {filteredCases.map((c) => (
            <div
              key={c.case_id}
              onClick={() => {
                onSelectCase(c);
                onClose();
              }}
              style={{
                padding: '0.75rem',
                backgroundColor: selectedCase.case_id === c.case_id ? 'var(--card)' : 'transparent',
                border: '1px solid ' + (selectedCase.case_id === c.case_id ? 'var(--accent)' : 'var(--border)'),
                cursor: 'pointer',
                transition: 'border-color 0.15s ease, background-color 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)' }}>
                  {c.case_id}
                </span>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <span className={`lc-diff ${getDiffClass(c.severity)}`} style={{ fontSize: '0.65rem', padding: '0.05rem 0.35rem' }}>
                    {c.severity}
                  </span>
                  <span className="lc-diff" style={{ fontSize: '0.65rem', padding: '0.05rem 0.35rem', border: '1px solid var(--border)', color: 'var(--muted-fg)' }}>
                    {c.osi_layer}
                  </span>
                </div>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.3 }}>
                {c.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
