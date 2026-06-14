const fs = require("fs");
const path = require("path");

function createReport(request, result) {
  const reportPath = path.join(__dirname, "../reports/summary.json");

  const report = {
    feature: request.feature,
    totalTests: request.testCases.length,
    status: result.success ? "PASSED" : "FAILED",
    durationSeconds: Number((result.durationMs / 1000).toFixed(2)),
    generatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log("\n📝 Report created:");
  console.log(reportPath);
}

module.exports = { createReport };