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
    <div className="card-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', borderTop: '3px solid #10b981' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <UserCheck size={18} color="#10b981" />
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f9fafb' }}>Human-in-the-Loop Review Workbench</h3>
      </div>

      <div>
        <label style={{ fontSize: '0.725rem', color: '#9ca3af', fontWeight: 600, display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
          REVIEW ACTION DECISION
        </label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={`btn-action btn-approve ${status === 'Accepted' ? 'active' : ''}`}
            onClick={() => setStatus('Accepted')}
          >
            <Check size={14} /> Approve Fix
          </button>
          <button
            className={`btn-action btn-modify ${status === 'Edited' ? 'active' : ''}`}
            onClick={() => setStatus('Edited')}
          >
            <Edit2 size={14} /> Edit Fix
          </button>
          <button
            className={`btn-action btn-decline ${status === 'Rejected' ? 'active' : ''}`}
            onClick={() => setStatus('Rejected')}
          >
            <X size={14} /> Reject Fix
          </button>
        </div>
      </div>

      {status === 'Edited' && (
        <div>
          <label style={{ fontSize: '0.725rem', color: '#9ca3af', fontWeight: 600, display: 'block', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
            HUMAN CORRECTED CISCO IOS COMMANDS
          </label>
          <textarea
            style={{
              width: '100%',
              height: '70px',
              background: 'var(--cli-bg)',
              border: '1px solid var(--cli-border)',
              borderRadius: '6px',
              color: '#38bdf8',
              fontFamily: 'var(--font-mono)',
              padding: '0.65rem',
              fontSize: '0.8rem',
              outline: 'none'
            }}
            value={correctedFix}
            onChange={(e) => setCorrectedFix(e.target.value)}
          />
        </div>
      )}

      <div>
        <label style={{ fontSize: '0.725rem', color: '#9ca3af', fontWeight: 600, display: 'block', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
          Reviewer Audit Notes
        </label>
        <input
          type="text"
          style={{
            width: '100%',
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            color: '#f9fafb',
            padding: '0.5rem 0.75rem',
            fontSize: '0.825rem',
            outline: 'none'
          }}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
        <button className="btn-primary-solid" onClick={handleSave}>
          Save Review Record
        </button>
      </div>
    </div>
  );
};
