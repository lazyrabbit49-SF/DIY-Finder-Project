# Unused Imports - TypeScript

## Overview
This rule detects unused imports in TypeScript/JavaScript code that should be removed to keep the codebase clean and reduce bundle size.

## Rule Type
**Atomic Rule** - Matches a single syntax node pattern

## Pattern
```yaml
rule:
  pattern: |
    import $IMPORT from $SOURCE
    $$$
    # No usage of $IMPORT found in the rest of the file
```

## What It Detects
- Import statements for modules that are never used
- Unused React hooks or components
- Unused utility functions or types
- Import statements that add unnecessary bundle size

## AST-Grep Pattern Explanation
- `import $IMPORT from $SOURCE` - Matches import statements
- `$$$` - Matches any content in the file
- The rule checks if the imported item is actually used

## Real Examples from Codebase
```typescript
// These will be detected:
import React, { useState, useEffect } from 'react'  // useEffect not used
import { Button } from './Button'  // Button not used

function MyComponent() {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}
```

## Maintainability Impact
- **Bundle Size**: Unused imports increase bundle size
- **Build Time**: Slower build times due to unnecessary processing
- **Clarity**: Makes it unclear what dependencies a module actually uses
- **Tree Shaking**: Can interfere with proper tree shaking

## How to Fix
```typescript
// Bad - Unused imports
import React, { useState, useEffect } from 'react'
import { Button } from './Button'
import { Card } from './Card'

function MyComponent() {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}

// Good - Only import what you use
import React, { useState } from 'react'

function MyComponent() {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}

// Good - Destructured imports
import { useState } from 'react'

function MyComponent() {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}
```

## Best Practices
- Only import what you actually use
- Use specific imports when possible
- Regularly clean up unused imports
- Use IDE features or tools like ESLint to remove unused imports
- Consider using barrel exports for cleaner imports
- Use TypeScript's `import type` for type-only imports

## References
- [AST-Grep Pattern Documentation](https://ast-grep.github.io/guide/rule-config.html)
- [CodeRabbit AST Instructions](https://docs.coderabbit.ai/guides/review-instructions#abstract-syntax-tree-ast-based-instructions)
