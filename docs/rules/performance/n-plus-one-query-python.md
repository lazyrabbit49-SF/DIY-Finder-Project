# N+1 Query Problem - Python

## Overview
This rule detects potential N+1 query problems in Python code where database queries are executed inside loops, causing performance issues.

## Rule Type
**Atomic Rule** - Matches a single syntax node pattern

## Pattern
```yaml
rule:
  pattern: |
    for $ITEM in $COLLECTION:
        $RESULT = get_user_posts($ITEM["id"])
```

## What It Detects
- Database queries inside loops
- N+1 query anti-patterns
- Inefficient database access patterns
- Potential performance bottlenecks

## AST-Grep Pattern Explanation
- `for $ITEM in $COLLECTION:` - Matches for loop iteration
- `$RESULT = get_user_posts($ITEM["id"])` - Matches database query inside loop
- `get_user_posts` - Matches specific function call pattern

## Real Examples from Codebase
```python
# This will be detected:
for user in users:
    posts = get_user_posts(user["id"])

# Similar patterns that would be detected:
for item in items:
    details = get_item_details(item["id"])

for order in orders:
    products = get_order_products(order["id"])
```

## Performance Impact
- **N+1 Queries**: One query to get N records, then N additional queries
- **Database Load**: Excessive database connections and queries
- **Response Time**: Slow API responses due to multiple round trips
- **Scalability**: Performance degrades linearly with data size

## How to Fix
```python
# Bad - N+1 query problem
for user in users:
    posts = get_user_posts(user["id"])  # N queries

# Good - Single query with join
def get_users_with_posts():
    query = """
    SELECT u.*, p.* 
    FROM users u 
    LEFT JOIN posts p ON u.id = p.user_id
    """
    return execute_query(query)

# Good - Bulk operations
def get_posts_for_users(user_ids):
    query = "SELECT * FROM posts WHERE user_id IN ({})".format(
        ','.join(['?' for _ in user_ids])
    )
    return execute_query(query, user_ids)

# Usage:
user_ids = [user["id"] for user in users]
all_posts = get_posts_for_users(user_ids)
posts_by_user = {post["user_id"]: post for post in all_posts}

# Good - Using ORM with eager loading
from sqlalchemy.orm import joinedload

users = session.query(User).options(joinedload(User.posts)).all()
for user in users:
    posts = user.posts  # No additional query needed

# Good - Using Django ORM with select_related/prefetch_related
users = User.objects.prefetch_related('posts').all()
for user in users:
    posts = user.posts.all()  # No additional query needed
```

## Best Practices
- Use JOINs to fetch related data in single queries
- Use bulk operations for multiple records
- Use ORM features like eager loading
- Consider caching for frequently accessed data
- Use database indexes for foreign keys
- Monitor query performance with profiling tools

## Additional Context
The N+1 query problem is a common database performance issue. This rule helps identify patterns where multiple database queries are executed in loops, which can be optimized with proper JOINs or bulk operations.

## References
- [AST-Grep Pattern Documentation](https://ast-grep.github.io/guide/rule-config.html)
- [CodeRabbit AST Instructions](https://docs.coderabbit.ai/guides/review-instructions#abstract-syntax-tree-ast-based-instructions)
