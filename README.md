# Token Tracker

Local Cursor and Claude Code skill that snapshots AI token usage by project and feature, with an optional CLI status line.

## Quick Install

```bash
npx @mbrundige/token-tracker install --cursor --claude
```

That copies skills into:

- `~/.cursor/skills/token-tracker`
- `~/.claude/skills/token-tracker`

and wires Cursor CLI `statusLine` to the Node status script (unless you pass `--no-statusline`).

Restart Cursor CLI after install.

## Requirements

- Node.js 22+
- Cursor CLI and/or Claude Code with personal skills enabled
- Optional: `git`, used to fall back to the current branch as the feature name

No npm dependencies.

## Manual Install

```bash
npm pack
# or from a clone:
node bin/token-tracker.js install --cursor --claude
```

## Configure Project And Feature

```bash
npx @mbrundige/token-tracker set-context \
  --workspace "$PWD" \
  --project "token-tracker" \
  --feature "token-tracker-init"
```

Feature resolution order:

1. `TOKEN_TRACKER_FEATURE`
2. Workspace path in `~/.cursor/token-tracker/config.json` under `features`
3. `default_feature`
4. Current git branch

Project resolution order:

1. `TOKEN_TRACKER_PROJECT`
2. Workspace path under `projects`
3. `default_project`
4. Workspace folder name

Token counts in the status line are feature-scoped. Switching project or feature resets `toks` to `0` for the new scope and tracks usage from that point forward.

## Report

```bash
npx @mbrundige/token-tracker report
```

Shows usage by feature and a GitHub-style daily heat map. Invoking `/token-tracker` in Cursor/Claude should run this report.

## Save A Snapshot

```bash
npx @mbrundige/token-tracker save \
  --project "token-tracker" \
  --feature "token-tracker-init" \
  --summary "Initial token tracker setup."
```

History:

```bash
~/.cursor/token-tracker/history.jsonl
```

## Status Line Options

Configure visible fields in `~/.cursor/token-tracker/config.json`:

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

Optional estimated cost uses `~/.cursor/token-tracker/prices.json`.

## Verify

```bash
printf '%s' '{"session_id":"install-check","cwd":"'"$PWD"'","workspace":{"current_dir":"'"$PWD"'"},"model":{"display_name":"GPT-5.5"},"context_window":{"total_input_tokens":1000,"total_output_tokens":250,"used_percentage":4}}' \
  | TOKEN_TRACKER_HISTORY=/tmp/token-tracker-install-check.jsonl \
    node scripts/statusline-token-usage.js
```

Expected shape:

```text
token-tracker | token-tracker/token-tracker-init | GPT-5.5 | ctx [..........] 4% | toks 1.2k
```

## Publish (maintainers)

```bash
npm login
npm publish --access public
```

Then users can run:

```bash
npx @mbrundige/token-tracker install
```

## Repo Layout

- `bin/token-tracker.js` — npx CLI (`install`, `save`, `set-context`, `statusline`)
- `scripts/` — shared Node helpers
- `cursor/SKILL.md` — Cursor skill instructions
- `claude/SKILL.md` — Claude Code skill instructions
