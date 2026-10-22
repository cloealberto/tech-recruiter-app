import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Filter,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PIPELINE_STAGES } from '../data/mockData';

export const ReportsView: React.FC = () => {
  const { applications, jobs, candidates, pipelineHistory } = useApp();

  const totalApps = applications.length || 1;
  const hiredCount = applications.filter(a => a.status === 'hired').length;
  const rejectedCount = applications.filter(a => a.status === 'rejected').length;

  // Funnel calculations
  const funnelData = [
    { stage: 'Sourced / Identificados', count: totalApps, pct: 100 },
    { stage: 'Abordados / Contatados', count: applications.filter(a => a.status !== 'sourced').length, pct: 85 },
    { stage: 'Screening Tech Recruiter', count: applications.filter(a => !['sourced', 'contacted'].includes(a.status)).length, pct: 60 },
    { stage: 'Fit Cultural & Alinhamento', count: applications.filter(a => !['sourced', 'contacted', 'screening'].includes(a.status)).length, pct: 45 },
    { stage: 'Desafio Prático / Case', count: applications.filter(a => ['challenge', 'technical', 'proposal', 'hired'].includes(a.status)).length, pct: 32 },
    { stage: 'Entrevista Técnica Profunda', count: applications.filter(a => ['technical', 'proposal', 'hired'].includes(a.status)).length, pct: 20 },
    { stage: 'Proposta Enviada', count: applications.filter(a => ['proposal', 'hired'].includes(a.status)).length, pct: 12 },
    { stage: 'Contratação Confirmada', count: hiredCount, pct: 8 }
  ];

  // Time to hire breakdown by level
  const timeToHireData = [
    { level: 'Junior', days: 18, benchmark: 25, status: 'Ótimo' },
    { level: 'Pleno', days: 24, benchmark: 35, status: 'Ótimo' },
    { level: 'Senior', days: 32, benchmark: 45, status: 'Abaixo da média' },
    { level: 'Staff / Tech Lead', days: 41, benchmark: 60, status: 'Excelente' }
  ];

  // Sources efficacy
  const sourcesEfficacy = [
    { name: 'LinkedIn Recruiter', sourced: 5, hired: 1, conversion: '20%' },
    { name: 'GitHub Search', sourced: 2, hired: 0, conversion: '0%' },
    { name: 'GeekHunter', sourced: 1, hired: 0, conversion: '0%' },
    { name: 'Indicação Interna', sourced: 1, hired: 0, conversion: 'Pending' },
    { name: 'Inbound / Carreira', sourced: 1, hired: 0, conversion: '0%' }
  ];

  // Rejection reasons breakdown
  const rejectionReasons = [
    { reason: 'Reprovado no Desafio Técnico', count: 3, pct: 45 },
    { reason: 'Fit Cultural não aderente', count: 2, pct: 30 },
    { reason: 'Pretensão Salarial acima do orçamento', count: 1, pct: 15 },
    { reason: 'Desistência / Outra Proposta', count: 1, pct: 10 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '4px' }}>
          Relatórios & Métricas de Eficiência do Funil
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Diagnóstico completo de conversão, velocidade de contratação (Time to Hire) e gargalos do processo seletivo.
        </p>
      </div>

      {/* Top Summary Cards */}
      <div className="grid-3">
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', marginBottom: '8px' }}>
            <TrendingUp size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Conversão Geral</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>
            8.2%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            De cada 100 candidatos sourcados, 8 são contratados
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#06B6D4', marginBottom: '8px' }}>
            <Clock size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Média Global Time-to-Hire</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>
            28.4 dias
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '4px' }}>
            38% mais rápido que o mercado tradicional (45 dias)
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F59E0B', marginBottom: '8px' }}>
            <AlertTriangle size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Principal Ponto de Gargalo</span>
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FCD34D', fontFamily: 'var(--font-display)' }}>
            Etapa de Desafio Prático
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Maior taxa de atrito (drop-off) antes da técnica
          </div>
        </div>
      </div>

      {/* Funnel Drop-off Analysis */}
      <div className="glass-card" style={{ padding: '26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF' }}>Análise Passo-a-Passo de Conversão no Funil</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Identificação de perdas entre etapas de triagem
            </p>
          </div>
          <span className="badge badge-purple">Benchmark Tech 2026</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {funnelData.map((step, idx) => (
            <div key={step.stage} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ fontWeight: 600, color: '#FFFFFF' }}>
                  {idx + 1}. {step.stage}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  {step.count} candidatos ({step.pct}%)
                </span>
              </div>
              <div style={{ width: '100%', height: '14px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{
                  width: `${step.pct}%`,
                  height: '100%',
                  background: idx === funnelData.length - 1 
                    ? 'linear-gradient(90deg, #10B981, #059669)' 
                    : 'linear-gradient(90deg, #7C3AED 0%, #06B6D4 100%)',
                  borderRadius: '6px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Columns: Time to Hire & Rejection Reasons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Time to hire by seniority */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '16px' }}>
            Time to Hire por Senioridade
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {timeToHireData.map(item => (
              <div 
                key={item.level}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#FFFFFF' }}>{item.level}</strong>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Benchmark mercado: {item.benchmark} dias
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10B981', fontFamily: 'var(--font-mono)' }}>
                    {item.days} dias
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivos de Reprovação */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '16px' }}>
            Distribuição de Motivos de Reprovação
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {rejectionReasons.map(r => (
              <div key={r.reason} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-primary)' }}>{r.reason}</span>
                  <span style={{ color: '#F87171', fontWeight: 600 }}>{r.pct}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${r.pct}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #F43F5E, #EF4444)',
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
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            fontSize: '0.76rem',
            color: '#FCA5A5'
          }}>
            <strong>Insight:</strong> 45% das reprovações acontecem no teste de arquitetura/código prático. Alinhar pré-requisitos antes do envio reduz tempo perdido em 22%.
          </div>
        </div>
      </div>
    </div>
  );
};
