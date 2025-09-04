# Unsafe Eval - Python

## Overview
This rule detects dangerous use of the `eval()` function in Python code, which can lead to code injection vulnerabilities when used with user input.

## Rule Type
**Atomic Rule** - Matches a single syntax node pattern

## Pattern
```yaml
rule:
  pattern: eval($EXPR)
```

## What It Detects
- Direct calls to `eval()` function
- Dynamic code execution
- Potential code injection points
- Unsafe dynamic evaluation

## AST-Grep Pattern Explanation
- `eval` - Matches the eval function name
- `($EXPR)` - Matches any expression passed to eval

## Real Examples from Codebase
```python
# These will be detected:
result = eval(user_input)
value = eval("2 + 2")
expression = eval("len('hello')")
```

## Security Impact
- **Critical Risk**: Allows execution of arbitrary Python code
- **Code Injection**: User input can execute malicious code
- **System Compromise**: Can lead to complete system takeover
- **Data Breach**: Access to sensitive data and files

## How to Fix
```python
# Bad - Dangerous eval usage
result = eval(user_input)

# Good - Safe alternatives for literals
import ast
result = ast.literal_eval(user_input)  # Only for literals

# Good - Specific parsing for your use case
import json
result = json.loads(user_input)  # For JSON

# Good - Mathematical expressions (if needed)
import operator
import re

def safe_eval_math(expr):
    # Only allow numbers and basic operators
    if re.match(r'^[0-9+\-*/().\s]+$', expr):
        return eval(expr)
    else:
        raise ValueError("Invalid expression")
```

## Additional Context
The `eval()` function should almost never be used in production code, especially with user input. If you need dynamic evaluation, consider safer alternatives like `ast.literal_eval()` for literals or specific parsers for your use case.

## References
- [AST-Grep Pattern Documentation](https://ast-grep.github.io/guide/rule-config.html)
- [CodeRabbit AST Instructions](https://docs.coderabbit.ai/guides/review-instructions#abstract-syntax-tree-ast-based-instructions)
