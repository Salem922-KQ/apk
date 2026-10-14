const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const targetDir = path.join(projectRoot, 'www');

const excludedDirs = new Set([
  '.git',
  'android',
  'node_modules',
  'scripts',
  'www'
]);

const excludedFiles = new Set([
  '.gitignore',
  'README.md',
  'capacitor.config.json',
  'package-lock.json',
  'package.json'
]);

function copyRecursive(sourcePath, destinationPath) {
  const stats = fs.statSync(sourcePath);

  if (stats.isDirectory()) {
    fs.mkdirSync(destinationPath, { recursive: true });
    for (const entry of fs.readdirSync(sourcePath)) {
      if (excludedDirs.has(entry)) continue;
      copyRecursive(
        path.join(sourcePath, entry),
        path.join(destinationPath, entry)
      );
    }
    return;
  }

  const baseName = path.basename(sourcePath);
  if (excludedFiles.has(baseName)) return;
  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.copyFileSync(sourcePath, destinationPath);
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });
copyRecursive(projectRoot, targetDir);

console.log(`Synced web assets to ${targetDir}`);
