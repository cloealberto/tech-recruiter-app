import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  ExternalLink, 
  Sparkles, 
  Award, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileCheck2, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  GripVertical
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PIPELINE_STAGES } from '../data/mockData';
import type { PipelineStage, Candidate } from '../types';

export const KanbanView: React.FC = () => {
  const { 
    jobs, 
    selectedJobId, 
    setSelectedJobId, 
    candidates, 
    applications, 
    moveCandidate, 
    setSelectedCandidateId,
    setIsNewCandidateModalOpen,
    setCandidateForScorecard,
    setIsScorecardModalOpen,
    scorecards
  } = useApp();

  const [draggedAppId, setDraggedAppId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<PipelineStage | null>(null);
  const [rejectModalApp, setRejectModalApp] = useState<{ id: string; name: string } | null>(null);
  const [rejectionReason, setRejectionReason] = useState('Reprovado no Desafio Técnico');
  const [searchQuery, setSearchQuery] = useState('');

  const currentJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  // Applications for current job
  const jobApplications = applications.filter(a => {
    if (selectedJobId !== 'all' && a.jobId !== selectedJobId) return false;
    
    if (searchQuery.trim()) {
      const candidate = candidates.find(c => c.id === a.candidateId);
      if (!candidate) return false;
      const query = searchQuery.toLowerCase();
      const matchesName = candidate.fullName.toLowerCase().includes(query);
      const matchesSkills = candidate.skills.some(s => s.toLowerCase().includes(query));
      return matchesName || matchesSkills;
    }
    return true;
  });

  const handleDragStart = (e: React.DragEvent, appId: string) => {
    setDraggedAppId(appId);
    e.dataTransfer.setData('text/plain', appId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, stageId: PipelineStage) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverStage !== stageId) {
      setDragOverStage(stageId);
    }
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const handleDrop = (e: React.DragEvent, targetStage: PipelineStage) => {
    e.preventDefault();
    setDragOverStage(null);
    const appId = e.dataTransfer.getData('text/plain') || draggedAppId;
    if (appId) {
      if (targetStage === 'rejected') {
        const app = applications.find(a => a.id === appId);
        const cand = candidates.find(c => c.id === app?.candidateId);
        setRejectModalApp({ id: appId, name: cand?.fullName || 'Candidato' });
      } else {
        moveCandidate(appId, targetStage);
      }
    }
    setDraggedAppId(null);
  };

  const confirmRejection = () => {
    if (rejectModalApp) {
      moveCandidate(rejectModalApp.id, 'rejected', rejectionReason);
      setRejectModalApp(null);
    }
  };

  const stageOrder: PipelineStage[] = [
    'sourced', 
    'contacted', 
    'screening', 
    'fit', 
    'challenge', 
    'technical', 
    'proposal', 
    'hired', 
    'rejected'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Controls Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flexWrap: 'wrap', 
        gap: '16px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Pipeline Kanban da Vaga
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="form-select"
                style={{ 
                  fontWeight: 700, 
                  fontSize: '1.15rem', 
                  fontFamily: 'var(--font-display)', 
                  padding: '6px 12px',
                  maxWidth: '380px'
                }}
              >
                <option value="all">Todas as Vagas (Visão Geral)</option>
                {jobs.map(j => (
                  <option key={j.id} value={j.id}>
                    {j.title} ({j.level})
                  </option>
                ))}
              </select>
              
              {currentJob && selectedJobId !== 'all' && (
                <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
                  {currentJob.workModel} • R$ {(currentJob.salaryMin / 1000).toFixed(0)}k-{(currentJob.salaryMax / 1000).toFixed(0)}k
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions & Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Buscar no board..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '32px', height: '36px', fontSize: '0.8rem' }}
            />
          </div>

          <button 
            onClick={() => setIsNewCandidateModalOpen(true)}
            className="btn btn-primary btn-sm"
          >
            <Plus size={15} />
            <span>Adicionar a este Pipeline</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Horizontal Scroll Container */}
      <div 
        className="kanban-board-container"
        style={{
          display: 'flex',
          gap: '14px',
          overflowX: 'auto',
          paddingBottom: '20px',
          minHeight: '680px',
          alignItems: 'stretch'
        }}
      >
        {PIPELINE_STAGES.map((stage) => {
          const stageApps = jobApplications.filter(a => a.status === stage.id);
          const isOver = dragOverStage === stage.id;
          const stageIndex = stageOrder.indexOf(stage.id);

          return (
            <div
              key={stage.id}
              onDragOver={(e) => handleDragOver(e, stage.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage.id)}
              style={{
                width: '310px',
                minWidth: '310px',
                background: isOver 
                  ? 'rgba(124, 58, 237, 0.12)' 
                  : 'rgba(13, 16, 28, 0.65)',
                border: '1px solid',
                borderColor: isOver 
                  ? stage.color 
                  : 'var(--border)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(10px)',
                boxShadow: isOver ? `0 0 20px ${stage.color}40` : 'none'
              }}
            >
              {/* Column Header */}
              <div style={{
                padding: '14px 16px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255, 255, 255, 0.02)',
                borderTopLeftRadius: 'var(--radius-lg)',
                borderTopRightRadius: 'var(--radius-lg)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: stage.color,
                    boxShadow: `0 0 8px ${stage.color}`
                  }} />
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#FFFFFF' }}>
                    {stage.label}
                  </span>
                </div>

                <span 
                  className="badge badge-muted"
                  style={{
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    background: stageApps.length > 0 ? 'rgba(255, 255, 255, 0.08)' : 'transparent'
                  }}
                >
                  {stageApps.length}
                </span>
              </div>

              {/* Cards Container */}
              <div style={{
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                flex: 1,
                overflowY: 'auto',
                maxHeight: '640px'
              }}>
                {stageApps.length === 0 ? (
                  <div style={{
                    padding: '30px 10px',
                    textAlign: 'center',
                    color: 'var(--text-faint)',
                    fontSize: '0.78rem',
                    border: '1px dashed var(--border)',
                    borderRadius: 'var(--radius-md)'
                  }}>
                    Arraste candidatos para cá
                  </div>
                ) : (
                  stageApps.map((app) => {
                    const candidate = candidates.find(c => c.id === app.candidateId);
                    if (!candidate) return null;
                    const job = jobs.find(j => j.id === app.jobId);
                    const candidateScorecards = scorecards.filter(s => s.candidateId === candidate.id);

                    return (
                      <div
                        key={app.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, app.id)}
                        className="glass-card"
                        style={{
                          padding: '14px',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'grab',
                          background: 'rgba(20, 25, 44, 0.9)',
                          border: '1px solid var(--border)',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          position: 'relative'
                        }}
                      >
                        {/* Drag Handle & Candidate Header */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <img 
                            src={candidate.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
                            alt={candidate.fullName} 
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              border: '1px solid var(--border)'
                            }}
                          />

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <h4 
                                onClick={() => setSelectedCandidateId(candidate.id)}
                                style={{ 
                                  fontSize: '0.88rem', 
                                  color: '#FFFFFF', 
                                  fontWeight: 700, 
                                  cursor: 'pointer',
                                  textDecoration: 'none'
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#A78BFA')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                              >
                                {candidate.fullName}
                              </h4>
                              <GripVertical size={14} color="var(--text-faint)" />
                            </div>

                            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {candidate.currentRole}
                            </p>
                          </div>
                        </div>

                        {/* Badges: Seniority, English & Source */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                          <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>
                            {candidate.seniority}
                          </span>
                          <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                            {candidate.englishLevel}
                          </span>
                          <span className="badge badge-muted" style={{ fontSize: '0.65rem' }}>
                            {app.source}
                          </span>
                        </div>

                        {/* Top Technical Skills */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {candidate.skills.slice(0, 3).map((skill, i) => (
                            <span 
                              key={i} 
                              style={{ 
                                fontSize: '0.66rem', 
                                padding: '2px 6px', 
                                background: 'rgba(255, 255, 255, 0.04)', 
                                border: '1px solid var(--border-subtle)', 
                                borderRadius: '4px',
                                color: 'var(--text-secondary)'
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                          {candidate.skills.length > 3 && (
                            <span style={{ fontSize: '0.66rem', color: 'var(--text-faint)' }}>
                              +{candidate.skills.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Salary and Scorecard indicator */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderTop: '1px solid var(--border-subtle)',
                          paddingTop: '8px',
                          fontSize: '0.73rem',
                          color: 'var(--text-muted)'
                        }}>
                          <span style={{ fontFamily: 'var(--font-mono)', color: '#10B981', fontWeight: 600 }}>
                            R$ {candidate.salaryExpectation.toLocaleString('pt-BR')}
                          </span>

                          {candidateScorecards.length > 0 ? (
                            <div 
                              onClick={() => setSelectedCandidateId(candidate.id)}
                              style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#DDD6FE', cursor: 'pointer' }}
                              title="Scorecard preenchido"
                            >
                              <Award size={13} color="#A78BFA" />
                              <span>{candidateScorecards.length} Scorecard</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setCandidateForScorecard(candidate);
                                setIsScorecardModalOpen(true);
                              }}
                              className="btn btn-ghost btn-sm"
                              style={{ padding: '2px 6px', fontSize: '0.68rem', color: '#A78BFA' }}
                            >
                              + Scorecard
                            </button>
                          )}
                        </div>

                        {/* Rejection comment if rejected */}
                        {stage.id === 'rejected' && app.rejectionReason && (
                          <div style={{
                            padding: '6px 8px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: '4px',
                            border: '1px solid rgba(239, 68, 68, 0.25)',
                            fontSize: '0.7rem',
                            color: '#F87171'
                          }}>
                            <strong>Motivo:</strong> {app.rejectionReason}
                          </div>
                        )}

                        {/* Quick Step Advance Buttons */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: 'rgba(0, 0, 0, 0.2)',
                          padding: '4px 6px',
                          borderRadius: '6px',
                          marginTop: '2px'
                        }}>
                          {stageIndex > 0 ? (
                            <button
                              onClick={() => moveCandidate(app.id, stageOrder[stageIndex - 1])}
                              className="btn btn-ghost btn-sm"
                              style={{ padding: '3px 6px', fontSize: '0.7rem' }}
                              title={`Voltar para ${stageOrder[stageIndex - 1]}`}
                            >
                              <ChevronLeft size={13} /> Voltar
                            </button>
                          ) : <div />}

                          <button
                            onClick={() => setSelectedCandidateId(candidate.id)}
                            className="btn btn-ghost btn-sm"
                            style={{ padding: '3px 6px', fontSize: '0.7rem', color: '#DDD6FE' }}
                          >
                            Ver Perfil
                          </button>

                          {stageIndex < stageOrder.length - 2 ? (
                            <button
                              onClick={() => moveCandidate(app.id, stageOrder[stageIndex + 1])}
                              className="btn btn-primary btn-sm"
                              style={{ padding: '3px 8px', fontSize: '0.7rem' }}
                              title={`Avançar para ${stageOrder[stageIndex + 1]}`}
                            >
                              Avançar <ChevronRight size={13} />
                            </button>
                          ) : stage.id === 'proposal' ? (
                            <button
                              onClick={() => moveCandidate(app.id, 'hired')}
                              className="btn btn-success btn-sm"
                              style={{ padding: '3px 8px', fontSize: '0.7rem' }}
                            >
                              Contratar 🎉
                            </button>
                          ) : <div />}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Rejection Reason Modal */}
      {rejectModalApp && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', color: '#F87171', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <XCircle size={18} /> Registrar Reprovação
              </h3>
              <button onClick={() => setRejectModalApp(null)} className="btn btn-ghost btn-sm">✕</button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                Selecione o motivo de desqualificação de <strong>{rejectModalApp.name}</strong> para alimentar as métricas do pipeline:
              </p>
              
              <div className="form-group">
                <label className="form-label">Motivo Principal</label>
                <select 
                  className="form-select"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                >
                  <option value="Reprovado no Desafio Técnico">Reprovado no Desafio Técnico</option>
                  <option value="Fit Cultural não aderente">Fit Cultural não aderente</option>
                  <option value="Pretensão Salarial acima do orçamento">Pretensão Salarial acima do orçamento</option>
                  <option value="Falta de Senioridade comprovada">Falta de Senioridade comprovada</option>
                  <option value="Nível de Inglês insuficiente">Nível de Inglês insuficiente</option>
                  <option value="Candidato aceitou outra contraproposta">Candidato aceitou outra contraproposta</option>
                  <option value="Desistência por motivos pessoais">Desistência por motivos pessoais</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setRejectModalApp(null)} className="btn btn-secondary">Cancelar</button>
              <button onClick={confirmRejection} className="btn btn-danger">Confirmar Reprovação</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
