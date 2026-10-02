import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  HelpCircle,
  FileCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CaseEvaluation, StatutoryCheckResult } from '../types';
import { CASE_PRESETS } from '../data/presets';

interface StatutoryChecklistProps {
  currentCase: CaseEvaluation;
  setCase: React.Dispatch<React.SetStateAction<CaseEvaluation>>;
  result: StatutoryCheckResult;
}

export const StatutoryChecklist: React.FC<StatutoryChecklistProps> = ({
  currentCase,
  setCase,
  result
}) => {
  const [showDoctrineHelp, setShowDoctrineHelp] = useState(false);

  const handlePresetSelect = (presetIndex: number) => {
    setCase({ ...CASE_PRESETS[presetIndex].data });
  };

  const updateField = <K extends keyof CaseEvaluation>(key: K, value: CaseEvaluation[K]) => {
    setCase(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Presets & Case Metadata */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs uppercase tracking-wider font-mono text-amber-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Casos Pré-configurados para Simulação
            </span>
            <h2 className="text-lg font-bold text-slate-100 mt-1 font-serif-legal">
              Selecione um Cenário Prático ou Edite os Dados Abaixo
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {CASE_PRESETS.map((preset, idx) => (
              <button
                key={preset.name}
                onClick={() => handlePresetSelect(idx)}
                className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition flex items-center gap-2 cursor-pointer shadow-sm"
                title={preset.description}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Case Basic Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Número do Processo / Inquérito
            </label>
            <input
              type="text"
              value={currentCase.processNumber}
              onChange={(e) => updateField('processNumber', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-xs font-mono focus:border-amber-500 focus:outline-none"
              placeholder="Ex: 1502489-42.2026.8.26.0050"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Nome do Investigado / Réu
            </label>
            <input
              type="text"
              value={currentCase.defendantName}
              onChange={(e) => updateField('defendantName', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
              placeholder="Nome do Acusado"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Fase Processual Atual
            </label>
            <select
              value={currentCase.phase}
              onChange={(e) => updateField('phase', e.target.value as 'investigacao' | 'processo')}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
            >
              <option value="investigacao">Fase de Inquérito Policial (Investigação Preliminar)</option>
              <option value="processo">Fase da Ação Penal (Instrução Processual)</option>
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Tipificação Penal e Descrição Fática Resumida
          </label>
          <input
            type="text"
            value={currentCase.crimeDescription}
            onChange={(e) => updateField('crimeDescription', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
            placeholder="Ex: Roubo circunstanciado pelo concurso de pessoas e arma de fogo (Art. 157, § 2º, II e § 2º-A, I do CP)"
          />
        </div>
      </div>

      {/* Main Verdict Summary Card */}
      <div className={`rounded-2xl p-6 border shadow-xl transition-all ${
        result.isLegal 
          ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-100' 
          : 'bg-rose-950/25 border-rose-500/40 text-rose-100'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shrink-0 ${
              result.isLegal 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/40' 
                : 'bg-rose-500/20 text-rose-400 border border-rose-400/40'
            }`}>
              {result.isLegal ? <ShieldCheck className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider font-bold px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700">
                  Parecer Conclusivo de Legalidade
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {result.legalBasisArticles.join(' • ')}
                </span>
              </div>
              <h3 className="text-xl font-bold font-serif-legal mt-1 tracking-wide">
                {result.summaryConclusion}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setShowDoctrineHelp(!showDoctrineHelp)}
            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer shadow"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Fundamentos Doutrinários</span>
            {showDoctrineHelp ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Detailed Blockers / Objections */}
        {result.blockers.length > 0 && (
          <div className="mt-5 p-4 rounded-xl bg-rose-950/50 border border-rose-800/60 space-y-2">
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-rose-300 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-400" />
              Óbices Legais Insanáveis ({result.blockers.length}) - Impossibilidade de Decretação:
            </h4>
            <ul className="space-y-1.5 text-xs text-rose-200">
              {result.blockers.map((blocker, i) => (
                <li key={i} className="flex items-start gap-2 bg-rose-900/20 p-2 rounded-lg border border-rose-800/30">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{blocker}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Warnings / Observações */}
        {result.warnings.length > 0 && (
          <div className="mt-3 p-4 rounded-xl bg-amber-950/40 border border-amber-800/50 space-y-2">
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Alertas Jurídicos Relevantes e Condições Cautelares ({result.warnings.length}):
            </h4>
            <ul className="space-y-1.5 text-xs text-amber-200">
              {result.warnings.map((warning, i) => (
                <li key={i} className="flex items-start gap-2 bg-amber-900/20 p-2 rounded-lg border border-amber-800/30">
                  <span className="text-amber-400 font-bold">⚠</span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Collapsible Doctrine Explanation */}
        {showDoctrineHelp && (
          <div className="mt-5 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-3 leading-relaxed">
            <h4 className="text-sm font-bold text-amber-300 font-serif-legal">
              Pilares Constitucionais e Processuais da Prisão Preventiva:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-semibold block mb-1">1. Princípio da Homogeneidade e Proporcionalidade:</span>
                A medida cautelar não pode ser mais gravosa do que a pena que seria aplicada em caso de eventual condenação definitiva (vedada preventiva quando cabível regime aberto, semiaberto ou substituição por restritiva de direitos).
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-semibold block mb-1">2. Vedação da Decretação de Ofício (Lei 13.964/19):</span>
                O Art. 311 do CPP suprimiu a expressão "de ofício". O juiz não pode agir de ofício mesmo na audiência de custódia (STF HC 188.888). Se o MP postular liberdade, o magistrado não pode impor a prisão preventiva.
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-semibold block mb-1">3. Dever de Fundamentação Analítica (Art. 315, § 2º):</span>
                São nulas as decisões que utilizam fórmulas padronizadas ("para resguardar a ordem pública e acautelar o meio social"), sem correlacionar elementos concretos dos autos com o perigo atual da liberdade.
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-semibold block mb-1">4. Subsidiariedade das Cautelares do Art. 319:</span>
                A prisão é estrita <em>ultima ratio</em>. O juiz tem o ônus processual de fundamentar pontualmente por que as medidas alternativas não são suficientes antes de cercear a liberdade.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5-STEP INTERACTIVE STATUTORY CHECKLIST CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* MÓDULO 1: Legitimidade e Sistema Acusatório (Art. 311) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs font-mono">
                01
              </span>
              <h3 className="font-bold text-slate-100 text-sm font-serif-legal">
                Legitimidade Ativa & Provocação (Art. 311)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Sistema Acusatório</span>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition">
              <input
                type="checkbox"
                checked={currentCase.hasMpRequest}
                onChange={(e) => updateField('hasMpRequest', e.target.checked)}
                className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
              />
              <div>
                <span className="font-semibold text-slate-200">Requerimento do Ministério Público ou Querelante</span>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Pedido expresso formulado pelo órgão ministerial ou assistente de acusação em manifestação formal.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition">
              <input
                type="checkbox"
                checked={currentCase.hasPoliceRepresentation}
                onChange={(e) => updateField('hasPoliceRepresentation', e.target.checked)}
                className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
              />
              <div>
                <span className="font-semibold text-slate-200">Representação da Autoridade Policial (Delegado)</span>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Representação formal e fundamentada exarada pelo Delegado de Polícia no inquérito policial.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 hover:border-rose-700/60 cursor-pointer transition">
              <input
                type="checkbox"
                checked={currentCase.isExOfficio}
                onChange={(e) => updateField('isExOfficio', e.target.checked)}
                className="mt-0.5 accent-rose-500 w-4 h-4 rounded"
              />
              <div>
                <span className="font-semibold text-rose-300">Decretação De Ofício pelo Juiz (VEDADA!)</span>
                <p className="text-rose-400/80 text-[11px] mt-0.5">
                  Magistrado atuando por iniciativa própria sem pedido do MP ou da Polícia. É nulidade absoluta insanável (Pacote Anticrime).
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* MÓDULO 2: Condições de Admissibilidade (Art. 313) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs font-mono">
                02
              </span>
              <h3 className="font-bold text-slate-100 text-sm font-serif-legal">
                Condições de Admissibilidade (Art. 313)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Hipóteses Taxativas</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Pena Máxima Input */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-200">
                  Art. 313, I: Pena Privativa Máxima em Abstrato:
                </span>
                <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                  currentCase.maxPenaltyYears > 4 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {currentCase.maxPenaltyYears} {currentCase.maxPenaltyYears === 1 ? 'ano' : 'anos'} {currentCase.maxPenaltyYears > 4 ? '(> 4 anos - Admite)' : '(≤ 4 anos)'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={currentCase.maxPenaltyYears}
                onChange={(e) => updateField('maxPenaltyYears', parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <p className="text-slate-400 text-[11px] mt-1">
                Nos crimes dolosos punidos com pena máxima privativa de liberdade superior a 4 (quatro) anos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentCase.isIntentionalCrime}
                  onChange={(e) => updateField('isIntentionalCrime', e.target.checked)}
                  className="accent-amber-500 w-4 h-4 rounded"
                />
                <span className="text-slate-200 font-medium">Crime Doloso</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/30 hover:border-rose-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentCase.isCulposo}
                  onChange={(e) => updateField('isCulposo', e.target.checked)}
                  className="accent-rose-500 w-4 h-4 rounded"
                />
                <span className="text-rose-300 font-medium">Crime Culposo (Vedada)</span>
              </label>
            </div>

            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition">
              <input
                type="checkbox"
                checked={currentCase.isRecidivist}
                onChange={(e) => updateField('isRecidivist', e.target.checked)}
                className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
              />
              <div>
                <span className="font-semibold text-slate-200">Art. 313, II: Reincidente em Crime Doloso</span>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Condenado por outro crime doloso em sentença transitada em julgado anterior.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition">
              <input
                type="checkbox"
                checked={currentCase.isDomesticViolence}
                onChange={(e) => updateField('isDomesticViolence', e.target.checked)}
                className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
              />
              <div>
                <span className="font-semibold text-slate-200">Art. 313, III: Violência Doméstica / Familiar</span>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Crime contra mulher, criança, adolescente, idoso ou enfermo para garantir medidas protetivas urgentes.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition">
              <input
                type="checkbox"
                checked={currentCase.hasCivilIdentityDoubt}
                onChange={(e) => updateField('hasCivilIdentityDoubt', e.target.checked)}
                className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
              />
              <div>
                <span className="font-semibold text-slate-200">Art. 313, Parágrafo Único: Dúvida de Identidade Civil</span>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Dúvida sobre a identidade civil ou não fornecimento de elementos suficientes para seu esclarecimento.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* MÓDULO 3: Pressupostos - Fumus Comissi Delicti (Art. 312) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs font-mono">
                03
              </span>
              <h3 className="font-bold text-slate-100 text-sm font-serif-legal">
                Pressupostos: Fumus Comissi Delicti (Art. 312)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Materialidade & Autoria</span>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition">
              <input
                type="checkbox"
                checked={currentCase.crimeExistenceProven}
                onChange={(e) => updateField('crimeExistenceProven', e.target.checked)}
                className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
              />
              <div>
                <span className="font-semibold text-slate-200">Prova da Existência do Crime (Materialidade)</span>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Laudo pericial, exame de corpo de delito, apreensão de coisas, filmagens ou documentos inequívocos atestando a infração.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition">
              <input
                type="checkbox"
                checked={currentCase.sufficientAuthorshipIndicia}
                onChange={(e) => updateField('sufficientAuthorshipIndicia', e.target.checked)}
                className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
              />
              <div>
                <span className="font-semibold text-slate-200">Indício Suficiente de Autoria</span>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Elementos idôneos e individualizados vinculando o investigado à execução ou participação no fato delituoso.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* MÓDULO 4: Fundamentos - Periculum Libertatis (Art. 312) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs font-mono">
                04
              </span>
              <h3 className="font-bold text-slate-100 text-sm font-serif-legal">
                Fundamentos: Periculum Libertatis (Art. 312)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Risco Concreto Atual</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Ordem Pública */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentCase.publicOrderGuarantee}
                  onChange={(e) => updateField('publicOrderGuarantee', e.target.checked)}
                  className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
                />
                <div>
                  <span className="font-semibold text-slate-200">Garantia da Ordem Pública</span>
                  <p className="text-slate-400 text-[11px]">
                    Risco evidente de reiteração delitiva ou especial gravidade concreta demonstrada pelo modus operandi.
                  </p>
                </div>
              </label>
              {currentCase.publicOrderGuarantee && (
                <input
                  type="text"
                  value={currentCase.publicOrderReason}
                  onChange={(e) => updateField('publicOrderReason', e.target.value)}
                  placeholder="Justificativa fática da ordem pública..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-200 focus:outline-none"
                />
              )}
            </div>

            {/* Conveniência da Instrução Criminal */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentCase.criminalInstructionConvenience}
                  onChange={(e) => updateField('criminalInstructionConvenience', e.target.checked)}
                  className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
                />
                <div>
                  <span className="font-semibold text-slate-200">Conveniência da Instrução Criminal</span>
                  <p className="text-slate-400 text-[11px]">
                    Ameaça a testemunhas ou vítimas, coação de partícipes, destruição ou ocultação de provas materiais.
                  </p>
                </div>
              </label>
              {currentCase.criminalInstructionConvenience && (
                <input
                  type="text"
                  value={currentCase.instructionReason}
                  onChange={(e) => updateField('instructionReason', e.target.value)}
                  placeholder="Justificativa de ameaça à instrução..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-200 focus:outline-none"
                />
              )}
            </div>

            {/* Assegurar Aplicação da Lei Penal */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentCase.penalLawApplication}
                  onChange={(e) => updateField('penalLawApplication', e.target.checked)}
                  className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
                />
                <div>
                  <span className="font-semibold text-slate-200">Assegurar a Aplicação da Lei Penal</span>
                  <p className="text-slate-400 text-[11px]">
                    Risco concreto de fuga iminente, ocultação de patrimônio para frustrar reparação, falta de laços com o distrito da culpa.
                  </p>
                </div>
              </label>
              {currentCase.penalLawApplication && (
                <input
                  type="text"
                  value={currentCase.flightRiskReason}
                  onChange={(e) => updateField('flightRiskReason', e.target.value)}
                  placeholder="Elementos de perigo de fuga..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-200 focus:outline-none"
                />
              )}
            </div>

            {/* Descumprimento Cautelar */}
            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={currentCase.breachOfPreviousMeasures}
                onChange={(e) => updateField('breachOfPreviousMeasures', e.target.checked)}
                className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
              />
              <div>
                <span className="font-semibold text-slate-200">Descumprimento de Medida Cautelar Anterior (Art. 282, § 4º)</span>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Violação comprovada de tornozeleira eletrônica, descumprimento de medidas protetivas ou de recolhimento noturno.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* MÓDULO 5: Contemporaneidade & Subsidiariedade (Arts. 312, § 2º, 315 e 319) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs font-mono">
                05
              </span>
              <h3 className="font-bold text-slate-100 text-sm font-serif-legal">
                Contemporaneidade & Subsidiariedade das Cautelares Alternativas (Arts. 312, § 2º, 315 e 282, § 6º)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Ultima Ratio & Motivação</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentCase.isContemporary}
                  onChange={(e) => updateField('isContemporary', e.target.checked)}
                  className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
                />
                <div>
                  <span className="font-semibold text-slate-200">Fatos Contemporâneos e Perigo Atual</span>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Os motivos da prisão decorrem de fatos novos ou contemporâneos (Art. 312, § 2º). Não se admite preventiva por fatos pretéritos sem atualidade.
                  </p>
                </div>
              </label>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Fundamentação Concreta (Art. 315, § 2º do CPP):
                </label>
                <textarea
                  rows={3}
                  value={currentCase.concreteFactsDescription}
                  onChange={(e) => updateField('concreteFactsDescription', e.target.value)}
                  placeholder="Descreva as peculiaridades concretas do caso (não utilize fórmulas genéricas ou mera repetição legal)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentCase.alternativeMeasuresInsufficient}
                  onChange={(e) => updateField('alternativeMeasuresInsufficient', e.target.checked)}
                  className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
                />
                <div>
                  <span className="font-semibold text-slate-200">Insuficiência Comprovada das Medidas Cautelares do Art. 319</span>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Demonstrado concretamente por que tornozeleira eletrônica, recolhimento noturno ou fiança não bastam para resguardar a ordem pública.
                  </p>
                </div>
              </label>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Motivo da Ineficácia das Medidas Alternativas:
                </label>
                <textarea
                  rows={3}
                  value={currentCase.alternativeMeasuresExplanation}
                  onChange={(e) => updateField('alternativeMeasuresExplanation', e.target.value)}
                  placeholder="Explique por que as medidas cautelares do Art. 319 são inadequadas para o caso..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
