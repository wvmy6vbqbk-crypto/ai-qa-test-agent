const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const suitesDir = path.join(__dirname, "../suites");
const promptFile = path.join(__dirname, "../prompts/test-request.json");

const files = fs.readdirSync(suitesDir).filter((file) => file.endsWith(".json"));

for (const file of files) {
  console.log(`\n🚀 Running suite: ${file}`);

  fs.copyFileSync(
    path.join(suitesDir, file),
    promptFile
  );

  execSync("node agent/qa-agent.js", {
    stdio: "inherit",
  });
}