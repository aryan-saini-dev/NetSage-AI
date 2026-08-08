import React from 'react';
import { Case, RuleFinding } from '../types';
import { AlertCircle, Network } from 'lucide-react';

interface ProblemPaneProps {
  selectedCase: Case;
  ruleFindings: RuleFinding[];
}

export const ProblemPane: React.FC<ProblemPaneProps> = ({
  selectedCase,
}) => {
  const getDiffClass = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'diff-easy';
      case 'medium': return 'diff-medium';
      default: return 'diff-hard';
    }
  };

  return (
    <div className="lc-pane">
      {/* Pane Top Bar */}
      <div className="lc-pane-header" style={{ height: '36px', padding: '0 0.85rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
          Problem Description & Topology
        </div>
      </div>

      {/* Pane Main Content */}
      <div className="lc-pane-content" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)' }}>
              {selectedCase.case_id}
            </span>
            <span className="lc-diff" style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem' }}>
              {selectedCase.osi_layer}
            </span>
            <span className={`lc-diff ${getDiffClass(selectedCase.severity)}`} style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem' }}>
              {selectedCase.severity}
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            {selectedCase.title}
          </h2>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-fg)', marginTop: '0.15rem' }}>
            Domain: {selectedCase.domain}
          </div>
        </div>

        {/* Symptom Card */}
        <div className="bold-card" style={{ borderLeft: '3px solid var(--accent)', backgroundColor: '#140804', padding: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.2rem', letterSpacing: '0.05em' }}>
            <AlertCircle size={13} /> Observed Symptom
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--fg)', fontWeight: 500, lineHeight: 1.35 }}>
            {selectedCase.symptom}
          </div>
        </div>

        {/* Topology Summary */}
        <div className="bold-card" style={{ padding: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted-fg)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            <Network size={13} color="#3b82f6" /> Topology Context
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--fg)', lineHeight: 1.4 }}>
            {selectedCase.topology_summary}
          </div>
        </div>
      </div>
    </div>
  );
};
