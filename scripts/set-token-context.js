#!/usr/bin/env node
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");

function configPath() {
  if (process.env.TOKEN_TRACKER_CONFIG) {
    const p = process.env.TOKEN_TRACKER_CONFIG;
    return p.startsWith("~/") ? path.join(os.homedir(), p.slice(2)) : p;
  }
  return path.join(os.homedir(), ".cursor", "token-tracker", "config.json");
}

function loadConfig() {
  const file = configPath();
  if (!fs.existsSync(file)) {
    return { default_project: null, default_feature: null, projects: {}, features: {} };
  }
  const payload = JSON.parse(fs.readFileSync(file, "utf8"));
  return payload && typeof payload === "object" && !Array.isArray(payload) ? payload : {};
}

function saveConfig(config) {
  const file = configPath();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(config, null, 2)}\n`, "utf8");
}

function parseArgs(argv) {
  const args = {
    workspace: process.cwd(),
    project: null,
    feature: null,
    clearFeature: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    const next = () => {
      i += 1;
      return argv[i];
    };
    if (a === "--workspace") args.workspace = next();
    else if (a === "--project") args.project = next();
    else if (a === "--feature") args.feature = next();
    else if (a === "--clear-feature") args.clearFeature = true;
    else {
      console.error(`token-tracker: unknown argument: ${a}`);
      process.exit(2);
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const workspace = path.resolve(
    String(args.workspace).startsWith("~/")
      ? path.join(os.homedir(), String(args.workspace).slice(2))
      : args.workspace,
  );
  const config = loadConfig();
  if (config.default_project === undefined) config.default_project = null;
  if (config.default_feature === undefined) config.default_feature = null;
  if (!config.projects || typeof config.projects !== "object") config.projects = {};
  if (!config.features || typeof config.features !== "object") config.features = {};

  if (args.project) config.projects[workspace] = args.project;
  if (args.clearFeature) delete config.features[workspace];
  else if (args.feature) config.features[workspace] = args.feature;

  saveConfig(config);
  console.log(
    JSON.stringify({
      workspace,
      project: config.projects[workspace] || null,
      feature: config.features[workspace] || null,
    }),
  );
}

if (require.main === module) main();
