import React, { useState } from 'react';
import { AIDiagnosis, HumanReview, RuleFinding } from '../types';
import { Terminal, Cpu, UserCheck, Check, Edit2, X } from 'lucide-react';

interface TerminalPaneProps {
  showOutputs: string;
  diagnosis: AIDiagnosis;
  ruleFindings?: RuleFinding[];
  currentReview?: HumanReview;
  onSaveReview: (review: HumanReview) => void;
}

export const TerminalPane: React.FC<TerminalPaneProps> = ({
  showOutputs,
  diagnosis,
  ruleFindings = [],
  currentReview,
  onSaveReview,
}) => {
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
      {/* Top Header Bar */}
      <div className="lc-pane-header" style={{ height: '36px', padding: '0 0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.725rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
          <Terminal size={13} /> Cisco CLI & AI Verification Workspace
        </div>
      </div>

      {/* Pane Single Unified Content (NO TABS!) */}
      <div className="lc-pane-content" style={{ padding: '0.85rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        
        {/* 1. Cisco IOS CLI Output Box */}
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted-fg)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            Raw Cisco IOS Terminal Output
          </div>
          <div className="lc-terminal-box" style={{ maxHeight: '140px', padding: '0.65rem 0.75rem', fontSize: '0.775rem' }}>
            {showOutputs}
          </div>
        </div>

        {/* 2. Rule Check & AI Diagnostic Engine */}
        <div className="bold-card bold-card-accent" style={{ padding: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>
              <Cpu size={14} /> AI & Static Rule Diagnosis
            </div>
            <span className="lc-diff diff-easy" style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem' }}>
              CONFIDENCE: {diagnosis.confidence.toUpperCase()}
            </span>
          </div>

          {/* Static Rule Finding pill if triggered */}
          {ruleFindings.length > 0 && (
            <div style={{ backgroundColor: '#fffbeb', border: '1px solid #f59e0b', padding: '0.35rem 0.5rem', borderRadius: '4px', marginBottom: '0.35rem', fontSize: '0.725rem', color: '#78350f', fontWeight: 600 }}>
              <strong>[{ruleFindings[0].rule_id}]</strong> Static Check: {ruleFindings[0].evidence}
            </div>
          )}

          {/* Root Cause */}
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.3, marginBottom: '0.35rem' }}>
            {diagnosis.root_cause}
          </div>

          {/* Fix Commands Code Block */}
          <div style={{ backgroundColor: '#050505', border: '1px solid var(--border)', padding: '0.45rem 0.65rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#38bdf8' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--muted-fg)', marginBottom: '0.15rem', textTransform: 'uppercase' }}>Proposed Cisco IOS Fix:</div>
            {diagnosis.fix_steps.map((step, i) => (
              <div key={i}>{step}</div>
            ))}
          </div>
        </div>

        {/* 3. Human Verification Workbench */}
        <div className="bold-card" style={{ padding: '0.75rem', backgroundColor: '#0d1322' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            <UserCheck size={14} /> Human-in-the-Loop Verification Workbench
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.4rem' }}>
            <button
              className={`bold-btn-solid ${status === 'Accepted' ? '' : 'bold-btn-outline'}`}
              style={{ backgroundColor: status === 'Accepted' ? '#10b981' : 'transparent', padding: '0.3rem 0.65rem', fontSize: '0.7rem' }}
              onClick={() => setStatus('Accepted')}
            >
              <Check size={12} /> Approve Fix
            </button>
            <button
              className={`bold-btn-solid ${status === 'Edited' ? '' : 'bold-btn-outline'}`}
              style={{ backgroundColor: status === 'Edited' ? '#f59e0b' : 'transparent', padding: '0.3rem 0.65rem', fontSize: '0.7rem' }}
              onClick={() => setStatus('Edited')}
            >
              <Edit2 size={12} /> Edit Fix
            </button>
            <button
              className={`bold-btn-solid ${status === 'Rejected' ? '' : 'bold-btn-outline'}`}
              style={{ backgroundColor: status === 'Rejected' ? '#ef4444' : 'transparent', padding: '0.3rem 0.65rem', fontSize: '0.7rem' }}
              onClick={() => setStatus('Rejected')}
            >
              <X size={12} /> Reject Fix
            </button>
          </div>

          {status === 'Edited' && (
            <textarea
              style={{
                width: '100%',
                height: '45px',
                backgroundColor: 'var(--input)',
                border: '1px solid var(--border)',
                color: '#38bdf8',
                fontFamily: 'var(--font-mono)',
                padding: '0.35rem 0.5rem',
                fontSize: '0.75rem',
                outline: 'none',
                marginBottom: '0.35rem'
              }}
              value={correctedFix}
              onChange={(e) => setCorrectedFix(e.target.value)}
            />
          )}

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="text"
              style={{
                flex: 1,
                backgroundColor: 'var(--input)',
                border: '1px solid var(--border)',
                color: 'var(--fg)',
                padding: '0.35rem 0.55rem',
                fontSize: '0.75rem',
                outline: 'none'
              }}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <button
              className="bold-btn-solid"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.7rem' }}
              onClick={handleSave}
            >
              Save Verification
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
