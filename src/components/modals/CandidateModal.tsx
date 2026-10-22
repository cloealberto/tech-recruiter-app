import React from 'react';
import { 
  X, 
  MapPin, 
  Mail, 
  Phone, 
  ExternalLink, 
  Briefcase, 
  DollarSign, 
  Star, 
  Award, 
  Clock, 
  CheckCircle2, 
  FileText,
  FileCheck2,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CandidateModal: React.FC = () => {
  const { 
    selectedCandidateId, 
    setSelectedCandidateId, 
    candidates, 
    jobs, 
    applications, 
    pipelineHistory, 
    scorecards,
    setCandidateForScorecard,
    setIsScorecardModalOpen,
    moveCandidate
  } = useApp();

  if (!selectedCandidateId) return null;

  const candidate = candidates.find(c => c.id === selectedCandidateId);
  if (!candidate) return null;

  const candApps = applications.filter(a => a.candidateId === candidate.id);
  const candHistory = pipelineHistory.filter(h => h.candidateName === candidate.fullName);
  const candScorecards = scorecards.filter(s => s.candidateId === candidate.id);

  return (
    <div className="modal-backdrop" onClick={() => setSelectedCandidateId(null)}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '780px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img 
              src={candidate.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
              alt={candidate.fullName}
              style={{ width: '60px', height: '60px', borderRadius: '16px', objectFit: 'cover', border: '2px solid rgba(124, 58, 237, 0.4)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#FFFFFF' }}>{candidate.fullName}</h3>
                <span className="badge badge-purple">{candidate.seniority}</span>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                {candidate.currentRole}
              </p>
            </div>
          </div>

          <button 
            onClick={() => setSelectedCandidateId(null)}
            className="btn btn-ghost btn-sm"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Contact and Links Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            background: 'rgba(255, 255, 255, 0.02)',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <Mail size={15} color="#A78BFA" />
              <span>{candidate.email}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <Phone size={15} color="#06B6D4" />
              <span>{candidate.phone}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <MapPin size={15} color="#10B981" />
              <span>{candidate.location}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <DollarSign size={15} color="#F59E0B" />
              <span>Pretensão: <strong style={{ color: '#10B981', fontFamily: 'var(--font-mono)' }}>R$ {candidate.salaryExpectation.toLocaleString('pt-BR')}</strong></span>
            </div>
          </div>

          {/* Social Profiles & Resume */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a 
              href={candidate.linkedinUrl} 
              target="_blank" 
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ color: '#60A5FA' }}
            >
              <ExternalLink size={14} />
              <span>Ver LinkedIn</span>
            </a>

            <a 
              href={candidate.githubUrl} 
              target="_blank" 
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ color: '#E2E8F0' }}
            >
              <ExternalLink size={14} />
              <span>Ver GitHub Repos</span>
            </a>

            {candidate.resumeUrl && (
              <a 
                href={candidate.resumeUrl} 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ color: '#FCD34D' }}
              >
                <FileText size={14} />
                <span>Download Currículo (PDF)</span>
              </a>
            )}

            <button
              onClick={() => {
                setCandidateForScorecard(candidate);
                setIsScorecardModalOpen(true);
              }}
              className="btn btn-primary btn-sm"
              style={{ marginLeft: 'auto' }}
            >
              <FileCheck2 size={14} />
              <span>Avaliar no Scorecard</span>
            </button>
          </div>

          {/* Technical Skills */}
          <div>
            <h4 style={{ fontSize: '0.85rem', color: '#FFFFFF', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Hard Skills & Tecnologias
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {candidate.skills.map((skill, i) => (
                <span 
                  key={i}
                  className="badge badge-purple"
                  style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Notes & Summary */}
          {candidate.notes && (
            <div>
              <h4 style={{ fontSize: '0.85rem', color: '#FFFFFF', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Notas do Tech Recruiter
              </h4>
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                fontSize: '0.84rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5
              }}>
                {candidate.notes}
              </div>
            </div>
          )}

          {/* Associated Scorecards */}
          {candScorecards.length > 0 && (
            <div>
              <h4 style={{ fontSize: '0.85rem', color: '#FFFFFF', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Scorecards de Entrevista Registrados ({candScorecards.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {candScorecards.map(sc => (
                  <div 
                    key={sc.id}
                    style={{
                      padding: '14px',
                      background: 'rgba(124, 58, 237, 0.06)',
                      border: '1px solid rgba(124, 58, 237, 0.25)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <strong style={{ fontSize: '0.88rem', color: '#FFFFFF' }}>{sc.jobTitle}</strong>
                      <span className="badge badge-emerald">{sc.overallRecommendation}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#DDD6FE', fontStyle: 'italic', marginBottom: '8px' }}>
                      "{sc.summaryComment}"
                    </p>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      Entrevistador: {sc.interviewerName} em {sc.createdAt}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pipeline History Timeline */}
          <div>
            <h4 style={{ fontSize: '0.85rem', color: '#FFFFFF', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Histórico no Funil de Recrutamento
            </h4>

            {candHistory.length === 0 ? (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Nenhuma alteração de etapa registrada recentemente.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {candHistory.map(h => (
                  <div 
                    key={h.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderRadius: '6px',
                      fontSize: '0.78rem'
                    }}
                  >
                    <div>
                      <span style={{ color: '#A78BFA', fontWeight: 600 }}>{h.fromStatus} &rarr; {h.toStatus}</span>
                      <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>por {h.changedBy}</span>
                    </div>
                    <span style={{ color: 'var(--text-faint)' }}>{h.changedAt}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button 
            onClick={() => setSelectedCandidateId(null)}
            className="btn btn-secondary"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
