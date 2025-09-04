# Commented Code - TypeScript

## Overview
This rule detects commented out code blocks in TypeScript/JavaScript that should be removed to keep the codebase clean.

## Rule Type
**Atomic Rule** - Matches a single syntax node pattern

## Pattern
```yaml
rule:
  pattern: |
    // $CODE
    // $CODE
    // $CODE
```

## What It Detects
- Multiple consecutive lines of commented code
- Commented out function calls
- Commented out variable assignments
- Commented out JSX elements

## AST-Grep Pattern Explanation
- `// $CODE` - Matches commented lines with actual code
- Multiple consecutive matches indicate a code block

## Real Examples from Codebase
```typescript
// These will be detected:
function processData(data: any) {
  // const result = oldProcessingFunction(data);
  // if (result) {
  //   return result;
  // }
  return newProcessingFunction(data);
}

function MyComponent() {
  // const [oldState, setOldState] = useState(null);
  // useEffect(() => {
  //   // old logic
  // }, []);
  return <div>New content</div>;
}
```

## Maintainability Impact
- **Clutter**: Commented code makes files harder to read
- **Confusion**: Unclear if code is temporary or permanent
- **Bundle Size**: Commented code still gets processed by bundlers
- **Maintenance**: Commented code can become outdated

## How to Fix
```typescript
// Bad - Commented code blocks
function processData(data: any) {
  // const result = oldProcessingFunction(data);
  // if (result) {
  //   return result;
  // }
  return newProcessingFunction(data);
}

// Good - Clean code without comments
function processData(data: any) {
  return newProcessingFunction(data);
}

// Good - Use version control instead
function processData(data: any) {
  // TODO: Consider adding fallback to old processing
  return newProcessingFunction(data);
}
```

## Best Practices
- Remove commented code blocks
- Use version control (git) to track code history
- Use TODO comments for future work instead of commented code
- Keep only essential comments that explain why, not what
- Use JSDoc for function documentation

## References
- [AST-Grep Pattern Documentation](https://ast-grep.github.io/guide/rule-config.html)
- [CodeRabbit AST Instructions](https://docs.coderabbit.ai/guides/review-instructions#abstract-syntax-tree-ast-based-instructions)
