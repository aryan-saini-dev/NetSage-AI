import React, { useState } from 'react';
import { HumanReview, AIDiagnosis } from '../types';
import { UserCheck, Check, Edit2, X } from 'lucide-react';

interface HumanReviewPanelProps {
  diagnosis: AIDiagnosis;
  currentReview?: HumanReview;
  onSaveReview: (review: HumanReview) => void;
}

export const HumanReviewPanel: React.FC<HumanReviewPanelProps> = ({
  diagnosis,
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
    <div className="flat-card flat-card-secondary" style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <UserCheck size={22} color="#059669" />
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#065f46', letterSpacing: '-0.02em' }}>
          Human-in-the-Loop Verification Workbench
        </h3>
      </div>

      <div>
        <label style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: 800, display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Human Review Action Decision
        </label>
        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <button
            className={`flat-btn flat-btn-approve ${status === 'Accepted' ? 'active' : ''}`}
            onClick={() => setStatus('Accepted')}
          >
            <Check size={16} /> Approve Fix
          </button>
          <button
            className={`flat-btn flat-btn-modify ${status === 'Edited' ? 'active' : ''}`}
            onClick={() => setStatus('Edited')}
          >
            <Edit2 size={16} /> Edit Fix
          </button>
          <button
            className={`flat-btn flat-btn-decline ${status === 'Rejected' ? 'active' : ''}`}
            onClick={() => setStatus('Rejected')}
          >
            <X size={16} /> Reject Fix
          </button>
        </div>
      </div>

      {status === 'Edited' && (
        <div>
          <label style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: 800, display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Human Corrected Cisco IOS Fix Commands
          </label>
          <textarea
            style={{
              width: '100%',
              height: '80px',
              backgroundColor: 'var(--bg-dark)',
              border: '2px solid var(--color-border-bold)',
              borderRadius: 'var(--radius-md)',
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
        <label style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: 800, display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Reviewer Audit Notes & Justification
        </label>
        <input
          type="text"
          className="flat-input"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.35rem' }}>
        <button className="flat-btn flat-btn-primary" onClick={handleSave}>
          Save Review Verification Entry
        </button>
      </div>
    </div>
  );
};
