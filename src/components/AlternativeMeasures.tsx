import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Scale, 
  FileCheck, 
  Copy, 
  Check, 
  MapPin, 
  Radio, 
  DollarSign, 
  Users, 
  Briefcase, 
  Home, 
  Activity,
  Layers
} from 'lucide-react';
import { CautelarMeasure, CaseEvaluation } from '../types';

const MEASURES_CATALOG: CautelarMeasure[] = [
  {
    id: 1,
    inciso: 'Inciso I',
    title: 'Comparecimento periódico em juízo',
    description: 'Comparecimento no prazo e nas condições fixadas pelo juiz, para informar e justificar atividades.',
    practicalApplicability: 'Aplicável para manter o vínculo do investigado com o juízo e certificar sua permanência no distrito.',
    fiscalization: 'Assinatura bimestral/mensal no cartório ou fórum / balcão virtual.',
    riskMitigated: 'Garante o comparecimento aos atos processuais e previne fuga simples.'
  },
  {
    id: 2,
    inciso: 'Inciso II',
    title: 'Proibição de acesso ou frequência a determinados lugares',
    description: 'Proibição quando, por sua natureza ou características, devam permanecer distantes para evitar risco de novas infrações.',
    practicalApplicability: 'Estádios de futebol (crimes de torcida), bares/casas noturnas (crimes sob efeito de álcool) ou estabelecimentos específicos.',
    fiscalization: 'Ofício aos estabelecimentos, fiscalização policial ostensiva.',
    riskMitigated: 'Inibe a reprodução do ambiente criminógeno.'
  },
  {
    id: 3,
    inciso: 'Inciso III',
    title: 'Proibição de manter contato com pessoa determinada',
    description: 'Proibição de contato com a vítima, testemunhas ou corréus, quando por circunstâncias do fato deva o indiciado permanecer distante.',
    practicalApplicability: 'Indispensável em casos de coação no curso do processo, crimes passionais, ameaça ou violência doméstica.',
    fiscalization: 'Comunicação à vítima com canal de emergência e monitoramento.',
    riskMitigated: 'Preserva a integridade da vítima e a instrução probatória.'
  },
  {
    id: 4,
    inciso: 'Inciso IV',
    title: 'Proibição de ausentar-se da Comarca',
    description: 'Proibição de deslocamento para além dos limites do município/comarca quando a permanência for necessária para a instrução.',
    practicalApplicability: 'Retenção do acusado em sua circunscrição geográfica sem necessidade de recolhimento intramuros.',
    fiscalization: 'Controle de fronteiras/aeroportos, entrega de passaporte se necessário.',
    riskMitigated: 'Assegura a aplicação da lei penal.'
  },
  {
    id: 5,
    inciso: 'Inciso V',
    title: 'Recolhimento domiciliar noturno e nos dias de folga',
    description: 'Obrigação de permanecer na própria residência entre 20h e 6h e nos fins de semana, quando tiver residência e trabalho fixos.',
    practicalApplicability: 'Ideal para acusados que comprovam ocupação lícita durante o dia, prevenindo a criminalidade noturna.',
    fiscalization: 'Tornozeleira eletrônica ou visitas aleatórias de agentes da segurança pública.',
    riskMitigated: 'Equilibra subsistência lícita do acusado e controle social rigoroso.'
  },
  {
    id: 6,
    inciso: 'Inciso VI',
    title: 'Suspensão do exercício de função pública ou atividade econômica',
    description: 'Afastamento cautelar do cargo, emprego público ou atividade empresarial quando haja justo receio de sua utilização para a prática criminosa.',
    practicalApplicability: 'Crimes contra a Administração Pública (corrupção, peculato), crimes contra a ordem tributária ou crimes médicos/financeiros.',
    fiscalization: 'Notificação ao órgão empregador / Junta Comercial / Conselho de Classe.',
    riskMitigated: 'Estanca a reiteração criminosa no ambiente profissional.'
  },
  {
    id: 7,
    inciso: 'Inciso VII',
    title: 'Internação provisória do acusado',
    description: 'Nas hipóteses de crimes praticados com violência ou grave ameaça, quando peritos concluírem ser inimputável ou semi-imputável (art. 26 do CP).',
    practicalApplicability: 'Indivíduos com transtorno mental e periculosidade comprovada por perícia médica psiquiátrica judicial.',
    fiscalization: 'Hospital de Custódia e Tratamento Psiquiátrico (HCTP).',
    riskMitigated: 'Tratamento de saúde mental com contenção especializada.'
  },
  {
    id: 8,
    inciso: 'Inciso VIII',
    title: 'Fiança nas infrações que a admitem',
    description: 'Depósito pecuniário para assegurar o comparecimento a atos do processo, evitar a obstrução do seu andamento ou custear despesas/indenizações.',
    practicalApplicability: 'Crimes que não sejam inafiançáveis (como tortura, tráfico, racismo, hediondos, grupos armados).',
    fiscalization: 'Depósito em conta judicial vinculada ao Tribunal.',
    riskMitigated: 'Garante o comparecimento processual mediante desestímulo patrimonial.'
  },
  {
    id: 9,
    inciso: 'Inciso IX',
    title: 'Monitoração eletrônica (Tornozeleira)',
    description: 'Vigilância telemática ininterrupta com delimitação de zonas de inclusão (casa, trabalho) e zonas de exclusão (proximidade da vítima).',
    practicalApplicability: 'Medida substitutiva mais eficaz e próxima do cárcere físico, com controle via GPS em tempo real.',
    fiscalization: 'Central Integrada de Monitoramento Eletrônico da Secretaria de Administração Penitenciária.',
    riskMitigated: 'Controle territorial pleno sem encarceramento físico.'
  }
];

interface AlternativeMeasuresProps {
  currentCase: CaseEvaluation;
}

export const AlternativeMeasures: React.FC<AlternativeMeasuresProps> = ({ currentCase }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([1, 4, 9]);
  const [bailAmountMinSalaries, setBailAmountMinSalaries] = useState<number>(5);
  const [copied, setCopied] = useState<boolean>(false);

  const toggleMeasure = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectedMeasures = MEASURES_CATALOG.filter(m => selectedIds.includes(m.id));

  const generateDispatchText = () => {
    const minSal = 1412; // Salário mínimo de referência
    const bailValue = (bailAmountMinSalaries * minSal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    let measuresList = selectedMeasures.map((m, idx) => {
      if (m.id === 8) {
        return `   ${idx + 1}. ${m.title} (${m.inciso} do Art. 319 do CPP), arbitrada no importe de ${bailAmountMinSalaries} salários mínimos, perfazendo o montante de ${bailValue}, a ser recolhida em guia judicial;`;
      }
      return `   ${idx + 1}. ${m.title} (${m.inciso} do Art. 319 do CPP) - ${m.description};`;
    }).join('\n');

    return `PODER JUDICIÁRIO DO ESTADO DE ...
VARA CRIMINAL DA COMARCA DE ...

Autos nº: ${currentCase.processNumber}
Acusado(a): ${currentCase.defendantName}
Infração Penal: ${currentCase.crimeDescription}

DECISÃO INTERLOCUTÓRIA - APLICAÇÃO DE MEDIDAS CAUTELARES DIVERSAS DA PRISÃO

Vistos etc.

Em atenção aos postulados da proporcionalidade, razoabilidade e subsidiariedade insculpidos no Art. 282, § 6º do Código de Processo Penal, verifica-se que a segregação cautelar extrema (prisão preventiva) revela-se prescindível e desproporcional neste estágio processual, sendo suficientes e adequadas as medidas cautelares alternativas.

Com efeito, as peculiaridades do caso concreto e as condições subjetivas do acusado autorizam a substituição do cárcere por regime cautelar fiscalizado, prevenindo-se a reiteração criminosa sem prejuízo à subsistência pessoal e à instrução criminal.

Ante o exposto, CONCEDO A LIBERDADE PROVISÓRIA / SUBSTITUO A PRISÃO, impondo ao acusado as seguintes MEDIDAS CAUTELARES PREVISTAS NO ART. 319 DO CPP:

${measuresList}

ADVERTÊNCIA EXPRESSA (Art. 282, § 4º do CPP):
Fica o réu expressamente ciente de que o descumprimento injustificado de quaisquer das obrigações cautelares supra acarretará a imediata REVOGAÇÃO do benefício e a consequente DECRETAÇÃO DE SUA PRISÃO PREVENTIVA.

Expeça-se o competente Alvará de Soltura e Termo de Compromisso Cautelar.
Ciência ao Ministério Público e à Defesa.

Comarca, ${new Date().toLocaleDateString('pt-BR')}.
Juiz(a) de Direito`;
  };

  const copyDispatch = () => {
    navigator.clipboard.writeText(generateDispatchText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 font-serif-legal">
              Catálogo e Compositor de Medidas Cautelares Alternativas (Art. 319 do CPP)
            </h2>
            <p className="text-xs text-slate-400">
              Obrigação legal de esgotamento e subsidiariedade (Art. 282, § 6º): A prisão preventiva é a <em>ultima ratio</em> do processo penal.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of the 9 Measures */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MEASURES_CATALOG.map((measure) => {
          const isSelected = selectedIds.includes(measure.id);
          return (
            <div
              key={measure.id}
              onClick={() => toggleMeasure(measure.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-950/30 border-amber-500/60 shadow-lg shadow-amber-950/20'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 text-amber-300 border border-slate-800">
                    {measure.inciso}
                  </span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    isSelected ? 'bg-amber-400 text-slate-950' : 'border border-slate-700'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <h3 className="font-bold text-sm text-slate-100 mb-1">
                  {measure.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {measure.description}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] space-y-1">
                <div className="text-slate-400">
                  <strong className="text-amber-400/90">Fiscalização:</strong> {measure.fiscalization}
                </div>
                <div className="text-slate-400">
                  <strong className="text-amber-400/90">Finalidade:</strong> {measure.riskMitigated}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Special Bail Configurator if Inciso VIII is chosen */}
      {selectedIds.includes(8) && (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-amber-300 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" /> Parâmetros de Fixação da Fiança (Art. 325 do CPP)
            </span>
            <span className="text-xs font-mono text-slate-300">
              Valor: {bailAmountMinSalaries} Salários Mínimos (~ {(bailAmountMinSalaries * 1412).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={bailAmountMinSalaries}
            onChange={(e) => setBailAmountMinSalaries(parseInt(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <p className="text-[11px] text-slate-400">
            Regra geral do Art. 325: de 1 a 100 salários mínimos para infrações com pena máxima superior a 4 anos; pode ser dispensada em caso de hipossuficiência comprovada (Art. 350).
          </p>
        </div>
      )}

      {/* Generated Judicial Decision Preview */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-slate-100 text-sm font-serif-legal">
              Decisão Interlocutória com as Medidas Cautelares Selecionadas ({selectedMeasures.length})
            </h3>
          </div>

          <button
            onClick={copyDispatch}
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition shadow"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiado!' : 'Copiar Decisão'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
          {generateDispatchText()}
        </pre>
      </div>

    </div>
  );
};
