import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const packagesDir = path.join(root, 'packages');
const packages = fs.readdirSync(packagesDir).filter((name) => fs.existsSync(path.join(packagesDir, name, 'package.json')));
const errors = [];
const forbidden = [
  /\bBchBadgeTone\b/,
  /\bbenchTestingContract\b/,
  /@bench\/patterns/,
  /@storybook\/web-components(?:-vite)?/,
  /\bLitElement\b/,
];

for (const name of packages) {
  const packageRoot = path.join(packagesDir, name);
  const manifest = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8'));
  if (manifest.private === false || manifest.exports) {
    const sourceRoot = path.join(packageRoot, 'src');
    if (fs.existsSync(sourceRoot)) {
      const stack = [sourceRoot];
      while (stack.length) {
        const dir = stack.pop();
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const file = path.join(dir, entry.name);
          if (entry.isDirectory() && entry.name !== 'dist' && entry.name !== 'node_modules') stack.push(file);
          else if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name)) {
            const text = fs.readFileSync(file, 'utf8');
            for (const rule of forbidden) {
              if (rule.test(text)) errors.push(`${path.relative(root, file)} contains forbidden API/reference ${rule}`);
            }
          }
        }
      }
    }
  }
}

if (errors.length) {
  console.error('BENCH public API/dead-code check failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`BENCH public API/dead-code check passed (${packages.length} packages checked).`);
