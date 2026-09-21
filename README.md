# Inkstone

Inkstone is an AI-powered novel writing workspace built with Next.js, TypeScript, and React.

## Included

- Responsive novel dashboard with writing metrics
- Persistent browser storage for chapters and characters
- Editable manuscript with chapter management
- Character library and world bible
- Markdown export
- Story Partner API using OpenAI `gpt-4o-mini`

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Add `OPENAI_API_KEY` to `.env.local` to enable live AI assistance. Without a key, the app still runs and explains how to enable it.

Data is currently stored in the browser's local storage. Production next steps are authentication, a database, streaming responses, and DOCX export.
