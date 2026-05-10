---
name: github-pr
description: "Create a GitHub pull request with a structured template using the gh CLI"
---

# GitHub PR Creation Skill

Use this skill whenever you need to open a pull request after finishing work on a branch.

## Prerequisites

Ensure `gh` is authenticated:
```bash
gh auth status
```

If not authenticated, run `gh auth login` before proceeding.

## Steps

### 1. Collect context

Run these to understand what changed:

```bash
git branch --show-current
git log main...HEAD --oneline
git diff main...HEAD --stat
git diff main...HEAD
```

Also check if a PR already exists for this branch:
```bash
gh pr list --head "$(git branch --show-current)" --json number,url
```

If a PR already exists, print its URL and stop — do not open a duplicate.

### 2. Derive title

Format: `<type>(<scope>): <imperative summary>` — keep it under 72 characters.

| Type | When to use |
|------|-------------|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `refactor` | Code restructuring without behavior change |
| `chore` | Tooling, config, CI, dependencies |
| `docs` | Documentation only |
| `test` | Tests only |

Infer `scope` from the files changed (e.g., `auth`, `api`, `workflow`, `ui`).

### 3. Build the PR body

Use **exactly** this template — fill every section, omit none:

```markdown
## Summary

<One concise sentence explaining what this PR does and why.>

- <Key change bullet 1>
- <Key change bullet 2>
- <Key change bullet 3 — add more or remove as needed>

## Type of change

- [ ] Bug fix
- [ ] New feature
- [ ] Refactor / cleanup
- [ ] Chore / config / CI
- [ ] Documentation

## What changed

<Brief prose: the implementation approach, any non-obvious decisions, trade-offs made.>

## Test plan

- [ ] <Specific thing to verify — command to run, behavior to check, etc.>
- [ ] <Another verification step>

## Related

<!-- Use "Closes #N" to auto-close the linked issue on merge -->
Closes #<issue-number>
```

### 4. Create the PR

```bash
gh pr create \
  --title "<title>" \
  --body "$(cat <<'EOF'
<body>
EOF
)"
```

- If a specific base branch is needed, add `--base <branch>`.
- Do **not** use `--fill` — always use the template above.
- Do **not** open a draft unless the task explicitly says so.

### 5. Output

Print the PR URL returned by `gh`. Example:
```
PR created: https://github.com/<owner>/<repo>/pull/<number>
```
