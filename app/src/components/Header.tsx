import React from 'react';
import { Cpu, ShieldCheck, Activity } from 'lucide-react';

interface HeaderProps {
  activeTab: 'workspace' | 'dashboard' | 'responsible_ai';
  setActiveTab: (tab: 'workspace' | 'dashboard' | 'responsible_ai') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="app-header">
      <div className="brand-container">
        <div className="brand-badge">NetSage</div>
        <div>
          <div className="brand-title">Cisco AI Network Diagnostic Assistant</div>
          <div className="brand-subtitle">Packet Tracer Lab Troubleshooter & Human Verification</div>
        </div>
      </div>

      <nav className="nav-group">
        <button
          className={`nav-tab ${activeTab === 'workspace' ? 'active' : ''}`}
          onClick={() => setActiveTab('workspace')}
        >
          <Cpu size={15} /> Workbench
        </button>
        <button
          className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <Activity size={15} /> Metrics & Benchmark
        </button>
        <button
          className={`nav-tab ${activeTab === 'responsible_ai' ? 'active' : ''}`}
          onClick={() => setActiveTab('responsible_ai')}
        >
          <ShieldCheck size={15} /> Responsible AI Log
        </button>
      </nav>
    </header>
  );
};
