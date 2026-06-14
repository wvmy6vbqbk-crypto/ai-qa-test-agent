const fs = require("fs");
const path = require("path");

function loadTestRequest() {
  const requestPath = path.join(__dirname, "../prompts/test-request.json");
  const request = JSON.parse(fs.readFileSync(requestPath, "utf-8"));

  if (!request.feature) {
    throw new Error("Missing required field: feature");
  }

  if (!request.url) {
    throw new Error("Missing required field: url");
  }

  if (!request.testCases || !Array.isArray(request.testCases)) {
    throw new Error("Missing required field: testCases");
  }

  return request;
}

module.exports = { loadTestRequest };