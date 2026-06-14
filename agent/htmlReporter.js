const fs = require("fs");
const path = require("path");

function createHtmlReport(request, result) {
  const reportPath = path.join(__dirname, "../reports/index.html");

  const status = result.success ? "PASSED" : "FAILED";
  const duration = (result.durationMs / 1000).toFixed(2);
  const generatedAt = new Date().toLocaleString();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>QA Agent Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
    .card { background: white; padding: 24px; border-radius: 12px; max-width: 800px; }
    .passed { color: green; font-weight: bold; }
    .failed { color: red; font-weight: bold; }
    table { border-collapse: collapse; width: 100%; margin-top: 20px; }
    td, th { border: 1px solid #ddd; padding: 12px; }
    th { background: #eee; text-align: left; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🤖 QA Agent Report</h1>
    <p><strong>Feature:</strong> ${request.feature}</p>
    <p><strong>Status:</strong> <span class="${result.success ? "passed" : "failed"}">${status}</span></p>

    <table>
      <tr><th>Metric</th><th>Value</th></tr>
      <tr><td>Total Tests</td><td>${request.testCases.length}</td></tr>
      <tr><td>Duration</td><td>${duration}s</td></tr>
      <tr><td>Generated At</td><td>${generatedAt}</td></tr>
    </table>

    <h2>Test Cases</h2>
    <ul>
      ${request.testCases.map((testCase) => `<li>${testCase.name}</li>`).join("")}
    </ul>
  </div>
</body>
</html>
`;

  fs.writeFileSync(reportPath, html.trim());
  console.log("🌐 HTML report created:");
  console.log(reportPath);
}

module.exports = { createHtmlReport };