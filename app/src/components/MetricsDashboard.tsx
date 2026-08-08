import React from 'react';
import { Activity, CheckCircle, ShieldAlert, Cpu, BarChart3 } from 'lucide-react';

export const MetricsDashboard: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <div className="flat-card flat-card-interactive" style={{ backgroundColor: 'var(--color-primary-light)', borderColor: 'var(--color-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e40af', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase' }}>
            <Cpu size={18} color="#1d4ed8" /> Lab Scenarios Evaluated
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1e3a8a', margin: '0.2rem 0' }}>30</div>
          <div style={{ fontSize: '0.8rem', color: '#1e40af', fontWeight: 700 }}>100% Cisco Packet Tracer Coverage</div>
        </div>

        <div className="flat-card flat-card-interactive" style={{ backgroundColor: 'var(--color-secondary-light)', borderColor: 'var(--color-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#065f46', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase' }}>
            <CheckCircle size={18} color="#059669" /> AI Diagnostic Accuracy
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#064e3b', margin: '0.2rem 0' }}>96.7%</div>
          <div style={{ fontSize: '0.8rem', color: '#065f46', fontWeight: 700 }}>Root Cause Identification</div>
        </div>

        <div className="flat-card flat-card-interactive" style={{ backgroundColor: 'var(--color-accent-light)', borderColor: 'var(--color-accent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#92400e', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase' }}>
            <BarChart3 size={18} color="#d97706" /> Rule Engine Synergy
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#78350f', margin: '0.2rem 0' }}>86.7%</div>
          <div style={{ fontSize: '0.8rem', color: '#92400e', fontWeight: 700 }}>Deterministic Static Checks</div>
        </div>

        <div className="flat-card flat-card-interactive" style={{ backgroundColor: 'var(--color-purple-light)', borderColor: 'var(--color-purple)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#5b21b6', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase' }}>
            <ShieldAlert size={18} color="#7c3aed" /> Human Agreement Rate
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#4c1d95', margin: '0.2rem 0' }}>80.0%</div>
          <div style={{ fontSize: '0.8rem', color: '#5b21b6', fontWeight: 700 }}>24 Accepted, 5 Edited, 1 Rejected</div>
        </div>
      </div>

      <div className="flat-card">
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.15rem', color: 'var(--color-fg)', letterSpacing: '-0.02em' }}>
          OSI Layer Distribution Breakdown
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
          <div className="flat-card" style={{ backgroundColor: '#fef2f2', borderColor: '#ef4444', textAlign: 'center', padding: '1.15rem 0.5rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#991b1b', fontWeight: 800 }}>LAYER 1</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#991b1b', margin: '0.2rem 0' }}>4 Cases</div>
            <div style={{ fontSize: '0.75rem', color: '#b91c1c', fontWeight: 600 }}>Physical & Duplex</div>
          </div>

          <div className="flat-card" style={{ backgroundColor: '#fef3c7', borderColor: '#f59e0b', textAlign: 'center', padding: '1.15rem 0.5rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#92400e', fontWeight: 800 }}>LAYER 2</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#92400e', margin: '0.2rem 0' }}>8 Cases</div>
            <div style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: 600 }}>VLAN, Trunk, STP</div>
          </div>

          <div className="flat-card" style={{ backgroundColor: '#dbeafe', borderColor: '#3b82f6', textAlign: 'center', padding: '1.15rem 0.5rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#1e40af', fontWeight: 800 }}>LAYER 3</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#1e40af', margin: '0.2rem 0' }}>11 Cases</div>
            <div style={{ fontSize: '0.75rem', color: '#1d4ed8', fontWeight: 600 }}>Subnet, Routing, NAT</div>
          </div>

          <div className="flat-card" style={{ backgroundColor: '#ede9fe', borderColor: '#8b5cf6', textAlign: 'center', padding: '1.15rem 0.5rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#5b21b6', fontWeight: 800 }}>LAYER 4</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#5b21b6', margin: '0.2rem 0' }}>3 Cases</div>
            <div style={{ fontSize: '0.75rem', color: '#6d28d9', fontWeight: 600 }}>ACL Ports & Sequences</div>
          </div>

          <div className="flat-card" style={{ backgroundColor: '#d1fae5', borderColor: '#10b981', textAlign: 'center', padding: '1.15rem 0.5rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#065f46', fontWeight: 800 }}>LAYER 7</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#065f46', margin: '0.2rem 0' }}>4 Cases</div>
            <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 600 }}>DHCP & DNS Services</div>
          </div>
        </div>
      </div>
    </div>
  );
};
