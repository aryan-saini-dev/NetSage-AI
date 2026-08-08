import React from 'react';
import { Cpu, ShieldCheck, Activity, Radio } from 'lucide-react';

interface HeaderProps {
  activeTab: 'workspace' | 'dashboard' | 'responsible_ai';
  setActiveTab: (tab: 'workspace' | 'dashboard' | 'responsible_ai') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="flat-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div className="flat-logo-badge">NetSage AI</div>
        <div>
          <div className="flat-nav-title">Cisco Network Diagnostic Assistant</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-fg-muted)', fontWeight: 500 }}>
            Packet Tracer Troubleshooting & Human Verification Workbench
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div className="flat-status-pill">
          <Radio size={14} color="#10b981" />
          <span>Gemini 2.5 Flash</span>
        </div>

        <nav className="flat-tab-group">
          <button
            className={`flat-tab-btn ${activeTab === 'workspace' ? 'active' : ''}`}
            onClick={() => setActiveTab('workspace')}
          >
            <Cpu size={16} /> Workbench
          </button>
          <button
            className={`flat-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Activity size={16} /> Metrics
          </button>
          <button
            className={`flat-tab-btn ${activeTab === 'responsible_ai' ? 'active' : ''}`}
            onClick={() => setActiveTab('responsible_ai')}
          >
            <ShieldCheck size={16} /> Audit Log
          </button>
        </nav>
      </div>
    </header>
  );
};
