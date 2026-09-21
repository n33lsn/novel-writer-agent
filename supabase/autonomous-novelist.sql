-- Long-form autonomous novelist memory and scene tracking.
create table if not exists public.novel_memory (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade,
  memory jsonb not null default '{}'::jsonb, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique(project_id)
);
create table if not exists public.novel_scenes (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade,
  chapter_index integer not null, scene_index integer not null, title text not null, plan jsonb not null default '{}'::jsonb,
  draft text not null default '', critique jsonb not null default '{}'::jsonb, status text not null default 'planned',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index if not exists novel_scenes_project_idx on public.novel_scenes(project_id, chapter_index, scene_index);
alter table public.novel_memory enable row level security;
alter table public.novel_scenes enable row level security;
drop policy if exists "Users manage novel memory" on public.novel_memory;
drop policy if exists "Users manage novel scenes" on public.novel_scenes;
create policy "Users manage novel memory" on public.novel_memory for all using (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid())) with check (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid()));
create policy "Users manage novel scenes" on public.novel_scenes for all using (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid())) with check (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid()));
