import React from 'react';
import { Cpu, ShieldCheck, Activity, Radio } from 'lucide-react';

interface HeaderProps {
  activeTab: 'workspace' | 'dashboard' | 'responsible_ai';
  setActiveTab: (tab: 'workspace' | 'dashboard' | 'responsible_ai') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="app-navbar">
      <div className="nav-brand">
        <div className="brand-logo-pill">NetSage AI</div>
        <div className="brand-text">
          <h1>Cisco AI Diagnostic Assistant</h1>
          <p>Packet Tracer Lab Troubleshooter & Human Verification Workbench</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div className="status-indicator">
          <span className="status-dot"></span>
          <span>Engine: Gemini 2.5 Flash</span>
        </div>

        <nav className="nav-tab-list">
          <button
            className={`nav-tab-item ${activeTab === 'workspace' ? 'active' : ''}`}
            onClick={() => setActiveTab('workspace')}
          >
            <Cpu size={15} /> Workbench
          </button>
          <button
            className={`nav-tab-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Activity size={15} /> Metrics & Benchmark
          </button>
          <button
            className={`nav-tab-item ${activeTab === 'responsible_ai' ? 'active' : ''}`}
            onClick={() => setActiveTab('responsible_ai')}
          >
            <ShieldCheck size={15} /> Responsible AI Log
          </button>
        </nav>
      </div>
    </header>
  );
};
