create table public.accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  environment text not null check (environment in ('personal','business')),
  name text not null, kind text not null default 'Banco',
  balance numeric(14,2) not null default 0,
  external_id text, created_at timestamptz not null default now(),
  unique (user_id, external_id));
create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  environment text not null check (environment in ('personal','business')),
  description text not null, amount numeric(14,2) not null check (amount >= 0),
  type text not null check (type in ('income','expense','transfer')),
  category text not null default 'Outros', account_name text not null default '',
  date date not null, external_id text, created_at timestamptz not null default now(),
  unique (user_id, external_id));
create table public.bank_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  environment text not null check (environment in ('personal','business')),
  item_id text not null, connector_name text, created_at timestamptz not null default now(),
  unique (user_id, item_id));
create index on public.transactions (user_id, environment, date desc);
alter table public.accounts enable row level security;
alter table public.transactions enable row level security;
alter table public.bank_connections enable row level security;
create policy own_accounts on public.accounts for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_transactions on public.transactions for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_connections on public.bank_connections for all using (user_id = auth.uid()) with check (user_id = auth.uid());
