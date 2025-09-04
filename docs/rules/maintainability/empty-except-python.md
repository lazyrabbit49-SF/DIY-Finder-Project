# Empty Except Block - Python

## Overview
This rule detects empty except blocks in Python code that silently suppress exceptions, making debugging difficult and hiding potential errors.

## Rule Type
**Composite Rule** - Uses `any` to match multiple patterns

## Pattern
```yaml
rule:
  any:
    - pattern: |
        try:
            $$$
        except:
            pass
    - pattern: |
        try:
            $$$
        except Exception:
            pass
```

## What It Detects
- Empty except blocks with bare `except:`
- Empty except blocks with `except Exception:`
- Silent exception suppression
- Bare `pass` statements in exception handlers

## AST-Grep Pattern Explanation
- `any:` - Composite rule that matches if any sub-rule matches
- `try:` - Matches try block start
- `$$$` - Matches any content in try block
- `except:` - Matches bare except clause
- `except Exception:` - Matches specific exception type
- `pass` - Matches the pass statement (empty block)

## Real Examples from Codebase
```python
# These will be detected:
try:
    process_data()
except:
    pass

try:
    risky_operation()
except Exception:
    pass

try:
    api_call()
except (ValueError, TypeError):
    pass  # Still empty!
```

## Maintainability Impact
- **Debugging Difficulty**: Errors are silently ignored
- **Hidden Bugs**: Problems go unnoticed until they cause bigger issues
- **Poor Error Handling**: No logging or user feedback
- **Production Issues**: Silent failures in production

## How to Fix
```python
# Bad - Empty except block
try:
    process_data()
except:
    pass

# Good - Proper error handling
try:
    process_data()
except Exception as e:
    logger.error(f"Failed to process data: {e}")
    raise

# Good - Specific exception handling
try:
    api_call()
except requests.RequestException as e:
    logger.warning(f"API call failed: {e}")
    return None

# Good - User-friendly error handling
try:
    risky_operation()
except ValueError as e:
    show_error_to_user(f"Invalid input: {e}")
except Exception as e:
    logger.error(f"Unexpected error: {e}")
    show_error_to_user("An unexpected error occurred")
```

## Best Practices
- Always log exceptions for debugging
- Provide user-friendly error messages
- Re-raise exceptions when appropriate
- Handle specific exception types when possible
- Use proper logging levels (error, warning, info)

## References
- [AST-Grep Pattern Documentation](https://ast-grep.github.io/guide/rule-config.html)
- [CodeRabbit AST Instructions](https://docs.coderabbit.ai/guides/review-instructions#abstract-syntax-tree-ast-based-instructions)
