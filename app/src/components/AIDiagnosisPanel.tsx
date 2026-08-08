import React from 'react';
import { AIDiagnosis } from '../types';
import { Bot, CheckCircle, ShieldAlert, Code } from 'lucide-react';

interface AIDiagnosisPanelProps {
  diagnosis: AIDiagnosis;
}

export const AIDiagnosisPanel: React.FC<AIDiagnosisPanelProps> = ({ diagnosis }) => {
  return (
    <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #3b82f6' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bot size={20} color="#3b82f6" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>AI Diagnostic Recommendation</h3>
        </div>
        <span className="badge" style={{ background: 'rgba(59,130,246,0.2)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.4)' }}>
          Confidence: {diagnosis.confidence.toUpperCase()}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' }}>Root Cause Diagnosis</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f3f4f6', marginTop: '0.25rem' }}>
            {diagnosis.root_cause}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ background: 'rgba(15,23,42,0.6)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 600 }}>OSI LAYER</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#38bdf8', marginTop: '0.15rem' }}>
              {diagnosis.osi_layer}
            </div>
          </div>

          <div style={{ background: 'rgba(15,23,42,0.6)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 600 }}>RECOMMENDED NEXT COMMAND</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.825rem', color: '#4ade80', marginTop: '0.15rem' }}>
              {diagnosis.next_command}
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Cited CLI Evidence Quotes
          </div>
          <div style={{ background: 'var(--cli-bg)', padding: '0.65rem 0.85rem', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#fda4af', borderLeft: '3px solid #f43f5e' }}>
            {diagnosis.evidence_quote.map((q, idx) => (
              <div key={idx}>"{q}"</div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Proposed Cisco IOS Fix Commands
          </div>
          <div style={{ background: 'var(--cli-bg)', padding: '0.75rem', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.825rem', color: '#38bdf8' }}>
            {diagnosis.fix_steps.map((step, i) => (
              <div key={i}>{step}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
