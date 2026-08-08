import React from 'react';
import { ViewMode, Case } from '../types';

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
    <header className="lc-header" style={{ height: '48px', padding: '0 1.25rem' }}>
      <div className="lc-brand" style={{ gap: '0.75rem' }}>
        <div className="lc-logo" onClick={() => setActiveView('catalog')} style={{ cursor: 'pointer', fontSize: '1.05rem' }}>
          NETSAGE<span>.AI</span>
        </div>
        <span style={{ color: 'var(--border)', fontSize: '1rem' }}>/</span>
        
        {/* LeetCode Problem Selector Dropdown */}
        {activeView === 'workspace' && (
          <select
            style={{
              backgroundColor: 'var(--card)',
              color: 'var(--fg)',
              border: '1px solid var(--border)',
              padding: '0.25rem 0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.775rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer',
              maxWidth: '360px'
            }}
            value={selectedCase.case_id}
            onChange={(e) => {
              const found = cases.find(c => c.case_id === e.target.value);
              if (found) onSelectCase(found);
            }}
          >
            {cases.map(c => (
              <option key={c.case_id} value={c.case_id}>
                {c.case_id} - {c.title}
              </option>
            ))}
          </select>
        )}
      </div>

      <nav className="lc-nav-links" style={{ gap: '1.25rem' }}>
        <button
          className={`lc-nav-item ${activeView === 'catalog' ? 'active' : ''}`}
          style={{ fontSize: '0.775rem' }}
          onClick={() => setActiveView('catalog')}
        >
          Lab Catalog
        </button>
        <button
          className={`lc-nav-item ${activeView === 'workspace' ? 'active' : ''}`}
          style={{ fontSize: '0.775rem' }}
          onClick={() => setActiveView('workspace')}
        >
          Simulator
        </button>
        <button
          className={`lc-nav-item ${activeView === 'metrics' ? 'active' : ''}`}
          style={{ fontSize: '0.775rem' }}
          onClick={() => setActiveView('metrics')}
        >
          Metrics
        </button>
        <button
          className={`lc-nav-item ${activeView === 'audit' ? 'active' : ''}`}
          style={{ fontSize: '0.775rem' }}
          onClick={() => setActiveView('audit')}
        >
          Audit Log
        </button>
      </nav>
    </header>
  );
};
