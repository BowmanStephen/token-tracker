<p align="center">
  <img src="docs/logos/token-tracker.png" alt="florin — the shirt, the mark, the mural" width="900" />
</p>

<p align="center">
  <em>token-tracker</em><br />
  <strong>Florin Keynote Address &amp; Local Ledger Product Demo</strong><br />
  <sub>no angels · no 5G · no dirty box · just the book</sub>
</p>

---

Hi. Wow. Yes. Thank you so much for opening this README. Oh my God. Yes!

I’m not getting paid by Florence. I’m not getting paid by npm. I’m not getting paid by Toyota, T-Mobile, Verizon, or anybody’s angel wing. I’m doing this in **loving service of the florin** — the little **F** in the giant’s hand up there — because I think we’re lucky to even have a mark this good. Somebody laughed when I said we should put a medieval settlement coin on a Node CLI. Coworkers laughed. They said you will never ship that. What gets them wrong. I shipped the shirt first. Then the mural. Then the path. Then I thanked the mark out loud in an empty garage like it could hear me. Heartfelt. Unpaid. Correct.

This is a **100% heartfelt** thank you to Max Brundige for building the machine, and to every host that writes the same history like a family that shares one checkbook.

We got so much to talk about. We got so much to get to. Put your hands together for the local ledger.

---

## What it is (before I digress into the RAV4 of it all)

**token-tracker** is local token usage tracking for Cursor, Claude Code, Gemini CLI, Codex, Continue, and other Agent Skills hosts.

Snapshot spend by project and feature. Keep a GitHub-style heat map. Optionally show a live Cursor CLI status line with `toks` and estimated `$`.

No npm dependencies. Shared data lives in `~/.token-tracker/`. Every host writes the **same** history. That’s USB connectivity galore, spiritually. That’s five people or thirty infants of agent hosts charging off one port. I’m not getting a dime from Toyota. I just love this vehicle. Look at the cup holders of this API surface. Look at the seating. Look at the unpaid specs of a home directory that actually works.

<p align="center">
  <img src="docs/logos/cursor.png" alt="Cursor" height="36" />
  <img src="docs/logos/claude.png" alt="Claude Code" height="36" />
  <img src="docs/logos/gemini.png" alt="Gemini CLI" height="36" />
  <img src="docs/logos/codex.png" alt="Codex CLI" height="36" />
  <img src="docs/logos/continue.png" alt="Continue" height="36" />
  <img src="docs/logos/agents.png" alt="Agent Skills" height="36" />
</p>

<p align="center">
  <img src="docs/screenshots/report.png" alt="token-tracker report with feature breakdown, estimated cost, and heat map" width="720" />
</p>

<p align="center">
  <img src="docs/screenshots/statusline.png" alt="token-tracker Cursor CLI status line with estimated cost" width="720" />
</p>

Look at that report. Look at that status line. Everyone experiencing… not “social cohesion.” Just numbers. On your machine. Yes! Wow!

---

## Why (the part where I ask if you like to laugh, but about receipts)

Do you like to laugh? Great. Wrong README. Do you like **receipts**?

AI sessions burn tokens across threads, models, and side quests. You close the laptop and the money already left. The future is uncertain. All we have can be lost.

But it doesn’t have to be *mysterious*.

token-tracker answers:

- **Where did the tokens go?** Breakdown by `project/feature`, not only a session total
- **What does this week look like?** Daily heat map (same shape as a GitHub contribution graph)
- **What am I burning right now?** Optional Cursor CLI `statusLine` with feature-scoped `toks` and estimated `$` cost

Switching project or feature resets the status-line counter for that scope, so each label tracks usage from that point forward. That’s not a bug. That’s fatherhood. You take the scope seriously.

### Outdoor yells (token burn edition)

I used to yell outdoors about nothing. Now I yell outdoors about **token burn**. Quiet suburb. All-brown-house energy. Neighbor thinks I’m mad. I’m not mad. I’m counting. “WHERE DID THE TOKS GO.” Then I go inside and run `report`. That’s the whole bit. Volume outside. Ledger inside.

### Why florin (hometown brand history — Des Plaines energy, Italy edition)

I am from… spiritually… Des Plaines energy. McDonald’s museum across from the real one energy. Brand history as identity. Florence minted the gold florin (*fiorino d’oro*). It was a **unit of account**. Merchants settled in it. They kept books. They did not need a Kinetic Emotional Neural Network powered by 5G for 100% accurate comedy. Powered by 5G is the enemy. We are local anti-KENN. Freshwater navy for your disk. We protect the Lake Michigan of `~/.token-tracker/` from cloud harvest theater. No dirty box. No phone-slurp. No angel wings in the audience waiting for dessert.

**token-tracker** borrows the name:

- tokens are the unit
- `~/.token-tracker/` is the book
- the **F** is for *fiorino*
- the blue chip is just the chip — assay if you want, USB glow if you’re honest

We don’t move your gold. We don’t pull your texts. We don’t harvest the room. We count what you already spent.

I love this coin. I love this mural. I love this ASCII disc. I’m not getting paid by the mint. Loving service. Five hundred cigarettes for 5G energy — applied to an **F**. Heartfelt thank you to the mark. Coworkers laughed. I shipped it anyway.

<p align="center">
  <img src="docs/logos/florin-coin.png" alt="Engraved florin F-coin — the polo shirt of the soul" width="200" />
  &nbsp;&nbsp;
  <img src="docs/logos/florin-ascii.png" alt="ASCII florin disc — CustomInk before the product was real" width="200" />
</p>

If you walk away tonight and only one word comes up when you close your eyes and think of this repo — if only one concept — that word is **ledger**. Technically I am a veteran of reading `history.jsonl`.

---

## Features (the nuts and bolts — we are at a precipice of… installing)

- **One-command install** into Cursor, Claude Code, Gemini CLI, Codex, Continue, and `~/.agents/skills`
- **Shared history** across hosts (one JSONL ledger under `~/.token-tracker/`)
- **`/token-tracker` skill**: run the report (and optionally save a snapshot) from chat
- **`/set-feature` slash command**: label the current workspace feature from chat (Cursor, Claude, Gemini)
- **Gemini custom commands**: `/token-tracker` and `/set-feature` under `~/.gemini/commands/`
- **Feature-scoped status line**: project, feature, model, context bar, token count, estimated cost
- **Estimated cost per feature**: from `prices.json` rates × prompt/completion deltas (epoch-aware)
- **Epoch-aware totals**: feature resets do not double-count growing snapshots
- **Zero runtime deps**: plain Node.js 22+ scripts

Zero runtime deps. Say it with me. Zero. Runtime. Deps. That’s MSRP honesty. That’s 22 city / 29 highway of dependency graph. Under a different package manager it might look different. Let’s not get political.

### Dr Pepper sciences (Node 22+ edition)

I studied the sciences. The **Node 22+ sciences**. Not the soft drink. Not the precipice. Just the runtime that can run these scripts without a carnival of `node_modules`. You open the hood and it’s scripts. Damn. That’s beautiful. Like looking at a RAV4 engine bay and crying a little because the cup holders were honest.

---

## Quick install (cash infusion not required — although dessert is nice)

Invest in me. Become family. Angel investors in the room — raise your wings — wait. No. Invert. We don’t need the cash infusion. Cash infusion is like dessert after a meal we already cooked in `~/.token-tracker/`. Nice if it shows up. Not the point. The book is free. The path is free. Shark Tank can wait in the hallway.

Install everywhere you use agent skills:

```bash
npx @mbrundige/token-tracker install --all
```

Or pick hosts (angel wings optional; we don’t need them; we’re fine; it’s like candy after a meal):

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

**After install** (read the room, pull yourself back):

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

I love `~/.local/bin`. I love a PATH that works. Grind set mentality.

---

## Requirements

- Node.js **22+**
- At least one supported host with personal/user skills enabled
- Optional: `git` (falls back to the current branch as the feature name)

That’s it. No 5G. No dirty box. No certified AI experts by the time you leave. Just Node and a host. You’re gonna be able to see your tokens better. You’re gonna be able to open chat rooms… I mean agent chats… with receipts. You’re gonna be able to send… okay I’m stopping. Florin is not God. Florin is a unit. Man created a ledger. The ledger is quiet.

---

## Label a project and feature (invest in the person — Lori would ask)

Lori from Shark Tank would ask: who are you. I’m the mint clerk. Invest in the person — then derail into the path. The product is the book. The person is whoever runs `set-context` like they mean it.

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

`tokens_reset: true` means the status-line counter will start at `0` for the new scope. New picnic. New fruit snacks. New epoch. Don’t become The Punisher about it unless you want to.

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

The RAV4 unpaid specs digression, for the record: starting “MSRP” of this whole garage is free. Seating: every host you install. USB connectivity: galore. Estimated resale: your sanity, still local, still not powered by 5G. Heck of a vehicle.

---

## Report (put your hands together for the heat map)

```bash
npx @mbrundige/token-tracker report
```

Shows usage by feature (token bar chart + estimated cost) and a daily heat map.

In chat, invoke the skill:

| Host | How |
| --- | --- |
| Cursor / Claude Code / Continue | `/token-tracker` (skill); Cursor/Claude also get `/set-feature` |
| Gemini CLI | `/token-tracker` and `/set-feature` custom commands (or skill activation) |
| Codex CLI | `$token-tracker` or skills UI |

History file (shared by all hosts — one book, many cambiators):

```text
~/.token-tracker/history.jsonl
```

That path is the RAV4. That path is the polo. That path is the freshwater ledger protecting the Lake Michigan of your disk. Starting “MSRP”: free. Total in-person seating: every agent host you install. USB connectivity: galore. Estimated resale value: your sanity.

Yes. Wow. Look at the heat map. Then go make a sandwich.

---

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

You can also pass a full JSON object with `--json '...'` or on stdin. Snapshots store summaries and counts — not prompts or transcripts. We omit the episodes where your private life would be funny. Context stays yours.

**Underscore aliases**: For convenience, token flags accept both kebab-case (`--prompt-tokens`) and underscore (`--prompt_tokens`) forms. The same applies to `--total-tokens`, `--completion-tokens`, and `--metadata-json`. Peanut butter and jelly. Spaghetti and meatballs. Predictive text for flags.

---

## Status line (live, local, not mind-reading)

Cursor CLI can show a live line like:

```text
token-tracker | token-tracker/readme-demos | GPT-5.5 | ctx [###.......] 27% | toks 7.1k | $0.0534
```

Optional wink: `flr · local` = florins, on this machine only. Not 5G. Not harvested. Local. Anti-KENN in under a second. You’re welcome.

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

Model keys are case-insensitive **substrings** of the model display name; the longest match wins. These are API list-price estimates — Cursor/Claude subscriptions may bill differently, so edit the file to match your reality. The memes will lie to you about prices. Edit the file.

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

- `cost_delta_usd` — cost of that snapshot's token growth at **then-current** rates
- `estimated_cost_usd` — cumulative locked cost for the feature epoch

The report **prefers these locked deltas**, so historical feature cost does not drift when prices refresh. Unpriced older rows still fall back to live re-pricing. The status line shows locked history for the feature plus a live tip for tokens beyond the last snapshot (priced at current rates).

Set `"show_cost": false` to hide cost on the status line. The report still prints a cost column whenever prices are available.

Test it manually:

```bash
printf '%s' '{"session_id":"demo","cwd":"'"$PWD"'","workspace":{"current_dir":"'"$PWD"'"},"model":{"display_name":"GPT-5.5"},"context_window":{"total_input_tokens":18420,"total_output_tokens":4680,"used_percentage":27}}' \
  | npx @mbrundige/token-tracker statusline
```

---

## CLI reference (the whole buffet)

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

---

## Manual install (from a clone)

```bash
node bin/token-tracker.js install --all
# or
npm pack
npx ./mbrundige-token-tracker-*.tgz install --gemini --codex
```

---

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

```bash
node scripts/check.js
```

Be like a rock. Run the check. Shit works or it doesn’t. Prefer works.

---

## Data layout (garage full of paths)

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

Override paths with `TOKEN_TRACKER_HOME`, `TOKEN_TRACKER_CONFIG`, `TOKEN_TRACKER_HISTORY`, and `TOKEN_TRACKER_PRICES`.

---

## Repo layout

| Path | Role |
| --- | --- |
| `bin/token-tracker.js` | npx CLI (`install`, `save`, `set-context`, `set-feature`, `statusline`, `report`) |
| `scripts/` | Shared Node helpers (`pricing.js`, report, statusline, …) |
| `templates/` | Skill, slash-command, Gemini command, and default `prices.json` templates used by `install` |
| `.github/workflows/` | CI checks + npm publish on `v*` tags |
| `cursor/`, `claude/`, `gemini/`, `codex/`, `agents/`, `continue/` | Checked-in `SKILL.md` copies per host |
| `docs/screenshots/` | README terminal demos |
| `docs/logos/` | Florin brand marks + host badges — **the shirt** |
| `voice.md` | Brand voice (Norm flat · Conner love · high-star CLI structure) |
| `README.quiet.md` | The quiet twin, if you need Norm without the keynote |

---

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

## Classic-rock guided closing meditation (optional)

Breathe in. Breathe out. Like a rock. Classic rock. Standing on a mountain of `history.jsonl` with the wind of zero runtime deps in your hair.

Picture a quiet folder: `~/.token-tracker/`.  
A garage with one book, not seven RAV4s — though God I love the RAV4.  
A status line that tells the truth in under a second.  
A mural where the coin is the logo and nobody needs a cash infusion, although dessert is nice.  
An all-brown house of a home directory. Quiet landing. Loud love.

You must never stop counting what you spent.  
No matter how badly the side quests beg you to look away.  
No matter how loud the 5G prophets get in the parking lot.  
In the end it’s worth it to live… epic? Nah.  
In the end it’s worth it to live **local**.

`flr · local`

The check passed. Good night.

---

## Contributors

- [Max Brundige](https://github.com/mbrundige) — built the machine
- [Stephen Bowman](https://github.com/BowmanStephen) — loving service of the florin

## License

MIT

Thank you so much for coming out to the README. Good night.
