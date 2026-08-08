import React, { useState } from 'react';
import { Case, RuleFinding } from '../types';
import { FileText, Network, CheckSquare, AlertCircle } from 'lucide-react';

interface ProblemPaneProps {
  selectedCase: Case;
  ruleFindings: RuleFinding[];
}

export const ProblemPane: React.FC<ProblemPaneProps> = ({
  selectedCase,
  ruleFindings,
}) => {
  const [activeTab, setActiveTab] = useState<'problem' | 'topology' | 'rules'>('problem');

  return (
    <div className="lc-pane">
      {/* Pane Top Bar */}
      <div className="lc-pane-header">
        <div className="lc-tab-group">
          <button
            className={`lc-tab-btn ${activeTab === 'problem' ? 'active' : ''}`}
            onClick={() => setActiveTab('problem')}
          >
            <FileText size={14} /> Problem Description
          </button>
          <button
            className={`lc-tab-btn ${activeTab === 'topology' ? 'active' : ''}`}
            onClick={() => setActiveTab('topology')}
          >
            <Network size={14} /> Topology & Specs
          </button>
          <button
            className={`lc-tab-btn ${activeTab === 'rules' ? 'active' : ''}`}
            onClick={() => setActiveTab('rules')}
          >
            <CheckSquare size={14} /> Static Rules ({ruleFindings.length})
          </button>
        </div>
      </div>

      {/* Pane Main Content */}
      <div className="lc-pane-content">
        {activeTab === 'problem' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                {selectedCase.case_id} • {selectedCase.osi_layer} • {selectedCase.domain}
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.03em', lineHeight: 1.25 }}>
                {selectedCase.title}
              </h2>
            </div>

            {/* Symptom Card */}
            <div className="bold-card" style={{ borderLeft: '4px solid var(--accent)', backgroundColor: '#140804' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.35rem', letterSpacing: '0.1em' }}>
                <AlertCircle size={15} /> Observed Symptom
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--fg)', fontWeight: 500 }}>
                {selectedCase.symptom}
              </div>
            </div>

            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: 'var(--fg)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Expected Troubleshooting Outcome
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted-fg)', lineHeight: 1.6 }}>
                Inspect the Cisco CLI command outputs provided in the terminal pane. Use the AI diagnostic model or static rules to identify the exact line of configuration failure, verify quotes, and approve the Cisco IOS fix.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'topology' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--fg)' }}>
              Network Lab Topology Summary
            </h3>
            <div className="bold-card">
              <p style={{ fontSize: '0.9rem', color: 'var(--fg)', lineHeight: 1.6 }}>
                {selectedCase.topology_summary}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'rules' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--fg)' }}>
              Deterministic Rule Engine Findings
            </h3>
            {ruleFindings.length > 0 ? (
              ruleFindings.map((r, i) => (
                <div key={i} className="bold-card bold-card-accent">
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    [{r.rule_id}] {r.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--fg)', fontWeight: 500, marginBottom: '0.5rem' }}>
                    {r.evidence}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted-fg)' }}>
                    <strong>Action:</strong> {r.recommendation}
                  </div>
                </div>
              ))
            ) : (
              <div className="bold-card" style={{ color: 'var(--muted-fg)' }}>
                No static syntax rules triggered. Proceeding to AI diagnostic engine.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
