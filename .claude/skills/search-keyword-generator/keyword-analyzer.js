#!/usr/bin/env node

/**
 * Search Keyword Analyzer
 *
 * Analyzes Hugo content files and suggests search keywords
 * for FlexSearch optimization.
 *
 * Usage:
 *   node keyword-analyzer.js [options]
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
  // Common Japanese stop words
  stopWordsJa: [
    'の', 'に', 'は', 'を', 'た', 'が', 'で', 'て', 'と', 'し', 'れ', 'さ',
    'ある', 'いる', 'する', 'こと', 'もの', 'これ', 'それ', 'あれ',
    'この', 'その', 'あの', 'です', 'ます', 'など', 'について', 'ため'
  ],
  // Common English stop words
  stopWordsEn: [
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'this',
    'that', 'these', 'those', 'it', 'its', 'you', 'your', 'we', 'our'
  ],
  // Technical terms to prioritize
  techTerms: [
    'Hugo', 'Hextra', 'Tailwind', 'CSS', 'HTML', 'JavaScript', 'TypeScript',
    'Node.js', 'npm', 'API', 'REST', 'GraphQL', 'JSON', 'YAML', 'Markdown',
    'Git', 'GitHub', 'Netlify', 'Vercel', 'Docker', 'Kubernetes',
    'React', 'Vue', 'Angular', 'Next.js', 'Nuxt', 'Svelte'
  ],
  // Action words to include
  actionWords: [
    'インストール', 'install', '設定', 'setup', 'configure', 'configuration',
    'デプロイ', 'deploy', 'deployment', 'ビルド', 'build', '作成', 'create',
    '更新', 'update', '削除', 'delete', '追加', 'add', '変更', 'change',
    '使い方', 'usage', 'how to', 'tutorial', 'ガイド', 'guide',
    'トラブルシューティング', 'troubleshooting', 'エラー', 'error', '解決', 'fix'
  ]
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

// Recursively find markdown files
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
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

  if (!frontMatterMatch) {
    return {};
  }

  const frontMatter = {};
  const lines = frontMatterMatch[1].split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      frontMatter[key] = value;
    }
  }

  return frontMatter;
}

// Extract headings from content
function extractHeadings(content) {
  const headings = [];
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2].trim()
    });
  }

  return headings;
}

// Extract existing keywords
function extractExistingKeywords(content) {
  const keywordRegex = /<span\s+class=["']hx:sr-only["']>([^<]+)<\/span>/gi;
  const matches = [];

  let match;
  while ((match = keywordRegex.exec(content)) !== null) {
    matches.push(match[1].trim());
  }

  return matches;
}

// Check if word is a stop word
function isStopWord(word) {
  const lowerWord = word.toLowerCase();
  return CONFIG.stopWordsJa.includes(word) ||
         CONFIG.stopWordsEn.includes(lowerWord) ||
         word.length <= 1;
}

// Check if word is a tech term
function isTechTerm(word) {
  return CONFIG.techTerms.some(term =>
    term.toLowerCase() === word.toLowerCase()
  );
}

// Check if word is an action word
function isActionWord(word) {
  return CONFIG.actionWords.some(action =>
    action.toLowerCase() === word.toLowerCase() ||
    word.toLowerCase().includes(action.toLowerCase())
  );
}

// Extract words from text
function extractWords(text) {
  // Remove markdown syntax
  const cleanText = text
    .replace(/```[\s\S]*?```/g, '') // Code blocks
    .replace(/`[^`]+`/g, '') // Inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
    .replace(/[#*_~]/g, '') // Markdown formatting
    .replace(/{{[^}]+}}/g, '') // Shortcodes
    .replace(/<[^>]+>/g, ''); // HTML tags

  // Extract words (Japanese and English)
  const words = [];

  // English words
  const englishWords = cleanText.match(/[a-zA-Z][a-zA-Z0-9.-]*[a-zA-Z0-9]|[a-zA-Z]/g) || [];
  words.push(...englishWords);

  // Japanese words (simplified - just extract continuous Japanese characters)
  const japaneseWords = cleanText.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+/g) || [];
  words.push(...japaneseWords);

  return words;
}

// Calculate word frequency
function calculateFrequency(words) {
  const frequency = {};

  for (const word of words) {
    if (!isStopWord(word)) {
      const key = word.toLowerCase();
      frequency[key] = (frequency[key] || 0) + 1;
    }
  }

  return frequency;
}

// Analyze content and extract keywords
function analyzeContent(content, filePath) {
  const frontMatter = parseFrontMatter(content);
  const headings = extractHeadings(content);
  const existingKeywords = extractExistingKeywords(content);
  const words = extractWords(content);
  const frequency = calculateFrequency(words);

  // Categorize keywords by priority
  const keywords = {
    highest: new Set(),
    high: new Set(),
    medium: new Set(),
    low: new Set()
  };

  // Highest priority: Title
  if (frontMatter.title) {
    const titleWords = extractWords(frontMatter.title);
    for (const word of titleWords) {
      if (!isStopWord(word)) {
        keywords.highest.add(word);
      }
    }
  }

  // Highest priority: Headings
  for (const heading of headings) {
    if (heading.level <= 3) {
      const headingWords = extractWords(heading.text);
      for (const word of headingWords) {
        if (!isStopWord(word) && word.length > 2) {
          keywords.highest.add(word);
        }
      }
    }
  }

  // High priority: Tech terms
  for (const word of Object.keys(frequency)) {
    if (isTechTerm(word)) {
      keywords.high.add(CONFIG.techTerms.find(t => t.toLowerCase() === word.toLowerCase()) || word);
    }
    if (isActionWord(word)) {
      keywords.high.add(word);
    }
  }

  // Medium priority: Frequent words
  const sortedByFrequency = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30);

  for (const [word, count] of sortedByFrequency) {
    if (count >= 2 && word.length > 2 && !isStopWord(word)) {
      if (!keywords.highest.has(word) && !keywords.high.has(word)) {
        keywords.medium.add(word);
      }
    }
  }

  // Generate suggested implementation
  const allKeywords = [
    ...keywords.highest,
    ...keywords.high,
    ...Array.from(keywords.medium).slice(0, 10)
  ].slice(0, 25);

  const suggestedImplementation = `{{< rawhtml >}}
<span class="hx:sr-only">${allKeywords.join(' ')}</span>
{{< /rawhtml >}}`;

  return {
    file: filePath,
    frontMatter,
    headings: headings.slice(0, 10),
    existingKeywords,
    keywords: {
      highest: Array.from(keywords.highest),
      high: Array.from(keywords.high),
      medium: Array.from(keywords.medium).slice(0, 15)
    },
    suggestedKeywords: allKeywords,
    suggestedImplementation,
    wordCount: words.length
  };
}

// Generate report
function generateReport(results, options) {
  if (options.json) {
    console.log(JSON.stringify(results, null, 2));
    return;
  }

  for (const result of results) {
    console.log(`# Keyword Analysis Report\n`);
    console.log(`## File: ${result.file}\n`);

    if (result.frontMatter.title) {
      console.log(`**Title:** ${result.frontMatter.title}\n`);
    }

    console.log(`**Word Count:** ${result.wordCount}\n`);

    // Existing keywords
    if (result.existingKeywords.length > 0) {
      console.log(`### Existing Keywords`);
      console.log(`\`\`\`\n${result.existingKeywords.join('\n')}\n\`\`\`\n`);
    } else {
      console.log(`### Existing Keywords\nNone found.\n`);
    }

    // Extracted keywords
    console.log(`### Extracted Keywords\n`);

    if (result.keywords.highest.length > 0) {
      console.log(`#### Highest Priority`);
      result.keywords.highest.forEach(kw => console.log(`- ${kw}`));
      console.log('');
    }

    if (result.keywords.high.length > 0) {
      console.log(`#### High Priority`);
      result.keywords.high.forEach(kw => console.log(`- ${kw}`));
      console.log('');
    }

    if (options.verbose && result.keywords.medium.length > 0) {
      console.log(`#### Medium Priority`);
      result.keywords.medium.forEach(kw => console.log(`- ${kw}`));
      console.log('');
    }

    // Suggested implementation
    console.log(`### Suggested Implementation\n`);
    console.log(`\`\`\`markdown\n${result.suggestedImplementation}\n\`\`\`\n`);

    // Summary
    console.log(`### Summary`);
    console.log(`- Highest priority keywords: ${result.keywords.highest.length}`);
    console.log(`- High priority keywords: ${result.keywords.high.length}`);
    console.log(`- Medium priority keywords: ${result.keywords.medium.length}`);
    console.log(`- Total suggested: ${result.suggestedKeywords.length}\n`);

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
  extractWords,
  parseFrontMatter,
  extractHeadings
};
