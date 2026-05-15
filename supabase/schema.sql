-- todos table with RLS scoped to auth.uid()
create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  is_complete boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists todos_user_id_created_at_idx
  on public.todos (user_id, created_at desc);

alter table public.todos enable row level security;

drop policy if exists "Users can select own todos" on public.todos;
create policy "Users can select own todos"
  on public.todos for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own todos" on public.todos;
create policy "Users can insert own todos"
  on public.todos for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own todos" on public.todos;
create policy "Users can update own todos"
  on public.todos for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own todos" on public.todos;
create policy "Users can delete own todos"
  on public.todos for delete
  using (auth.uid() = user_id);
