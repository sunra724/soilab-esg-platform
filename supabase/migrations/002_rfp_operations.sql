-- RFP-driven operations extension.
-- This migration captures repeated requirements from ESG assessment,
-- consulting, education, newsletter, and public-agency reporting RFPs.

create table if not exists public.project_contracts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  agency text,
  region text,
  project_type text not null check (project_type in ('assessment', 'consulting', 'education', 'newsletter', 'mixed')),
  target_count int,
  budget text,
  starts_on date,
  ends_on date,
  status text not null default 'planning',
  created_at timestamptz not null default now()
);

create table if not exists public.project_deliverables (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.project_contracts(id) on delete cascade,
  title text not null,
  deliverable_type text not null default 'report',
  due_on date,
  status text not null default 'todo',
  file_path text,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.field_visits (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.project_contracts(id) on delete cascade,
  company_id uuid references public.companies(id) on delete cascade,
  assessment_id uuid references public.assessments(id) on delete set null,
  visit_no int not null default 1,
  purpose text not null,
  scheduled_at timestamptz,
  completed_at timestamptz,
  consultant_name text,
  notes text,
  evidence_path text,
  created_at timestamptz not null default now()
);

create table if not exists public.education_courses (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.project_contracts(id) on delete cascade,
  title text not null,
  target_audience text,
  mode text not null default 'offline' check (mode in ('online', 'offline', 'hybrid')),
  curriculum_md text,
  approval_status text not null default 'draft',
  created_at timestamptz not null default now()
);

create table if not exists public.education_sessions (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.education_courses(id) on delete cascade,
  title text not null,
  session_no int not null default 1,
  starts_at timestamptz,
  duration_minutes int,
  venue text,
  instructor_name text,
  instructor_profile text,
  material_path text,
  created_at timestamptz not null default now()
);

create table if not exists public.education_participants (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.project_contracts(id) on delete cascade,
  name text not null,
  org text,
  email text,
  phone text,
  region text,
  purpose text,
  apply_channel text,
  status text not null default 'applied' check (status in ('applied', 'selected', 'attended', 'completed', 'withdrawn')),
  consent boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.education_attendance (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.education_sessions(id) on delete cascade,
  participant_id uuid not null references public.education_participants(id) on delete cascade,
  check_in_at timestamptz,
  check_out_at timestamptz,
  attended boolean not null default false,
  signature_path text,
  photo_evidence_path text,
  created_at timestamptz not null default now(),
  unique (session_id, participant_id)
);

create table if not exists public.satisfaction_surveys (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.project_contracts(id) on delete cascade,
  session_id uuid references public.education_sessions(id) on delete set null,
  participant_id uuid references public.education_participants(id) on delete set null,
  respondent_email text,
  score_content int check (score_content between 1 and 5),
  score_instructor int check (score_instructor between 1 and 5),
  score_environment int check (score_environment between 1 and 5),
  score_overall int check (score_overall between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

alter table public.project_contracts enable row level security;
alter table public.project_deliverables enable row level security;
alter table public.field_visits enable row level security;
alter table public.education_courses enable row level security;
alter table public.education_sessions enable row level security;
alter table public.education_participants enable row level security;
alter table public.education_attendance enable row level security;
alter table public.satisfaction_surveys enable row level security;

create policy "admin manage project contracts" on public.project_contracts
  for all using (public.is_admin()) with check (public.is_admin());

create policy "admin manage project deliverables" on public.project_deliverables
  for all using (public.is_admin()) with check (public.is_admin());

create policy "operators manage field visits" on public.field_visits
  for all using (public.is_consultant_or_admin()) with check (public.is_consultant_or_admin());

create policy "operators manage education courses" on public.education_courses
  for all using (public.is_consultant_or_admin()) with check (public.is_consultant_or_admin());

create policy "operators manage education sessions" on public.education_sessions
  for all using (public.is_consultant_or_admin()) with check (public.is_consultant_or_admin());

create policy "operators manage education participants" on public.education_participants
  for all using (public.is_consultant_or_admin()) with check (public.is_consultant_or_admin());

create policy "operators manage education attendance" on public.education_attendance
  for all using (public.is_consultant_or_admin()) with check (public.is_consultant_or_admin());

create policy "operators manage satisfaction surveys" on public.satisfaction_surveys
  for all using (public.is_consultant_or_admin()) with check (public.is_consultant_or_admin());

create policy "public survey insert" on public.satisfaction_surveys
  for insert with check (true);
