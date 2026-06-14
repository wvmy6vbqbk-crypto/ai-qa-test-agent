const { execSync } = require("child_process");

function runPlaywrightTests(testPath) {
  const startTime = Date.now();

  try {
    execSync(`npx playwright test ${testPath}`, {
      stdio: "inherit",
    });

    return {
      success: true,
      durationMs: Date.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      durationMs: Date.now() - startTime,
      error,
    };
  }
}

module.exports = { runPlaywrightTests };