import React, { useState } from 'react';
import { 
  Home, 
  Heart, 
  Baby, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  Copy, 
  Check, 
  Scale, 
  UserCheck 
} from 'lucide-react';
import { CaseEvaluation } from '../types';

interface DomiciliaryArrestProps {
  currentCase: CaseEvaluation;
  setCase: React.Dispatch<React.SetStateAction<CaseEvaluation>>;
}

export const DomiciliaryArrest: React.FC<DomiciliaryArrestProps> = ({ currentCase, setCase }) => {
  const [copied, setCopied] = useState<boolean>(false);

  // Conditions
  const isMotherOrPregnant = currentCase.isMotherOfChildUpTo12 || currentCase.isPregnantWoman;
  const violentAgainstDependent = currentCase.committedCrimeWithViolenceAgainstDependent;
  
  // Art. 318-A applicability
  const qualifiesArt318A = isMotherOrPregnant && !violentAgainstDependent;

  const qualifiesAnyArt318 = 
    currentCase.isOver80 || 
    currentCase.isExtremelyDebilitatedByIllness || 
    currentCase.isIndispensableForChildUnder6OrDisabled || 
    qualifiesArt318A;

  const updateField = <K extends keyof CaseEvaluation>(key: K, value: CaseEvaluation[K]) => {
    setCase(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const petitionDraft = `EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA VARA CRIMINAL DA COMARCA DE ...

Autos nº: ${currentCase.processNumber}
Requerente: ${currentCase.defendantName}
Imputação: ${currentCase.crimeDescription}

PEDIDO DE SUBSTITUIÇÃO DE PRISÃO PREVENTIVA POR PRISÃO DOMICILIAR
(Com fulcro nos Arts. 318 e 318-A do CPP e HC Coletivo 143.641/SP do STF)

A DEFESA da requerente vem, respeitosamente, perante Vossa Excelência, expor e requerer:

1. DA OBRIGATORIEDADE LEGAL DA SUBSTITUIÇÃO (ART. 318-A DO CPP):
A requerente preenche rigorosamente os requisitos estipulados no Art. 318-A do Código de Processo Penal e na ordem concedida pelo Plenário do Supremo Tribunal Federal no histórico HC Coletivo nº 143.641/SP.

Com efeito, trata-se de ${currentCase.isPregnantWoman ? 'mulher gestante' : 'mãe com filho menor de 12 anos incompletos'}, sendo certo que o crime imputado NÃO foi perpetrado com violência ou grave ameaça contra seus descendentes/dependentes.

2. DA DOUTRINA DA PROTEÇÃO INTEGRAL DA PRIMEIRA INFÂNCIA:
A norma processual prestigia o melhor interesse da criança (Art. 227 da Constituição Federal e Lei nº 13.257/2016 - Marco Legal da Primeira Infância), garantindo que o infante não sofra as deletérias consequências do encarceramento materno.

3. DOS PEDIDOS:
Ante o exposto, pugna-se pela imediata SUBSTITUIÇÃO DA PRISÃO PREVENTIVA POR PRISÃO DOMICILIAR com aplicação subsidiária de monitoração eletrônica se entender necessário, expedindo-se com urgência o competente ALVARÁ DE SOLTURA e termo de custódia domiciliar.

Termos em que,
Pede deferimento.
Comarca, ${new Date().toLocaleDateString('pt-BR')}.
Advogado / Defensor Público
OAB/...`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(petitionDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 font-serif-legal">
              Prisão Domiciliar Substitutiva (Arts. 318 e 318-A do CPP)
            </h2>
            <p className="text-xs text-slate-400">
              Marco Legal da Primeira Infância (Lei 13.257/16), Lei 13.769/18 e Precedente Vinculante do STF no HC Coletivo 143.641/SP.
            </p>
          </div>
        </div>
      </div>

      {/* Decision Engine Result */}
      <div className={`p-6 rounded-2xl border shadow-xl transition-all ${
        qualifiesArt318A || qualifiesAnyArt318
          ? 'bg-emerald-950/25 border-emerald-500/50 text-emerald-100'
          : 'bg-slate-900/90 border-slate-800 text-slate-200'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              qualifiesArt318A || qualifiesAnyArt318
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30'
                : 'bg-slate-800 text-slate-400'
            }`}>
              {qualifiesArt318A || qualifiesAnyArt318 ? <CheckCircle2 className="w-7 h-7" /> : <XCircle className="w-7 h-7" />}
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-300">
                Resultado da Avaliação Domiciliar
              </span>
              <h3 className="text-lg font-bold font-serif-legal mt-1">
                {qualifiesArt318A 
                  ? 'DEVER LEGAL DE SUBSTITUIÇÃO POR PRISÃO DOMICILIAR (Art. 318-A do CPP & STF HC 143.641)' 
                  : qualifiesAnyArt318
                  ? 'HIPÓTESE DE ADMISSIBILIDADE DE PRISÃO DOMICILIAR DO ART. 318 DO CPP'
                  : 'NÃO PREENCHE OS REQUISITOS ESPECÍFICOS DE PRISÃO DOMICILIAR'}
              </h3>
            </div>
          </div>
        </div>

        {qualifiesArt318A && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-xs text-emerald-200 leading-relaxed">
            <strong>Proteção da Maternidade e Primeira Infância:</strong> A mulher gestante ou mãe de criança de até 12 anos incompletos possui direito subjetivo processual à substituição da preventiva por domiciliar, salvo se o crime tiver sido praticado com violência contra seu descendente. A ordem do STF no HC 143.641 possui eficácia expansiva e vinculante.
          </div>
        )}
      </div>

      {/* Interactive Questionnaire of Legal Criteria */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Hipóteses do Art. 318-A (Mães e Gestantes) */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-2">
              <Baby className="w-4 h-4" /> Art. 318-A: Gestantes e Mães
            </span>
            <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
              Regra Cogente
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={currentCase.isPregnantWoman}
                onChange={(e) => updateField('isPregnantWoman', e.target.checked)}
                className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
              />
              <div>
                <span className="font-semibold text-slate-200">Mulher Gestante</span>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Comprovação médica nos autos de estado gravídico em qualquer trimestre de gestação.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={currentCase.isMotherOfChildUpTo12}
                onChange={(e) => updateField('isMotherOfChildUpTo12', e.target.checked)}
                className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
              />
              <div>
                <span className="font-semibold text-slate-200">Mãe com Filho de até 12 anos incompletos</span>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Certidão de nascimento juntada demonstrando descendente na primeira ou segunda infância.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 hover:border-rose-800/60 cursor-pointer">
              <input
                type="checkbox"
                checked={currentCase.committedCrimeWithViolenceAgainstDependent}
                onChange={(e) => updateField('committedCrimeWithViolenceAgainstDependent', e.target.checked)}
                className="mt-0.5 accent-rose-500 w-4 h-4 rounded"
              />
              <div>
                <span className="font-semibold text-rose-300">Exceção: Crime com violência/grave ameaça ao descendente</span>
                <p className="text-rose-400/80 text-[11px] mt-0.5">
                  Se o crime foi cometido com violência ou grave ameaça contra seu filho ou dependente, veda-se a concessão domiciliar (Art. 318-A, II).
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Hipóteses Gerais do Art. 318 do CPP */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-2">
              <Heart className="w-4 h-4" /> Art. 318: Hipóteses Humanitárias
            </span>
            <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
              Critérios Individuais
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={currentCase.isOver80}
                onChange={(e) => updateField('isOver80', e.target.checked)}
                className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
              />
              <div>
                <span className="font-semibold text-slate-200">Art. 318, I: Maior de 80 (oitenta) anos</span>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Senilidade e vulnerabilidade biológica comprovada por documento de identidade.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={currentCase.isExtremelyDebilitatedByIllness}
                onChange={(e) => updateField('isExtremelyDebilitatedByIllness', e.target.checked)}
                className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
              />
              <div>
                <span className="font-semibold text-slate-200">Art. 318, II: Extremamente debilitado por doença grave</span>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Doença grave incompatível com o tratamento médico oferecido no estabelecimento prisional.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={currentCase.isIndispensableForChildUnder6OrDisabled}
                onChange={(e) => updateField('isIndispensableForChildUnder6OrDisabled', e.target.checked)}
                className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
              />
              <div>
                <span className="font-semibold text-slate-200">Art. 318, III/VI: Imprescindível aos cuidados de menor de 6 anos ou PCD</span>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Comprovação de dependência exclusiva do custodiado para a subsistência física da pessoa vulnerável.
                </p>
              </div>
            </label>
          </div>
        </div>

      </div>

      {/* Petition Generation Card for Domiciliary Prison */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-slate-100 text-sm font-serif-legal">
              Petição de Substituição por Prisão Domiciliar (Art. 318-A e HC 143.641/STF)
            </h3>
          </div>
          <button
            onClick={copyToClipboard}
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition shadow"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiado para Área de Transferência!' : 'Copiar Petição'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
          {petitionDraft}
        </pre>
      </div>

    </div>
  );
};
