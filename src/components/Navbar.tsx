import React from 'react';
import { 
  Briefcase, 
  UserCheck, 
  RotateCcw, 
  Sparkles, 
  Plus, 
  Users, 
  ShieldCheck, 
  ChevronDown 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    switchUserRole, 
    setIsNewCandidateModalOpen, 
    setIsNewJobModalOpen, 
    setIsPortfolioCaseModalOpen,
    resetDemoData,
    jobs,
    selectedJobId,
    setSelectedJobId
  } = useApp();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switchUserRole(e.target.value as UserRole);
  };

  const currentJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  return (
    <header className="navbar-header" style={{
      background: 'rgba(13, 16, 28, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      padding: '12px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Brand & Context */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(124, 58, 237, 0.4)'
          }}>
            <Briefcase size={20} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 800, 
                fontSize: '1.2rem', 
                letterSpacing: '-0.02em',
                background: 'linear-gradient(to right, #FFFFFF, #CBD5E1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                TechRecruit
              </span>
              <span style={{
                background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800,
                fontSize: '1.2rem'
              }}>
                Hub
              </span>
              <span className="badge badge-purple" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>PRO</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              ATS & Pipeline para Tech Recruiters
            </p>
          </div>
        </div>

        {/* Global Job Selector shortcut */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '4px 12px',
          marginLeft: '12px'
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Vaga Ativa:</span>
          <select 
            value={selectedJobId} 
            onChange={(e) => setSelectedJobId(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
              maxWidth: '240px'
            }}
          >
            {jobs.map(job => (
              <option key={job.id} value={job.id} style={{ background: '#0D101C', color: '#F8FAFC' }}>
                {job.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions and Profile Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Portfolio Case Study Button */}
        <button 
          onClick={() => setIsPortfolioCaseModalOpen(true)}
          className="btn btn-secondary btn-sm"
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
          className="btn btn-ghost btn-sm"
          title="Restaurar dados demo originais"
          style={{ fontSize: '0.78rem' }}
        >
          <RotateCcw size={14} />
          <span>Reset Demo</span>
        </button>

        {/* Create Buttons */}
        <button 
          onClick={() => setIsNewCandidateModalOpen(true)}
          className="btn btn-primary btn-sm"
        >
          <Plus size={15} />
          <span>Novo Candidato</span>
        </button>

        {/* Role Switcher */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '6px 12px'
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
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {currentUser.name}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={11} color="#A78BFA" />
              <select 
                value={currentUser.role} 
                onChange={handleRoleChange}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#A78BFA',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  outline: 'none',
                  padding: 0
                }}
              >
                <option value="recruiter" style={{ background: '#0D101C', color: '#F8FAFC' }}>Perfil: Recruiter</option>
                <option value="gestor" style={{ background: '#0D101C', color: '#F8FAFC' }}>Perfil: Gestor / EM</option>
                <option value="admin" style={{ background: '#0D101C', color: '#F8FAFC' }}>Perfil: Admin / Head</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
