export type UserRole = 'recruiter' | 'gestor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  title?: string;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  createdAt: string;
}

export type JobLevel = 'Junior' | 'Pleno' | 'Senior' | 'Lead' | 'Principal' | 'Staff';
export type WorkModel = 'Remoto' | 'Híbrido' | 'Presencial';
export type JobStatus = 'Aberta' | 'Pausada' | 'Fechada';
export type RequirementType = 'obrigatorio' | 'desejavel' | 'diferencial';

export interface JobRequirement {
  id: string;
  jobId: string;
  requirement: string;
  type: RequirementType;
}

export interface Job {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  department: string;
  level: JobLevel;
  salaryMin: number;
  salaryMax: number;
  workModel: WorkModel;
  location: string;
  status: JobStatus;
  description: string;
  createdAt: string;
  requirements: JobRequirement[];
  headcount: number;
  hiredCount: number;
}

export type EnglishLevel = 'Básico' | 'Intermediário' | 'Avançado' | 'Fluente / Nativo';
export type SeniorityLevel = 'Estágio' | 'Junior' | 'Pleno' | 'Senior' | 'Especialista / Lead';

export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  githubUrl: string;
  resumeUrl?: string;
  seniority: SeniorityLevel;
  currentRole: string;
  location: string;
  englishLevel: EnglishLevel;
  salaryExpectation: number;
  notes: string;
  createdAt: string;
  avatarUrl?: string;
  skills: string[];
}

export type PipelineStage = 
  | 'sourced' 
  | 'contacted' 
  | 'screening' 
  | 'fit' 
  | 'challenge' 
  | 'technical' 
  | 'proposal' 
  | 'hired' 
  | 'rejected';

export interface StageDefinition {
  id: PipelineStage;
  label: string;
  color: string;
  description: string;
}

export type CandidateSource = 
  | 'LinkedIn' 
  | 'GitHub' 
  | 'GeekHunter' 
  | 'Indicação' 
  | 'Inbound' 
  | 'Comunidades Tech';

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: PipelineStage;
  source: CandidateSource;
  appliedAt: string;
  updatedAt: string;
  rejectionReason?: string;
  hireDate?: string;
}

export interface PipelineHistory {
  id: string;
  applicationId: string;
  candidateName: string;
  jobTitle: string;
  fromStatus: PipelineStage;
  toStatus: PipelineStage;
  changedAt: string;
  changedBy: string;
  comment?: string;
}

export type InterviewType = 
  | 'Screening Inicial' 
  | 'Fit Cultural' 
  | 'Desafio Prático (Live Coding)' 
  | 'Entrevista Técnica Profunda' 
  | 'Alinhamento com Gestor / Oferta';

export interface Interview {
  id: string;
  applicationId: string;
  candidateId: string;
  candidateName: string;
  jobTitle: string;
  interviewerId: string;
  interviewerName: string;
  type: InterviewType;
  scheduledAt: string;
  status: 'Agendada' | 'Realizada' | 'Cancelada';
}

export type RecommendationType = 'strong_hire' | 'hire' | 'leaning_hire' | 'no_hire';

export interface InterviewScore {
  id: string;
  criterion: string;
  score: number; // 1 to 5
  comment: string;
}

export interface InterviewScorecard {
  id: string;
  interviewId?: string;
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  interviewerId: string;
  interviewerName: string;
  overallRecommendation: RecommendationType;
  summaryComment: string;
  criteriaScores: InterviewScore[];
  createdAt: string;
}

export type SearchPlatform = 'LinkedIn' | 'Google' | 'GitHub';

export interface SearchString {
  id: string;
  userId: string;
  name: string;
  platform: SearchPlatform;
  query: string;
  roleTitle: string;
  tags: string[];
  createdAt: string;
}

export interface MetricsData {
  openJobsCount: number;
  totalCandidates: number;
  activeInPipeline: number;
  hiredCount: number;
  averageTimeToHireDays: number;
  responseRatePercentage: number;
  sourceDistribution: { source: CandidateSource; count: number; percentage: number }[];
  stageConversion: { stage: PipelineStage; label: string; count: number; conversionRate: number }[];
}

export const APP_VERSION = '1.2.0';

