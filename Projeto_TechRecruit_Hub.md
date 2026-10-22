# Aplicação Web: TechRecruit Hub
## Conceito
Plataforma para Tech Recruiters administrarem vagas, candidatos, pipeline, entrevistas e métricas de recrutamento.

## Funcionalidades
- Cadastro e gestão de vagas (cargo, stack, senioridade, salário, modelo, etapas)
- Cadastro de candidatos com LinkedIn, GitHub, currículo e tags técnicas
- Pipeline Kanban: Sourced > Contatado > Screening > Fit > Desafio > Técnica > Proposta > Contratado/Reprovado
- Scorecard de entrevistas com critérios e notas
- Gerador de Boolean Search para LinkedIn, Google e GitHub
- Dashboard de métricas: vagas abertas, candidatos por vaga, taxa de resposta, avanço por etapa, time to hire, origem dos candidatos
- Banco de talentos com filtros por stack, senioridade, localização e status
- Controle de usuários e permissões (recruiter, gestor, admin)

## Telas
1. Login / cadastro
2. Dashboard com KPIs
3. Lista e cadastro de vagas
4. Pipeline Kanban por vaga
5. Perfil do candidato
6. Scorecard de entrevista
7. Gerador de Boolean Search
8. Relatórios e métricas
9. Configurações e usuários

## Stack sugerida
- Front-end: Next.js + TypeScript + Tailwind CSS
- Back-end/BaaS: Supabase (PostgreSQL, Auth, Storage)
- Hospedagem: Vercel
- Estado e dados: React Query ou Server Actions
- Gráficos: Recharts
- Kanban: dnd-kit

## Modelo de banco de dados
users(id, name, email, role, created_at)
companies(id, name, industry, created_at)
jobs(id, company_id, title, level, salary_min, salary_max, work_model, status, description, created_at)
job_requirements(id, job_id, requirement, type) -- obrigatorio | desejavel | diferencial
candidates(id, full_name, email, phone, linkedin_url, github_url, resume_url, seniority, location, english_level, salary_expectation, notes, created_at)
candidate_skills(id, candidate_id, skill)
applications(id, job_id, candidate_id, status, source, applied_at, updated_at)
pipeline_history(id, application_id, from_status, to_status, changed_at, changed_by)
interviews(id, application_id, interviewer_id, type, scheduled_at, status)
interview_scores(id, interview_id, criterion, score, comment)
search_strings(id, user_id, name, platform, query, created_at)
metrics_events(id, application_id, event_type, event_date, metadata)

## Métricas principais
- Time to hire: data de contratação - data de abertura da vaga
- Taxa de resposta: respostas / abordagens enviadas
- Taxa de avanço por etapa: candidatos aprovados / candidatos na etapa
- Origem dos candidatos: LinkedIn, GitHub, GeekHunter, indicação, inbound
- Qualidade do pipeline: candidatos ativos por vaga e gargalos por etapa

## MVP recomendado
1. CRUD de vagas e candidatos
2. Kanban de pipeline
3. Tags de stack e filtros
4. Scorecard básico
5. Dashboard com 5 KPIs
6. Gerador de Boolean Search

## Diferencial de portfólio
Publique a aplicação com dados demo, documente decisões de produto e inclua um case explicando como a ferramenta reduz tempo de triagem e melhora a visibilidade do funil de recrutamento.
