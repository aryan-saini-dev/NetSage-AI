# NetSage AI - AI-Assisted Cisco Network Troubleshooting System

> **Cisco AICTE Virtual Internship Program 2026 | Applied AI + Network Troubleshooting (Project 2)**

NetSage AI is an AI-assisted network troubleshooting assistant designed for Cisco Packet Tracer and enterprise lab environments. It analyzes network symptoms, topology notes, and Cisco IOS `show` command outputs to diagnose root causes across OSI layers, recommend exact CLI verification commands, run static configuration rule checks, and enforce mandatory **Human-in-the-Loop (HITL)** verification before applying configuration fixes.

---

## 🌟 Technical Architecture

```
                                  +-----------------------------+
                                  | Lab Case / User Input       |
                                  | Symptom + Show CLI Outputs  |
                                  +--------------+--------------+
                                                 |
                        +------------------------+------------------------+
                        |                                                 |
                        v                                                 v
        +-------------------------------+                 +-------------------------------+
        | Deterministic Rule Engine     |                 | AI Diagnostic Engine          |
        | (checker/rule_checker.py)     |                 | (prompts/diagnose_prompt.md)  |
        | Static IOS regex parsers for  |                 | Powered by Gemini 2.5 Flash,  |
        | interfaces, routes, VLANs, ACL|                 | Evidence Quoting & JSON Schema|
        +---------------+---------------+                 +---------------+---------------+
                        |                                                 |
                        +------------------------+------------------------+
                                                 |
                                                 v
                                  +-----------------------------+
                                  | Human Review Workbench      |
                                  | (app/ & netsage_cli.py)     |
                                  | Accept | Edit | Reject      |
                                  +--------------+--------------+
                                                 |
                        +------------------------+------------------------+
                        |                                                 |
                        v                                                 v
        +-------------------------------+                 +-------------------------------+
        | Verified Solution & Audit     |                 | Responsible AI Audit Log      |
        | Cisco IOS Command Deployment  |                 | (docs/responsible_ai_log.md)  |
        +-------------------------------+                 +-------------------------------+
```

---

## 📋 Cisco AICTE Project Deliverables Matrix

| Deliverable Item | Location | Description & Compliance Status |
|------------------|----------|---------------------------------|
| **Case Dataset (30 Cases)** | [`dataset/cases.csv`](file:///c:/Users/Aryan%20Saini/Documents/Git%20Projects/NetSage-AI/dataset/cases.csv) & [`dataset/cases.json`](file:///c:/Users/Aryan%20Saini/Documents/Git%20Projects/NetSage-AI/dataset/cases.json) | 30 comprehensive Cisco Packet Tracer troubleshooting cases covering Layer 1 through Layer 7 with complete symptoms, show outputs, expected faults, OSI layer, and CLI fixes. |
| **AI Prompt Library** | [`prompts/diagnose_prompt.md`](file:///c:/Users/Aryan%20Saini/Documents/Git%20Projects/NetSage-AI/prompts/diagnose_prompt.md) | Senior CCNP persona prompt enforcing structured JSON output schema, confidence scoring, evidence quoting, and few-shot worked examples. |
| **Deterministic Rule Checker** | [`checker/rule_checker.py`](file:///c:/Users/Aryan%20Saini/Documents/Git%20Projects/NetSage-AI/checker/rule_checker.py) | Python static config validator for Cisco IOS parsing (shutdown interfaces, gateway mismatches, missing routes, VLAN database errors, ACL deny conflicts, DHCP exhaustion, missing NAT). |
| **Interactive Web Dashboard** | [`app/`](file:///c:/Users/Aryan%20Saini/Documents/Git%20Projects/NetSage-AI/app) | Modern React + TypeScript + Vite Web Application featuring scenario selection, CLI output viewer, HITL review workbench (`Accept`/`Edit`/`Reject`), and metric charts. |
| **Interactive Terminal Workbench** | [`netsage_cli.py`](file:///c:/Users/Aryan%20Saini/Documents/Git%20Projects/NetSage-AI/netsage_cli.py) | Interactive terminal shell utility for executing diagnoses and logging human review decisions directly in the terminal. |
| **Responsible AI Audit Log** | [`docs/responsible_ai_log.md`](file:///c:/Users/Aryan%20Saini/Documents/Git%20Projects/NetSage-AI/docs/responsible_ai_log.md) | 5 in-depth case studies documenting initial AI misdiagnoses, root cause model failure taxonomy, human corrections, and guardrail improvements. |
| **Lab Topology Guide** | [`docs/packet_tracer_lab_guide.md`](file:///c:/Users/Aryan%20Saini/Documents/Git%20Projects/NetSage-AI/docs/packet_tracer_lab_guide.md) | Network topology documentation with ASCII diagrams for Enterprise Router-on-a-Stick, OSPF Dual-Area WAN, and Edge NAT/ACL Gateways. |
| **Master Launcher** | [`run_all.py`](file:///c:/Users/Aryan%20Saini/Documents/Git%20Projects/NetSage-AI/run_all.py) | One-click terminal menu for launching benchmarks, terminal workbench, web server, and exporter. |
| **Benchmark Evaluator** | [`evaluate.py`](file:///c:/Users/Aryan%20Saini/Documents/Git%20Projects/NetSage-AI/evaluate.py) | CLI benchmark evaluator testing all 30 cases and scoring diagnostic accuracy, evidence grounding rate, and human agreement. |

---

## ⚡ Quick Start Guide

### Prerequisites
- **Python 3.10+**
- **Node.js 18+** & **npm**

### 1. Environment & API Setup
Copy `.env.example` to `.env` and add your Google Gemini API key:
```bash
cp .env.example .env
```
Edit `.env` file:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

*(Note: If no API key is provided or if rate limits occur, NetSage AI automatically falls back to its offline benchmark engine to ensure 100% reliable execution).*

---

### 2. Run Master Control Launcher
Launch the all-in-one interactive launcher from a single terminal:

```bash
python run_all.py
```

```
==========================================================================
                 NetSage AI - Master Control Launcher                     
==========================================================================
 Select an option to execute:

 [1] Run Automated Benchmark Evaluation   (python evaluate.py)
 [2] Launch Interactive Terminal Workbench (python netsage_cli.py)
 [3] Launch Web Dashboard Server           (cd app && npm run dev)
 [4] Verify & Export Submission Zip        (python export_submission.py)
 [Q] Quit
--------------------------------------------------------------------------
```

---

### 3. Option Details

#### Option 1: Benchmark Evaluation (`python evaluate.py`)
Evaluates all 30 lab scenarios against the Rule Engine and AI model, displaying diagnostic scores:
```
================================================================
           NetSage AI Diagnostic Benchmark Suite               
================================================================

[+] Total Lab Scenarios Evaluated : 30
[+] Rule Engine Accuracy Score     : 86.67%
[+] AI Root Cause Diagnostic Score : 100.0%
[+] Evidence Grounding Rate        : 100.0%
[+] Human Agreement Rate           : 80.0%

--- Human Review Breakdown ---
    Approved / Accepted : 24
    Human Corrected     : 5
    Rejected            : 1
================================================================
[OK] Evaluation complete. All 30 cases verified successfully.
```

#### Option 2: Interactive Terminal Workbench (`python netsage_cli.py`)
Allows you to select any case interactively, inspect Cisco `show` outputs, view AI root cause recommendations, and record Human-in-the-Loop review actions (`Accept`, `Edit`, `Reject`).

#### Option 3: Web Dashboard (`cd app && npm run dev`)
Launches the sleek dark-mode web application at `http://localhost:3000`:
- **Diagnostic Workbench**: Scenario selector across 30 cases, live Cisco CLI viewer, AI recommendations, and interactive review buttons.
- **Benchmark Metrics Panel**: Real-time OSI layer distribution charts and agreement statistics.
- **Responsible AI Log**: Interactive case study viewer.

#### Option 4: Verification & Submission Exporter (`python export_submission.py`)
Audits all deliverables against the Cisco AICTE checklist and packages a submission ZIP `NetSage_AI_Cisco_Submission.zip`.

---

## 🌐 Network Domain & OSI Layer Coverage

NetSage AI covers 8 core networking domain categories across 30 lab cases:

```
[Layer 1 - Physical]     : Shutdown Interfaces, Duplex/Speed Mismatches, Port Security err-disabled.
[Layer 2 - Data Link]    : Missing VLANs in database, Trunk allowed VLAN pruning, STP blocked ports, EtherChannel PAgP/LACP mismatch.
[Layer 3 - Network]      : Host gateway subnet mismatches, Subinterface dot1Q encapsulation errors, Static route next-hop unreachable, OSPF hello/dead timer & area mismatches, NAT inside/outside interface missing, NAT ACL scope.
[Layer 4 - Transport]    : Extended ACL implicit deny shadowing, reversed wildcard mask errors.
[Layer 7 - Application]  : DHCP relay missing helper-addresses, DHCP pool exhaustion, DNS server IP mismatch, NTP synchronization ACL blocks.
```

---

## 🛡️ Responsible AI & Safety Principles

1. **Human-in-the-Loop (HITL) Safety Gate**: AI recommendations are treated as proposals. A human network engineer must approve, correct, or reject the fix before applying CLI commands to production network hardware.
2. **Anti-Hallucination Evidence Quoting**: Diagnostic prompts force the AI to cite literal string evidence from raw CLI output.
3. **Least Privilege Guardrails**: Prevents over-permissive security fixes (e.g. prohibits `permit ip any any` for NAT or firewall rules).

---

## 📁 Repository Structure

```
NetSage-AI/
├── .env                           # Environment file for GEMINI_API_KEY & GEMINI_MODEL
├── .env.example                   # Environment file template
├── README.md                      # Project documentation & Cisco AICTE matrix
├── run_all.py                     # Master one-click terminal control launcher
├── evaluate.py                    # Automated benchmark evaluation suite
├── netsage_cli.py                 # Interactive terminal diagnostic workbench
├── export_submission.py           # Deliverables auditor & ZIP packager
├── dataset/
│   ├── cases.csv                  # 30 detailed lab scenarios in CSV format
│   └── cases.json                 # Structured JSON export for web UI & API evaluation
├── prompts/
│   ├── diagnose_prompt.md         # Primary diagnostic prompt with JSON schema & few-shot examples
│   └── helper_prompts.md          # Guardrail & evidence extraction helper prompts
├── checker/
│   ├── ios_parsers.py             # Cisco IOS CLI text regex parsers
│   └── rule_checker.py            # Deterministic static config rule engine
├── src/
│   ├── ai_engine.py               # AI inference engine (Gemini 2.5 Flash + Local Fallback)
│   ├── evaluator.py               # Accuracy & benchmark metric calculator
│   └── models.py                  # Dataclass domain models
├── app/                           # Vite + React + TypeScript Web Application
│   ├── src/
│   │   ├── components/            # Header, CaseSelector, CLIViewer, AIDiagnosisPanel, HumanReviewPanel, MetricsDashboard
│   │   ├── index.css              # Dark mode glassmorphism design system
│   │   └── App.tsx                # Main React app controller
│   └── package.json
└── docs/
    ├── responsible_ai_log.md      # 5 deep-dive human correction case studies
    └── packet_tracer_lab_guide.md # Network topology guide with ASCII diagrams
```

---

## 📜 License & Compliance

Designed and built for the **Cisco AICTE Virtual Internship Program 2026**.
All lab scenarios use standard Cisco IOS syntax and Packet Tracer network topology patterns.
