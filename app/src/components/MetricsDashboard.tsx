import React from 'react';
import { Activity, CheckCircle, ShieldAlert, Cpu, BarChart3 } from 'lucide-react';

export const MetricsDashboard: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="stat-grid">
        <div className="glass-card stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontSize: '0.85rem' }}>
            <Cpu size={18} color="#38bdf8" /> Lab Scenarios Evaluated
          </div>
          <div className="stat-number">30</div>
          <div style={{ fontSize: '0.75rem', color: '#10b981' }}>100% Cisco Packet Tracer Coverage</div>
        </div>

        <div className="glass-card stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontSize: '0.85rem' }}>
            <CheckCircle size={18} color="#4ade80" /> AI Diagnostic Accuracy
          </div>
          <div className="stat-number" style={{ background: 'linear-gradient(to right, #4ade80, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            96.7%
          </div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Root Cause Identification</div>
        </div>

        <div className="glass-card stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontSize: '0.85rem' }}>
            <BarChart3 size={18} color="#f59e0b" /> Rule Engine Synergy
          </div>
          <div className="stat-number" style={{ background: 'linear-gradient(to right, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            76.7%
          </div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Deterministic Static Check Hits</div>
        </div>

        <div className="glass-card stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontSize: '0.85rem' }}>
            <ShieldAlert size={18} color="#8b5cf6" /> Human Agreement Rate
          </div>
          <div className="stat-number" style={{ background: 'linear-gradient(to right, #a78bfa, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            80.0%
          </div>
          <div style={{ fontSize: '0.75rem', color: '#8b5cf6' }}>24 Accepted, 5 Edited, 1 Rejected</div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>OSI Layer Distribution Breakdown</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#fda4af', fontWeight: 600 }}>LAYER 1</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f43f5e' }}>4 Cases</div>
            <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Physical & Duplex</div>
          </div>

          <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#fde68a', fontWeight: 600 }}>LAYER 2</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b' }}>8 Cases</div>
            <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>VLAN, Trunk, STP</div>
          </div>

          <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#93c5fd', fontWeight: 600 }}>LAYER 3</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3b82f6' }}>11 Cases</div>
            <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Subnet, Routing, NAT</div>
          </div>

          <div style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#ddd6fe', fontWeight: 600 }}>LAYER 4</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#8b5cf6' }}>3 Cases</div>
            <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>ACL Ports & Sequences</div>
          </div>

          <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#a7f3d0', fontWeight: 600 }}>LAYER 7</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>4 Cases</div>
            <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>DHCP & DNS Services</div>
          </div>
        </div>
      </div>
    </div>
  );
};
