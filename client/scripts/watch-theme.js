// scripts/watch-theme.js
// Watches ../theme${APP_THEME}/client and copies to ./src/theme
// Usage: node scripts/watch-theme.js

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const chokidar = require('chokidar');
const fs = require('fs-extra');
const path = require('path');

// Environment variable for theme
const APP_THEME = process.env.APP_THEME || 'default';
const sourceDir = path.resolve(__dirname, `../../theme/${APP_THEME}/client`);
const destDir = path.resolve(__dirname, '../src/theme');

console.log(`[watch-theme] APP_THEME: ${APP_THEME}`);
console.log(`[watch-theme] Source: ${sourceDir}`);
console.log(`[watch-theme] Destination: ${destDir}`);

if (!fs.existsSync(sourceDir)) {
  console.error(`[watch-theme] ERROR: Source directory does not exist: ${sourceDir}`);
  process.exit(1);
}

async function copyAll() {
  await fs.ensureDir(destDir);
  await fs.copy(sourceDir, destDir, { overwrite: true });
  console.log(`[watch-theme] Initial copy from ${sourceDir} to ${destDir}`);
}

async function removeFile(filePath) {
  const rel = path.relative(sourceDir, filePath);
  const dest = path.join(destDir, rel);
  await fs.remove(dest);
  console.log(`[watch-theme] Removed: ${dest}`);
}

async function copyFile(filePath) {
  const rel = path.relative(sourceDir, filePath);
  const dest = path.join(destDir, rel);
  await fs.copy(filePath, dest, { overwrite: true });
  console.log(`[watch-theme] Copied: ${filePath} -> ${dest}`);
}

async function main() {
  await copyAll();
  const watcher = chokidar.watch(sourceDir, { ignoreInitial: true });

  watcher
    .on('add', copyFile)
    .on('change', copyFile)
    .on('unlink', removeFile)
    .on('addDir', async dirPath => {
      const rel = path.relative(sourceDir, dirPath);
      const dest = path.join(destDir, rel);
      await fs.ensureDir(dest);
      console.log(`[watch-theme] Directory created: ${dest}`);
    })
    .on('unlinkDir', async dirPath => {
      const rel = path.relative(sourceDir, dirPath);
      const dest = path.join(destDir, rel);
      await fs.remove(dest);
      console.log(`[watch-theme] Directory removed: ${dest}`);
    })
    .on('error', err => console.error(`[watch-theme] Error:`, err));

  console.log(`[watch-theme] Watching for changes in ${sourceDir}`);
}

main();
