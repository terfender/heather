import fs from "fs";
import path from "path";
import { processEmail } from "./processor";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const filePath = path.resolve("sample.txt");

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const emailText = fs.readFileSync(filePath, "utf-8").trim();

  if (!emailText) {
    console.error("Email file is empty.");
    process.exit(1);
  }

  console.log(`\nProcessing: ${path.basename(filePath)}\n`);

  const result = await processEmail(emailText);

  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
