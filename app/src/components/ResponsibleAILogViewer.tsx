import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, Bookmark } from 'lucide-react';

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
      <div className="flat-card flat-card-primary" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
          <ShieldCheck size={26} color="#1d4ed8" />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e3a8a', letterSpacing: '-0.02em' }}>
            Responsible AI Audit & Human Correction Log
          </h2>
        </div>
        <p style={{ fontSize: '0.925rem', color: '#1e40af', fontWeight: 600, lineHeight: 1.5 }}>
          In compliance with Cisco AICTE guidelines, at least 5 complex network troubleshooting cases where the automated AI model initially produced imperfect or unsafe recommendations were audited and corrected by human network engineers.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
        {correctedCases.map((c) => (
          <div key={c.id} className="flat-card flat-card-interactive" style={{ padding: '1.35rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                {c.id} - {c.title}
              </span>
              <span className="flat-badge" style={{ backgroundColor: '#fef3c7', color: '#92400e', border: '1.5px solid #f59e0b' }}>
                Human Corrected
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
              <div className="flat-card" style={{ backgroundColor: '#fef2f2', borderColor: '#ef4444', padding: '0.85rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.2rem' }}>
                  <AlertTriangle size={14} /> AI FAILURE MODE
                </div>
                <div style={{ fontSize: '0.85rem', color: '#7f1d1d', fontWeight: 600 }}>{c.failureMode}</div>
              </div>

              <div className="flat-card" style={{ backgroundColor: '#ecfdf5', borderColor: '#10b981', padding: '0.85rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.2rem' }}>
                  <CheckCircle2 size={14} /> HUMAN CORRECTION
                </div>
                <div style={{ fontSize: '0.85rem', color: '#064e3b', fontWeight: 600 }}>{c.humanCorrection}</div>
              </div>

              <div className="flat-card" style={{ backgroundColor: '#f5f3ff', borderColor: '#8b5cf6', padding: '0.85rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#5b21b6', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.2rem' }}>
                  <Bookmark size={14} /> GUARDRAIL ADDED
                </div>
                <div style={{ fontSize: '0.85rem', color: '#4c1d95', fontWeight: 600 }}>{c.guardrailAdded}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
