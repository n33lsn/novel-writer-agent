# Inkstone

Inkstone is an AI-powered novel writing workspace built with Next.js, TypeScript, and React.

## Features

- Responsive novel dashboard with writing metrics
- Editable manuscript with chapter management
- Character library and world bible
- Markdown manuscript export
- Story Partner, Story Architect, and Continuity Check AI workflows
- Supabase email/password authentication at `/auth`
- Cloud sync for the main novel project with row-level security
- Local-storage fallback when Supabase is not configured or the user is signed out

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Add `OPENAI_API_KEY` for AI features.

## Enable authentication and sync

1. Create a project at [supabase.com](https://supabase.com).
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.
3. Run `supabase/schema.sql` in the Supabase SQL Editor.
4. Enable the Email provider in Supabase Authentication settings.
5. Visit `/auth`, create an account, then return to the writer.

Signed-in users load and save the main project (`The Orchard at the End of Rain`) in the `projects` table. Signed-out users retain the local browser draft. Never expose a Supabase service-role key in the browser.
