import React, { useState } from 'react';
import { AIDiagnosis, HumanReview, RuleFinding } from '../types';
import { Terminal, Cpu, UserCheck, Check, Edit2, X, ShieldCheck } from 'lucide-react';

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
    currentReview?.reviewer_notes || ''
  );
  const [correctedFix, setCorrectedFix] = useState(
    currentReview?.corrected_fix || diagnosis.fix_steps.join('\n')
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    onSaveReview({
      status,
      reviewer_notes: notes.trim() || 'Accepted without additional notes.',
      corrected_fix: status === 'Edited' ? correctedFix : undefined,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="lc-pane" style={{ borderRight: 'none' }}>
      {/* Top Header Bar */}
      <div className="lc-pane-header" style={{ height: '36px', padding: '0 0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.725rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
          <Terminal size={13} /> Cisco CLI & AI Verification Workspace
        </div>
      </div>

      {/* Pane Single Unified Content */}
      <div className="lc-pane-content" style={{ padding: '0.85rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        
        {/* 1. Cisco IOS CLI Output Box */}
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted-fg)', textTransform: 'uppercase', marginBottom: '0.25rem', letterSpacing: '0.05em' }}>
            Raw Cisco IOS Terminal Output
          </div>
          <div className="lc-terminal-box" style={{ maxHeight: '135px', padding: '0.65rem 0.75rem', fontSize: '0.775rem' }}>
            {showOutputs}
          </div>
        </div>

        {/* 2. AI & Static Rule Diagnostic Box */}
        <div className="bold-card bold-card-accent" style={{ padding: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>
              <Cpu size={14} /> AI Diagnostic Engine Recommendation
            </div>
            <span className="lc-diff diff-easy" style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem' }}>
              CONFIDENCE: {diagnosis.confidence.toUpperCase()}
            </span>
          </div>

          {/* Static Rule Finding pill if triggered - Styled with dark theme amber accent */}
          {ruleFindings.length > 0 && (
            <div style={{ backgroundColor: '#1c1303', border: '1px solid #d97706', padding: '0.35rem 0.6rem', borderRadius: '0px', marginBottom: '0.4rem', fontSize: '0.725rem', color: '#fbbf24', fontWeight: 600 }}>
              <strong style={{ color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>[{ruleFindings[0].rule_id}]</strong> Static Check: {ruleFindings[0].evidence}
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

        {/* 3. Sleek Overhauled Human Verification Workbench */}
        <div className="bold-card" style={{ borderLeft: '3px solid #10b981', padding: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.725rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <ShieldCheck size={14} /> Human-in-the-Loop Audit Workbench
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted-fg)', marginTop: '0.1rem' }}>
                Validate AI recommendation & save engineer review entry
              </div>
            </div>

            {savedSuccess && (
              <span className="lc-diff diff-easy" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>
                ✓ ENTRY RECORDED
              </span>
            )}
          </div>

          {/* Segmented Control Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '0.65rem' }}>
            <button
              className="bold-btn-solid"
              style={{
                backgroundColor: status === 'Accepted' ? '#10b981' : 'transparent',
                color: status === 'Accepted' ? '#ffffff' : 'var(--muted-fg)',
                border: '1px solid ' + (status === 'Accepted' ? '#10b981' : 'var(--border)'),
                justifyContent: 'center',
                padding: '0.45rem',
                fontSize: '0.725rem'
              }}
              onClick={() => setStatus('Accepted')}
            >
              <Check size={13} /> Accept
            </button>
            <button
              className="bold-btn-solid"
              style={{
                backgroundColor: status === 'Edited' ? '#f59e0b' : 'transparent',
                color: status === 'Edited' ? '#ffffff' : 'var(--muted-fg)',
                border: '1px solid ' + (status === 'Edited' ? '#f59e0b' : 'var(--border)'),
                justifyContent: 'center',
                padding: '0.45rem',
                fontSize: '0.725rem'
              }}
              onClick={() => setStatus('Edited')}
            >
              <Edit2 size={13} /> Edit
            </button>
            <button
              className="bold-btn-solid"
              style={{
                backgroundColor: status === 'Rejected' ? '#ef4444' : 'transparent',
                color: status === 'Rejected' ? '#ffffff' : 'var(--muted-fg)',
                border: '1px solid ' + (status === 'Rejected' ? '#ef4444' : 'var(--border)'),
                justifyContent: 'center',
                padding: '0.45rem',
                fontSize: '0.725rem'
              }}
              onClick={() => setStatus('Rejected')}
            >
              <X size={13} /> Reject
            </button>
          </div>

          {/* Corrected Commands Textarea if Edit Selected */}
          {status === 'Edited' && (
            <div style={{ marginBottom: '0.6rem' }}>
              <div style={{ fontSize: '0.675rem', fontWeight: 700, color: 'var(--muted-fg)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                Human Corrected Cisco IOS Commands:
              </div>
              <textarea
                style={{
                  width: '100%',
                  height: '50px',
                  backgroundColor: '#050505',
                  border: '1px solid var(--border)',
                  color: '#38bdf8',
                  fontFamily: 'var(--font-mono)',
                  padding: '0.4rem 0.55rem',
                  fontSize: '0.75rem',
                  outline: 'none'
                }}
                value={correctedFix}
                onChange={(e) => setCorrectedFix(e.target.value)}
              />
            </div>
          )}

          {/* Engineer Audit Notes Input with Placeholder */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <input
              type="text"
              style={{
                width: '100%',
                backgroundColor: 'var(--input)',
                border: '1px solid var(--border)',
                color: 'var(--fg)',
                padding: '0.4rem 0.65rem',
                fontSize: '0.775rem',
                outline: 'none'
              }}
              placeholder="Write your review comment here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <button
              className="bold-btn-solid"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '0.45rem',
                fontSize: '0.75rem',
                backgroundColor: 'var(--accent)',
                color: 'var(--accent-fg)'
              }}
              onClick={handleSave}
            >
              RECORD VERIFICATION ENTRY
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
