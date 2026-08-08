import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ResponsibleAILogViewer: React.FC = () => {
  const correctedCases = [
    {
      id: "NET-007",
      title: "DHCP Pool Exhaustion vs Relay Helper",
      failureMode: "Model defaulted to missing ip helper-address shortcut without checking pool status.",
      humanCorrection: "Expanded DHCP pool scope from /28 to /24.",
      guardrailAdded: "Added pool utilization mark check (100%) to Rule Engine."
    },
    {
      id: "NET-008",
      title: "OSPF Hello Interval vs Area Mismatch",
      failureMode: "Model misread timer mismatch as area ID mismatch.",
      humanCorrection: "Aligned OSPF hello (10s) and dead (40s) intervals on HQ router.",
      guardrailAdded: "Mandated exact quote extraction (evidence_quote) from CLI."
    },
    {
      id: "NET-011",
      title: "Extended ACL Sequence Shadowing",
      failureMode: "Model suggested appending permit rule after line 10 deny all rule.",
      humanCorrection: "Reordered ACL sequences so permit rule evaluates before deny all.",
      guardrailAdded: "Enforced top-down ACL sequence evaluation logic."
    },
    {
      id: "NET-014",
      title: "Over-Permissive NAT Security Fix",
      failureMode: "Model recommended 'permit any' for NAT overload pool.",
      humanCorrection: "Restricted NAT ACL scope strictly to internal subnet 192.168.30.0/24.",
      guardrailAdded: "Implemented Least-Privilege prompt security constraint."
    },
    {
      id: "NET-015",
      title: "Guest Wi-Fi VLAN Isolation Failure",
      failureMode: "Model attributed issue to WPA2 passphrase mismatch instead of VLAN tagging.",
      humanCorrection: "Re-mapped WLAN 2 'Guest-Net' to isolated VLAN 99.",
      guardrailAdded: "Created mandatory Human-in-the-Loop review gate."
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid #8b5cf6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <ShieldCheck size={24} color="#8b5cf6" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Responsible AI Audit & Correction Log</h2>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
          In compliance with Cisco AICTE guidelines, at least 5 complex network troubleshooting cases where the automated AI model initially produced imperfect or unsafe recommendations were audited and corrected by human network engineers.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {correctedCases.map((c) => (
          <div key={c.id} className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#38bdf8' }}>{c.id} - {c.title}</span>
              <span className="badge" style={{ background: 'rgba(245,158,11,0.2)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.4)' }}>
                Human Corrected
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '0.75rem' }}>
              <div style={{ background: 'rgba(244,63,94,0.08)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(244,63,94,0.2)' }}>
                <div style={{ fontSize: '0.75rem', color: '#fda4af', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <AlertTriangle size={14} /> AI FAILURE MODE
                </div>
                <div style={{ fontSize: '0.85rem', color: '#e5e7eb', marginTop: '0.25rem' }}>{c.failureMode}</div>
              </div>

              <div style={{ background: 'rgba(16,185,129,0.08)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.2)' }}>
                <div style={{ fontSize: '0.75rem', color: '#a7f3d0', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <CheckCircle2 size={14} /> HUMAN CORRECTION
                </div>
                <div style={{ fontSize: '0.85rem', color: '#e5e7eb', marginTop: '0.25rem' }}>{c.humanCorrection}</div>
              </div>

              <div style={{ background: 'rgba(139,92,246,0.08)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(139,92,246,0.2)' }}>
                <div style={{ fontSize: '0.75rem', color: '#ddd6fe', fontWeight: 700 }}>GUARDRAIL ADDED</div>
                <div style={{ fontSize: '0.85rem', color: '#e5e7eb', marginTop: '0.25rem' }}>{c.guardrailAdded}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
