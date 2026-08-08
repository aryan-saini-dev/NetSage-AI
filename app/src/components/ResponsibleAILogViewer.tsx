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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.75rem' }}>
        // AUDIT & RESPONSIBLE AI AUDIT LOG
      </div>
      <h1 className="lc-hero-heading" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
        HUMAN CORRECTIONS & AI FAILURE TAXONOMY
      </h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--muted-fg)', marginBottom: '3rem', maxWidth: '800px' }}>
        In compliance with Cisco AICTE guidelines, at least 5 complex network troubleshooting cases where the automated AI model initially produced imperfect or unsafe recommendations were audited and corrected by human network engineers.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {correctedCases.map((c) => (
          <div key={c.id} className="bold-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1rem', color: 'var(--accent)' }}>
                {c.id} - {c.title}
              </span>
              <span className="lc-diff diff-medium">Human Corrected</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div className="bold-card" style={{ borderColor: '#ef4444' }}>
                <div style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  <AlertTriangle size={15} /> AI Failure Mode
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--fg)', lineHeight: 1.5 }}>{c.failureMode}</div>
              </div>

              <div className="bold-card" style={{ borderColor: '#10b981' }}>
                <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  <CheckCircle2 size={15} /> Human Correction
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--fg)', lineHeight: 1.5 }}>{c.humanCorrection}</div>
              </div>

              <div className="bold-card" style={{ borderColor: '#8b5cf6' }}>
                <div style={{ fontSize: '0.75rem', color: '#8b5cf6', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  <Bookmark size={15} /> Systemic Guardrail Added
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--fg)', lineHeight: 1.5 }}>{c.guardrailAdded}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
