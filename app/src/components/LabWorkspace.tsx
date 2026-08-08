import React from 'react';
import { ProblemPane } from './ProblemPane';
import { TerminalPane } from './TerminalPane';
import { Case, AIDiagnosis, HumanReview, RuleFinding } from '../types';

interface LabWorkspaceProps {
  selectedCase: Case;
  diagnosis: AIDiagnosis;
  ruleFindings: RuleFinding[];
  currentReview?: HumanReview;
  onSaveReview: (review: HumanReview) => void;
}

export const LabWorkspace: React.FC<LabWorkspaceProps> = ({
  selectedCase,
  diagnosis,
  ruleFindings,
  currentReview,
  onSaveReview,
}) => {
  return (
    <div className="lc-workspace-layout">
      <ProblemPane
        selectedCase={selectedCase}
        ruleFindings={ruleFindings}
      />
      <TerminalPane
        showOutputs={selectedCase.show_outputs}
        diagnosis={diagnosis}
        currentReview={currentReview}
        onSaveReview={onSaveReview}
      />
    </div>
  );
};
