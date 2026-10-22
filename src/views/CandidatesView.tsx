import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  ExternalLink, 
  MapPin, 
  Mail, 
  Phone, 
  Briefcase, 
  Star, 
  Layers, 
  Trash2, 
  FileCheck2,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Candidate, SeniorityLevel, EnglishLevel } from '../types';

export const CandidatesView: React.FC = () => {
  const { 
    candidates, 
    jobs, 
    applications, 
    applyCandidateToJob, 
    setSelectedCandidateId, 
    setIsNewCandidateModalOpen, 
    deleteCandidate,
    setCandidateForScorecard,
    setIsScorecardModalOpen 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeniority, setSelectedSeniority] = useState<string>('Todos');
  const [selectedSkill, setSelectedSkill] = useState<string>('Todos');
  const [selectedJobToAssign, setSelectedJobToAssign] = useState<Record<string, string>>({});

  // Collect all unique skills for filter
  const allSkills = Array.from(new Set(candidates.flatMap(c => c.skills))).sort();

  const filteredCandidates = candidates.filter(cand => {
    const matchesSearch = 
      cand.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cand.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cand.currentRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cand.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSeniority = selectedSeniority === 'Todos' || cand.seniority === selectedSeniority;
    const matchesSkill = selectedSkill === 'Todos' || cand.skills.includes(selectedSkill);

    return matchesSearch && matchesSeniority && matchesSkill;
  });

  const handleAssignToJob = (candidateId: string) => {
    const jobId = selectedJobToAssign[candidateId];
    if (!jobId) {
      alert('Selecione uma vaga para associar o candidato.');
      return;
    }
    applyCandidateToJob(candidateId, jobId, 'Banco de Talentos');
    alert('Candidato adicionado ao pipeline da vaga com sucesso!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header and Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '4px' }}>Banco de Talentos Tech</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Base qualificada de desenvolvedores, arquitetos, engenheiros de dados e líderes técnicos.
          </p>
        </div>

        <button 
          onClick={() => setIsNewCandidateModalOpen(true)}
          className="btn btn-primary"
        >
          <Plus size={16} />
          <span>Cadastrar Novo Talento</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: '260px', maxWidth: '380px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Buscar por nome, cargo, cidade ou stack..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '36px', height: '38px', fontSize: '0.84rem' }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Seniority Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Senioridade:</span>
            <select
              value={selectedSeniority}
              onChange={(e) => setSelectedSeniority(e.target.value)}
              className="form-select"
              style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem' }}
            >
              <option value="Todos">Todas as Senioridades</option>
              <option value="Junior">Junior</option>
              <option value="Pleno">Pleno</option>
              <option value="Senior">Senior</option>
              <option value="Especialista / Lead">Especialista / Lead</option>
            </select>
          </div>

          {/* Skill Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tecnologia:</span>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="form-select"
              style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem' }}
            >
              <option value="Todos">Todas as Tecnologias</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
            {filteredCandidates.length} talentos encontrados
          </span>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid-2">
        {filteredCandidates.map(candidate => {
          const candApps = applications.filter(a => a.candidateId === candidate.id);

          return (
            <div 
              key={candidate.id}
              className="glass-card"
              style={{
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                {/* Candidate Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img 
                      src={candidate.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
                      alt={candidate.fullName} 
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '14px',
                        objectFit: 'cover',
                        border: '1px solid rgba(124, 58, 237, 0.4)'
                      }}
                    />

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 
                          onClick={() => setSelectedCandidateId(candidate.id)}
                          style={{ 
                            fontSize: '1.05rem', 
                            color: '#FFFFFF', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#A78BFA')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                        >
                          {candidate.fullName}
                        </h3>
                        <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>
                          {candidate.seniority}
                        </span>
                      </div>

                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {candidate.currentRole}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={12} /> {candidate.location}
                        </span>
                        <span>•</span>
                        <span>Inglês: <strong style={{ color: '#06B6D4' }}>{candidate.englishLevel}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#10B981', fontFamily: 'var(--font-mono)' }}>
                      R$ {candidate.salaryExpectation.toLocaleString('pt-BR')}
                    </div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Pretensão CLT</span>
                  </div>
                </div>

                {/* Technical Skills Badges */}
                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Hard Skills & Tecnologias
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {candidate.skills.map((skill, i) => (
                      <span 
                        key={i} 
                        style={{
                          fontSize: '0.72rem',
                          padding: '3px 8px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border)',
                          borderRadius: '6px',
                          color: '#E2E8F0'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notes preview */}
                {candidate.notes && (
                  <p style={{
                    marginTop: '12px',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    fontStyle: 'italic',
                    background: 'rgba(0,0,0,0.2)',
                    padding: '8px 12px',
                    borderRadius: '6px'
                  }}>
                    "{candidate.notes}"
                  </p>
                )}

                {/* Active Applications */}
                <div style={{ marginTop: '14px', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Briefcase size={14} color="#A78BFA" />
                  <span>Vagas ativas: </span>
                  {candApps.length > 0 ? (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {candApps.map(a => {
                        const job = jobs.find(j => j.id === a.jobId);
                        return (
                          <span key={a.id} className="badge badge-cyan" style={{ fontSize: '0.68rem' }}>
                            {job?.title.split(' ')[0]} ({a.status})
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <span style={{ color: 'var(--text-faint)' }}>Nenhuma vaga vinculada</span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                {/* Assign to Job selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '220px' }}>
                  <select
                    className="form-select"
                    style={{ fontSize: '0.75rem', padding: '6px 10px' }}
                    value={selectedJobToAssign[candidate.id] || ''}
                    onChange={(e) => setSelectedJobToAssign(prev => ({ ...prev, [candidate.id]: e.target.value }))}
                  >
                    <option value="">Vincular a uma Vaga...</option>
                    {jobs.filter(j => j.status === 'Aberta').map(job => (
                      <option key={job.id} value={job.id}>{job.title}</option>
                    ))}
                  </select>
                  <button 
                    onClick={() => handleAssignToJob(candidate.id)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '6px 10px', fontSize: '0.74rem' }}
                  >
                    Vincular
                  </button>
                </div>

                {/* Direct Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => {
                      setCandidateForScorecard(candidate);
                      setIsScorecardModalOpen(true);
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.74rem', color: '#DDD6FE' }}
                  >
                    <FileCheck2 size={14} color="#A78BFA" />
                    <span>Scorecard</span>
                  </button>

                  <button
                    onClick={() => setSelectedCandidateId(candidate.id)}
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: '0.74rem' }}
                  >
                    Ver Perfil Completo
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Excluir candidato "${candidate.fullName}"?`)) {
                        deleteCandidate(candidate.id);
                      }
                    }}
                    className="btn btn-danger btn-sm"
                    style={{ padding: '6px' }}
                    title="Excluir do banco"
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
