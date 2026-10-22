import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Columns3, 
  Users, 
  FileCheck2, 
  Search, 
  BarChart3, 
  Settings, 
  Sparkles,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { NavTab } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    jobs, 
    candidates, 
    applications, 
    setIsPortfolioCaseModalOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useApp();

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { 
      id: 'dashboard', 
      label: 'Dashboard & KPIs', 
      icon: <LayoutDashboard size={18} /> 
    },
    { 
      id: 'jobs', 
      label: 'Vagas Tech', 
      icon: <Briefcase size={18} />, 
      badge: jobs.filter(j => j.status === 'Aberta').length 
    },
    { 
      id: 'kanban', 
      label: 'Pipeline Kanban', 
      icon: <Columns3 size={18} />,
      badge: applications.filter(a => a.status !== 'rejected').length 
    },
    { 
      id: 'candidates', 
      label: 'Banco de Talentos', 
      icon: <Users size={18} />, 
      badge: candidates.length 
    },
    { 
      id: 'scorecards', 
      label: 'Scorecards', 
      icon: <FileCheck2 size={18} /> 
    },
    { 
      id: 'boolean-search', 
      label: 'Gerador Booleano', 
      icon: <Search size={18} /> 
    },
    { 
      id: 'reports', 
      label: 'Relatórios & Funil', 
      icon: <BarChart3 size={18} /> 
    },
    { 
      id: 'settings', 
      label: 'Configurações', 
      icon: <Settings size={18} /> 
    }
  ];

  const handleNavClick = (id: NavTab) => {
    setActiveTab(id);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="mobile-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(6px)',
            zIndex: 998
          }}
        />
      )}

      <aside 
        className={`app-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}
        style={{
          width: '270px',
          minWidth: '270px',
          background: 'rgba(10, 13, 23, 0.98)',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '100vh',
          zIndex: 999
        }}
      >
        <div>
          {/* Brand Logo Header inside Sidebar */}
          <div style={{
            padding: '20px 20px 18px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
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
                    fontSize: '1.15rem', 
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
                    fontSize: '1.15rem'
                  }}>
                    Hub
                  </span>
                  <span className="badge badge-purple" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>PRO</span>
                </div>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  ATS & Pipeline para Tech Recruiters
                </p>
              </div>
            </div>

            {/* Close button for mobile screens */}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-close-btn btn btn-ghost btn-sm"
              style={{ display: 'none', padding: '4px' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '18px 14px' }}>
            <div style={{ 
              fontSize: '0.68rem', 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              letterSpacing: '0.08em', 
              color: 'var(--text-faint)', 
              padding: '6px 12px 6px' 
            }}>
              Navegação Principal
            </div>

            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid',
                    borderColor: isActive ? 'rgba(124, 58, 237, 0.4)' : 'transparent',
                    background: isActive 
                      ? 'linear-gradient(90deg, rgba(124, 58, 237, 0.18) 0%, rgba(124, 58, 237, 0.05) 100%)' 
                      : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textAlign: 'left',
                    width: '100%'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ 
                      color: isActive ? '#A78BFA' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center' 
                    }}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span 
                      className={`badge ${isActive ? 'badge-purple' : 'badge-muted'}`}
                      style={{ fontSize: '0.7rem', padding: '2px 7px' }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '14px 14px 20px' }}>
          <div 
            onClick={() => {
              setIsPortfolioCaseModalOpen(true);
              if (isMobileMenuOpen) setIsMobileMenuOpen(false);
            }}
            style={{
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
              border: '1px solid rgba(124, 58, 237, 0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            className="glass-card-interactive"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Sparkles size={16} color="#A78BFA" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#DDD6FE' }}>
                Diferencial de Portfólio
              </span>
            </div>
            <p style={{ fontSize: '0.73rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Veja o case completo: redução de 40% no time-to-hire e arquitetura da solução.
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="pulse-indicator" />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Supabase Demo Sync
              </span>
            </div>
            <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              v1.2.0
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
