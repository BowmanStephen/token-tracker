# Token Tracker

Local Cursor and Claude Code skill that snapshots AI token usage by project and feature, with an optional CLI status line.

## Requirements

- Cursor CLI and/or Claude Code with personal skills enabled
- Python 3 (`python3`)
- Unix-like shell for the install commands below
- Optional: `git`, used to fall back to the current branch as the feature name

No Python packages are required.

## Install (Cursor)

```bash
mkdir -p ~/.cursor/skills
cp -R cursor ~/.cursor/skills/token-tracker
chmod +x ~/.cursor/skills/token-tracker/scripts/*.py
```

Create local data config:

```bash
mkdir -p ~/.cursor/token-tracker
cat > ~/.cursor/token-tracker/config.json <<'JSON'
{
  "default_project": null,
  "default_feature": null,
  "projects": {},
  "features": {},
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
JSON
```

Add this to `~/.cursor/cli-config.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.cursor/skills/token-tracker/scripts/statusline-token-usage.py",
    "padding": 2,
    "timeoutMs": 1000
  }
}
```

If `statusLine` already exists, replace only that object or choose which status line command should own the prompt footer.

Restart Cursor CLI after changing `~/.cursor/cli-config.json`.

## Install (Claude Code)

```bash
mkdir -p ~/.claude/skills
cp -R claude ~/.claude/skills/token-tracker
chmod +x ~/.claude/skills/token-tracker/scripts/*.py
```

Claude and Cursor intentionally share local data under `~/.cursor/token-tracker/`.

## Configure Project And Feature

```bash
~/.cursor/skills/token-tracker/scripts/set-token-context.py \
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
2. Workspace path in `~/.cursor/token-tracker/config.json` under `projects`
3. `default_project`
4. Workspace folder name

## Status Line Options

Configure visible status line fields in `~/.cursor/token-tracker/config.json`:

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

Optional estimated cost uses `~/.cursor/token-tracker/prices.json`:

```json
{
  "models": {
    "gpt-5.5": {
      "input_per_million_usd": 1.25,
      "output_per_million_usd": 10.0
    }
  }
}
```

## Verify

```bash
printf '%s' '{"session_id":"install-check","cwd":"'"$PWD"'","workspace":{"current_dir":"'"$PWD"'"},"model":{"display_name":"GPT-5.5"},"context_window":{"total_input_tokens":1000,"total_output_tokens":250,"used_percentage":4}}' \
  | TOKEN_TRACKER_HISTORY=/tmp/token-tracker-install-check.jsonl \
    ~/.cursor/skills/token-tracker/scripts/statusline-token-usage.py
```

Expected shape:

```text
token-tracker | token-tracker/token-tracker-init | GPT-5.5 | ctx [..........] 4% | toks 1.2k
```

## Data

History is stored locally:

```bash
~/.cursor/token-tracker/history.jsonl
```

Snapshots store summaries and token counters, not raw prompts or transcript contents.

## Repo Layout

- `cursor/` — Cursor personal skill (`~/.cursor/skills/token-tracker`)
- `claude/` — Claude Code personal skill (`~/.claude/skills/token-tracker`)
