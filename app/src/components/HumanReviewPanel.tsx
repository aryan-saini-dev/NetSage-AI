import React, { useState } from 'react';
import { HumanReview, AIDiagnosis } from '../types';
import { UserCheck, Check, Edit2, XCircle } from 'lucide-react';

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
    <div className="glass-card" style={{ padding: '1.25rem', borderTop: '4px solid #10b981' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <UserCheck size={20} color="#10b981" />
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Human-in-the-Loop Verification Workbench</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
            HUMAN REVIEW DECISION
          </label>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              className={`btn-accept ${status === 'Accepted' ? 'active' : ''}`}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: status === 'Accepted' ? '0 0 10px rgba(16,185,129,0.4)' : 'none',
              }}
              onClick={() => setStatus('Accepted')}
            >
              <Check size={16} /> Approve & Accept
            </button>
            <button
              className={`btn-edit ${status === 'Edited' ? 'active' : ''}`}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: status === 'Edited' ? '0 0 10px rgba(245,158,11,0.4)' : 'none',
              }}
              onClick={() => setStatus('Edited')}
            >
              <Edit2 size={16} /> Edit Fix Commands
            </button>
            <button
              className={`btn-reject ${status === 'Rejected' ? 'active' : ''}`}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: status === 'Rejected' ? '0 0 10px rgba(244,63,94,0.4)' : 'none',
              }}
              onClick={() => setStatus('Rejected')}
            >
              <XCircle size={16} /> Reject Diagnosis
            </button>
          </div>
        </div>

        {status === 'Edited' && (
          <div>
            <label style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
              HUMAN CORRECTED CISCO IOS FIX COMMANDS
            </label>
            <textarea
              style={{
                width: '100%',
                height: '80px',
                background: 'var(--cli-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: '#38bdf8',
                fontFamily: 'var(--font-mono)',
                padding: '0.75rem',
                fontSize: '0.825rem',
              }}
              value={correctedFix}
              onChange={(e) => setCorrectedFix(e.target.value)}
            />
          </div>
        )}

        <div>
          <label style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
            REVIEWER AUDIT NOTES & JUSTIFICATION
          </label>
          <input
            type="text"
            style={{
              width: '100%',
              background: 'rgba(15,23,42,0.8)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: '#f3f4f6',
              padding: '0.65rem 0.85rem',
              fontSize: '0.875rem',
            }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-primary" onClick={handleSave}>
            Save Review Log Entry
          </button>
        </div>
      </div>
    </div>
  );
};
