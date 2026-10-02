import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  FileWarning, 
  Copy, 
  Check, 
  Scale, 
  ArrowRight 
} from 'lucide-react';
import { CaseEvaluation } from '../types';

interface DeadlineCalculatorProps {
  currentCase: CaseEvaluation;
}

export const DeadlineCalculator: React.FC<DeadlineCalculatorProps> = ({ currentCase }) => {
  // Default to 45 days ago
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() - 45);
  const formattedDefault = defaultDate.toISOString().split('T')[0];

  const [decreeDate, setDecreeDate] = useState<string>(formattedDefault);
  const [copied, setCopied] = useState<boolean>(false);

  // Compute 90-day deadline
  const decree = new Date(decreeDate);
  const deadline90 = new Date(decree);
  deadline90.setDate(deadline90.getDate() + 90);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - decree.getTime();
  const daysElapsed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const daysRemaining = 90 - daysElapsed;

  const isExpired = daysRemaining < 0;
  const isUrgent = daysRemaining >= 0 && daysRemaining <= 15;

  const petitionDraft = `EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA VARA CRIMINAL DA COMARCA DE ...

Autos do Processo nº: ${currentCase.processNumber}
Acusado: ${currentCase.defendantName}

A DEFESA do acusado supra qualificado vem, respeitosamente, à presença de Vossa Excelência, expor e requerer o que segue:

1. Constata-se dos autos que a prisão preventiva do acusado foi decretada/revisada pela última vez em ${new Date(decreeDate).toLocaleDateString('pt-BR')}, tendo transcorrido mais de ${daysElapsed} dias ininterruptos de custódia cautelar.

2. O parágrafo único do art. 316 do Código de Processo Penal preconiza expressamente que:
"Decretada a prisão preventiva, deverá o órgão emissor da decisão revisar a necessidade de sua manutenção a cada 90 (noventa) dias, mediante decisão fundamentada, de ofício, sob pena de tornar a prisão ilegal."

3. Conforme jurisprudência do Supremo Tribunal Federal (ADI 6581 e 6582) e do Superior Tribunal de Justiça, impõe-se a imediata provocação do magistrado processante para reexame pormenorizado e contemporâneo da necessidade e proporcionalidade da segregação, sob pena de restar caracterizado manifesto constrangimento ilegal por excesso de prazo.

4. Ausentes motivos novos ou contemporâneos que justifiquem a permanência do custodiado no cárcere, e sendo suficientes as medidas cautelares alternativas do Art. 319 do CPP.

DOS PEDIDOS:
Diante do exposto, requer-se:
a) A imediata REVISÃO NONAGESIMAL da prisão cautelar nos termos do art. 316, parágrafo único do CPP;
b) A consequente REVOGAÇÃO DA PRISÃO PREVENTIVA ou, subsidiariamente, sua substituição pelas medidas cautelares diversas previstas no Art. 319 do CPP, expedindo-se o competente Alvará de Soltura.

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
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 font-serif-legal">
              Calculadora e Monitor da Revisão Nonagesimal (Art. 316, p. único do CPP)
            </h2>
            <p className="text-xs text-slate-400">
              Controle do prazo legal de 90 dias para revisão periódica obrigatória da prisão preventiva e prazos do réu preso.
            </p>
          </div>
        </div>
      </div>

      {/* Main Countdown & Status Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Date Selector */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-md">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Data da Decretação / Última Revisão
          </span>

          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Selecione a data da decisão que decretou ou manteve a preventiva:
            </label>
            <input
              type="date"
              value={decreeDate}
              onChange={(e) => setDecreeDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div className="space-y-2 pt-2 text-xs text-slate-300 border-t border-slate-800">
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Data de Início:</span>
              <span className="font-mono text-slate-200">{decree.toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Termo Final dos 90 dias:</span>
              <span className="font-mono font-bold text-amber-300">{deadline90.toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Dias Decorridos:</span>
              <span className="font-mono font-bold text-slate-200">{daysElapsed} dias</span>
            </div>
          </div>
        </div>

        {/* Live Status Display */}
        <div className={`p-5 rounded-2xl border shadow-lg flex flex-col justify-between ${
          isExpired
            ? 'bg-rose-950/30 border-rose-700/60 text-rose-100'
            : isUrgent
            ? 'bg-amber-950/30 border-amber-700/60 text-amber-100'
            : 'bg-emerald-950/20 border-emerald-700/50 text-emerald-100'
        }`}>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700">
                Status Art. 316 CPP
              </span>
              {isExpired ? (
                <ShieldAlert className="w-6 h-6 text-rose-400" />
              ) : isUrgent ? (
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              ) : (
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              )}
            </div>

            <div className="mt-4 text-center">
              <div className="text-4xl md:text-5xl font-mono font-black tracking-tight">
                {isExpired ? `+${Math.abs(daysRemaining)}` : daysRemaining}
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold mt-1">
                {isExpired ? 'Dias Ultrapassados do Limite Legal' : 'Dias Restantes para Revisão'}
              </div>
            </div>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
            {isExpired && (
              <p className="text-rose-300">
                <strong>PRAZO NONAGESIMAL EXPIRADO:</strong> Decorridos mais de 90 dias sem reanálise judicial periódica. Conforme jurisprudência do STF (ADI 6581/6582) e STJ, há constrangimento ilegal a ser sanado por provocação imediata ao magistrado ou concessão de ordem em HC.
              </p>
            )}
            {isUrgent && (
              <p className="text-amber-300">
                <strong>ATENÇÃO / PRAZO CRÍTICO:</strong> Faltam menos de 15 dias para expiração do prazo de 90 dias. Necessária conclusão imediata dos autos ao magistrado para decisão fundamentada.
              </p>
            )}
            {!isExpired && !isUrgent && (
              <p className="text-emerald-300">
                <strong>DENTRO DO PRAZO LEGAL:</strong> A segregação cautelar encontra-se no período regular de vigência. Próxima reanálise obrigatória até {deadline90.toLocaleDateString('pt-BR')}.
              </p>
            )}
          </div>
        </div>

        {/* Legal Action Summary */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-md text-xs">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-amber-400" /> Providências Processuais Recomendadas
          </span>

          <ul className="space-y-2 text-slate-300">
            <li className="p-2 rounded bg-slate-950 border border-slate-800">
              <strong className="text-amber-300">Pelo Magistrado:</strong> Proferir decisão fundamentada nos termos do art. 315 do CPP, reavaliando a contemporaneidade dos motivos e a suficiência de cautelares do art. 319.
            </li>
            <li className="p-2 rounded bg-slate-950 border border-slate-800">
              <strong className="text-amber-300">Pelo MP:</strong> Manifestar-se expressamente pela manutenção ou substituição por cautelares antes do término dos 90 dias.
            </li>
            <li className="p-2 rounded bg-slate-950 border border-slate-800">
              <strong className="text-amber-300">Pela Defesa:</strong> Protocolar petição de provocação e pedido de relaxamento da prisão por excesso de prazo, instruída com certidão de decurso temporal.
            </li>
          </ul>
        </div>

      </div>

      {/* Comparative Deadlines for Incarcerated Defendants (Réu Preso) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
            Tabela Comparativa de Prazos Cautelares
          </span>
          <h3 className="text-base font-bold text-slate-100 font-serif-legal mt-0.5">
            Prazos da Persecução Penal com Réu Preso vs Réu Solto
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="text-[11px] uppercase bg-slate-950 text-slate-400 font-mono border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Ato Processual</th>
                <th className="px-4 py-3 text-amber-400">Prazo (Réu Preso)</th>
                <th className="px-4 py-3">Prazo (Réu Solto)</th>
                <th className="px-4 py-3">Dispositivo Legal</th>
                <th className="px-4 py-3">Consequência da Mora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr className="hover:bg-slate-800/40">
                <td className="px-4 py-3 font-semibold text-slate-100">Audiência de Custódia</td>
                <td className="px-4 py-3 font-mono text-amber-300 font-bold">24 horas</td>
                <td className="px-4 py-3 text-slate-500">Não aplicável</td>
                <td className="px-4 py-3 font-mono">Art. 310, CPP</td>
                <td className="px-4 py-3 text-rose-300">Relaxamento da prisão</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="px-4 py-3 font-semibold text-slate-100">Conclusão do Inquérito (CPP Comum)</td>
                <td className="px-4 py-3 font-mono text-amber-300 font-bold">10 dias (improrrogável)</td>
                <td className="px-4 py-3 font-mono">30 dias (prorrogável)</td>
                <td className="px-4 py-3 font-mono">Art. 10, CPP</td>
                <td className="px-4 py-3 text-rose-300">Relaxamento imediato</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="px-4 py-3 font-semibold text-slate-100">Conclusão do Inquérito (Lei de Drogas)</td>
                <td className="px-4 py-3 font-mono text-amber-300 font-bold">30 dias (+ 30 dias duplicável)</td>
                <td className="px-4 py-3 font-mono">90 dias (+ 90 dias)</td>
                <td className="px-4 py-3 font-mono">Art. 51, Lei 11.343/06</td>
                <td className="px-4 py-3 text-rose-300">Excesso de prazo</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="px-4 py-3 font-semibold text-slate-100">Oferecimento da Denúncia pelo MP</td>
                <td className="px-4 py-3 font-mono text-amber-300 font-bold">5 dias</td>
                <td className="px-4 py-3 font-mono">15 dias</td>
                <td className="px-4 py-3 font-mono">Art. 46, CPP</td>
                <td className="px-4 py-3 text-rose-300">Ação penal privada subsidiária e soltura</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="px-4 py-3 font-semibold text-slate-100">Revisão Periódica da Preventiva</td>
                <td className="px-4 py-3 font-mono text-amber-300 font-bold">A cada 90 dias</td>
                <td className="px-4 py-3 text-slate-500">Não aplicável</td>
                <td className="px-4 py-3 font-mono">Art. 316, p. único, CPP</td>
                <td className="px-4 py-3 text-rose-300">Ilegalidade / Constrangimento ilegal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Petition Generation Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileWarning className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-slate-100 text-sm font-serif-legal">
              Minuta de Provocação de Revisão Nonagesimal / Excesso de Prazo
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
