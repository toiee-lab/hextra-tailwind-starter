#!/usr/bin/env node

/**
 * Hextra Icon Validator Helper Script
 *
 * This script validates Hextra icon names and suggests similar alternatives
 * if the requested icon is not found.
 *
 * Usage:
 *   node icon-search.js <icon-name> [icon-name2 ...]
 *
 * Example:
 *   node icon-search.js github githubs invalid-icon
 */

const fs = require('fs');
const path = require('path');

// Levenshtein distance calculation for fuzzy matching
function levenshteinDistance(str1, str2) {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

// Load icon list from hextra-icons.md
function loadIconList() {
  const iconListPath = path.join(__dirname, '..', '..', '..', 'project-docs', 'hextra-icons.md');

  try {
    const content = fs.readFileSync(iconListPath, 'utf8');
    const lines = content.split('\n');
    const icons = [];

    // Extract icon names (lines starting with "- ")
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ') && trimmed.length > 2) {
        const iconName = trimmed.substring(2).trim();
        if (iconName && !iconName.startsWith('#')) {
          icons.push(iconName);
        }
      }
    }

    return icons;
  } catch (error) {
    console.error(`Error loading icon list: ${error.message}`);
    process.exit(1);
  }
}

// Find similar icons using Levenshtein distance
function findSimilarIcons(targetIcon, availableIcons, maxSuggestions = 5, maxDistance = 3) {
  const similarities = availableIcons.map(icon => ({
    icon,
    distance: levenshteinDistance(targetIcon.toLowerCase(), icon.toLowerCase())
  }));

  // Filter and sort by distance
  const similar = similarities
    .filter(s => s.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, maxSuggestions)
    .map(s => s.icon);

  return similar;
}

// Validate icon names
function validateIcons(iconNames, availableIcons) {
  const results = [];

  for (const iconName of iconNames) {
    const isValid = availableIcons.includes(iconName);

    if (isValid) {
      results.push({
        icon: iconName,
        valid: true,
        message: `✓ Icon "${iconName}" is valid and available in Hextra theme.`
      });
    } else {
      const similar = findSimilarIcons(iconName, availableIcons);
      let message = `✗ Icon "${iconName}" is not available in Hextra theme.`;

      if (similar.length > 0) {
        message += '\n\nDid you mean one of these?';
        similar.forEach(icon => {
          message += `\n  - ${icon}`;
        });
      } else {
        message += '\n\nNo similar icons found. See project-docs/hextra-icons.md for full list.';
      }

      results.push({
        icon: iconName,
        valid: false,
        similar,
        message
      });
    }
  }

  return results;
}

// Main execution
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node icon-search.js <icon-name> [icon-name2 ...]');
    console.log('\nExample:');
    console.log('  node icon-search.js github');
    console.log('  node icon-search.js github gitlab invalid-icon');
    process.exit(0);
  }

  const availableIcons = loadIconList();
  console.log(`Loaded ${availableIcons.length} available icons from Hextra theme.\n`);

  const results = validateIcons(args, availableIcons);

  // Print results
  results.forEach((result, index) => {
    console.log(result.message);
    if (index < results.length - 1) {
      console.log(''); // Add blank line between results
    }
  });

  // Exit with error code if any icon is invalid
  const hasInvalid = results.some(r => !r.valid);
  process.exit(hasInvalid ? 1 : 0);
}

// Run if called directly
if (require.main === module) {
  main();
}

// Export for use as module
module.exports = {
  loadIconList,
  validateIcons,
  findSimilarIcons,
  levenshteinDistance
};
