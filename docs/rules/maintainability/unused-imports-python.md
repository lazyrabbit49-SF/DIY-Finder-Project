# Unused Imports - Python

## Overview
This rule detects unused imports in Python code that should be removed to keep the codebase clean and reduce import overhead.

## Rule Type
**Atomic Rule** - Matches a single syntax node pattern

## Pattern
```yaml
rule:
  pattern: |
    import $MODULE
    $$$
    # No usage of $MODULE found in the rest of the file
```

## What It Detects
- Import statements for modules that are never used
- Unused standard library imports
- Unused third-party package imports
- Import statements that add unnecessary dependencies

## AST-Grep Pattern Explanation
- `import $MODULE` - Matches import statements
- `$$$` - Matches any content in the file
- The rule checks if the imported module is actually used

## Real Examples from Codebase
```python
# These will be detected:
import json  # Used
import os    # NOT used - should trigger rule
import sys   # NOT used - should trigger rule

def process_data():
    data = {"test": "value"}
    return json.dumps(data)  # json is used, but os and sys are not
```

## Maintainability Impact
- **Bundle Size**: Unused imports increase import overhead
- **Clarity**: Makes it unclear what dependencies a module actually uses
- **Maintenance**: Can lead to confusion about actual dependencies
- **Performance**: Unnecessary import time and memory usage

## How to Fix
```python
# Bad - Unused imports
import json
import os    # Not used
import sys   # Not used
import re    # Not used

def process_data():
    data = {"test": "value"}
    return json.dumps(data)

# Good - Only import what you use
import json

def process_data():
    data = {"test": "value"}
    return json.dumps(data)

# Good - Import specific functions
from json import dumps

def process_data():
    data = {"test": "value"}
    return dumps(data)
```

## Best Practices
- Only import what you actually use
- Use specific imports when possible (`from module import function`)
- Regularly clean up unused imports
- Use tools like `autoflake` or IDE features to remove unused imports
- Consider using `__all__` to explicitly define public API

## References
- [AST-Grep Pattern Documentation](https://ast-grep.github.io/guide/rule-config.html)
- [CodeRabbit AST Instructions](https://docs.coderabbit.ai/guides/review-instructions#abstract-syntax-tree-ast-based-instructions)
