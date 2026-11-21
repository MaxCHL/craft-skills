#!/usr/bin/env node

const fs   = require("fs");
const path = require("path");
const os   = require("os");
const crypto = require("crypto");

const SRC_ROOT = path.join(__dirname, "..");
const MANIFEST = ".craft-skills-manifest.json";

// path.resolve keeps containment checks valid even if HOME is relative.
const SKILLS_DIR = path.resolve(os.homedir(), ".claude", "skills");

// Names never copied: dotfiles/dirs (.venv, .DS_Store, .git ...), bytecode caches.
function isIgnored(name) {
  return name.startsWith(".") || name === "__pycache__" || name.endsWith(".pyc");
}

function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

function lstatOrNull(p) {
  try {
    return fs.lstatSync(p);
  } catch (e) {
    if (e.code === "ENOENT" || e.code === "ENOTDIR") return null;
    throw e;
  }
}

// A skill is any top-level directory of the package that contains a SKILL.md.
function discoverSkills() {
  return fs
    .readdirSync(SRC_ROOT, { withFileTypes: true })
    .filter(e => e.isDirectory() && !isIgnored(e.name))
    .filter(e => {
      const st = lstatOrNull(path.join(SRC_ROOT, e.name, "SKILL.md"));
      return st && st.isFile();
    })
    .map(e => e.name)
    .sort();
}

// Recursively list regular files under `dir` as "/"-separated relative paths.
// Symlinks in the source tree are never followed (skipped with a warning).
function listFiles(dir, prefix = "") {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (isIgnored(entry.name)) continue;
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isSymbolicLink()) {
      console.warn(`  ! skipping symlink in source tree: ${rel}`);
    } else if (entry.isDirectory()) {
      out.push(...listFiles(path.join(dir, entry.name), rel));
    } else if (entry.isFile()) {
      out.push(rel);
    }
  }
  return out.sort();
}

// A manifest entry must be a plain relative POSIX path with no empty, "." or ".." segments.
function validateEntry(rel) {
  if (typeof rel !== "string" || rel.length === 0) return "not a non-empty string";
  if (rel.includes("\0")) return "contains NUL";
  if (rel.includes("\\")) return "contains a backslash";
  if (rel.startsWith("/")) return "is absolute";
  if (/^[A-Za-z]:/.test(rel)) return "has a drive letter";
  for (const seg of rel.split("/")) {
    if (seg === "" || seg === "." || seg === "..") return `has an invalid segment "${seg}"`;
  }
  return null;
}

// Returns Map(rel -> sha256 | null). Format v2 stores {rel: sha256} and every hash must be a valid
// SHA-256 hex string; only the legacy format (array of paths) has no hashes, so only those entries
// map to null and are never deleted.
function readPreviousFiles(destDir) {
  const out = new Map();
  const file = path.join(destDir, MANIFEST);
  const st = lstatOrNull(file);
  if (!st) return out;
  if (!st.isFile()) {
    console.warn(`  ! ignoring ${MANIFEST}: not a regular file`);
    return out;
  }
  try {
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    if (!data) return out;
    let entries;
    const legacy = Array.isArray(data.files);
    if (Array.isArray(data.files)) {
      entries = data.files.map(rel => [rel, null]); // legacy format: hashless entries are allowed only here
    } else if (data.manifestVersion === 2 && data.files && typeof data.files === "object") {
      entries = Object.entries(data.files);
    } else {
      return out;
    }
    for (const [rel, hash] of entries) {
      const why = validateEntry(rel);
      if (why) {
        console.warn(`  ! ignoring invalid manifest entry ${JSON.stringify(rel)}: ${why}`);
      } else if (!(legacy && hash === null) && !(typeof hash === "string" && /^[0-9a-f]{64}$/.test(hash))) {
        console.warn(`  ! ignoring manifest entry ${JSON.stringify(rel)}: invalid checksum`);
      } else {
        out.set(rel, hash);
      }
    }
  } catch (e) {
    console.warn(`  ! ignoring unreadable ${MANIFEST}: ${e.message}`);
  }
  return out;
}

// Walk `rel` below destDir and inspect every existing component with lstat.
// Throws on a symlink component or a type conflict. For the final component,
// `finalKind` is "file" (a directory there is a conflict) and the existing
// file is returned (or null if nothing exists yet).
function checkComponents(destDir, rel) {
  const segs = rel.split("/");
  let cur = destDir;
  for (let i = 0; i < segs.length; i++) {
    cur = path.join(cur, segs[i]);
    const st = lstatOrNull(cur);
    if (!st) return null;
    const shown = segs.slice(0, i + 1).join("/");
    if (st.isSymbolicLink()) throw new Error(`refusing symlink at ${shown}`);
    if (i < segs.length - 1) {
      if (!st.isDirectory()) throw new Error(`conflict: ${shown} exists but is not a directory`);
    } else if (!st.isFile()) {
      throw new Error(`conflict: ${shown} exists but is not a regular file`);
    }
  }
  return cur;
}

// NOTE: all checks are path-based (Node has no openat/renameat). They protect against symlinks that
// exist before or at install time; they assume no other process modifies the skills directory
// concurrently while the installer runs.

// Create each directory level by hand (never `mkdir -p`) so every existing level is lstat-checked.
function ensureDirs(destDir, realDest, relDirSegs) {
  let cur = destDir;
  for (const seg of relDirSegs) {
    cur = path.join(cur, seg);
    const st = lstatOrNull(cur);
    if (!st) fs.mkdirSync(cur);
    else if (st.isSymbolicLink()) throw new Error(`refusing symlink at ${path.relative(destDir, cur)}`);
    else if (!st.isDirectory()) throw new Error(`conflict: ${path.relative(destDir, cur)} is not a directory`);
  }
  assertInside(cur, realDest);
  return cur;
}

// Throws unless the real path of `dir` is realDest or below it.
function assertInside(dir, realDest) {
  const realParent = fs.realpathSync(dir);
  if (realParent !== realDest && !realParent.startsWith(realDest + path.sep)) {
    throw new Error(`destination escapes the skill directory: ${realParent}`);
  }
}

// Write via a temp file + rename: rename replaces a symlink itself instead of following it.
// The temp name is unpredictable and is only unlinked if this call created it.
// Best effort only: the parent is re-checked right before the rename, but Node has no
// directory-fd based API, so a concurrent process swapping a directory in that window is not covered.
// Returns the SHA-256 of the written content.
function writeAtomic(target, data, mode, realDest) {
  const dir = path.dirname(target);
  const tmp = path.join(dir, `.craft-tmp-${crypto.randomBytes(8).toString("hex")}`);
  const buf = Buffer.isBuffer(data) ? data : Buffer.from(data, "utf8");
  let created = false;
  try {
    const fd = fs.openSync(tmp, "wx", mode);
    created = true;
    try {
      let off = 0;
      while (off < buf.length) off += fs.writeSync(fd, buf, off, buf.length - off);
    } finally { fs.closeSync(fd); }
    assertInside(dir, realDest);
    fs.renameSync(tmp, target);
  } catch (e) {
    if (created) {
      try { fs.unlinkSync(tmp); } catch (_) { /* nothing to clean */ }
    }
    throw e;
  }
  return sha256(buf);
}

// Remove empty real directories from `dir` upward, stopping at (and keeping) `stop`.
// Never follows or removes symlinks.
function pruneEmptyDirs(dir, stop) {
  while (dir !== stop && dir.startsWith(stop + path.sep)) {
    try {
      const st = lstatOrNull(dir);
      if (!st || !st.isDirectory()) return;
      if (fs.readdirSync(dir).length > 0) return;
      fs.rmdirSync(dir);
    } catch (e) {
      return;
    }
    dir = path.dirname(dir);
  }
}

// Delete only regular files that a previous install recorded, this one no longer ships, and whose
// current content still matches the recorded SHA-256. This detects files modified since install; it
// does not authenticate the manifest (a hand-edited entry with a correct checksum would be removed).
// Anything else is kept and dropped from tracking.
// Returns { removed, dropped, failed } (failed = entries that could not be unlinked and stay tracked).
function removeStale(destDir, realDest, previous, current) {
  const shipped = new Set(current);
  const removed = [];
  const dropped = [];
  const failed = [];
  for (const [rel, hash] of previous) {
    if (shipped.has(rel)) continue;
    try {
      const target = checkComponents(destDir, rel);
      if (!target) continue; // already gone
      if (hash === null) {
        console.warn(`  ! ${rel}: no checksum recorded (old manifest) — kept`);
        dropped.push(rel);
        continue;
      }
      if (sha256(fs.readFileSync(target)) !== hash) {
        console.warn(`  ! ${rel}: modified or not installed by craft-skills — kept`);
        dropped.push(rel);
        continue;
      }
      assertInside(path.dirname(target), realDest);
      fs.unlinkSync(target);
      removed.push(rel);
      pruneEmptyDirs(path.dirname(target), destDir);
    } catch (e) {
      if (/refusing symlink|conflict:/.test(e.message)) {
        console.warn(`  ! not touching stale entry ${rel}: ${e.message}`);
      } else {
        console.error(`  ✗ could not remove ${rel}: ${e.message}`);
        failed.push(rel);
      }
    }
  }
  return { removed, dropped, failed };
}

function install(name, version, realSkills) {
  const srcDir  = path.join(SRC_ROOT, name);
  const destDir = path.join(realSkills, name);

  const destStat = lstatOrNull(destDir);
  if (destStat && destStat.isSymbolicLink()) throw new Error(`${destDir} is a symlink; refusing to install into it`);
  if (destStat && !destStat.isDirectory()) throw new Error(`${destDir} exists and is not a directory`);

  const isUpdate = !!lstatOrNull(path.join(destDir, "SKILL.md"));
  const files = listFiles(srcDir);
  const previous = destStat ? readPreviousFiles(destDir) : new Map();

  // Pre-check every destination before writing anything for this skill.
  if (destStat) {
    for (const rel of [...files, MANIFEST]) checkComponents(destDir, rel);
  }

  fs.mkdirSync(destDir, { recursive: true });
  const realDest = fs.realpathSync(destDir);
  if (realDest !== destDir) throw new Error(`${destDir} resolves to ${realDest}; refusing`);

  const written = new Map(); // rel -> sha256
  let error = null;
  let stale = { removed: [], dropped: [], failed: [] };
  try {
    for (const rel of files) {
      const segs = rel.split("/");
      const parent = ensureDirs(destDir, realDest, segs.slice(0, -1));
      const src = path.join(srcDir, ...segs);
      const target = path.join(parent, segs[segs.length - 1]);
      const st = lstatOrNull(target);
      if (st && !st.isFile()) throw new Error(`conflict: ${rel} exists but is not a regular file`);
      written.set(rel, writeAtomic(target, fs.readFileSync(src), fs.statSync(src).mode & 0o777, realDest));
    }
    stale = removeStale(destDir, realDest, previous, files);
  } catch (e) {
    error = e;
  }

  // Manifest = files written by this run + earlier hashed entries that still exist and were neither
  // removed nor dropped (e.g. a failed unlink or an aborted run), so a later run can still clean them up.
  const tracked = new Map(written);
  for (const [rel, hash] of previous) {
    if (tracked.has(rel) || hash === null || stale.removed.includes(rel) || stale.dropped.includes(rel)) continue;
    try {
      const st = lstatOrNull(path.join(destDir, ...rel.split("/")));
      if (st && st.isFile() && checkComponents(destDir, rel)) tracked.set(rel, hash);
    } catch (_) { /* symlink/conflict: no longer ours */ }
  }
  const sortedFiles = {};
  for (const rel of [...tracked.keys()].sort()) sortedFiles[rel] = tracked.get(rel);
  const manifestBody = JSON.stringify({ package: "craft-skills", version, manifestVersion: 2, files: sortedFiles }, null, 2) + "\n";
  try {
    writeAtomic(path.join(destDir, MANIFEST), manifestBody, 0o644, realDest);
  } catch (e) {
    error = error || e;
  }

  if (error) {
    throw new Error(`${error.message} (${written.size}/${files.length} files written; rerun to retry)`);
  }
  if (stale.failed.length > 0) throw new Error("some stale files could not be removed; rerun to retry");

  console.log(`✓ ${name} ${isUpdate ? "updated" : "installed"} → ${destDir}`);
  stale.removed.forEach(f => console.log(`  - removed stale file: ${f}`));
}

function main() {
  const version = require("../package.json").version;
  const skills = discoverSkills();
  if (skills.length === 0) {
    console.error("No skills found in package.");
    process.exit(1);
  }

  let realSkills;
  try {
    const st = lstatOrNull(SKILLS_DIR);
    // A dangling symlink or a non-directory would otherwise surface as an uncaught EEXIST.
    if (st && !fs.statSync(SKILLS_DIR).isDirectory()) throw new Error("exists but is not a directory");
    fs.mkdirSync(SKILLS_DIR, { recursive: true });
    realSkills = fs.realpathSync(SKILLS_DIR);
  } catch (e) {
    const why = e.code === "ENOENT" ? "is a dangling symlink" : e.message;
    console.error(`✗ cannot use ${SKILLS_DIR}: ${why}`);
    process.exit(1);
  }

  const failures = [];
  for (const name of skills) {
    try {
      install(name, version, realSkills);
    } catch (e) {
      console.error(`✗ ${name} failed: ${e.message}`);
      failures.push(name);
    }
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} skill(s) failed: ${failures.join(", ")}`);
    process.exitCode = 1;
    return;
  }
  console.log('\nStart using: open Claude Code and type 「幫我寫規格」or 「幫我做原型」');
  console.log("Note: if you also installed the craft-skills plugin, remove one of the two to avoid duplicate skills.");
}

main();
