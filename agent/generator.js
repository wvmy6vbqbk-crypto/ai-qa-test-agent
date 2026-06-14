const fs = require("fs");
const path = require("path");

function generatePlaywrightTest(request) {
  const outputPath = path.join(__dirname, "../tests/generated-login.spec.js");

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

  return outputPath;
}

module.exports = { generatePlaywrightTest };