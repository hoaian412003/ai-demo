# agents-demo

Test repository for AI workflow automation. Each GitHub issue automatically provisions a Coder workspace with an AI coding agent via GitHub Actions.

## How it works

| Issue event | What happens |
|-------------|-------------|
| Opened | Branch `issue/{number}-{title}` is created; Coder agent receives the task |
| Reopened | Coder agent receives the task again on the existing branch |
| Closed | Coder workspace is deleted |

Label an issue **`hard`** to route it to the senior-coder agent. Unlabelled issues go to the junior-coder agent.

---

## Install Node.js 22

### nvm

```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Reload your shell, then:
nvm install 22
nvm use 22
nvm alias default 22
```

### Verify

```bash
node --version   # v22.x.x
npm --version
```

---

## Agent instructions

Agent behaviour is defined in [`.agents/`](.agents/):

| File | Used when |
|------|-----------|
| [`.agents/AGENTS.md`](.agents/senior.md) | Start Coding on Project

---

## GitHub Secrets required

| Secret | Description |
|--------|-------------|
| `CODER_URL` | Coder server base URL |
| `CODER_TOKEN` | Coder session token |
| `CODER_TEMPLATE_NAME` | Template name or UUID |
| `CODER_ORG_ID` | Organisation UUID (only needed if `CODER_TEMPLATE_NAME` is a UUID) |
| `CODER_MODEL_JUNIOR_ID` | Model config UUID for junior-coder (optional) |
| `CODER_MODEL_SENIOR_ID` | Model config UUID for senior-coder (optional) |
