-- Simple shared todos table (no auth)
create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  is_complete boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists todos_created_at_idx
  on public.todos (created_at desc);

-- RLS is disabled so the anon/publishable key can read & write.
-- All visitors share the same list. Add auth + RLS before going public.
alter table public.todos disable row level security;
