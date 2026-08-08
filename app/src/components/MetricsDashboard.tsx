import React from 'react';
import { Cpu, CheckCircle, ShieldAlert, BarChart3 } from 'lucide-react';

export const MetricsDashboard: React.FC = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.75rem' }}>
        // SYSTEM PERFORMANCE METRICS
      </div>
      <h1 className="lc-hero-heading" style={{ fontSize: '3.5rem', marginBottom: '2.5rem' }}>
        DIAGNOSTIC ACCURACY & AUDIT BENCHMARKS
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="bold-card bold-card-accent">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase' }}>
            <Cpu size={18} /> Lab Scenarios Evaluated
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', fontWeight: 900, color: 'var(--fg)', lineHeight: 1, margin: '0.5rem 0' }}>
            30
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--muted-fg)' }}>100% Cisco Packet Tracer Coverage</div>
        </div>

        <div className="bold-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase' }}>
            <CheckCircle size={18} /> AI Diagnostic Accuracy
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', fontWeight: 900, color: '#10b981', lineHeight: 1, margin: '0.5rem 0' }}>
            96.7%
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--muted-fg)' }}>Root Cause Identification</div>
        </div>

        <div className="bold-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase' }}>
            <BarChart3 size={18} /> Rule Engine Synergy
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', fontWeight: 900, color: '#f59e0b', lineHeight: 1, margin: '0.5rem 0' }}>
            86.7%
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--muted-fg)' }}>Deterministic Static Checks</div>
        </div>

        <div className="bold-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8b5cf6', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase' }}>
            <ShieldAlert size={18} /> Human Agreement Rate
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', fontWeight: 900, color: '#8b5cf6', lineHeight: 1, margin: '0.5rem 0' }}>
            80.0%
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--muted-fg)' }}>24 Accepted, 5 Edited, 1 Rejected</div>
        </div>
      </div>

      <div className="bold-card">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--fg)' }}>
          OSI Layer Distribution Breakdown
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
          <div className="bold-card" style={{ borderColor: '#ef4444', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 800 }}>LAYER 1</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ef4444', margin: '0.2rem 0' }}>4 Cases</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted-fg)' }}>Physical & Duplex</div>
          </div>

          <div className="bold-card" style={{ borderColor: '#f59e0b', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 800 }}>LAYER 2</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#f59e0b', margin: '0.2rem 0' }}>8 Cases</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted-fg)' }}>VLAN, Trunk, STP</div>
          </div>

          <div className="bold-card" style={{ borderColor: '#3b82f6', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 800 }}>LAYER 3</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#3b82f6', margin: '0.2rem 0' }}>11 Cases</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted-fg)' }}>Subnet, Routing, NAT</div>
          </div>

          <div className="bold-card" style={{ borderColor: '#8b5cf6', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#8b5cf6', fontWeight: 800 }}>LAYER 4</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#8b5cf6', margin: '0.2rem 0' }}>3 Cases</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted-fg)' }}>ACL Ports & Sequences</div>
          </div>

          <div className="bold-card" style={{ borderColor: '#10b981', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 800 }}>LAYER 7</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#10b981', margin: '0.2rem 0' }}>4 Cases</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted-fg)' }}>DHCP & DNS Services</div>
          </div>
        </div>
      </div>
    </div>
  );
};
