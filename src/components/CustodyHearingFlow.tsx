import React, { useState } from 'react';
import { 
  Gavel, 
  AlertCircle, 
  CheckCircle2, 
  ShieldX, 
  ShieldCheck, 
  FileText, 
  Clock, 
  Scale, 
  Lock, 
  Unlock, 
  HeartHandshake,
  AlertTriangle
} from 'lucide-react';
import { CaseEvaluation } from '../types';

interface CustodyHearingFlowProps {
  currentCase: CaseEvaluation;
}

export const CustodyHearingFlow: React.FC<CustodyHearingFlowProps> = ({ currentCase }) => {
  const [hoursSinceArrest, setHoursSinceArrest] = useState<number>(18);
  const [handcuffsJustified, setHandcuffsJustified] = useState<boolean>(false);
  const [handcuffsReason, setHandcuffsReason] = useState<string>('Resistência ativa ou perigo manifesto de fuga');
  const [hasSignsOfTorture, setHasSignsOfTorture] = useState<boolean>(false);
  const [medicalExamPerformed, setMedicalExamPerformed] = useState<boolean>(true);
  const [defenseInterviewPrivate, setDefenseInterviewPrivate] = useState<boolean>(true);
  const [selectedDecision, setSelectedDecision] = useState<'relaxamento' | 'preventiva' | 'liberdade'>('preventiva');
  const [chosenMeasures, setChosenMeasures] = useState<string[]>([
    'Comparecimento periódico bimestral em juízo (Art. 319, I)',
    'Recolhimento noturno e nos dias de folga (Art. 319, V)'
  ]);

  const isOver24Hours = hoursSinceArrest > 24;

  const toggleMeasure = (m: string) => {
    setChosenMeasures(prev => 
      prev.includes(m) ? prev.filter(item => item !== m) : [...prev, m]
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Gavel className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 font-serif-legal">
              Roteiro de Audiência de Custódia (Art. 310 do CPP & Res. CNJ nº 213/2015)
            </h2>
            <p className="text-xs text-slate-400">
              Controle judicial da legalidade da prisão em flagrante, integridade física do custodiado e decisão cautelar.
            </p>
          </div>
        </div>
      </div>

      {/* Step 1: Prazos e Garantias Fundamentais da Audiência */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Prazo de 24 horas */}
        <div className={`p-4 rounded-xl border shadow transition ${
          isOver24Hours ? 'bg-rose-950/30 border-rose-800/60' : 'bg-slate-900/80 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" /> Prazo Máximo (Art. 310)
            </span>
            <span className={`text-xs font-mono px-2 py-0.5 rounded font-bold ${
              isOver24Hours ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
            }`}>
              {hoursSinceArrest} horas transcorridas
            </span>
          </div>

          <p className="text-xs text-slate-300 mb-3">
            O autuado deve ser apresentado em juízo no prazo estrito de <strong>24 horas</strong> após o auto de prisão.
          </p>

          <input
            type="range"
            min="1"
            max="72"
            value={hoursSinceArrest}
            onChange={(e) => setHoursSinceArrest(parseInt(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />

          {isOver24Hours && (
            <div className="mt-2.5 p-2 rounded bg-rose-900/30 border border-rose-800 text-[11px] text-rose-300">
              <strong>Atenção:</strong> Decurso de 24h sem apresentação ou motivação idônea enseja a ilegalidade da custódia e pedido de relaxamento imediato da prisão.
            </div>
          )}
        </div>

        {/* Súmula Vinculante 11 (Algemas) */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-amber-400" /> Súmula Vinculante 11 (STF)
            </span>
            <span className="text-[10px] font-mono bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded">
              Regra: Sem Algemas
            </span>
          </div>
          <p className="text-xs text-slate-300 mb-2">
            O custodiado deve permanecer sem algemas na sala de audiência, salvo perigo concreto justificado em ata.
          </p>
          <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={handcuffsJustified}
              onChange={(e) => setHandcuffsJustified(e.target.checked)}
              className="accent-amber-500 rounded"
            />
            <span>Justificativa escrita em ata para uso de algemas</span>
          </label>
          {handcuffsJustified && (
            <input
              type="text"
              value={handcuffsReason}
              onChange={(e) => setHandcuffsReason(e.target.value)}
              className="w-full mt-2 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-200"
            />
          )}
        </div>

        {/* Garantias de Defesa e Integridade Física */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Protocolo Anti-Tortura
          </span>
          <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={medicalExamPerformed}
              onChange={(e) => setMedicalExamPerformed(e.target.checked)}
              className="accent-emerald-500 rounded"
            />
            <span>Laudo de Exame de Corpo de Delito IML juntado</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={defenseInterviewPrivate}
              onChange={(e) => setDefenseInterviewPrivate(e.target.checked)}
              className="accent-emerald-500 rounded"
            />
            <span>Entrevista prévia e reservada com a Defesa garantida</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-rose-300 cursor-pointer">
            <input
              type="checkbox"
              checked={hasSignsOfTorture}
              onChange={(e) => setHasSignsOfTorture(e.target.checked)}
              className="accent-rose-500 rounded"
            />
            <span>Alegação/Sinais de violência ou tortura policial</span>
          </label>
          {hasSignsOfTorture && (
            <div className="p-1.5 rounded bg-rose-950/40 border border-rose-800 text-[10px] text-rose-200">
              Obrigatório: instauração de procedimento no MP, encaminhamento à Corregedoria e novo exame pericial.
            </div>
          )}
        </div>

      </div>

      {/* Step 2: As 3 Decisões Possíveis do Magistrado (Art. 310, I, II, III) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
            Decisão Judicial ao Final da Audiência de Custódia
          </span>
          <h3 className="text-base font-bold text-slate-100 font-serif-legal mt-0.5">
            Tríplice Opção Decisória do Juiz (Art. 310 do CPP)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Opção 1: Relaxar a Prisão Ilegal */}
          <div 
            onClick={() => setSelectedDecision('relaxamento')}
            className={`p-4 rounded-xl border cursor-pointer transition ${
              selectedDecision === 'relaxamento'
                ? 'bg-rose-950/40 border-rose-500 shadow-md shadow-rose-900/20'
                : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-rose-400">INCISO I</span>
              <ShieldX className="w-5 h-5 text-rose-400" />
            </div>
            <h4 className="font-bold text-sm text-slate-100 font-serif-legal">
              Relaxar a Prisão Ilegal
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Quando houver vício formal ou material no flagrante (invasão de domicílio sem mandado/fundadas razões, ausência de nota de culpa, tortura ou excesso temporal).
            </p>
            <div className="mt-3 text-[11px] text-rose-300 font-medium">
              Efeito: Expedição incontinenti de Alvará de Soltura sem condições.
            </div>
          </div>

          {/* Opção 2: Converter em Preventiva */}
          <div 
            onClick={() => setSelectedDecision('preventiva')}
            className={`p-4 rounded-xl border cursor-pointer transition ${
              selectedDecision === 'preventiva'
                ? 'bg-amber-950/40 border-amber-500 shadow-md shadow-amber-900/20'
                : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-amber-400">INCISO II</span>
              <Lock className="w-5 h-5 text-amber-400" />
            </div>
            <h4 className="font-bold text-sm text-slate-100 font-serif-legal">
              Converter em Prisão Preventiva
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Se presentes os requisitos dos arts. 312 e 313, <strong>mediante prévia provocação do MP</strong>, e se revelarem inadequadas ou insuficientes as medidas cautelares diversas.
            </p>
            <div className="mt-3 text-[11px] text-amber-300 font-medium">
              Efeito: Expedição de Mandado de Prisão Preventiva com início do prazo de 90 dias (Art. 316).
            </div>
          </div>

          {/* Opção 3: Liberdade Provisória com ou sem Cautelares */}
          <div 
            onClick={() => setSelectedDecision('liberdade')}
            className={`p-4 rounded-xl border cursor-pointer transition ${
              selectedDecision === 'liberdade'
                ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-900/20'
                : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-emerald-400">INCISO III</span>
              <Unlock className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="font-bold text-sm text-slate-100 font-serif-legal">
              Conceder Liberdade Provisória
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Ausentes os requisitos da prisão preventiva, com ou sem imposição de fiança e/ou aplicação cumulada de medidas cautelares diversas do Art. 319.
            </p>
            <div className="mt-3 text-[11px] text-emerald-300 font-medium">
              Efeito: Alvará de Soltura com termo de compromisso e condições fixadas.
            </div>
          </div>

        </div>

        {/* Sub-panel for Liberdade Provisória Cautelares */}
        {selectedDecision === 'liberdade' && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              Medidas Cautelares a Impor no Termo de Liberdade Provisória (Art. 319 do CPP):
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {[
                'Comparecimento periódico bimestral em juízo (Art. 319, I)',
                'Proibição de acesso/frequência a determinados locais (Art. 319, II)',
                'Proibição de manter contato com a vítima ou testemunhas (Art. 319, III)',
                'Proibição de ausentar-se da comarca sem autorização (Art. 319, IV)',
                'Recolhimento domiciliar no período noturno e dias de folga (Art. 319, V)',
                'Arbitramento de fiança (Art. 319, VIII)',
                'Monitoração eletrônica / Tornozeleira (Art. 319, IX)'
              ].map((m) => (
                <label 
                  key={m} 
                  className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition ${
                    chosenMeasures.includes(m)
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={chosenMeasures.includes(m)}
                    onChange={() => toggleMeasure(m)}
                    className="accent-emerald-500 rounded"
                  />
                  <span>{m}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Live Termo Preview snippet */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
            <span>TERMO DE AUDIÊNCIA DE CUSTÓDIA - MINUTA SINTÉTICA</span>
            <span>Autos: {currentCase.processNumber}</span>
          </div>
          <p className="leading-relaxed">
            <strong>CUSTODIADO:</strong> {currentCase.defendantName} | <strong>DELITO:</strong> {currentCase.crimeDescription}<br />
            <strong>DELIBERAÇÃO JUDICIAL:</strong>{' '}
            {selectedDecision === 'relaxamento' && 'RELAXAMENTO DA PRISÃO EM FLAGRANTE por ilegalidade detectada, com expedição imediata de alvará de soltura sem cautelares.'}
            {selectedDecision === 'preventiva' && 'CONVERSÃO DA PRISÃO EM FLAGRANTE EM PREVENTIVA, presentes os pressupostos dos arts. 311, 312 e 313 do CPP, com observância do prazo de 90 dias do art. 316.'}
            {selectedDecision === 'liberdade' && `CONCESSÃO DE LIBERDADE PROVISÓRIA mediante compromisso de cumprimento das cautelares do Art. 319 do CPP: ${chosenMeasures.join('; ')}.`}
          </p>
        </div>

      </div>

    </div>
  );
};
