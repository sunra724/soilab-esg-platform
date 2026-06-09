create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'company' check (role in ('company', 'consultant', 'admin')),
  name text,
  org text,
  created_at timestamptz not null default now()
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  biz_no_enc text,
  industry text,
  size text,
  region text,
  owner_profile_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  status text not null default 'draft' check (status in ('draft', 'scored', 'analyzed', 'reported')),
  framework text not null default 'k-esg',
  total_score numeric,
  grade text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  scored_at timestamptz
);

create table if not exists public.indicators (
  id uuid primary key default gen_random_uuid(),
  domain text not null check (domain in ('E', 'S', 'G')),
  category text not null,
  code text not null unique,
  question text not null,
  input_type text not null default 'number' check (input_type in ('number', 'select', 'boolean', 'file')),
  weight numeric not null,
  max_score numeric not null default 5,
  kesg_ref text,
  csddd_ref text,
  ecovadis_ref text,
  gri_ref text,
  active boolean not null default true,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.responses (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  indicator_id uuid not null references public.indicators(id) on delete cascade,
  value_num numeric,
  value_text text,
  evidence_path text,
  created_at timestamptz not null default now(),
  unique (assessment_id, indicator_id)
);

create table if not exists public.scores (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  domain text not null check (domain in ('E', 'S', 'G')),
  raw numeric not null,
  weighted numeric not null,
  grade text not null,
  created_at timestamptz not null default now(),
  unique (assessment_id, domain)
);

create table if not exists public.emissions (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  scope int not null,
  source text not null,
  activity_amount numeric not null default 0,
  unit text not null,
  factor numeric not null,
  tco2eq numeric not null,
  created_at timestamptz not null default now()
);

create table if not exists public.improvement_tasks (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  domain text not null check (domain in ('E', 'S', 'G')),
  title text not null,
  detail text,
  priority int not null default 3,
  horizon text not null default 'short' check (horizon in ('short', 'mid-long')),
  status text not null default 'todo',
  created_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  type text not null check (type in ('diagnosis', 'sustainability')),
  version int not null default 1,
  format text not null check (format in ('pdf', 'hwpx')),
  file_path text not null,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.news_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null default 'rss',
  url text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.news_items (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references public.news_sources(id) on delete set null,
  title text not null,
  url text,
  published_at timestamptz,
  raw_excerpt text,
  ai_summary text,
  keywords text[] not null default '{}',
  category text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'published')),
  slug text unique,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletters (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body_html text not null,
  sent_at timestamptz,
  recipient_group text not null default 'all',
  created_at timestamptz not null default now()
);

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  consent boolean not null default true,
  subscriber_group text not null default 'all',
  created_at timestamptz not null default now()
);

create table if not exists public.support_programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  agency text,
  field text,
  region text,
  budget text,
  deadline date,
  link text,
  source text,
  created_at timestamptz not null default now()
);

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text,
  body_md text,
  cover_path text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  org text,
  email text not null,
  phone text,
  service text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.is_consultant_or_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('consultant', 'admin')
  );
$$;

alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.assessments enable row level security;
alter table public.indicators enable row level security;
alter table public.responses enable row level security;
alter table public.scores enable row level security;
alter table public.emissions enable row level security;
alter table public.improvement_tasks enable row level security;
alter table public.reports enable row level security;
alter table public.news_sources enable row level security;
alter table public.news_items enable row level security;
alter table public.newsletters enable row level security;
alter table public.subscribers enable row level security;
alter table public.support_programs enable row level security;
alter table public.case_studies enable row level security;
alter table public.inquiries enable row level security;

create policy "profiles self or admin select" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

create policy "profiles self update" on public.profiles
  for update using (id = auth.uid() or public.is_admin());

create policy "companies owner or operator select" on public.companies
  for select using (owner_profile_id = auth.uid() or public.is_consultant_or_admin());

create policy "companies operator write" on public.companies
  for all using (public.is_consultant_or_admin()) with check (public.is_consultant_or_admin());

create policy "assessments owner or operator select" on public.assessments
  for select using (
    public.is_consultant_or_admin()
    or exists (
      select 1 from public.companies c
      where c.id = assessments.company_id and c.owner_profile_id = auth.uid()
    )
  );

create policy "assessments owner or operator write" on public.assessments
  for all using (
    public.is_consultant_or_admin()
    or exists (
      select 1 from public.companies c
      where c.id = assessments.company_id and c.owner_profile_id = auth.uid()
    )
  ) with check (
    public.is_consultant_or_admin()
    or exists (
      select 1 from public.companies c
      where c.id = assessments.company_id and c.owner_profile_id = auth.uid()
    )
  );

create policy "indicators readable" on public.indicators
  for select using (active = true or public.is_admin());

create policy "indicators admin write" on public.indicators
  for all using (public.is_admin()) with check (public.is_admin());

create policy "public published news read" on public.news_items
  for select using (status = 'published' or public.is_admin());

create policy "public published cases read" on public.case_studies
  for select using (published = true or public.is_admin());

create policy "public programs read" on public.support_programs
  for select using (true);

create policy "inquiries public insert" on public.inquiries
  for insert with check (true);

create policy "admin manage content" on public.news_sources
  for all using (public.is_admin()) with check (public.is_admin());

create policy "admin manage newsletters" on public.newsletters
  for all using (public.is_admin()) with check (public.is_admin());

create policy "admin manage subscribers" on public.subscribers
  for all using (public.is_admin()) with check (public.is_admin());

create policy "admin manage inquiries" on public.inquiries
  for select using (public.is_admin());

create policy "admin update inquiries" on public.inquiries
  for update using (public.is_admin()) with check (public.is_admin());

create policy "assessment child owner or operator select responses" on public.responses
  for select using (
    public.is_consultant_or_admin()
    or exists (
      select 1
      from public.assessments a
      join public.companies c on c.id = a.company_id
      where a.id = responses.assessment_id and c.owner_profile_id = auth.uid()
    )
  );

create policy "assessment child owner or operator write responses" on public.responses
  for all using (
    public.is_consultant_or_admin()
    or exists (
      select 1
      from public.assessments a
      join public.companies c on c.id = a.company_id
      where a.id = responses.assessment_id and c.owner_profile_id = auth.uid()
    )
  ) with check (
    public.is_consultant_or_admin()
    or exists (
      select 1
      from public.assessments a
      join public.companies c on c.id = a.company_id
      where a.id = responses.assessment_id and c.owner_profile_id = auth.uid()
    )
  );

create policy "assessment child select scores" on public.scores
  for select using (
    public.is_consultant_or_admin()
    or exists (
      select 1
      from public.assessments a
      join public.companies c on c.id = a.company_id
      where a.id = scores.assessment_id and c.owner_profile_id = auth.uid()
    )
  );

create policy "assessment child select emissions" on public.emissions
  for select using (
    public.is_consultant_or_admin()
    or exists (
      select 1
      from public.assessments a
      join public.companies c on c.id = a.company_id
      where a.id = emissions.assessment_id and c.owner_profile_id = auth.uid()
    )
  );

create policy "assessment child select tasks" on public.improvement_tasks
  for select using (
    public.is_consultant_or_admin()
    or exists (
      select 1
      from public.assessments a
      join public.companies c on c.id = a.company_id
      where a.id = improvement_tasks.assessment_id and c.owner_profile_id = auth.uid()
    )
  );

create policy "assessment child select reports" on public.reports
  for select using (
    public.is_consultant_or_admin()
    or exists (
      select 1
      from public.assessments a
      join public.companies c on c.id = a.company_id
      where a.id = reports.assessment_id and c.owner_profile_id = auth.uid()
    )
  );
