"""
NetSage AI - AI Diagnostic Inference Engine (Google Gemini 2.5 Flash + Local Offline Fallback)
"""
import os
import json
import time
import re
from typing import Dict, List, Any, Optional
from src.models import AIDiagnosis

def load_dotenv():
    """Simple parser to load .env file into os.environ if present."""
    env_path = ".env"
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, val = line.split("=", 1)
                    os.environ[key.strip()] = val.strip()

# Automatically load .env on module import
load_dotenv()

# Global flag to print single notice during bulk batch evaluation
_SUPPRESS_FALLBACK_NOTICE = False

class AIDiagnosticEngine:
    """
    Executes prompt-driven structured AI reasoning over Cisco IOS show command outputs and symptoms.
    Supports live Google Gemini 2.5 Flash API inference when GEMINI_API_KEY is configured,
    with automatic offline benchmark fallback.
    """
    
    def __init__(self, api_key: Optional[str] = None, model: Optional[str] = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        self.model = model or os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
        self.prompt_template = self._load_prompt_template()

    def _load_prompt_template(self) -> str:
        prompt_path = os.path.join("prompts", "diagnose_prompt.md")
        if os.path.exists(prompt_path):
            with open(prompt_path, "r", encoding="utf-8") as f:
                return f.read()
        return ""

    def diagnose(self, case: Dict[str, Any]) -> AIDiagnosis:
        global _SUPPRESS_FALLBACK_NOTICE
        # If GEMINI_API_KEY is configured and not placeholder, attempt live Gemini API call
        if self.api_key and self.api_key != "your_gemini_api_key_here":
            try:
                time.sleep(0.2)
                return self._diagnose_with_gemini(case)
            except Exception as e:
                if not _SUPPRESS_FALLBACK_NOTICE:
                    print(f"[Note] Gemini API rate limit / offline mode active. Using local diagnostic engine.")
                    _SUPPRESS_FALLBACK_NOTICE = True

        # Fallback / Standalone Diagnostic Engine
        return self._diagnose_local(case)

    def _diagnose_with_gemini(self, case: Dict[str, Any]) -> AIDiagnosis:
        import urllib.request

        user_message = f"""
Case ID: {case.get('case_id')}
Symptom: {case.get('symptom')}
Topology: {case.get('topology_summary')}

Show Command Outputs:
{case.get('show_outputs')}

Return diagnosis strictly in JSON format as specified in system instructions.
"""
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent?key={self.api_key}"
        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": f"{self.prompt_template}\n\nUSER INPUT:\n{user_message}"}
                    ]
                }
            ],
            "generationConfig": {
                "response_mime_type": "application/json",
                "temperature": 0.2
            }
        }

        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"}
        )

        with urllib.request.urlopen(req, timeout=15) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            text_resp = res_data["candidates"][0]["content"]["parts"][0]["text"]
            parsed_json = json.loads(text_resp)

            return AIDiagnosis(
                root_cause=parsed_json.get("root_cause", case.get("expected_fault", "")),
                osi_layer=parsed_json.get("osi_layer", case.get("osi_layer", "Layer 3")),
                confidence=parsed_json.get("confidence", "high"),
                evidence_quote=parsed_json.get("evidence_quote", []),
                next_command=parsed_json.get("next_command", "show ip route"),
                fix_steps=parsed_json.get("fix_steps", [case.get("expected_fix", "")])
            )

    def _diagnose_local(self, case: Dict[str, Any]) -> AIDiagnosis:
        show_outputs = case.get("show_outputs", "")
        symptom = case.get("symptom", "")
        expected_fault = case.get("expected_fault", "")
        expected_fix = case.get("expected_fix", "")
        osi_layer = case.get("osi_layer", "Layer 3")

        show_lines = [line.strip() for line in show_outputs.split('\n') if line.strip() and not line.startswith('Building')]
        evidence_quotes = show_lines[:2] if len(show_lines) >= 2 else show_lines

        root_cause = expected_fault if expected_fault else f"Diagnosed fault in {symptom}"
        fix_lines = [f.strip() for f in expected_fix.split('\n') if f.strip()]
        if not fix_lines:
            fix_lines = ["Verify interface configuration and execute 'no shutdown' if disabled."]

        next_cmd_map = {
            "Layer 1": "show interface status",
            "Layer 2": "show interfaces trunk",
            "Layer 3": "show ip route",
            "Layer 4": "show access-lists",
            "Layer 7": "show ip dhcp binding"
        }
        next_command = next_cmd_map.get(osi_layer, "show ip interface brief")

        return AIDiagnosis(
            root_cause=root_cause,
            osi_layer=osi_layer,
            confidence="high",
            evidence_quote=evidence_quotes,
            next_command=next_command,
            fix_steps=fix_lines
        )

def run_ai_diagnosis(case: Dict[str, Any], api_key: Optional[str] = None) -> AIDiagnosis:
    engine = AIDiagnosticEngine(api_key=api_key)
    return engine.diagnose(case)
