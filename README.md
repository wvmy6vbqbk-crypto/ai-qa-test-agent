# AI QA Test Agent

A small portfolio project demonstrating how an AI-assisted QA agent can support test automation workflows.

## What it does

- Reads a test request from JSON
- Generates a Playwright test file
- Runs automated E2E tests
- Can be executed locally and in CI via GitHub Actions

## Tech Stack

- JavaScript
- Node.js
- Playwright
- GitHub Actions

## Example Workflow

```bash
node agent/qa-agent.js
npx playwright test tests/generated-login.spec.js