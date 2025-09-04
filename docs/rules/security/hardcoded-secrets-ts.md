# Hardcoded Secrets - TypeScript

## Overview
This rule detects hardcoded secrets in TypeScript/JavaScript code, such as API keys, passwords, tokens, and other sensitive credentials that should never be committed to version control.

## Rule Type
**Atomic Rule** - Matches a single syntax node pattern

## Pattern
```yaml
rule:
  pattern: 'const $KEY = "$SECRET"'
```

## What It Detects
- API keys (e.g., `const API_KEY = "sk-1234567890abcdef"`)
- Database passwords (e.g., `const DB_PASSWORD = "mypassword123"`)
- JWT secrets (e.g., `const JWT_SECRET = "my_secret_key"`)
- OAuth tokens (e.g., `const OAUTH_TOKEN = "ghp_1234567890"`)
- Any const string assignment that looks like a credential

## AST-Grep Pattern Explanation
- `const` - Matches const declaration keyword
- `$KEY` - Matches any variable name
- `=` - Matches the assignment operator
- `"$SECRET"` - Matches any string literal in double quotes

## Real Examples from Codebase
```typescript
// These will be detected:
const API_KEY = "sk-1234567890abcdef"
const DATABASE_URL = "postgresql://user:pass@localhost/db"
const JWT_SECRET = "my_secret_jwt_key"
const STRIPE_KEY = "sk_test_1234567890"
```

## Security Impact
- **High Risk**: Exposed credentials can lead to unauthorized access
- **Data Breach**: API keys can be used to access external services
- **Client-Side Exposure**: Frontend secrets are visible to all users
- **Compliance Issues**: Violates security best practices and regulations

## How to Fix
```typescript
// Bad - Hardcoded secret
const API_KEY = "sk-1234567890abcdef"

// Good - Environment variable
const API_KEY = process.env.REACT_APP_API_KEY

// Good - Configuration object
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  apiUrl: process.env.REACT_APP_API_URL
}

// Good - Type-safe environment variables
interface EnvConfig {
  apiKey: string
  apiUrl: string
}

const env: EnvConfig = {
  apiKey: process.env.REACT_APP_API_KEY!,
  apiUrl: process.env.REACT_APP_API_URL!
}
```

## Frontend-Specific Considerations
- Frontend secrets are visible to all users in the browser
- Use environment variables with `REACT_APP_` prefix for React apps
- Consider using a backend proxy for sensitive operations
- Never put production secrets in frontend code

## References
- [AST-Grep Pattern Documentation](https://ast-grep.github.io/guide/rule-config.html)
- [CodeRabbit AST Instructions](https://docs.coderabbit.ai/guides/review-instructions#abstract-syntax-tree-ast-based-instructions)
