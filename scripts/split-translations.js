#!/usr/bin/env node
/**
 * Split translations into namespaces
 * Converts single locale file into multiple namespace files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.join(__dirname, '..', 'src', 'lib', 'i18n', 'locales');

// Namespace mapping - which keys go into which namespace
const namespaces = {
  navigation: ['nav'],
  hero: ['hero'],
  company: ['company'],
  stats: ['stats'],
  services: ['services'],
  portfolio: ['portfolio'],
  about: ['about'],
  blog: ['blog'],
  contact: ['contact'],
  footer: ['footer'],
  validation: ['validation'],
  common: ['common']
};

function splitTranslations(locale) {
  const sourceFile = path.join(localesDir, `${locale}.json`);
  const targetDir = path.join(localesDir, locale);

  // Read source file
  const source = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));

  // Create target directory
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Split into namespaces
  for (const [namespace, keys] of Object.entries(namespaces)) {
    const namespaceData = {};

    keys.forEach(key => {
      if (source[key]) {
        // Extract the section directly (not nested)
        Object.assign(namespaceData, source[key]);
      }
    });

    // Write namespace file (only if has data)
    if (Object.keys(namespaceData).length > 0) {
      const targetFile = path.join(targetDir, `${namespace}.json`);
      fs.writeFileSync(targetFile, JSON.stringify(namespaceData, null, 2) + '\n');
      console.log(`✅ Created ${locale}/${namespace}.json`);
    }
  }
}

// Process both locales
['es', 'en'].forEach(locale => {
  console.log(`\n📦 Processing ${locale}...`);
  splitTranslations(locale);
});

console.log('\n✨ Done! Translations split into namespaces.');
