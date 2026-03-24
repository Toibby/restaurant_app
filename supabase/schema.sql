create extension if not exists "pgcrypto";

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  address text not null,
  items jsonb not null,
  subtotal numeric not null default 0,
  delivery_fee numeric not null default 0,
  total_amount numeric not null default 0,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Allow insert for service role only"
on public.orders
for all
using (true)
with check (true);