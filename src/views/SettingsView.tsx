import React, { useState } from 'react';
import { 
  Settings, 
  Users, 
  ShieldCheck, 
  Download, 
  RotateCcw, 
  Building, 
  Key, 
  Check, 
  Sliders,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { UserRole } from '../types';

export const SettingsView: React.FC = () => {
  const { 
    currentUser, 
    switchUserRole, 
    users, 
    resetDemoData, 
    jobs, 
    candidates, 
    applications, 
    scorecards, 
    searchStrings 
  } = useApp();

  const [companyName, setCompanyName] = useState('Nexus Cloud Technologies');
  const [industry, setIndustry] = useState('Fintech & Cloud Banking');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const permissionsMatrix = [
    { action: 'Criar e Editar Vagas', recruiter: true, gestor: true, admin: true },
    { action: 'Mover Candidatos no Kanban', recruiter: true, gestor: true, admin: true },
    { action: 'Visualizar Pretensão Salarial', recruiter: true, gestor: false, admin: true },
    { action: 'Preencher Scorecard de Entrevista', recruiter: true, gestor: true, admin: true },
    { action: 'Aprovar Carta de Oferta / Proposta', recruiter: false, gestor: true, admin: true },
    { action: 'Exportar Base de Dados em JSON', recruiter: false, gestor: false, admin: true },
    { action: 'Gerenciar Usuários e Permissões', recruiter: false, gestor: false, admin: true }
  ];

  const handleExportData = () => {
    const fullBackup = {
      exportedAt: new Date().toISOString(),
      company: { name: companyName, industry },
      jobs,
      candidates,
      applications,
      scorecards,
      searchStrings
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `techrecruit_hub_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '4px' }}>
          Configurações, Governança e Usuários
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Gerencie acessos de Tech Recruiters e Gestores, controle de permissões por papel e backup de dados.
        </p>
      </div>

      {/* Profile Switcher Card */}
      <div className="glass-card" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)', borderColor: 'rgba(124, 58, 237, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <ShieldCheck size={18} color="#A78BFA" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#DDD6FE', textTransform: 'uppercase' }}>
                Alternador Rápido de Papéis (Demonstração)
              </span>
            </div>
            <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '4px' }}>
              Perfil Ativo no Momento: <strong style={{ color: '#06B6D4' }}>{currentUser.name}</strong> ({currentUser.role.toUpperCase()})
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Alterne entre perfis para testar a experiência com diferentes visões de permissão.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {(['recruiter', 'gestor', 'admin'] as const).map(role => (
              <button
                key={role}
                onClick={() => switchUserRole(role)}
                className="btn"
                style={{
                  background: currentUser.role === role ? 'linear-gradient(135deg, #7C3AED, #6366F1)' : 'rgba(255, 255, 255, 0.04)',
                  borderColor: currentUser.role === role ? 'transparent' : 'var(--border)',
                  color: '#FFFFFF',
                  fontSize: '0.82rem',
                  textTransform: 'capitalize'
                }}
              >
                {role === 'recruiter' ? '👩‍💼 Recruiter' : role === 'gestor' ? '👨‍💻 Gestor / EM' : '👑 Admin / Head'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Users List & Permissions Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '24px' }}>
        {/* Team Users */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} color="#A78BFA" /> Usuários da Organização
            </h3>
            <span className="badge badge-purple">{users.length} ativos</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {users.map(u => (
              <div 
                key={u.id}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src={u.avatar} 
                    alt={u.name} 
                    style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '0.88rem', color: '#FFFFFF' }}>{u.name}</h4>
                    <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{u.email}</p>
                    <span style={{ fontSize: '0.7rem', color: '#06B6D4' }}>{u.title}</span>
                  </div>
                </div>

                <span className={`badge ${u.role === 'admin' ? 'badge-rose' : u.role === 'gestor' ? 'badge-cyan' : 'badge-purple'}`}>
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Permissions Matrix */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} color="#06B6D4" /> Matriz de Permissões RBAC
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Controle de acesso granular por papel de usuário
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '8px 10px' }}>Ação do Sistema</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center' }}>Recruiter</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center' }}>Gestor</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center' }}>Admin</th>
                </tr>
              </thead>
              <tbody>
                {permissionsMatrix.map((item, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '10px 10px', color: '#F8FAFC' }}>{item.action}</td>
                    <td style={{ padding: '10px 10px', textAlign: 'center' }}>
                      {item.recruiter ? <Check size={16} color="#10B981" /> : <span style={{ color: 'var(--text-faint)' }}>—</span>}
                    </td>
                    <td style={{ padding: '10px 10px', textAlign: 'center' }}>
                      {item.gestor ? <Check size={16} color="#10B981" /> : <span style={{ color: 'var(--text-faint)' }}>—</span>}
                    </td>
                    <td style={{ padding: '10px 10px', textAlign: 'center' }}>
                      {item.admin ? <Check size={16} color="#10B981" /> : <span style={{ color: 'var(--text-faint)' }}>—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Organization Info & Backup Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Company Settings Form */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={18} color="#A78BFA" /> Dados da Empresa / Organização
          </h3>

          <form onSubmit={handleSaveCompany} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Nome da Organização</label>
              <input 
                type="text" 
                className="form-input" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Setor de Atuação</label>
              <input 
                type="text" 
                className="form-input" 
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
              <button type="submit" className="btn btn-primary">
                Salvar Alterações
              </button>
              {savedSuccess && (
                <span style={{ fontSize: '0.8rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={14} /> Salvo com sucesso!
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Data Backup & Reset */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '8px' }}>
              Backup e Manutenção
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Exporte todos os candidatos, vagas, avaliações de scorecard e histórico do funil em formato JSON estruturado.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              onClick={handleExportData}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'flex-start' }}
            >
              <Download size={16} color="#06B6D4" />
              <span>Exportar Backup Completo (JSON)</span>
            </button>

            <button 
              onClick={() => {
                if (confirm('Tem certeza que deseja resetar todos os dados para os valores padrão de demonstração?')) {
                  resetDemoData();
                  alert('Dados restaurados para o padrão de demonstração!');
                }
              }}
              className="btn btn-danger"
              style={{ width: '100%', justifyContent: 'flex-start' }}
            >
              <RotateCcw size={16} />
              <span>Restaurar Dados Originais de Demonstração</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
