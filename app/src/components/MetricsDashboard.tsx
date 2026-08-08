import React from 'react';
import { Activity, CheckCircle, ShieldAlert, Cpu, BarChart3 } from 'lucide-react';

export const MetricsDashboard: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="metrics-grid">
        <div className="metric-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#9ca3af', fontSize: '0.8rem', fontWeight: 600 }}>
            <Cpu size={16} color="#38bdf8" /> Lab Scenarios Evaluated
          </div>
          <div className="metric-val">30</div>
          <div style={{ fontSize: '0.75rem', color: '#10b981' }}>100% Cisco Packet Tracer Coverage</div>
        </div>

        <div className="metric-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#9ca3af', fontSize: '0.8rem', fontWeight: 600 }}>
            <CheckCircle size={16} color="#10b981" /> AI Diagnostic Accuracy
          </div>
          <div className="metric-val" style={{ color: '#10b981' }}>96.7%</div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Root Cause Identification</div>
        </div>

        <div className="metric-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#9ca3af', fontSize: '0.8rem', fontWeight: 600 }}>
            <BarChart3 size={16} color="#f59e0b" /> Rule Engine Synergy
          </div>
          <div className="metric-val" style={{ color: '#f59e0b' }}>86.7%</div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Deterministic Static Checks</div>
        </div>

        <div className="metric-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#9ca3af', fontSize: '0.8rem', fontWeight: 600 }}>
            <ShieldAlert size={16} color="#8b5cf6" /> Human Agreement Rate
          </div>
          <div className="metric-val" style={{ color: '#8b5cf6' }}>80.0%</div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>24 Accepted, 5 Edited, 1 Rejected</div>
        </div>
      </div>

      <div className="card-panel">
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.85rem', color: '#f9fafb' }}>OSI Layer Distribution</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
          <div style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', padding: '0.85rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#fda4af', fontWeight: 600 }}>LAYER 1</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f43f5e', margin: '0.15rem 0' }}>4 Cases</div>
            <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Physical & Duplex</div>
          </div>

          <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', padding: '0.85rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#fde68a', fontWeight: 600 }}>LAYER 2</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f59e0b', margin: '0.15rem 0' }}>8 Cases</div>
            <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>VLAN, Trunk, STP</div>
          </div>

          <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', padding: '0.85rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#93c5fd', fontWeight: 600 }}>LAYER 3</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#3b82f6', margin: '0.15rem 0' }}>11 Cases</div>
            <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Subnet, Routing, NAT</div>
          </div>

          <div style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', padding: '0.85rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#ddd6fe', fontWeight: 600 }}>LAYER 4</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#8b5cf6', margin: '0.15rem 0' }}>3 Cases</div>
            <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>ACL Ports & Sequences</div>
          </div>

          <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', padding: '0.85rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#a7f3d0', fontWeight: 600 }}>LAYER 7</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#10b981', margin: '0.15rem 0' }}>4 Cases</div>
            <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>DHCP & DNS Services</div>
          </div>
        </div>
      </div>
    </div>
  );
};
