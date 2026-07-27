-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query)
-- before the app is used. Safe to re-run — every statement is idempotent.

create table if not exists guests (
  id bigint generated always as identity primary key,
  name text not null,
  table_number text not null,
  seat_number text not null,
  created_at timestamptz not null default now()
);

create table if not exists rsvps (
  id bigint generated always as identity primary key,
  name text not null,
  attending text not null,
  guest_count integer not null default 1,
  message text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists moments (
  id bigint generated always as identity primary key,
  name text not null,
  message text not null default '',
  image_url text not null,
  rotate text not null,
  created_at timestamptz not null default now()
);

create table if not exists images (
  slot_id text primary key,
  url text not null,
  updated_at timestamptz not null default now()
);

-- Text-only well-wishes submitted from /live. Kept separate from `moments`
-- (which is photo-first) so the homepage can rotate through blessings
-- without needing an image on every row.
create table if not exists blessings (
  id bigint generated always as identity primary key,
  name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Seed the placeholder guest list once (skipped if guests already has rows,
-- so re-running this file after you've added real guests won't touch them).
insert into guests (name, table_number, seat_number)
select v.name, v.table_number, v.seat_number
from (
  values
    ('Amal Silva', '4', '2'),
    ('Nadeesha Gunawardena', '2', '5'),
    ('Rohan Wickramasinghe', '6', '1'),
    ('Tharushi Jayasuriya', '3', '7'),
    ('Dinesh Rajapaksa', '5', '3'),
    ('Ishara Fonseka', '1', '4'),
    ('Chamod Perera', '4', '6'),
    ('Yasodha Bandara', '2', '2')
) as v(name, table_number, seat_number)
where not exists (select 1 from guests);

-- The app talks to these tables exclusively with the service_role key
-- (server-only, never shipped to the browser), which bypasses RLS by
-- design. Enabling RLS with no policies here just means the public/anon
-- key — if it were ever used — gets access to nothing.
alter table guests enable row level security;
alter table rsvps enable row level security;
alter table moments enable row level security;
alter table images enable row level security;
alter table blessings enable row level security;

-- BYPASSRLS (which service_role has) only skips row-level security policy
-- checks — it does NOT skip standard SQL table-level GRANT checks, which
-- are a separate permission layer. Without these grants, service_role
-- queries fail with "permission denied for table ..." even though RLS
-- itself isn't the blocker.
grant usage on schema public to service_role;
grant all on table guests, rsvps, moments, images, blessings to service_role;
grant usage, select on all sequences in schema public to service_role;
