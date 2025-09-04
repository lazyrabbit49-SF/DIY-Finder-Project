# Console Log - TypeScript

## Overview
This rule detects `console.log` statements in TypeScript/JavaScript code that should be replaced with proper logging mechanisms in production code.

## Rule Type
**Atomic Rule** - Matches a single syntax node pattern

## Pattern
```yaml
rule:
  pattern: "console.log($EXPR)"
```

## What It Detects
- `console.log` statements in production code
- Debug statements left in code
- Improper logging practices
- Statements that should use proper logging frameworks

## AST-Grep Pattern Explanation
- `console.log` - Matches console.log method calls
- `($EXPR)` - Matches any expression passed to console.log

## Real Examples from Codebase
```typescript
// These will be detected:
console.log("User logged in:", loggedInUser)

console.log("Debug info:", data)

console.log("Error occurred:", error)
```

## Maintainability Impact
- **Production Issues**: Console logs can expose sensitive information
- **Performance**: Console statements can impact performance
- **Debugging**: Makes it hard to control logging levels
- **Professional Code**: Console logs are not suitable for production

## How to Fix
```typescript
// Bad - Console log in production code
console.log("User logged in:", loggedInUser)

// Good - Proper logging with levels
import { logger } from './logger'

logger.info("User logged in", { username: loggedInUser.username })

// Good - Conditional logging
if (process.env.NODE_ENV === 'development') {
  console.log("Debug info:", data)
}

// Good - Error logging
logger.error("Error occurred", { error: error.message, stack: error.stack })

// Good - Using a logging library
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

logger.info("User action", { action: 'login', userId: user.id })
```

## Frontend-Specific Considerations
- Use proper error boundaries in React
- Consider using logging services like Sentry for error tracking
- Use development-only logging with environment checks
- Implement proper error handling instead of console logs
- Use toast notifications or UI feedback for user-facing messages

## Best Practices
- Use proper logging frameworks (winston, pino, etc.)
- Implement different log levels (error, warn, info, debug)
- Never log sensitive information
- Use structured logging with context
- Remove or conditionally include debug statements
- Use error tracking services for production

## References
- [AST-Grep Pattern Documentation](https://ast-grep.github.io/guide/rule-config.html)
- [CodeRabbit AST Instructions](https://docs.coderabbit.ai/guides/review-instructions#abstract-syntax-tree-ast-based-instructions)

