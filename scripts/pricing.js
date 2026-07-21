#!/usr/bin/env node
"use strict";

/**
 * Shared pricing helpers for status line + report.
 *
 * prices.json shape:
 * {
 *   "updated_at": "ISO-8601",
 *   "default": { "input_per_million_usd": 2.5, "output_per_million_usd": 15 },
 *   "models": {
 *     "gpt-5.5": { "input_per_million_usd": 5, "output_per_million_usd": 30 }
 *   }
 * }
 *
 * Snapshots may lock costs at save time:
 *   cost_delta_usd — price of this snapshot's token growth (epoch-aware)
 *   estimated_cost_usd — cumulative locked cost through this snapshot in the current epoch
 */

const fs = require("fs");

function parseRates(rates) {
  if (!rates || typeof rates !== "object") return null;
  const input = Number(rates.input_per_million_usd);
  const output = Number(rates.output_per_million_usd);
  if (!Number.isFinite(input) || !Number.isFinite(output) || input < 0 || output < 0) return null;
  return { input, output };
}

function loadPrices(filePath) {
  if (!filePath || !fs.existsSync(filePath)) return {};
  try {
    const payload = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return payload && typeof payload === "object" && !Array.isArray(payload) ? payload : {};
  } catch {
    return {};
  }
}

function pricesUpdatedAtMs(pricesOrPath) {
  let prices = pricesOrPath;
  if (typeof pricesOrPath === "string") prices = loadPrices(pricesOrPath);
  const raw = prices && prices.updated_at;
  if (!raw) {
    // Fall back to file mtime when path was passed.
    if (typeof pricesOrPath === "string" && fs.existsSync(pricesOrPath)) {
      try {
        return fs.statSync(pricesOrPath).mtimeMs;
      } catch {
        return 0;
      }
    }
    return 0;
  }
  const ms = Date.parse(String(raw));
  return Number.isFinite(ms) ? ms : 0;
}

function ratesForModel(prices, model) {
  const models = prices && prices.models;
  if (models && typeof models === "object") {
    const modelLower = String(model || "").toLowerCase();
    const entries = Object.entries(models).sort((a, b) => String(b[0]).length - String(a[0]).length);
    for (const [pattern, rates] of entries) {
      if (!pattern) continue;
      if (modelLower.includes(String(pattern).toLowerCase())) {
        const parsed = parseRates(rates);
        if (parsed) return parsed;
      }
    }
  }
  return parseRates(prices && prices.default);
}

function estimateCostUsd(inputTokens, outputTokens, rates) {
  if (!rates) return null;
  const input = Math.max(0, Number(inputTokens) || 0);
  const output = Math.max(0, Number(outputTokens) || 0);
  return (input / 1_000_000) * rates.input + (output / 1_000_000) * rates.output;
}

function estimateCostUsdForModel(prices, model, inputTokens, outputTokens) {
  return estimateCostUsd(inputTokens, outputTokens, ratesForModel(prices, model));
}

function formatCost(usd, { prefix = "$", digits = null, unpriced = "n/a" } = {}) {
  if (usd == null || !Number.isFinite(usd)) return unpriced;
  let d = digits;
  if (d == null) {
    if (usd >= 10) d = 2;
    else if (usd >= 1) d = 3;
    else d = 4;
  }
  return `${prefix}${usd.toFixed(d)}`;
}

function tokenSplit(row) {
  const prompt = Number(row.prompt_tokens);
  const completion = Number(row.completion_tokens);
  if (Number.isFinite(prompt) && Number.isFinite(completion) && prompt >= 0 && completion >= 0) {
    return { prompt, completion };
  }
  const total = Math.max(0, Number(row.total_tokens) || 0);
  const approxPrompt = Math.round(total * 0.7);
  return { prompt: approxPrompt, completion: total - approxPrompt, approximate: true };
}

function sameScope(a, b) {
  return (
    String(a.project || "unknown") === String(b.project || "unknown") &&
    String(a.feature || "(none)") === String(b.feature || "(none)")
  );
}

/**
 * Price the token growth from previous -> current snapshot at `prices`.
 * On feature reset (total drop), the full current snapshot is the delta.
 */
function computeCostDelta(previous, current, prices) {
  const currSplit = tokenSplit(current);
  const currTotal = Math.max(0, Number(current.total_tokens) || currSplit.prompt + currSplit.completion);
  let baseIn = 0;
  let baseOut = 0;
  let reset = !previous;

  if (previous && sameScope(previous, current)) {
    const prevTotal = Math.max(0, Number(previous.total_tokens) || 0);
    if (currTotal < prevTotal) {
      reset = true;
    } else {
      const prevSplit = tokenSplit(previous);
      baseIn = prevSplit.prompt;
      baseOut = prevSplit.completion;
      reset = false;
    }
  } else if (previous) {
    reset = true;
  }

  const deltaIn = Math.max(0, currSplit.prompt - baseIn);
  const deltaOut = Math.max(0, currSplit.completion - baseOut);
  const rates = ratesForModel(prices, current.model);
  const costDeltaUsd = estimateCostUsd(deltaIn, deltaOut, rates);

  let estimatedCostUsd = costDeltaUsd;
  if (!reset && previous && Number.isFinite(Number(previous.estimated_cost_usd))) {
    estimatedCostUsd =
      costDeltaUsd == null ? Number(previous.estimated_cost_usd) : Number(previous.estimated_cost_usd) + costDeltaUsd;
  }

  return {
    deltaIn,
    deltaOut,
    reset,
    approximate: Boolean(currSplit.approximate),
    costDeltaUsd: costDeltaUsd == null ? null : Number(costDeltaUsd),
    estimatedCostUsd: estimatedCostUsd == null ? null : Number(estimatedCostUsd),
    rates: rates
      ? {
          input_per_million_usd: rates.input,
          output_per_million_usd: rates.output,
        }
      : null,
  };
}

/**
 * Epoch-aware feature cost.
 * Prefers locked `cost_delta_usd` on snapshots; falls back to live re-pricing for gaps.
 */
function epochFeatureCost(sortedItems, prices, { preferLocked = true } = {}) {
  let lastPrompt = 0;
  let lastCompletion = 0;
  let lastTotal = 0;
  let cost = 0;
  let priced = false;
  let approximate = false;
  let unpricedDeltas = 0;
  let lockedDeltas = 0;
  let liveDeltas = 0;

  for (const item of sortedItems) {
    const total = Math.max(0, Number(item.total) || Number(item.total_tokens) || 0);
    const split = tokenSplit(item);
    if (split.approximate) approximate = true;

    if (total < lastTotal) {
      lastPrompt = 0;
      lastCompletion = 0;
    }

    const deltaIn = Math.max(0, split.prompt - lastPrompt);
    const deltaOut = Math.max(0, split.completion - lastCompletion);
    const locked = preferLocked ? Number(item.cost_delta_usd) : NaN;

    if (deltaIn > 0 || deltaOut > 0 || Number.isFinite(locked)) {
      if (preferLocked && Number.isFinite(locked)) {
        cost += locked;
        priced = true;
        lockedDeltas += 1;
      } else {
        const usd = estimateCostUsdForModel(prices, item.model, deltaIn, deltaOut);
        if (usd == null) unpricedDeltas += 1;
        else {
          cost += usd;
          priced = true;
          liveDeltas += 1;
        }
      }
    }

    lastPrompt = split.prompt;
    lastCompletion = split.completion;
    lastTotal = total;
  }

  return {
    costUsd: priced ? cost : null,
    approximate,
    unpricedDeltas,
    lockedDeltas,
    liveDeltas,
  };
}

/**
 * Status-line ongoing cost for a feature:
 * locked historical deltas in the current epoch + live tip for tokens beyond the last snapshot.
 */
function featureOngoingCost(rows, { project, feature, inputTokens, outputTokens, totalTokens, model }, prices) {
  const scopeFeature = feature || "(none)";
  const scopeRows = [];
  for (const row of rows) {
    if (String(row.project || "unknown") !== String(project || "unknown")) continue;
    if (String(row.feature || "(none)") !== scopeFeature) continue;
    scopeRows.push(row);
  }
  scopeRows.sort((a, b) => String(a.timestamp || "").localeCompare(String(b.timestamp || "")));

  const lockedInfo = epochFeatureCost(scopeRows, prices, { preferLocked: true });
  const last = scopeRows.length ? scopeRows[scopeRows.length - 1] : null;
  const current = {
    project,
    feature,
    model,
    prompt_tokens: inputTokens,
    completion_tokens: outputTokens,
    total_tokens: totalTokens,
  };
  const tip = computeCostDelta(last, current, prices);
  const lockedUsd = lockedInfo.costUsd ?? 0;
  // tip.costDeltaUsd is growth since last snapshot (or full current on reset/new).
  const tipUsd = tip.costDeltaUsd ?? 0;
  const totalUsd = lockedUsd + tipUsd;

  return {
    lockedUsd: lockedInfo.costUsd,
    tipUsd: tip.costDeltaUsd,
    costUsd: lockedInfo.costUsd != null || tip.costDeltaUsd != null ? totalUsd : null,
    tip,
  };
}

module.exports = {
  parseRates,
  loadPrices,
  pricesUpdatedAtMs,
  ratesForModel,
  estimateCostUsd,
  estimateCostUsdForModel,
  formatCost,
  tokenSplit,
  sameScope,
  computeCostDelta,
  epochFeatureCost,
  featureOngoingCost,
};
