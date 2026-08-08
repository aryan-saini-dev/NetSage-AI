"""
NetSage AI - Domain Data Models
"""
from dataclasses import dataclass, field
from typing import List, Optional, Dict, Any

@dataclass
class NetworkCase:
    case_id: str
    title: str
    domain: str
    osi_layer: str
    severity: str
    symptom: str
    topology_summary: str
    show_outputs: str
    expected_fault: str
    expected_fix: str
    rule_trigger: str

@dataclass
class RuleFinding:
    rule_id: str
    name: str
    severity: str
    confidence: float
    evidence: str
    recommendation: str

@dataclass
class AIDiagnosis:
    root_cause: str
    osi_layer: str
    confidence: str
    evidence_quote: List[str]
    next_command: str
    fix_steps: List[str]

@dataclass
class HumanReview:
    status: str  # "Accepted", "Edited", "Rejected"
    reviewer_notes: str
    corrected_fault: Optional[str] = None
    corrected_fix: Optional[str] = None

@dataclass
class CaseEvalResult:
    case_id: str
    rule_hits: List[str]
    ai_diagnosis: AIDiagnosis
    human_review: HumanReview
    is_rule_accurate: bool
    is_ai_accurate: bool
