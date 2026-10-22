import type { 
  User, 
  Company, 
  Job, 
  Candidate, 
  Application, 
  PipelineHistory, 
  InterviewScorecard, 
  SearchString, 
  StageDefinition 
} from '../types';

export const PIPELINE_STAGES: StageDefinition[] = [
  { id: 'sourced', label: 'Sourced', color: '#6366F1', description: 'Candidatos mapeados e identificados via sourcing ativo' },
  { id: 'contacted', label: 'Contatado', color: '#06B6D4', description: 'Abordagem inicial enviada via InMail ou e-mail' },
  { id: 'screening', label: 'Screening', color: '#0EA5E9', description: 'Triagem preliminar com Tech Recruiter' },
  { id: 'fit', label: 'Fit Cultural', color: '#8B5CF6', description: 'Alinhamento de valores, soft skills e cultura' },
  { id: 'challenge', label: 'Desafio', color: '#F59E0B', description: 'Desafio técnico prático / case assíncrono' },
  { id: 'technical', label: 'Técnica', color: '#EC4899', description: 'Entrevista técnica profunda com Tech Lead / Especialista' },
  { id: 'proposal', label: 'Proposta', color: '#10B981', description: 'Carta de oferta formal enviada ao candidato' },
  { id: 'hired', label: 'Contratado', color: '#059669', description: 'Proposta aceita e contratação confirmada!' },
  { id: 'rejected', label: 'Reprovado', color: '#EF4444', description: 'Candidato desqualificado ou desistência com feedback' }
];

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Camila Rocha',
    email: 'camila.recruiter@techhub.io',
    role: 'recruiter',
    title: 'Senior Tech Recruiter',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-15'
  },
  {
    id: 'user-2',
    name: 'Rodrigo Mendes',
    email: 'rodrigo.eng@techhub.io',
    role: 'gestor',
    title: 'Engineering Manager & Tech Lead',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-02-01'
  },
  {
    id: 'user-3',
    name: 'Ana Beatriz Ramos',
    email: 'anabeatriz@techhub.io',
    role: 'admin',
    title: 'Head of People & Talent Acquisition',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-11-10'
  }
];

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'comp-1',
    name: 'Nexus Cloud Technologies',
    industry: 'Fintech & Cloud Banking',
    createdAt: '2025-06-10'
  },
  {
    id: 'comp-2',
    name: 'Aethel AI Labs',
    industry: 'Inteligência Artificial & SaaS B2B',
    createdAt: '2025-09-01'
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'job-1',
    companyId: 'comp-1',
    companyName: 'Nexus Cloud Technologies',
    title: 'Senior Fullstack Engineer (React / Node.js)',
    department: 'Engenharia de Plataforma',
    level: 'Senior',
    salaryMin: 16000,
    salaryMax: 21000,
    workModel: 'Remoto',
    location: 'Brasil (Qualquer cidade) / Fuso BRT',
    status: 'Aberta',
    description: 'Procuramos um(a) Senior Fullstack Engineer com forte domínio de React, TypeScript, Node.js e microsserviços em AWS. Terá papel chave na escalabilidade do core bancário e pagamentos instantâneos.',
    createdAt: '2026-09-10',
    headcount: 2,
    hiredCount: 1,
    requirements: [
      { id: 'req-1', jobId: 'job-1', requirement: '5+ anos com React, TypeScript e Node.js em produção', type: 'obrigatorio' },
      { id: 'req-2', jobId: 'job-1', requirement: 'Arquitetura de microsserviços orientada a eventos (Kafka/RabbitMQ)', type: 'obrigatorio' },
      { id: 'req-3', jobId: 'job-1', requirement: 'Experiência prática em AWS (ECS, Lambda, RDS Postgres)', type: 'desejavel' },
      { id: 'req-4', jobId: 'job-1', requirement: 'Inglês avançado para interlocução com time global', type: 'diferencial' }
    ]
  },
  {
    id: 'job-2',
    companyId: 'comp-1',
    companyName: 'Nexus Cloud Technologies',
    title: 'Staff DevOps & Cloud Architect',
    department: 'DevOps & SRE',
    level: 'Staff',
    salaryMin: 22000,
    salaryMax: 28000,
    workModel: 'Remoto',
    location: 'América Latina / Brasil',
    status: 'Aberta',
    description: 'Responsável por liderar a governança de infraestrutura como código (Terraform), esteiras CI/CD seguras e clusters Kubernetes multi-region de alta disponibilidade com observabilidade robusta (Datadog/Grafana).',
    createdAt: '2026-09-18',
    headcount: 1,
    hiredCount: 0,
    requirements: [
      { id: 'req-5', jobId: 'job-2', requirement: 'Kubernetes avançado e orquestração de containers em larga escala', type: 'obrigatorio' },
      { id: 'req-6', jobId: 'job-2', requirement: 'Terraform avançado (módulos reutilizáveis, state remoto)', type: 'obrigatorio' },
      { id: 'req-7', jobId: 'job-2', requirement: 'FinOps e otimização de custos de nuvem pública', type: 'desejavel' },
      { id: 'req-8', jobId: 'job-2', requirement: 'Certificações CKA / AWS Solutions Architect', type: 'diferencial' }
    ]
  },
  {
    id: 'job-3',
    companyId: 'comp-2',
    companyName: 'Aethel AI Labs',
    title: 'Tech Lead em Inteligência Artificial & Python',
    department: 'Pesquisa & Engenharia de IA',
    level: 'Lead',
    salaryMin: 24000,
    salaryMax: 30000,
    workModel: 'Híbrido',
    location: 'São Paulo - SP (2x semana)',
    status: 'Aberta',
    description: 'Liderar o squad de IA aplicada na construção de agentes autônomos e pipelines de RAG com modelos LLM, FastAPI de alta performance e bancos de dados vetoriais (Pinecone/Qdrant).',
    createdAt: '2026-09-25',
    headcount: 1,
    hiredCount: 0,
    requirements: [
      { id: 'req-9', jobId: 'job-3', requirement: 'Experiência prática liderando squads técnicos de Machine Learning / IA', type: 'obrigatorio' },
      { id: 'req-10', jobId: 'job-3', requirement: 'Domínio de Python, FastAPI, PyTorch e ecossistema de LLMs/LangChain', type: 'obrigatorio' },
      { id: 'req-11', jobId: 'job-3', requirement: 'Bancos vetoriais (Qdrant, Milvus, Pinecone) e técnicas de Embeddings', type: 'desejavel' },
      { id: 'req-12', jobId: 'job-3', requirement: 'Publicações em conferências ou contribuições em repositórios open-source de IA', type: 'diferencial' }
    ]
  },
  {
    id: 'job-4',
    companyId: 'comp-2',
    companyName: 'Aethel AI Labs',
    title: 'Mobile Engineer Pleno / Senior (Flutter & Dart)',
    department: 'Engenharia Mobile',
    level: 'Pleno',
    salaryMin: 12000,
    salaryMax: 16000,
    workModel: 'Remoto',
    location: 'Brasil',
    status: 'Aberta',
    description: 'Desenvolvimento do novo aplicativo mobile corporativo com arquitetura limpa (Clean Architecture), gerenciamento de estado via Bloc/Riverpod e integração com APIs REST e WebSockets.',
    createdAt: '2026-10-02',
    headcount: 1,
    hiredCount: 0,
    requirements: [
      { id: 'req-13', jobId: 'job-4', requirement: '3+ anos em desenvolvimento Mobile com Flutter e Dart', type: 'obrigatorio' },
      { id: 'req-14', jobId: 'job-4', requirement: 'Padrões de projeto, Clean Architecture e Testes Unitários', type: 'obrigatorio' },
      { id: 'req-15', jobId: 'job-4', requirement: 'Publicação de apps na Apple App Store e Google Play Store', type: 'desejavel' }
    ]
  }
];

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    fullName: 'Lucas Vasconcelos',
    email: 'lucas.vasconcelos.dev@gmail.com',
    phone: '+55 (11) 98765-4321',
    linkedinUrl: 'https://linkedin.com/in/lucasvasconcelos-demo',
    githubUrl: 'https://github.com/lucasvasc-dev',
    resumeUrl: 'https://techhub-cvs.com/lucas-vasconcelos.pdf',
    seniority: 'Senior',
    currentRole: 'Senior Software Engineer na FinTech Global',
    location: 'São Paulo - SP',
    englishLevel: 'Avançado',
    salaryExpectation: 19000,
    notes: 'Excelente perfil técnico, forte em React 19, TypeScript e Node.js com arquitetura de alta vazão. Mostrou ótimo raciocínio sistêmico.',
    createdAt: '2026-09-15',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL', 'Tailwind CSS']
  },
  {
    id: 'cand-2',
    fullName: 'Mariana Duarte Alencar',
    email: 'mariana.duarte.cloud@outlook.com',
    phone: '+55 (21) 99123-8877',
    linkedinUrl: 'https://linkedin.com/in/marianaduarte-cloud',
    githubUrl: 'https://github.com/marianaduarte-ops',
    resumeUrl: 'https://techhub-cvs.com/mariana-duarte.pdf',
    seniority: 'Especialista / Lead',
    currentRole: 'Principal Cloud Platform Engineer',
    location: 'Rio de Janeiro - RJ',
    englishLevel: 'Fluente / Nativo',
    salaryExpectation: 26000,
    notes: 'Referência em Kubernetes e Terraform. Já palestrou em conferências KubeCon e tem certificação CKA e AWS Pro.',
    createdAt: '2026-09-20',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'CI/CD', 'Docker', 'Prometheus', 'Golang', 'Linux Kernel']
  },
  {
    id: 'cand-3',
    fullName: 'Gabriel Ferreira Lima',
    email: 'gabriel.lima.ai@techmail.io',
    phone: '+55 (31) 98321-1245',
    linkedinUrl: 'https://linkedin.com/in/gabriellima-ai',
    githubUrl: 'https://github.com/gabriellima-research',
    resumeUrl: 'https://techhub-cvs.com/gabriel-lima.pdf',
    seniority: 'Senior',
    currentRole: 'Lead AI Engineer',
    location: 'Belo Horizonte - MG',
    englishLevel: 'Fluente / Nativo',
    salaryExpectation: 27000,
    notes: 'Mestrado em Ciência da Computação pela UFMG. Grande portfólio em agentes inteligentes, RAG e orquestração de LLMs com FastAPI.',
    createdAt: '2026-09-27',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    skills: ['Python', 'FastAPI', 'PyTorch', 'LangChain', 'Vector DB', 'Docker', 'GCP', 'PostgreSQL']
  },
  {
    id: 'cand-4',
    fullName: 'Beatriz Siqueira Nogueira',
    email: 'beatriz.nogueira@gmail.com',
    phone: '+55 (41) 99882-3344',
    linkedinUrl: 'https://linkedin.com/in/beatriznogueira-fullstack',
    githubUrl: 'https://github.com/bianogueira-code',
    resumeUrl: 'https://techhub-cvs.com/beatriz-nogueira.pdf',
    seniority: 'Pleno',
    currentRole: 'Fullstack Software Engineer',
    location: 'Curitiba - PR',
    englishLevel: 'Intermediário',
    salaryExpectation: 14000,
    notes: 'Muito focada em UI/UX e performance no front-end. Boa comunicação, aprende rápido e tem projetos com Next.js e NestJS.',
    createdAt: '2026-09-29',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'Tailwind CSS']
  },
  {
    id: 'cand-5',
    fullName: 'Felipe Santana Prado',
    email: 'felipe.santana.mobile@gmail.com',
    phone: '+55 (51) 98112-9900',
    linkedinUrl: 'https://linkedin.com/in/felipesantana-flutter',
    githubUrl: 'https://github.com/felipemobile-br',
    resumeUrl: 'https://techhub-cvs.com/felipe-santana.pdf',
    seniority: 'Pleno',
    currentRole: 'Mobile Flutter Specialist',
    location: 'Porto Alegre - RS',
    englishLevel: 'Intermediário',
    salaryExpectation: 13500,
    notes: '4 anos de experiência exclusiva com Flutter. Criou aplicações com mais de 500k downloads e arquitetura BLoC.',
    createdAt: '2026-10-03',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    skills: ['Flutter', 'Dart', 'Bloc', 'Firebase', 'Clean Architecture', 'Git', 'iOS / Swift']
  },
  {
    id: 'cand-6',
    fullName: 'Camila Mendonça Vieira',
    email: 'camila.mendonca@techmail.com',
    phone: '+55 (19) 98771-2233',
    linkedinUrl: 'https://linkedin.com/in/camilamendonca-devops',
    githubUrl: 'https://github.com/camilam-infra',
    seniority: 'Senior',
    currentRole: 'Senior SRE & DevOps Engineer',
    location: 'Campinas - SP',
    englishLevel: 'Avançado',
    salaryExpectation: 21000,
    notes: 'Especialista em observabilidade com Datadog, Prometheus e Grafana. Automatizou pipelines com GitHub Actions e ArgoCD.',
    createdAt: '2026-10-05',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    skills: ['DevOps', 'Kubernetes', 'Terraform', 'AWS', 'Datadog', 'ArgoCD', 'Python', 'Helm']
  },
  {
    id: 'cand-7',
    fullName: 'Thiago Bernardes Costa',
    email: 'thiago.costa.dev@gmail.com',
    phone: '+55 (71) 99234-5566',
    linkedinUrl: 'https://linkedin.com/in/thiagob-fullstack',
    githubUrl: 'https://github.com/thiagobernardes',
    seniority: 'Senior',
    currentRole: 'Senior Backend Engineer',
    location: 'Salvador - BA',
    englishLevel: 'Avançado',
    salaryExpectation: 18500,
    notes: 'Dominante em Golang e Node.js para aplicações financeiras. Muito bom em modelagem de dados SQL e concorrência.',
    createdAt: '2026-10-06',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    skills: ['Node.js', 'Golang', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'AWS']
  },
  {
    id: 'cand-8',
    fullName: 'Juliana Pires Castilho',
    email: 'juliana.castilho.ai@gmail.com',
    phone: '+55 (81) 98844-1122',
    linkedinUrl: 'https://linkedin.com/in/julianacastilho-ai',
    githubUrl: 'https://github.com/jucastilho-ml',
    seniority: 'Senior',
    currentRole: 'Senior Data & ML Scientist',
    location: 'Recife - PE',
    englishLevel: 'Fluente / Nativo',
    salaryExpectation: 23000,
    notes: 'Forte base em NLP, Transformers e modelos generativos. Experiência de 5 anos trabalhando com times internacionais.',
    createdAt: '2026-10-08',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    skills: ['Python', 'PyTorch', 'NLP', 'Transformers', 'HuggingFace', 'FastAPI', 'MLOps']
  },
  {
    id: 'cand-9',
    fullName: 'Rafael Augusto Silveira',
    email: 'rafael.silveira.front@gmail.com',
    phone: '+55 (48) 99191-4455',
    linkedinUrl: 'https://linkedin.com/in/rafaelsilveira-react',
    githubUrl: 'https://github.com/rafaelsilveira-ui',
    seniority: 'Pleno',
    currentRole: 'Front-end React Specialist',
    location: 'Florianópolis - SC',
    englishLevel: 'Intermediário',
    salaryExpectation: 13000,
    notes: 'Apaixonado por micro-interações, acessibilidade web e Design Systems com Tailwind CSS e Radix UI.',
    createdAt: '2026-10-10',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    skills: ['React', 'Next.js', 'TypeScript', 'CSS/SCSS', 'Tailwind CSS', 'Jest', 'Storybook']
  },
  {
    id: 'cand-10',
    fullName: 'Larissa Moura Toledo',
    email: 'larissa.moura.lead@gmail.com',
    phone: '+55 (11) 97766-3322',
    linkedinUrl: 'https://linkedin.com/in/larissamoura-lead',
    githubUrl: 'https://github.com/larissamoura-eng',
    seniority: 'Especialista / Lead',
    currentRole: 'Lead Software Architect',
    location: 'São Paulo - SP',
    englishLevel: 'Fluente / Nativo',
    salaryExpectation: 25000,
    notes: 'Já atuou como Engineering Lead em unicórnios brasileiros. Liderança humanizada e alta capacidade técnica em arquitetura distribuída.',
    createdAt: '2026-10-12',
    avatarUrl: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&auto=format&fit=crop&q=80',
    skills: ['Node.js', 'TypeScript', 'System Design', 'Kafka', 'AWS', 'Team Leadership', 'PostgreSQL']
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  // Job 1 (Senior Fullstack)
  {
    id: 'app-1',
    jobId: 'job-1',
    candidateId: 'cand-1',
    status: 'proposal',
    source: 'LinkedIn',
    appliedAt: '2026-09-16',
    updatedAt: '2026-10-18'
  },
  {
    id: 'app-2',
    jobId: 'job-1',
    candidateId: 'cand-4',
    status: 'technical',
    source: 'GeekHunter',
    appliedAt: '2026-09-30',
    updatedAt: '2026-10-17'
  },
  {
    id: 'app-3',
    jobId: 'job-1',
    candidateId: 'cand-7',
    status: 'screening',
    source: 'Indicação',
    appliedAt: '2026-10-07',
    updatedAt: '2026-10-15'
  },
  {
    id: 'app-4',
    jobId: 'job-1',
    candidateId: 'cand-9',
    status: 'contacted',
    source: 'GitHub',
    appliedAt: '2026-10-11',
    updatedAt: '2026-10-14'
  },
  {
    id: 'app-5',
    jobId: 'job-1',
    candidateId: 'cand-10',
    status: 'hired',
    source: 'LinkedIn',
    appliedAt: '2026-09-12',
    updatedAt: '2026-10-05',
    hireDate: '2026-10-05'
  },

  // Job 2 (Staff DevOps)
  {
    id: 'app-6',
    jobId: 'job-2',
    candidateId: 'cand-2',
    status: 'technical',
    source: 'LinkedIn',
    appliedAt: '2026-09-22',
    updatedAt: '2026-10-16'
  },
  {
    id: 'app-7',
    jobId: 'job-2',
    candidateId: 'cand-6',
    status: 'challenge',
    source: 'Inbound',
    appliedAt: '2026-10-06',
    updatedAt: '2026-10-18'
  },

  // Job 3 (Tech Lead IA)
  {
    id: 'app-8',
    jobId: 'job-3',
    candidateId: 'cand-3',
    status: 'fit',
    source: 'LinkedIn',
    appliedAt: '2026-09-28',
    updatedAt: '2026-10-16'
  },
  {
    id: 'app-9',
    jobId: 'job-3',
    candidateId: 'cand-8',
    status: 'screening',
    source: 'Comunidades Tech',
    appliedAt: '2026-10-09',
    updatedAt: '2026-10-17'
  },

  // Job 4 (Mobile Flutter)
  {
    id: 'app-10',
    jobId: 'job-4',
    candidateId: 'cand-5',
    status: 'challenge',
    source: 'LinkedIn',
    appliedAt: '2026-10-04',
    updatedAt: '2026-10-18'
  }
];

export const MOCK_PIPELINE_HISTORY: PipelineHistory[] = [
  {
    id: 'hist-1',
    applicationId: 'app-1',
    candidateName: 'Lucas Vasconcelos',
    jobTitle: 'Senior Fullstack Engineer',
    fromStatus: 'technical',
    toStatus: 'proposal',
    changedAt: '2026-10-18 14:30',
    changedBy: 'Camila Rocha',
    comment: 'Aprovado por unanimidade no comitê técnico. Proposta de R$ 19.500 CLT enviada.'
  },
  {
    id: 'hist-2',
    applicationId: 'app-5',
    candidateName: 'Larissa Moura Toledo',
    jobTitle: 'Senior Fullstack Engineer',
    fromStatus: 'proposal',
    toStatus: 'hired',
    changedAt: '2026-10-05 11:00',
    changedBy: 'Camila Rocha',
    comment: 'Proposta aceita! Início confirmado para 03/11.'
  },
  {
    id: 'hist-3',
    applicationId: 'app-6',
    candidateName: 'Mariana Duarte Alencar',
    jobTitle: 'Staff DevOps & Cloud Architect',
    fromStatus: 'challenge',
    toStatus: 'technical',
    changedAt: '2026-10-16 16:45',
    changedBy: 'Rodrigo Mendes',
    comment: 'Desafio prático de Terraform e Kubernetes entregue com nota 10. Agendada técnica aprofundada.'
  },
  {
    id: 'hist-4',
    applicationId: 'app-8',
    candidateName: 'Gabriel Ferreira Lima',
    jobTitle: 'Tech Lead em IA & Python',
    fromStatus: 'screening',
    toStatus: 'fit',
    changedAt: '2026-10-16 10:15',
    changedBy: 'Camila Rocha',
    comment: 'Excelente comunicação e clareza sobre expectativas de liderança.'
  }
];

export const MOCK_SCORECARDS: InterviewScorecard[] = [
  {
    id: 'sc-1',
    candidateId: 'cand-1',
    candidateName: 'Lucas Vasconcelos',
    jobId: 'job-1',
    jobTitle: 'Senior Fullstack Engineer (React / Node.js)',
    interviewerId: 'user-2',
    interviewerName: 'Rodrigo Mendes',
    overallRecommendation: 'strong_hire',
    summaryComment: 'Lucas demonstrou domínio ímpar em TypeScript, arquitetura reativa com React e patterns de concorrência com Node.js e Redis. Excelente raciocínio em System Design.',
    createdAt: '2026-10-17',
    criteriaScores: [
      { id: 'crit-1', criterion: 'Domínio Técnico (React & Node.js)', score: 5, comment: 'Profundo conhecimento interno do V8 e event loop, além de proficiência em React 19.' },
      { id: 'crit-2', criterion: 'System Design & Arquitetura', score: 5, comment: 'Desenhou arquitetura de pagamentos tolerante a falhas com idenpotência.' },
      { id: 'crit-3', criterion: 'Resolução de Problemas & Lógica', score: 4, comment: 'Abordou o desafio com clareza, fez perguntas prévias antes de codificar.' },
      { id: 'crit-4', criterion: 'Comunicação & Articulação', score: 5, comment: 'Didático, transparente e articulado.' },
      { id: 'crit-5', criterion: 'Fit Cultural & Colaboração', score: 5, comment: 'Perfil colaborativo, aberto a feedbacks e focado em mentorar desenvolvedores pleno/júnior.' }
    ]
  },
  {
    id: 'sc-2',
    candidateId: 'cand-2',
    candidateName: 'Mariana Duarte Alencar',
    jobId: 'job-2',
    jobTitle: 'Staff DevOps & Cloud Architect',
    interviewerId: 'user-2',
    interviewerName: 'Rodrigo Mendes',
    overallRecommendation: 'strong_hire',
    summaryComment: 'Mariana é uma das melhores especialistas em Kubernetes e automação que já entrevistei. Visão estratégica de FinOps e resiliência de clusters.',
    createdAt: '2026-10-16',
    criteriaScores: [
      { id: 'crit-6', criterion: 'Domínio de Kubernetes & Nuvem', score: 5, comment: 'Domínio de CNI, Service Mesh e gestão de clusters multicloud.' },
      { id: 'crit-7', criterion: 'Infraestrutura como Código (Terraform)', score: 5, comment: 'Módulos elegantes e estruturados com Terragrunt.' },
      { id: 'crit-8', criterion: 'Observabilidade & Confiabilidade (SRE)', score: 4, comment: 'Forte em SLIs, SLOs e tracing distribuído.' },
      { id: 'crit-9', criterion: 'Liderança Técnica & Mentoria', score: 5, comment: 'Capacidade de influenciar diretoria e conduzir workshops com squads.' }
    ]
  }
];

export const MOCK_SEARCH_STRINGS: SearchString[] = [
  {
    id: 'ss-1',
    userId: 'user-1',
    name: 'Senior React + Node.js (Brasil Remoto)',
    platform: 'LinkedIn',
    query: '("Senior Fullstack" OR "Tech Lead" OR "Software Engineer") AND ("React" OR "React.js" OR "Next.js") AND ("Node.js" OR "NodeJS" OR "TypeScript") AND ("AWS" OR "Docker" OR "PostgreSQL") -junior -trainee -estágio',
    roleTitle: 'Senior Fullstack Engineer',
    tags: ['React', 'Node.js', 'TypeScript', 'AWS'],
    createdAt: '2026-10-01'
  },
  {
    id: 'ss-2',
    userId: 'user-1',
    name: 'DevOps / SRE Kubernetes X-Ray Google',
    platform: 'Google',
    query: 'site:linkedin.com/in/ ("DevOps Engineer" OR "SRE" OR "Cloud Architect") ("Kubernetes" OR "K8s") "Terraform" ("AWS" OR "GCP") (Brasil OR Brazil) -recruiter -vagas',
    roleTitle: 'Staff DevOps Architect',
    tags: ['Kubernetes', 'Terraform', 'SRE', 'Cloud'],
    createdAt: '2026-10-05'
  },
  {
    id: 'ss-3',
    userId: 'user-1',
    name: 'Especialistas em IA & LLMs GitHub Search',
    platform: 'GitHub',
    query: 'location:Brazil followers:>20 language:python ("LLM" OR "LangChain" OR "PyTorch" OR "FastAPI")',
    roleTitle: 'Tech Lead IA',
    tags: ['Python', 'LLM', 'FastAPI', 'PyTorch'],
    createdAt: '2026-10-10'
  }
];
