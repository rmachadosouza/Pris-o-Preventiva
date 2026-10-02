/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CaseForm } from './components/CaseForm';
import { DecisionDisplay } from './components/DecisionDisplay';
import { CaseData } from './types';
import { generateAnalysis, PartialDecisionError } from './services/ai';
import { Scale, Info } from 'lucide-react';

export default function App() {
  const [decision, setDecision] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CaseData) => {
    setIsLoading(true);
    setError(null);
    setDecision('');

    try {
      const result = await generateAnalysis(data, setDecision);
      setDecision(result);
    } catch (err: any) {
      if (err instanceof PartialDecisionError) {
        setDecision(err.partialText);
      }
      setError(err?.message || 'Ocorreu um erro ao gerar a análise. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Magistrado Digital</h1>
              <p className="text-xs text-slate-500 font-medium">Análise Preventiva • Lei 15.272/2025</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
            <Info className="w-4 h-4" />
            <span>Ambiente Seguro • Ultima Ratio</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-indigo-900">
              <p className="font-semibold mb-1">Instruções:</p>
              <p>Faça o upload do PDF contendo os autos do processo (flagrante, representação, etc.). A IA lerá o documento, extrairá os dados relevantes e gerará a decisão judicial fundamentada.</p>
            </div>
            
            <CaseForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          {/* Output Section */}
          <div className="lg:col-span-7 xl:col-span-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                <Info className="w-5 h-5" />
                {error}
              </div>
            )}
            
            {decision ? (
              <DecisionDisplay decision={decision} />
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 p-8 text-center">
                <Scale className="w-16 h-16 mb-4 opacity-20" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">Aguardando Análise</h3>
                <p className="max-w-md mx-auto">
                  Preencha o formulário ao lado e clique em "Gerar Decisão Judicial" para visualizar a minuta da decisão.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
