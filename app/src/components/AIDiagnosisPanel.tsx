import React from 'react';
import { AIDiagnosis, RuleFinding } from '../types';
import { Cpu, CheckCircle2, ShieldCheck } from 'lucide-react';

interface AIDiagnosisPanelProps {
  diagnosis: AIDiagnosis;
  ruleFindings?: RuleFinding[];
}

export const AIDiagnosisPanel: React.FC<AIDiagnosisPanelProps> = ({
  diagnosis,
  ruleFindings = [],
}) => {
  return (
    <div className="flat-card flat-card-primary" style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Cpu size={20} color="#1d4ed8" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e3a8a', letterSpacing: '-0.02em' }}>
            Automated AI Diagnostic Engine
          </h3>
        </div>
        <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#1e40af', backgroundColor: '#dbeafe', padding: '0.25rem 0.65rem', borderRadius: '9999px', border: '1.5px solid #3b82f6', textTransform: 'uppercase' }}>
          Confidence: {diagnosis.confidence.toUpperCase()}
        </span>
      </div>

      {/* Deterministic Rule Engine Finding */}
      {ruleFindings.length > 0 && (
        <div className="flat-card" style={{ backgroundColor: '#fffbeb', borderColor: '#f59e0b', padding: '0.85rem 1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#92400e', marginBottom: '0.2rem', textTransform: 'uppercase' }}>
            Deterministic Static Rule Check Result
          </div>
          {ruleFindings.map((r, i) => (
            <div key={i} style={{ fontSize: '0.875rem', fontWeight: 600, color: '#78350f' }}>
              <strong>[{r.rule_id}]</strong> {r.name} - <em>{r.evidence}</em>
            </div>
          ))}
        </div>
      )}

      {/* Root Cause Diagnosis */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase', marginBottom: '0.3rem', letterSpacing: '0.04em' }}>
          Root Cause Diagnosis
        </div>
        <div style={{ fontSize: '1rem', fontWeight: 800, color: '#1e3a8a', lineHeight: 1.45 }}>
          {diagnosis.root_cause}
        </div>
      </div>

      {/* OSI & Command Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="flat-card" style={{ padding: '0.75rem 1rem', border: '2px solid #3b82f6' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--color-fg-muted)' }}>DIAGNOSED OSI LAYER</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '0.15rem' }}>
            {diagnosis.osi_layer}
          </div>
        </div>

        <div className="flat-card" style={{ padding: '0.75rem 1rem', border: '2px solid #3b82f6' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--color-fg-muted)' }}>RECOMMENDED NEXT COMMAND</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 700, color: '#059669', marginTop: '0.15rem' }}>
            {diagnosis.next_command}
          </div>
        </div>
      </div>

      {/* Quoted CLI Evidence */}
      {diagnosis.evidence_quote.length > 0 && (
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase', marginBottom: '0.3rem', letterSpacing: '0.04em' }}>
            Cited CLI Evidence Output
          </div>
          <div className="flat-card" style={{ backgroundColor: '#fef2f2', borderColor: '#ef4444', padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.825rem', fontWeight: 600, color: '#991b1b' }}>
            {diagnosis.evidence_quote.map((q, idx) => (
              <div key={idx}>"{q}"</div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Cisco IOS Fix Commands */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase', marginBottom: '0.3rem', letterSpacing: '0.04em' }}>
          Recommended Cisco IOS Configuration Fix Commands
        </div>
        <div className="flat-terminal-box">
          <div className="flat-terminal-text" style={{ color: '#38bdf8' }}>
            {diagnosis.fix_steps.map((step, i) => (
              <div key={i}>{step}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
