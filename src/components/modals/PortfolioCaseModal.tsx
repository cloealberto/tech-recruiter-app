import React from 'react';
import { 
  X, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Layers, 
  Target, 
  CheckCircle2, 
  Award,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PortfolioCaseModal: React.FC = () => {
  const { isPortfolioCaseModalOpen, setIsPortfolioCaseModalOpen } = useApp();

  if (!isPortfolioCaseModalOpen) return null;

  return (
    <div className="modal-backdrop" onClick={() => setIsPortfolioCaseModalOpen(false)}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '820px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header" style={{
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(6, 182, 212, 0.15) 100%)',
          borderBottom: '1px solid rgba(124, 58, 237, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', background: 'rgba(124, 58, 237, 0.3)', borderRadius: '10px', color: '#DDD6FE' }}>
              <Sparkles size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#FFFFFF' }}>Case de Portfólio & Decisões de Produto</h3>
                <span className="badge badge-purple">Diferencial</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>
                Como o TechRecruit Hub resolve dores operacionais de Tech Recruiters e Engineering Managers
              </p>
            </div>
          </div>

          <button onClick={() => setIsPortfolioCaseModalOpen(false)} className="btn btn-ghost btn-sm">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Executive Summary */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            lineHeight: 1.6,
            fontSize: '0.88rem',
            color: 'var(--text-secondary)'
          }}>
            <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '6px' }}>Visão Geral do Desafio:</strong>
            Em empresas de tecnologia, o recrutamento técnico sofre com <span style={{ color: '#F87171' }}>funis opacos</span>, planilhas descentralizadas, avaliações subjetivas de código e desperdício de horas montando queries de busca booleana no LinkedIn. O <strong>TechRecruit Hub</strong> foi concebido como um ATS especializado de alta performance que integra sourcing, triagem visual, scorecards imparciais e métricas de conversão em tempo real.
          </div>

          {/* Quantified Business Impact */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
              Impacto Quantificado nos Processos Seletivos
            </h4>

            <div className="grid-3">
              <div style={{
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', marginBottom: '6px' }}>
                  <Clock size={16} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>Time to Hire</span>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34D399', fontFamily: 'var(--font-display)' }}>
                  -40%
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Redução média de 45 para 28 dias entre a abertura da vaga e a assinatura da proposta.
                </p>
              </div>

              <div style={{
                background: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#06B6D4', marginBottom: '6px' }}>
                  <TrendingUp size={16} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>Visibilidade do Funil</span>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#67E8F9', fontFamily: 'var(--font-display)' }}>
                  +65%
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Engineering Managers e Tech Leads acompanham gargalos em tempo real via Kanban.
                </p>
              </div>

              <div style={{
                background: 'rgba(124, 58, 237, 0.08)',
                border: '1px solid rgba(124, 58, 237, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A78BFA', marginBottom: '6px' }}>
                  <Zap size={16} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>Velocidade de Sourcing</span>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#C4B5FD', fontFamily: 'var(--font-display)' }}>
                  3x Mais Rápido
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Geração instantânea de strings booleanas para LinkedIn Recruiter, Google X-Ray e GitHub.
                </p>
              </div>
            </div>
          </div>

          {/* Key Product Decisions */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
              Decisões de Design de Produto & Arquitetura
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <CheckCircle2 size={16} color="#10B981" />
                  <strong style={{ fontSize: '0.88rem', color: '#FFFFFF' }}>
                    1. Pipeline de 9 Estágios com Granularidade Realista
                  </strong>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: '24px' }}>
                  Ao contrário de ATS genéricos que misturam etapas técnicas, separamos <em>Fit Cultural</em>, <em>Desafio Prático</em> e <em>Entrevista Técnica</em>. Isso permite diagnosticar com exatidão se os candidatos estão reprovando por falta de soft skills ou deficiência técnica na stack.
                </p>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <CheckCircle2 size={16} color="#10B981" />
                  <strong style={{ fontSize: '0.88rem', color: '#FFFFFF' }}>
                    2. Scorecards com Critérios Fixos e Parecer de Comitê
                  </strong>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: '24px' }}>
                  Elimina o viés de afinidade ("gostei ou não do candidato") exigindo avaliação de 1 a 5 em cinco eixos estruturados: Fit Cultural, Domínio Técnico, Lógica, Comunicação e Arquitetura, além de recomendação formal de contratação (Strong Hire a No Hire).
                </p>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <CheckCircle2 size={16} color="#10B981" />
                  <strong style={{ fontSize: '0.88rem', color: '#FFFFFF' }}>
                    3. Construtor Booleano Integrado com Execução em 1 Clique
                  </strong>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: '24px' }}>
                  O tech recruiter não precisa mais decorar operadores de Google X-Ray ou regras de parênteses do LinkedIn. A interface constrói a string em tempo real, valida sintaxe e permite abrir diretamente na plataforma com 1 clique.
                </p>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <CheckCircle2 size={16} color="#10B981" />
                  <strong style={{ fontSize: '0.88rem', color: '#FFFFFF' }}>
                    4. Demonstração Interativa com RBAC e Persistência Local
                  </strong>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: '24px' }}>
                  Contém alternador instantâneo entre Recruiter, Gestor e Admin, dados de demonstração hiper-realistas para o mercado tech brasileiro e botão para restaurar o estado padrão a qualquer momento.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button 
            onClick={() => setIsPortfolioCaseModalOpen(false)}
            className="btn btn-primary"
          >
            Entendido, Explorar a Aplicação
          </button>
        </div>
      </div>
    </div>
  );
};
