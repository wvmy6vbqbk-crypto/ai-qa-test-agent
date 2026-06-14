const { loadTestRequest } = require("./planner");
const { generatePlaywrightTest } = require("./generator");
const { runPlaywrightTests } = require("./runner");
const { analyzeResult } = require("./analyzer");
const { createReport } = require("./reporter");
const { createHtmlReport } = require("./htmlReporter");

console.log("🤖 AI QA Test Agent v1.0
========================");
console.log("-----------------------------");

try {
  const request = loadTestRequest();

  console.log(`Feature: ${request.feature}`);
  console.log(`Test cases: ${request.testCases.length}`);

  const testPath = generatePlaywrightTest(request);

  console.log("✅ Test file generated:");
  console.log(testPath);

  console.log("\n▶️ Running generated Playwright tests...\n");

  const result = runPlaywrightTests("tests/generated-login.spec.js");

  analyzeResult(result, request.testCases.length);
  createReport(request, result);
  createHtmlReport(request, result);

  if (!result.success) {
    process.exit(1);
  }
} catch (error) {
  console.error("\n❌ QA Agent failed:");
  console.error(error.message);
  process.exit(1);
}