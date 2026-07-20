#!/usr/bin/env node
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");

const DEFAULT_HISTORY = path.join(os.homedir(), ".cursor", "token-tracker", "history.jsonl");
const INT_FIELDS = ["prompt_tokens", "completion_tokens", "total_tokens"];

function fail(message) {
  console.error(`token-tracker: ${message}`);
  process.exit(2);
}

function expandHome(p) {
  if (!p) return p;
  if (p.startsWith("~/")) return path.join(os.homedir(), p.slice(2));
  return p;
}

function parseArgs(argv) {
  const args = {
    json: null,
    history: process.env.TOKEN_TRACKER_HISTORY || null,
    project: null,
    feature: null,
    summary: null,
    model: null,
    source: "manual",
    prompt_tokens: null,
    completion_tokens: null,
    total_tokens: null,
    metadata_json: null,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    const next = () => {
      i += 1;
      return argv[i];
    };
    if (a === "--json") args.json = next();
    else if (a === "--history") args.history = next();
    else if (a === "--project") args.project = next();
    else if (a === "--feature") args.feature = next();
    else if (a === "--summary") args.summary = next();
    else if (a === "--model") args.model = next();
    else if (a === "--source") args.source = next();
    else if (a === "--prompt-tokens") args.prompt_tokens = Number(next());
    else if (a === "--completion-tokens") args.completion_tokens = Number(next());
    else if (a === "--total-tokens") args.total_tokens = Number(next());
    else if (a === "--metadata-json") args.metadata_json = next();
    else fail(`unknown argument: ${a}`);
  }
  return args;
}

function readStdinSync() {
  try {
    return fs.readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

function loadPayload(args) {
  let raw = args.json;
  if (raw == null && !process.stdin.isTTY) {
    raw = readStdinSync();
  }
  if (raw) {
    let payload;
    try {
      payload = JSON.parse(raw);
    } catch (err) {
      fail(`invalid JSON payload: ${err.message}`);
    }
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      fail("JSON payload must be an object");
    }
    return payload;
  }

  const payload = {
    project: args.project,
    feature: args.feature,
    summary: args.summary,
    model: args.model,
    source: args.source,
  };
  for (const field of INT_FIELDS) {
    if (args[field] != null && !Number.isNaN(args[field])) payload[field] = args[field];
  }
  if (args.metadata_json) {
    let metadata;
    try {
      metadata = JSON.parse(args.metadata_json);
    } catch (err) {
      fail(`invalid metadata JSON: ${err.message}`);
    }
    if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
      fail("metadata must be a JSON object");
    }
    payload.metadata = metadata;
  }
  return Object.fromEntries(Object.entries(payload).filter(([, v]) => v != null));
}

function cleanSnapshot(payload) {
  const summary = String(payload.summary || "").trim();
  if (!summary) fail("summary is required");

  const snapshot = {
    timestamp: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
    project: String(payload.project || path.basename(process.cwd())),
    source: String(payload.source || "manual"),
    summary,
  };
  if (payload.model) snapshot.model = String(payload.model);
  if (payload.feature) snapshot.feature = String(payload.feature);

  for (const field of INT_FIELDS) {
    if (payload[field] == null) continue;
    const parsed = Number(payload[field]);
    if (!Number.isInteger(parsed)) fail(`${field} must be an integer`);
    if (parsed < 0) fail(`${field} must be non-negative`);
    snapshot[field] = parsed;
  }

  if (snapshot.total_tokens == null) {
    if (Number.isInteger(snapshot.prompt_tokens) && Number.isInteger(snapshot.completion_tokens)) {
      snapshot.total_tokens = snapshot.prompt_tokens + snapshot.completion_tokens;
    }
  }

  if (payload.metadata != null) {
    if (typeof payload.metadata !== "object" || Array.isArray(payload.metadata)) {
      fail("metadata must be an object");
    }
    snapshot.metadata = payload.metadata;
  }
  return snapshot;
}

function appendSnapshot(snapshot, historyPath) {
  fs.mkdirSync(path.dirname(historyPath), { recursive: true });
  fs.appendFileSync(historyPath, `${JSON.stringify(snapshot)}\n`, "utf8");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const payload = loadPayload(args);
  const snapshot = cleanSnapshot(payload);
  const historyPath = expandHome(args.history) || DEFAULT_HISTORY;
  appendSnapshot(snapshot, historyPath);
  console.log(JSON.stringify({ saved: historyPath, snapshot }));
}

if (require.main === module) main();

module.exports = { cleanSnapshot, loadPayload, parseArgs };
