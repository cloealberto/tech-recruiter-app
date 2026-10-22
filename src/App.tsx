import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './views/DashboardView';
import { JobsView } from './views/JobsView';
import { KanbanView } from './views/KanbanView';
import { CandidatesView } from './views/CandidatesView';
import { ScorecardView } from './views/ScorecardView';
import { BooleanSearchView } from './views/BooleanSearchView';
import { ReportsView } from './views/ReportsView';
import { SettingsView } from './views/SettingsView';

import { CandidateModal } from './components/modals/CandidateModal';
import { NewCandidateModal } from './components/modals/NewCandidateModal';
import { NewJobModal } from './components/modals/NewJobModal';
import { ScorecardModal } from './components/modals/ScorecardModal';
import { PortfolioCaseModal } from './components/modals/PortfolioCaseModal';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'jobs':
        return <JobsView />;
      case 'kanban':
        return <KanbanView />;
      case 'candidates':
        return <CandidatesView />;
      case 'scorecards':
        return <ScorecardView />;
      case 'boolean-search':
        return <BooleanSearchView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="page-container">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Modals */}
      <CandidateModal />
      <NewCandidateModal />
      <NewJobModal />
      <ScorecardModal />
      <PortfolioCaseModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
};

export default App;
