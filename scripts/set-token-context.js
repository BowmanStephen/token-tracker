#!/usr/bin/env node
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { paths } = require("./paths.js");

function configPath() {
  return paths().configPath;
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

  const prevProject = config.projects[workspace] || null;
  const prevFeature = config.features[workspace] || null;

  if (args.project) config.projects[workspace] = args.project;
  if (args.clearFeature) delete config.features[workspace];
  else if (args.feature) config.features[workspace] = args.feature;

  const nextProject = config.projects[workspace] || null;
  const nextFeature = config.features[workspace] || null;
  const switched = args.project || args.feature || args.clearFeature;
  const changed = prevProject !== nextProject || prevFeature !== nextFeature;

  // Reset feature-scoped token display on project/feature switch.
  if (switched && changed) {
    if (!config.token_baselines || typeof config.token_baselines !== "object") {
      config.token_baselines = {};
    }
    config.token_baselines[workspace] = {
      project: nextProject,
      feature: nextFeature,
      pending_reset: true,
    };
  }

  saveConfig(config);
  console.log(
    JSON.stringify({
      workspace,
      project: nextProject,
      feature: nextFeature,
      tokens_reset: Boolean(switched && changed),
    }),
  );
}

if (require.main === module) main();
