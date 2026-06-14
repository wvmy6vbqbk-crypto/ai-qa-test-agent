const fs = require("fs");
const path = require("path");

const requestPath = path.join(__dirname, "../prompts/test-request.json");
const outputPath = path.join(__dirname, "../tests/generated-login.spec.js");

const request = JSON.parse(fs.readFileSync(requestPath, "utf-8"));

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

console.log("🤖 AI QA Test Agent");
console.log("------------------");
console.log(`Feature: ${request.feature}`);
console.log(`Generated Playwright test: ${outputPath}`);