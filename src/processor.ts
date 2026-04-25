import { GoogleGenAI } from "@google/genai";
import type { EmailAnalysis } from "./types";

const SYSTEM_PROMPT = `You are an email assistant. When given an email, respond with a JSON object containing:
- "summary": a 2-3 sentence plain-English summary of the email
- "action_items": an array of exactly 3 strings, each a concise task.

Respond with raw JSON only. No markdown, no code fences, no explanation.`;

const MODEL_NAME = "gemini-3.1-flash-lite-preview";

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

async function processEmail(emailText: string): Promise<EmailAnalysis> {
  const response = await genAI.models.generateContent({
    model: MODEL_NAME,
    contents: emailText,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.2,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          summary: { type: "string" },
          action_items: { type: "array", items: { type: "string" } },
        },
        required: ["summary", "action_items"],
      },
    },
  });

  const raw = response.text;
  if (!raw) throw new Error("No response from Gemini.");

  // Strip accidental markdown fences if the model slips up
  const cleaned = raw
    .replace(/^```(?:json)?\n?/, "")
    .replace(/\n?```$/, "")
    .trim();

  const parsed: EmailAnalysis = JSON.parse(cleaned);

  if (
    !parsed.summary ||
    !Array.isArray(parsed.action_items) ||
    parsed.action_items.length < 3
  ) {
    throw new Error(`Unexpected response shape: ${raw}`);
  }

  // Take first 3 action items
  parsed.action_items = parsed.action_items.slice(0, 3);

  return parsed;
}

export { processEmail };
