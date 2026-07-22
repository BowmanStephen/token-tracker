# voice.md — token-tracker / Florin

Binding brand voice for README, docs, and in-product copy. Product name stays **token-tracker**. Lore unit is **florin** / ticker **flr**.

Mood: mint-honest craft, quiet awe, **deadpan**. Not SaaS marketing, not purple Renaissance AI, not crypto brochure, not a bit that explains itself.

---

## Core inspirations (brand values)

These are not costume. They are the voice’s spine.

| Source | Borrow | Never |
| --- | --- | --- |
| **Norm Macdonald** | Deadpan understatement. Say the true thing flat. Let the room do the laugh. Long setup only if the landing is quieter than expected. Honesty without sermon. | Telegraphed punchlines. Winking at the camera. “Get it?” energy. Warmth that turns into sales. |
| **Connor O’Malley** | Commit to the premise all the way. Escalation said like accounting. Uncomfortable truth delivered straight. Characters who believe the bit. | Quirk-for-quirk. Explaining the absurdity. Cringe as a brand strategy. Turning florin into a sketch. |
| **High-star CLIs** (ripgrep, fzf, bat, uv) | Short, concrete, install early, proof before persuasion. | Badge spam as personality. Feature poetry. |

**Brand value in one line:** Count what happened. Don’t sell a journey. If it’s funny, it’s because it’s true and you didn’t decorate it.

---

## Context

- **Brand / product:** token-tracker (package `@mbrundige/token-tracker`)
- **Lore name:** florin / `flr` (unit of account joke, not a token/coin product)
- **Category:** CLI / local developer tool
- **Audience:** people who burn AI tokens across Cursor, Claude Code, Gemini CLI, Codex, Continue, Agent Skills
- **Channels:** GitHub README, skill docs, CLI help, short statusline strings
- **Reading level:** about sixth grade for lore; plain technical English for commands and features
- **Content goal:** install fast, trust the ledger, skim the report
- **Risk:** distinctive (deadpan lore wink OK; costume drama / stand-up set not)

---

## Personality

A careful mint clerk who also ships CLI tools. Counts what you spent. Does not sell you a journey. Might mention Florence once, like it’s normal, then show the report.

| Attribute | Means | Never |
| --- | --- | --- |
| **Concrete** | Paths, hosts, flags, file names | Vague “visibility into your AI spend” |
| **Deadpan** | True flat statements; joke lands in the silence | Explaining the joke; emoji laugh tracks |
| **Dry-witty** | One short lore line, then back to work | Essay on Florence / banking dynasties |
| **Honest** | Local only, estimated cost, zero deps | Trust theater, “enterprise-grade” |
| **Quiet** | Short sentences, install early | Hype, exclamation marks, “we’re excited” |

### NN/g position

| Dimension | Lean |
| --- | --- |
| Funny ↔ Serious | **deadpan-funny** (Norm/Connor) — never clown-funny |
| Formal ↔ Casual | leaning-casual (CLI peer, not brochure) |
| Respectful ↔ Irreverent | leaning-respectful (ruthless about hype, kind to the reader) |
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
- Write florin lore as if the mint clerk believes it (O’Malley commit) and the punchline is quieter than the setup (Norm)
- Cut any line that exists only to sound clever

**Don't**

- Inflate florin symbolism (“trusted settlement,” “assay mark,” “indelible,” “testament”)
- Sound like SaaS (“unlock insights,” “powerful platform,” “seamless”)
- Sound like crypto (“on-chain,” “mint your,” “hodl,” 3D gold coin pitch)
- Sound like purple Renaissance AI (“reimagine,” “crafted for the modern alchemist”)
- Sound like a comedian doing a tech bit (“folks,” “anyway…,” rimshot rhythm)
- Name-drop Norm or Connor in the README (inspiration is for writers; product stays the product)
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

## README voice (high-star CLI + deadpan)

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

Structure models: [ripgrep](https://github.com/BurntSushi/ripgrep), [fzf](https://github.com/junegunn/fzf), [bat](https://github.com/sharkdp/bat), [uv](https://github.com/astral-sh/uv).  
Prose models: Norm Macdonald, Connor O’Malley (deadpan / committed premise).

---

## Sample lines

**Pitch**

> Local token usage tracking for Cursor, Claude Code, Gemini CLI, Codex, Continue, and Agent Skills hosts.

**Why (user questions)**

> Where did the tokens go? By `project/feature`, not only a session total.

**Florin (deadpan — Norm landing, O’Malley commit)**

> Florence’s gold florin (*fiorino d’oro*) was a unit of account. **token-tracker** borrows the name: tokens are the unit, `~/.token-tracker/` is the book, and the **F** is for *fiorino*. We don’t move your gold. We count what you already spent.

**Statusline wink**

> `flr · local` = florins, on this machine only.

**Anti-examples (never ship)**

> Florence’s gold florin was Europe’s trusted settlement coin — an assay mark that the count lives on *your* machine.

> Unlock powerful visibility across your entire AI spend landscape.

> And folks, that’s why we named it after a medieval coin (ba-dum-tss).

> Imagine if Norm Macdonald ran a SaaS launch.

---

## Lexicon

**Preferred:** ledger, history, snapshot, feature, host, estimated cost, zero deps, local, `~/.token-tracker/`

**Banned:** trusted settlement, assay mark, pivotal, seamless, unlock, empower, journey, tapestry, cutting-edge, enterprise-grade, on-chain, reinvent, “folks,” “game-changer,” “let that sink in”

**Person:** second person (“you”) for instructions; no corporate “we deliver”

**Contractions:** yes in lore/prose; keep command blocks literal

**Emoji:** none in README headings or feature bullets

**Comedy mechanic:** understatement > punchline. If you must cut a joke or a fact, cut the joke.

---

## Channel notes

| Channel | Tone |
| --- | --- |
| README hero → Features | Product-first, short, proof early; one deadpan florin line max |
| Requirements and below | Technical reference (keep Max’s accuracy; no lore fluff) |
| Skill / slash help | Imperative, one job per command |
| Statusline | Tiny: `toks`, `$`, optional `flr · local` |
| Social / launch blurbs | Still deadpan; never “we’re thrilled to announce” |

---

## Writer’s test

Before shipping a line, ask:

1. Would Norm say this flatter?
2. Would O’Malley commit harder and stop explaining?
3. Would ripgrep delete the sentence?

If yes to any, edit.
