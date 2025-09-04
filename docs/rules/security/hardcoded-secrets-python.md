# Hardcoded Secrets - Python

## Overview
This rule detects hardcoded secrets in Python code, such as API keys, passwords, tokens, and other sensitive credentials that should never be committed to version control.

## Rule Type
**Atomic Rule** - Matches a single syntax node pattern

## Pattern
```yaml
rule:
  pattern: $KEY = "$SECRET"
```

## What It Detects
- API keys (e.g., `API_KEY = "sk-1234567890abcdef"`)
- Database passwords (e.g., `DB_PASSWORD = "mypassword123"`)
- JWT secrets (e.g., `JWT_SECRET = "my_secret_key"`)
- OAuth tokens (e.g., `OAUTH_TOKEN = "ghp_1234567890"`)
- Any string assignment that looks like a credential

## AST-Grep Pattern Explanation
- `$KEY` - Matches any variable name
- `=` - Matches the assignment operator
- `"$SECRET"` - Matches any string literal in double quotes

## Real Examples from Codebase
```python
# These will be detected:
MISTRAL_API_KEY = "aswwqeer234329-08asd90uoaf9"
VOYAGE_API_KEY = "pa-234234fasd-sfdfsdsf"
QDRANT_API_KEY = "5424534399asdfjlj.kkljfsd"
DATABASE_PASSWORD = "admin123"
```

## Security Impact
- **High Risk**: Exposed credentials can lead to unauthorized access
- **Data Breach**: API keys can be used to access external services
- **Compliance Issues**: Violates security best practices and regulations

## How to Fix
```python
# Bad - Hardcoded secret
API_KEY = "sk-1234567890abcdef"

# Good - Environment variable
import os
API_KEY = os.getenv("API_KEY")

# Good - Configuration file (not in version control)
from config import settings
API_KEY = settings.api_key
```

## References
- [AST-Grep Pattern Documentation](https://ast-grep.github.io/guide/rule-config.html)
- [CodeRabbit AST Instructions](https://docs.coderabbit.ai/guides/review-instructions#abstract-syntax-tree-ast-based-instructions)
