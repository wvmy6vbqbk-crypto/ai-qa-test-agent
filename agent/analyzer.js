function analyzeResult(result, testCount) {
  console.log("\n📊 Execution Summary");
  console.log("--------------------");
  console.log(`Total tests: ${testCount}`);
  console.log(`Status: ${result.success ? "PASSED" : "FAILED"}`);
  console.log(`Duration: ${(result.durationMs / 1000).toFixed(2)}s`);

  if (result.success) {
    console.log("\n✅ Recommendation: Regression passed successfully.");
  } else {
    console.log("\n❌ Recommendation: Check failing Playwright report and trace.");
  }
}

module.exports = { analyzeResult };