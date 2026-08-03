-- ============================================================
--  BRANVOY SITE MANAGER — Supabase Database Setup
--  Run this entire script in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ─────────────────────────────────────────────
--  1. SERVICES TABLE
-- ─────────────────────────────────────────────
create table if not exists services (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  tagline     text default '',
  description text not null default '',
  deliverables text[] default '{}',
  price       text default '',
  sort_order  int default 0,
  created_at  timestamptz default now()
);

-- Enable Row Level Security
alter table services enable row level security;

-- Only authenticated users (admin) can read/write
create policy "Admin full access - services"
  on services for all
  to authenticated
  using (true)
  with check (true);

-- ─────────────────────────────────────────────
--  2. TEAM TABLE
-- ─────────────────────────────────────────────
create table if not exists team (
  id         bigserial primary key,
  name       text not null,
  role       text not null,
  image      text default '',
  created_at timestamptz default now()
);

alter table team enable row level security;

create policy "Admin full access - team"
  on team for all
  to authenticated
  using (true)
  with check (true);

-- ─────────────────────────────────────────────
--  3. PROJECTS TABLE
-- ─────────────────────────────────────────────
create table if not exists projects (
  id           bigserial primary key,
  title        text not null,
  category     text default 'Luxury',
  services     text default '',
  year         text default '2025',
  metric       text default '',
  metric_label text default '',
  image        text default '',
  summary      text default '',
  client_quote text default '',
  results      text[] default '{}',
  created_at   timestamptz default now()
);

alter table projects enable row level security;

create policy "Admin full access - projects"
  on projects for all
  to authenticated
  using (true)
  with check (true);

-- ─────────────────────────────────────────────
--  4. PRICING TABLE
-- ─────────────────────────────────────────────
create table if not exists pricing (
  id          bigserial primary key,
  name        text not null,
  price       text not null,
  period      text default '/ month',
  description text default '',
  features    text[] default '{}',
  created_at  timestamptz default now()
);

alter table pricing enable row level security;

create policy "Admin full access - pricing"
  on pricing for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
--  DONE! Your tables are ready.
--
--  Next steps:
--  1. Go to Authentication → Users → Add User
--     Create your admin account with email + password
--  2. Fill in .env.local with your Supabase project URL and keys
--  3. Optionally seed initial data using the INSERT statements below
-- ============================================================


-- ─────────────────────────────────────────────
--  OPTIONAL: Seed initial services data
--  (Only run if you want starter data)
-- ─────────────────────────────────────────────

-- insert into services (title, tagline, description, deliverables, price, sort_order) values
-- ('Brand Strategy & Positioning', 'Definitive clarity in crowded markets.',
--  'We extract your brand core and translate it into a compelling market narrative.',
--  ARRAY['Brand Identity & Narrative Architecture','Market & Competitor Positioning','Tone of Voice & Messaging Systems','Brand Visual Guidelines'],
--  '', 1),
-- ('Performance Marketing & Paid Media', 'Capital allocation tuned for profitable growth.',
--  'We run multi-channel paid acquisition with absolute financial discipline.',
--  ARRAY['Paid Social (Meta, TikTok, LinkedIn)','Search Engine Marketing (Google, Bing)','Funnel Conversion Optimization','Attribution & Custom Dashboards'],
--  '', 2);
