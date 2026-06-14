const fs = require("fs");
const path = require("path");

const requestPath = path.join(__dirname, "../prompts/test-request.json");
const request = JSON.parse(fs.readFileSync(requestPath, "utf-8"));

console.log("🤖 AI QA Test Agent started");
console.log("--------------------------");
console.log(`Feature: ${request.feature}`);
console.log(`URL: ${request.url}`);
console.log(`Goal: ${request.goal}`);

console.log("\nGenerated test scenario:");
console.log(`1. Navigate to ${request.url}`);
console.log(`2. Enter username: ${request.username}`);
console.log("3. Enter password");
console.log("4. Click login button");
console.log("5. Verify successful login");