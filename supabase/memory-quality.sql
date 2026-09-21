-- Durable memory, author controls, and quality reports.
create table if not exists public.novel_memory_items (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade,
  kind text not null, label text not null, content text not null, confidence numeric not null default 1,
  locked boolean not null default false, source_scene_id uuid references public.novel_scenes(id) on delete set null,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.novel_quality_reports (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade,
  scene_id uuid references public.novel_scenes(id) on delete cascade, score integer, report jsonb not null default '{}'::jsonb,
  approved boolean not null default false, created_at timestamptz not null default now()
);
create index if not exists novel_memory_items_project_idx on public.novel_memory_items(project_id, kind);
create index if not exists novel_quality_reports_project_idx on public.novel_quality_reports(project_id, created_at desc);
alter table public.novel_memory_items enable row level security;
alter table public.novel_quality_reports enable row level security;
drop policy if exists "Users manage novel memory items" on public.novel_memory_items;
drop policy if exists "Users manage quality reports" on public.novel_quality_reports;
create policy "Users manage novel memory items" on public.novel_memory_items for all using (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid())) with check (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid()));
create policy "Users manage quality reports" on public.novel_quality_reports for all using (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid())) with check (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid()));
