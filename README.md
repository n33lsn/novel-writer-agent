# Inkstone

## New: memory engine, quality control, and author controls

Open `/command` for the command center. It provides:

- Scene-to-memory extraction for characters, events, and unresolved threads
- Relevant-memory retrieval before drafting
- Quality audits for repetition, cliches, pacing, voice drift, and continuity risks
- Human approval mode and lockable canonical facts
- Removable or unlockable memory entries

Run `supabase/memory-quality.sql` after the existing schemas for durable memory items and quality reports. The current command center provides the review UX; the next integration step is persisting approved items and reports through the authenticated Supabase client and passing locked canon automatically into `/api/novel`.
