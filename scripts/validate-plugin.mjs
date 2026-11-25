#!/usr/bin/env node

import { readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function fail(message) {
  errors.push(message);
}

function readJson(relativePath) {
  const absolute = path.join(root, relativePath);
  if (!existsSync(absolute)) {
    fail(`${relativePath} is missing`);
    return null;
  }
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(absolute, "utf8"));
  } catch (error) {
    fail(`${relativePath} is not valid JSON: ${error.message}`);
    return null;
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    fail(`${relativePath} must be a JSON object`);
    return null;
  }
  return parsed;
}

function requireString(object, key, label) {
  if (!object || typeof object[key] !== "string" || object[key].trim() === "") {
    fail(`${label} must be a nonempty string`);
    return "";
  }
  return object[key];
}

const PLUGIN_DIR = "plugins/graphify";
const plugin = readJson(`${PLUGIN_DIR}/.claude-plugin/plugin.json`);
const marketplace = readJson(".claude-plugin/marketplace.json");
const mcp = readJson(`${PLUGIN_DIR}/.mcp.json`);

const allowedPluginFields = new Set([
  "name",
  "version",
  "description",
  "author",
  "homepage",
  "repository",
  "license",
  "keywords",
  "icon",
  "privacyPolicyUrl",
]);

if (plugin) {
  for (const key of Object.keys(plugin)) {
    if (!allowedPluginFields.has(key)) {
      fail(`plugin.json has unsupported field "${key}"`);
    }
  }
  if (plugin.name !== "graphify") {
    fail('plugin.json name must stay "graphify"');
  }
  requireString(plugin, "version", "plugin.json version");
  requireString(plugin, "description", "plugin.json description");
  if (plugin.license !== "Apache-2.0") {
    fail('plugin.json license must be "Apache-2.0"');
  }
  if (plugin.homepage !== "https://graphify.com") {
    fail('plugin.json homepage must be "https://graphify.com"');
  }
  if (plugin.repository !== "https://github.com/Graphify-Labs/graphify-claude-plugin") {
    fail("plugin.json repository URL is wrong");
  }
  if (!plugin.author || plugin.author.name !== "Graphify Labs") {
    fail('plugin.json author.name must be "Graphify Labs"');
  }
  if (!Array.isArray(plugin.keywords) || plugin.keywords.length === 0) {
    fail("plugin.json keywords must be a nonempty array");
  }
  for (const urlField of ["privacyPolicyUrl"]) {
    const value = requireString(plugin, urlField, `plugin.json ${urlField}`);
    if (value && !value.startsWith("https://")) {
      fail(`plugin.json ${urlField} must be an https URL`);
    }
  }
  if (plugin.icon !== "./assets/logo.png") {
    fail('plugin.json icon must be "./assets/logo.png"');
  } else {
    const logo = path.join(root, PLUGIN_DIR, "assets/logo.png");
    if (!existsSync(logo) || !statSync(logo).isFile()) {
      fail("assets/logo.png is missing");
    }
  }
}

if (marketplace) {
  if (marketplace.name !== "graphify") {
    fail('marketplace.json name must be "graphify"');
  }
  requireString(marketplace, "description", "marketplace.json description");
  if (!marketplace.owner || marketplace.owner.name !== "Graphify Labs") {
    fail('marketplace.json owner.name must be "Graphify Labs"');
  }
  if (!Array.isArray(marketplace.plugins) || marketplace.plugins.length !== 1) {
    fail("marketplace.json must list exactly one plugin");
  } else {
    const entry = marketplace.plugins[0];
    if (entry.name !== "graphify") {
      fail('marketplace plugin name must be "graphify"');
    }
    if (entry.source !== "./plugins/graphify") {
      fail('marketplace plugin source must be "./plugins/graphify"');
    }
    requireString(entry, "description", "marketplace plugin description");
  }
}

if (mcp) {
  const servers = mcp.mcpServers;
  const server = servers && servers.graphify;
  const keys = server ? Object.keys(server).sort() : [];
  if (
    !servers ||
    Object.keys(mcp).length !== 1 ||
    Object.keys(servers).length !== 1 ||
    !server ||
    keys.join(",") !== "type,url" ||
    server.type !== "http" ||
    server.url !== "https://api.graphify.com/mcp"
  ) {
    fail(
      ' .mcp.json must be mcpServers.graphify with type "http" and url "https://api.graphify.com/mcp" only'
    );
  }
}

const skillPath = path.join(root, PLUGIN_DIR, "skills/graphify/SKILL.md");
if (!existsSync(skillPath)) {
  fail("skills/graphify/SKILL.md is missing");
} else {
  const skill = readFileSync(skillPath, "utf8");
  if (!skill.startsWith("---\n")) {
    fail("SKILL.md is missing YAML frontmatter");
  } else {
    const end = skill.indexOf("\n---\n", 4);
    if (end === -1) {
      fail("SKILL.md frontmatter does not close");
    } else {
      const frontmatter = skill.slice(4, end);
      if (!/^name:\s*graphify\s*$/m.test(frontmatter)) {
        fail('SKILL.md frontmatter name must be "graphify"');
      }
      if (!/^description:\s*\S+/m.test(frontmatter)) {
        fail("SKILL.md frontmatter description must be a single text value");
      }
      if (/^description:\s*\[/m.test(frontmatter) || /^description:\s*$/m.test(frontmatter)) {
        fail("SKILL.md description must not be a list or empty");
      }
    }
  }
}

const readmePath = path.join(root, "README.md");
if (!existsSync(readmePath)) {
  fail("README.md is missing");
} else {
  const readme = readFileSync(readmePath, "utf8");
  const prose = readme.replace(/```[\s\S]*?```/g, " ");
  const words = prose.split(/\s+/).filter(Boolean);
  if (words.length < 40) {
    fail("README.md must contain at least 40 words outside code blocks");
  }
}

if (!existsSync(path.join(root, "LICENSE"))) {
  fail("LICENSE is missing");
}

if (errors.length > 0) {
  console.error("Validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("JSON and layout checks passed.");
