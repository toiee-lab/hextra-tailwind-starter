---
name: hextra-icon-validator
description: Use this skill when working with Hextra icons to validate icon names against the available icon list. This skill should be invoked whenever you're about to use icon names in Hugo shortcodes, partials, or layouts to ensure they exist in the Hextra theme.
---

# Hextra Icon Validator

This skill validates Hextra icon names to prevent errors from using non-existent icons.

## When to Use

Invoke this skill automatically when:
- Using `{{</* icon "name" */>}}` shortcode
- Using `{{ partial "utils/icon.html" (dict "name" "icon-name") }}` partial
- Adding or editing content that includes icon references
- Reviewing code that uses Hextra icons

## Validation Process

1. **Read the icon list**: Load available icons from `project-docs/hextra-icons.md`
2. **Extract icon names**: Parse the icon list to get all valid icon names
3. **Validate**: Check if the requested icon name exists in the list
4. **Report**:
   - If valid: Confirm the icon exists
   - If invalid: Report error with:
     - The invalid icon name
     - List of similar icon names (using fuzzy matching)
     - Link to full icon list

## Validation Logic

```javascript
// Load icon list from project-docs/hextra-icons.md
// Extract lines that start with "- " (icon list items)
// Create array of valid icon names
// Check if requested icon is in the array
// If not found, suggest similar icons using Levenshtein distance
```

## Example Output

### Valid Icon
```
✓ Icon "github" is valid and available in Hextra theme.
```

### Invalid Icon
```
✗ Icon "githubs" is not available in Hextra theme.

Did you mean one of these?
- github
- gitlab
- gitea

See full icon list: project-docs/hextra-icons.md
```

## Helper Script

This skill uses `icon-search.js` helper script for efficient icon lookup and fuzzy matching.

## Usage by Claude Code

When this skill reports an invalid icon:
1. Claude Code (main) will review the suggested alternatives
2. Choose the most appropriate valid icon based on context
3. Update the code with the correct icon name
4. Optionally explain the change to the user

## Important Notes

- This skill ONLY validates - it does NOT modify files
- File modifications are handled by Claude Code main conversation
- Always check icon names before committing changes
- The skill can validate multiple icons at once if needed
