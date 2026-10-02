export interface CaseEvaluation {
  processNumber: string;
  defendantName: string;
  crimeDescription: string;
  maxPenaltyYears: number; // pena máxima em abstrato
  isIntentionalCrime: boolean; // crime doloso
  isCulposo: boolean; // crime culposo (vedada)
  isRecidivist: boolean; // reincidente em crime doloso com trânsito em julgado
  isDomesticViolence: boolean; // violência doméstica/familiar (mulher, criança, idoso, etc.)
  hasCivilIdentityDoubt: boolean; // dúvida sobre a identidade civil
  
  // Legitimidade (Art. 311)
  hasMpRequest: boolean; // requerimento MP/Querelante/Assistente
  hasPoliceRepresentation: boolean; // representação da autoridade policial
  isExOfficio: boolean; // juiz pretendia decretar de ofício (vedado!)
  phase: 'investigacao' | 'processo'; // fase do inquérito ou ação penal

  // Pressupostos - Fumus Comissi Delicti (Art. 312, caput, in fine)
  crimeExistenceProven: boolean; // prova da existência do crime (materialidade)
  sufficientAuthorshipIndicia: boolean; // indício suficiente de autoria

  // Fundamentos - Periculum Libertatis (Art. 312, caput e § 1º)
  publicOrderGuarantee: boolean; // garantia da ordem pública
  publicOrderReason: string;
  economicOrderGuarantee: boolean; // garantia da ordem econômica
  criminalInstructionConvenience: boolean; // conveniência da instrução criminal (coação de testemunha etc.)
  instructionReason: string;
  penalLawApplication: boolean; // assegurar aplicação da lei penal (risco de fuga)
  flightRiskReason: string;
  breachOfPreviousMeasures: boolean; // descumprimento de medidas cautelares anteriores (art. 282, § 4º)
  dangerFromLiberty: boolean; // perigo gerado pelo estado de liberdade (art. 312, § 1º)

  // Contemporaneidade (Art. 312, § 2º e Art. 315)
  isContemporary: boolean; // fatos contemporâneos aos riscos alegados
  concreteFactsDescription: string; // fundamentação fática concreta (vedação a abstrações)

  // Inadequação de Cautelares Alternativas (Art. 282, § 6º e Art. 319)
  alternativeMeasuresInsufficient: boolean; // cautelares do 319 insuficientes
  alternativeMeasuresExplanation: string;

  // Domiciliary Arrest conditions (Art. 318 / 318-A)
  isOver80: boolean;
  isExtremelyDebilitatedByIllness: boolean;
  isIndispensableForChildUnder6OrDisabled: boolean;
  isPregnantWoman: boolean;
  isMotherOfChildUpTo12: boolean;
  committedCrimeWithViolenceAgainstDependent: boolean; // impede 318-A
}

export interface StatutoryCheckResult {
  isLegal: boolean;
  blockers: string[];
  warnings: string[];
  admissibilityReasons: string[];
  periculumReasons: string[];
  fumusReasons: string[];
  summaryConclusion: string;
  legalBasisArticles: string[];
}

export interface CautelarMeasure {
  id: number;
  inciso: string;
  title: string;
  description: string;
  practicalApplicability: string;
  fiscalization: string;
  riskMitigated: string;
}

export interface JurisprudenceItem {
  id: string;
  court: 'STF' | 'STJ' | 'CNJ';
  reference: string;
  theme: string;
  thesis: string;
  summary: string;
  relevance: 'alta' | 'vinculante' | 'jurisprudência pacífica';
  tags: string[];
}
