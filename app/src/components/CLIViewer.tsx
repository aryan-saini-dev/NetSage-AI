import React from 'react';
import { Terminal, AlertCircle, Network } from 'lucide-react';

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
  return (
    <div className="card-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Case Header Banner */}
      <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600 }}>
            {caseId}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>• {domain}</span>
        </div>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f9fafb' }}>{title}</h2>
      </div>

      {/* Observed Symptom Box */}
      <div style={{ background: 'rgba(244,63,94,0.06)', borderLeft: '3px solid #f43f5e', padding: '0.75rem 0.85rem', borderRadius: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 600, color: '#fda4af', marginBottom: '0.2rem', textTransform: 'uppercase' }}>
          <AlertCircle size={14} /> Observed Symptom
        </div>
        <div style={{ fontSize: '0.875rem', color: '#e5e7eb' }}>{symptom}</div>
      </div>

      {/* Topology Context */}
      <div style={{ fontSize: '0.8rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Network size={14} color="#3b82f6" />
        <span>Topology Context: <strong style={{ color: '#d1d5db' }}>{topology}</strong></span>
      </div>

      {/* Cisco IOS Terminal View */}
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontFamily: 'var(--font-mono)' }}>
            Cisco IOS CLI Output Viewer
          </div>
        </div>
        <div className="terminal-body">
          {showOutputs}
        </div>
      </div>
    </div>
  );
};
