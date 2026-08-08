import React from 'react';
import { Terminal, AlertCircle } from 'lucide-react';

interface CLIViewerProps {
  symptom: string;
  topology: string;
  showOutputs: string;
}

export const CLIViewer: React.FC<CLIViewerProps> = ({
  symptom,
  topology,
  showOutputs,
}) => {
  return (
    <div className="glass-card" style={{ padding: '1.25rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <AlertCircle size={18} color="#f43f5e" />
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Observed Symptom</h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#e5e7eb', background: 'rgba(244,63,94,0.08)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #f43f5e' }}>
          {symptom}
        </p>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.85rem', color: '#9ca3af', fontWeight: 500, marginBottom: '0.25rem' }}>
          Topology Context: <span style={{ color: '#d1d5db' }}>{topology}</span>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Terminal size={16} color="#38bdf8" />
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#93c5fd' }}>Cisco IOS Show Command Output</span>
        </div>
        <div className="cli-container">
          {showOutputs}
        </div>
      </div>
    </div>
  );
};
