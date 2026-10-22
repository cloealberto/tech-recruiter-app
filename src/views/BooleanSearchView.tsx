import React, { useState } from 'react';
import { 
  Search, 
  Copy, 
  Check, 
  ExternalLink, 
  Bookmark, 
  Trash2, 
  Sparkles, 
  Code, 
  Globe, 
  Layers, 
  RefreshCw 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { SearchPlatform } from '../types';

export const BooleanSearchView: React.FC = () => {
  const { searchStrings, addSearchString, deleteSearchString } = useApp();

  const [platform, setPlatform] = useState<SearchPlatform>('LinkedIn');
  const [roleTitle, setRoleTitle] = useState('Senior Fullstack Engineer');
  const [mandatoryKeywords, setMandatoryKeywords] = useState('React, TypeScript, Node.js');
  const [alternativeKeywords, setAlternativeKeywords] = useState('Next.js, NestJS, GraphQL');
  const [excludeKeywords, setExcludeKeywords] = useState('Junior, Estagiário, Trainee, Recruiter');
  const [location, setLocation] = useState('Brasil');
  const [copied, setCopied] = useState(false);
  const [searchName, setSearchName] = useState('');

  // Generate Boolean Query dynamically
  const generateQuery = () => {
    // 1. Roles
    const roles = roleTitle.split(',').map(r => r.trim()).filter(Boolean);
    const roleQuery = roles.length > 1 
      ? `(${roles.map(r => `"${r}"`).join(' OR ')})`
      : roles.length === 1 ? `"${roles[0]}"` : '';

    // 2. Mandatory (AND)
    const mandatories = mandatoryKeywords.split(',').map(k => k.trim()).filter(Boolean);
    const mandQuery = mandatories.map(m => `"${m}"`).join(' AND ');

    // 3. Alternatives (OR)
    const alternatives = alternativeKeywords.split(',').map(k => k.trim()).filter(Boolean);
    const altQuery = alternatives.length > 0 
      ? `(${alternatives.map(a => `"${a}"`).join(' OR ')})`
      : '';

    // 4. Exclusions (NOT)
    const exclusions = excludeKeywords.split(',').map(e => e.trim()).filter(Boolean);

    // Build platform specific
    if (platform === 'Google') {
      const notStr = exclusions.map(e => `-"${e}"`).join(' ');
      const locStr = location ? `("${location}")` : '';
      return `site:linkedin.com/in/ ${roleQuery} ${mandQuery ? `AND ${mandQuery}` : ''} ${altQuery ? `AND ${altQuery}` : ''} ${locStr} ${notStr}`.trim();
    }

    if (platform === 'GitHub') {
      const locStr = location ? `location:${location.split(' ')[0]}` : 'location:Brazil';
      return `${locStr} language:typescript ${mandQuery.replace(/ AND /g, ' ')} ${roleQuery}`.trim();
    }

    // Default: LinkedIn Recruiter
    const notStr = exclusions.length > 0 ? exclusions.map(e => `NOT "${e}"`).join(' ') : '';
    const parts = [
      roleQuery,
      mandQuery ? mandQuery : '',
      altQuery ? altQuery : '',
      location ? `"${location}"` : '',
      notStr ? notStr : ''
    ].filter(Boolean);

    return parts.join(' AND ').replace(/ AND NOT /g, ' NOT ');
  };

  const currentQuery = generateQuery();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentQuery);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenSearchUrl = () => {
    let url = '';
    if (platform === 'Google') {
      url = `https://www.google.com/search?q=${encodeURIComponent(currentQuery)}`;
    } else if (platform === 'GitHub') {
      url = `https://github.com/search?q=${encodeURIComponent(currentQuery)}&type=users`;
    } else {
      url = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(currentQuery)}`;
    }
    window.open(url, '_blank');
  };

  const handleSaveSearch = () => {
    const name = searchName.trim() || `${roleTitle} (${platform})`;
    addSearchString({
      name,
      platform,
      query: currentQuery,
      roleTitle,
      tags: mandatoryKeywords.split(',').map(k => k.trim()).filter(Boolean)
    });
    setSearchName('');
    alert('Busca salva com sucesso no seu histórico!');
  };

  const applyTemplate = (tpl: {
    platform: SearchPlatform;
    role: string;
    mand: string;
    alt: string;
    exc: string;
    loc: string;
  }) => {
    setPlatform(tpl.platform);
    setRoleTitle(tpl.role);
    setMandatoryKeywords(tpl.mand);
    setAlternativeKeywords(tpl.alt);
    setExcludeKeywords(tpl.exc);
    setLocation(tpl.loc);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '4px' }}>
          Gerador de Boolean Search & X-Ray
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Construa strings de busca booleana de alta precisão para LinkedIn, Google X-Ray e GitHub com 1 clique.
        </p>
      </div>

      {/* Templates Bar */}
      <div className="glass-card" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#A78BFA', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} /> Templates Recomendados:
        </span>

        <button 
          onClick={() => applyTemplate({
            platform: 'LinkedIn',
            role: 'Senior Fullstack Engineer, Tech Lead',
            mand: 'React, Node.js, TypeScript',
            alt: 'Next.js, GraphQL, PostgreSQL',
            exc: 'Junior, Estagiário, Trainee, Recruiter',
            loc: 'Brasil'
          })}
          className="btn btn-secondary btn-sm"
          style={{ fontSize: '0.75rem' }}
        >
          Senior React + Node (LinkedIn)
        </button>

        <button 
          onClick={() => applyTemplate({
            platform: 'Google',
            role: 'DevOps Engineer, Cloud Architect, SRE',
            mand: 'Kubernetes, Terraform',
            alt: 'AWS, GCP, CI/CD',
            exc: 'Junior, Vagas, Recruiter, Talent',
            loc: 'Brasil'
          })}
          className="btn btn-secondary btn-sm"
          style={{ fontSize: '0.75rem' }}
        >
          Google X-Ray DevOps (LinkedIn Profiles)
        </button>

        <button 
          onClick={() => applyTemplate({
            platform: 'GitHub',
            role: 'AI Engineer, Machine Learning',
            mand: 'Python, PyTorch, LangChain',
            alt: 'FastAPI, Transformers',
            exc: 'Junior',
            loc: 'Brazil'
          })}
          className="btn btn-secondary btn-sm"
          style={{ fontSize: '0.75rem' }}
        >
          GitHub Devs Python & IA
        </button>
      </div>

      {/* Query Builder Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Visual Controls Form */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="#06B6D4" /> Parâmetros de Busca
          </h3>

          {/* Platform Selector */}
          <div className="form-group">
            <label className="form-label">Plataforma de Destino</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {(['LinkedIn', 'Google', 'GitHub'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlatform(p)}
                  className="btn"
                  style={{
                    background: platform === p ? 'rgba(124, 58, 237, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    borderColor: platform === p ? 'var(--accent-purple)' : 'var(--border)',
                    color: platform === p ? '#FFFFFF' : 'var(--text-secondary)',
                    fontSize: '0.82rem'
                  }}
                >
                  {p === 'Google' ? 'Google X-Ray' : p}
                </button>
              ))}
            </div>
          </div>

          {/* Role Title */}
          <div className="form-group">
            <label className="form-label">Cargos / Títulos (separe por vírgula para "OR")</label>
            <input 
              type="text" 
              className="form-input" 
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder='Ex: "Senior Software Engineer", "Tech Lead"'
            />
          </div>

          {/* Mandatory Keywords */}
          <div className="form-group">
            <label className="form-label" style={{ color: '#6EE7B7' }}>
              Stacks Obrigatórias (AND) — devem constar no perfil
            </label>
            <input 
              type="text" 
              className="form-input" 
              value={mandatoryKeywords}
              onChange={(e) => setMandatoryKeywords(e.target.value)}
              placeholder="Ex: React, TypeScript, Node.js"
            />
          </div>

          {/* Alternative Keywords */}
          <div className="form-group">
            <label className="form-label" style={{ color: '#93C5FD' }}>
              Stacks Alternativas (OR) — pelo menos uma delas
            </label>
            <input 
              type="text" 
              className="form-input" 
              value={alternativeKeywords}
              onChange={(e) => setAlternativeKeywords(e.target.value)}
              placeholder="Ex: Next.js, NestJS, GraphQL"
            />
          </div>

          {/* Exclude Keywords */}
          <div className="form-group">
            <label className="form-label" style={{ color: '#F87171' }}>
              Termos a Excluir (NOT / -) — descartar perfis
            </label>
            <input 
              type="text" 
              className="form-input" 
              value={excludeKeywords}
              onChange={(e) => setExcludeKeywords(e.target.value)}
              placeholder="Ex: Junior, Estagiário, Trainee, Recruiter"
            />
          </div>

          {/* Location */}
          <div className="form-group">
            <label className="form-label">Localização / Região</label>
            <input 
              type="text" 
              className="form-input" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Brasil, São Paulo, Remote"
            />
          </div>
        </div>

        {/* Live Output & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Generated String Box */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code size={18} color="#A78BFA" />
                <h3 style={{ fontSize: '1.05rem', color: '#FFFFFF' }}>String Gerada</h3>
              </div>
              <span className="badge badge-purple">{platform}</span>
            </div>

            {/* Code Output Box */}
            <div style={{
              background: 'rgba(5, 7, 14, 0.9)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.84rem',
              lineHeight: 1.6,
              color: '#38BDF8',
              wordBreak: 'break-word',
              minHeight: '140px',
              userSelect: 'all'
            }}>
              {currentQuery}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={handleCopy}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copiado para Clipboard!' : 'Copiar String'}</span>
              </button>

              <button 
                onClick={handleOpenSearchUrl}
                className="btn btn-secondary"
                title={`Executar busca diretamente no ${platform}`}
              >
                <ExternalLink size={16} />
                <span>Abrir no {platform}</span>
              </button>
            </div>

            {/* Save Query Form */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '6px' }}>
              <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>
                Salvar no Meu Histórico de Buscas
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="Nome desta busca (ex: Senior React Brasil)"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  style={{ height: '36px', fontSize: '0.8rem' }}
                />
                <button onClick={handleSaveSearch} className="btn btn-secondary btn-sm">
                  <Bookmark size={14} /> Salvar
                </button>
              </div>
            </div>
          </div>

          {/* Saved Queries List */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '0.92rem', color: '#FFFFFF', marginBottom: '12px' }}>
              Minhas Buscas Salvas ({searchStrings.length})
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '240px', overflowY: 'auto' }}>
              {searchStrings.map(item => (
                <div 
                  key={item.id}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px'
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <strong style={{ fontSize: '0.8rem', color: '#F8FAFC' }}>{item.name}</strong>
                      <span className="badge badge-purple" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>{item.platform}</span>
                    </div>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
                      {item.query}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.query);
                        alert('Query copiada!');
                      }}
                      className="btn btn-ghost btn-sm"
                      title="Copiar"
                      style={{ padding: '4px' }}
                    >
                      <Copy size={13} />
                    </button>
                    <button
                      onClick={() => deleteSearchString(item.id)}
                      className="btn btn-danger btn-sm"
                      title="Excluir"
                      style={{ padding: '4px' }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
