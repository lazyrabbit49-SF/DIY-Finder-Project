# Weak Password - Python

## Overview
This rule detects weak passwords in Python code that are easily guessable or commonly used default passwords.

## Rule Type
**Atomic Rule** - Matches a single syntax node pattern

## Pattern
```yaml
rule:
  pattern: $VAR = "password123"
```

## What It Detects
- Specific weak password: "password123"
- Common default passwords
- Easily guessable passwords
- Hardcoded weak credentials

## AST-Grep Pattern Explanation
- `$VAR` - Matches any variable name
- `=` - Matches the assignment operator
- `"password123"` - Matches the specific weak password string

## Real Examples from Codebase
```python
# This will be detected:
WEAK_PASSWORD = "password123"
DEFAULT_PASSWORD = "password123"
ADMIN_PASSWORD = "password123"
```

## Security Impact
- **High Risk**: Weak passwords are easily compromised
- **Brute Force**: Can be cracked quickly with automated tools
- **Default Credentials**: Often the first thing attackers try

## How to Fix
```python
# Bad - Weak password
password = "password123"

# Good - Strong password with proper hashing
import bcrypt
password = "MyStr0ng!P@ssw0rd"
hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

# Good - Environment variable
import os
password = os.getenv("ADMIN_PASSWORD")

# Good - Password generation
import secrets
import string
password = ''.join(secrets.choice(string.ascii_letters + string.digits + string.punctuation) for _ in range(16))
```

## Additional Context
This rule currently detects the specific password "password123" as an example. In a real-world scenario, you might want to expand this to detect other common weak passwords using regex patterns.

## References
- [AST-Grep Pattern Documentation](https://ast-grep.github.io/guide/rule-config.html)
- [CodeRabbit AST Instructions](https://docs.coderabbit.ai/guides/review-instructions#abstract-syntax-tree-ast-based-instructions)
