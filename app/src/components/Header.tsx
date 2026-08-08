import React from 'react';
import { ViewMode, Case } from '../types';
import { Terminal, ChevronRight, Play } from 'lucide-react';

interface HeaderProps {
  activeView: ViewMode;
  setActiveView: (view: ViewMode) => void;
  selectedCase: Case;
  cases: Case[];
  onSelectCase: (c: Case) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  selectedCase,
  cases,
  onSelectCase,
}) => {
  return (
    <header className="lc-header">
      <div className="lc-brand">
        <div className="lc-logo" onClick={() => setActiveView('catalog')} style={{ cursor: 'pointer' }}>
          NETSAGE<span>.AI</span>
        </div>
        <span style={{ color: 'var(--border)', fontSize: '1.25rem' }}>/</span>
        
        {/* LeetCode Problem Selector / Breadcrumb */}
        {activeView === 'workspace' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <select
              style={{
                backgroundColor: 'var(--card)',
                color: 'var(--fg)',
                border: '1px solid var(--border)',
                padding: '0.35rem 0.65rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
              value={selectedCase.case_id}
              onChange={(e) => {
                const found = cases.find(c => c.case_id === e.target.value);
                if (found) onSelectCase(found);
              }}
            >
              {cases.map(c => (
                <option key={c.case_id} value={c.case_id}>
                  {c.case_id} - {c.title.substring(0, 40)}...
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <nav className="lc-nav-links">
        <button
          className={`lc-nav-item ${activeView === 'catalog' ? 'active' : ''}`}
          onClick={() => setActiveView('catalog')}
        >
          Lab Catalog
        </button>
        <button
          className={`lc-nav-item ${activeView === 'workspace' ? 'active' : ''}`}
          onClick={() => setActiveView('workspace')}
        >
          Simulator
        </button>
        <button
          className={`lc-nav-item ${activeView === 'metrics' ? 'active' : ''}`}
          onClick={() => setActiveView('metrics')}
        >
          Metrics
        </button>
        <button
          className={`lc-nav-item ${activeView === 'audit' ? 'active' : ''}`}
          onClick={() => setActiveView('audit')}
        >
          Audit Log
        </button>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          className="bold-btn-solid"
          style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}
          onClick={() => setActiveView('workspace')}
        >
          <Play size={12} style={{ fill: 'currentColor' }} /> Run Lab
        </button>
      </div>
    </header>
  );
};
