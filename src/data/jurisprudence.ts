import { JurisprudenceItem } from '../types';

export const JURISPRUDENCE_DATA: JurisprudenceItem[] = [
  {
    id: 'stf-oficio-pacote-anticrime',
    court: 'STF',
    reference: 'STF - HC 188.888/MG & RHC 212.876',
    theme: 'Vedação Absoluta à Decretação de Ofício',
    thesis: 'Com o advento da Lei 13.964/2019 (Pacote Anticrime), é absolutamente vedado ao magistrado decretar a prisão preventiva de ofício, seja no curso da investigação preliminar, seja no processo penal ou na audiência de custódia (Art. 311 do CPP).',
    summary: 'A estrutura acusatória do processo penal brasileiro (Art. 3º-A do CPP) impede que o juiz atue como órgão acusador ou decrete medidas cautelares invasivas sem prévia e expressa provocação do Ministério Público ou representação policial.',
    relevance: 'jurisprudência pacífica',
    tags: ['Art. 311 CPP', 'Juiz de Ofício', 'Pacote Anticrime', 'Sistema Acusatório']
  },
  {
    id: 'stf-adi-6581-revisao-90-dias',
    court: 'STF',
    reference: 'STF - ADI 6581 e ADI 6582 (Plenário)',
    theme: 'Revisão Nonagesimal da Prisão Preventiva (Art. 316, p. único)',
    thesis: 'O decurso do prazo de 90 dias previsto no parágrafo único do art. 316 do CPP não acarreta a soltura automática e imediata do preso preventivo, devendo o juiz ser instado a reavaliar a legalidade e a necessidade da segregação.',
    summary: 'O transcurso do prazo sem reavaliação constitui constrangimento ilegal a ser sanado mediante determinação para que o magistrado competente decida fundamentadamente, mas sem revogação automática sem análise prévia dos riscos.',
    relevance: 'vinculante',
    tags: ['Art. 316 CPP', 'Prazo de 90 Dias', 'Excesso de Prazo', 'Revisão Periódica']
  },
  {
    id: 'stf-hc-143641-gestantes-maes',
    court: 'STF',
    reference: 'STF - HC Coletivo 143.641/SP & Art. 318-A CPP',
    theme: 'Substituição por Prisão Domiciliar (Mães e Gestantes)',
    thesis: 'Substituição da prisão preventiva por domiciliar de mulheres presas gestantes, puérperas ou mães de crianças de até 12 anos ou de pessoas com deficiência, salvo em casos excepcionais (crimes com violência/grave ameaça ou contra os próprios descendentes).',
    summary: 'Prioridade absoluta dos direitos da criança (Art. 227 da CF). A segregação cautelar da genitora deve ser excepcionalíssima, prestigiando a proteção integral da primeira infância.',
    relevance: 'vinculante',
    tags: ['Art. 318 CPP', 'Art. 318-A CPP', 'Prisão Domiciliar', 'Mulher e Maternidade']
  },
  {
    id: 'stj-hc-contemporaneidade',
    court: 'STJ',
    reference: 'STJ - RHC 145.225/SP & HC 598.051/SP',
    theme: 'Contemporaneidade e Concretude Fática',
    thesis: 'A prisão preventiva exige contemporaneidade dos motivos e perigo atual (Art. 312, § 2º do CPP). É ilegal a prisão preventiva decretada com base em fatos pretéritos sem demonstração de risco presente e concreto à ordem pública ou à instrução.',
    summary: 'O transcurso de lapso temporal expressivo entre a data dos fatos delituosos e a decretação da cautelar, sem qualquer ato novo desabonador, esvazia o periculum libertatis contemporâneo.',
    relevance: 'jurisprudência pacífica',
    tags: ['Art. 312 § 2º CPP', 'Contemporaneidade', 'Fatos Pretéritos', 'Periculum Libertatis']
  },
  {
    id: 'stf-art-315-fundamentacao-concreta',
    court: 'STF',
    reference: 'STF - HC 173.368/RJ & STJ - HC 628.718/SP',
    theme: 'Vedação à Mera Gravidade Abstrata do Delito',
    thesis: 'A gravidade abstrata do delito ou a mera capitulação legal não justificam, de per si, a imposição da prisão cautelar. É imprescindível fundamentação concreta (Art. 315, § 2º do CPP).',
    summary: 'Expressões vagas como "clamor público", "repercussão social", "garantia da credibilidade da justiça" ou repetição estéril dos termos da lei tornam a decisão nula por ausência de fundamentação válida.',
    relevance: 'alta',
    tags: ['Art. 315 CPP', 'Nulidade da Decisão', 'Gravidade Abstrata', 'Motivação Idônea']
  },
  {
    id: 'stf-sumula-vinculante-11',
    court: 'STF',
    reference: 'STF - Súmula Vinculante 11',
    theme: 'Uso Excepcional de Algemas',
    thesis: 'Só é lícito o uso de algemas em casos de resistência e de fundado receio de fuga ou de perigo à integridade física própria ou alheia, por parte do preso ou de terceiros, justificada a excepcionalidade por escrito.',
    summary: 'Na audiência de custódia e em qualquer ato de contenção, o uso injustificado acarreta responsabilidade disciplinar, civil e penal, além da nulidade do ato processual.',
    relevance: 'vinculante',
    tags: ['Súmula Vinculante', 'Algemas', 'Audiência de Custódia', 'Dignidade da Pessoa']
  },
  {
    id: 'cnj-resolucao-213',
    court: 'CNJ',
    reference: 'CNJ - Resolução nº 213/2015 & Art. 310 CPP',
    theme: 'Audiência de Custódia no Prazo de 24 Horas',
    thesis: 'Toda pessoa presa em flagrante ou por mandado deve ser apresentada à autoridade judicial competente no prazo improrrogável de 24 horas para realização da audiência de custódia.',
    summary: 'O ato destina-se a verificar a legalidade da prisão, a ocorrência de maus-tratos ou tortura, e a necessidade de manutenção da prisão ou imposição de medidas alternativas.',
    relevance: 'vinculante',
    tags: ['Art. 310 CPP', 'Audiência de Custódia', 'Prevenção à Tortura', 'CNJ']
  },
  {
    id: 'stj-subsidiariedade-319',
    court: 'STJ',
    reference: 'STJ - HC 688.192/RS & RHC 139.112/MG',
    theme: 'Subsidiariedade da Prisão e Obrigatoriedade do Art. 319',
    thesis: 'A prisão preventiva é a ultima ratio do sistema cautelar penal. O juiz tem o dever de demonstrar por que as medidas cautelares alternativas do art. 319 são insuficientes antes de impor o encarceramento (Art. 282, § 6º).',
    summary: 'A omissão quanto à análise e descarte fundamentado das cautelares diversas da prisão enseja a concessão de ordem de Habeas Corpus para substituição.',
    relevance: 'jurisprudência pacífica',
    tags: ['Art. 282 § 6º CPP', 'Art. 319 CPP', 'Medidas Cautelares', 'Ultima Ratio']
  }
];
