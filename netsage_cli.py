#!/usr/bin/env python3
"""
NetSage AI - Interactive Terminal Diagnostic & Human Review CLI
"""
import json
import os
import sys
from checker.rule_checker import run_checker_on_case
from src.ai_engine import run_ai_diagnosis

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def main():
    json_path = "dataset/cases.json"
    if not os.path.exists(json_path):
        print("[!] Error: dataset/cases.json not found. Run scratch/build_dataset.py first.")
        sys.exit(1)

    with open(json_path, "r", encoding="utf-8") as f:
        cases = json.load(f)

    while True:
        try:
            clear_screen()
            print("==========================================================================")
            print("    NetSage AI - Interactive Network Troubleshooting Terminal Workbench   ")
            print("==========================================================================")
            print("Select a lab case scenario to analyze:\n")
            
            for i, c in enumerate(cases[:15], 1):
                print(f" [{i:2d}] {c['case_id']} | {c['osi_layer']:<7} | {c['title'][:55]}")
            print(" [...]  (Total 30 cases available)")
            print("\n [A] Run Automated Evaluation Benchmark on all 30 cases")
            print(" [Q] Quit")
            print("--------------------------------------------------------------------------")

            choice = input("Enter choice (1-15, A, Q): ").strip().upper()

            if choice == 'Q':
                print("\nExiting NetSage AI CLI. Goodbye!")
                break
            elif choice == 'A':
                os.system(f"{sys.executable} evaluate.py")
                input("\nPress Enter to return to main menu...")
                continue
            elif choice.isdigit() and 1 <= int(choice) <= len(cases):
                selected_case = cases[int(choice) - 1]
                inspect_case(selected_case)
                input("\nPress Enter to return to main menu...")
            else:
                print("[!] Invalid choice. Try again.")
        except (KeyboardInterrupt, EOFError):
            print("\n\nExiting NetSage AI CLI. Goodbye!")
            break

def inspect_case(case):
    try:
        clear_screen()
        print("==========================================================================")
        print(f" CASE STUDY: {case['case_id']} - {case['title']}")
        print("==========================================================================")
        print(f"Domain     : {case['domain']} ({case['osi_layer']})")
        print(f"Severity   : {case['severity']}")
        print(f"Symptom    : {case['symptom']}")
        print(f"Topology   : {case['topology_summary']}")
        print("\n--- CISCO IOS SHOW COMMAND OUTPUT ---")
        print(case['show_outputs'])
        print("--------------------------------------------------------------------------")

        # 1. Run Deterministic Rule Engine
        rule_findings = run_checker_on_case(case)
        print("\n[+] DETERMINISTIC STATIC RULE CHECKER RESULT:")
        if rule_findings:
            for rf in rule_findings:
                print(f"    - [{rf['rule_id']}] {rf['name']}")
                print(f"      Evidence: {rf['evidence']}")
                print(f"      Recommendation: {rf['recommendation']}")
        else:
            print("    - No static syntax rules triggered. Proceeding to AI diagnosis.")

        # 2. Run AI Diagnostic Model
        ai_diag = run_ai_diagnosis(case)
        print("\n[+] AI DIAGNOSTIC MODEL RECOMMENDATION:")
        print(f"    Root Cause   : {ai_diag.root_cause}")
        print(f"    OSI Layer    : {ai_diag.osi_layer}")
        print(f"    Confidence   : {ai_diag.confidence.upper()}")
        print(f"    Evidence     : {ai_diag.evidence_quote}")
        print(f"    Next Command : {ai_diag.next_command}")
        print("    Fix Commands :")
        for fix in ai_diag.fix_steps:
            print(f"      {fix}")

        print("\n==========================================================================")
        print(" HUMAN-IN-THE-LOOP (HITL) VERIFICATION WORKBENCH")
        print("==========================================================================")
        print(" Options: [1] Accept Diagnosis  [2] Edit Fix Commands  [3] Reject Diagnosis")
        review_choice = input(" Select review action (1/2/3): ").strip()

        if review_choice == '1':
            print("\n[✔] Human Review: ACCEPTED. Fix approved for deployment.")
        elif review_choice == '2':
            new_fix = input(" Enter corrected Cisco IOS commands: ").strip()
            print(f"\n[!] Human Review: EDITED. Corrected fix logged: '{new_fix}'")
        elif review_choice == '3':
            reason = input(" Enter rejection reason: ").strip()
            print(f"\n[X] Human Review: REJECTED. Reason logged: '{reason}'")
        else:
            print("\n[!] Defaulting to ACCEPTED.")
    except (KeyboardInterrupt, EOFError):
        print("\n[!] Review interrupted.")

if __name__ == "__main__":
    main()
