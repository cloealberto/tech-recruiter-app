import React, { useState } from 'react';
import { 
  FileCheck2, 
  Plus, 
  Star, 
  Award, 
  User, 
  Briefcase, 
  MessageSquare, 
  Calendar, 
  Filter, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { RecommendationType } from '../types';

export const ScorecardView: React.FC = () => {
  const { 
    scorecards, 
    jobs, 
    candidates, 
    setIsScorecardModalOpen, 
    setCandidateForScorecard, 
    setSelectedCandidateId 
  } = useApp();

  const [filterJobId, setFilterJobId] = useState<string>('all');
  const [filterRec, setFilterRec] = useState<string>('all');

  const filteredScorecards = scorecards.filter(sc => {
    const matchesJob = filterJobId === 'all' || sc.jobId === filterJobId;
    const matchesRec = filterRec === 'all' || sc.overallRecommendation === filterRec;
    return matchesJob && matchesRec;
  });

  const getRecommendationBadge = (rec: RecommendationType) => {
    switch (rec) {
      case 'strong_hire':
        return <span className="badge badge-emerald">★ Strong Hire</span>;
      case 'hire':
        return <span className="badge badge-cyan">✓ Hire</span>;
      case 'leaning_hire':
        return <span className="badge badge-amber">~ Leaning Hire</span>;
      case 'no_hire':
        return <span className="badge badge-rose">✕ No Hire</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '4px' }}>
            Scorecards de Entrevista Técnica & Fit
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Critérios padronizados, notas estruturadas e pareceres de comitê para decisões imparciais de contratação.
          </p>
        </div>

        <button 
          onClick={() => {
            setCandidateForScorecard(null);
            setIsScorecardModalOpen(true);
          }}
          className="btn btn-primary"
        >
          <Plus size={16} />
          <span>Preencher Novo Scorecard</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Filtrar por Vaga:</span>
          <select
            value={filterJobId}
            onChange={(e) => setFilterJobId(e.target.value)}
            className="form-select"
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem' }}
          >
            <option value="all">Todas as Vagas</option>
            {jobs.map(j => (
              <option key={j.id} value={j.id}>{j.title}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Recomendação:</span>
          <select
            value={filterRec}
            onChange={(e) => setFilterRec(e.target.value)}
            className="form-select"
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem' }}
          >
            <option value="all">Todas as Recomendações</option>
            <option value="strong_hire">Strong Hire</option>
            <option value="hire">Hire</option>
            <option value="leaning_hire">Leaning Hire</option>
            <option value="no_hire">No Hire</option>
          </select>
        </div>

        <span className="badge badge-purple" style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>
          {filteredScorecards.length} avaliações registradas
        </span>
      </div>

      {/* Scorecards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredScorecards.map(sc => {
          const candidate = candidates.find(c => c.id === sc.candidateId);
          const avgScore = (
            sc.criteriaScores.reduce((acc, c) => acc + c.score, 0) / 
            (sc.criteriaScores.length || 1)
          ).toFixed(1);

          return (
            <div 
              key={sc.id}
              className="glass-card"
              style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img 
                    src={candidate?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
                    alt={sc.candidateName}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border)' }}
                  />

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h3 
                        onClick={() => setSelectedCandidateId(sc.candidateId)}
                        style={{ fontSize: '1.1rem', color: '#FFFFFF', cursor: 'pointer' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#A78BFA')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                      >
                        {sc.candidateName}
                      </h3>
                      {getRecommendationBadge(sc.overallRecommendation)}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{sc.jobTitle}</span>
                      <span>•</span>
                      <span>Avaliador: <strong>{sc.interviewerName}</strong></span>
                      <span>•</span>
                      <span>Data: {sc.createdAt}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(124, 58, 237, 0.15)',
                    border: '1px solid rgba(124, 58, 237, 0.3)',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#A78BFA', fontFamily: 'var(--font-mono)' }}>
                      {avgScore} / 5.0
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Média Geral
                    </div>
                  </div>
                </div>
              </div>

              {/* Criteria Scores Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                {sc.criteriaScores.map(crit => (
                  <div 
                    key={crit.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFFFFF' }}>{crit.criterion}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star} 
                            size={12} 
                            fill={star <= crit.score ? '#F59E0B' : 'none'} 
                            color={star <= crit.score ? '#F59E0B' : 'rgba(255,255,255,0.2)'} 
                          />
                        ))}
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FCD34D', marginLeft: '4px' }}>
                          {crit.score}
                        </span>
                      </div>
                    </div>
                    {crit.comment && (
                      <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {crit.comment}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Summary Statement */}
              {sc.summaryComment && (
                <div style={{
                  background: 'rgba(124, 58, 237, 0.06)',
                  border: '1px solid rgba(124, 58, 237, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 16px',
                  fontSize: '0.84rem',
                  lineHeight: 1.5,
                  color: '#DDD6FE'
                }}>
                  <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '4px' }}>Parecer Geral do Comitê:</strong>
                  "{sc.summaryComment}"
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
