# Debug Prints - Python

## Overview
This rule detects debug print statements in Python code that should be replaced with proper logging.

## Rule Type
**Atomic Rule** - Matches a single syntax node pattern

## Pattern
```yaml
rule:
  pattern: |
    print(f"DEBUG: $MESSAGE")
```

## What It Detects
- Debug print statements with f-strings
- Print statements used for debugging
- Temporary debugging code left in production

## AST-Grep Pattern Explanation
- `print(f"DEBUG: $MESSAGE")` - Matches print statements with DEBUG prefix
- `$MESSAGE` - Matches any message content

## Real Examples from Codebase
```python
# These will be detected:
def process_data(data):
    print(f"DEBUG: Processing data: {data}")
    result = process(data)
    print(f"DEBUG: Result: {result}")
    return result

def get_vision_analysis(image_data):
    print(f"DEBUG: Original image_data length: {len(image_data)}")
    print(f"DEBUG: Image data starts with: {image_data[:50]}...")
```

## Maintainability Impact
- **Production Issues**: Debug prints can expose sensitive information
- **Performance**: Print statements can impact performance
- **Logging**: Makes it hard to control logging levels
- **Professional Code**: Debug prints are not suitable for production

## How to Fix
```python
# Bad - Debug print statements
def process_data(data):
    print(f"DEBUG: Processing data: {data}")
    result = process(data)
    print(f"DEBUG: Result: {result}")
    return result

# Good - Proper logging
import logging

logger = logging.getLogger(__name__)

def process_data(data):
    logger.debug(f"Processing data: {data}")
    result = process(data)
    logger.debug(f"Result: {result}")
    return result

# Good - Conditional debugging
import os

def process_data(data):
    if os.getenv('DEBUG'):
        print(f"DEBUG: Processing data: {data}")
    result = process(data)
    if os.getenv('DEBUG'):
        print(f"DEBUG: Result: {result}")
    return result
```

## Best Practices
- Use proper logging frameworks (logging, structlog, etc.)
- Implement different log levels (DEBUG, INFO, WARNING, ERROR)
- Never log sensitive information
- Use structured logging with context
- Remove debug prints before production deployment
- Use environment variables to control debug output

## References
- [AST-Grep Pattern Documentation](https://ast-grep.github.io/guide/rule-config.html)
- [CodeRabbit AST Instructions](https://docs.coderabbit.ai/guides/review-instructions#abstract-syntax-tree-ast-based-instructions)
