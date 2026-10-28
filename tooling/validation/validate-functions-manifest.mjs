#!/usr/bin/env node
/**
 * CI validator for `bench.functions.json` manifests (spec §4.1, ADR-009 tier b).
 *
 * Schema:
 *   { functions: FunctionEntry[] }
 *
 * FunctionEntry:
 *   id             string, non-empty, unique (required)
 *   nombre         string, non-empty (required)
 *   path           non-empty string[] (required)
 *   tipo           'pantalla' | 'accion' | 'macro' | 'reporte' (required)
 *   alias          string, non-empty, unique (optional)
 *   sinonimos      string[] (optional)
 *   permisos       string[] (optional)
 *   frecuenciaUso  number >= 0 (optional)
 *
 * Usage: node validate-functions-manifest.mjs [path ...]
 * With no paths, the default manifest candidates under apps/* are used.
 * Exits 1 with a clear list of errors when validation fails.
 */
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const DEFAULT_CANDIDATES = [
  'apps/showcase/bench.functions.json',
  'apps/storybook/bench.functions.json',
];
const TIPOS = new Set(['pantalla', 'accion', 'macro', 'reporte']);

function collectErrors(manifest) {
  const errors = [];
  const ids = new Set();
  const aliases = new Set();

  const functions = manifest?.functions;
  if (!Array.isArray(functions)) {
    errors.push('root: "functions" must be an array');
    return errors;
  }

  functions.forEach((fn, i) => {
    const at = `functions[${i}]`;
    if (fn == null || typeof fn !== 'object') {
      errors.push(`${at}: entry must be an object`);
      return;
    }
    if (typeof fn.id !== 'string' || fn.id.trim() === '') {
      errors.push(`${at}: "id" must be a non-empty string`);
    } else if (ids.has(fn.id)) {
      errors.push(`${at}: "id" '${fn.id}' is duplicated`);
    } else {
      ids.add(fn.id);
    }
    if (typeof fn.nombre !== 'string' || fn.nombre.trim() === '') {
      errors.push(`${at}: "nombre" must be a non-empty string`);
    }
    if (
      !Array.isArray(fn.path) ||
      fn.path.length === 0 ||
      !fn.path.every((p) => typeof p === 'string' && p.length > 0)
    ) {
      errors.push(`${at}: "path" must be a non-empty array of strings`);
    }
    if (!TIPOS.has(fn.tipo)) {
      errors.push(
        `${at}: "tipo" must be one of 'pantalla' | 'accion' | 'macro' | 'reporte' (got ${JSON.stringify(fn.tipo)})`,
      );
    }
    if (fn.alias !== undefined) {
      if (typeof fn.alias !== 'string' || fn.alias.trim() === '') {
        errors.push(`${at}: "alias" must be a non-empty string when present`);
      } else if (aliases.has(fn.alias)) {
        errors.push(`${at}: "alias" '${fn.alias}' is duplicated`);
      } else {
        aliases.add(fn.alias);
      }
    }
    if (fn.sinonimos !== undefined && !Array.isArray(fn.sinonimos)) {
      errors.push(`${at}: "sinonimos" must be an array of strings when present`);
    }
    if (fn.permisos !== undefined && !Array.isArray(fn.permisos)) {
      errors.push(`${at}: "permisos" must be an array of strings when present`);
    }
    if (fn.frecuenciaUso !== undefined) {
      if (typeof fn.frecuenciaUso !== 'number' || fn.frecuenciaUso < 0) {
        errors.push(`${at}: "frecuenciaUso" must be a number >= 0 when present`);
      }
    }
  });

  return errors;
}

function run() {
  let paths = process.argv.slice(2);
  if (paths.length === 0) {
    paths = DEFAULT_CANDIDATES.filter((p) => existsSync(p));
  }
  if (paths.length === 0) {
    console.log('no manifests found');
    process.exit(0);
  }

  let failed = false;
  for (const manifestPath of paths) {
    const file = path.resolve(manifestPath);
    let manifest;
    try {
      manifest = JSON.parse(readFileSync(file, 'utf8'));
    } catch (err) {
      console.error(`${manifestPath}: not valid JSON — ${err.message}`);
      failed = true;
      continue;
    }
    const errors = collectErrors(manifest);
    if (errors.length > 0) {
      failed = true;
      console.error(`${manifestPath}: ${errors.length} error(s)`);
      for (const error of errors) console.error(`  - ${error}`);
    } else {
      console.log(`${manifestPath}: OK`);
    }
  }

  if (failed) process.exit(1);
}

run();
