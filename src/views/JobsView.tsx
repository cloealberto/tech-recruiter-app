import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  MapPin, 
  DollarSign, 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Job, JobStatus, RequirementType } from '../types';

export const JobsView: React.FC = () => {
  const { 
    jobs, 
    applications, 
    setSelectedJobId, 
    setActiveTab, 
    setIsNewJobModalOpen, 
    updateJob, 
    deleteJob 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | JobStatus>('Todos');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.requirements.some(r => r.requirement.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'Todos' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getReqBadge = (type: RequirementType) => {
    switch (type) {
      case 'obrigatorio':
        return <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>Obrigatório</span>;
      case 'desejavel':
        return <span className="badge badge-cyan" style={{ fontSize: '0.68rem' }}>Desejável</span>;
      case 'diferencial':
        return <span className="badge badge-amber" style={{ fontSize: '0.68rem' }}>Diferencial</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header and Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '4px' }}>Gestão de Vagas Tech</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Cadastre novas posições, defina requisitos técnicos e acompanhe o pipeline de cada time.
          </p>
        </div>

        <button 
          onClick={() => setIsNewJobModalOpen(true)}
          className="btn btn-primary"
        >
          <Plus size={16} />
          <span>Cadastrar Nova Vaga</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Buscar por cargo, squad ou tecnologia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '36px', height: '38px', fontSize: '0.84rem' }}
            />
          </div>
        </div>

        {/* Status Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {(['Todos', 'Aberta', 'Pausada', 'Fechada'] as const).map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className="btn btn-sm"
              style={{
                background: statusFilter === status ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                borderColor: statusFilter === status ? 'rgba(124, 58, 237, 0.5)' : 'var(--border)',
                color: statusFilter === status ? '#DDD6FE' : 'var(--text-secondary)',
                fontWeight: statusFilter === status ? 600 : 400
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid-2">
        {filteredJobs.map(job => {
          const jobApplications = applications.filter(a => a.jobId === job.id);
          const activeCount = jobApplications.filter(a => a.status !== 'rejected').length;
          const hired = jobApplications.filter(a => a.status === 'hired').length;

          return (
            <div 
              key={job.id} 
              className="glass-card"
              style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span className={`badge ${job.status === 'Aberta' ? 'badge-emerald' : job.status === 'Pausada' ? 'badge-amber' : 'badge-muted'}`}>
                        {job.status}
                      </span>
                      <span className="badge badge-purple">{job.level}</span>
                      <span className="badge badge-cyan">{job.workModel}</span>
                    </div>
                    <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '4px' }}>
                      {job.title}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{job.companyName}</span>
                      <span>•</span>
                      <span>{job.department}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#10B981', fontFamily: 'var(--font-mono)' }}>
                      R$ {job.salaryMin.toLocaleString('pt-BR')} - {job.salaryMax.toLocaleString('pt-BR')}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Faixa Salarial CLT</span>
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                  {job.description}
                </p>

                {/* Requirements / Stacks */}
                <div style={{ marginBottom: '18px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Requisitos Técnicos Principais
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {job.requirements.map(req => (
                      <div key={req.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', background: 'rgba(255, 255, 255, 0.02)', padding: '5px 10px', borderRadius: '6px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>• {req.requirement}</span>
                        {getReqBadge(req.type)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer and Actions */}
              <div style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                    <Users size={16} color="#06B6D4" />
                    <strong>{activeCount}</strong> <span style={{ color: 'var(--text-muted)' }}>no funil</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                    <CheckCircle size={16} color="#10B981" />
                    <strong>{hired}/{job.headcount}</strong> <span style={{ color: 'var(--text-muted)' }}>contratados</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button 
                    onClick={() => {
                      setSelectedJobId(job.id);
                      setActiveTab('kanban');
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    <Layers size={14} />
                    <span>Abrir Pipeline Kanban</span>
                  </button>

                  <select
                    value={job.status}
                    onChange={(e) => updateJob(job.id, { status: e.target.value as JobStatus })}
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.75rem',
                      padding: '5px 8px',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Aberta" style={{ background: '#0D101C' }}>Aberta</option>
                    <option value="Pausada" style={{ background: '#0D101C' }}>Pausada</option>
                    <option value="Fechada" style={{ background: '#0D101C' }}>Fechada</option>
                  </select>

                  <button 
                    onClick={() => {
                      if (confirm(`Excluir a vaga "${job.title}" e desvincular seus candidatos?`)) {
                        deleteJob(job.id);
                      }
                    }}
                    className="btn btn-danger btn-sm"
                    title="Excluir vaga"
                    style={{ padding: '6px' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
