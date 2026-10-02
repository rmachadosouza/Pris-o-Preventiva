import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  Edit3, 
  RefreshCw, 
  Gavel, 
  ShieldCheck, 
  ShieldX, 
  Send
} from 'lucide-react';
import { CaseEvaluation, StatutoryCheckResult } from '../types';

interface DocumentGeneratorProps {
  currentCase: CaseEvaluation;
  result: StatutoryCheckResult;
}

export const DocumentGenerator: React.FC<DocumentGeneratorProps> = ({ currentCase, result }) => {
  const [docType, setDocType] = useState<
    'decisao_decretacao' | 'decisao_indeferimento' | 'defesa_revogacao' | 'mp_requerimento' | 'policia_representacao'
  >('decisao_decretacao');
  const [copied, setCopied] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>('');

  const todayStr = new Date().toLocaleDateString('pt-BR');

  const generateDefaultText = (type: typeof docType): string => {
    switch (type) {
      case 'decisao_decretacao':
        return `PODER JUDICIÁRIO DO ESTADO DE ...
COMARCA DE ... - VARA CRIMINAL

Autos do Processo Crime nº: ${currentCase.processNumber}
Autor: MINISTÉRIO PÚBLICO DO ESTADO
Indiciado / Réu: ${currentCase.defendantName}
Infração Penal: ${currentCase.crimeDescription}

DECISÃO INTERLOCUTÓRIA MOTIVADA
(Decretação de Prisão Preventiva - Arts. 311, 312, 313 e 315 do CPP)

Vistos etc.

Trata-se de ${currentCase.hasMpRequest ? 'requerimento formal formulado pelo Ministério Público' : 'representação da autoridade policial'}, pugnando pela decretação da PRISÃO PREVENTIVA em desfavor de ${currentCase.defendantName}, devidamente qualificado nos autos, pela suposta prática do delito tipificado como ${currentCase.crimeDescription}.

I - DO RELATÓRIO
Consta do caderno investigatório que o imputado teria perpetrado a conduta delituosa narrada, havendo manifestação ministerial pela imprescindibilidade da segregação antecipada para a garantia da ordem pública e regular tramitação da persecução penal.
É o relatório do necessário. Passo a fundamentar e decidir de forma analítica, em estrito cumprimento ao Art. 93, IX da CF e Art. 315, §§ 1º e 2º do CPP.

II - DA LEGITIMIDADE E DO CABIMENTO (ARTS. 311 E 313 DO CPP)
Ab initio, verifica-se que o juízo foi devidamente provocado pelo órgão legitimado, inexistindo qualquer atuação de ofício, em estrita deferência ao princípio acusatório (Art. 3º-A e Art. 311 do CPP).
Outrossim, preenchida a condição de admissibilidade do Art. 313 do CPP, tratando-se de crime doloso com pena máxima cominada em abstrato ${currentCase.maxPenaltyYears > 4 ? `superior a 4 anos (${currentCase.maxPenaltyYears} anos)` : 'ou com reincidência dolosa comprovada'}.

III - DOS PRESSUPOSTOS: FUMUS COMISSI DELICTI (ART. 312, IN FINE)
A materialidade delitiva (prova da existência do crime) está sobejamente demonstrada pelos elementos coligidos aos autos, notadamente ${currentCase.concreteFactsDescription || 'pelo auto de exibição e apreensão, laudos periciais e depoimentos das testemunhas'}.
Os indícios suficientes de autoria convergem de forma individualizada contra o indigitado, respaldados pelas investigações e reconhecimentos procedidos.

IV - DOS FUNDAMENTOS: PERICULUM LIBERTATIS E CONTEMPORANEIDADE (ART. 312 DO CPP)
O perigo gerado pelo estado de liberdade do imputado revela-se patente e contemporâneo aos fatos.
A custódia cautelar impõe-se para a GARANTIA DA ORDEM PÚBLICA, tendo em vista a extrema gravidade concreta do fato delituoso e o modus operandi empregado (${currentCase.publicOrderReason || 'demonstrativo de periculosidade acentuada'}).
${currentCase.penalLawApplication ? `Ademais, resta justificada a medida para ASSEGURAR A APLICAÇÃO DA LEI PENAL, ante o risco concreto de evasão (${currentCase.flightRiskReason || 'ausência de vínculo com a comarca'}).` : ''}

V - DA INSUFICIÊNCIA DAS MEDIDAS CAUTELARES DIVERSAS (ART. 282, § 6º E ART. 319)
Em observância ao princípio da subsidiariedade e da proporcionalidade, constata-se que nenhuma das medidas cautelares alternativas do Art. 319 do CPP se mostra adequada e suficiente para estancar o risco concreto verificado, sendo a prisão preventiva a única medida idônea no presente momento.

DISPOSITIVO:
Ante todo o exposto, com fundamento nos Arts. 311, 312, 313 e 315 do Código de Processo Penal, DECRETO A PRISÃO PREVENTIVA de ${currentCase.defendantName}.

Expeça-se com urgência o competente MANDADO DE PRISÃO PREVENTIVA no Banco Nacional de Medidas Cautelares (BNMP).
Observe-se o prazo legal nonagesimal previsto no Art. 316, parágrafo único do CPP para a periódica revisão da necessidade da medida.
Ciência ao Ministério Público e à Defesa.

Comarca, ${todayStr}.
Juiz(a) de Direito`;

      case 'decisao_indeferimento':
        return `PODER JUDICIÁRIO DO ESTADO DE ...
COMARCA DE ... - VARA CRIMINAL

Autos nº: ${currentCase.processNumber}
Acusado(a): ${currentCase.defendantName}
Imputação: ${currentCase.crimeDescription}

DECISÃO INTERLOCUTÓRIA
(Indeferimento de Prisão Preventiva / Concessão de Liberdade Provisória com Cautelares)

Vistos etc.

Cuida-se de pedido de decretação de prisão preventiva formulado em face de ${currentCase.defendantName}.
Instada a se manifestar, a Defesa pugnou pela concessão de liberdade provisória ou aplicação de medidas cautelares diversas da prisão.

DECIDO.
A prisão cautelar representa medida excepcionalíssima no ordenamento constitucional brasileiro, orientada pelo princípio do estado de inocência (Art. 5º, LVII da CF/88) e pela subsidiariedade (Art. 282, § 6º do CPP).

No caso em apreço, ${result.blockers.length > 0 ? result.blockers.join(' ') : 'não se vislumbra a presença cumulativa dos requisitos autorizadores da segregação máxima'}.
Ademais, verifica-se que o investigado possui ocupação lícita e residência fixa, inexistindo demonstração concreta e atual de perigo à instrução criminal ou risco de fuga iminente.

Assim, a submissão do agente a medidas cautelares diversas da prisão revela-se medida perfeitamente idônea, proporcional e suficiente para resguardar a ordem pública e o deslinde processual.

DISPOSITIVO:
Ante o exposto, INDEFIRO O PEDIDO DE PRISÃO PREVENTIVA e CONCEDO A LIBERDADE PROVISÓRIA ao acusado ${currentCase.defendantName}, mediante a imposição das seguintes MEDIDAS CAUTELARES DO ART. 319 DO CPP:
1. Comparecimento periódico em juízo para justificar atividades (Art. 319, I);
2. Proibição de ausentar-se da Comarca sem autorização judicial (Art. 319, IV);
3. Recolhimento domiciliar noturno entre 20h e 6h e nos dias de folga (Art. 319, V).

ADVERTÊNCIA: Fica o beneficiado advertido de que o descumprimento injustificado de quaisquer das condições ensejará a imediata decretação de sua prisão (Art. 282, § 4º do CPP).
Expeça-se Alvará de Soltura e Termo de Compromisso.

Comarca, ${todayStr}.
Juiz(a) de Direito`;

      case 'defesa_revogacao':
        return `EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA VARA CRIMINAL DA COMARCA DE ...

Autos nº: ${currentCase.processNumber}
Requerente: ${currentCase.defendantName}

PEDIDO DE REVOGAÇÃO DE PRISÃO PREVENTIVA / LIBERDADE PROVISÓRIA
(Com fulcro no Art. 316 do Código de Processo Penal e Art. 5º, LXVI da CF/88)

A DEFESA do requerente ${currentCase.defendantName}, já qualificado nos autos em epígrafe, vem respeitosamente à presença de Vossa Excelência requerer a REVOGAÇÃO DA PRISÃO PREVENTIVA, pelas razões fáticas e jurídicas a seguir aduzidas:

1. DA AUSÊNCIA DE CONTEMPORANEIDADE E DO PERICULUM LIBERTATIS:
A decisão segregatória que determinou a custódia cautelar amparou-se em presunções abstratas, em manifesta desatenção às diretrizes do Art. 315, § 2º do CPP.
Não há qualquer elemento factual contemporâneo que indique que o requerente em liberdade colocará em perigo a ordem pública ou a instrução criminal.

2. DAS CONDIÇÕES PESSOAIS FAVORÁVEIS E DA SUBSIDIARIEDADE:
O requerente é primário, possui residência fixa no distrito da culpa, ocupação lícita demonstrada e vínculos familiares consolidados.
Nesse compasso, a teor do Art. 282, § 6º do CPP, a segregação corporal constitui a *ultima ratio*, sendo cogente a preferência pelas medidas cautelares alternativas do Art. 319 do CPP.

3. DOS PEDIDOS:
Diante do exposto, requer a Vossa Excelência:
a) A oitiva prévia do Ministério Público;
b) A REVOGAÇÃO DA PRISÃO PREVENTIVA, ex vi do Art. 316 do CPP, ou subsidiariamente a sua substituição pelas cautelares do Art. 319;
c) A incontinenti expedição do competente ALVARÁ DE SOLTURA.

Nestes termos,
Pede deferimento.
Comarca, ${todayStr}.
Advogado / Defensoria Pública
OAB/...`;

      case 'mp_requerimento':
        return `EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA VARA CRIMINAL DA COMARCA DE ...

Autos nº: ${currentCase.processNumber}
Investigado / Réu: ${currentCase.defendantName}
Capitulação: ${currentCase.crimeDescription}

REQUERIMENTO DE DECRETAÇÃO DE PRISÃO PREVENTIVA
(Pelo Ministério Público do Estado - Art. 311 c/c Arts. 312 e 313 do CPP)

O MINISTÉRIO PÚBLICO DO ESTADO, por seu Promotor de Justiça infra-assinado, no uso de suas atribuições constitucionais e legais, vem, respeitosamente, REQUERER a DECRETAÇÃO DA PRISÃO PREVENTIVA de ${currentCase.defendantName}, pelos fundamentos seguintes:

1. DOS FATOS E DO FUMUS COMISSI DELICTI:
Apurou-se no caderno informativo que o investigado praticou os atos correspondentes ao crime de ${currentCase.crimeDescription}. A materialidade encontra-se atestada e há indícios robustos de autoria carreados aos autos.

2. DO PERICULUM LIBERTATIS E ADMISSIBILIDADE:
O delito é doloso e apenado com pena máxima superior a 4 anos (Art. 313, I do CPP).
A decretação é imperiosa para a GARANTIA DA ORDEM PÚBLICA e conveniência da instrução, ante ${currentCase.publicOrderReason || 'a gravidade em concreto do modus operandi e perigo social manifesto'}.
Nenhuma medida cautelar diversa do cárcere (Art. 319) reúne densidade coercitiva bastante para neutralizar a reiteração delitiva.

Requer-se o acolhimento do pedido com a expedição de mandado de prisão preventiva.

Comarca, ${todayStr}.
Promotor(a) de Justiça`;

      case 'policia_representacao':
        return `EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA VARA CRIMINAL DA COMARCA DE ...

Inquérito Policial nº: ${currentCase.processNumber}
Indiciado: ${currentCase.defendantName}
Crime Apurado: ${currentCase.crimeDescription}

REPRESENTAÇÃO POR PRISÃO PREVENTIVA
(Autoridade Policial - Art. 311 do Código de Processo Penal)

A AUTORIDADE POLICIAL que subscreve, no exercício das funções delegadas pelo Art. 144, § 4º da CF e Art. 311 do CPP, vem representar pela DECRETAÇÃO DA PRISÃO PREVENTIVA de ${currentCase.defendantName}.

1. HISTÓRICO DAS DILIGÊNCIAS INVESTIGATIVAS:
Em cumprimento às diligências preliminares, logrou-se apreender elementos materiais concludentes que descortinam a materialidade e autoria da conduta criminosa investigada.

2. DA NECESSIDADE DA CUSTÓDIA ANTECIPADA:
A prisão preventiva afigura-se imprescindível para obstar a fuga do indiciado e preservar as testemunhas que prestarão depoimento perante esta Autoridade e em juízo.

Ante o exposto, pugna pelo deferimento da representação, ouvido o Ministério Público, expedindo-se mandado prisional com registro no BNMP.

Comarca, ${todayStr}.
Delegado(a) de Polícia`;
    }
  };

  const currentDisplayContent = isEditing ? customText : generateDefaultText(docType);

  const handleSelectType = (type: typeof docType) => {
    setDocType(type);
    setIsEditing(false);
    setCustomText('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentDisplayContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTextFile = () => {
    const element = document.createElement('a');
    const file = new Blob([currentDisplayContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${docType}_${currentCase.defendantName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 font-serif-legal">
              Gerador de Peças Processuais e Minutas Decisórias
            </h2>
            <p className="text-xs text-slate-400">
              Minutas completas elaboradas em consonância com as exigências de fundamentação do Art. 315 do CPP e do STF/STJ.
            </p>
          </div>
        </div>
      </div>

      {/* Selector of Document Types */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {[
          { id: 'decisao_decretacao', label: 'Decisão de Decretação', icon: Gavel, badge: 'Juiz' },
          { id: 'decisao_indeferimento', label: 'Decisão de Liberdade (Art. 319)', icon: ShieldCheck, badge: 'Juiz' },
          { id: 'defesa_revogacao', label: 'Pedido de Revogação', icon: ShieldX, badge: 'Defesa' },
          { id: 'mp_requerimento', label: 'Requerimento de Prisão', icon: Send, badge: 'Ministério Público' },
          { id: 'policia_representacao', label: 'Representação Policial', icon: FileText, badge: 'Delegado de Polícia' }
        ].map((item) => {
          const Icon = item.icon;
          const isSelected = docType === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectType(item.id as typeof docType)}
              className={`p-3 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-500/50 shadow-md text-amber-200'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                  {item.badge}
                </span>
              </div>
              <span className="text-xs font-bold leading-tight line-clamp-2">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Editor & Viewer Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        
        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-amber-300">
              Minuta Jurídica em Visualização
            </span>
            <span className="text-xs text-slate-400">
              (Autos: {currentCase.processNumber} • Réu: {currentCase.defendantName})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (!isEditing) {
                  setCustomText(currentDisplayContent);
                }
                setIsEditing(!isEditing);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>{isEditing ? 'Bloquear Edição' : 'Editar Texto'}</span>
            </button>

            <button
              onClick={copyToClipboard}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>

            <button
              onClick={downloadTextFile}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-slate-700 shadow"
            >
              <Download className="w-3.5 h-3.5 text-slate-300" />
              <span>Baixar (.txt)</span>
            </button>
          </div>
        </div>

        {/* Text Area */}
        {isEditing ? (
          <textarea
            rows={18}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed"
          />
        ) : (
          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
            {currentDisplayContent}
          </pre>
        )}
      </div>

    </div>
  );
};
