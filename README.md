# AI QA Test Agent

A modular AI-inspired QA automation framework built with Node.js and Playwright.

The agent reads structured test requirements, generates Playwright tests, executes them automatically, analyzes the result, and creates JSON and HTML reports.

## Features

- Modular QA agent architecture
- JSON-based test definitions
- Automatic Playwright test generation
- Self-healing click action
- Automatic test execution
- JSON execution summary
- HTML dashboard report
- Playwright traces, screenshots and videos on failure
- GitHub Actions CI support
- Reusable example test definitions

## Architecture

```text
prompts/test-request.json
        |
        v
Planner
        |
        v
Generator
        |
        v
Playwright Test
        |
        v
Runner
        |
        v
Analyzer
        |
        v
JSON Report + HTML Dashboard

Project Structure

agent/
  qa-agent.js        # Main orchestrator
  planner.js         # Loads and validates test requirements
  generator.js       # Generates Playwright test code
  runner.js          # Runs generated tests
  analyzer.js        # Prints execution summary
  reporter.js        # Creates JSON report
  htmlReporter.js    # Creates HTML dashboard
  selfHealing.js     # Provides self-healing selector logic

prompts/
  test-request.json  # Active test definition
  requirements.md    # Optional natural language requirement draft

examples/
  login.json
  search.json
  contact-form.json

tests/
  generated-test.spec.js

reports/
  summary.json
  index.html

Example Test Definition

{
  "feature": "Login",
  "url": "https://the-internet.herokuapp.com/login",
  "testCases": [
    {
      "name": "Valid Login",
      "steps": [
        { "action": "fill", "selector": "#username", "value": "tomsmith" },
        { "action": "fill", "selector": "#password", "value": "SuperSecretPassword!" },
        { "action": "smartClick", "selector": "#login-button" },
        { "action": "expectUrl", "value": "secure" },
        { "action": "expectText", "selector": "#flash", "value": "You logged into a secure area!" }
      ]
    }
  ]
}

Supported Actions

Action				Description
fill				Fills an input field
click				Clicks an element
smartClick			Clicks an element with fallback selectors
expectText			Verifies visible text
expectUrl			Verifies the current URL

Installation
npm install
npx playwright install

Run the QA Agent
node agent/qa-agent.js

Open HTML Report
open reports/index.html

Run Playwright Tests Directly
npx playwright test

CI
The project includes a GitHub Actions workflow for running Playwright tests automatically.

Roadmap
* Markdown-to-testcase conversion
* Auto bug report generation
* Generic selector healing configuration
* Recorder mode for creating test definitions from browser actions
* Optional LLM integration