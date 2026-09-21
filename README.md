# Inkstone

Inkstone is an AI-powered novel writing workspace built with Next.js, TypeScript, and React.

## Autonomous novelist

The `/autopilot` workspace adds a long-form, scene-based pipeline:

1. **Architect** creates a causal novel blueprint with character arcs and scene turns.
2. **Draft a scene** writes one scene using supplied creative memory and a scene plan.
3. **Critique & revise** diagnoses structure, character, prose, and continuity, then applies a revision pass.

The system is deliberately scene-based: each scene has a goal, conflict, turn, and consequence. This is more reliable for long fiction than asking a model to generate an entire novel in one request.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add `OPENAI_API_KEY` for AI features. Configure Supabase and run both `supabase/schema.sql` and `supabase/autonomous-novelist.sql` for cloud story memory and scene persistence. The new API is rate-limited and validates context size.

The autonomous pipeline is designed for human approval: it can architect, draft, critique, and revise, but final publication still requires editorial judgment. Long-term quality depends on maintaining the project memory and reviewing each scene.
