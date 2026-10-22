import React, { useState } from 'react';
import { X, UserPlus, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { SeniorityLevel, EnglishLevel } from '../../types';

export const NewCandidateModal: React.FC = () => {
  const { 
    isNewCandidateModalOpen, 
    setIsNewCandidateModalOpen, 
    addCandidate, 
    jobs, 
    selectedJobId 
  } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [seniority, setSeniority] = useState<SeniorityLevel>('Senior');
  const [location, setLocation] = useState('São Paulo - SP');
  const [englishLevel, setEnglishLevel] = useState<EnglishLevel>('Avançado');
  const [salaryExpectation, setSalaryExpectation] = useState<number>(18000);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [skillsStr, setSkillsStr] = useState('React, TypeScript, Node.js, AWS');
  const [notes, setNotes] = useState('');

  if (!isNewCandidateModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      alert('Preencha ao menos Nome e E-mail do candidato.');
      return;
    }

    const skills = skillsStr
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    addCandidate({
      fullName,
      email,
      phone: phone || '+55 (11) 99999-9999',
      currentRole: currentRole || 'Software Engineer',
      seniority,
      location: location || 'Remoto - Brasil',
      englishLevel,
      salaryExpectation: Number(salaryExpectation) || 15000,
      linkedinUrl: linkedinUrl || `https://linkedin.com/in/${fullName.toLowerCase().replace(/\s+/g, '')}`,
      githubUrl: githubUrl || `https://github.com/${fullName.toLowerCase().replace(/\s+/g, '')}`,
      resumeUrl: 'https://techhub-cvs.com/curriculo.pdf',
      skills,
      notes: notes || 'Candidato sourcado ativamente pelo Tech Recruiter.'
    });

    setIsNewCandidateModalOpen(false);
    // Reset fields
    setFullName('');
    setEmail('');
    setPhone('');
    setCurrentRole('');
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsNewCandidateModalOpen(false)}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '640px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', background: 'rgba(124, 58, 237, 0.2)', borderRadius: '8px', color: '#A78BFA' }}>
              <UserPlus size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF' }}>Cadastrar Novo Talento</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Adiciona o perfil ao banco de talentos e ao pipeline da vaga ativa
              </p>
            </div>
          </div>

          <button onClick={() => setIsNewCandidateModalOpen(false)} className="btn btn-ghost btn-sm">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="grid-2">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Nome Completo *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Ex: Carlos Eduardo Silva"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">E-mail Profissional *</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="Ex: carlos.silva@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Telefone / WhatsApp</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="+55 (11) 98765-4321"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Cargo Atual</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Ex: Senior Backend Developer"
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                />
              </div>
            </div>

            <div className="grid-3">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Senioridade</label>
                <select 
                  className="form-select"
                  value={seniority}
                  onChange={(e) => setSeniority(e.target.value as SeniorityLevel)}
                >
                  <option value="Junior">Junior</option>
                  <option value="Pleno">Pleno</option>
                  <option value="Senior">Senior</option>
                  <option value="Especialista / Lead">Especialista / Lead</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Inglês</label>
                <select 
                  className="form-select"
                  value={englishLevel}
                  onChange={(e) => setEnglishLevel(e.target.value as EnglishLevel)}
                >
                  <option value="Básico">Básico</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                  <option value="Fluente / Nativo">Fluente / Nativo</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Pretensão CLT (R$)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={salaryExpectation}
                  onChange={(e) => setSalaryExpectation(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Perfil no LinkedIn (URL)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="https://linkedin.com/in/usuario"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Perfil no GitHub (URL)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="https://github.com/usuario"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Hard Skills / Tags Técnicas (separadas por vírgula)</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Ex: React, Node.js, TypeScript, PostgreSQL, Docker"
                value={skillsStr}
                onChange={(e) => setSkillsStr(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Observações & Triagem Inicial</label>
              <textarea 
                className="form-textarea" 
                rows={3}
                placeholder="Anotações do recrutador sobre perfil, motivação para troca de emprego e pontos fortes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              onClick={() => setIsNewCandidateModalOpen(false)} 
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              <Sparkles size={16} /> Salvar Candidato
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
