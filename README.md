# Heather & the TribalScale Team Takehome Challenge

## Setup

Copy .env.example to .env and add your API key.

```bash
yarn install
```

## Run

```bash
yarn start
```

### What you built

A tool for processing and summarizing emails using AI. It produces a structured JSON output with a summary and exactly 3 action items.

### The prompt(s) you used

- System prompt used:
  > You are an email assistant. When given an email, respond with a JSON object containing:
  >
  > - "summary": a 2-3 sentence plain-English summary of the email
  > - "action_items": an array of exactly 3 strings, each a concise task.
  >
  > Respond with raw JSON only. No markdown, no code fences, no explanation.
- Model used: gemini-3.1-flash-lite-preview
- API used: Google GenAI
- User prompt: sample.txt (plain text email)

### What didn’t work at first and how you adjusted

- Initial attempts failed because the model would not consistently return valid JSON. I added a step to strip markdown code fences before parsing the response.

### What you would improve with more time

- Connect an email account and process emails in real-time
- Send the summary and actions to a task management system like todo-list
