# Long Function - Python

## Overview
This rule detects functions that are too long (over 50 lines), which makes them hard to understand, test, and maintain.

## Rule Type
**Composite Rule** - Uses `all` to combine pattern matching with content analysis

## Pattern
```yaml
rule:
  all:
    - pattern: "def $FUNC($ARGS): $$$BODY"
    - has:
        kind: block
        field: body
        has:
          kind: expression_statement
          min: 50
```

## What It Detects
- Functions with more than 50 expression statements
- Long functions that do too many things
- Functions that are hard to read and understand
- Functions that violate the Single Responsibility Principle

## AST-Grep Pattern Explanation
- `all:` - Composite rule that requires all sub-rules to match
- `pattern: "def $FUNC($ARGS): $$$BODY"` - Matches function definition
- `has:` - Relational rule that checks for content within the function
- `kind: block` - Matches the function body block
- `field: body` - Specifies the body field of the block
- `min: 50` - Requires at least 50 expression statements

## Real Examples from Codebase
```python
# This will be detected:
def process_user_data(user_data):
    # 60+ lines of mixed logic
    validate_data(user_data)
    transform_data(user_data)
    save_to_database(user_data)
    send_notification(user_data)
    update_cache(user_data)
    # ... 50+ more lines
    return result
```

## Maintainability Impact
- **Readability**: Long functions are hard to understand
- **Testing**: Difficult to write comprehensive tests
- **Debugging**: Hard to isolate issues
- **Reusability**: Functions do too many things
- **Maintenance**: Changes affect multiple responsibilities

## How to Fix
```python
# Bad - Long function (60+ lines)
def process_user_data(user_data):
    # validation logic
    if not user_data.get('email'):
        raise ValueError("Email required")
    if not user_data.get('name'):
        raise ValueError("Name required")
    # ... 50+ more lines of mixed logic
    return result

# Good - Broken into focused functions
def validate_user_data(data):
    """Validate user input data."""
    if not data.get('email'):
        raise ValueError("Email required")
    if not data.get('name'):
        raise ValueError("Name required")
    return True

def transform_user_data(data):
    """Transform user data for storage."""
    return {
        'email': data['email'].lower().strip(),
        'name': data['name'].title(),
        'created_at': datetime.now()
    }

def process_user_data(user_data):
    """Main function that orchestrates the process."""
    validate_user_data(user_data)
    transformed_data = transform_user_data(user_data)
    return save_user(transformed_data)
```

## Best Practices
- Keep functions under 20 lines when possible
- One function should do one thing (Single Responsibility)
- Extract helper functions for complex logic
- Use descriptive function names
- Add docstrings for complex functions

## References
- [AST-Grep Pattern Documentation](https://ast-grep.github.io/guide/rule-config.html)
- [CodeRabbit AST Instructions](https://docs.coderabbit.ai/guides/review-instructions#abstract-syntax-tree-ast-based-instructions)
