-- Supabase migration for multi-novel workspace.
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  title text not null, genre text default 'Fantasy', data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index if not exists projects_user_id_idx on public.projects(user_id);
alter table public.projects enable row level security;
drop policy if exists "Users can view their projects" on public.projects;
drop policy if exists "Users can create their projects" on public.projects;
drop policy if exists "Users can update their projects" on public.projects;
drop policy if exists "Users can delete their projects" on public.projects;
create policy "Users can view their projects" on public.projects for select using (auth.uid() = user_id);
create policy "Users can create their projects" on public.projects for insert with check (auth.uid() = user_id);
create policy "Users can update their projects" on public.projects for update using (auth.uid() = user_id);
create policy "Users can delete their projects" on public.projects for delete using (auth.uid() = user_id);
create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at before update on public.projects for each row execute procedure public.set_updated_at();
