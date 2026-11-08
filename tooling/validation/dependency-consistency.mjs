import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
const react = readJson('packages/react/package.json');

const major = (range) => Number(String(range).match(/\d+/)?.[0]);
const errors = [];
if (
  major(react.devDependencies['@types/react']) !== 18 ||
  major(react.devDependencies['@types/react-dom']) !== 18
) {
  errors.push(
    'React adapter development types must remain on React 18 — the build/test contract of the adapter (the peer range accepts React 18 and 19).',
  );
}

if (errors.length) {
  console.error('BENCH dependency consistency check failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('BENCH dependency consistency check passed.');
