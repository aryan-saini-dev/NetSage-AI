import React from 'react';
import { Cpu, ShieldCheck, Activity, FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: 'workspace' | 'dashboard' | 'responsible_ai';
  setActiveTab: (tab: 'workspace' | 'dashboard' | 'responsible_ai') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="app-header">
      <div className="logo-group">
        <div className="logo-badge">NetSage</div>
        <div className="title-text">
          <h1>AI Network Diagnostic Assistant</h1>
          <p>Cisco Packet Tracer Troubleshooter & Human-in-the-Loop Verification</p>
        </div>
      </div>

      <nav className="nav-tabs">
        <button
          className={`tab-btn ${activeTab === 'workspace' ? 'active' : ''}`}
          onClick={() => setActiveTab('workspace')}
        >
          <Cpu size={16} /> Diagnostic Workbench
        </button>
        <button
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <Activity size={16} /> Benchmark Metrics
        </button>
        <button
          className={`tab-btn ${activeTab === 'responsible_ai' ? 'active' : ''}`}
          onClick={() => setActiveTab('responsible_ai')}
        >
          <ShieldCheck size={16} /> Responsible AI Log
        </button>
      </nav>
    </header>
  );
};
