-- ========================================================
-- TechRecruit Hub — Schema de Banco de Dados PostgreSQL (Supabase)
-- ========================================================

-- Habilitar extensão para geração de UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabela de Empresas
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  industry TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabela de Vagas
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  department TEXT,
  level TEXT NOT NULL, -- Junior, Pleno, Senior, Lead, Staff, Principal
  salary_min NUMERIC NOT NULL DEFAULT 0,
  salary_max NUMERIC NOT NULL DEFAULT 0,
  work_model TEXT NOT NULL DEFAULT 'Remoto', -- Remoto, Híbrido, Presencial
  location TEXT DEFAULT 'Brasil',
  status TEXT NOT NULL DEFAULT 'Aberta', -- Aberta, Pausada, Fechada
  description TEXT,
  headcount INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Requisitos das Vagas
CREATE TABLE IF NOT EXISTS public.job_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  requirement TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'obrigatorio' -- obrigatorio | desejavel | diferencial
);

-- 4. Tabela de Candidatos (Talent Pool)
CREATE TABLE IF NOT EXISTS public.candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  resume_url TEXT,
  avatar_url TEXT,
  seniority TEXT NOT NULL DEFAULT 'Senior',
  current_role TEXT,
  location TEXT DEFAULT 'Brasil',
  english_level TEXT DEFAULT 'Avançado',
  salary_expectation NUMERIC DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Tags / Skills Técnicas dos Candidatos
CREATE TABLE IF NOT EXISTS public.candidate_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID REFERENCES public.candidates(id) ON DELETE CASCADE NOT NULL,
  skill TEXT NOT NULL
);

-- 6. Aplicações no Pipeline de Seleção
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  candidate_id UUID REFERENCES public.candidates(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'sourced', -- sourced, contacted, screening, fit, challenge, technical, proposal, hired, rejected
  source TEXT NOT NULL DEFAULT 'LinkedIn', -- LinkedIn, GitHub, GeekHunter, Indicação, Inbound
  rejection_reason TEXT,
  hire_date DATE,
  applied_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(job_id, candidate_id)
);

-- 7. Histórico de Movimentações no Pipeline
CREATE TABLE IF NOT EXISTS public.pipeline_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,
  candidate_name TEXT,
  job_title TEXT,
  from_status TEXT NOT NULL,
  to_status TEXT NOT NULL,
  changed_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  changed_by TEXT NOT NULL DEFAULT 'Recruiter',
  comment TEXT
);

-- 8. Scorecards e Avaliações de Entrevistas
CREATE TABLE IF NOT EXISTS public.interview_scorecards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES public.applications(id) ON DELETE SET NULL,
  candidate_id UUID REFERENCES public.candidates(id) ON DELETE CASCADE NOT NULL,
  candidate_name TEXT NOT NULL,
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  job_title TEXT NOT NULL,
  interviewer_id TEXT,
  interviewer_name TEXT NOT NULL,
  overall_recommendation TEXT NOT NULL DEFAULT 'hire', -- strong_hire, hire, leaning_hire, no_hire
  summary_comment TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Critérios Detalhados do Scorecard (1 a 5 estrelas)
CREATE TABLE IF NOT EXISTS public.interview_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scorecard_id UUID REFERENCES public.interview_scorecards(id) ON DELETE CASCADE NOT NULL,
  criterion TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
  comment TEXT
);

-- 10. Strings de Busca Booleana Salvas
CREATE TABLE IF NOT EXISTS public.search_strings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT,
  name TEXT NOT NULL,
  platform TEXT NOT NULL DEFAULT 'LinkedIn', -- LinkedIn, Google, GitHub
  query TEXT NOT NULL,
  role_title TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ========================================================
-- POLÍTICAS DE ACESSO (Row Level Security - RLS)
-- Permite leitura e escrita anônima autenticada pela anon key
-- ========================================================

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pipeline_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_scorecards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_strings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read All" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Public Insert All" ON public.companies FOR ALL USING (true);

CREATE POLICY "Public Read All Jobs" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Public Insert All Jobs" ON public.jobs FOR ALL USING (true);

CREATE POLICY "Public Read All Requirements" ON public.job_requirements FOR SELECT USING (true);
CREATE POLICY "Public Insert All Requirements" ON public.job_requirements FOR ALL USING (true);

CREATE POLICY "Public Read All Candidates" ON public.candidates FOR SELECT USING (true);
CREATE POLICY "Public Insert All Candidates" ON public.candidates FOR ALL USING (true);

CREATE POLICY "Public Read All Skills" ON public.candidate_skills FOR SELECT USING (true);
CREATE POLICY "Public Insert All Skills" ON public.candidate_skills FOR ALL USING (true);

CREATE POLICY "Public Read All Applications" ON public.applications FOR SELECT USING (true);
CREATE POLICY "Public Insert All Applications" ON public.applications FOR ALL USING (true);

CREATE POLICY "Public Read All History" ON public.pipeline_history FOR SELECT USING (true);
CREATE POLICY "Public Insert All History" ON public.pipeline_history FOR ALL USING (true);

CREATE POLICY "Public Read All Scorecards" ON public.interview_scorecards FOR SELECT USING (true);
CREATE POLICY "Public Insert All Scorecards" ON public.interview_scorecards FOR ALL USING (true);

CREATE POLICY "Public Read All Scores" ON public.interview_scores FOR SELECT USING (true);
CREATE POLICY "Public Insert All Scores" ON public.interview_scores FOR ALL USING (true);

CREATE POLICY "Public Read All Searches" ON public.search_strings FOR SELECT USING (true);
CREATE POLICY "Public Insert All Searches" ON public.search_strings FOR ALL USING (true);
