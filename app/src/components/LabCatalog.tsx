import React, { useState } from 'react';
import { Case } from '../types';
import { Search, ArrowRight, CheckCircle2, Play } from 'lucide-react';

interface LabCatalogProps {
  cases: Case[];
  onSelectAndLaunch: (c: Case) => void;
}

export const LabCatalog: React.FC<LabCatalogProps> = ({ cases, onSelectAndLaunch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLayer, setSelectedLayer] = useState('All');

  const layers = ['All', 'Layer 1', 'Layer 2', 'Layer 3', 'Layer 4', 'Layer 7'];

  const getDiffClass = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'diff-easy';
      case 'medium': return 'diff-medium';
      default: return 'diff-hard';
    }
  };

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.case_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.symptom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLayer = selectedLayer === 'All' || c.osi_layer === selectedLayer;
    return matchesSearch && matchesLayer;
  });

  return (
    <div className="lc-catalog-container">
      {/* Bold Typography Hero */}
      <div style={{ marginBottom: '3.5rem', position: 'relative' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.75rem' }}>
          // CISCO PACKET TRACER LAB PROBLEMS
        </div>
        <h1 className="lc-hero-heading">
          TROUBLESHOOT.<br />VERIFY. DEPLOY.
        </h1>
        <p className="lc-hero-sub">
          Master real-world Cisco network lab scenarios. Analyze raw CLI show command outputs, run static rule checkers, evaluate AI diagnostic recommendations, and enforce human-in-the-loop verification.
        </p>

        {/* Search & Filter Bar */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
            <input
              type="text"
              style={{
                width: '100%',
                backgroundColor: 'var(--input)',
                border: '1px solid var(--border)',
                color: 'var(--fg)',
                padding: '0.85rem 1rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
              placeholder="Search problems by ID, VLAN, routing protocol, NAT, ACL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {layers.map((l) => (
              <button
                key={l}
                onClick={() => setSelectedLayer(l)}
                style={{
                  backgroundColor: selectedLayer === l ? 'var(--accent)' : 'var(--card)',
                  color: selectedLayer === l ? 'var(--accent-fg)' : 'var(--muted-fg)',
                  border: '1px solid var(--border)',
                  padding: '0.65rem 1rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer'
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LeetCode Problem Table */}
      <div className="lc-table-card">
        <table className="lc-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>Status</th>
              <th style={{ width: '110px' }}>Lab ID</th>
              <th>Problem Title</th>
              <th style={{ width: '180px' }}>Network Domain</th>
              <th style={{ width: '120px' }}>OSI Layer</th>
              <th style={{ width: '110px' }}>Severity</th>
              <th style={{ width: '120px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((c) => (
              <tr key={c.case_id} onClick={() => onSelectAndLaunch(c)}>
                <td>
                  <CheckCircle2 size={16} color="#10b981" />
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent)' }}>
                  {c.case_id}
                </td>
                <td style={{ fontWeight: 700, color: 'var(--fg)' }}>
                  {c.title}
                </td>
                <td style={{ color: 'var(--muted-fg)', fontSize: '0.825rem' }}>
                  {c.domain}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600 }}>
                  {c.osi_layer}
                </td>
                <td>
                  <span className={`lc-diff ${getDiffClass(c.severity)}`}>
                    {c.severity}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    className="bold-btn-primary"
                    style={{ fontSize: '0.75rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAndLaunch(c);
                    }}
                  >
                    Solve Lab <ArrowRight size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
