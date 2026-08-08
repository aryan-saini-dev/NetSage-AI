"""
NetSage AI - Deterministic Cisco IOS Command Parsers
"""
import re
from typing import Dict, List, Any

def parse_show_ip_interface_brief(output: str) -> List[Dict[str, Any]]:
    """
    Parses 'show ip interface brief' output.
    Returns list of dicts: [{'interface': str, 'ip_address': str, 'status': str, 'protocol': str}]
    """
    results = []
    lines = output.strip().split('\n')
    for line in lines:
        # Match interface lines e.g.: GigabitEthernet0/0/0 192.168.10.1 YES manual administratively down down
        match = re.search(r'^(?P<iface>[\w\d/\.\-]+)\s+(?P<ip>[\d\.]+|unassigned)\s+\w+\s+\w+\s+(?P<status>administratively down|up|down)\s+(?P<proto>up|down)', line, re.IGNORECASE)
        if match:
            results.append({
                "interface": match.group("iface"),
                "ip_address": match.group("ip"),
                "status": match.group("status").lower(),
                "protocol": match.group("proto").lower()
            })
    return results

def parse_show_ip_route(output: str) -> Dict[str, Any]:
    """
    Parses 'show ip route' output.
    Returns gateway of last resort and list of parsed route entries.
    """
    gw_match = re.search(r'Gateway of last resort is\s+(?P<gw>[^\n]+)', output, re.IGNORECASE)
    gateway_of_last_resort = gw_match.group("gw").strip() if gw_match else "not set"

    routes = []
    lines = output.strip().split('\n')
    for line in lines:
        # Match static/OSPF/connected routes e.g.: S 172.16.10.0/24 [1/0] via 10.1.1.5
        route_match = re.search(r'^(?P<code\>[C|S|O])\s+(?P<prefix\>[\d\.\/]+)(\s+\[\d+/\d+\]\s+via\s+(?P<nexthop\>[\d\.]+))?', line)
        if route_match:
            routes.append({
                "code": route_match.group("code"),
                "prefix": route_match.group("prefix"),
                "next_hop": route_match.group("nexthop") or "directly connected"
            })
    return {
        "gateway_of_last_resort": gateway_of_last_resort,
        "routes": routes
    }

def parse_show_access_lists(output: str) -> List[Dict[str, Any]]:
    """
    Parses 'show access-lists' output.
    Returns list of ACL rules with sequence, action, matches.
    """
    rules = []
    lines = output.strip().split('\n')
    for line in lines:
        # Match e.g.: 10 deny ip 192.168.10.0 0.0.0.255 any (1420 matches)
        acl_match = re.search(r'^\s*(?P<seq>\d+)\s+(?P<action>permit|deny)\s+(?P<details>[^\(]+)(\((?P<matches>\d+)\s+matches\))?', line, re.IGNORECASE)
        if acl_match:
            rules.append({
                "sequence": int(acl_match.group("seq")),
                "action": acl_match.group("action").lower(),
                "details": acl_match.group("details").strip(),
                "matches": int(acl_match.group("matches") or 0)
            })
    return rules
