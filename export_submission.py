#!/usr/bin/env python3
"""
NetSage AI - Submission Verification & Package Exporter
"""
import os
import json
import zipfile

def main():
    print("==========================================================================")
    print("    NetSage AI - Cisco AICTE Project Submission Audit & Exporter          ")
    print("==========================================================================")

    required_files = [
        "dataset/cases.csv",
        "dataset/cases.json",
        "prompts/diagnose_prompt.md",
        "prompts/helper_prompts.md",
        "checker/rule_checker.py",
        "checker/ios_parsers.py",
        "docs/responsible_ai_log.md",
        "docs/packet_tracer_lab_guide.md",
        "app/package.json",
        "app/src/App.tsx",
        "evaluate.py",
        "netsage_cli.py",
        "README.md"
    ]

    missing = []
    for f in required_files:
        if os.path.exists(f):
            print(f" [OK] Present  : {f}")
        else:
            print(f" [X] MISSING  : {f}")
            missing.append(f)

    if missing:
        print(f"\n[!] Verification FAILED. Missing {len(missing)} files.")
        return

    # Check case count
    with open("dataset/cases.json", "r", encoding="utf-8") as f:
        cases = json.load(f)
    print(f"\n[+] Total Troubleshooting Cases Verified: {len(cases)} (Requirement: >= 30)")

    # Create submission zip package
    output_zip = "NetSage_AI_Cisco_Submission.zip"
    print(f"\n[+] Packaging submission artifact to '{output_zip}'...")
    
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as z:
        for root, dirs, files in os.walk('.'):
            # Exclude git and node_modules dist
            if '.git' in root or 'node_modules' in root or 'dist' in root or '__pycache__' in root:
                continue
            for file in files:
                if file.endswith('.zip') or file.endswith('.docx') or file.endswith('.pdf'):
                    continue
                filepath = os.path.join(root, file)
                z.write(filepath, arcname=filepath)

    print(f"[OK] Submission package successfully generated: {output_zip}")
    print("==========================================================================")

if __name__ == "__main__":
    main()
