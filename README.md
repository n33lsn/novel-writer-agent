# Inkstone

Inkstone is an AI-powered novel writing workspace built with Next.js, TypeScript, and React.

## Features

- Multi-novel dashboard with create, rename, delete, and switch actions
- Cloud persistence through Supabase with row-level security
- Debounced autosave with save-state feedback and local fallback
- Editable chapter manuscript, characters, AI story partner, export
- Story Architect and Continuity Check at `/studio`
- Supabase email/password authentication at `/auth`

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

For cloud workspaces, configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, run `supabase/schema.sql`, and enable Supabase Email authentication. Signed-out users can still work locally; signed-in users can create and sync multiple novels.
