# NetSage AI - Helper & Guardrail Prompts

## 1. Evidence Verification Helper Prompt
"Verify that every statement in the proposed diagnosis is supported by at least one literal line in the show-command output. If a statement relies on unshown state, flag it as unverified."

## 2. Human Correction Classifier Prompt
"Compare the initial AI diagnosis with the reviewer's human correction. Classify the AI error type into one of the following categories:
- Hallucinated Evidence
- Incorrect OSI Layer
- Subnet/Mask Math Error
- Shadowed ACL Line Missed
- Protocol Timer Misinterpretation
- Missing Verification Step"
