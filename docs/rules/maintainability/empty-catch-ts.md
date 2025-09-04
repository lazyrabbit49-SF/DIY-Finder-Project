# Empty Catch Block - TypeScript

## Overview
This rule detects empty catch blocks in TypeScript/JavaScript code that silently suppress exceptions, making debugging difficult and hiding potential errors.

## Rule Type
**Atomic Rule** - Matches a single syntax node pattern

## Pattern
```yaml
rule:
  pattern: |
    try {
        $$$
    } catch ($ERR) {
    }
```

## What It Detects
- Empty catch blocks in try-catch statements
- Silent exception suppression
- Missing error handling logic
- Bare catch blocks without error handling

## AST-Grep Pattern Explanation
- `try {` - Matches try block start
- `$$$` - Matches any content in try block
- `} catch ($ERR) {` - Matches catch block with error parameter
- `}` - Matches empty catch block (no content)

## Real Examples from Codebase
```typescript
// These will be detected:
try {
    await fetchData();
} catch (error) {
}

try {
    processUserInput();
} catch (err) {
    // Empty catch block
}

try {
    riskyOperation();
} catch (e) {
    // TODO: Handle error
}
```

## Maintainability Impact
- **Debugging Difficulty**: Errors are silently ignored
- **Hidden Bugs**: Problems go unnoticed until they cause bigger issues
- **Poor User Experience**: No feedback when operations fail
- **Production Issues**: Silent failures in production

## How to Fix
```typescript
// Bad - Empty catch block
try {
    await fetchData();
} catch (error) {
}

// Good - Proper error handling
try {
    await fetchData();
} catch (error) {
    console.error('Failed to fetch data:', error);
    showErrorToUser('Data loading failed');
}

// Good - Specific error handling
try {
    await apiCall();
} catch (error) {
    if (error instanceof NetworkError) {
        showNetworkError();
    } else {
        console.error('Unexpected error:', error);
        showGenericError();
    }
}

// Good - Error logging and re-throwing
try {
    await processData();
} catch (error) {
    logger.error('Data processing failed:', error);
    throw error; // Re-throw for higher level handling
}
```

## Frontend-Specific Considerations
- Always provide user feedback for failed operations
- Use appropriate error boundaries in React
- Log errors for debugging purposes
- Consider retry mechanisms for network operations
- Show loading states and error states in UI

## Best Practices
- Always handle errors appropriately
- Provide user-friendly error messages
- Log errors for debugging
- Use specific error types when possible
- Consider error boundaries for React components

## References
- [AST-Grep Pattern Documentation](https://ast-grep.github.io/guide/rule-config.html)
- [CodeRabbit AST Instructions](https://docs.coderabbit.ai/guides/review-instructions#abstract-syntax-tree-ast-based-instructions)
