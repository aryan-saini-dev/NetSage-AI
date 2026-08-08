import React from 'react';
import { AIDiagnosis, RuleFinding } from '../types';
import { Cpu, CheckCircle2, ShieldCheck, FileCode, Search } from 'lucide-react';

interface AIDiagnosisPanelProps {
  diagnosis: AIDiagnosis;
  ruleFindings?: RuleFinding[];
}

export const AIDiagnosisPanel: React.FC<AIDiagnosisPanelProps> = ({
  diagnosis,
  ruleFindings = [],
}) => {
  return (
    <div className="card-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '3px solid #3b82f6' }}>
      {/* Panel Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Cpu size={18} color="#3b82f6" />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f9fafb' }}>Automated AI Diagnostic Engine</h3>
        </div>
        <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#38bdf8', background: 'rgba(59,130,246,0.12)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(59,130,246,0.25)' }}>
          CONFIDENCE: {diagnosis.confidence.toUpperCase()}
        </span>
      </div>

      {/* Deterministic Rule Engine Finding */}
      {ruleFindings.length > 0 && (
        <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', padding: '0.65rem 0.85rem', borderRadius: '6px' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 600, color: '#fbbf24', marginBottom: '0.15rem' }}>
            DETERMINISTIC RULE ENGINE CHECK RESULT
          </div>
          {ruleFindings.map((r, i) => (
            <div key={i} style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>
              <strong>[{r.rule_id}]</strong> {r.name} - <em>{r.evidence}</em>
            </div>
          ))}
        </div>
      )}

      {/* AI Root Cause Diagnosis */}
      <div>
        <div style={{ fontSize: '0.725rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
          Root Cause Diagnosis
        </div>
        <div style={{ fontSize: '0.925rem', fontWeight: 600, color: '#f9fafb', lineHeight: 1.4 }}>
          {diagnosis.root_cause}
        </div>
      </div>

      {/* OSI & Verification Meta Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 600 }}>DIAGNOSED OSI LAYER</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', marginTop: '0.1rem' }}>
            {diagnosis.osi_layer}
          </div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 600 }}>RECOMMENDED NEXT COMMAND</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#4ade80', marginTop: '0.1rem' }}>
            {diagnosis.next_command}
          </div>
        </div>
      </div>

      {/* Quoted CLI Evidence */}
      {diagnosis.evidence_quote.length > 0 && (
        <div>
          <div style={{ fontSize: '0.725rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            Cited CLI Output Evidence
          </div>
          <div style={{ background: 'var(--cli-bg)', padding: '0.55rem 0.75rem', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.775rem', color: '#fda4af', borderLeft: '3px solid #f43f5e' }}>
            {diagnosis.evidence_quote.map((q, idx) => (
              <div key={idx}>"{q}"</div>
            ))}
          </div>
        </div>
      )}

      {/* Proposed Cisco IOS Fix Commands */}
      <div>
        <div style={{ fontSize: '0.725rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
          Recommended Cisco IOS Fix Commands
        </div>
        <div style={{ background: 'var(--cli-bg)', padding: '0.65rem 0.75rem', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#38bdf8', border: '1px solid var(--cli-border)' }}>
          {diagnosis.fix_steps.map((step, i) => (
            <div key={i}>{step}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
