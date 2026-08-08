# NetSage AI - Cisco Packet Tracer Lab Topology & Reference Guide

This document outlines the standard **Cisco Packet Tracer network lab topologies** referenced by the 30 troubleshooting cases in NetSage AI.

---

## Topology 1: Multi-VLAN Router-on-a-Stick Enterprise Campus

```
[Server Farm]
 (10.1.1.0/24)
       |
       | Gi0/0/1
+---------------+
| Router-HQ     |  Router-on-a-Stick (Gi0/0/0 subinterfaces)
+-------+-------+
        | Gi0/0/0 (Trunk 802.1Q)
        |
        | Gi0/1 (Trunk)
+-------+-------+
| Switch-Core   |
+---+-------+---+
    |       |
    | Gi0/2 | Gi0/3 (Trunk allowed: 10,20,30,40,99)
    |       |
+---+---+ +-+-----+
| SW-A  | | SW-B  |  Access Switches
+---+---+ +---+---+
    |         |
 [PC-V10]   [PC-V20]  [PC-V30]
 (Eng)      (Acct)    (Sales)
```

### Subnet & VLAN Matrix
- **VLAN 10**: Engineering (`192.168.10.0/24`, Subinterface `Gi0/0/0.10`)
- **VLAN 20**: Accounting (`192.168.20.0/24`, Subinterface `Gi0/0/0.20`)
- **VLAN 30**: Sales (`192.168.30.0/24`, Subinterface `Gi0/0/0.30`)
- **VLAN 40**: Human Resources (`192.168.40.0/24`, Subinterface `Gi0/0/0.40`)
- **VLAN 99**: Management / Guest Isolation (`192.168.99.0/24`)

---

## Topology 2: Dual-Area OSPF WAN & Branch Office

```
+----------------+      OSPF Area 0      +----------------+
| Router-HQ      |<=====================>| Router-Branch  |
| RID: 1.1.1.1   |    10.255.0.0/30      | RID: 2.2.2.2   |
+-------+--------+                       +-------+--------+
        |                                        |
        | OSPF Area 0                            | OSPF Area 1
        |                                        |
 [Internal Core]                          [Branch Subnet]
 172.16.0.0/16                            192.168.50.0/24
```

### Router Interface Configuration
- **HQ Link**: `GigabitEthernet0/0/1` -> `10.255.0.1/30`
- **Branch Link**: `GigabitEthernet0/0/0` -> `10.255.0.2/30`
- **OSPF Parameters**: Process ID 1, Hello 10s, Dead 40s.

---

## Topology 3: Enterprise Edge Gateway with NAT Overload & Firewall ACLs

```
[Internal LAN Subnets]
192.168.10.0/24, 192.168.20.0/24, 192.168.30.0/24
       |
       | Gi0/0/0 (ip nat inside)
+------+--------+
| Router-Edge   |  Edge Router (PAT + Extended Firewall ACL)
+------+--------+
       | Gi0/0/1 (ip nat outside: 203.0.113.2/30)
       |
       v
 [ISP Gateway] (203.0.113.1/30)
       |
 [Public Internet / 8.8.8.8]
```

### Core Security Rules
- **NAT Overload (PAT)**: Translates internal subnets to public WAN IP `203.0.113.2`.
- **Inbound Firewall ACL 101**: Permits established TCP web connections while blocking unrequested inbound traffic.
