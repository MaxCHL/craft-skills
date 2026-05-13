#!/usr/bin/env node

const fs   = require("fs");
const path = require("path");
const os   = require("os");

const SRC_ROOT   = path.join(__dirname, "..");
const SKILLS_DIR = path.join(os.homedir(), ".claude", "skills");

const SKILLS = [
  {
    name:        "pm-craft",
    copyFiles:   ["SKILL.md"],
    copyDirs:    ["references"],
  },
  {
    name:        "design-craft",
    copyFiles:   ["SKILL.md"],
    copyDirs:    ["references", "assets"],
  },
  {
    name:        "pptx-craft",
    copyFiles:   ["SKILL.md", "grids.md", "primitives.md", "anti-ai.md"],
    copyDirs:    ["styles", "lib", "recipes"],
  },
];

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    entry.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

for (const skill of SKILLS) {
  const skillSrc  = path.join(SRC_ROOT, skill.name);
  const skillDest = path.join(SKILLS_DIR, skill.name);
  const isUpdate  = fs.existsSync(path.join(skillDest, "SKILL.md"));

  fs.mkdirSync(skillDest, { recursive: true });
  skill.copyFiles.forEach(f =>
    fs.copyFileSync(path.join(skillSrc, f), path.join(skillDest, f))
  );
  skill.copyDirs.forEach(d =>
    copyDir(path.join(skillSrc, d), path.join(skillDest, d))
  );

  console.log(`✓ ${skill.name} ${isUpdate ? "updated" : "installed"} → ${skillDest}`);
}

console.log('\nStart using: open Claude Code and type 「幫我寫規格」or 「幫我做原型」');
