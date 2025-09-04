# Commented Code - Python

## Overview
This rule detects commented out code blocks in Python that should be removed to keep the codebase clean.

## Rule Type
**Atomic Rule** - Matches a single syntax node pattern

## Pattern
```yaml
rule:
  pattern: |
    # $CODE
    # $CODE
    # $CODE
```

## What It Detects
- Multiple consecutive lines of commented code
- Commented out function calls
- Commented out variable assignments
- Commented out control flow statements

## AST-Grep Pattern Explanation
- `# $CODE` - Matches commented lines with actual code
- Multiple consecutive matches indicate a code block

## Real Examples from Codebase
```python
# These will be detected:
def process_data(data):
    # result = old_processing_function(data)
    # if result:
    #     return result
    return new_processing_function(data)

def calculate_total(items):
    # total = 0
    # for item in items:
    #     total += item.price
    return sum(item.price for item in items)
```

## Maintainability Impact
- **Clutter**: Commented code makes files harder to read
- **Confusion**: Unclear if code is temporary or permanent
- **Maintenance**: Commented code can become outdated
- **Version Control**: Better to use git history than commented code

## How to Fix
```python
# Bad - Commented code blocks
def process_data(data):
    # result = old_processing_function(data)
    # if result:
    #     return result
    return new_processing_function(data)

# Good - Clean code without comments
def process_data(data):
    return new_processing_function(data)

# Good - Use version control instead
def process_data(data):
    # TODO: Consider adding fallback to old processing
    return new_processing_function(data)
```

## Best Practices
- Remove commented code blocks
- Use version control (git) to track code history
- Use TODO comments for future work instead of commented code
- Keep only essential comments that explain why, not what
- Use docstrings for function documentation

## References
- [AST-Grep Pattern Documentation](https://ast-grep.github.io/guide/rule-config.html)
- [CodeRabbit AST Instructions](https://docs.coderabbit.ai/guides/review-instructions#abstract-syntax-tree-ast-based-instructions)
