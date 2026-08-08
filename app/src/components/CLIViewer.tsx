import React, { useState } from 'react';
import { Terminal, AlertCircle, Network, Copy, Check } from 'lucide-react';

interface CLIViewerProps {
  caseId: string;
  title: string;
  symptom: string;
  topology: string;
  showOutputs: string;
  domain: string;
  osiLayer: string;
}

export const CLIViewer: React.FC<CLIViewerProps> = ({
  caseId,
  title,
  symptom,
  topology,
  showOutputs,
  domain,
  osiLayer,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(showOutputs);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header Banner */}
      <div style={{ borderBottom: '1px solid var(--border-dim)', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700 }}>
            {caseId}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>• {domain}</span>
        </div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>{title}</h2>
      </div>

      {/* Observed Symptom Banner */}
      <div style={{ background: 'rgba(244,63,94,0.08)', borderLeft: '3px solid #f43f5e', padding: '0.85rem 1rem', borderRadius: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: '#fda4af', marginBottom: '0.2rem', textTransform: 'uppercase' }}>
          <AlertCircle size={15} /> Observed Symptom
        </div>
        <div style={{ fontSize: '0.9rem', color: '#f1f5f9', fontWeight: 500 }}>{symptom}</div>
      </div>

      {/* Topology Context Info */}
      <div style={{ fontSize: '0.825rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
        <Network size={15} color="#3b82f6" />
        <span>Topology Context: <strong style={{ color: '#cbd5e1' }}>{topology}</strong></span>
      </div>

      {/* Cisco IOS Terminal View */}
      <div className="terminal-card">
        <div className="terminal-top-bar">
          <div className="terminal-controls">
            <span className="c-dot c-red"></span>
            <span className="c-dot c-yellow"></span>
            <span className="c-dot c-green"></span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
            Cisco IOS CLI Output Terminal
          </div>
          <button
            onClick={handleCopy}
            style={{
              background: 'transparent',
              border: 'none',
              color: copied ? '#34d399' : '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.75rem'
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <div className="terminal-content">
          {showOutputs}
        </div>
      </div>
    </div>
  );
};
