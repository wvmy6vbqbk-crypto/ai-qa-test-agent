const fs = require("fs");
const path = require("path");

function generateStep(step) {
  switch (step.action) {
    case "fill":
      return `await page.locator('${step.selector}').fill('${step.value}');`;

    case "click":
      return `await page.locator('${step.selector}').click();`;

    case "expectText":
      return `await expect(page.locator('${step.selector}')).toContainText('${step.value}');`;

    case "expectUrl":
      return `await expect(page).toHaveURL(/${step.value}/);`;
    
    case "smartClick":
      return `await clickWithHealing(page, '${step.selector}');`;

    default:
      throw new Error(`Unknown action: ${step.action}`);
  }
}

function generatePlaywrightTest(request) {
  const outputPath = path.join(
    __dirname,
    "../tests/generated-test.spec.js"
  );

  const tests = request.testCases
  .map((testCase) => {
    if (!testCase.name) {
      throw new Error("Each test case needs a name");
    }

    if (!testCase.steps || !Array.isArray(testCase.steps)) {
      throw new Error(`Test case "${testCase.name}" needs a valid steps array`);
    }

   const steps = testCase.steps.map(generateStep).join("\n  ");

      return `
test('${testCase.name}', async ({ page }) => {
  await page.goto('${request.url}');
  ${steps}
});
`;
    })
    .join("\n");

  const code = `
const { test, expect } = require('@playwright/test');
const { clickWithHealing } = require('../agent/selfHealing');

${tests}
`;

  fs.writeFileSync(outputPath, code.trim());

  return outputPath;
}

module.exports = {
  generatePlaywrightTest,
};