import React, { useState } from 'react';
import { X, Briefcase, Plus, Trash2, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { JobLevel, WorkModel, RequirementType, JobRequirement } from '../../types';

export const NewJobModal: React.FC = () => {
  const { isNewJobModalOpen, setIsNewJobModalOpen, addJob } = useApp();

  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engenharia de Software');
  const [level, setLevel] = useState<JobLevel>('Senior');
  const [workModel, setWorkModel] = useState<WorkModel>('Remoto');
  const [location, setLocation] = useState('Brasil / Remoto');
  const [salaryMin, setSalaryMin] = useState<number>(16000);
  const [salaryMax, setSalaryMax] = useState<number>(22000);
  const [headcount, setHeadcount] = useState<number>(1);
  const [description, setDescription] = useState('');

  const [requirements, setRequirements] = useState<{ req: string; type: RequirementType }[]>([
    { req: '5+ anos de experiência na stack principal', type: 'obrigatorio' },
    { req: 'Experiência prévia em ambiente de microsserviços e cloud', type: 'desejavel' }
  ]);
  const [newReqText, setNewReqText] = useState('');
  const [newReqType, setNewReqType] = useState<RequirementType>('obrigatorio');

  if (!isNewJobModalOpen) return null;

  const handleAddRequirement = () => {
    if (!newReqText.trim()) return;
    setRequirements(prev => [...prev, { req: newReqText.trim(), type: newReqType }]);
    setNewReqText('');
  };

  const handleRemoveRequirement = (idx: number) => {
    setRequirements(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Informe o título do cargo da vaga.');
      return;
    }

    const jobReqs: JobRequirement[] = requirements.map((r, i) => ({
      id: `req-${Date.now()}-${i}`,
      jobId: '',
      requirement: r.req,
      type: r.type
    }));

    addJob({
      companyId: 'comp-1',
      companyName: 'Nexus Cloud Technologies',
      title,
      department,
      level,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      workModel,
      location,
      status: 'Aberta',
      description: description || `Oportunidade para atuar como ${title} no squad de ${department}.`,
      headcount: Number(headcount) || 1,
      requirements: jobReqs
    });

    setIsNewJobModalOpen(false);
    // Reset form
    setTitle('');
    setDescription('');
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsNewJobModalOpen(false)}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '680px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', background: 'rgba(124, 58, 237, 0.2)', borderRadius: '8px', color: '#A78BFA' }}>
              <Briefcase size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF' }}>Cadastrar Nova Vaga Tech</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Defina perfil de contratação, requisitos e faixa salarial
              </p>
            </div>
          </div>

          <button onClick={() => setIsNewJobModalOpen(false)} className="btn btn-ghost btn-sm">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="grid-2">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Título da Vaga / Cargo *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Ex: Senior Backend Go Engineer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Squad / Departamento</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Ex: Core Banking, Infra & SRE, Dados"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
            </div>

            <div className="grid-3">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Senioridade</label>
                <select 
                  className="form-select"
                  value={level}
                  onChange={(e) => setLevel(e.target.value as JobLevel)}
                >
                  <option value="Junior">Junior</option>
                  <option value="Pleno">Pleno</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Lead</option>
                  <option value="Staff">Staff</option>
                  <option value="Principal">Principal</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Modelo de Trabalho</label>
                <select 
                  className="form-select"
                  value={workModel}
                  onChange={(e) => setWorkModel(e.target.value as WorkModel)}
                >
                  <option value="Remoto">Remoto</option>
                  <option value="Híbrido">Híbrido</option>
                  <option value="Presencial">Presencial</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Vagas em Aberto</label>
                <input 
                  type="number" 
                  className="form-input" 
                  min={1}
                  value={headcount}
                  onChange={(e) => setHeadcount(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Salário Mínimo CLT (R$)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(Number(e.target.value))}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Salário Máximo CLT (R$)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Descrição Geral da Oportunidade</label>
              <textarea 
                className="form-textarea" 
                rows={3}
                placeholder="Principais desafios, tecnologias do dia-a-dia e impacto esperado..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Technical Requirements Builder */}
            <div>
              <label className="form-label" style={{ display: 'block', marginBottom: '8px' }}>
                Requisitos Técnicos (Obrigatório / Desejável / Diferencial)
              </label>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Ex: Domínio de Docker e CI/CD com GitHub Actions"
                  value={newReqText}
                  onChange={(e) => setNewReqText(e.target.value)}
                  style={{ flex: 1 }}
                />
                <select 
                  className="form-select"
                  style={{ width: '140px' }}
                  value={newReqType}
                  onChange={(e) => setNewReqType(e.target.value as RequirementType)}
                >
                  <option value="obrigatorio">Obrigatório</option>
                  <option value="desejavel">Desejável</option>
                  <option value="diferencial">Diferencial</option>
                </select>
                <button 
                  type="button" 
                  onClick={handleAddRequirement}
                  className="btn btn-secondary btn-sm"
                >
                  <Plus size={14} /> Adicionar
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {requirements.map((r, idx) => (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 12px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      fontSize: '0.8rem'
                    }}
                  >
                    <span>{r.req}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className={`badge ${r.type === 'obrigatorio' ? 'badge-purple' : r.type === 'desejavel' ? 'badge-cyan' : 'badge-amber'}`} style={{ fontSize: '0.66rem' }}>
                        {r.type}
                      </span>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveRequirement(idx)} 
                        className="btn btn-ghost btn-sm"
                        style={{ padding: '2px', color: '#F87171' }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              onClick={() => setIsNewJobModalOpen(false)} 
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              <Sparkles size={16} /> Publicar Vaga
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
