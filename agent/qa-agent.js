const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const requestPath = path.join(__dirname, "../prompts/test-request.json");
const outputPath = path.join(__dirname, "../tests/generated-login.spec.js");

const request = JSON.parse(fs.readFileSync(requestPath, "utf-8"));

console.log("🤖 AI QA Test Agent started");
console.log("--------------------------");
console.log(`Feature: ${request.feature}`);
console.log(`Goal: ${request.goal}`);

const testCode = `
const { test, expect } = require('@playwright/test');

test('AI generated login test', async ({ page }) => {
  await page.goto('${request.url}');

  await page.locator('#username').fill('${request.username}');
  await page.locator('#password').fill('${request.password}');

  await page.locator('button[type="submit"]').click();

  await expect(page).toHaveURL(/secure/);
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});
`;

fs.writeFileSync(outputPath, testCode.trim());

console.log("✅ Test file generated:");
console.log(outputPath);

console.log("\n▶️ Running Playwright test...\n");

try {
  execSync("npx playwright test tests/generated-login.spec.js", {
    stdio: "inherit",
  });

  console.log("\n✅ QA Agent result: Test passed");
} catch (error) {
  console.log("\n❌ QA Agent result: Test failed");
  process.exit(1);
}