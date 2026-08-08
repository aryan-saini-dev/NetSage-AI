#!/usr/bin/env python3
"""
NetSage AI - Master Launcher Menu
"""
import os
import sys

def main():
    while True:
        try:
            os.system('cls' if os.name == 'nt' else 'clear')
            print("==========================================================================")
            print("                 NetSage AI - Master Control Launcher                     ")
            print("==========================================================================")
            print(" Select an option to execute:\n")
            print(" [1] Run Automated Benchmark Evaluation   (python evaluate.py)")
            print(" [2] Launch Interactive Terminal Workbench (python netsage_cli.py)")
            print(" [3] Launch Web Dashboard Server           (cd app && npm run dev)")
            print(" [4] Verify & Export Submission Zip        (python export_submission.py)")
            print(" [Q] Quit")
            print("--------------------------------------------------------------------------")

            choice = input("Enter choice (1-4, Q): ").strip().upper()

            if choice == '1':
                os.system(f"{sys.executable} evaluate.py")
                input("\nPress Enter to continue...")
            elif choice == '2':
                os.system(f"{sys.executable} netsage_cli.py")
            elif choice == '3':
                print("\nStarting Vite Web Server on http://localhost:3000 ... (Press Ctrl+C to stop)")
                app_dir = os.path.join(os.getcwd(), "app")
                os.system(f"cd \"{app_dir}\" && npm run dev")
                input("\nPress Enter to continue...")
            elif choice == '4':
                os.system(f"{sys.executable} export_submission.py")
                input("\nPress Enter to continue...")
            elif choice == 'Q':
                print("\nGoodbye!")
                break
        except (KeyboardInterrupt, EOFError):
            print("\n\nGoodbye!")
            break

if __name__ == "__main__":
    main()
