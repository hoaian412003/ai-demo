---
name: github-pr-comment
description: "Post a structured, classified comment on a GitHub pull request using the gh CLI"
---

# GitHub PR Comment Skill

Use this skill to post review feedback, questions, suggestions, or status updates on a pull request.

## Prerequisites

Ensure `gh` is authenticated:
```bash
gh auth status
```

## Steps

### 1. Identify the PR

- If a PR number or URL is given, use it directly.
- Otherwise, resolve from the current branch:
  ```bash
  gh pr view --json number,url
  ```

Fetch PR context so the comment is specific and relevant:
```bash
gh pr view <PR> --json number,title,headRefName,baseRefName,author,body
```

### 2. Classify the intent

Determine the comment type from the feedback content:

| Label | When to use |
|-------|-------------|
| ✅ **Approval** | Work looks good; ready to merge |
| 💡 **Suggestion** | Alternative approach worth considering; non-blocking |
| ❓ **Question** | Clarification needed before proceeding |
| 🚨 **Blocker** | Must be fixed before merge; explains why |
| 🔧 **Nit** | Minor style or polish; purely optional |
| 📝 **Note** | FYI context; no action required |

### 3. Build the comment body

Use this template — adapt the sections to the classified type:

```markdown
<label> **<Short title — 60 chars max>**

<1–3 sentences: specific, actionable explanation grounded in the PR changes.>

**Why this matters:** <reason — skip this line for Approval, Nit, and Note>

**Suggested approach:** <concrete alternative or fix — include only for Suggestion and Blocker>
```

**Rules:**
- Be specific: reference file names, function names, or line content when relevant.
- Be concise: no filler phrases like "Great work!" or "Just a thought."
- For Blockers: always explain *why* it must change, not just *what* to change.
- For Approvals: one sentence is enough — no padding.

### 4. Post the comment

```bash
gh pr comment <PR> --body "$(cat <<'EOF'
<body>
EOF
)"
```

### 5. Output

Print the comment URL returned by `gh`. Example:
```
Comment posted: https://github.com/<owner>/<repo>/pull/<number>#issuecomment-<id>
```

## Examples

**Approval:**
```
✅ **Looks good to merge**

Clean implementation, logic is straightforward and the metadata markers make future parsing reliable.
```

**Blocker:**
```
🚨 **JSON must be parsed with jq, not grep**

The current `grep 'chat_id:'` approach breaks when the value contains spaces or the key appears in a comment block.

**Why this matters:** This is the primary mechanism for extracting agent metadata — a silent parse failure here means feedback never reaches the Coder agent.

**Suggested approach:** Use `jq -r '.chat_id // empty'` on the raw API response instead.
```

**Suggestion:**
```
💡 **Consider caching the workspace lookup to avoid duplicate API calls**

`/api/v2/workspaces?name=...` is called in both the feedback and the delete jobs. Extracting it into a reusable composite action would reduce Coder API load.

**Suggested approach:** Create `.github/actions/resolve-workspace/action.yml` with the lookup logic and reference it from both jobs.
```
