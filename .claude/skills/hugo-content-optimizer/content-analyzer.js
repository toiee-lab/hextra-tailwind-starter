#!/usr/bin/env node

/**
 * Hugo Content Optimizer - Content Analyzer
 *
 * Analyzes Hugo/Hextra content files and provides optimization recommendations.
 *
 * Usage:
 *   node content-analyzer.js [options]
 *
 * Options:
 *   --file <path>   Analyze specific file
 *   --dir <path>    Analyze directory (default: content/)
 *   --verbose       Show detailed analysis
 *   --json          Output as JSON
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  defaultContentDir: 'content',
  fileExtensions: ['.md'],
  // Patterns that suggest shortcode opportunities
  calloutPatterns: [
    { regex: /^\*\*Note:?\*\*/im, type: 'info', name: 'Note' },
    { regex: /^\*\*Warning:?\*\*/im, type: 'warning', name: 'Warning' },
    { regex: /^\*\*Important:?\*\*/im, type: 'warning', name: 'Important' },
    { regex: /^\*\*Caution:?\*\*/im, type: 'error', name: 'Caution' },
    { regex: /^\*\*Tip:?\*\*/im, type: 'info', name: 'Tip' },
    { regex: /^>\s*\[!(NOTE|WARNING|TIP|IMPORTANT|CAUTION)\]/im, type: 'github-alert', name: 'GitHub Alert' }
  ],
  // Required front matter fields
  requiredFrontMatter: ['title'],
  recommendedFrontMatter: ['date', 'weight', 'toc']
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    file: null,
    dir: CONFIG.defaultContentDir,
    verbose: false,
    json: false
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file' && args[i + 1]) {
      options.file = args[i + 1];
      i++;
    } else if (args[i] === '--dir' && args[i + 1]) {
      options.dir = args[i + 1];
      i++;
    } else if (args[i] === '--verbose') {
      options.verbose = true;
    } else if (args[i] === '--json') {
      options.json = true;
    }
  }

  return options;
}

// Find markdown files recursively
function findFiles(dir, files = []) {
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
      findFiles(relativePath, files);
    } else if (CONFIG.fileExtensions.some(ext => item.endsWith(ext))) {
      files.push({ absolute: itemPath, relative: relativePath });
    }
  }

  return files;
}

// Parse Front Matter
function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);

  if (!match) {
    return { raw: null, parsed: {}, endIndex: 0 };
  }

  const parsed = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      parsed[key] = value;
    }
  }

  return {
    raw: match[1],
    parsed,
    endIndex: match[0].length
  };
}

// Analyze Front Matter
function analyzeFrontMatter(frontMatter) {
  const issues = [];
  const recommendations = [];

  // Check required fields
  for (const field of CONFIG.requiredFrontMatter) {
    if (!frontMatter.parsed[field]) {
      issues.push({
        type: 'missing_required',
        field,
        message: `Missing required field: ${field}`
      });
    }
  }

  // Check recommended fields
  for (const field of CONFIG.recommendedFrontMatter) {
    if (!frontMatter.parsed[field]) {
      recommendations.push({
        type: 'missing_recommended',
        field,
        message: `Consider adding: ${field}`
      });
    }
  }

  // Specific recommendations
  if (!frontMatter.parsed.toc) {
    recommendations.push({
      type: 'toc',
      message: 'Add `toc: true` for documents with multiple headings'
    });
  }

  if (!frontMatter.parsed.weight && frontMatter.parsed.type === 'docs') {
    recommendations.push({
      type: 'weight',
      message: 'Add `weight` for sidebar ordering in docs section'
    });
  }

  return { issues, recommendations };
}

// Analyze headings
function analyzeHeadings(content) {
  const headings = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const match = line.match(/^(#{1,6})\s+(.+)/);
    if (match) {
      headings.push({
        level: match[1].length,
        text: match[2].trim(),
        line: index + 1
      });
    }
  });

  const issues = [];

  // Check for H1 in content (should be in front matter title)
  const h1Count = headings.filter(h => h.level === 1).length;
  if (h1Count > 0) {
    issues.push({
      type: 'h1_in_content',
      message: 'H1 found in content. Use front matter title instead.',
      locations: headings.filter(h => h.level === 1).map(h => h.line)
    });
  }

  // Check heading hierarchy
  const levels = headings.map(h => h.level);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      issues.push({
        type: 'heading_skip',
        message: `Heading level skipped at line ${headings[i].line}`,
        from: levels[i - 1],
        to: levels[i]
      });
    }
  }

  return {
    headings,
    counts: {
      h1: headings.filter(h => h.level === 1).length,
      h2: headings.filter(h => h.level === 2).length,
      h3: headings.filter(h => h.level === 3).length,
      h4: headings.filter(h => h.level === 4).length,
      h5: headings.filter(h => h.level === 5).length,
      h6: headings.filter(h => h.level === 6).length
    },
    issues
  };
}

// Detect shortcode opportunities
function detectShortcodeOpportunities(content) {
  const opportunities = {
    callouts: [],
    steps: [],
    details: [],
    cards: [],
    tabs: []
  };

  const lines = content.split('\n');

  // Detect callout patterns
  lines.forEach((line, index) => {
    for (const pattern of CONFIG.calloutPatterns) {
      if (pattern.regex.test(line)) {
        opportunities.callouts.push({
          line: index + 1,
          text: line.substring(0, 80),
          suggestedType: pattern.type,
          pattern: pattern.name
        });
      }
    }
  });

  // Detect sequential numbered lists (potential steps)
  let numberedListStart = -1;
  let numberedListCount = 0;

  lines.forEach((line, index) => {
    const isNumberedItem = /^\d+\.\s/.test(line);

    if (isNumberedItem) {
      if (numberedListStart === -1) {
        numberedListStart = index + 1;
      }
      numberedListCount++;
    } else if (numberedListStart !== -1 && numberedListCount >= 3) {
      opportunities.steps.push({
        startLine: numberedListStart,
        endLine: index,
        itemCount: numberedListCount
      });
      numberedListStart = -1;
      numberedListCount = 0;
    } else if (!isNumberedItem && line.trim() !== '') {
      numberedListStart = -1;
      numberedListCount = 0;
    }
  });

  // Detect FAQ patterns (potential details)
  lines.forEach((line, index) => {
    if (/^(Q:|FAQ|よくある質問|\?)/i.test(line.trim())) {
      opportunities.details.push({
        line: index + 1,
        text: line.substring(0, 60)
      });
    }
  });

  // Detect related links section (potential cards)
  lines.forEach((line, index) => {
    if (/^(##?\s*(関連|Related|See Also|参考|Links))/i.test(line)) {
      // Look ahead for links
      const nextLines = lines.slice(index + 1, index + 10);
      const linkCount = nextLines.filter(l => /\[.+\]\(.+\)/.test(l)).length;

      if (linkCount >= 2) {
        opportunities.cards.push({
          line: index + 1,
          heading: line,
          linkCount
        });
      }
    }
  });

  return opportunities;
}

// Analyze content statistics
function analyzeContentStats(content, frontMatterEndIndex) {
  const bodyContent = content.substring(frontMatterEndIndex);

  // Count paragraphs (text blocks separated by blank lines)
  const paragraphs = bodyContent.split(/\n\n+/).filter(p => p.trim().length > 0);

  // Count code blocks
  const codeBlocks = (bodyContent.match(/```[\s\S]*?```/g) || []).length;

  // Count lists
  const bulletLists = (bodyContent.match(/^[-*]\s/gm) || []).length;
  const numberedLists = (bodyContent.match(/^\d+\.\s/gm) || []).length;

  // Count words (rough estimate)
  const cleanContent = bodyContent
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  const words = cleanContent.match(/[\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+/g) || [];

  return {
    wordCount: words.length,
    paragraphCount: paragraphs.length,
    codeBlockCount: codeBlocks,
    bulletListItems: bulletLists,
    numberedListItems: numberedLists
  };
}

// Check existing shortcodes
function detectExistingShortcodes(content) {
  const shortcodes = [];

  // Detect {{< >}} style
  const angleMatches = content.matchAll(/\{\{<\s*(\w+)/g);
  for (const match of angleMatches) {
    shortcodes.push({ type: match[1], style: 'angle' });
  }

  // Detect {{% %}} style
  const percentMatches = content.matchAll(/\{\{%\s*(\w+)/g);
  for (const match of percentMatches) {
    shortcodes.push({ type: match[1], style: 'percent' });
  }

  return shortcodes;
}

// Main analysis function
function analyzeContent(content, filePath) {
  const frontMatter = parseFrontMatter(content);
  const frontMatterAnalysis = analyzeFrontMatter(frontMatter);
  const headingAnalysis = analyzeHeadings(content);
  const shortcodeOpportunities = detectShortcodeOpportunities(content);
  const contentStats = analyzeContentStats(content, frontMatter.endIndex);
  const existingShortcodes = detectExistingShortcodes(content);

  return {
    file: filePath,
    frontMatter: {
      current: frontMatter.parsed,
      issues: frontMatterAnalysis.issues,
      recommendations: frontMatterAnalysis.recommendations
    },
    headings: headingAnalysis,
    shortcodeOpportunities,
    contentStats,
    existingShortcodes
  };
}

// Generate report
function generateReport(results, options) {
  if (options.json) {
    console.log(JSON.stringify(results, null, 2));
    return;
  }

  for (const result of results) {
    console.log(`# Content Optimization Report\n`);
    console.log(`## File: ${result.file}\n`);

    // Front Matter Analysis
    console.log(`### Front Matter Analysis\n`);

    console.log(`#### Current Front Matter`);
    if (Object.keys(result.frontMatter.current).length > 0) {
      for (const [key, value] of Object.entries(result.frontMatter.current)) {
        console.log(`- ${key}: ${value}`);
      }
    } else {
      console.log(`No front matter found.`);
    }
    console.log('');

    if (result.frontMatter.issues.length > 0) {
      console.log(`#### Issues`);
      result.frontMatter.issues.forEach(issue => {
        console.log(`- ${issue.message}`);
      });
      console.log('');
    }

    if (result.frontMatter.recommendations.length > 0) {
      console.log(`#### Recommendations`);
      result.frontMatter.recommendations.forEach(rec => {
        console.log(`- ${rec.message}`);
      });
      console.log('');
    }

    // Shortcode Opportunities
    console.log(`### Shortcode Opportunities\n`);

    if (result.shortcodeOpportunities.callouts.length > 0) {
      console.log(`#### Callouts (Found: ${result.shortcodeOpportunities.callouts.length})`);
      result.shortcodeOpportunities.callouts.forEach(opp => {
        console.log(`- Line ${opp.line}: "${opp.pattern}" pattern detected`);
        console.log(`  Suggest: \`{{% callout type="${opp.suggestedType}" %}}\``);
      });
      console.log('');
    }

    if (result.shortcodeOpportunities.steps.length > 0) {
      console.log(`#### Steps (Found: ${result.shortcodeOpportunities.steps.length})`);
      result.shortcodeOpportunities.steps.forEach(opp => {
        console.log(`- Lines ${opp.startLine}-${opp.endLine}: ${opp.itemCount} sequential items`);
        console.log(`  Suggest: \`{{% steps %}}\``);
      });
      console.log('');
    }

    if (result.shortcodeOpportunities.cards.length > 0) {
      console.log(`#### Cards (Found: ${result.shortcodeOpportunities.cards.length})`);
      result.shortcodeOpportunities.cards.forEach(opp => {
        console.log(`- Line ${opp.line}: Related links section with ${opp.linkCount} links`);
        console.log(`  Suggest: \`{{< cards >}}\``);
      });
      console.log('');
    }

    if (result.shortcodeOpportunities.details.length > 0) {
      console.log(`#### Details/FAQ (Found: ${result.shortcodeOpportunities.details.length})`);
      result.shortcodeOpportunities.details.forEach(opp => {
        console.log(`- Line ${opp.line}: FAQ pattern detected`);
        console.log(`  Suggest: \`{{< details title="..." closed="true" >}}\``);
      });
      console.log('');
    }

    const totalOpportunities =
      result.shortcodeOpportunities.callouts.length +
      result.shortcodeOpportunities.steps.length +
      result.shortcodeOpportunities.cards.length +
      result.shortcodeOpportunities.details.length;

    if (totalOpportunities === 0) {
      console.log(`No shortcode opportunities detected.\n`);
    }

    // Heading Analysis
    console.log(`### Structure Analysis\n`);

    console.log(`#### Headings`);
    console.log(`- H1: ${result.headings.counts.h1}${result.headings.counts.h1 > 0 ? ' (should be 0 - use front matter title)' : ''}`);
    console.log(`- H2: ${result.headings.counts.h2}`);
    console.log(`- H3: ${result.headings.counts.h3}`);
    if (result.headings.counts.h4 > 0) console.log(`- H4: ${result.headings.counts.h4}`);
    console.log('');

    if (result.headings.issues.length > 0) {
      console.log(`#### Heading Issues`);
      result.headings.issues.forEach(issue => {
        console.log(`- ${issue.message}`);
      });
      console.log('');
    }

    // Content Stats
    console.log(`#### Content Stats`);
    console.log(`- Word count: ${result.contentStats.wordCount}`);
    console.log(`- Paragraphs: ${result.contentStats.paragraphCount}`);
    console.log(`- Code blocks: ${result.contentStats.codeBlockCount}`);
    console.log(`- List items: ${result.contentStats.bulletListItems + result.contentStats.numberedListItems}`);
    console.log('');

    // Existing Shortcodes
    if (options.verbose && result.existingShortcodes.length > 0) {
      console.log(`### Existing Shortcodes`);
      const shortcodeCounts = {};
      result.existingShortcodes.forEach(sc => {
        shortcodeCounts[sc.type] = (shortcodeCounts[sc.type] || 0) + 1;
      });
      for (const [type, count] of Object.entries(shortcodeCounts)) {
        console.log(`- ${type}: ${count}`);
      }
      console.log('');
    }

    console.log('---\n');
  }
}

// Main execution
function main() {
  const options = parseArgs();
  const projectRoot = path.join(__dirname, '..', '..', '..');

  let filesToAnalyze = [];

  if (options.file) {
    const fullPath = path.isAbsolute(options.file)
      ? options.file
      : path.join(projectRoot, options.file);

    if (fs.existsSync(fullPath)) {
      filesToAnalyze = [{ absolute: fullPath, relative: options.file }];
    } else {
      console.error(`File not found: ${options.file}`);
      process.exit(1);
    }
  } else {
    filesToAnalyze = findFiles(options.dir);
  }

  if (filesToAnalyze.length === 0) {
    console.log('No files found to analyze.');
    process.exit(0);
  }

  const results = [];

  for (const file of filesToAnalyze) {
    try {
      const content = fs.readFileSync(file.absolute, 'utf8');
      const analysis = analyzeContent(content, file.relative);
      results.push(analysis);
    } catch (error) {
      if (!options.json) {
        console.error(`Error analyzing ${file.relative}: ${error.message}`);
      }
    }
  }

  generateReport(results, options);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  analyzeContent,
  parseFrontMatter,
  analyzeHeadings,
  detectShortcodeOpportunities
};
