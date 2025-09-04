# Inefficient Re-renders - TypeScript

## Overview
This rule detects inline objects and functions in JSX that cause unnecessary re-renders of React components, leading to performance issues.

## Rule Type
**Atomic Rule** - Matches a single syntax node pattern

## Pattern
```yaml
rule:
  pattern: "<$COMPONENT $PROPS={{$$$OBJECT}}"
```

## What It Detects
- Inline objects in JSX props
- Inline functions in JSX props
- Objects created on every render
- Functions created on every render

## AST-Grep Pattern Explanation
- `<$COMPONENT` - Matches JSX component opening tag
- `$PROPS={{$$$OBJECT}}` - Matches props with inline object syntax
- `{{$$$OBJECT}}` - Matches the inline object literal

## Real Examples from Codebase
```typescript
// These will be detected:
<Component style={{margin: 10, padding: 5}} />

<Button onClick={() => handleClick()} />

<Input onChange={(e) => setValue(e.target.value)} />

<Card className="item" style={{backgroundColor: 'red'}} />
```

## Performance Impact
- **Unnecessary Re-renders**: Child components re-render on every parent render
- **Memory Usage**: New objects/functions created on each render
- **CPU Usage**: Expensive re-rendering calculations
- **Poor User Experience**: Slower UI interactions

## How to Fix
```typescript
// Bad - Inline objects and functions
function MyComponent() {
    return (
        <div>
            <Component style={{margin: 10}} />
            <Button onClick={() => handleClick()} />
            <Input onChange={(e) => setValue(e.target.value)} />
        </div>
    );
}

// Good - Move objects and functions outside render
function MyComponent() {
    const style = {margin: 10};
    const handleClick = useCallback(() => {
        // handle click logic
    }, []);
    
    const handleChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);
    
    return (
        <div>
            <Component style={style} />
            <Button onClick={handleClick} />
            <Input onChange={handleChange} />
        </div>
    );
}

// Good - Using useMemo for objects
function MyComponent() {
    const style = useMemo(() => ({
        margin: 10,
        padding: 5
    }), []);
    
    return <Component style={style} />;
}

// Good - Using useCallback for functions
function MyComponent() {
    const handleClick = useCallback(() => {
        // handle click logic
    }, []);
    
    return <Button onClick={handleClick} />;
}

// Good - Using CSS classes instead of inline styles
function MyComponent() {
    return <Component className="my-component" />;
}
```

## Best Practices
- Move objects and functions outside render
- Use `useMemo` for expensive object creation
- Use `useCallback` for event handlers
- Use CSS classes instead of inline styles
- Avoid creating new objects/functions in render
- Use React.memo for expensive components

## Additional Context
Inline objects and functions in JSX are a common React performance anti-pattern. They create new references on every render, causing child components to re-render unnecessarily. This rule helps identify these patterns for optimization.

## References
- [AST-Grep Pattern Documentation](https://ast-grep.github.io/guide/rule-config.html)
- [CodeRabbit AST Instructions](https://docs.coderabbit.ai/guides/review-instructions#abstract-syntax-tree-ast-based-instructions)
