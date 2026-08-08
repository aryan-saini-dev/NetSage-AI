import csv
import json
import os

cases = [
    {
        "case_id": "NET-001",
        "title": "PC1 Cannot Ping Gateway - Interface Administratively Down",
        "domain": "Physical & Layer 2",
        "osi_layer": "Layer 1",
        "severity": "High",
        "symptom": "PC1 (192.168.10.15) cannot ping its default gateway 192.168.10.1 or reach external servers.",
        "topology_summary": "Topology: PC1 -> Switch1 (Gig0/1) -> Router1 (Gig0/0/0). PC1 IP: 192.168.10.15/24, GW: 192.168.10.1.",
        "show_outputs": """Router1# show ip interface brief
Interface              IP-Address      OK? Method Status                  Protocol
GigabitEthernet0/0/0   192.168.10.1    YES manual administratively down   down
GigabitEthernet0/0/1   10.0.0.1        YES manual up                      up
Loopback0              1.1.1.1         YES manual up                      up

Switch1# show interfaces status
Port      Name               Status       Vlan       Duplex  Speed Type
Gi0/1     Link to PC1        connected    10         a-full  a-1000 1000BaseTX
Gi0/2     Link to Router1    connected    10         a-full  a-1000 1000BaseTX""",
        "expected_fault": "Router interface GigabitEthernet0/0/0 is administratively down (disabled by shutdown command).",
        "expected_fix": "Router1(config)# interface GigabitEthernet0/0/0\nRouter1(config-if)# no shutdown",
        "rule_trigger": "RULE-01_INT_DOWN"
    },
    {
        "case_id": "NET-002",
        "title": "Host IP Default Gateway Subnet Mismatch",
        "domain": "Default Gateway & Subnetting",
        "osi_layer": "Layer 3",
        "severity": "High",
        "symptom": "Host PC2 in Accounting department gets IP via manual config but cannot reach local gateway or internet.",
        "topology_summary": "Topology: Host PC2 (192.168.20.50/24) connected to Switch2. Default gateway set to 192.168.10.1 instead of 192.168.20.1.",
        "show_outputs": """PC2> ipconfig /all
FastEthernet0 Connection:
   IP Address. . . . . . . . . . . : 192.168.20.50
   Subnet Mask . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . : 192.168.10.1

Router1# show ip interface brief
Interface              IP-Address      OK? Method Status                  Protocol
GigabitEthernet0/0/0.20 192.168.20.1   YES manual up                      up""",
        "expected_fault": "PC2 default gateway is configured as 192.168.10.1, which belongs to VLAN 10 subnet, whereas PC2 is on 192.168.20.0/24.",
        "expected_fix": "Reconfigure PC2 network settings:\nIP: 192.168.20.50\nSubnet Mask: 255.255.255.0\nDefault Gateway: 192.168.20.1",
        "rule_trigger": "RULE-02_GW_MISMATCH"
    },
    {
        "case_id": "NET-003",
        "title": "VLAN Traffic Blocked Due to Missing VLAN in Switch Database",
        "domain": "VLAN & Trunking",
        "osi_layer": "Layer 2",
        "severity": "High",
        "symptom": "Sales PCs assigned to VLAN 30 on Switch-Access-2 have no connectivity to router or other VLAN 30 devices.",
        "topology_summary": "Switch-Access-2 access ports FastEthernet0/5-10 assigned to switchport access vlan 30, but VLAN 30 is not created in the VLAN database.",
        "show_outputs": """Switch-Access-2# show vlan brief
VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Fa0/1, Fa0/2, Fa0/3, Fa0/4
10   Engineering                      active    Fa0/11, Fa0/12
20   Accounting                       active    Fa0/13, Fa0/14
1002 fddi-default                     act/unsup 
1003 token-ring-default               act/unsup 

Switch-Access-2# show interfaces FastEthernet0/5 switchport
Name: Fa0/5
Switchport: Enabled
Administrative Mode: static access
Operational Mode: down
Access Mode VLAN: 30 (inactive)""",
        "expected_fault": "VLAN 30 is assigned to access ports but does not exist in the switch VLAN database, rendering ports inactive.",
        "expected_fix": "Switch-Access-2(config)# vlan 30\nSwitch-Access-2(config-vlan)# name Sales",
        "rule_trigger": "RULE-04_VLAN_TRUNK_MISSING"
    },
    {
        "case_id": "NET-004",
        "title": "Trunk Allowed VLAN List Pruning Sales Traffic",
        "domain": "VLAN & Trunking",
        "osi_layer": "Layer 2",
        "severity": "Medium",
        "symptom": "VLAN 30 users on Switch-B cannot communicate with VLAN 30 server on Switch-A across trunk link Gi0/1.",
        "topology_summary": "Switch-A connected to Switch-B via Gi0/1 trunk link. Allowed VLAN list on Gi0/1 is restricted to 10,20.",
        "show_outputs": """Switch-A# show interfaces trunk
Port        Mode         Encapsulation  Status        Native vlan
Gi0/1       on           802.1q         trunking      1

Port        Vlans allowed on trunk
Gi0/1       10,20

Port        Vlans allowed and active in management domain
Gi0/1       10,20

Port        Vlans in spanning tree forwarding state and not pruned
Gi0/1       10,20""",
        "expected_fault": "Trunk interface Gi0/1 configuration explicitly limits allowed VLANs to '10,20', dropping VLAN 30 traffic.",
        "expected_fix": "Switch-A(config)# interface GigabitEthernet0/1\nSwitch-A(config-if)# switchport trunk allowed vlan add 30",
        "rule_trigger": "RULE-04_VLAN_TRUNK_MISSING"
    },
    {
        "case_id": "NET-005",
        "title": "Router-on-a-Stick Subinterface Encapsulation Mismatch",
        "domain": "Inter-VLAN Routing",
        "osi_layer": "Layer 3",
        "severity": "High",
        "symptom": "VLAN 40 HR hosts can ping local switch but cannot reach gateway 192.168.40.1 on Router1.",
        "topology_summary": "Router-on-a-Stick setup on Router1 Gi0/0/0. Subinterface Gi0/0/0.40 configured with wrong dot1Q tag 50.",
        "show_outputs": """Router1# show running-config interface GigabitEthernet0/0/0.40
Building configuration...
interface GigabitEthernet0/0/0.40
 encapsulation dot1Q 50
 ip address 192.168.40.1 255.255.255.0
end

Switch1# show interfaces trunk
Port        Mode         Encapsulation  Status        Native vlan
Gi0/1       on           802.1q         trunking      1
Gi0/1       Vlans allowed on trunk: 10,20,30,40""",
        "expected_fault": "Subinterface GigabitEthernet0/0/0.40 is configured with 'encapsulation dot1Q 50' instead of matching VLAN 40.",
        "expected_fix": "Router1(config)# interface GigabitEthernet0/0/0.40\nRouter1(config-subif)# encapsulation dot1Q 40",
        "rule_trigger": "RULE-03_MISSING_ROUTE"
    },
    {
        "case_id": "NET-006",
        "title": "Missing Cross-Subnet DHCP Relay Helper Address",
        "domain": "DHCP & Services",
        "osi_layer": "Layer 7",
        "severity": "High",
        "symptom": "Clients on VLAN 20 (192.168.20.0/24) fail to receive IP addresses from centralized DHCP server (10.1.1.100).",
        "topology_summary": "Client PC in VLAN 20 sends DHCP DISCOVER broadcast. Gateway router subinterface Gi0/0.20 lacks ip helper-address.",
        "show_outputs": """Router1# show running-config interface GigabitEthernet0/0/0.20
Building configuration...
interface GigabitEthernet0/0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.1 255.255.255.0
end

DHCP-Server# show ip dhcp binding
IP address       Client-ID/Hardware address   Lease expiration       Type
10.1.1.100       0100.e04c.1122.33            Infinite               Manual""",
        "expected_fault": "Router subinterface Gi0/0/0.20 is missing 'ip helper-address 10.1.1.100' to forward broadcast DHCP DISCOVER requests across subnets.",
        "expected_fix": "Router1(config)# interface GigabitEthernet0/0/0.20\nRouter1(config-subif)# ip helper-address 10.1.1.100",
        "rule_trigger": "RULE-06_DHCP_HELPER_MISSING"
    },
    {
        "case_id": "NET-007",
        "title": "DHCP Pool Exhaustion in Staff Subnet",
        "domain": "DHCP & Services",
        "osi_layer": "Layer 7",
        "severity": "Medium",
        "symptom": "Newly connected laptops in Staff room receive APIPA addresses (169.254.x.x) despite working network infrastructure.",
        "topology_summary": "Router1 acts as DHCP server for 192.168.15.0/28 (14 usable IPs). 14 leases already allocated.",
        "show_outputs": """Router1# show ip dhcp pool STAFF_POOL
Pool STAFF_POOL :
 Utilization mark (high/low)    : 100 / 0
 Subnet size (total/usable)     : 16 / 14
 Total addresses                : 14
 Leased addresses               : 14
 Pending addresses              : 0
 Subnet : 192.168.15.0 255.255.255.240
 Default router                 : 192.168.15.1""",
        "expected_fault": "DHCP pool STAFF_POOL is exhausted (/28 subnet only provides 14 addresses and all 14 are leased).",
        "expected_fix": "Expand DHCP pool subnet mask to /24:\nRouter1(config)# ip dhcp pool STAFF_POOL\nRouter1(config-dhcp)# network 192.168.15.0 255.255.255.0",
        "rule_trigger": "RULE-06_DHCP_HELPER_MISSING"
    },
    {
        "case_id": "NET-008",
        "title": "OSPF Hello Interval Mismatch Blocking Adjacency",
        "domain": "Dynamic Routing",
        "osi_layer": "Layer 3",
        "severity": "High",
        "symptom": "Router-HQ and Router-Branch show OSPF neighbor state stuck in INIT/DOWN on link 10.255.0.0/30.",
        "topology_summary": "Point-to-point link between HQ (Gi0/0/1) and Branch (Gi0/0/0). OSPF hello timer changed on HQ to 5s while Branch remains 10s.",
        "show_outputs": """Router-HQ# show ip ospf interface GigabitEthernet0/0/1
GigabitEthernet0/0/1 is up, line protocol is up
  Process ID 1, Router ID 1.1.1.1, Network Type BROADCAST, Cost: 1
  Timer intervals configured, Hello 5, Dead 20, Wait 20, Retransmit 5

Router-Branch# show ip ospf interface GigabitEthernet0/0/0
GigabitEthernet0/0/0 is up, line protocol is up
  Process ID 1, Router ID 2.2.2.2, Network Type BROADCAST, Cost: 1
  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5""",
        "expected_fault": "OSPF Hello/Dead timer mismatch (HQ: Hello 5/Dead 20, Branch: Hello 10/Dead 40) prevents OSPF neighbor adjacency.",
        "expected_fix": "Router-HQ(config)# interface GigabitEthernet0/0/1\nRouter-HQ(config-if)# ip ospf hello-interval 10\nRouter-HQ(config-if)# ip ospf dead-interval 40",
        "rule_trigger": "RULE-03_MISSING_ROUTE"
    },
    {
        "case_id": "NET-009",
        "title": "OSPF Area Mismatch on Point-to-Point Link",
        "domain": "Dynamic Routing",
        "osi_layer": "Layer 3",
        "severity": "High",
        "symptom": "Branch subnets are not learned by Core router; `show ip route` missing 192.168.50.0/24.",
        "topology_summary": "Core Router Gi0/0/2 configured in OSPF Area 0; Branch Router Gi0/0/0 configured in OSPF Area 1.",
        "show_outputs": """Router-Core# show running-config | section router ospf
router ospf 1
 router-id 10.0.0.1
 network 10.0.0.0 0.0.0.3 area 0

Router-Branch# show running-config | section router ospf
router ospf 1
 router-id 10.0.0.2
 network 10.0.0.0 0.0.0.3 area 1
 network 192.168.50.0 0.0.0.255 area 1""",
        "expected_fault": "Inter-router connecting subnet 10.0.0.0/30 is configured in Area 0 on Core but Area 1 on Branch router.",
        "expected_fix": "Router-Branch(config)# router ospf 1\nRouter-Branch(config-router)# no network 10.0.0.0 0.0.0.3 area 1\nRouter-Branch(config-router)# network 10.0.0.0 0.0.0.3 area 0",
        "rule_trigger": "RULE-03_MISSING_ROUTE"
    },
    {
        "case_id": "NET-0010",
        "title": "Static Route Next-Hop Unreachable",
        "domain": "Static Routing",
        "osi_layer": "Layer 3",
        "severity": "High",
        "symptom": "Branch office users cannot reach Server Farm at 172.16.10.0/24; pings time out.",
        "topology_summary": "Branch Router static route configured pointing to next-hop IP 10.1.1.5 instead of active gateway 10.1.1.2.",
        "show_outputs": """Router-Branch# show ip route
Codes: C - connected, S - static, O - OSPF
Gateway of last resort is not set

      10.0.0.0/24 is subnetted, 1 subnets
C        10.1.1.0/24 is directly connected, GigabitEthernet0/0/0
S     172.16.10.0/24 [1/0] via 10.1.1.5

Router-Branch# show ip arp
Protocol  Address          Age (min)  Hardware Addr   Type   Interface
Internet  10.1.1.2                5   0001.63a0.b101  ARPA   GigabitEthernet0/0/0
Internet  10.1.1.5                -   Incomplete      ARPA   GigabitEthernet0/0/0""",
        "expected_fault": "Static route for 172.16.10.0/24 points to incorrect next-hop IP 10.1.1.5, which has no ARP resolution.",
        "expected_fix": "Router-Branch(config)# no ip route 172.16.10.0 255.255.255.0 10.1.1.5\nRouter-Branch(config)# ip route 172.16.10.0 255.255.255.0 10.1.1.2",
        "rule_trigger": "RULE-03_MISSING_ROUTE"
    },
    {
        "case_id": "NET-011",
        "title": "Extended ACL Implicit Deny Shadowing Web Traffic",
        "domain": "Security & ACLs",
        "osi_layer": "Layer 4",
        "severity": "High",
        "symptom": "Internal users on 192.168.10.0/24 cannot access Web Server at 172.16.1.100 on TCP port 80/443.",
        "topology_summary": "Router-FW interface Gi0/0/0 in has ACL 101 applied. Sequence 10 denies all IP traffic from 192.168.10.0/24, shadowing sequence 20 permit rule.",
        "show_outputs": """Router-FW# show access-lists 101
Extended IP access list 101
    10 deny ip 192.168.10.0 0.0.0.255 any (1420 matches)
    20 permit tcp 192.168.10.0 0.0.0.255 host 172.16.1.100 eq www (0 matches)
    30 permit tcp 192.168.10.0 0.0.0.255 host 172.16.1.100 eq 443 (0 matches)

Router-FW# show ip interface GigabitEthernet0/0/0
GigabitEthernet0/0/0 is up, line protocol is up
  Inbound access list is 101""",
        "expected_fault": "ACL 101 line 10 'deny ip 192.168.10.0 0.0.0.255 any' shadows lines 20 & 30, dropping all Web traffic before rule evaluation.",
        "expected_fix": "Router-FW(config)# ip access-list extended 101\nRouter-FW(config-ext-nacl)# no 10\nRouter-FW(config-ext-nacl)# 40 deny ip 192.168.10.0 0.0.0.255 any",
        "rule_trigger": "RULE-05_ACL_DENY_TRAFFIC"
    },
    {
        "case_id": "NET-012",
        "title": "Reversed ACL Wildcard Mask Blocking Entire Subnet",
        "domain": "Security & ACLs",
        "osi_layer": "Layer 4",
        "severity": "High",
        "symptom": "Admin intended to block single host 192.168.1.50, but all hosts in 192.168.1.0/24 are blocked.",
        "topology_summary": "ACL entry written with subnet mask 255.255.255.0 instead of Cisco inverted wildcard mask 0.0.0.0.",
        "show_outputs": """Router1# show access-lists BLOCK_HOST
Standard IP access list BLOCK_HOST
    10 deny 192.168.1.50 255.255.255.0 (350 matches)
    20 permit any""",
        "expected_fault": "Wildcard mask configured as '255.255.255.0' instead of '0.0.0.0' or host keyword, causing pattern match on all addresses in 192.168.1.0/24.",
        "expected_fix": "Router1(config)# ip access-list standard BLOCK_HOST\nRouter1(config-std-nacl)# no 10\nRouter1(config-std-nacl)# 10 deny host 192.168.1.50",
        "rule_trigger": "RULE-05_ACL_DENY_TRAFFIC"
    },
    {
        "case_id": "NET-013",
        "title": "NAT Inside Interface Configuration Missing",
        "domain": "NAT & Edge Routing",
        "osi_layer": "Layer 3",
        "severity": "High",
        "symptom": "LAN clients 192.168.10.0/24 cannot reach internet IP 8.8.8.8; router drops unroutable private addresses at ISP gateway.",
        "topology_summary": "Edge Router has 'ip nat outside' on Gi0/0/1 (WAN) but missing 'ip nat inside' on LAN subinterface Gi0/0/0.10.",
        "show_outputs": """Router-Edge# show ip nat interface
NAT Interfaces:
  Outside interface: GigabitEthernet0/0/1

Router-Edge# show running-config interface GigabitEthernet0/0/0.10
Building configuration...
interface GigabitEthernet0/0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.0
end""",
        "expected_fault": "LAN interface GigabitEthernet0/0/0.10 lacks 'ip nat inside' directive, preventing NAT translation execution.",
        "expected_fix": "Router-Edge(config)# interface GigabitEthernet0/0/0.10\nRouter-Edge(config-subif)# ip nat inside",
        "rule_trigger": "RULE-07_NAT_IFACE_MISSING"
    },
    {
        "case_id": "NET-014",
        "title": "NAT Overload Pool ACL Mismatch",
        "domain": "NAT & Edge Routing",
        "osi_layer": "Layer 3",
        "severity": "High",
        "symptom": "Users in VLAN 30 (192.168.30.0/24) cannot browse external websites while VLAN 10 users have full internet access.",
        "topology_summary": "PAT rule 'ip nat inside source list 1 interface Gi0/0/1 overload' references ACL 1 which only permits 192.168.10.0/24.",
        "show_outputs": """Router-Edge# show ip nat statistics
Total active translations: 12 (0 static, 12 dynamic; 12 extended)
Outside interfaces: GigabitEthernet0/0/1
Inside interfaces: GigabitEthernet0/0/0.10, GigabitEthernet0/0/0.30
Hits: 5410  Misses: 1200

Router-Edge# show access-lists 1
Standard IP access list 1
    10 permit 192.168.10.0 0.0.0.255""",
        "expected_fault": "NAT ACL 1 only includes subnet 192.168.10.0/24, ignoring VLAN 30 subnet 192.168.30.0/24.",
        "expected_fix": "Router-Edge(config)# access-list 1 permit 192.168.30.0 0.0.0.255",
        "rule_trigger": "RULE-07_NAT_IFACE_MISSING"
    },
    {
        "case_id": "NET-015",
        "title": "Guest Wi-Fi Isolation Failure (VLAN Mapping)",
        "domain": "Wireless & Security",
        "osi_layer": "Layer 2",
        "severity": "Critical",
        "symptom": "Guest Wi-Fi users connected to 'Guest-Net' SSID are assigned internal corporate IP IPs (10.1.10.x) and can access internal servers.",
        "topology_summary": "Access Point WLAN 'Guest-Net' is mapped to corporate VLAN 10 instead of isolated Guest VLAN 99.",
        "show_outputs": """WAP-Floor1# show wlan summary
WLAN ID  SSID Name        Status  VLAN ID  Security
-------  ---------------  ------  -------  ------------
1        Corp-Internal    UP      10       WPA2-Enterprise
2        Guest-Net        UP      10       Open

Switch-AP# show interfaces FastEthernet0/1 switchport
Name: Fa0/1
Administrative Mode: trunk
Trunking Native Mode VLAN: 1 (default)
Administrative Allowed VLANs: 10,99""",
        "expected_fault": "Guest WLAN 'Guest-Net' is erroneously mapped to VLAN 10 (Corp Internal) instead of VLAN 99 (Isolated Guest).",
        "expected_fix": "WAP-Floor1(config)# wlan 2\nWAP-Floor1(config-wlan)# vlan 99",
        "rule_trigger": "RULE-04_VLAN_TRUNK_MISSING"
    },
    {
        "case_id": "NET-016",
        "title": "DNS Server IP Configuration Error on Client",
        "domain": "Default Gateway & Subnetting",
        "osi_layer": "Layer 7",
        "severity": "Medium",
        "symptom": "Workstation can ping external IP 8.8.8.8 successfully but fails to open http://cisco.com or resolve domain names.",
        "topology_summary": "Workstation static DNS server misconfigured to 192.168.1.254 (non-existent IP) instead of internal DNS server 10.1.1.53.",
        "show_outputs": """Workstation> ipconfig /all
   IP Address. . . . . . . . . . . : 192.168.1.105
   Subnet Mask . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . : 192.168.1.1
   DNS Servers . . . . . . . . . . : 192.168.1.254

Workstation> nslookup cisco.com
DNS request timed out.
    timeout was 2 seconds.
*** Request to 192.168.1.254 timed out""",
        "expected_fault": "DNS server IP set to unreachable host 192.168.1.254, breaking domain name resolution.",
        "expected_fix": "Reconfigure Workstation DNS settings to primary corporate DNS server 10.1.1.53.",
        "rule_trigger": "RULE-02_GW_MISMATCH"
    },
    {
        "case_id": "NET-017",
        "title": "Duplex Mismatch Causing High CRC Errors & Sluggishness",
        "domain": "Physical & Layer 2",
        "osi_layer": "Layer 1",
        "severity": "Medium",
        "symptom": "File transfers between Server1 and Switch1 are extremely slow with frequent TCP retransmissions.",
        "topology_summary": "Switch interface Gi0/1 set to forced speed 1000 / full duplex while connected NIC autonegotiated to half duplex.",
        "show_outputs": """Switch1# show interfaces GigabitEthernet0/1
GigabitEthernet0/1 is up, line protocol is up (connected)
  Hardware is Gigabit Ethernet, address is 0019.e762.a001
  Full-duplex, 1000Mb/s, media type is 1000BaseTX
  35412 input errors, 12044 CRC, 8402 frame, 0 overrun, 0 queue drops
  14902 late collisions, 43102 deferred""",
        "expected_fault": "Duplex mismatch on GigabitEthernet0/1 (Switch forced full, peer half duplex) causing high CRC and late collision counters.",
        "expected_fix": "Switch1(config)# interface GigabitEthernet0/1\nSwitch1(config-if)# duplex auto\nSwitch1(config-if)# speed auto",
        "rule_trigger": "RULE-01_INT_DOWN"
    },
    {
        "case_id": "NET-018",
        "title": "Default Route Missing on Edge Router",
        "domain": "Static Routing",
        "osi_layer": "Layer 3",
        "severity": "Critical",
        "symptom": "All corporate LAN users have inter-VLAN connectivity but zero access to internet destinations outside 10.0.0.0/8.",
        "topology_summary": "Edge Router routing table has routes for internal subnets but no default route (0.0.0.0 0.0.0.0) to ISP next-hop 203.0.113.1.",
        "show_outputs": """Router-Edge# show ip route
Codes: C - connected, S - static, O - OSPF
Gateway of last resort is not set

      10.0.0.0/8 is subnetted, 3 subnets
C        10.1.1.0/24 is directly connected, GigabitEthernet0/0/0
C        10.1.2.0/24 is directly connected, GigabitEthernet0/0/1
O        10.2.0.0/16 [110/2] via 10.1.1.2, 01:14:22, GigabitEthernet0/0/0""",
        "expected_fault": "Gateway of last resort is not set. Missing static default route 'ip route 0.0.0.0 0.0.0.0 203.0.113.1' on Edge router.",
        "expected_fix": "Router-Edge(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1",
        "rule_trigger": "RULE-03_MISSING_ROUTE"
    },
    {
        "case_id": "NET-019",
        "title": "Spanning Tree Protocol (STP) Blocked Port Loop Prevention",
        "domain": "VLAN & Trunking",
        "osi_layer": "Layer 2",
        "severity": "Low",
        "symptom": "User reports high latency to Switch-C; traffic takes sub-optimal path through Switch-B.",
        "topology_summary": "Redundant triangle switch topology (Switch-A, Switch-B, Switch-C). Switch-C Gi0/2 port is in STP BLK state due to lower root bridge ID on Switch-A.",
        "show_outputs": """Switch-C# show spanning-tree vlan 1
VLAN0001
  Spanning tree enabled protocol ieee
  Root ID    Priority    32769
             Address     000A.4111.1111
             Cost        19
             Port        Gi0/1 (GigabitEthernet0/1)
  
Interface        Role Sts Cost      Prio.Nbr Type
---------------- ---- --- --------- -------- --------------------------------
Gi0/1            Root FWD 19        128.1    P2p 
Gi0/2            Altn BLK 19        128.2    P2p""",
        "expected_fault": "Expected STP topology state: Gi0/2 is in Alternate Blocking mode to prevent Layer 2 loop. Latency is expected behavior for redundant loop prevention.",
        "expected_fix": "If Switch-C should be Root Bridge:\nSwitch-C(config)# spanning-tree vlan 1 root primary",
        "rule_trigger": "RULE-04_VLAN_TRUNK_MISSING"
    },
    {
        "case_id": "NET-020",
        "title": "Switchport Access VLAN Mismatch on Link",
        "domain": "VLAN & Trunking",
        "osi_layer": "Layer 2",
        "severity": "High",
        "symptom": "Printer on Switch2 Fa0/12 cannot receive traffic from Print Server on Switch1 Fa0/12.",
        "topology_summary": "Switch1 Fa0/12 configured in access vlan 20 (Printers). Switch2 Fa0/12 configured in access vlan 1 (default).",
        "show_outputs": """Switch1# show interfaces FastEthernet0/12 switchport
Name: Fa0/12
Operational Mode: static access
Access Mode VLAN: 20 (Printers)

Switch2# show interfaces FastEthernet0/12 switchport
Name: Fa0/12
Operational Mode: static access
Access Mode VLAN: 1 (default)""",
        "expected_fault": "Port Fa0/12 on Switch2 is in VLAN 1 instead of VLAN 20 (Printers).",
        "expected_fix": "Switch2(config)# interface FastEthernet0/12\nSwitch2(config-if)# switchport access vlan 20",
        "rule_trigger": "RULE-04_VLAN_TRUNK_MISSING"
    },
    {
        "case_id": "NET-021",
        "title": "Port Security Violation Shutting Down Port",
        "domain": "Security & ACLs",
        "osi_layer": "Layer 2",
        "severity": "High",
        "symptom": "User plugged rogue wireless router into wall jack Fa0/4; port suddenly went dark and turned red.",
        "topology_summary": "Switchport Fa0/4 has sticky port-security with maximum 1 MAC address. Unauthorized MAC triggered err-disabled status.",
        "show_outputs": """Switch1# show interfaces FastEthernet0/4
FastEthernet0/4 is down, line protocol is down (err-disabled)
  Hardware is Fast Ethernet, address is 0011.2233.4404

Switch1# show port-security interface FastEthernet0/4
Port Security              : Enabled
Port Status                : Secure-shutdown
Violation Mode             : Shutdown
Maximum MAC Addresses      : 1
Total MAC Addresses        : 1
Security Violation Count   : 1""",
        "expected_fault": "Port Security violation triggered on Fa0/4 due to unexpected MAC address, placing interface into err-disabled state.",
        "expected_fix": "Remove unauthorized device, then reset port:\nSwitch1(config)# interface FastEthernet0/4\nSwitch1(config-if)# shutdown\nSwitch1(config-if)# no shutdown",
        "rule_trigger": "RULE-01_INT_DOWN"
    },
    {
        "case_id": "NET-022",
        "title": "SVI Interface Down Due to Missing Active VLAN Ports",
        "domain": "Inter-VLAN Routing",
        "osi_layer": "Layer 3",
        "severity": "High",
        "symptom": "Layer 3 Switch SVI interface Vlan30 shows down/down state; inter-VLAN routing for VLAN 30 fails.",
        "topology_summary": "Switch-L3 SVI interface Vlan30 configured but all physical access/trunk ports carrying VLAN 30 are down or unassigned.",
        "show_outputs": """Switch-L3# show ip interface brief
Interface              IP-Address      OK? Method Status                  Protocol
Vlan10                 192.168.10.1    YES manual up                      up
Vlan20                 192.168.20.1    YES manual up                      up
Vlan30                 192.168.30.1    YES manual down                    down

Switch-L3# show vlan id 30
VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
30   VLAN0030                         active    """,
        "expected_fault": "SVI Vlan30 line protocol is down because no physical switchports assigned to VLAN 30 are active and up.",
        "expected_fix": "Assign at least one active trunk interface or access port to VLAN 30 on Switch-L3.",
        "rule_trigger": "RULE-01_INT_DOWN"
    },
    {
        "case_id": "NET-023",
        "title": "HSRP Active/Active Split-Brain State",
        "domain": "Inter-VLAN Routing",
        "osi_layer": "Layer 3",
        "severity": "Critical",
        "symptom": "Intermittent packet loss for default gateway 10.1.1.1; ARP table on hosts flips back and forth between two MACs.",
        "topology_summary": "Router-1 and Router-2 running HSRP group 1 on Gi0/0/0. Inter-router link down, causing both routers to assume HSRP Active state.",
        "show_outputs": """Router-1# show standby brief
                     P Active     Standby         Virtual IP
Gi0/0/0    1   P Active     local        10.1.1.3        10.1.1.1

Router-2# show standby brief
                     P Active     Standby         Virtual IP
Gi0/0/0    1   P Active     local        10.1.1.2        10.1.1.1""",
        "expected_fault": "HSRP Split-Brain state: Both routers are in Active state because standby multicast hello packets cannot cross broken inter-router link.",
        "expected_fix": "Restore inter-router link connection or check interface trunk/VLAN settings between Router-1 and Router-2.",
        "rule_trigger": "RULE-01_INT_DOWN"
    },
    {
        "case_id": "NET-024",
        "title": "BGP Neighbor Stuck in Active State",
        "domain": "Dynamic Routing",
        "osi_layer": "Layer 3",
        "severity": "High",
        "symptom": "ISP BGP peering session fails to establish; external routes not imported into corporate AS 65001.",
        "topology_summary": "Edge Router attempting eBGP peering with ISP router 203.0.113.2. Remote AS specified as 65002 on local router, but ISP router is AS 65005.",
        "show_outputs": """Router-Edge# show ip bgp summary
BGP router identifier 10.255.255.1, local AS number 65001
BGP table version is 1, main routing table version 1

Neighbor        V    AS MsgRcvd MsgSent   TblVer  InQ OutQ Up/Down  State/PfxRcd
203.0.113.2     4 65002       0       0        1    0    0 00:04:12 Active

Router-Edge# show running-config | section router bgp
router bgp 65001
 neighbor 203.0.113.2 remote-as 65002""",
        "expected_fault": "BGP neighbor configuration lists wrong remote autonomous system number (remote-as 65002 instead of ISP actual AS 65005).",
        "expected_fix": "Router-Edge(config)# router bgp 65001\nRouter-Edge(config-router)# no neighbor 203.0.113.2 remote-as 65002\nRouter-Edge(config-router)# neighbor 203.0.113.2 remote-as 65005",
        "rule_trigger": "RULE-03_MISSING_ROUTE"
    },
    {
        "case_id": "NET-025",
        "title": "NTP Time Synchronization Failure",
        "domain": "DHCP & Services",
        "osi_layer": "Layer 7",
        "severity": "Low",
        "symptom": "Syslog timestamps on Core Switch are out of sync with log collector; NTP status shows unsynchronized.",
        "topology_summary": "Core Switch configured with `ntp server 192.168.1.50`. Access-list on router blocks UDP port 123.",
        "show_outputs": """Core-Switch# show ntp status
Clock is unsynchronized, stratum 16, no reference clock
nominal freq is 250.0000 Hz, actual freq is 250.0000 Hz, precision is 2**18

Core-Switch# show ntp associations
  address         ref clock       st   when  poll reach  delay offset   disp
~192.168.1.50     .INIT.          16    64    64    0     0.00   0.000 15875.0""",
        "expected_fault": "NTP association status is '.INIT.' with reach=0, indicating NTP packets on UDP port 123 are blocked by transit ACL.",
        "expected_fix": "Update transit ACL to permit UDP traffic from Core-Switch to NTP Server 192.168.1.50 eq 123.",
        "rule_trigger": "RULE-05_ACL_DENY_TRAFFIC"
    },
    {
        "case_id": "NET-026",
        "title": "IP Helper Address Configured with Host IP Instead of Server IP",
        "domain": "DHCP & Services",
        "osi_layer": "Layer 7",
        "severity": "High",
        "symptom": "Branch clients fail to obtain IP addresses; DHCP DISCOVER packets forwarded to incorrect address.",
        "topology_summary": "Router subinterface configured with `ip helper-address 10.1.1.5` (a workstation) instead of `10.1.1.100` (DHCP Server).",
        "show_outputs": """Router-Branch# show running-config interface GigabitEthernet0/0/0.10
Building configuration...
interface GigabitEthernet0/0/0.10
 encapsulation dot1Q 10
 ip address 10.2.10.1 255.255.255.0
 ip helper-address 10.1.1.5
end""",
        "expected_fault": "IP helper-address is set to host IP 10.1.1.5 instead of DHCP server IP 10.1.1.100.",
        "expected_fix": "Router-Branch(config)# interface GigabitEthernet0/0/0.10\nRouter-Branch(config-subif)# no ip helper-address 10.1.1.5\nRouter-Branch(config-subif)# ip helper-address 10.1.1.100",
        "rule_trigger": "RULE-06_DHCP_HELPER_MISSING"
    },
    {
        "case_id": "NET-027",
        "title": "Static MAC Address Table Binding Error",
        "domain": "Physical & Layer 2",
        "osi_layer": "Layer 2",
        "severity": "Medium",
        "symptom": "Server at 192.168.1.20 suddenly loses link when moved from port Gi0/1 to port Gi0/2 on Switch1.",
        "topology_summary": "Switch1 has static MAC address entry forcing server MAC `0050.56a1.0001` to port Gi0/1.",
        "show_outputs": """Switch1# show mac address-table static
          Mac Address Table
-------------------------------------------
Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
1       0050.56a1.0001    STATIC      Gi0/1""",
        "expected_fault": "Static MAC address table entry binds server MAC to port Gi0/1, preventing switch from updating dynamic forwarding for port Gi0/2.",
        "expected_fix": "Switch1(config)# no mac address-table static 0050.56a1.0001 vlan 1 interface GigabitEthernet0/1",
        "rule_trigger": "RULE-04_VLAN_TRUNK_MISSING"
    },
    {
        "case_id": "NET-028",
        "title": "EtherChannel Trunk Load-Balancing PAgP Mode Mismatch",
        "domain": "VLAN & Trunking",
        "osi_layer": "Layer 2",
        "severity": "High",
        "symptom": "Port-channel 1 interface between Switch-A and Switch-B remains down; individual interfaces suspended.",
        "topology_summary": "Switch-A ports set to `channel-group 1 mode auto` (PAgP) while Switch-B ports set to `channel-group 1 mode passive` (LACP).",
        "show_outputs": """Switch-A# show etherchannel summary
Group  Port-channel  Protocol    Ports
------+-------------+-----------+-----------------------------------------------
1      Po1(SD)       PAgP        Gi0/1(s)   Gi0/2(s)

Switch-B# show etherchannel summary
Group  Port-channel  Protocol    Ports
------+-------------+-----------+-----------------------------------------------
1      Po1(SD)       LACP        Gi0/1(s)   Gi0/2(s)""",
        "expected_fault": "Protocol mismatch on EtherChannel link (Switch-A using Cisco proprietary PAgP, Switch-B using IEEE 802.3ad LACP).",
        "expected_fix": "Align both switches to open-standard LACP:\nSwitch-A(config)# interface range GigabitEthernet0/1 - 2\nSwitch-A(config-if-range)# channel-group 1 mode active",
        "rule_trigger": "RULE-04_VLAN_TRUNK_MISSING"
    },
    {
        "case_id": "NET-029",
        "title": "Subnet Mask /28 vs /24 Broadcast Mismatch",
        "domain": "Default Gateway & Subnetting",
        "osi_layer": "Layer 3",
        "severity": "Medium",
        "symptom": "Host 192.168.1.18 cannot reach router gateway at 192.168.1.1; host 192.168.1.10 has no issues.",
        "topology_summary": "Router gateway configured as 192.168.1.1 255.255.255.240 (/28, valid range .1-.14). Host 192.168.1.18 configured as /24.",
        "show_outputs": """Router1# show ip interface GigabitEthernet0/0/0
GigabitEthernet0/0/0 is up, line protocol is up
  Internet address is 192.168.1.1/28

Host18> ipconfig /all
   IP Address. . . . . . . . . . . : 192.168.1.18
   Subnet Mask . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . : 192.168.1.1""",
        "expected_fault": "Router interface uses subnet mask 255.255.255.240 (/28), making 192.168.1.18 fall into a separate subnet (192.168.1.16/28).",
        "expected_fix": "Router1(config)# interface GigabitEthernet0/0/0\nRouter1(config-if)# ip address 192.168.1.1 255.255.255.0",
        "rule_trigger": "RULE-02_GW_MISMATCH"
    },
    {
        "case_id": "NET-030",
        "title": "IPv6 Router Advertisement (RA) Guard Blocking SLAAC",
        "domain": "Wireless & Security",
        "osi_layer": "Layer 3",
        "severity": "Medium",
        "symptom": "Dual-stack IPv6 clients fail to auto-configure global unicast IPv6 addresses (2001:db8:1::/64) via SLAAC.",
        "topology_summary": "Switch-1 access ports have RA Guard enabled in strict mode, mistakenly dropping Router Advertisements from gateway router.",
        "show_outputs": """Switch1# show ipv6 nd raguard policy RAGUARD_POLICY
Policy Name: RAGUARD_POLICY
  Device Role: host
  Action: block

Switch1# show ipv6 nd raguard interface GigabitEthernet0/1
Interface Gi0/1 (Uplink to Router): RAGUARD_POLICY (Role: host)""",
        "expected_fault": "RA Guard policy on router uplink port Gi0/1 is set to role 'host', dropping legitimate IPv6 RAs sent by gateway router.",
        "expected_fix": "Switch1(config)# interface GigabitEthernet0/1\nSwitch1(config-if)# ipv6 nd raguard policy RAGUARD_ROUTER_POLICY\nSwitch1(config-if)# device-role router",
        "rule_trigger": "RULE-01_INT_DOWN"
    }
]

os.makedirs("dataset", exist_ok=True)

# Write JSON
with open("dataset/cases.json", "w", encoding="utf-8") as f:
    json.dump(cases, f, indent=2)

# Write CSV
with open("dataset/cases.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=list(cases[0].keys()))
    writer.writeheader()
    writer.writerows(cases)

print(f"Successfully generated dataset with {len(cases)} complete troubleshooting cases.")
