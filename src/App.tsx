import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { StatutoryChecklist } from './components/StatutoryChecklist';
import { CustodyHearingFlow } from './components/CustodyHearingFlow';
import { DeadlineCalculator } from './components/DeadlineCalculator';
import { AlternativeMeasures } from './components/AlternativeMeasures';
import { DomiciliaryArrest } from './components/DomiciliaryArrest';
import { DocumentGenerator } from './components/DocumentGenerator';
import { JurisprudenceReference } from './components/JurisprudenceReference';
import { CaseEvaluation } from './types';
import { CASE_PRESETS } from './data/presets';
import { evaluateCase } from './utils/evaluator';
import { Scale, ExternalLink } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('checklist');
  const [currentCase, setCase] = useState<CaseEvaluation>(CASE_PRESETS[0].data);

  // Memoized evaluation
  const result = useMemo(() => evaluateCase(currentCase), [currentCase]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/25 selection:text-amber-200">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isLegal={result.isLegal} 
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'checklist' && (
          <StatutoryChecklist 
            currentCase={currentCase} 
            setCase={setCase} 
            result={result} 
          />
        )}

        {activeTab === 'custody' && (
          <CustodyHearingFlow 
            currentCase={currentCase} 
          />
        )}

        {activeTab === 'deadlines' && (
          <DeadlineCalculator 
            currentCase={currentCase} 
          />
        )}

        {activeTab === 'cautelares' && (
          <AlternativeMeasures 
            currentCase={currentCase} 
          />
        )}

        {activeTab === 'domiciliary' && (
          <DomiciliaryArrest 
            currentCase={currentCase} 
            setCase={setCase} 
          />
        )}

        {activeTab === 'documents' && (
          <DocumentGenerator 
            currentCase={currentCase} 
            result={result} 
          />
        )}

        {activeTab === 'jurisprudence' && (
          <JurisprudenceReference />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2 text-slate-400 font-serif-legal font-bold">
            <Scale className="w-4 h-4 text-amber-500" />
            <span>SISTEMA DE DECISÃO E ANÁLISE DE PRISÃO PREVENTIVA (CPP)</span>
          </div>
          <p>
            Em conformidade com a Lei nº 13.964/2019 (Pacote Anticrime), Lei nº 13.769/2018 (Prisão Domiciliar Materna), Resolução nº 213/2015 do CNJ e Jurisprudência do STF e STJ.
          </p>
          <p className="text-[11px] text-slate-600 font-mono">
            Código de Processo Penal Brasileiro • Arts. 282, 310, 311, 312, 313, 315, 316, 318, 318-A e 319
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;
