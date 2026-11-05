-- Rulează în SQL Editor, în proiectul Supabase ales pentru MySubs.
-- Numele separat evită modificarea tabelelor altor aplicații.
create table if not exists public.mysubs_subscriptions (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 name text not null check (length(trim(name)) between 1 and 100),
 amount numeric(12,2) not null check (amount between 0 and 10000000),
 currency text not null check (currency in ('RON','EUR','USD','GBP')),
 bank text check (bank in ('Raiffeisen','CEC','Revolut','Salt')),
 start date not null,
 cycle text not null check (cycle in ('monthly','yearly')),
 status text not null check (status in ('active','trial','paused','cancelled')),
 "end" date check ("end" is null or "end">=start),
 pay_time time,
 notes text not null default '' check (length(notes)<=1000),
 created_at timestamptz not null default now()
);
create index if not exists mysubs_subscriptions_user_idx on public.mysubs_subscriptions(user_id);
alter table public.mysubs_subscriptions enable row level security;
revoke all on public.mysubs_subscriptions from anon;
grant select,insert,update,delete on public.mysubs_subscriptions to authenticated;
drop policy if exists mysubs_owner_select on public.mysubs_subscriptions;
create policy mysubs_owner_select on public.mysubs_subscriptions for select to authenticated using ((select auth.uid())=user_id);
drop policy if exists mysubs_owner_insert on public.mysubs_subscriptions;
create policy mysubs_owner_insert on public.mysubs_subscriptions for insert to authenticated with check ((select auth.uid())=user_id);
drop policy if exists mysubs_owner_update on public.mysubs_subscriptions;
create policy mysubs_owner_update on public.mysubs_subscriptions for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
drop policy if exists mysubs_owner_delete on public.mysubs_subscriptions;
create policy mysubs_owner_delete on public.mysubs_subscriptions for delete to authenticated using ((select auth.uid())=user_id);
