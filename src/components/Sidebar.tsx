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
  Layers,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { NavTab } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, jobs, candidates, applications, setIsPortfolioCaseModalOpen } = useApp();

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

  return (
    <aside style={{
      width: '260px',
      background: 'rgba(10, 13, 23, 0.95)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '20px 16px',
      minHeight: 'calc(100vh - 63px)'
    }}>
      {/* Navigation Links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ 
          fontSize: '0.68rem', 
          fontWeight: 700, 
          textTransform: 'uppercase', 
          letterSpacing: '0.08em', 
          color: 'var(--text-faint)', 
          padding: '8px 12px 4px' 
        }}>
          Navegação Principal
        </div>

        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
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

      {/* Case Study Card on Sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div 
          onClick={() => setIsPortfolioCaseModalOpen(true)}
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

        {/* System Status */}
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
  );
};
