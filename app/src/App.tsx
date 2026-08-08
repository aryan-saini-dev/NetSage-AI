import React, { useState } from 'react';
import { Header } from './components/Header';
import { CaseSelector } from './components/CaseSelector';
import { CLIViewer } from './components/CLIViewer';
import { AIDiagnosisPanel } from './components/AIDiagnosisPanel';
import { HumanReviewPanel } from './components/HumanReviewPanel';
import { MetricsDashboard } from './components/MetricsDashboard';
import { ResponsibleAILogViewer } from './components/ResponsibleAILogViewer';
import { casesData } from './data/casesData';
import { Case, AIDiagnosis, HumanReview, RuleFinding } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workspace' | 'dashboard' | 'responsible_ai'>('workspace');
  const [selectedCase, setSelectedCase] = useState<Case>(casesData[0]);
  const [reviews, setReviews] = useState<Record<string, HumanReview>>({});

  // Dynamic AI Diagnosis generator from selected case
  const currentDiagnosis: AIDiagnosis = {
    root_cause: selectedCase.expected_fault,
    osi_layer: selectedCase.osi_layer,
    confidence: 'high',
    evidence_quote: selectedCase.show_outputs.split('\n').filter((l: string) => l.trim() && !l.startsWith('Building')).slice(0, 2),
    next_command: selectedCase.osi_layer === 'Layer 1' ? 'show interface status' :
                 selectedCase.osi_layer === 'Layer 2' ? 'show interfaces trunk' :
                 selectedCase.osi_layer === 'Layer 4' ? 'show access-lists' : 'show ip route',
    fix_steps: selectedCase.expected_fix.split('\n').filter((l: string) => l.trim())
  };

  const currentRuleFindings: RuleFinding[] = selectedCase.rule_trigger ? [
    {
      rule_id: selectedCase.rule_trigger,
      name: `Static Configuration Rule Check (${selectedCase.rule_trigger})`,
      severity: selectedCase.severity,
      confidence: 0.95,
      evidence: `Config syntax anomaly flagged in ${selectedCase.domain}`,
      recommendation: `Apply verified IOS commands to resolve ${selectedCase.domain} issue`
    }
  ] : [];

  const handleSaveReview = (review: HumanReview) => {
    setReviews(prev => ({
      ...prev,
      [selectedCase.case_id]: review
    }));
  };

  return (
    <div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-wrapper">
        {activeTab === 'workspace' && (
          <div className="workspace-grid">
            <CaseSelector
              cases={casesData}
              selectedCase={selectedCase}
              onSelectCase={setSelectedCase}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <CLIViewer
                caseId={selectedCase.case_id}
                title={selectedCase.title}
                symptom={selectedCase.symptom}
                topology={selectedCase.topology_summary}
                showOutputs={selectedCase.show_outputs}
                domain={selectedCase.domain}
                osiLayer={selectedCase.osi_layer}
              />

              <AIDiagnosisPanel
                diagnosis={currentDiagnosis}
                ruleFindings={currentRuleFindings}
              />

              <HumanReviewPanel
                diagnosis={currentDiagnosis}
                currentReview={reviews[selectedCase.case_id]}
                onSaveReview={handleSaveReview}
              />
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && <MetricsDashboard />}

        {activeTab === 'responsible_ai' && <ResponsibleAILogViewer />}
      </main>
    </div>
  );
};

export default App;
