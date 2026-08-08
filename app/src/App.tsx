import React, { useState } from 'react';
import { Header } from './components/Header';
import { LabCatalog } from './components/LabCatalog';
import { LabWorkspace } from './components/LabWorkspace';
import { MetricsDashboard } from './components/MetricsDashboard';
import { ResponsibleAILogViewer } from './components/ResponsibleAILogViewer';
import { casesData } from './data/casesData';
import { Case, AIDiagnosis, HumanReview, RuleFinding, ViewMode } from './types';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewMode>('catalog');
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
      recommendation: `Apply verified Cisco IOS commands to resolve ${selectedCase.domain} issue`
    }
  ] : [];

  const handleSelectAndLaunch = (c: Case) => {
    setSelectedCase(c);
    setActiveView('workspace');
  };

  const handleSaveReview = (review: HumanReview) => {
    setReviews(prev => ({
      ...prev,
      [selectedCase.case_id]: review
    }));
    alert(`Human Verification Entry saved for ${selectedCase.case_id}: [${review.status}]`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        selectedCase={selectedCase}
        cases={casesData}
        onSelectCase={setSelectedCase}
      />

      <main>
        {activeView === 'catalog' && (
          <LabCatalog
            cases={casesData}
            onSelectAndLaunch={handleSelectAndLaunch}
          />
        )}

        {activeView === 'workspace' && (
          <LabWorkspace
            selectedCase={selectedCase}
            diagnosis={currentDiagnosis}
            ruleFindings={currentRuleFindings}
            currentReview={reviews[selectedCase.case_id]}
            onSaveReview={handleSaveReview}
          />
        )}

        {activeView === 'metrics' && <MetricsDashboard />}

        {activeView === 'audit' && <ResponsibleAILogViewer />}
      </main>
    </div>
  );
};

export default App;
