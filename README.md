# Inkstone

Inkstone is an AI-powered novel writing workspace built with Next.js, TypeScript, and React.

## Features

- Responsive novel dashboard with writing metrics
- Persistent browser storage for chapters and characters
- Editable manuscript with chapter management
- Character library and world bible
- Markdown manuscript export
- Story Partner for context-aware writing help
- Story Architect and Continuity Check at `/studio`
- Supabase email/password authentication at `/auth`
- Supabase session middleware and a row-level-security database schema

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Add `OPENAI_API_KEY` for AI features.

## Enable cloud accounts

1. Create a project at [supabase.com](https://supabase.com).
2. Copy the project URL and anon key into `.env.local` as `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Run `supabase/schema.sql` in the Supabase SQL Editor.
4. Enable Email provider in Supabase Authentication settings.
5. Visit `/auth` to create or access an account.

The current editor still keeps its project draft in local storage. The database schema and authenticated client are ready for the next sync adapter, which should migrate drafts only after the user is signed in. Never expose a Supabase service-role key in the browser.
