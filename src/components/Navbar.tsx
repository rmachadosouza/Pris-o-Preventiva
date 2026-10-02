import React from 'react';
import { 
  Scale, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Home, 
  FileText, 
  BookOpen, 
  Gavel
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLegal: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, isLegal }) => {
  const tabs = [
    { id: 'checklist', label: 'Analisador & Requisitos', icon: CheckCircle2, badge: 'Arts. 311-315' },
    { id: 'custody', label: 'Audiência de Custódia', icon: Gavel, badge: 'Art. 310' },
    { id: 'deadlines', label: 'Prazos & Revisão 90 Dias', icon: Clock, badge: 'Art. 316' },
    { id: 'cautelares', label: 'Cautelares Alternativas', icon: ShieldAlert, badge: 'Art. 319' },
    { id: 'domiciliary', label: 'Prisão Domiciliar', icon: Home, badge: 'Art. 318 / 318-A' },
    { id: 'documents', label: 'Minutas & Peças', icon: FileText, badge: 'Gerador' },
    { id: 'jurisprudence', label: 'Jurisprudência STF/STJ', icon: BookOpen, badge: 'Súmulas' },
  ];

  return (
    <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50 shadow-xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Legal Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-bold border border-amber-300/30">
              <Scale className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-legal font-bold text-lg md:text-xl text-amber-100 tracking-wide">
                  PRISÃO PREVENTIVA
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold tracking-wider">
                  CPP & STF/STJ
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Sistema de Verificação de Legalidade, Audiência de Custódia & Decisões Cautelares
              </p>
            </div>
          </div>

          {/* Quick Legal Status Indicator */}
          <div className="hidden lg:flex items-center gap-3">
            <div className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-2 ${
              isLegal 
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${isLegal ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
              <span>Status do Caso Atual: <strong>{isLegal ? 'Requisitos Atendidos' : 'Óbices Detectados'}</strong></span>
            </div>
          </div>

        </div>

        {/* Tab Navigation Menu */}
        <nav className="flex space-x-1 overflow-x-auto pb-2 scrollbar-none border-t border-slate-800/80 pt-1 text-sm font-medium">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-200 border border-amber-500/40 shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isActive ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
