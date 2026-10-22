import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { 
  User, 
  UserRole, 
  Job, 
  Candidate, 
  Application, 
  PipelineStage, 
  PipelineHistory, 
  InterviewScorecard, 
  SearchString 
} from '../types';
import { 
  MOCK_USERS, 
  MOCK_JOBS, 
  MOCK_CANDIDATES, 
  MOCK_APPLICATIONS, 
  MOCK_PIPELINE_HISTORY, 
  MOCK_SCORECARDS, 
  MOCK_SEARCH_STRINGS 
} from '../data/mockData';

export type NavTab = 
  | 'dashboard' 
  | 'jobs' 
  | 'kanban' 
  | 'candidates' 
  | 'scorecards' 
  | 'boolean-search' 
  | 'reports' 
  | 'settings';

interface AppContextType {
  currentUser: User;
  users: User[];
  switchUserRole: (role: UserRole) => void;

  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;

  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'createdAt' | 'hiredCount'>) => void;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;

  candidates: Candidate[];
  addCandidate: (candidate: Omit<Candidate, 'id' | 'createdAt'>) => void;
  updateCandidate: (id: string, candidate: Partial<Candidate>) => void;
  deleteCandidate: (id: string) => void;

  applications: Application[];
  moveCandidate: (applicationId: string, newStage: PipelineStage, rejectionReason?: string) => void;
  applyCandidateToJob: (candidateId: string, jobId: string, source: any) => void;

  pipelineHistory: PipelineHistory[];
  scorecards: InterviewScorecard[];
  addScorecard: (scorecard: Omit<InterviewScorecard, 'id' | 'createdAt'>) => void;

  searchStrings: SearchString[];
  addSearchString: (item: Omit<SearchString, 'id' | 'createdAt' | 'userId'>) => void;
  deleteSearchString: (id: string) => void;

  selectedJobId: string;
  setSelectedJobId: (id: string) => void;

  selectedCandidateId: string | null;
  setSelectedCandidateId: (id: string | null) => void;

  isNewCandidateModalOpen: boolean;
  setIsNewCandidateModalOpen: (open: boolean) => void;

  isNewJobModalOpen: boolean;
  setIsNewJobModalOpen: (open: boolean) => void;

  isScorecardModalOpen: boolean;
  setIsScorecardModalOpen: (open: boolean) => void;
  candidateForScorecard: Candidate | null;
  setCandidateForScorecard: (candidate: Candidate | null) => void;

  isPortfolioCaseModalOpen: boolean;
  setIsPortfolioCaseModalOpen: (open: boolean) => void;

  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;

  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'techrecruit_hub_v1_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}role`);
    return (saved as UserRole) || 'recruiter';
  });

  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [selectedJobId, setSelectedJobId] = useState<string>('job-1');

  // Modals state
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [isNewCandidateModalOpen, setIsNewCandidateModalOpen] = useState(false);
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);
  const [isScorecardModalOpen, setIsScorecardModalOpen] = useState(false);
  const [candidateForScorecard, setCandidateForScorecard] = useState<Candidate | null>(null);
  const [isPortfolioCaseModalOpen, setIsPortfolioCaseModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Entities state with LocalStorage caching
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}jobs`);
    return saved ? JSON.parse(saved) : MOCK_JOBS;
  });

  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}candidates`);
    return saved ? JSON.parse(saved) : MOCK_CANDIDATES;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}applications`);
    return saved ? JSON.parse(saved) : MOCK_APPLICATIONS;
  });

  const [pipelineHistory, setPipelineHistory] = useState<PipelineHistory[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}history`);
    return saved ? JSON.parse(saved) : MOCK_PIPELINE_HISTORY;
  });

  const [scorecards, setScorecards] = useState<InterviewScorecard[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}scorecards`);
    return saved ? JSON.parse(saved) : MOCK_SCORECARDS;
  });

  const [searchStrings, setSearchStrings] = useState<SearchString[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}searches`);
    return saved ? JSON.parse(saved) : MOCK_SEARCH_STRINGS;
  });

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}role`, currentUserRole);
  }, [currentUserRole]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}jobs`, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}candidates`, JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}applications`, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}history`, JSON.stringify(pipelineHistory));
  }, [pipelineHistory]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}scorecards`, JSON.stringify(scorecards));
  }, [scorecards]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}searches`, JSON.stringify(searchStrings));
  }, [searchStrings]);

  const currentUser = MOCK_USERS.find(u => u.role === currentUserRole) || MOCK_USERS[0];

  const switchUserRole = (role: UserRole) => {
    setCurrentUserRole(role);
  };

  const addJob = (jobData: Omit<Job, 'id' | 'createdAt' | 'hiredCount'>) => {
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      hiredCount: 0
    };
    setJobs(prev => [newJob, ...prev]);
  };

  const updateJob = (id: string, updatedFields: Partial<Job>) => {
    setJobs(prev => prev.map(j => (j.id === id ? { ...j, ...updatedFields } : j)));
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
    setApplications(prev => prev.filter(a => a.jobId !== id));
  };

  const addCandidate = (candidateData: Omit<Candidate, 'id' | 'createdAt'>) => {
    const newCandidate: Candidate = {
      ...candidateData,
      id: `cand-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + (Date.now() % 100000)}?w=150&auto=format&fit=crop&q=80`
    };
    setCandidates(prev => [newCandidate, ...prev]);

    // Automatically apply to selected job in 'sourced' stage if on kanban
    if (selectedJobId) {
      applyCandidateToJob(newCandidate.id, selectedJobId, 'Inbound');
    }
  };

  const updateCandidate = (id: string, updatedFields: Partial<Candidate>) => {
    setCandidates(prev => prev.map(c => (c.id === id ? { ...c, ...updatedFields } : c)));
  };

  const deleteCandidate = (id: string) => {
    setCandidates(prev => prev.filter(c => c.id !== id));
    setApplications(prev => prev.filter(a => a.candidateId !== id));
  };

  const moveCandidate = (applicationId: string, newStage: PipelineStage, rejectionReason?: string) => {
    const app = applications.find(a => a.id === applicationId);
    if (!app) return;

    const oldStage = app.status;
    if (oldStage === newStage) return;

    const candidate = candidates.find(c => c.id === app.candidateId);
    const job = jobs.find(j => j.id === app.jobId);

    // Update application
    const updatedApps = applications.map(a => {
      if (a.id === applicationId) {
        return {
          ...a,
          status: newStage,
          updatedAt: new Date().toISOString().split('T')[0],
          rejectionReason: newStage === 'rejected' ? rejectionReason : undefined,
          hireDate: newStage === 'hired' ? new Date().toISOString().split('T')[0] : a.hireDate
        };
      }
      return a;
    });
    setApplications(updatedApps);

    // If hired, fire confetti!
    if (newStage === 'hired') {
      try {
        confetti({
          particleCount: 120,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback gracefully
      }

      // Increment hiredCount for job
      if (job) {
        setJobs(prev => prev.map(j => j.id === job.id ? { ...j, hiredCount: j.hiredCount + 1 } : j));
      }
    }

    // Add to history
    const historyItem: PipelineHistory = {
      id: `hist-${Date.now()}`,
      applicationId,
      candidateName: candidate?.fullName || 'Candidato',
      jobTitle: job?.title || 'Vaga',
      fromStatus: oldStage,
      toStatus: newStage,
      changedAt: new Date().toLocaleString('pt-BR'),
      changedBy: currentUser.name,
      comment: rejectionReason ? `Reprovado: ${rejectionReason}` : `Movido de ${oldStage} para ${newStage}`
    };
    setPipelineHistory(prev => [historyItem, ...prev]);
  };

  const applyCandidateToJob = (candidateId: string, jobId: string, source: any = 'LinkedIn') => {
    // Check if already applied
    const exists = applications.find(a => a.candidateId === candidateId && a.jobId === jobId);
    if (exists) return;

    const newApp: Application = {
      id: `app-${Date.now()}`,
      candidateId,
      jobId,
      status: 'sourced',
      source: source || 'LinkedIn',
      appliedAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setApplications(prev => [newApp, ...prev]);
  };

  const addScorecard = (scorecardData: Omit<InterviewScorecard, 'id' | 'createdAt'>) => {
    const newScorecard: InterviewScorecard = {
      ...scorecardData,
      id: `sc-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setScorecards(prev => [newScorecard, ...prev]);
  };

  const addSearchString = (item: Omit<SearchString, 'id' | 'createdAt' | 'userId'>) => {
    const newSearch: SearchString = {
      ...item,
      id: `ss-${Date.now()}`,
      userId: currentUser.id,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSearchStrings(prev => [newSearch, ...prev]);
  };

  const deleteSearchString = (id: string) => {
    setSearchStrings(prev => prev.filter(s => s.id !== id));
  };

  const resetDemoData = () => {
    setJobs(MOCK_JOBS);
    setCandidates(MOCK_CANDIDATES);
    setApplications(MOCK_APPLICATIONS);
    setPipelineHistory(MOCK_PIPELINE_HISTORY);
    setScorecards(MOCK_SCORECARDS);
    setSearchStrings(MOCK_SEARCH_STRINGS);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users: MOCK_USERS,
        switchUserRole,
        activeTab,
        setActiveTab,
        jobs,
        addJob,
        updateJob,
        deleteJob,
        candidates,
        addCandidate,
        updateCandidate,
        deleteCandidate,
        applications,
        moveCandidate,
        applyCandidateToJob,
        pipelineHistory,
        scorecards,
        addScorecard,
        searchStrings,
        addSearchString,
        deleteSearchString,
        selectedJobId,
        setSelectedJobId,
        selectedCandidateId,
        setSelectedCandidateId,
        isNewCandidateModalOpen,
        setIsNewCandidateModalOpen,
        isNewJobModalOpen,
        setIsNewJobModalOpen,
        isScorecardModalOpen,
        setIsScorecardModalOpen,
        candidateForScorecard,
        setCandidateForScorecard,
        isPortfolioCaseModalOpen,
        setIsPortfolioCaseModalOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
