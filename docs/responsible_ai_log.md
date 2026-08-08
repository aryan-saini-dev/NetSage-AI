# NetSage AI - Responsible AI Audit & Human Correction Log

In accordance with Responsible AI principles and Cisco AICTE Project 2 guidelines, this log documents **5 real-world edge cases** where the automated AI diagnostic model generated an incomplete, inaccurate, or over-permissive diagnosis, requiring intervention and correction by a human network engineer.

Each entry analyzes the symptom, initial AI output, model failure taxonomy, human correction, and systemic guardrails implemented to prevent recurrence.

---

## Summary of Human Corrections

| Case ID | Fault Category | Initial AI Failure Mode | Human Correction Applied | Systemic Guardrail Added |
|---------|----------------|------------------------|---------------------------|--------------------------|
| **NET-007** | DHCP Pool Exhaustion | Attributed failure to DHCP Relay IP helper missing | Expanded DHCP pool scope from `/28` to `/24` | Added pool utilization parse check to Rule Engine |
| **NET-008** | OSPF Adjacency Failure | Misdiagnosed as OSPF Area ID mismatch | Corrected root cause to Hello/Dead timer mismatch (5s vs 10s) | Forced exact regex check on OSPF timer output |
| **NET-011** | Extended ACL Block | Suggested appending permit rule to end of ACL | Reordered ACL sequence 10 shadowing permit rule | Implemented ACL sequence order analyzer |
| **NET-014** | NAT Overload PAT Scope | Recommended over-permissive `permit ip any any` | Restricted NAT ACL scope to `192.168.30.0/24` | Added least-privilege guardrail prompt constraint |
| **NET-015** | Guest Wi-Fi Isolation | Attributed issue to WPA2 passphrase mismatch | Re-mapped WLAN 2 to isolated VLAN 99 | Created WLAN-to-VLAN mapping check |

---

## Detailed Case Audits

### 1. Case Audit: NET-007 (DHCP Pool Exhaustion vs Relay Helper)
- **Symptom**: Newly connected laptops in Staff room receive APIPA addresses (`169.254.x.x`) despite working physical links.
- **Initial AI Diagnosis**:
  - *Root Cause*: "Subinterface missing ip helper-address."
  - *OSI Layer*: Layer 7
  - *Proposed Fix*: `interface GigabitEthernet0/0/0.15` -> `ip helper-address 10.1.1.100`
- **Model Failure Analysis**: The AI saw DHCP failures and automatically defaulted to the common `ip helper-address` pattern without inspecting `show ip dhcp pool STAFF_POOL` output, which showed `Utilization mark: 100 / 0` and 14/14 leased addresses.
- **Human Correction**:
  ```cisco
  Router1(config)# ip dhcp pool STAFF_POOL
  Router1(config-dhcp)# network 192.168.15.0 255.255.255.0
  ```
- **Responsible AI Lesson**: Diagnostic models tend to over-index on frequent pattern shortcuts. Added explicit CLI state checks for pool exhaustion in `RULE-06_DHCP_HELPER_MISSING`.

---

### 2. Case Audit: NET-008 (OSPF Timer Mismatch vs Area Mismatch)
- **Symptom**: OSPF neighbor relationship stuck in `INIT/DOWN` on point-to-point link `10.255.0.0/30`.
- **Initial AI Diagnosis**:
  - *Root Cause*: "Router-HQ and Router-Branch are configured in different OSPF areas."
  - *OSI Layer*: Layer 3
  - *Proposed Fix*: `router ospf 1` -> `network 10.255.0.0 0.0.0.3 area 0`
- **Model Failure Analysis**: The model misread `Timer intervals configured, Hello 5, Dead 20` vs `Hello 10, Dead 40` and hallucinated an area mismatch even though area numbers were absent from the interface timer snippet.
- **Human Correction**:
  ```cisco
  Router-HQ(config)# interface GigabitEthernet0/0/1
  Router-HQ(config-if)# ip ospf hello-interval 10
  Router-HQ(config-if)# ip ospf dead-interval 40
  ```
- **Responsible AI Lesson**: Mandatory quote extraction (`evidence_quote`) forces the model to cite the exact timer lines, preventing ungrounded assumptions.

---

### 3. Case Audit: NET-011 (ACL Sequence Shadowing)
- **Symptom**: Web traffic to `172.16.1.100` on TCP port 80 blocked for subnet `192.168.10.0/24`.
- **Initial AI Diagnosis**:
  - *Root Cause*: "Missing web permit entry in ACL 101."
  - *Proposed Fix*: Add `permit tcp 192.168.10.0 0.0.0.255 host 172.16.1.100 eq 80` to ACL 101.
- **Model Failure Analysis**: The AI failed to realize that line 20 already permitted port 80, but line 10 (`deny ip 192.168.10.0 0.0.0.255 any`) was evaluated *first* and shadowed line 20. Appending another permit rule at sequence 40 would have no effect.
- **Human Correction**:
  ```cisco
  Router-FW(config)# ip access-list extended 101
  Router-FW(config-ext-nacl)# no 10
  Router-FW(config-ext-nacl)# 40 deny ip 192.168.10.0 0.0.0.255 any
  ```
- **Responsible AI Lesson**: Enforced sequence evaluation logic in prompt instructions so the AI analyzes top-down execution order.

---

### 4. Case Audit: NET-014 (Over-Permissive NAT Security Fix)
- **Symptom**: VLAN 30 hosts cannot reach the internet via NAT gateway.
- **Initial AI Diagnosis**:
  - *Root Cause*: "Standard ACL 1 excludes VLAN 30."
  - *Proposed Fix*: `access-list 1 permit any`
- **Model Failure Analysis**: While the root cause was correct, the AI recommended `permit any`, violating the Principle of Least Privilege and creating a major security vulnerability by allowing unauthorized subnets to traverse NAT.
- **Human Correction**:
  ```cisco
  Router-Edge(config)# access-list 1 permit 192.168.30.0 0.0.0.255
  ```
- **Responsible AI Lesson**: Added explicit prompt safety rule: "Never recommend 'permit any' or zero-restriction fixes unless explicitly requested by network policy."

---

### 5. Case Audit: NET-015 (Guest Wi-Fi VLAN Mapping)
- **Symptom**: Guest Wi-Fi users connected to 'Guest-Net' obtain internal corporate IP addresses (`10.1.10.x`).
- **Initial AI Diagnosis**:
  - *Root Cause*: "WPA2 passphrase authentication error on Access Point."
  - *Proposed Fix*: Reconfigure WPA2 pre-shared key on WLAN 2.
- **Model Failure Analysis**: The AI confused security credentials with Layer 2 VLAN tagging. `show wlan summary` clearly showed `WLAN 2 Guest-Net -> VLAN 10`, exposing internal subnets to guest users.
- **Human Correction**:
  ```cisco
  WAP-Floor1(config)# wlan 2
  WAP-Floor1(config-wlan)# vlan 99
  ```
- **Responsible AI Lesson**: Human review panel explicitly caught the VLAN isolation risk before applying any change to wireless controllers.
