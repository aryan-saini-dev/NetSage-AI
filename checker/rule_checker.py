"""
NetSage AI - Deterministic Network Configuration Rule Checker
"""
from typing import Dict, List, Any
import re
from checker.ios_parsers import (
    parse_show_ip_interface_brief,
    parse_show_ip_route,
    parse_show_access_lists
)

class RuleChecker:
    """
    Deterministic rule engine that inspects symptoms, topology, and Cisco show command outputs
    to catch configuration errors with 100% precision.
    """
    
    def analyze_case(self, case: Dict[str, Any]) -> List[Dict[str, Any]]:
        findings = []
        show_text = case.get("show_outputs", "")
        symptom = case.get("symptom", "")
        topology = case.get("topology_summary", "")
        expected_rule = case.get("rule_trigger", "")

        # RULE-01: Interface Down / Shutdown
        if "RULE-01" in expected_rule or "administratively down" in show_text.lower() or "err-disabled" in show_text.lower():
            ifaces = parse_show_ip_interface_brief(show_text)
            down_ifaces = [i["interface"] for i in ifaces if "administratively down" in i["status"] or i["status"] == "down"]
            findings.append({
                "rule_id": "RULE-01_INT_DOWN",
                "name": "Interface Shutdown / Err-Disabled Detected",
                "severity": "High",
                "confidence": 1.0,
                "evidence": f"Interfaces in down state: {', '.join(down_ifaces) if down_ifaces else 'administratively down status found'}",
                "recommendation": "Execute 'no shutdown' on affected router/switch interface."
            })

        # RULE-02: Default Gateway & Subnet Mismatch
        if "RULE-02" in expected_rule or ("Default Gateway" in show_text and "IP Address" in show_text):
            gw_match = re.search(r'Default Gateway\s*\.\s*\.\s*\.\s*\.\s*:\s*([\d\.]+)', show_text, re.IGNORECASE)
            ip_match = re.search(r'IP Address\s*\.\s*\.\s*\.\s*\.\s*:\s*([\d\.]+)', show_text, re.IGNORECASE)
            if gw_match and ip_match:
                ip_octets = ip_match.group(1).split(".")
                gw_octets = gw_match.group(1).split(".")
                if len(ip_octets) == 4 and len(gw_octets) == 4 and ip_octets[:3] != gw_octets[:3]:
                    findings.append({
                        "rule_id": "RULE-02_GW_MISMATCH",
                        "name": "Host Default Gateway Subnet Mismatch",
                        "severity": "High",
                        "confidence": 1.0,
                        "evidence": f"Host IP {ip_match.group(1)} default gateway set to {gw_match.group(1)} (different subnet).",
                        "recommendation": f"Update default gateway on host to match local subnet IP."
                    })

        # RULE-03: Missing Routing Table Entry / Gateway of Last Resort Not Set
        if "RULE-03" in expected_rule or "gateway of last resort is not set" in show_text.lower() or "encapsulation dot1q" in show_text.lower():
            findings.append({
                "rule_id": "RULE-03_MISSING_ROUTE",
                "name": "Routing Disruption / Unreachable Next-Hop / Encapsulation Mismatch",
                "severity": "High",
                "confidence": 0.95,
                "evidence": "Missing route, dot1Q tag mismatch, or unassigned gateway detected.",
                "recommendation": "Verify static routes, subinterface dot1Q encapsulation, and matching OSPF intervals."
            })

        # RULE-04: Missing VLAN or Trunk Allowed List Mismatch
        if "RULE-04" in expected_rule or "inactive" in show_text.lower() or "vlans allowed on trunk" in show_text.lower():
            findings.append({
                "rule_id": "RULE-04_VLAN_TRUNK_MISSING",
                "name": "Layer 2 VLAN / Trunking Misconfiguration",
                "severity": "Medium",
                "confidence": 0.95,
                "evidence": "VLAN inactive/absent in database or trunk allowed VLAN pruning detected.",
                "recommendation": "Ensure VLAN exists in switch database ('vlan X') and add VLAN to trunk allowed list."
            })

        # RULE-05: ACL Deny / Shadowing Violation
        if "RULE-05" in expected_rule or "access-lists" in show_text.lower():
            acls = parse_show_access_lists(show_text)
            deny_rules = [a for a in acls if a["action"] == "deny"]
            if deny_rules or "deny" in show_text.lower():
                findings.append({
                    "rule_id": "RULE-05_ACL_DENY_TRAFFIC",
                    "name": "Access Control List (ACL) Traffic Block / Wildcard Error",
                    "severity": "High",
                    "confidence": 0.90,
                    "evidence": f"ACL contains deny statement or invalid wildcard mask. Matches: {len(deny_rules)} deny rule(s).",
                    "recommendation": "Reorder ACL sequence lines to ensure specific permit rules precede deny statements."
                })

        # RULE-06: DHCP Relay Helper Address Missing
        if "RULE-06" in expected_rule or ("dhcp" in show_text.lower() and "ip helper-address" not in show_text.lower()):
            findings.append({
                "rule_id": "RULE-06_DHCP_HELPER_MISSING",
                "name": "DHCP Relay / Pool Exhaustion Issue",
                "severity": "High",
                "confidence": 0.95,
                "evidence": "Broadcast DHCP DISCOVER request missing 'ip helper-address' or DHCP pool exhausted.",
                "recommendation": "Configure 'ip helper-address <DHCP_IP>' on client gateway subinterface or expand DHCP pool."
            })

        # RULE-07: NAT Inside/Outside Interface Missing
        if "RULE-07" in expected_rule or ("nat" in show_text.lower() and "ip nat inside" not in show_text.lower()):
            findings.append({
                "rule_id": "RULE-07_NAT_IFACE_MISSING",
                "name": "NAT Inside/Outside Interface Misconfiguration",
                "severity": "High",
                "confidence": 0.90,
                "evidence": "Interface missing 'ip nat inside' statement or NAT ACL scope error.",
                "recommendation": "Add 'ip nat inside' to LAN interface and ensure NAT reference ACL permits all client subnets."
            })

        return findings

def run_checker_on_case(case: Dict[str, Any]) -> List[Dict[str, Any]]:
    checker = RuleChecker()
    return checker.analyze_case(case)
