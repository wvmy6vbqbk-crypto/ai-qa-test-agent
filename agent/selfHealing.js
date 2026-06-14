async function clickWithHealing(page, selector) {
  const alternatives = [
    selector,
    "[data-testid='login-button']",
    "button[type='submit']",
    "button",
    "input[type='submit']",
    "text=Login",
    "text=Sign in"
  ];

  for (const candidate of alternatives) {
    try {
      const element = page.locator(candidate).first();

      if (await element.count() > 0) {
        console.log(`✅ Using selector: ${candidate}`);
        await element.click();
        return;
      }
    } catch {
      // Try next selector
    }
  }

  throw new Error(`No working selector found for: ${selector}`);
}

module.exports = {
  clickWithHealing,
};