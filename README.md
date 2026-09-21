# Inkstone

Inkstone is an AI-powered novel writing workspace built with Next.js, TypeScript, and React. It combines a manuscript editor with story planning tools and an AI story partner.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Add an `OPENAI_API_KEY` to `.env.local` to connect the story partner to OpenAI.

## MVP

- Novel dashboard with writing progress
- Manuscript workspace and chapter outline
- Story-partner prompt panel
- Responsive layout
- API route ready for AI-assisted brainstorming and revision

Next steps can include persistent storage, authentication, rich text editing, character/world-bible views, streaming responses, and DOCX export.
