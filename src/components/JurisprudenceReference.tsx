import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  ExternalLink, 
  Scale, 
  Check, 
  Copy, 
  Tag, 
  Bookmark 
} from 'lucide-react';
import { JURISPRUDENCE_DATA } from '../data/jurisprudence';
import { JurisprudenceItem } from '../types';

export const JurisprudenceReference: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourt, setSelectedCourt] = useState<'todos' | 'STF' | 'STJ' | 'CNJ'>('todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems = JURISPRUDENCE_DATA.filter(item => {
    const matchesCourt = selectedCourt === 'todos' || item.court === selectedCourt;
    const matchesSearch = 
      item.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.thesis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCourt && matchesSearch;
  });

  const copyItemText = (item: JurisprudenceItem) => {
    const text = `${item.reference} - ${item.theme}\nTESE: ${item.thesis}\nRESUMO: ${item.summary}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 font-serif-legal">
              Jurisprudência Selecionada dos Tribunais Superiores (STF & STJ)
            </h2>
            <p className="text-xs text-slate-400">
              Súmulas Vinculantes, Recursos Repetitivos e Acórdãos Paradigma sobre Prisão Preventiva e Cautelares.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por tese, súmula, artigo ou palavra-chave..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['todos', 'STF', 'STJ', 'CNJ'] as const).map((court) => (
            <button
              key={court}
              onClick={() => setSelectedCourt(court)}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold transition cursor-pointer ${
                selectedCourt === court
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {court.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* List of Precedents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  item.court === 'STF'
                    ? 'bg-blue-950/60 border-blue-500/40 text-blue-300'
                    : item.court === 'STJ'
                    ? 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                    : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                }`}>
                  {item.court} • {item.relevance.toUpperCase()}
                </span>

                <button
                  onClick={() => copyItemText(item)}
                  className="text-slate-400 hover:text-amber-300 text-xs flex items-center gap-1 cursor-pointer transition"
                  title="Copiar citação para memoriais ou decisão"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[10px] text-emerald-300">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Copiar</span>
                    </>
                  )}
                </button>
              </div>

              <h3 className="font-bold text-sm text-slate-100 font-serif-legal mb-1">
                {item.theme}
              </h3>
              <div className="text-xs font-mono text-amber-400/90 mb-3">
                {item.reference}
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 leading-relaxed italic mb-3">
                "{item.thesis}"
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800/80"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
