#!/usr/bin/env python3
"""Render Cursor status line token usage from local token-tracker history."""

from __future__ import annotations

import json
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


DATA_DIR = Path("~/.cursor/token-tracker").expanduser()
HISTORY_PATH = Path(os.environ.get("TOKEN_TRACKER_HISTORY", DATA_DIR / "history.jsonl")).expanduser()
CONFIG_PATH = Path(os.environ.get("TOKEN_TRACKER_CONFIG", DATA_DIR / "config.json")).expanduser()
PRICES_PATH = Path(os.environ.get("TOKEN_TRACKER_PRICES", DATA_DIR / "prices.json")).expanduser()


def load_json_stdin() -> dict[str, Any]:
    raw = sys.stdin.read()
    if not raw.strip():
        return {}
    try:
        payload = json.loads(raw)
    except json.JSONDecodeError:
        return {}
    return payload if isinstance(payload, dict) else {}


def load_config() -> dict[str, Any]:
    if not CONFIG_PATH.exists():
        return {}
    try:
        with CONFIG_PATH.open("r", encoding="utf-8") as config:
            payload = json.load(config)
    except (OSError, json.JSONDecodeError):
        return {}
    return payload if isinstance(payload, dict) else {}


def load_prices() -> dict[str, Any]:
    if not PRICES_PATH.exists():
        return {}
    try:
        with PRICES_PATH.open("r", encoding="utf-8") as prices:
            payload = json.load(prices)
    except (OSError, json.JSONDecodeError):
        return {}
    return payload if isinstance(payload, dict) else {}


def workspace_dir_from_payload(payload: dict[str, Any]) -> str | None:
    workspace = payload.get("workspace")
    current_dir = None
    if isinstance(workspace, dict):
        current_dir = workspace.get("current_dir")
    return current_dir or payload.get("cwd")


def project_from_payload(payload: dict[str, Any], config: dict[str, Any], current_dir: str | None) -> str:
    env_project = os.environ.get("TOKEN_TRACKER_PROJECT")
    if env_project:
        return env_project

    projects = config.get("projects")
    if current_dir and isinstance(projects, dict):
        configured = projects.get(str(current_dir))
        if configured:
            return str(configured)
    default_project = config.get("default_project")
    if default_project:
        return str(default_project)
    return Path(str(current_dir)).name if current_dir else "unknown"


def git_branch_from_payload(payload: dict[str, Any], current_dir: str | None) -> str | None:
    worktree = payload.get("worktree")
    if isinstance(worktree, dict) and worktree.get("name"):
        return str(worktree["name"])
    if not current_dir:
        return None
    try:
        result = subprocess.run(
            ["git", "-C", current_dir, "branch", "--show-current"],
            check=False,
            capture_output=True,
            text=True,
            timeout=0.2,
        )
    except (OSError, subprocess.TimeoutExpired):
        return None
    branch = result.stdout.strip()
    return branch or None


def feature_from_payload(payload: dict[str, Any], config: dict[str, Any], current_dir: str | None) -> str | None:
    env_feature = os.environ.get("TOKEN_TRACKER_FEATURE")
    if env_feature:
        return env_feature

    features = config.get("features")
    if current_dir and isinstance(features, dict):
        configured = features.get(str(current_dir))
        if configured:
            return str(configured)
    default_feature = config.get("default_feature")
    if default_feature:
        return str(default_feature)
    return git_branch_from_payload(payload, current_dir)


def model_from_payload(payload: dict[str, Any]) -> str:
    model = payload.get("model")
    if not isinstance(model, dict):
        return "unknown-model"
    return str(model.get("display_name") or model.get("id") or "unknown-model")


def context_tokens(payload: dict[str, Any]) -> tuple[int, int, int | None]:
    context = payload.get("context_window")
    if not isinstance(context, dict):
        return 0, 0, None
    input_tokens = int(context.get("total_input_tokens") or 0)
    output_tokens = int(context.get("total_output_tokens") or 0)
    used_percentage = context.get("used_percentage")
    try:
        used = int(float(used_percentage)) if used_percentage is not None else None
    except (TypeError, ValueError):
        used = None
    return input_tokens, output_tokens, used


def iter_history() -> list[dict[str, Any]]:
    # ponytail: O(n) scan is fine for local JSONL; move to an index/MCP when history gets large.
    if not HISTORY_PATH.exists():
        return []
    rows: list[dict[str, Any]] = []
    with HISTORY_PATH.open("r", encoding="utf-8") as history:
        for line in history:
            try:
                row = json.loads(line)
            except json.JSONDecodeError:
                continue
            if isinstance(row, dict):
                rows.append(row)
    return rows


def append_history(row: dict[str, Any]) -> None:
    HISTORY_PATH.parent.mkdir(parents=True, exist_ok=True)
    with HISTORY_PATH.open("a", encoding="utf-8") as history:
        history.write(json.dumps(row, sort_keys=True, separators=(",", ":")))
        history.write("\n")


def auto_save_snapshot(
    payload: dict[str, Any],
    rows: list[dict[str, Any]],
    project: str,
    feature: str | None,
    model: str,
    input_tokens: int,
    output_tokens: int,
    used_pct: int | None,
) -> bool:
    total_tokens = input_tokens + output_tokens
    if total_tokens <= 0:
        return False

    session_key = str(payload.get("session_id") or payload.get("transcript_path") or "unknown-session")
    auto_key = f"{session_key}:{project}:{feature or ''}:{model}:{input_tokens}:{output_tokens}"
    for row in rows:
        metadata = row.get("metadata")
        if isinstance(metadata, dict) and metadata.get("auto_key") == auto_key:
            return False

    append_history(
        {
            "timestamp": datetime.now(timezone.utc).isoformat(timespec="seconds"),
            "project": project,
            **({"feature": feature} if feature else {}),
            "source": "statusline",
            "summary": "Status line usage snapshot.",
            "model": model,
            "prompt_tokens": input_tokens,
            "completion_tokens": output_tokens,
            "total_tokens": total_tokens,
            "metadata": {
                "auto_key": auto_key,
                "session_id": payload.get("session_id"),
                "transcript_path": payload.get("transcript_path"),
                "used_percentage": used_pct,
            },
        }
    )
    return True


def compact_tokens(value: int) -> str:
    if value >= 1_000_000:
        return f"{value / 1_000_000:.1f}M"
    if value >= 10_000:
        return f"{value / 1_000:.0f}k"
    if value >= 1_000:
        return f"{value / 1_000:.1f}k"
    return str(value)


def context_bar(used_pct: int | None) -> str:
    if used_pct is None:
        return "ctx [??????????]"
    clamped = max(0, min(100, used_pct))
    width = 10
    filled = round(clamped * width / 100)
    return f"ctx [{'#' * filled}{'.' * (width - filled)}] {clamped}%"


def parse_rates(rates: dict[str, Any]) -> tuple[float, float] | None:
    try:
        return float(rates["input_per_million_usd"]), float(rates["output_per_million_usd"])
    except (KeyError, TypeError, ValueError):
        return None


def rates_for_model(prices: dict[str, Any], model: str) -> tuple[float, float] | None:
    models = prices.get("models")
    if isinstance(models, dict):
        model_lower = model.lower()
        for pattern, rates in models.items():
            if str(pattern).lower() in model_lower and isinstance(rates, dict):
                parsed = parse_rates(rates)
                if parsed:
                    return parsed
    default = prices.get("default")
    return parse_rates(default) if isinstance(default, dict) else None


def estimate_cost(input_tokens: int, output_tokens: int, model: str) -> str:
    rates = rates_for_model(load_prices(), model)
    if not rates:
        return "cost unpriced"
    input_rate, output_rate = rates
    cost = (input_tokens / 1_000_000 * input_rate) + (output_tokens / 1_000_000 * output_rate)
    return f"est ${cost:.4f}"


def statusline_options(config: dict[str, Any]) -> dict[str, bool]:
    options = config.get("statusline")
    if not isinstance(options, dict):
        options = {}
    return {
        "enabled": bool(options.get("enabled", True)),
        "show_label": bool(options.get("show_label", True)),
        "show_project": bool(options.get("show_project", True)),
        "show_feature": bool(options.get("show_feature", True)),
        "show_model": bool(options.get("show_model", True)),
        "show_context": bool(options.get("show_context", True)),
        "show_tokens": bool(options.get("show_tokens", True)),
        "show_cost": bool(options.get("show_cost", False)),
    }


def main() -> None:
    payload = load_json_stdin()
    config = load_config()
    options = statusline_options(config)
    if not options["enabled"]:
        return

    current_dir = workspace_dir_from_payload(payload)
    project = project_from_payload(payload, config, current_dir)
    feature = feature_from_payload(payload, config, current_dir)
    model = model_from_payload(payload)
    input_tokens, output_tokens, used_pct = context_tokens(payload)
    total_context = input_tokens + output_tokens

    rows = iter_history()
    auto_save_snapshot(payload, rows, project, feature, model, input_tokens, output_tokens, used_pct)

    ctx = context_bar(used_pct)
    toks = f"toks {compact_tokens(total_context)}"
    scope = f"{project}/{feature}" if feature and options["show_feature"] else project
    parts: list[str] = []
    if options["show_label"]:
        parts.append("token-tracker")
    if options["show_project"]:
        parts.append(scope)
    if options["show_model"]:
        parts.append(model)
    if options["show_context"]:
        parts.append(ctx)
    if options["show_tokens"]:
        parts.append(toks)
    if options["show_cost"]:
        parts.append(estimate_cost(input_tokens, output_tokens, model))
    print(" | ".join(parts))


if __name__ == "__main__":
    main()
