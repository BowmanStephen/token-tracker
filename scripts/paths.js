#!/usr/bin/env node
"use strict";

/**
 * Agent-neutral data home for token-tracker.
 *
 * Primary:  ~/.token-tracker/
 * Legacy:   ~/.cursor/token-tracker/  (migrated once on first use)
 *
 * Override the whole tree with TOKEN_TRACKER_HOME, or individual files with
 * TOKEN_TRACKER_CONFIG / TOKEN_TRACKER_HISTORY / TOKEN_TRACKER_PRICES.
 */

const fs = require("fs");
const os = require("os");
const path = require("path");

const LEGACY_DATA_DIR = path.join(os.homedir(), ".cursor", "token-tracker");
const DATA_FILES = ["config.json", "history.jsonl", "prices.json"];

function expand(p) {
  if (!p) return p;
  if (p.startsWith("~/")) return path.join(os.homedir(), p.slice(2));
  return p;
}

function resolveDataDir() {
  if (process.env.TOKEN_TRACKER_HOME) return expand(process.env.TOKEN_TRACKER_HOME);
  return path.join(os.homedir(), ".token-tracker");
}

function legacyDataDir() {
  return LEGACY_DATA_DIR;
}

function hasAnyData(dir) {
  if (!dir || !fs.existsSync(dir)) return false;
  return DATA_FILES.some((name) => fs.existsSync(path.join(dir, name)));
}

/**
 * One-time copy from ~/.cursor/token-tracker -> ~/.token-tracker when the new
 * home is empty and legacy data exists. Never deletes the legacy folder.
 */
function migrateLegacyDataDir(dataDir = resolveDataDir()) {
  const legacy = LEGACY_DATA_DIR;
  if (dataDir === legacy) {
    return { migrated: false, reason: "same_dir", dataDir, legacy };
  }
  if (hasAnyData(dataDir)) {
    return { migrated: false, reason: "destination_exists", dataDir, legacy };
  }
  if (!hasAnyData(legacy)) {
    return { migrated: false, reason: "no_legacy", dataDir, legacy };
  }

  fs.mkdirSync(dataDir, { recursive: true });
  const copied = [];
  for (const name of DATA_FILES) {
    const from = path.join(legacy, name);
    const to = path.join(dataDir, name);
    if (!fs.existsSync(from) || fs.existsSync(to)) continue;
    fs.copyFileSync(from, to);
    copied.push(name);
  }
  // Marker so users can see migration happened.
  try {
    fs.writeFileSync(
      path.join(dataDir, "MIGRATED_FROM_CURSOR"),
      `Copied from ${legacy} at ${new Date().toISOString()}\nFiles: ${copied.join(", ") || "(none)"}\n`,
      "utf8",
    );
  } catch {
    // ignore
  }
  return { migrated: true, reason: "copied", dataDir, legacy, copied };
}

function ensureDataDir(dataDir = resolveDataDir()) {
  const migration = migrateLegacyDataDir(dataDir);
  fs.mkdirSync(dataDir, { recursive: true });
  return { dataDir, migration };
}

function resolvePath(envKey, fileName, dataDir = resolveDataDir()) {
  if (process.env[envKey]) return expand(process.env[envKey]);
  return path.join(dataDir, fileName);
}

function paths(dataDir = resolveDataDir()) {
  ensureDataDir(dataDir);
  return {
    dataDir,
    legacyDataDir: LEGACY_DATA_DIR,
    configPath: resolvePath("TOKEN_TRACKER_CONFIG", "config.json", dataDir),
    historyPath: resolvePath("TOKEN_TRACKER_HISTORY", "history.jsonl", dataDir),
    pricesPath: resolvePath("TOKEN_TRACKER_PRICES", "prices.json", dataDir),
  };
}

module.exports = {
  LEGACY_DATA_DIR,
  DATA_FILES,
  expand,
  resolveDataDir,
  legacyDataDir,
  hasAnyData,
  migrateLegacyDataDir,
  ensureDataDir,
  resolvePath,
  paths,
};
