---
name: token-tracker
description: Saves local token usage snapshots and tracks project or feature token context. Use when the user asks to save, record, dump, log, or track token usage/history; when token usage or cost is discussed; when the user wants to label the current project or feature; or after long tasks where the user may want to preserve a usage snapshot.
---

# Token Tracker

## When To Prompt

Prompt the user before manually saving unless they explicitly asked to save.

Ask:

`Save this token usage snapshot to local history?`

Default to not saving if the user does not answer. Do not save secrets, raw prompts, or transcript contents.

## Save Workflow

1. Build a short snapshot:
   - `project`: configured project name or current workspace folder.
   - `feature`: configured feature name, current git branch, or omit if unknown.
   - `summary`: one sentence describing the session or task.
   - `model`: current model name if known.
   - `prompt_tokens`, `completion_tokens`, `total_tokens`: include exact values only when available.
   - `metadata`: optional small object for non-sensitive details.
2. Run:

```bash
~/.claude/skills/token-tracker/scripts/save-token-usage.py --json '<snapshot-json>'
```

3. Tell the user the snapshot was saved to:

`~/.cursor/token-tracker/history.jsonl`

## Project And Feature Labels

When the user says something like "track this feature as token-tracker-init", set the current workspace feature:

```bash
~/.claude/skills/token-tracker/scripts/set-token-context.py --workspace "$PWD" --feature "token-tracker-init"
```

If they also specify a project:

```bash
~/.claude/skills/token-tracker/scripts/set-token-context.py --workspace "$PWD" --project "token-tracker" --feature "token-tracker-init"
```

Project names resolve in this order:

1. `TOKEN_TRACKER_PROJECT` environment variable.
2. Exact workspace path in `~/.cursor/token-tracker/config.json` under `projects`.
3. `default_project` in `~/.cursor/token-tracker/config.json`.
4. Current workspace folder name.

Feature names resolve in this order:

1. `TOKEN_TRACKER_FEATURE` environment variable.
2. Exact workspace path in `~/.cursor/token-tracker/config.json` under `features`.
3. `default_feature` in `~/.cursor/token-tracker/config.json`.
4. Current git branch.

## Snapshot Rules

- Save summaries, not conversation content.
- If token counts are unavailable, save the summary with `source: "manual"` and omit unknown fields.
- If the user asks for project or feature history, read `~/.cursor/token-tracker/history.jsonl` and summarize matching entries.
- Shared data lives under `~/.cursor/token-tracker/` so Cursor and Claude can use the same history.

## Optional Status Line

The status line script is available at:

```bash
~/.claude/skills/token-tracker/scripts/statusline-token-usage.py
```

It expects Claude/Cursor-style status line JSON on stdin, records deduped local snapshots when token counters change, and prints project/feature, model, context usage, and token count.

Status line fields are controlled by `~/.cursor/token-tracker/config.json`:

```json
{
  "statusline": {
    "enabled": true,
    "show_label": true,
    "show_project": true,
    "show_feature": true,
    "show_model": true,
    "show_context": true,
    "show_tokens": true,
    "show_cost": false
  }
}
```

Exact billing can be added later through an MCP without changing the JSONL history format.
