# Inkstone

Inkstone is an AI-powered novel writing workspace built with Next.js, TypeScript, and React.

## Features

- Responsive novel dashboard with writing metrics
- Persistent browser storage for chapters and characters
- Editable manuscript with chapter management
- Character library and world bible
- Markdown manuscript export
- Story Partner for context-aware writing help
- **Story Architect** at `/studio` for premise-to-outline generation
- **Continuity Check** at `/studio` for timeline, motivation, and world-rule review

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Add `OPENAI_API_KEY` to `.env.local` to enable live AI assistance, story architecture, and continuity checking. Without a key, the app explains how to enable the AI features.

Data in the MVP is stored in browser local storage. Production hardening should add authentication, a database, streaming responses, rate limits, and DOCX/PDF export.
