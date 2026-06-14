require("dotenv").config();
const OpenAI = require("openai");

async function main() {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await client.responses.create({
    model: "gpt-5.5",
    input: "Say hello in one short sentence.",
  });

  console.log(response.output_text);
}

main().catch(console.error);