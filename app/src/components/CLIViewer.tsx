import React, { useState } from 'react';
import { AlertCircle, Network, Copy, Check, Terminal } from 'lucide-react';

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
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(showOutputs);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flat-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
      {/* Header Banner */}
      <div style={{ borderBottom: '3px solid var(--color-border-bold)', paddingBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.825rem', fontWeight: 800, color: 'var(--color-primary)' }}>
            {caseId}
          </span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-fg-muted)' }}>• {domain}</span>
        </div>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-fg)', letterSpacing: '-0.02em' }}>{title}</h2>
      </div>

      {/* Observed Symptom Box */}
      <div className="flat-card flat-card-rose" style={{ padding: '1rem 1.15rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.775rem', fontWeight: 800, color: '#991b1b', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <AlertCircle size={16} /> Observed Symptom
        </div>
        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#7f1d1d' }}>{symptom}</div>
      </div>

      {/* Topology Context Info */}
      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-fg-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Network size={16} color="#3b82f6" />
        <span>Topology Context: <strong style={{ color: 'var(--color-fg)' }}>{topology}</strong></span>
      </div>

      {/* Cisco IOS Terminal View */}
      <div className="flat-terminal-box">
        <div className="flat-terminal-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontFamily: 'var(--font-mono)', fontSize: '0.775rem', fontWeight: 600 }}>
            <Terminal size={14} color="#38bdf8" /> Cisco IOS CLI Command Output
          </div>
          <button
            onClick={handleCopy}
            style={{
              backgroundColor: copied ? 'var(--color-secondary)' : 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              padding: '0.25rem 0.6rem',
              fontSize: '0.725rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              transition: 'transform 0.15s ease'
            }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? 'Copied' : 'Copy Output'}
          </button>
        </div>
        <div className="flat-terminal-text">
          {showOutputs}
        </div>
      </div>
    </div>
  );
};
