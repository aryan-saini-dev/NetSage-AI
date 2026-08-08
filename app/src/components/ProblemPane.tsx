import React from 'react';
import { Case } from '../types';
import { AlertCircle, Network, Info } from 'lucide-react';

interface ProblemPaneProps {
  selectedCase: Case;
}

export const ProblemPane: React.FC<ProblemPaneProps> = ({ selectedCase }) => {
  const getDiffClass = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'diff-easy';
      case 'medium': return 'diff-medium';
      default: return 'diff-hard';
    }
  };

  return (
    <div className="lc-pane">
      {/* LeetCode Header Bar */}
      <div className="lc-pane-header" style={{ height: '36px', padding: '0 0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.725rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
          <Info size={13} /> LeetCode Lab Problem Statement
        </div>
      </div>

      {/* LeetCode Rich Problem Text Pane */}
      <div className="lc-pane-content" style={{ padding: '1rem 1.15rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Title & Metadata Badges */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent)' }}>
              {selectedCase.case_id}
            </span>
            <span className={`lc-diff ${getDiffClass(selectedCase.severity)}`} style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
              {selectedCase.severity}
            </span>
            <span className="lc-diff" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', border: '1px solid var(--border)', color: 'var(--muted-fg)' }}>
              {selectedCase.osi_layer}
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.03em', lineHeight: 1.25 }}>
            {selectedCase.title}
          </h2>
          <div style={{ fontSize: '0.775rem', color: 'var(--muted-fg)', marginTop: '0.2rem', fontFamily: 'var(--font-mono)' }}>
            Domain: <strong style={{ color: 'var(--fg)' }}>{selectedCase.domain}</strong>
          </div>
        </div>

        {/* Detailed Problem Explanation (LeetCode Style) */}
        <div style={{ fontSize: '0.875rem', color: '#d4d4d4', lineHeight: 1.6 }}>
          <p style={{ marginBottom: '0.75rem' }}>
            In this Cisco Packet Tracer lab scenario, a network connectivity fault has been reported in the <strong>{selectedCase.domain}</strong> infrastructure. 
          </p>
          <p style={{ marginBottom: '0.75rem' }}>
            As a Senior Cisco Network Automation Engineer, your objective is to analyze the terminal CLI command outputs on the right, determine the root cause of failure, and verify the Cisco IOS CLI remediation commands.
          </p>
        </div>

        {/* Observed Symptom Box */}
        <div className="bold-card" style={{ borderLeft: '3px solid var(--accent)', backgroundColor: '#140804', padding: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.725rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.25rem', letterSpacing: '0.05em' }}>
            <AlertCircle size={14} /> Observed Failure Symptom
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--fg)', fontWeight: 500, lineHeight: 1.45 }}>
            {selectedCase.symptom}
          </div>
        </div>

        {/* Topology Context */}
        <div className="bold-card" style={{ padding: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.725rem', fontWeight: 800, color: 'var(--muted-fg)', textTransform: 'uppercase', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>
            <Network size={14} color="#3b82f6" /> Topology & Interface Context
          </div>
          <div style={{ fontSize: '0.825rem', color: 'var(--fg)', lineHeight: 1.5, fontFamily: 'var(--font-mono)' }}>
            {selectedCase.topology_summary}
          </div>
        </div>

      </div>
    </div>
  );
};
