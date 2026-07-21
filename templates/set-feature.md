Set the token-tracker feature for the current workspace.

Any text after `/set-feature` is the feature name (for example `/set-feature checkout-v2`).

## Steps

1. Resolve the feature name:
   - Prefer the text the user typed after `/set-feature`.
   - If they said `clear`, `none`, or `off`, clear the feature instead.
   - If no name was given, ask once. Suggest the current git branch (`git branch --show-current`) as the default.
2. Run the matching command (use the workspace directory as `--workspace`):

Set:

```bash
node {{SKILL_BIN}}/set-token-context.js --workspace "$PWD" --feature "<name>"
```

Clear:

```bash
node {{SKILL_BIN}}/set-token-context.js --workspace "$PWD" --clear-feature
```

3. Show the JSON result to the user.
4. Tell them the status-line `toks` counter resets for this scope when the feature changes.
5. Do **not** run the full token report unless they also ask for it.
