# SQL Injection - Python

## Overview
This rule detects SQL injection vulnerabilities in Python code where user input is directly concatenated into SQL queries without proper parameterization.

## Rule Type
**Atomic Rule** - Matches a single syntax node pattern

## Pattern
```yaml
rule:
  pattern: cursor.execute($QUERY)
```

## What It Detects
- Direct execution of SQL queries without parameterization
- String concatenation in SQL queries
- f-string SQL queries with user input
- Any `cursor.execute()` call that could contain user input

## AST-Grep Pattern Explanation
- `cursor.execute` - Matches the database cursor execute method
- `($QUERY)` - Matches any argument passed to execute (could be vulnerable)

## Real Examples from Codebase
```python
# These will be detected:
cursor.execute("SELECT * FROM users WHERE username = '" + username + "'")
cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")
cursor.execute("INSERT INTO items (name) VALUES ('" + item_name + "')")

# Even these (though they might be safe):
cursor.execute("SELECT * FROM users")
cursor.execute("PRAGMA table_info(users)")
```

## Security Impact
- **Critical Risk**: Allows attackers to execute arbitrary SQL commands
- **Data Breach**: Can lead to unauthorized data access or modification
- **System Compromise**: Potential for complete database takeover

## How to Fix
```python
# Bad - SQL injection vulnerable
query = f"SELECT * FROM users WHERE username = '{username}'"
cursor.execute(query)

# Good - Parameterized query
query = "SELECT * FROM users WHERE username = ?"
cursor.execute(query, (username,))

# Good - Using named parameters
query = "SELECT * FROM users WHERE username = :username"
cursor.execute(query, {"username": username})
```

## Additional Context
This rule is intentionally broad to catch potential SQL injection patterns. Some legitimate uses (like schema queries) will also be flagged, but it's better to be safe and review each case.

## References
- [AST-Grep Pattern Documentation](https://ast-grep.github.io/guide/rule-config.html)
- [CodeRabbit AST Instructions](https://docs.coderabbit.ai/guides/review-instructions#abstract-syntax-tree-ast-based-instructions)
