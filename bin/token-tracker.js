#!/usr/bin/env node
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(os.homedir(), ".cursor", "token-tracker");
const DEFAULT_CONFIG = {
  default_project: null,
  default_feature: null,
  projects: {},
  features: {},
  statusline: {
    enabled: true,
    show_label: true,
    show_project: true,
    show_feature: true,
    show_model: true,
    show_context: true,
    show_tokens: true,
    show_cost: false,
  },
};

function usage() {
  console.log(`Usage:
  npx @mbrundige/token-tracker install [--cursor] [--claude] [--statusline|--no-statusline]
  npx @mbrundige/token-tracker save --summary "..." [--project NAME] [--feature NAME]
  npx @mbrundige/token-tracker set-context --project NAME --feature NAME [--workspace PATH]
  npx @mbrundige/token-tracker statusline   # reads status JSON from stdin

Defaults for install: --cursor and --statusline
`);
}

function ensureConfig() {
  const configPath = path.join(DATA_DIR, "config.json");
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, `${JSON.stringify(DEFAULT_CONFIG, null, 2)}\n`, "utf8");
    return { created: true, configPath };
  }
  return { created: false, configPath };
}

function installSkill(target, skillSource) {
  const dest = path.join(os.homedir(), target, "token-tracker");
  const scriptsDest = path.join(dest, "scripts");
  fs.mkdirSync(dest, { recursive: true });
  fs.copyFileSync(path.join(ROOT, skillSource, "SKILL.md"), path.join(dest, "SKILL.md"));
  fs.rmSync(scriptsDest, { recursive: true, force: true });
  fs.mkdirSync(scriptsDest, { recursive: true });
  for (const file of ["save-token-usage.js", "set-token-context.js", "statusline-token-usage.js"]) {
    const to = path.join(scriptsDest, file);
    fs.copyFileSync(path.join(ROOT, "scripts", file), to);
    fs.chmodSync(to, 0o755);
  }
  return dest;
}

function patchCliStatusLine(scriptPath) {
  const cliConfig = path.join(os.homedir(), ".cursor", "cli-config.json");
  if (!fs.existsSync(cliConfig)) {
    console.log(`Skipped statusLine: ${cliConfig} not found`);
    return false;
  }
  const config = JSON.parse(fs.readFileSync(cliConfig, "utf8"));
  config.statusLine = {
    type: "command",
    command: scriptPath,
    padding: 2,
    timeoutMs: 1000,
  };
  fs.writeFileSync(cliConfig, `${JSON.stringify(config, null, 2)}\n`, "utf8");
  return true;
}

function install(argv) {
  const hasCursor = argv.includes("--cursor");
  const hasClaude = argv.includes("--claude");
  const noStatusline = argv.includes("--no-statusline");
  const forceStatusline = argv.includes("--statusline");
  const wantsStatusline = forceStatusline || (!noStatusline && (hasCursor || (!hasCursor && !hasClaude)));

  const targets = [];
  if (hasCursor || (!hasCursor && !hasClaude)) targets.push([".cursor/skills", "cursor"]);
  if (hasClaude) targets.push([".claude/skills", "claude"]);

  const installed = targets.map(([dir, src]) => installSkill(dir, src));
  const { created, configPath } = ensureConfig();

  let statuslinePath = null;
  const cursorInstall = installed.find((p) => p.includes(`${path.sep}.cursor${path.sep}`));
  if (wantsStatusline && cursorInstall) {
    statuslinePath = path.join(cursorInstall, "scripts", "statusline-token-usage.js");
    patchCliStatusLine(statuslinePath);
  }

  console.log(
    JSON.stringify(
      {
        installed,
        config: configPath,
        config_created: created,
        statusline: statuslinePath,
        note: statuslinePath ? "Restart Cursor CLI to pick up statusLine changes." : undefined,
      },
      null,
      2,
    ),
  );
}

function delegate(scriptName, argv) {
  const script = path.join(ROOT, "scripts", scriptName);
  const result = spawnSync(process.execPath, [script, ...argv], { stdio: "inherit" });
  process.exit(result.status == null ? 1 : result.status);
}

function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  if (!cmd || cmd === "-h" || cmd === "--help") {
    usage();
    return;
  }
  if (cmd === "install") return install(rest);
  if (cmd === "save") return delegate("save-token-usage.js", rest);
  if (cmd === "set-context") return delegate("set-token-context.js", rest);
  if (cmd === "statusline") return delegate("statusline-token-usage.js", rest);
  console.error(`token-tracker: unknown command: ${cmd}`);
  usage();
  process.exit(2);
}

main();
