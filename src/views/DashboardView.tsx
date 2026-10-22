import React from 'react';
import { 
  Briefcase, 
  Users, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles, 
  Target, 
  Compass, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PIPELINE_STAGES } from '../data/mockData';

export const DashboardView: React.FC = () => {
  const { jobs, candidates, applications, pipelineHistory, setActiveTab, setSelectedJobId, setIsNewCandidateModalOpen } = useApp();

  const openJobs = jobs.filter(j => j.status === 'Aberta');
  const activeApps = applications.filter(a => a.status !== 'rejected' && a.status !== 'hired');
  const hiredApps = applications.filter(a => a.status === 'hired');
  
  // Calculate average time to hire (mocked/computed)
  const avgTimeToHire = 28; // 28 days

  // Outreach response rate
  const contactedCount = applications.filter(a => a.status !== 'sourced').length;
  const sourcedCount = applications.length;
  const responseRate = Math.round((contactedCount / (sourcedCount || 1)) * 100);

  // Conversion rate to hire
  const hireRate = Math.round((hiredApps.length / (sourcedCount || 1)) * 100);

  // Source distribution
  const sourceCounts: Record<string, number> = {};
  applications.forEach(a => {
    sourceCounts[a.source] = (sourceCounts[a.source] || 0) + 1;
  });

  const sourcesList = Object.entries(sourceCounts).map(([name, count]) => ({
    name,
    count,
    pct: Math.round((count / (applications.length || 1)) * 100)
  })).sort((a, b) => b.count - a.count);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Welcome Banner */}
      <div className="glass-card" style={{
        padding: '24px 28px',
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)',
        borderColor: 'rgba(124, 58, 237, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-purple">Painel Operacional</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Última sincronização: Hoje às 12:00</span>
          </div>
          <h2 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '4px' }}>
            Recrutamento Tech em Alta Velocidade 🚀
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', maxWidth: '650px' }}>
            Acompanhe o funil de contratação das posições críticas de engenharia, tempo de fechamento e fontes mais eficientes de candidatos.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setActiveTab('kanban')}
            className="btn btn-secondary"
          >
            <Compass size={16} />
            <span>Abrir Kanban</span>
          </button>
          <button 
            onClick={() => setIsNewCandidateModalOpen(true)}
            className="btn btn-primary"
          >
            <Sparkles size={16} />
            <span>Adicionar Talento</span>
          </button>
        </div>
      </div>

      {/* 5 Main KPIs */}
      <div className="grid-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {/* KPI 1: Vagas Abertas */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Vagas Abertas</span>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(124, 58, 237, 0.15)', color: '#A78BFA' }}>
              <Briefcase size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
              {openJobs.length}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center' }}>
              <ArrowUpRight size={12} /> 100% ativas
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            {openJobs.reduce((acc, j) => acc + j.headcount, 0)} posições em aberto no time
          </div>
        </div>

        {/* KPI 2: Pipeline Ativo */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Em Pipeline Ativo</span>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', color: '#06B6D4' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
              {activeApps.length}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              de {candidates.length} talentos
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Distribuídos em 7 etapas de triagem
          </div>
        </div>

        {/* KPI 3: Taxa de Resposta */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Taxa de Resposta</span>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#FCD34D' }}>
              {responseRate}%
            </span>
            <span style={{ fontSize: '0.75rem', color: '#10B981' }}>+8% vs benchmark</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Mensagens customizadas por stack
          </div>
        </div>

        {/* KPI 4: Time to Hire */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Time to Hire Médio</span>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <Clock size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#6EE7B7' }}>
              {avgTimeToHire} dias
            </span>
            <span style={{ fontSize: '0.75rem', color: '#10B981' }}>-17 dias vs meta</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Da abertura à carta de oferta aceita
          </div>
        </div>

        {/* KPI 5: Contratações Efetivadas */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Contratados (Mês)</span>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.15)', color: '#818CF8' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#A5B4FC' }}>
              {hiredApps.length}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#A78BFA' }}>
              Taxa de avanço: {hireRate}%
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Fechamento de posições sênior
          </div>
        </div>
      </div>

      {/* Middle Row: Funnel Visual & Source Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Recruitment Funnel */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF' }}>Funil de Avanço por Etapa</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Conversão de candidatos ao longo do processo seletivo
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('reports')} 
              className="btn btn-ghost btn-sm"
            >
              Ver Detalhes do Funil &rarr;
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {PIPELINE_STAGES.filter(s => s.id !== 'rejected').map((stage, idx) => {
              const count = applications.filter(a => a.status === stage.id).length;
              const total = applications.length || 1;
              const pct = Math.max(8, Math.round((count / total) * 100));

              return (
                <div key={stage.id} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '110px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {stage.label}
                  </div>
                  
                  <div style={{ 
                    flex: 1, 
                    height: '24px', 
                    background: 'rgba(255, 255, 255, 0.04)', 
                    borderRadius: '6px', 
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 8px'
                  }}>
                    <div style={{
                      width: `${pct}%`,
                      height: '14px',
                      background: `linear-gradient(90deg, ${stage.color} 0%, rgba(255,255,255,0.2) 100%)`,
                      borderRadius: '4px',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>

                  <div style={{ width: '60px', textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>
                      {count}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      cand.
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Source Distribution */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF' }}>Origem dos Candidatos</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Canais mais eficientes de captação
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {sourcesList.map((source) => (
              <div key={source.name} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{source.name}</span>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{source.count} ({source.pct}%)</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${source.pct}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #7C3AED 0%, #06B6D4 100%)',
                    borderRadius: '3px'
                  }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ 
            marginTop: '20px', 
            padding: '12px', 
            borderRadius: 'var(--radius-md)', 
            background: 'rgba(124, 58, 237, 0.08)',
            border: '1px solid rgba(124, 58, 237, 0.2)',
            fontSize: '0.78rem',
            color: '#DDD6FE',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Sparkles size={16} color="#A78BFA" />
            <span><strong>Dica:</strong> Sourcing ativo via LinkedIn e GitHub traz 68% dos perfis sênior.</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Active Jobs Summary & Recent Pipeline Movements */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Active Open Jobs */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF' }}>Vagas Prioritárias</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Squads com posições abertas</p>
            </div>
            <button onClick={() => setActiveTab('jobs')} className="btn btn-ghost btn-sm">
              Gerenciar Todas &rarr;
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {jobs.slice(0, 3).map((job) => {
              const jobApps = applications.filter(a => a.jobId === job.id);
              return (
                <div 
                  key={job.id} 
                  onClick={() => {
                    setSelectedJobId(job.id);
                    setActiveTab('kanban');
                  }}
                  className="glass-card-interactive"
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '0.88rem', color: '#FFFFFF', marginBottom: '4px' }}>{job.title}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>{job.department}</span>
                      <span>•</span>
                      <span className="badge badge-purple">{job.level}</span>
                      <span>•</span>
                      <span>R$ {(job.salaryMin / 1000).toFixed(0)}k - {(job.salaryMax / 1000).toFixed(0)}k</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#06B6D4' }}>
                      {jobApps.length} candidatos
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Ver Kanban &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Pipeline Activity History */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF' }}>Últimas Movimentações</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Histórico em tempo real do pipeline</p>
            </div>
            <span className="badge badge-muted">{pipelineHistory.length} registros</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pipelineHistory.slice(0, 4).map((hist) => (
              <div 
                key={hist.id}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <strong style={{ color: '#F8FAFC' }}>{hist.candidateName}</strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{hist.changedAt}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{hist.jobTitle}</span>
                  <span style={{ color: 'var(--text-faint)' }}>•</span>
                  <span className="badge badge-purple" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                    {hist.fromStatus} &rarr; {hist.toStatus}
                  </span>
                </div>
                {hist.comment && (
                  <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '2px' }}>
                    "{hist.comment}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
