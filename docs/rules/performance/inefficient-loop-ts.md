# Inefficient Loop - TypeScript

## Overview
This rule detects inefficient array concatenation patterns in loops that create O(n²) complexity, causing performance issues.

## Rule Type
**Atomic Rule** - Matches a single syntax node pattern

## Pattern
```yaml
rule:
  pattern: |
    for ($INIT; $COND; $UPDATE) {
        $$$
        $ARR = $ARR.concat($ITEM)
        $$$
    }
```

## What It Detects
- Array concatenation inside loops
- O(n²) complexity patterns
- Performance anti-patterns
- Inefficient array operations

## AST-Grep Pattern Explanation
- `for ($INIT; $COND; $UPDATE)` - Matches for loop structure
- `{ $$$` - Matches any content before the concatenation
- `$ARR = $ARR.concat($ITEM)` - Matches array concatenation assignment
- `$$$ }` - Matches any content after the concatenation

## Real Examples from Codebase
```typescript
// These will be detected:
let results = [];
for (let i = 0; i < items.length; i++) {
    results = results.concat(items[i]);
}

let allData = [];
for (const item of dataArray) {
    allData = allData.concat(item.subItems);
}

let combined = [];
for (let i = 0; i < arrays.length; i++) {
    combined = combined.concat(arrays[i]);
}
```

## Performance Impact
- **O(n²) Complexity**: Each concatenation creates a new array
- **Memory Usage**: Multiple array allocations
- **CPU Usage**: Expensive array copying operations
- **Scalability**: Performance degrades quickly with large datasets

## How to Fix
```typescript
// Bad - Inefficient concatenation in loop
let results = [];
for (let i = 0; i < items.length; i++) {
    results = results.concat(items[i]);
}

// Good - Using push with spread operator
let results = [];
for (let i = 0; i < items.length; i++) {
    results.push(...items[i]);
}

// Good - Using flatMap
const results = items.flatMap(item => item);

// Good - Using reduce
const results = items.reduce((acc, item) => [...acc, ...item], []);

// Good - Using concat outside the loop
const results = [].concat(...items);

// Good - Using modern array methods
const results = items.flat();
```

## Best Practices
- Use `push(...array)` instead of `concat()` in loops
- Use `flatMap()` for transforming and flattening
- Use `reduce()` for complex transformations
- Use `flat()` for simple flattening
- Avoid array concatenation inside loops
- Consider using `Set` for unique values

## Additional Context
Array concatenation in loops is a common performance anti-pattern. Each `concat()` operation creates a new array, leading to quadratic time complexity. Modern JavaScript provides better alternatives for most use cases.

## References
- [AST-Grep Pattern Documentation](https://ast-grep.github.io/guide/rule-config.html)
- [CodeRabbit AST Instructions](https://docs.coderabbit.ai/guides/review-instructions#abstract-syntax-tree-ast-based-instructions)
