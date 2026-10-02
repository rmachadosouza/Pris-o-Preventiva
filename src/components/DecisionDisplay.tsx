import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Download, Copy, CheckCircle2 } from 'lucide-react';

interface DecisionDisplayProps {
  decision: string;
}

export function DecisionDisplay({ decision }: DecisionDisplayProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(decision);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([decision], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "decisao_judicial.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!decision) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-serif text-lg font-medium text-slate-800">Decisão Gerada</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1 text-sm"
            title="Copiar para área de transferência"
          >
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado' : 'Copiar'}
          </button>
          <button
            onClick={handleDownload}
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1 text-sm"
            title="Baixar arquivo de texto"
          >
            <Download className="w-4 h-4" />
            Baixar
          </button>
        </div>
      </div>
      
      <div className="p-8 max-h-[800px] overflow-y-auto bg-white">
        <article className="prose prose-slate max-w-none font-serif prose-headings:font-sans prose-headings:font-semibold prose-p:text-justify prose-p:leading-relaxed">
          <ReactMarkdown>{decision}</ReactMarkdown>
        </article>
      </div>
      
      <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-xs text-slate-500 text-center">
        Documento gerado por IA (Magistrado Digital). Necessária revisão humana antes da publicação.
      </div>
    </div>
  );
}
