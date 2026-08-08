import React, { useState } from 'react';
import { ViewMode, Case } from '../types';
import { ProblemDrawer } from './ProblemDrawer';
import { List, Menu, X, ChevronRight } from 'lucide-react';

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="lc-header" style={{ height: '50px', padding: '0 1rem' }}>
        <div className="lc-brand" style={{ gap: '0.65rem' }}>
          <div className="lc-logo" onClick={() => setActiveView('catalog')} style={{ cursor: 'pointer', fontSize: '1.05rem' }}>
            NETSAGE<span>.AI</span>
          </div>
          <span style={{ color: 'var(--border)', fontSize: '1rem' }}>/</span>

          {/* LeetCode Problem List Hamburger Drawer Button */}
          {activeView === 'workspace' && (
            <button
              onClick={() => setIsDrawerOpen(true)}
              style={{
                backgroundColor: 'var(--card)',
                color: 'var(--fg)',
                border: '1px solid var(--border)',
                padding: '0.35rem 0.65rem',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'border-color 0.15s ease'
              }}
            >
              <List size={15} color="var(--accent)" />
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{selectedCase.case_id}</span>
              <span className="hide-mobile" style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {selectedCase.title}
              </span>
              <ChevronRight size={14} color="var(--muted-fg)" />
            </button>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="lc-nav-links hide-mobile" style={{ gap: '1.25rem' }}>
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

        {/* Mobile Hamburger Navigation Button */}
        <button
          className="show-mobile-only"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--fg)', cursor: 'pointer', padding: '0.35rem' }}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Dropdown Navigation Menu */}
      {isMobileMenuOpen && (
        <div
          className="show-mobile-only"
          style={{
            backgroundColor: 'var(--card)',
            borderBottom: '1px solid var(--border)',
            padding: '0.75rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            zIndex: 90
          }}
        >
          <button
            className={`lc-nav-item ${activeView === 'catalog' ? 'active' : ''}`}
            style={{ textAlign: 'left', padding: '0.5rem 0' }}
            onClick={() => { setActiveView('catalog'); setIsMobileMenuOpen(false); }}
          >
            Lab Catalog
          </button>
          <button
            className={`lc-nav-item ${activeView === 'workspace' ? 'active' : ''}`}
            style={{ textAlign: 'left', padding: '0.5rem 0' }}
            onClick={() => { setActiveView('workspace'); setIsMobileMenuOpen(false); }}
          >
            Simulator Workspace
          </button>
          <button
            className={`lc-nav-item ${activeView === 'metrics' ? 'active' : ''}`}
            style={{ textAlign: 'left', padding: '0.5rem 0' }}
            onClick={() => { setActiveView('metrics'); setIsMobileMenuOpen(false); }}
          >
            Metrics & Benchmarks
          </button>
          <button
            className={`lc-nav-item ${activeView === 'audit' ? 'active' : ''}`}
            style={{ textAlign: 'left', padding: '0.5rem 0' }}
            onClick={() => { setActiveView('audit'); setIsMobileMenuOpen(false); }}
          >
            Responsible AI Audit Log
          </button>
        </div>
      )}

      {/* Problem List Sliding Drawer Overlay */}
      <ProblemDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        cases={cases}
        selectedCase={selectedCase}
        onSelectCase={onSelectCase}
      />
    </>
  );
};
