import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
const storybook = readJson('apps/storybook/package.json');
const react = readJson('packages/react/package.json');

const storybookVersion = storybook.devDependencies.storybook;
const pluginVersion = storybook.devDependencies['@stencil/storybook-plugin'];

const major = (range) => Number(String(range).match(/\d+/)?.[0]);
const errors = [];
if (major(storybookVersion) !== 10)
  errors.push(
    `storybook must be major 10 for @stencil/storybook-plugin ${pluginVersion}; found ${storybookVersion}`,
  );
if (
  major(react.devDependencies['@types/react']) !== 18 ||
  major(react.devDependencies['@types/react-dom']) !== 18
) {
  errors.push(
    'React adapter development types must remain on React 18 to match the package peer contract.',
  );
}

if (errors.length) {
  console.error('BENCH dependency consistency check failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('BENCH dependency consistency check passed.');
