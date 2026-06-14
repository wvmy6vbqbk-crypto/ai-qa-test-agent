const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const requestPath = path.join(__dirname, "../prompts/test-request.json");
const outputPath = path.join(__dirname, "../tests/generated-login.spec.js");

const request = JSON.parse(fs.readFileSync(requestPath, "utf-8"));

console.log("🤖 AI QA Test Agent started");
console.log("--------------------------");
console.log(`Feature: ${request.feature}`);
console.log(`Test cases: ${request.testCases.length}`);

const generatedTests = request.testCases
  .map((testCase) => {
    const urlCheck = testCase.expectedUrl
      ? `\n  await expect(page).toHaveURL(/${testCase.expectedUrl}/);`
      : "";

    return `
test('${testCase.name}', async ({ page }) => {
  await page.goto('${request.url}');

  await page.locator('#username').fill('${testCase.username}');
  await page.locator('#password').fill('${testCase.password}');

  await page.locator('button[type="submit"]').click();
  ${urlCheck}
  await expect(page.locator('#flash')).toContainText('${testCase.expectedMessage}');
});
`;
  })
  .join("\n");

const testCode = `
const { test, expect } = require('@playwright/test');

${generatedTests}
`;

fs.writeFileSync(outputPath, testCode.trim());

console.log("✅ Test file generated:");
console.log(outputPath);

console.log("\n▶️ Running generated Playwright tests...\n");

try {
  execSync("npx playwright test tests/generated-login.spec.js", {
    stdio: "inherit",
  });

  console.log("\n✅ QA Agent result: All tests passed");
} catch (error) {
  console.log("\n❌ QA Agent result: Some tests failed");
  process.exit(1);
}