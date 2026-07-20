#!/usr/bin/env python3
"""Append a token usage snapshot to local JSONL history."""

from __future__ import annotations

import argparse
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


DEFAULT_HISTORY = Path("~/.cursor/token-tracker/history.jsonl").expanduser()
INT_FIELDS = ("prompt_tokens", "completion_tokens", "total_tokens")


def fail(message: str) -> None:
    print(f"token-tracker: {message}", file=sys.stderr)
    raise SystemExit(2)


def load_payload(args: argparse.Namespace) -> dict[str, Any]:
    raw = args.json
    if raw is None and not sys.stdin.isatty():
        raw = sys.stdin.read()
    if raw:
        try:
            payload = json.loads(raw)
        except json.JSONDecodeError as exc:
            fail(f"invalid JSON payload: {exc}")
        if not isinstance(payload, dict):
            fail("JSON payload must be an object")
        return payload

    payload: dict[str, Any] = {
        "project": args.project,
        "feature": args.feature,
        "summary": args.summary,
        "model": args.model,
        "source": args.source,
    }
    for field in INT_FIELDS:
        value = getattr(args, field)
        if value is not None:
            payload[field] = value
    if args.metadata_json:
        try:
            metadata = json.loads(args.metadata_json)
        except json.JSONDecodeError as exc:
            fail(f"invalid metadata JSON: {exc}")
        if not isinstance(metadata, dict):
            fail("metadata must be a JSON object")
        payload["metadata"] = metadata
    return {key: value for key, value in payload.items() if value is not None}


def clean_snapshot(payload: dict[str, Any]) -> dict[str, Any]:
    summary = str(payload.get("summary", "")).strip()
    if not summary:
        fail("summary is required")

    snapshot: dict[str, Any] = {
        "timestamp": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "project": str(payload.get("project") or Path.cwd().name),
        "source": str(payload.get("source") or "manual"),
        "summary": summary,
    }

    if payload.get("model"):
        snapshot["model"] = str(payload["model"])
    if payload.get("feature"):
        snapshot["feature"] = str(payload["feature"])

    for field in INT_FIELDS:
        value = payload.get(field)
        if value is None:
            continue
        try:
            parsed = int(value)
        except (TypeError, ValueError):
            fail(f"{field} must be an integer")
        if parsed < 0:
            fail(f"{field} must be non-negative")
        snapshot[field] = parsed

    if "total_tokens" not in snapshot:
        prompt_tokens = snapshot.get("prompt_tokens")
        completion_tokens = snapshot.get("completion_tokens")
        if isinstance(prompt_tokens, int) and isinstance(completion_tokens, int):
            snapshot["total_tokens"] = prompt_tokens + completion_tokens

    metadata = payload.get("metadata")
    if metadata is not None:
        if not isinstance(metadata, dict):
            fail("metadata must be an object")
        snapshot["metadata"] = metadata

    return snapshot


def append_snapshot(snapshot: dict[str, Any], history_path: Path) -> None:
    history_path.parent.mkdir(parents=True, exist_ok=True)
    with history_path.open("a", encoding="utf-8") as history:
        history.write(json.dumps(snapshot, sort_keys=True, separators=(",", ":")))
        history.write("\n")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--json", help="Snapshot JSON object. If omitted, stdin is used when piped.")
    parser.add_argument("--history", default=os.environ.get("TOKEN_TRACKER_HISTORY"), help="Override history JSONL path.")
    parser.add_argument("--project")
    parser.add_argument("--feature")
    parser.add_argument("--summary")
    parser.add_argument("--model")
    parser.add_argument("--source", default="manual")
    parser.add_argument("--prompt-tokens", dest="prompt_tokens", type=int)
    parser.add_argument("--completion-tokens", dest="completion_tokens", type=int)
    parser.add_argument("--total-tokens", dest="total_tokens", type=int)
    parser.add_argument("--metadata-json")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    payload = load_payload(args)
    snapshot = clean_snapshot(payload)
    history_path = Path(args.history).expanduser() if args.history else DEFAULT_HISTORY
    append_snapshot(snapshot, history_path)
    print(json.dumps({"saved": str(history_path), "snapshot": snapshot}, sort_keys=True))


if __name__ == "__main__":
    main()
