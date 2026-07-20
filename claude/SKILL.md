---
name: token-tracker
description: Saves local token usage snapshots and reports token usage by feature with a daily heat map. Use when the user invokes /token-tracker; asks to save, record, dump, log, or track token usage/history; wants a usage breakdown or heat map; discusses token usage or cost; or wants to label the current project or feature.
---

# Token Tracker

## Slash Command: /token-tracker

When the user invokes `/token-tracker` (with no other request), run:

```bash
~/.claude/skills/token-tracker/scripts/report-token-usage.js
```

Show the feature breakdown and heat map, then ask once whether to save a snapshot. Default to not saving if unanswered.

## Save Workflow

```bash
~/.claude/skills/token-tracker/scripts/save-token-usage.js --json '<snapshot-json>'
```

History: `~/.cursor/token-tracker/history.jsonl`

## Feature Labels

```bash
~/.claude/skills/token-tracker/scripts/set-token-context.js --workspace "$PWD" --feature "maintenance"
```

Status line tokens are feature-scoped and reset on project/feature switch.

## Report

```bash
~/.claude/skills/token-tracker/scripts/report-token-usage.js
```

Shared data lives under `~/.cursor/token-tracker/`.
