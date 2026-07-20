#!/usr/bin/env python3
"""Set token-tracker project or feature labels for a workspace."""

from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
from typing import Any


CONFIG_PATH = Path(os.environ.get("TOKEN_TRACKER_CONFIG", "~/.cursor/token-tracker/config.json")).expanduser()


def load_config() -> dict[str, Any]:
    if not CONFIG_PATH.exists():
        return {"default_project": None, "default_feature": None, "projects": {}, "features": {}}
    with CONFIG_PATH.open("r", encoding="utf-8") as config:
        payload = json.load(config)
    return payload if isinstance(payload, dict) else {}


def save_config(config: dict[str, Any]) -> None:
    CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with CONFIG_PATH.open("w", encoding="utf-8") as output:
        json.dump(config, output, indent=2, sort_keys=True)
        output.write("\n")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workspace", default=os.getcwd(), help="Workspace path to label.")
    parser.add_argument("--project", help="Project label for this workspace.")
    parser.add_argument("--feature", help="Feature label for this workspace.")
    parser.add_argument("--clear-feature", action="store_true", help="Remove feature label for this workspace.")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    workspace = str(Path(args.workspace).expanduser().resolve())
    config = load_config()
    config.setdefault("default_project", None)
    config.setdefault("default_feature", None)
    projects = config.setdefault("projects", {})
    features = config.setdefault("features", {})

    if args.project:
        projects[workspace] = args.project
    if args.clear_feature:
        features.pop(workspace, None)
    elif args.feature:
        features[workspace] = args.feature

    save_config(config)
    print(json.dumps({"workspace": workspace, "project": projects.get(workspace), "feature": features.get(workspace)}, sort_keys=True))


if __name__ == "__main__":
    main()
