<p align="center">
  <img src="docs/logos/token-tracker.png" alt="florin, local token ledger" width="900" />
</p>

<p align="center">
  <em>token-tracker</em>
</p>

---

The lights go down. The mural comes up. A gold **F** in a giant palm. Somebody in the cheap seats whispers *is that a CLI.*

**Yes!**

**Wow!**

**How you doing GitHub?**

We got florins. We got folders. We got a heat map that looks like you shipped and feels like you paid. Put your hands together for a product that does not ask your phone for a single joke tip.

---

People said *raise a round.* People said *you need a Series A for a folder.* People said money arrives like a parade float and you clap until your wrists hurt.

We inverted the parade.

**No angels.**  
**No float.**  
**No wrist injuries.**

The candy is free. The candy is `npx`. The candy lives in your home directory and does not RSVP. If you brought a pitch deck to this README, eat it. The ledger already ate Tuesday.

---

Do you like to laugh?

Wrong README.

Do you like **receipts?**

Do you like a little bar chart that says *this feature ate the week* without sending a scout into your camera roll?

**Yes. Wow. Receipts.**

---

Put your hands together for **florin**.

Put your hands together for a **local ledger powered by your machine**.

Not the cloud’s machine. Not the carrier’s machine. **Yours.** Cursor writes. Claude writes. Gemini writes. Codex writes. Continue writes. Agent Skills write. One book. Many hands. Still your disk.

<p align="center">
  <strong>Local token usage tracking</strong> for Cursor, Claude Code, Gemini CLI, Codex, Continue, and other Agent Skills hosts. Snapshot spend by project and feature, keep a GitHub-style heat map, and optionally show a live Cursor CLI status line.
</p>

<p align="center">
  <img src="docs/logos/cursor.png" alt="Cursor" height="36" />
  <img src="docs/logos/claude.png" alt="Claude Code" height="36" />
  <img src="docs/logos/gemini.png" alt="Gemini CLI" height="36" />
  <img src="docs/logos/codex.png" alt="Codex CLI" height="36" />
  <img src="docs/logos/continue.png" alt="Continue" height="36" />
  <img src="docs/logos/agents.png" alt="Agent Skills" height="36" />
</p>

---

I have to interrupt myself. I love this path the way some people love a car they paid cash for and still describe at dinner.

**MSRP:** free.  
**Fuel:** Node.js **22+**.  
**Connectivity:** Cursor, Claude, Gemini, Codex, Continue, Agents — **galore**.  
**Resale:** you cannot flip a ledger, but you can open `~/.token-tracker/` and feel rich in JSONL.  
**Zero npm dependencies.** Shared data lives in `~/.token-tracker/`. Every host writes the same history.

Somebody once ran into traffic for a status line. Not metaphorically. Crosswalk. Laptop open. `toks` climbing like a pulse. We do not recommend the traffic. We recommend the status line. Optional. Sacred. Feature-scoped.

Local only. Your machine.

---

<p align="center">
  <img src="docs/screenshots/report.png" alt="token-tracker report with feature breakdown, estimated cost, and heat map" width="720" />
</p>

Look at that. Everyone is looking at the numbers. The standup ends. The room goes quiet. One guy says *I thought green squares meant I was a good person.* Another guy says *those are dollars wearing a costume.* A third guy starts a group chat called **Receipt Church** and nobody leaves. That is the social report. No blood. Just accountability with a heat map.

<p align="center">
  <img src="docs/screenshots/statusline.png" alt="token-tracker Cursor CLI status line with estimated cost" width="720" />
</p>

Live line. Live shame. Live love. `toks` and `$` and a context bar that does not harvest your texts.

---

## Why

This is not a dirty box.

We do **not** pull your messages. We do **not** scrape your bank app. We do **not** invent comedy from your photos. We count tokens in a **home folder**. **100% accurate counting** of what the hosts already told us. Empathy for your bill. Zero empathy for harvest theater.

AI sessions burn tokens across threads, models, and side quests you never labeled. token-tracker answers:

- **Where did the tokens go?** Breakdown by `project/feature`, not only a session total
- **What does this week look like?** Daily heat map (a contribution graph for your bill)
- **What am I burning right now?** Optional Cursor CLI `statusLine` with feature-scoped `toks` and estimated `$` cost

Switching project or feature resets the status-line counter for that scope, so each label tracks usage from that point forward. New label, new epoch. The old spend stays in the book.

---

### Invest zero

Shark Tank form, inverted.

Do not invest in me.  
Do not invest in a Series A for a folder.  
Invest **zero**. Invest in the **folder**. Bring cranberry sauce to Thanksgiving if you want — the ledger does not carve the turkey, does not ask for equity, and does not sit at the kids’ table. It sits at `~/.token-tracker/` and writes what happened.

---

### Florence pride (hometown bit)

I am from a city that stamped gold and called it a unit of account. Florence. The *fiorino d’oro*. Not a museum gift-shop speech. Hometown pride: they named a coin so merchants could stop arguing. **token-tracker** borrows the name: tokens are the unit, `~/.token-tracker/` is the book, and the **F** is for *fiorino*. We don’t move your gold. We count what you already spent.

<p align="center">
  <img src="docs/logos/florin-coin.png" alt="Engraved florin F-coin" width="200" />
  &nbsp;&nbsp;
  <img src="docs/logos/florin-ascii.png" alt="ASCII florin disc" width="200" />
</p>

The coin fits on a shirt. The mural does not. Ship both. A coworker laughed when the mural showed up on a Node CLI. He said nobody puts a medieval coin on a status line. The coin is still there. So is he, quieter now. Love the mural. Love the F-coin. Love the ASCII disc. Shirt first. Then the path. Then the numbers.

---

### Outdoor yells (for toks)

Sometimes you have to take it outside.

**TOKS!**  
**FEATURE!**  
**EPOCH!**

Yell at the sky if the status line says `7.1k`. Yell softer if it says `$0.0534`. The neighbors will think you are gardening. You are gardening a ledger.

---

## Features

- **One-command install** into Cursor, Claude Code, Gemini CLI, Codex, Continue, and `~/.agents/skills`
- **Shared history** across hosts (one JSONL ledger under `~/.token-tracker/`)
- **`/token-tracker` skill**: run the report (and optionally save a snapshot) from chat
- **`/set-feature` slash command**: label the current workspace feature from chat (Cursor, Claude, Gemini)
- **Gemini custom commands**: `/token-tracker` and `/set-feature` under `~/.gemini/commands/`
- **Feature-scoped status line**: project, feature, model, context bar, token count, estimated cost
- **Estimated cost per feature**: from `prices.json` rates × prompt/completion deltas (epoch-aware)
- **Epoch-aware totals**: feature resets do not double-count growing snapshots
- **Zero runtime deps**: plain Node.js 22+ scripts. Open the hood. Scripts. No carnival riding shotgun.

You open six tools. You forget which one ate Tuesday. The ledger remembers. That is the feature.

---

## Quick install

### The diet (commands are the meal plan)

Breakfast: install.  
Lunch: set-feature.  
Dinner: report.  
Dessert: still free. Still not an angel.

Install everywhere you use agent skills:

```bash
npx @mbrundige/token-tracker install --all
```

Or pick hosts:

```bash
npx @mbrundige/token-tracker install --cursor --claude --gemini --codex
```

<p align="center">
  <img src="docs/screenshots/install.png" alt="token-tracker install output" width="720" />
</p>

### Supported hosts

| | Flag | Host | Skill path | Extra |
| --- | --- | --- | --- | --- |
| <img src="docs/logos/cursor.png" alt="Cursor" height="28" /> | `--cursor` | Cursor | `~/.cursor/skills/token-tracker` | Optional CLI `statusLine`; installs `/set-feature` |
| <img src="docs/logos/claude.png" alt="Claude Code" height="28" /> | `--claude` | Claude Code | `~/.claude/skills/token-tracker` | Installs `/set-feature` |
| <img src="docs/logos/gemini.png" alt="Gemini CLI" height="28" /> | `--gemini` | Gemini CLI | `~/.gemini/skills/token-tracker` | Also installs `/token-tracker` and `/set-feature` commands |
| <img src="docs/logos/codex.png" alt="Codex CLI" height="28" /> | `--codex` | Codex CLI | `~/.codex/skills/token-tracker` | Invoke with `$token-tracker` / skills UI |
| <img src="docs/logos/agents.png" alt="Agent Skills" height="28" /> | `--agents` | Agent Skills standard | `~/.agents/skills/token-tracker` | Shared path used by Gemini and other tools |
| <img src="docs/logos/continue.png" alt="Continue" height="28" /> | `--continue` | Continue CLI | `~/.continue/skills/token-tracker` | |
| <img src="docs/logos/icon.png" alt="All hosts" height="28" /> | `--all` | All of the above | | Includes Cursor `statusLine` by default |

**After install**

- Cursor: restart Cursor CLI if you enabled the status line
- Gemini: run `/skills reload` and `/commands reload`
- Codex / Continue / others: restart or reload skills if the skill does not appear

### Install options

| Flag | Effect |
| --- | --- |
| `--statusline` | Force Cursor CLI `statusLine` wiring |
| `--no-statusline` | Skip `statusLine` changes |

Defaults when no target flags are set: `--cursor` and `--statusline`.

Install also writes a `token-tracker` launcher to `~/.local/bin/token-tracker` (and a shared CLI under `~/.token-tracker/cli/`). If your shell cannot find `token-tracker`, add `~/.local/bin` to `PATH`, or keep using `npx @mbrundige/token-tracker …` / `node ~/.cursor/skills/token-tracker/scripts/….js`.

## Requirements

- Node.js **22+**
- At least one supported host with personal/user skills enabled
- Optional: `git` (falls back to the current branch as the feature name)

No phone harvest. No comedy tips from your texts. A folder and a count. **100% accurate counting** of host-reported tokens. That is the whole empathy stack.

## Label a project and feature

Name the work before the model names it for you.

Spread the picnic blanket. Not a revenge picnic. A **label picnic**. You bring `/set-feature`. The ants bring nothing. The status line starts at zero for the new scope like you wiped the crumbs and kept the receipt book.

```bash
npx @mbrundige/token-tracker set-context \
  --workspace "$PWD" \
  --project "token-tracker" \
  --feature "readme-demos"
```

Or set only the feature (CLI or slash command):

```bash
npx @mbrundige/token-tracker set-feature readme-demos
npx @mbrundige/token-tracker set-feature --clear
```

In chat:

| Host | Command |
| --- | --- |
| Cursor | `/set-feature checkout-v2` (installs `~/.cursor/commands/set-feature.md`) |
| Claude Code | `/set-feature checkout-v2` (installs `~/.claude/commands/set-feature.md`) |
| Gemini CLI | `/set-feature checkout-v2` (installs `~/.gemini/commands/set-feature.toml`) |

<p align="center">
  <img src="docs/screenshots/set-context.png" alt="token-tracker set-context output" width="720" />
</p>

`tokens_reset: true` means the status-line counter will start at `0` for the new scope. Same machine. New handwriting.

### Resolution order

**Feature**

1. `TOKEN_TRACKER_FEATURE`
2. Workspace path in `~/.token-tracker/config.json` under `features`
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

Shows usage by feature (token bar chart + estimated cost) and a daily heat map. Same shape as a GitHub contribution graph. Different emotion. Green squares used to mean you shipped. These mean you typed.

In chat, invoke the skill:

| Host | How |
| --- | --- |
| Cursor / Claude Code / Continue | `/token-tracker` (skill); Cursor/Claude also get `/set-feature` |
| Gemini CLI | `/token-tracker` and `/set-feature` custom commands (or skill activation) |
| Codex CLI | `$token-tracker` or skills UI |

History file (shared by all hosts):

```text
~/.token-tracker/history.jsonl
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

You can also pass a full JSON object with `--json '...'` or on stdin. Snapshots store summaries and counts, not prompts or transcripts.

**Underscore aliases**: For convenience, token flags accept both kebab-case (`--prompt-tokens`) and underscore (`--prompt_tokens`) forms. The same applies to `--total-tokens`, `--completion-tokens`, and `--metadata-json`.

## Status line

Cursor CLI can show a live line like:

```text
token-tracker | token-tracker/readme-demos | GPT-5.5 | ctx [###.......] 27% | toks 7.1k | $0.0534
```

Configure visible fields in `~/.token-tracker/config.json`:

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
    "show_cost": true
  }
}
```

### Estimated cost

Cost is **feature-scoped**, same as `toks`:

1. Status line uses current feature prompt/completion totals × rates for the active model
2. Report walks history chronologically, prices **positive token deltas** between snapshots, and starts a new epoch when totals drop (feature reset)

Rates live in `~/.token-tracker/prices.json` (seeded on install from `templates/prices.json`):

```json
{
  "default": {
    "input_per_million_usd": 2.5,
    "output_per_million_usd": 15
  },
  "models": {
    "gpt-5.5": { "input_per_million_usd": 5, "output_per_million_usd": 30 },
    "claude opus": { "input_per_million_usd": 5, "output_per_million_usd": 25 }
  }
}
```

Model keys are case-insensitive **substrings** of the model display name; the longest match wins. These are API list-price estimates. Cursor/Claude subscriptions may bill differently, so edit the file to match your reality.

### Pull latest prices

Refresh `prices.json` from a public feed (default: OpenRouter):

```bash
npx @mbrundige/token-tracker prices pull
npx @mbrundige/token-tracker prices pull --source llmcosthub
npx @mbrundige/token-tracker prices show
```

| Source | URL |
| --- | --- |
| `openrouter` (default) | `https://openrouter.ai/api/v1/models` |
| `llmcosthub` | `https://llmcosthub.com/api/v1/pricing.json` |
| `benchgecko` | BenchGecko `pricing.json` on GitHub |

Pull writes `~/.token-tracker/prices.json` (with a `.bak` backup), keeps your existing `default` rates, and preserves any model entry marked `"locked": true`.

#### Automatic price refresh

You do **not** need to run `prices pull` yourself. Install seeds a local table, then:

1. **Install** kicks off a background pull from OpenRouter
2. **Report** pulls in the foreground when rates are still seed/missing or older than 1 hour (prints a short “Fetching/Refreshing…” note)
3. **Status line** keeps pulls in the background so it stays within Cursor’s ~1s budget

Seed files are marked `"source": "seed"` so they never look “fresh” just because the file was copied recently.

```json
{
  "prices": {
    "auto_pull": true,
    "auto_pull_interval_hours": 1,
    "source": "openrouter"
  }
}
```

Set `"auto_pull": false` (or `auto_pull_interval_hours: 0`) to disable. Manual `npx @mbrundige/token-tracker prices pull` still works when you want an immediate refresh.

#### Locked-in epoch costs

When a snapshot is saved (status line or `save`), Token Tracker records:

- `cost_delta_usd` - cost of that snapshot's token growth at **then-current** rates
- `estimated_cost_usd` - cumulative locked cost for the feature epoch

The report **prefers these locked deltas**, so historical feature cost does not drift when prices refresh. Unpriced older rows still fall back to live re-pricing. The status line shows locked history for the feature plus a live tip for tokens beyond the last snapshot (priced at current rates).

Set `"show_cost": false` to hide cost on the status line. The report still prints a cost column whenever prices are available.

Test it manually:

```bash
printf '%s' '{"session_id":"demo","cwd":"'"$PWD"'","workspace":{"current_dir":"'"$PWD"'"},"model":{"display_name":"GPT-5.5"},"context_window":{"total_input_tokens":18420,"total_output_tokens":4680,"used_percentage":27}}' \
  | npx @mbrundige/token-tracker statusline
```

## CLI reference

```text
npx @mbrundige/token-tracker install [--all] [--cursor] [--claude] [--gemini] [--codex] [--agents] [--continue] [--statusline|--no-statusline]
npx @mbrundige/token-tracker report
npx @mbrundige/token-tracker save --summary "..." [--project NAME] [--feature NAME]
npx @mbrundige/token-tracker set-context --project NAME --feature NAME [--workspace PATH]
npx @mbrundige/token-tracker set-feature NAME [--workspace PATH]
npx @mbrundige/token-tracker set-feature --clear [--workspace PATH]
npx @mbrundige/token-tracker statusline   # reads status JSON from stdin
npx @mbrundige/token-tracker prices pull [--source openrouter|llmcosthub|benchgecko]
npx @mbrundige/token-tracker prices show
```

## Manual install (from a clone)

```bash
node bin/token-tracker.js install --all
# or
npm pack
npx ./mbrundige-token-tracker-*.tgz install --gemini --codex
```

## Verify

Run it. Prefer green.

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

```bash
node scripts/check.js
```

## Data layout

| Path | Purpose |
| --- | --- |
| `~/.token-tracker/` | Agent-neutral shared data home (override with `TOKEN_TRACKER_HOME`) |
| `~/.token-tracker/config.json` | Project/feature map + status line options |
| `~/.token-tracker/history.jsonl` | Append-only usage snapshots (all hosts) |
| `~/.token-tracker/prices.json` | Model rate table for estimated cost (seeded on install) |
| `~/.cursor/commands/set-feature.md` | Cursor `/set-feature` slash command (when `--cursor`) |
| `~/.claude/commands/set-feature.md` | Claude Code `/set-feature` slash command (when `--claude`) |
| `~/.gemini/commands/token-tracker.toml` | Gemini `/token-tracker` custom command (when `--gemini`) |
| `~/.gemini/commands/set-feature.toml` | Gemini `/set-feature` custom command (when `--gemini`) |

On first run / install, if `~/.token-tracker/` is empty and legacy `~/.cursor/token-tracker/` has data, files are copied over (legacy folder is left in place).

Override paths with `TOKEN_TRACKER_HOME`, `TOKEN_TRACKER_CONFIG`, `TOKEN_TRACKER_HISTORY`, and `TOKEN_TRACKER_PRICES`. One book. Many hands. Still your disk.

## Repo layout

| Path | Role |
| --- | --- |
| `bin/token-tracker.js` | npx CLI (`install`, `save`, `set-context`, `set-feature`, `statusline`, `report`) |
| `scripts/` | Shared Node helpers (`pricing.js`, report, statusline, …) |
| `templates/` | Skill, slash-command, Gemini command, and default `prices.json` templates used by `install` |
| `.github/workflows/` | CI checks + npm publish on `v*` tags |
| `cursor/`, `claude/`, `gemini/`, `codex/`, `agents/`, `continue/` | Checked-in `SKILL.md` copies per host |
| `docs/screenshots/` | README terminal demos |
| `docs/logos/` | Florin brand marks + host badges |

## Publish (maintainers)

Releases publish to **npm** automatically when you push a version tag that matches `package.json`.

1. Bump `"version"` in `package.json` (and merge to `main`).
2. Add a repo secret **`NPM_TOKEN`** (npm access token with publish rights for `@mbrundige`).
3. Tag and push:

```bash
VERSION=$(node -p "require('./package.json').version")
git tag "v${VERSION}"
git push origin "v${VERSION}"
```

The [Publish npm](.github/workflows/publish-npm.yml) workflow then:

- checks that the tag (`v0.8.0`) matches `package.json`
- runs `node scripts/check.js`
- runs `npm publish --access public --provenance`
- creates a GitHub Release with generated notes

Manual publish still works if needed:

```bash
npm login
npm publish --access public
```

Then users can run:

```bash
npx @mbrundige/token-tracker install --all
```

---

## Garage of hosts (closing meditation)

Turn it up. Not ironically. Sincerely.

This is the brown-directory dream: not vinyl siding — a folder. Not a garage of crossovers — a garage of hosts writing one history. Walk the hallway. Touch the walls. The walls are files:

`config.json` · `history.jsonl` · `prices.json` · scripts under `cli/`

That is `~/.token-tracker/`. That is home. That is the mint.

Breathe in. Breathe out. Run `report`. Prefer that the numbers hurt a little. That means they are real.

---

## Contributors

- [Max Brundige](https://github.com/mbrundige): built the machine
- [Stephen Bowman](https://github.com/BowmanStephen): florin kit / unpaid mark service

## License

MIT

`flr · local`

**Give it up for Max.**

**Good night.**
