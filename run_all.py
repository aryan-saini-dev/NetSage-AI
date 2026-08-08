#!/usr/bin/env python3
"""
NetSage AI - Master Control Launcher
"""
import os
import sys
import subprocess

def main():
    app_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "app")

    while True:
        try:
            os.system('cls' if os.name == 'nt' else 'clear')
            print("==========================================================================")
            print("                 NetSage AI - Master Control Launcher                     ")
            print("==========================================================================")
            print(" Select an option to execute:\n")
            print(" [1] Run Automated Benchmark Evaluation   (python evaluate.py)")
            print(" [2] Launch Interactive Terminal Workbench (python netsage_cli.py)")
            print(" [3] Launch Web Dashboard Server           (http://localhost:3000)")
            print(" [4] Verify & Export Submission Zip        (python export_submission.py)")
            print(" [Q] Quit")
            print("--------------------------------------------------------------------------")

            choice = input("Enter choice (1-4, Q): ").strip().upper()

            if choice == '1':
                subprocess.run([sys.executable, "evaluate.py"])
                input("\nPress Enter to continue...")
            elif choice == '2':
                subprocess.run([sys.executable, "netsage_cli.py"])
            elif choice == '3':
                print("\n[+] Launching Vite Web Server on http://localhost:3000 (Press Ctrl+C to stop)...\n")
                try:
                    # Shell=True is required on Windows for npm.cmd batch commands
                    subprocess.run("npm run dev", cwd=app_dir, shell=True)
                except (KeyboardInterrupt, EOFError):
                    print("\n[!] Web server stopped.")
                input("\nPress Enter to return to launcher menu...")
            elif choice == '4':
                subprocess.run([sys.executable, "export_submission.py"])
                input("\nPress Enter to continue...")
            elif choice == 'Q':
                print("\nGoodbye!")
                break
        except (KeyboardInterrupt, EOFError):
            print("\n\nGoodbye!")
            break

if __name__ == "__main__":
    main()
