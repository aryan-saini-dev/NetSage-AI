export interface Case {
  case_id: string;
  title: string;
  domain: string;
  osi_layer: string;
  severity: string;
  symptom: string;
  topology_summary: string;
  show_outputs: string;
  expected_fault: string;
  expected_fix: string;
  rule_trigger: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface RuleFinding {
  rule_id: string;
  name: string;
  severity: string;
  confidence: number;
  evidence: string;
  recommendation: string;
}

export interface AIDiagnosis {
  root_cause: string;
  osi_layer: string;
  confidence: 'high' | 'medium' | 'low';
  evidence_quote: string[];
  next_command: string;
  fix_steps: string[];
}

export interface HumanReview {
  status: 'Accepted' | 'Edited' | 'Rejected';
  reviewer_notes: string;
  corrected_fault?: string;
  corrected_fix?: string;
}

export type ViewMode = 'catalog' | 'workspace' | 'metrics' | 'audit';
