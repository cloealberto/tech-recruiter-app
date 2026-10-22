import React from 'react';
import { 
  RotateCcw, 
  Sparkles, 
  Plus, 
  ShieldCheck, 
  Menu,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    switchUserRole, 
    setIsNewCandidateModalOpen, 
    setIsPortfolioCaseModalOpen,
    resetDemoData,
    jobs,
    selectedJobId,
    setSelectedJobId,
    setIsMobileMenuOpen
  } = useApp();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switchUserRole(e.target.value as UserRole);
  };

  return (
    <header className="navbar-header" style={{
      background: 'rgba(13, 16, 28, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      gap: '12px'
    }}>
      {/* Left side: Mobile Menu Toggle & Global Job Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="mobile-hamburger-btn btn btn-secondary btn-sm"
          style={{ display: 'none', padding: '7px 9px' }}
          title="Abrir menu lateral"
        >
          <Menu size={18} />
        </button>

        {/* Global Job Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '6px 14px'
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            Vaga Ativa:
          </span>
          <select 
            value={selectedJobId} 
            onChange={(e) => setSelectedJobId(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
              maxWidth: '300px'
            }}
          >
            <option value="all" style={{ background: '#0D101C', color: '#F8FAFC' }}>
              Todas as Vagas (Visão Geral)
            </option>
            {jobs.map(job => (
              <option key={job.id} value={job.id} style={{ background: '#0D101C', color: '#F8FAFC' }}>
                {job.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right side: Actions, Novo Candidato & Profile Switcher */}
      <div className="navbar-actions" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px', 
        flexWrap: 'wrap',
        justifyContent: 'flex-end'
      }}>
        {/* Portfolio Case Study Button */}
        <button 
          onClick={() => setIsPortfolioCaseModalOpen(true)}
          className="btn btn-secondary btn-sm nav-btn-hide-mobile"
          style={{
            borderColor: 'rgba(124, 58, 237, 0.4)',
            background: 'rgba(124, 58, 237, 0.08)',
            color: '#DDD6FE'
          }}
          title="Ver decisões de produto e métricas do case"
        >
          <Sparkles size={14} color="#A78BFA" />
          <span>Case de Portfólio</span>
        </button>

        {/* Reset Demo Data Button */}
        <button 
          onClick={() => {
            if (confirm('Deseja restaurar os dados de demonstração originais?')) {
              resetDemoData();
            }
          }}
          className="btn btn-ghost btn-sm nav-btn-hide-mobile"
          title="Restaurar dados demo originais"
          style={{ fontSize: '0.78rem' }}
        >
          <RotateCcw size={14} />
          <span>Reset Demo</span>
        </button>

        {/* Novo Candidato Button - Now fully visible with zero cut-off */}
        <button 
          onClick={() => setIsNewCandidateModalOpen(true)}
          className="btn btn-primary btn-sm"
          style={{ fontWeight: 700 }}
        >
          <Plus size={16} />
          <span>Novo Candidato</span>
        </button>

        {/* Role Switcher */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '4px 10px'
        }}>
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1px solid rgba(124, 58, 237, 0.5)'
            }} 
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
              {currentUser.name.split(' ')[0]}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ShieldCheck size={11} color="#A78BFA" />
              <select 
                value={currentUser.role} 
                onChange={handleRoleChange}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#A78BFA',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  outline: 'none',
                  padding: 0
                }}
              >
                <option value="recruiter" style={{ background: '#0D101C', color: '#F8FAFC' }}>Recruiter</option>
                <option value="gestor" style={{ background: '#0D101C', color: '#F8FAFC' }}>Gestor / EM</option>
                <option value="admin" style={{ background: '#0D101C', color: '#F8FAFC' }}>Admin</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
