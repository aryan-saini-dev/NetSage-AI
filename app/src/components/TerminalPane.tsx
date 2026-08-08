import React, { useState } from 'react';
import { AIDiagnosis, HumanReview } from '../types';
import { Terminal, Cpu, UserCheck, Check, Edit2, X, Copy } from 'lucide-react';

interface TerminalPaneProps {
  showOutputs: string;
  diagnosis: AIDiagnosis;
  currentReview?: HumanReview;
  onSaveReview: (review: HumanReview) => void;
}

export const TerminalPane: React.FC<TerminalPaneProps> = ({
  showOutputs,
  diagnosis,
  currentReview,
  onSaveReview,
}) => {
  const [activeTab, setActiveTab] = useState<'cli' | 'ai' | 'review'>('cli');
  const [status, setStatus] = useState<'Accepted' | 'Edited' | 'Rejected'>(
    currentReview?.status || 'Accepted'
  );
  const [notes, setNotes] = useState(
    currentReview?.reviewer_notes || 'Approved AI diagnosis and fix steps after CLI output verification.'
  );
  const [correctedFix, setCorrectedFix] = useState(
    currentReview?.corrected_fix || diagnosis.fix_steps.join('\n')
  );

  const handleSave = () => {
    onSaveReview({
      status,
      reviewer_notes: notes,
      corrected_fix: status === 'Edited' ? correctedFix : undefined,
    });
  };

  return (
    <div className="lc-pane" style={{ borderRight: 'none' }}>
      {/* Pane Top Bar */}
      <div className="lc-pane-header">
        <div className="lc-tab-group">
          <button
            className={`lc-tab-btn ${activeTab === 'cli' ? 'active' : ''}`}
            onClick={() => setActiveTab('cli')}
          >
            <Terminal size={14} /> Cisco CLI Output
          </button>
          <button
            className={`lc-tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai')}
          >
            <Cpu size={14} /> AI Recommendation
          </button>
          <button
            className={`lc-tab-btn ${activeTab === 'review' ? 'active' : ''}`}
            onClick={() => setActiveTab('review')}
          >
            <UserCheck size={14} /> Human Workbench
          </button>
        </div>
      </div>

      {/* Pane Content */}
      <div className="lc-pane-content">
        {activeTab === 'cli' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
                Raw Cisco IOS Terminal Output
              </span>
            </div>
            <div className="lc-terminal-box" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              {showOutputs}
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
                Gemini 2.5 Flash Diagnostic Output
              </span>
              <span className="lc-diff diff-easy">CONFIDENCE: {diagnosis.confidence.toUpperCase()}</span>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-fg)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Diagnosed Root Cause
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--fg)', lineHeight: 1.35 }}>
                {diagnosis.root_cause}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="bold-card">
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted-fg)' }}>OSI LAYER</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent)', marginTop: '0.15rem' }}>
                  {diagnosis.osi_layer}
                </div>
              </div>

              <div className="bold-card">
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted-fg)' }}>RECOMMENDED NEXT COMMAND</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#10b981', marginTop: '0.15rem' }}>
                  {diagnosis.next_command}
                </div>
              </div>
            </div>

            {diagnosis.evidence_quote.length > 0 && (
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-fg)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Cited Evidence Quotes
                </div>
                <div className="lc-terminal-box" style={{ color: '#f43f5e', borderLeft: '3px solid #f43f5e' }}>
                  {diagnosis.evidence_quote.map((q, idx) => (
                    <div key={idx}>"{q}"</div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-fg)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Recommended Cisco IOS Fix Commands
              </div>
              <div className="lc-terminal-box">
                {diagnosis.fix_steps.map((step, i) => (
                  <div key={i}>{step}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'review' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--fg)' }}>
              Human-in-the-Loop Verification
            </h3>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--muted-fg)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                Action Decision
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  className={`bold-btn-solid ${status === 'Accepted' ? '' : 'bold-btn-outline'}`}
                  style={{ backgroundColor: status === 'Accepted' ? '#10b981' : 'transparent' }}
                  onClick={() => setStatus('Accepted')}
                >
                  <Check size={14} /> Approve Fix
                </button>
                <button
                  className={`bold-btn-solid ${status === 'Edited' ? '' : 'bold-btn-outline'}`}
                  style={{ backgroundColor: status === 'Edited' ? '#f59e0b' : 'transparent' }}
                  onClick={() => setStatus('Edited')}
                >
                  <Edit2 size={14} /> Edit Fix
                </button>
                <button
                  className={`bold-btn-solid ${status === 'Rejected' ? '' : 'bold-btn-outline'}`}
                  style={{ backgroundColor: status === 'Rejected' ? '#ef4444' : 'transparent' }}
                  onClick={() => setStatus('Rejected')}
                >
                  <X size={14} /> Reject Fix
                </button>
              </div>
            </div>

            {status === 'Edited' && (
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--muted-fg)', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                  Human Corrected Commands
                </label>
                <textarea
                  style={{
                    width: '100%',
                    height: '80px',
                    backgroundColor: 'var(--input)',
                    border: '1px solid var(--border)',
                    color: '#38bdf8',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.75rem',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                  value={correctedFix}
                  onChange={(e) => setCorrectedFix(e.target.value)}
                />
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--muted-fg)', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                Reviewer Audit Notes
              </label>
              <input
                type="text"
                style={{
                  width: '100%',
                  backgroundColor: 'var(--input)',
                  border: '1px solid var(--border)',
                  color: 'var(--fg)',
                  padding: '0.75rem 1rem',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button className="bold-btn-solid" onClick={handleSave} style={{ marginTop: '0.5rem' }}>
              Save Verification Entry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
