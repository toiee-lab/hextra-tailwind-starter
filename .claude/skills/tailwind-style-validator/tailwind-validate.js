#!/usr/bin/env node

/**
 * Tailwind Style Validator
 *
 * Validates Tailwind CSS classes in Hugo + Hextra projects.
 * Checks for:
 * - Classes in content and layout files
 * - Hugo stats inclusion
 * - Hextra class conflicts
 *
 * Usage:
 *   node tailwind-validate.js [options]
 *
 * Options:
 *   --path <path>   Scan specific file or directory
 *   --verbose       Show detailed output
 *   --json          Output as JSON
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  contentDirs: ['content', 'layouts'],
  filePatterns: ['.md', '.html'],
  hugoStatsPath: 'hugo_stats.json',
  // Common Hextra prefixed classes to check for conflicts
  hextraClasses: ['sr-only', 'hidden', 'flex', 'grid']
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    path: null,
    verbose: false,
    json: false
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--path' && args[i + 1]) {
      options.path = args[i + 1];
      i++;
    } else if (args[i] === '--verbose') {
      options.verbose = true;
    } else if (args[i] === '--json') {
      options.json = true;
    }
  }

  return options;
}

// Recursively find files with specified extensions
function findFiles(dir, extensions, files = []) {
  const projectRoot = path.join(__dirname, '..', '..', '..');
  const fullPath = path.join(projectRoot, dir);

  if (!fs.existsSync(fullPath)) {
    return files;
  }

  const items = fs.readdirSync(fullPath);

  for (const item of items) {
    const itemPath = path.join(fullPath, item);
    const relativePath = path.join(dir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      findFiles(relativePath, extensions, files);
    } else if (extensions.some(ext => item.endsWith(ext))) {
      files.push({ absolute: itemPath, relative: relativePath });
    }
  }

  return files;
}

// Extract classes from file content
function extractClasses(content, filePath) {
  const classes = [];
  const classRegex = /class=["']([^"']*)["']/g;
  const lines = content.split('\n');

  lines.forEach((line, lineIndex) => {
    let match;
    while ((match = classRegex.exec(line)) !== null) {
      const classString = match[1];
      const classList = classString.split(/\s+/).filter(c => c.length > 0);

      classList.forEach(className => {
        classes.push({
          name: className,
          file: filePath,
          line: lineIndex + 1
        });
      });
    }
  });

  return classes;
}

// Categorize classes
function categorizeClasses(classes) {
  const categories = {
    tailwind: [],
    hextra: [],
    unknown: []
  };

  // Common Tailwind patterns
  const tailwindPatterns = [
    /^(sm|md|lg|xl|2xl):/, // Responsive
    /^(hover|focus|active|disabled|group-hover):/, // States
    /^(dark|light):/, // Theme
    /^(bg|text|border|ring|shadow|rounded)/, // Common utilities
    /^(p|m|px|py|mx|my|pt|pb|pl|pr|mt|mb|ml|mr)-/, // Spacing
    /^(w|h|min-w|min-h|max-w|max-h)-/, // Sizing
    /^(flex|grid|block|inline|hidden)/, // Display
    /^(items|justify|content|self)-/, // Flexbox/Grid
    /^(gap|space)-/, // Gap
    /^(font|text|leading|tracking)-/, // Typography
    /^(absolute|relative|fixed|sticky)/, // Position
    /^(top|right|bottom|left|inset)-/, // Position values
    /^(z|opacity|overflow)-/, // Other
    /^(transition|duration|ease|delay|animate)-/, // Animation
    /^(transform|rotate|scale|translate|skew)-/, // Transform
    /^(cursor|select|pointer-events)-/, // Interaction
    /^(object|aspect)-/, // Object fit
    /^(col|row)-span-/, // Grid span
    /^(grid-cols|grid-rows)-/, // Grid template
    /^(from|via|to)-/, // Gradient
    /^(bg-gradient|backdrop)-/, // Background
    /^(ring|outline)-/, // Ring/Outline
  ];

  for (const classInfo of classes) {
    const className = classInfo.name;

    if (className.startsWith('hx:') || className.startsWith('hextra-')) {
      categories.hextra.push(classInfo);
    } else if (tailwindPatterns.some(pattern => pattern.test(className))) {
      categories.tailwind.push(classInfo);
    } else {
      // Check for simple Tailwind classes
      const simpleTailwind = [
        'flex', 'grid', 'block', 'inline', 'hidden', 'visible',
        'static', 'fixed', 'absolute', 'relative', 'sticky',
        'container', 'prose', 'not-prose',
        'italic', 'underline', 'line-through', 'no-underline',
        'uppercase', 'lowercase', 'capitalize', 'normal-case',
        'truncate', 'break-words', 'break-all',
        'antialiased', 'subpixel-antialiased',
        'sr-only', 'not-sr-only'
      ];

      if (simpleTailwind.includes(className)) {
        categories.tailwind.push(classInfo);
      } else {
        categories.unknown.push(classInfo);
      }
    }
  }

  return categories;
}

// Load Hugo stats
function loadHugoStats() {
  const projectRoot = path.join(__dirname, '..', '..', '..');
  const statsPath = path.join(projectRoot, CONFIG.hugoStatsPath);

  if (!fs.existsSync(statsPath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(statsPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading hugo_stats.json: ${error.message}`);
    return null;
  }
}

// Check for Hextra conflicts
function checkHextraConflicts(classes) {
  const conflicts = [];

  for (const classInfo of classes) {
    const className = classInfo.name;

    // Check if standard class might conflict with hx: version
    if (CONFIG.hextraClasses.includes(className)) {
      conflicts.push({
        ...classInfo,
        hxVersion: `hx:${className}`,
        message: `Class "${className}" has a Hextra equivalent "hx:${className}". Verify intended usage.`
      });
    }
  }

  return conflicts;
}

// Check classes against Hugo stats
function checkHugoStats(classes, stats) {
  if (!stats || !stats.htmlElements || !stats.htmlElements.classes) {
    return { missing: [], present: [] };
  }

  const statsClasses = new Set(Object.keys(stats.htmlElements.classes));
  const missing = [];
  const present = [];

  for (const classInfo of classes) {
    // Skip hx: prefixed classes for this check
    if (classInfo.name.startsWith('hx:')) {
      present.push(classInfo);
      continue;
    }

    if (statsClasses.has(classInfo.name)) {
      present.push(classInfo);
    } else {
      missing.push(classInfo);
    }
  }

  return { missing, present };
}

// Generate report
function generateReport(results, options) {
  if (options.json) {
    console.log(JSON.stringify(results, null, 2));
    return;
  }

  console.log('# Tailwind CSS Validation Report\n');

  // Scan Summary
  console.log('## Scan Summary');
  console.log(`- Files scanned: ${results.filesScanned}`);
  console.log(`- Total classes found: ${results.totalClasses}`);
  console.log(`- Tailwind classes: ${results.categories.tailwind.length}`);
  console.log(`- Hextra classes (hx:): ${results.categories.hextra.length}`);
  console.log(`- Unknown classes: ${results.categories.unknown.length}`);
  console.log('');

  // Issues
  const hasIssues = results.missingFromStats.length > 0 ||
                    results.hextraConflicts.length > 0;

  if (hasIssues) {
    console.log('## Issues Found\n');

    if (results.missingFromStats.length > 0) {
      console.log('### Missing from hugo_stats.json');
      console.log('These classes may be purged during build:\n');
      const uniqueMissing = [...new Set(results.missingFromStats.map(c => c.name))];
      uniqueMissing.slice(0, 20).forEach(className => {
        const example = results.missingFromStats.find(c => c.name === className);
        console.log(`- \`${className}\` in ${example.file}:${example.line}`);
      });
      if (uniqueMissing.length > 20) {
        console.log(`- ... and ${uniqueMissing.length - 20} more`);
      }
      console.log('');
    }

    if (results.hextraConflicts.length > 0) {
      console.log('### Potential Hextra Conflicts');
      console.log('');
      results.hextraConflicts.forEach(conflict => {
        console.log(`- \`${conflict.name}\` may conflict with \`${conflict.hxVersion}\``);
        console.log(`  Location: ${conflict.file}:${conflict.line}`);
      });
      console.log('');
    }
  } else {
    console.log('## No Issues Found\n');
    console.log('All classes validated successfully.\n');
  }

  // Unknown classes (verbose mode)
  if (options.verbose && results.categories.unknown.length > 0) {
    console.log('### Unknown Classes');
    console.log('These classes are not recognized as standard Tailwind:\n');
    const uniqueUnknown = [...new Set(results.categories.unknown.map(c => c.name))];
    uniqueUnknown.forEach(className => {
      console.log(`- \`${className}\``);
    });
    console.log('');
  }

  // Recommendations
  console.log('## Recommendations\n');
  if (results.missingFromStats.length > 0) {
    console.log('- Run `hugo --gc` to regenerate stats');
  }
  console.log('- Run `npm run build:css` to rebuild CSS');
  console.log('- Run `hugo --quiet` to verify build');
  console.log('');

  // Status
  console.log('## Validation Status\n');
  const status = hasIssues ? '⚠️  Issues found - review recommended' : '✅ All checks passed';
  console.log(status);
}

// Main execution
function main() {
  const options = parseArgs();
  const projectRoot = path.join(__dirname, '..', '..', '..');

  // Find files to scan
  let filesToScan = [];

  if (options.path) {
    const fullPath = path.isAbsolute(options.path)
      ? options.path
      : path.join(projectRoot, options.path);

    if (fs.existsSync(fullPath)) {
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        filesToScan = findFiles(options.path, CONFIG.filePatterns);
      } else {
        filesToScan = [{ absolute: fullPath, relative: options.path }];
      }
    }
  } else {
    for (const dir of CONFIG.contentDirs) {
      filesToScan = filesToScan.concat(findFiles(dir, CONFIG.filePatterns));
    }
  }

  if (filesToScan.length === 0) {
    console.log('No files found to scan.');
    process.exit(0);
  }

  // Extract all classes
  let allClasses = [];

  for (const file of filesToScan) {
    try {
      const content = fs.readFileSync(file.absolute, 'utf8');
      const classes = extractClasses(content, file.relative);
      allClasses = allClasses.concat(classes);
    } catch (error) {
      if (!options.json) {
        console.error(`Error reading ${file.relative}: ${error.message}`);
      }
    }
  }

  // Categorize classes
  const categories = categorizeClasses(allClasses);

  // Load Hugo stats
  const hugoStats = loadHugoStats();

  // Check against Hugo stats
  const statsCheck = checkHugoStats(allClasses, hugoStats);

  // Check for Hextra conflicts
  const hextraConflicts = checkHextraConflicts(categories.tailwind);

  // Compile results
  const results = {
    filesScanned: filesToScan.length,
    totalClasses: allClasses.length,
    categories,
    missingFromStats: statsCheck.missing,
    presentInStats: statsCheck.present,
    hextraConflicts,
    hugoStatsFound: hugoStats !== null
  };

  // Generate report
  generateReport(results, options);

  // Exit with error if issues found
  const hasIssues = results.missingFromStats.length > 0 || results.hextraConflicts.length > 0;
  process.exit(hasIssues ? 1 : 0);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  findFiles,
  extractClasses,
  categorizeClasses,
  loadHugoStats,
  checkHugoStats,
  checkHextraConflicts
};
