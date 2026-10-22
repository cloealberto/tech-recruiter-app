-- ========================================================
-- TechRecruit Hub — Seed Data Inicial para Supabase
-- ========================================================

-- Inserir Empresa Demo
INSERT INTO public.companies (id, name, industry)
VALUES 
  ('a1b2c3d4-0001-0000-0000-000000000001', 'Nexus Cloud Technologies', 'Fintech & Cloud Banking'),
  ('a1b2c3d4-0002-0000-0000-000000000002', 'Aethel AI Labs', 'Inteligência Artificial & SaaS')
ON CONFLICT (id) DO NOTHING;

-- Inserir Vagas Demo
INSERT INTO public.jobs (id, company_id, title, department, level, salary_min, salary_max, work_model, location, status, description, headcount)
VALUES
  (
    'b1b2c3d4-0001-0000-0000-000000000001',
    'a1b2c3d4-0001-0000-0000-000000000001',
    'Senior Fullstack Engineer (React / Node.js)',
    'Engenharia de Plataforma',
    'Senior',
    16000,
    21000,
    'Remoto',
    'Brasil (Qualquer cidade)',
    'Aberta',
    'Procuramos Senior Fullstack com forte domínio de React, TypeScript, Node.js e microsserviços em AWS.',
    2
  ),
  (
    'b1b2c3d4-0002-0000-0000-000000000002',
    'a1b2c3d4-0001-0000-0000-000000000001',
    'Staff DevOps & Cloud Architect',
    'DevOps & SRE',
    'Staff',
    22000,
    28000,
    'Remoto',
    'América Latina / Brasil',
    'Aberta',
    'Liderar governança de IaC com Terraform, esteiras CI/CD seguras e clusters Kubernetes multi-region.',
    1
  ),
  (
    'b1b2c3d4-0003-0000-0000-000000000003',
    'a1b2c3d4-0002-0000-0000-000000000002',
    'Tech Lead em Inteligência Artificial & Python',
    'Pesquisa & Engenharia de IA',
    'Lead',
    24000,
    30000,
    'Híbrido',
    'São Paulo - SP (2x semana)',
    'Aberta',
    'Liderar squad de IA na construção de agentes autônomos e pipelines de RAG com modelos LLM e FastAPI.',
    1
  ),
  (
    'b1b2c3d4-0004-0000-0000-000000000004',
    'a1b2c3d4-0002-0000-0000-000000000002',
    'Mobile Engineer Pleno / Senior (Flutter & Dart)',
    'Engenharia Mobile',
    'Pleno',
    12000,
    16000,
    'Remoto',
    'Brasil',
    'Aberta',
    'Desenvolvimento do app mobile corporativo com Clean Architecture e gerenciamento de estado BLoC.',
    1
  )
ON CONFLICT (id) DO NOTHING;

-- Inserir Candidatos Principais
INSERT INTO public.candidates (id, full_name, email, phone, linkedin_url, github_url, seniority, current_role, location, english_level, salary_expectation, notes, avatar_url)
VALUES
  (
    'c1b2c3d4-0001-0000-0000-000000000001',
    'Lucas Vasconcelos',
    'lucas.vasconcelos.dev@gmail.com',
    '+55 (11) 98765-4321',
    'https://linkedin.com/in/lucasvasconcelos-demo',
    'https://github.com/lucasvasc-dev',
    'Senior',
    'Senior Software Engineer na FinTech Global',
    'São Paulo - SP',
    'Avançado',
    19000,
    'Excelente perfil técnico, forte em React 19, TypeScript e Node.js com arquitetura de alta vazão.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  ),
  (
    'c1b2c3d4-0002-0000-0000-000000000002',
    'Mariana Duarte Alencar',
    'mariana.duarte.cloud@outlook.com',
    '+55 (21) 99123-8877',
    'https://linkedin.com/in/marianaduarte-cloud',
    'https://github.com/marianaduarte-ops',
    'Especialista / Lead',
    'Principal Cloud Platform Engineer',
    'Rio de Janeiro - RJ',
    'Fluente / Nativo',
    26000,
    'Referência em Kubernetes e Terraform. Já palestrou em conferências KubeCon e tem certificação CKA.',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80'
  ),
  (
    'c1b2c3d4-0003-0000-0000-000000000003',
    'Gabriel Ferreira Lima',
    'gabriel.lima.ai@techmail.io',
    '+55 (31) 98321-1245',
    'https://linkedin.com/in/gabriellima-ai',
    'https://github.com/gabriellima-research',
    'Senior',
    'Lead AI Engineer',
    'Belo Horizonte - MG',
    'Fluente / Nativo',
    27000,
    'Mestrado em Ciência da Computação pela UFMG. Grande portfólio em agentes inteligentes e LLMs.',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  )
ON CONFLICT (id) DO NOTHING;

-- Inserir Skills
INSERT INTO public.candidate_skills (candidate_id, skill) VALUES
  ('c1b2c3d4-0001-0000-0000-000000000001', 'React'),
  ('c1b2c3d4-0001-0000-0000-000000000001', 'TypeScript'),
  ('c1b2c3d4-0001-0000-0000-000000000001', 'Node.js'),
  ('c1b2c3d4-0001-0000-0000-000000000001', 'AWS'),
  ('c1b2c3d4-0002-0000-0000-000000000002', 'Kubernetes'),
  ('c1b2c3d4-0002-0000-0000-000000000002', 'Terraform'),
  ('c1b2c3d4-0002-0000-0000-000000000002', 'AWS'),
  ('c1b2c3d4-0003-0000-0000-000000000003', 'Python'),
  ('c1b2c3d4-0003-0000-0000-000000000003', 'PyTorch'),
  ('c1b2c3d4-0003-0000-0000-000000000003', 'FastAPI');

-- Inserir Aplicações Iniciais
INSERT INTO public.applications (id, job_id, candidate_id, status, source)
VALUES
  ('d1b2c3d4-0001-0000-0000-000000000001', 'b1b2c3d4-0001-0000-0000-000000000001', 'c1b2c3d4-0001-0000-0000-000000000001', 'proposal', 'LinkedIn'),
  ('d1b2c3d4-0002-0000-0000-000000000002', 'b1b2c3d4-0002-0000-0000-000000000002', 'c1b2c3d4-0002-0000-0000-000000000002', 'technical', 'LinkedIn'),
  ('d1b2c3d4-0003-0000-0000-000000000003', 'b1b2c3d4-0003-0000-0000-000000000003', 'c1b2c3d4-0003-0000-0000-000000000003', 'fit', 'LinkedIn')
ON CONFLICT (id) DO NOTHING;
