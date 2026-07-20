#!/usr/bin/env node
"use strict";

const assert = require("assert");
const { cleanSnapshot } = require("./save-token-usage.js");

const snap = cleanSnapshot({
  summary: "check",
  project: "token-tracker",
  prompt_tokens: 10,
  completion_tokens: 5,
});
assert.strictEqual(snap.total_tokens, 15);
assert.strictEqual(snap.source, "manual");
console.log("ok");
