---
name: token-tracker
description: Saves Cursor token usage snapshots to local history and helps track project token cost. Use when the user asks to save, record, dump, log, or track token usage/history; when token usage or cost is discussed; or after long tasks where the user may want to preserve a usage snapshot.
---

# Token Tracker

## When To Prompt

Prompt the user before saving unless they explicitly asked to save.

Ask a concise question like:

`Save this token usage snapshot to local history?`

Default to not saving if the user does not answer. Do not save secrets, raw prompts, or transcript contents.

## Save Workflow

1. Build a short snapshot:
   - `project`: workspace directory name or current project name.
   - `summary`: one sentence describing the session or task.
   - `model`: current model name if known.
   - `prompt_tokens`, `completion_tokens`, `total_tokens`: include exact values only when available.
   - `metadata`: optional small object for non-sensitive details.
2. Run the save script:

```bash
~/.cursor/skills/token-tracker/scripts/save-token-usage.py --json '<snapshot-json>'
```

3. Tell the user the snapshot was saved and include the history path:

`~/.cursor/token-tracker/history.jsonl`

## Snapshot Rules

- Save summaries, not conversation content.
- If token counts are unavailable, save the summary with `source: "manual"` and omit the unknown fields.
- Status line snapshots use `source: "statusline"` and are deduped by session, project, model, and token counters.
- If the user asks for project history, read `~/.cursor/token-tracker/history.jsonl` and summarize entries for the current project.
- The status line shows an ASCII context progress bar and current token count.

## Project And Feature Names

Project names resolve in this order:

1. `TOKEN_TRACKER_PROJECT` environment variable.
2. Exact workspace path in `~/.cursor/token-tracker/config.json` under `projects`.
3. `default_project` in `~/.cursor/token-tracker/config.json`.
4. Current workspace folder name.

Feature names resolve in this order:

1. `TOKEN_TRACKER_FEATURE` environment variable.
2. Exact workspace path in `~/.cursor/token-tracker/config.json` under `features`.
3. `default_feature` in `~/.cursor/token-tracker/config.json`.
4. Current git branch, using Cursor `worktree.name` first and `git branch --show-current` as fallback.

When the user says something like "for this feature, track this as token-tracker-init", set the current workspace feature:

```bash
~/.cursor/skills/token-tracker/scripts/set-token-context.py --workspace "$PWD" --feature "token-tracker-init"
```

If they also specify a project:

```bash
~/.cursor/skills/token-tracker/scripts/set-token-context.py --workspace "$PWD" --project "token-tracker" --feature "token-tracker-init"
```

Example config:

```json
{
  "default_project": null,
  "default_feature": null,
  "projects": {
    "/Users/me/work/my-repo": "Client Portal"
  },
  "features": {
    "/Users/me/work/my-repo": "checkout-redesign"
  }
}
```

## Status Line

The status line script lives at:

```bash
~/.cursor/skills/token-tracker/scripts/statusline-token-usage.py
```

It reads Cursor status line JSON from stdin, records a deduped local usage snapshot when token counters change, and prints project/feature, model, context usage, and token count.

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
