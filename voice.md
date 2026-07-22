# voice.md — token-tracker / Florin

Binding brand voice for README, docs, and in-product copy. Product name stays **token-tracker**. Lore unit is **florin** / ticker **flr**.

Mood: mint-honest craft, quiet awe. Not SaaS marketing, not purple Renaissance AI, not crypto brochure.

---

## Context

- **Brand / product:** token-tracker (package `@mbrundige/token-tracker`)
- **Lore name:** florin / `flr` (unit of account joke, not a token/coin product)
- **Category:** CLI / local developer tool
- **Audience:** people who burn AI tokens across Cursor, Claude Code, Gemini CLI, Codex, Continue, Agent Skills
- **Channels:** GitHub README, skill docs, CLI help, short statusline strings
- **Reading level:** about sixth grade for lore; plain technical English for commands and features
- **Content goal:** install fast, trust the ledger, skim the report
- **Risk:** moderately distinctive (dry lore wink OK; costume drama not)

---

## Personality

A careful mint clerk who also ships CLI tools. Counts what you spent. Does not sell you a journey.

| Attribute | Means | Never |
| --- | --- | --- |
| **Concrete** | Paths, hosts, flags, file names | Vague “visibility into your AI spend” |
| **Dry-witty** | One short lore line, then back to work | Essay on Florence / banking dynasties |
| **Honest** | Local only, estimated cost, zero deps | Trust theater, “enterprise-grade” |
| **Quiet** | Short sentences, install early | Hype, exclamation marks, emoji |

### NN/g position

| Dimension | Lean |
| --- | --- |
| Funny ↔ Serious | leaning-serious (wink allowed, joke not the product) |
| Formal ↔ Casual | leaning-casual (CLI peer, not brochure) |
| Respectful ↔ Irreverent | leaning-respectful |
| Enthusiastic ↔ Matter-of-fact | **matter-of-fact** |

---

## Do / Don't

**Do**

- Lead with what it is in one sentence
- Put proof (screenshots) before persuasion
- Ask Why bullets as real user questions
- Name hosts, paths, and flags exactly
- Keep florin lore to one short paragraph max on the README
- Prefer `is` / `has` / `runs` over “serves as” / “stands as”
- Match high-star CLI READMEs: ripgrep, fzf, bat, uv (short, concrete, install soon)

**Don't**

- Inflate florin symbolism (“trusted settlement,” “assay mark,” “indelible,” “testament”)
- Sound like SaaS (“unlock insights,” “powerful platform,” “seamless”)
- Sound like crypto (“on-chain,” “mint your,” “hodl,” 3D gold coin pitch)
- Sound like purple Renaissance AI (“reimagine,” “crafted for the modern alchemist”)
- Stack short dramatic fragments for fake punch
- Use em dashes as style flourishes
- Bold every noun in a list header

---

## Naming rules

| Name | Use for | Don't |
| --- | --- | --- |
| **token-tracker** | Product, package, CLI, skill, install commands | Rename the product “Florin” |
| **florin** / **flr** | Lore unit, mural caption, statusline wink (`flr · local`) | Present florin as a cryptocurrency or paid tier |
| **F** / F-coin | Lettermark / icon (from *fiorino*) | Explain the whole Medici era in the README |
| **ledger** / **history** / `~/.token-tracker/` | Where counts live | “cloud sync,” “workspace of record” |

Product first in docs. Lore is optional garnish after the product pitch.

---

## README voice (high-star CLI)

Order for the top of the README:

1. Hero mural (width 900)
2. Product name
3. One clear sentence: what it is
4. Host badges
5. Zero-deps + shared home path
6. Proof shots (report, statusline)
7. Why (user questions + optional short florin line)
8. Features
9. Quick install (still early; do not bury under essays)

Voice models: [ripgrep](https://github.com/BurntSushi/ripgrep), [fzf](https://github.com/junegunn/fzf), [bat](https://github.com/sharkdp/bat), [uv](https://github.com/astral-sh/uv).

---

## Sample lines

**Pitch**

> Local token usage tracking for Cursor, Claude Code, Gemini CLI, Codex, Continue, and Agent Skills hosts.

**Why (user questions)**

> Where did the tokens go? By `project/feature`, not only a session total.

**Florin (dry)**

> Florence’s gold florin was a unit of account. token-tracker borrows the name: tokens are the unit, `~/.token-tracker/` is the book. We don’t move your gold. We count what you already spent.

**Statusline wink**

> `flr · local` = florins, on this machine only.

**Anti-examples (never ship)**

> Florence’s gold florin was Europe’s trusted settlement coin — an assay mark that the count lives on *your* machine.

> Unlock powerful visibility across your entire AI spend landscape.

---

## Lexicon

**Preferred:** ledger, history, snapshot, feature, host, estimated cost, zero deps, local, `~/.token-tracker/`

**Banned:** trusted settlement, assay mark, pivotal, seamless, unlock, empower, journey, tapestry, cutting-edge, enterprise-grade, on-chain, reinvent

**Person:** second person (“you”) for instructions; no corporate “we deliver”

**Contractions:** yes in lore/prose; keep command blocks literal

**Emoji:** none in README headings or feature bullets

---

## Channel notes

| Channel | Tone |
| --- | --- |
| README hero → Features | Product-first, short, proof early |
| Requirements and below | Technical reference (keep Max’s accuracy; no lore fluff) |
| Skill / slash help | Imperative, one job per command |
| Statusline | Tiny: `toks`, `$`, optional `flr · local` |
