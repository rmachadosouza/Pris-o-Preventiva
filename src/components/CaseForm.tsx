import React, { useState, useRef } from 'react';
import { CaseData } from '../types';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';

interface CaseFormProps {
  onSubmit: (data: CaseData) => void;
  isLoading: boolean;
}

export function CaseForm({ onSubmit, isLoading }: CaseFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    validateAndSetFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files?.[0];
    validateAndSetFile(droppedFile);
  };

  const validateAndSetFile = (selectedFile: File | undefined) => {
    setError(null);
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      setError('Por favor, envie apenas arquivos PDF.');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
      setError('O arquivo deve ter no máximo 10MB.');
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      onSubmit({
        fileData: base64String,
        mimeType: file.type,
        fileName: file.name,
        additionalInfo
      });
    };
    reader.onerror = () => {
      setError('Erro ao ler o arquivo. Tente novamente.');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <div className="border-b border-slate-100 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <Upload className="w-5 h-5 text-indigo-600" />
          Upload dos Autos
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Anexe o arquivo PDF contendo a íntegra do flagrante ou representação.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!file ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-slate-300 rounded-xl p-10 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="application/pdf"
              className="hidden"
            />
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-slate-700 mb-1">
              Clique para selecionar ou arraste o arquivo
            </h3>
            <p className="text-sm text-slate-500">
              Suporta apenas arquivos PDF (Máx. 10MB)
            </p>
          </div>
        ) : (
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg border border-indigo-100">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium text-indigo-900 truncate max-w-[200px] sm:max-w-xs">
                  {file.name}
                </p>
                <p className="text-xs text-indigo-600">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="p-2 hover:bg-indigo-100 rounded-full text-indigo-400 hover:text-indigo-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
            <FileText className="w-4 h-4 text-slate-400" />
            Informações Adicionais (Opcional)
          </label>
          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            rows={4}
            placeholder="Insira aqui qualquer detalhe extra, observação ou contexto que ajude a IA na análise do caso..."
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={!file || isLoading}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all w-full sm:w-auto justify-center
              ${!file || isLoading
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30 active:scale-95'}
            `}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processando Arquivo...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                Analisar Autos e Gerar Decisão
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
