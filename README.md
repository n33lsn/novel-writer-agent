# Inkstone

Inkstone is an AI-powered novel writing workspace built with Next.js, TypeScript, and React.

## Features

- Multi-novel dashboard with create, rename, delete, and switch actions
- Supabase cloud persistence with debounced autosave and local fallback
- Professional manuscript workflow: search, focus mode, chapter reordering, duplication, deletion, and word counts
- Lightweight writing toolbar with selection formatting
- Version history with restore for structural edits
- Character library, AI Story Partner, Markdown export
- Story Architect and Continuity Check at `/studio`
- Supabase email/password authentication at `/auth`

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Configure Supabase and run `supabase/schema.sql` for cloud workspaces. Signed-out users can still work locally. Revisions are stored inside each project's JSON data and capped at the latest 20 snapshots.
