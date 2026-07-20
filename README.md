# Token Tracker

**Local token usage tracking for Cursor and Claude Code** — snapshot AI spend by project and feature, keep a GitHub-style heat map, and optionally show a live CLI status line.

No npm dependencies. Data stays on your machine under `~/.cursor/token-tracker/`.

<p align="center">
  <img src="docs/screenshots/report.png" alt="token-tracker report with feature breakdown and heat map" width="720" />
</p>

<p align="center">
  <img src="docs/screenshots/statusline.png" alt="token-tracker Cursor CLI status line" width="720" />
</p>

## Why

AI sessions burn tokens across many threads, models, and side quests. Token Tracker answers:

- **Where did the tokens go?** Breakdown by `project/feature`, not just a session total
- **What does this week look like?** Daily heat map (same shape as a GitHub contribution graph)
- **What am I burning right now?** Optional Cursor CLI `statusLine` with feature-scoped `toks`

Switching project or feature resets the status-line counter for that scope, so each label tracks usage from that point forward.

## Features

- **One-command install** into Cursor and/or Claude Code personal skills
- **`/token-tracker` skill** — run the report (and optionally save a snapshot) from chat
- **Feature-scoped status line** — project, feature, model, context bar, token count
- **Local JSONL history** — no cloud sync, no accounts
- **Epoch-aware totals** — feature resets do not double-count growing snapshots
- **Zero runtime deps** — plain Node.js 22+ scripts

## Quick install

```bash
npx @mbrundige/token-tracker install --cursor --claude
```

<p align="center">
  <img src="docs/screenshots/install.png" alt="token-tracker install output" width="720" />
</p>

That copies skills into:

| Target | Path |
| --- | --- |
| Cursor | `~/.cursor/skills/token-tracker` |
| Claude Code | `~/.claude/skills/token-tracker` |

and wires Cursor CLI `statusLine` to the Node status script (unless you pass `--no-statusline`).

**Restart Cursor CLI after install.**

### Install options

| Flag | Effect |
| --- | --- |
| `--cursor` | Install the Cursor skill (default if neither skill flag is set) |
| `--claude` | Install the Claude Code skill |
| `--statusline` | Force Cursor CLI `statusLine` wiring |
| `--no-statusline` | Skip `statusLine` changes |

## Requirements

- Node.js **22+**
- Cursor CLI and/or Claude Code with personal skills enabled
- Optional: `git` (falls back to the current branch as the feature name)

## Label a project and feature

```bash
npx @mbrundige/token-tracker set-context \
  --workspace "$PWD" \
  --project "token-tracker" \
  --feature "readme-demos"
```

<p align="center">
  <img src="docs/screenshots/set-context.png" alt="token-tracker set-context output" width="720" />
</p>

`tokens_reset: true` means the status-line counter will start at `0` for the new scope.

### Resolution order

**Feature**

1. `TOKEN_TRACKER_FEATURE`
2. Workspace path in `~/.cursor/token-tracker/config.json` under `features`
3. `default_feature`
4. Current git branch

**Project**

1. `TOKEN_TRACKER_PROJECT`
2. Workspace path under `projects`
3. `default_project`
4. Workspace folder name

## Report

```bash
npx @mbrundige/token-tracker report
```

Shows usage by feature (with bar chart) and a daily heat map. Invoking `/token-tracker` in Cursor or Claude Code runs this report.

History file:

```text
~/.cursor/token-tracker/history.jsonl
```

## Save a snapshot

```bash
npx @mbrundige/token-tracker save \
  --project "token-tracker" \
  --feature "readme-demos" \
  --summary "Polished README with terminal demos." \
  --prompt-tokens 4200 \
  --completion-tokens 1100
```

<p align="center">
  <img src="docs/screenshots/save.png" alt="token-tracker save snapshot output" width="720" />
</p>

You can also pass a full JSON object with `--json '...'` or on stdin. Snapshots store summaries and counts — not prompts or transcripts.

## Status line

Cursor CLI can show a live line like:

```text
token-tracker | token-tracker/readme-demos | GPT-5.5 | ctx [###.......] 27% | toks 7.1k
```

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

Optional estimated cost uses `~/.cursor/token-tracker/prices.json` when `show_cost` is `true`.

Test it manually:

```bash
printf '%s' '{"session_id":"demo","cwd":"'"$PWD"'","workspace":{"current_dir":"'"$PWD"'"},"model":{"display_name":"GPT-5.5"},"context_window":{"total_input_tokens":18420,"total_output_tokens":4680,"used_percentage":27}}' \
  | npx @mbrundige/token-tracker statusline
```

## CLI reference

```text
npx @mbrundige/token-tracker install [--cursor] [--claude] [--statusline|--no-statusline]
npx @mbrundige/token-tracker report
npx @mbrundige/token-tracker save --summary "..." [--project NAME] [--feature NAME]
npx @mbrundige/token-tracker set-context --project NAME --feature NAME [--workspace PATH]
npx @mbrundige/token-tracker statusline   # reads status JSON from stdin
```

## Manual install (from a clone)

```bash
node bin/token-tracker.js install --cursor --claude
# or
npm pack
npx ./mbrundige-token-tracker-*.tgz install --cursor --claude
```

## Verify

```bash
printf '%s' '{"session_id":"install-check","cwd":"'"$PWD"'","workspace":{"current_dir":"'"$PWD"'"},"model":{"display_name":"GPT-5.5"},"context_window":{"total_input_tokens":1000,"total_output_tokens":250,"used_percentage":4}}' \
  | TOKEN_TRACKER_HISTORY=/tmp/token-tracker-install-check.jsonl \
    node scripts/statusline-token-usage.js
```

Expected shape:

```text
token-tracker | <project>/<feature> | GPT-5.5 | ctx [..........] 4% | toks 0
```

(First call for a scope baselines at `toks 0`; later calls show tokens since that baseline.)

## Data layout

| Path | Purpose |
| --- | --- |
| `~/.cursor/token-tracker/config.json` | Project/feature map + status line options |
| `~/.cursor/token-tracker/history.jsonl` | Append-only usage snapshots |
| `~/.cursor/token-tracker/prices.json` | Optional model price table for cost estimates |

Override paths with `TOKEN_TRACKER_CONFIG`, `TOKEN_TRACKER_HISTORY`, and `TOKEN_TRACKER_PRICES`.

## Repo layout

| Path | Role |
| --- | --- |
| `bin/token-tracker.js` | npx CLI (`install`, `save`, `set-context`, `statusline`, `report`) |
| `scripts/` | Shared Node helpers |
| `cursor/SKILL.md` | Cursor skill instructions |
| `claude/SKILL.md` | Claude Code skill instructions |
| `docs/screenshots/` | README terminal demos |

## Publish (maintainers)

```bash
npm login
npm publish --access public
```

Then users can run:

```bash
npx @mbrundige/token-tracker install
```

## License

MIT
