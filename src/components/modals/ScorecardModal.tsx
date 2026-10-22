import React, { useState, useEffect } from 'react';
import { X, FileCheck2, Star, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { RecommendationType, InterviewScore } from '../../types';

export const ScorecardModal: React.FC = () => {
  const { 
    isScorecardModalOpen, 
    setIsScorecardModalOpen, 
    candidateForScorecard, 
    candidates, 
    jobs, 
    currentUser, 
    addScorecard 
  } = useApp();

  const [selectedCandId, setSelectedCandId] = useState<string>('');
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [recommendation, setRecommendation] = useState<RecommendationType>('hire');
  const [summaryComment, setSummaryComment] = useState('');

  const [scores, setScores] = useState<InterviewScore[]>([
    { id: '1', criterion: 'Fit Cultural & Alinhamento de Valores', score: 4, comment: '' },
    { id: '2', criterion: 'Domínio Técnico & Profundidade na Stack', score: 4, comment: '' },
    { id: '3', criterion: 'Resolução de Problemas & Raciocínio Lógico', score: 4, comment: '' },
    { id: '4', criterion: 'Comunicação, Articulação & Trabalho em Equipe', score: 5, comment: '' },
    { id: '5', criterion: 'Arquitetura de Software & Boas Práticas (Clean Code)', score: 4, comment: '' }
  ]);

  useEffect(() => {
    if (candidateForScorecard) {
      setSelectedCandId(candidateForScorecard.id);
    } else if (candidates.length > 0 && !selectedCandId) {
      setSelectedCandId(candidates[0].id);
    }

    if (jobs.length > 0 && !selectedJobId) {
      setSelectedJobId(jobs[0].id);
    }
  }, [candidateForScorecard, candidates, jobs]);

  if (!isScorecardModalOpen) return null;

  const handleScoreChange = (id: string, score: number) => {
    setScores(prev => prev.map(s => s.id === id ? { ...s, score } : s));
  };

  const handleCommentChange = (id: string, comment: string) => {
    setScores(prev => prev.map(s => s.id === id ? { ...s, comment } : s));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const candidate = candidates.find(c => c.id === selectedCandId);
    const job = jobs.find(j => j.id === selectedJobId);

    if (!candidate || !job) {
      alert('Selecione o candidato e a vaga.');
      return;
    }

    addScorecard({
      candidateId: candidate.id,
      candidateName: candidate.fullName,
      jobId: job.id,
      jobTitle: job.title,
      interviewerId: currentUser.id,
      interviewerName: currentUser.name,
      overallRecommendation: recommendation,
      summaryComment: summaryComment || 'Avaliação técnica e de fit cultural concluída satisfatoriamente.',
      criteriaScores: scores
    });

    setIsScorecardModalOpen(false);
    alert('Scorecard salvo com sucesso no perfil do candidato!');
  };

  const avgScore = (scores.reduce((acc, s) => acc + s.score, 0) / scores.length).toFixed(1);

  return (
    <div className="modal-backdrop" onClick={() => setIsScorecardModalOpen(false)}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '720px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', background: 'rgba(124, 58, 237, 0.2)', borderRadius: '8px', color: '#A78BFA' }}>
              <FileCheck2 size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF' }}>Scorecard de Entrevista</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Avaliação estruturada e imparcial por critérios técnicos e comportamentais
              </p>
            </div>
          </div>

          <button onClick={() => setIsScorecardModalOpen(false)} className="btn btn-ghost btn-sm">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Candidate & Job Selectors */}
            <div className="grid-2">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Candidato Avaliado *</label>
                <select
                  className="form-select"
                  value={selectedCandId}
                  onChange={(e) => setSelectedCandId(e.target.value)}
                  required
                >
                  {candidates.map(c => (
                    <option key={c.id} value={c.id}>{c.fullName} ({c.currentRole})</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Vaga Correspondente *</label>
                <select
                  className="form-select"
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  required
                >
                  {jobs.map(j => (
                    <option key={j.id} value={j.id}>{j.title}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Criteria Evaluation List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-faint)' }}>
                  Critérios de Avaliação (1 a 5)
                </span>
                <span style={{ fontSize: '0.8rem', color: '#A78BFA', fontWeight: 700 }}>
                  Nota Média Atual: {avgScore} / 5.0
                </span>
              </div>

              {scores.map(item => (
                <div 
                  key={item.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF' }}>{item.criterion}</span>
                    
                    {/* Stars selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {[1, 2, 3, 4, 5].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleScoreChange(item.id, val)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '2px'
                          }}
                        >
                          <Star 
                            size={18} 
                            fill={val <= item.score ? '#F59E0B' : 'none'} 
                            color={val <= item.score ? '#F59E0B' : 'rgba(255, 255, 255, 0.2)'} 
                          />
                        </button>
                      ))}
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FCD34D', width: '20px', textAlign: 'center' }}>
                        {item.score}
                      </span>
                    </div>
                  </div>

                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Evidências ou comentários sobre este critério..."
                    value={item.comment}
                    onChange={(e) => handleCommentChange(item.id, e.target.value)}
                    style={{ height: '32px', fontSize: '0.78rem' }}
                  />
                </div>
              ))}
            </div>

            {/* Overall Recommendation */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Recomendação Final do Avaliador</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {([
                  { id: 'strong_hire', label: 'Strong Hire', color: '#10B981' },
                  { id: 'hire', label: 'Hire', color: '#06B6D4' },
                  { id: 'leaning_hire', label: 'Leaning Hire', color: '#F59E0B' },
                  { id: 'no_hire', label: 'No Hire', color: '#EF4444' }
                ] as const).map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRecommendation(opt.id)}
                    className="btn btn-sm"
                    style={{
                      background: recommendation === opt.id ? `${opt.color}25` : 'rgba(255, 255, 255, 0.04)',
                      borderColor: recommendation === opt.id ? opt.color : 'var(--border)',
                      color: recommendation === opt.id ? opt.color : 'var(--text-secondary)',
                      fontWeight: 700
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Comments */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Parecer Consolidado do Comitê de Entrevista</label>
              <textarea 
                className="form-textarea" 
                rows={3}
                placeholder="Destaque pontos fortes, riscos e justificativa da recomendação para a liderança..."
                value={summaryComment}
                onChange={(e) => setSummaryComment(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              onClick={() => setIsScorecardModalOpen(false)} 
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              <Sparkles size={16} /> Gravar Scorecard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
