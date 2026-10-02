import { CaseEvaluation, StatutoryCheckResult } from '../types';

export function evaluateCase(c: CaseEvaluation): StatutoryCheckResult {
  const blockers: string[] = [];
  const warnings: string[] = [];
  const admissibilityReasons: string[] = [];
  const periculumReasons: string[] = [];
  const fumusReasons: string[] = [];
  const legalBasisArticles: string[] = [];

  // 1. ANÁLISE DE LEGITIMIDADE E SISTEMA ACUSATÓRIO (ART. 311 DO CPP)
  if (c.isExOfficio) {
    blockers.push('VEDAÇÃO ABSOLUTA À DECRETAÇÃO DE OFÍCIO: O magistrado não pode decretar prisão preventiva sem requerimento do Ministério Público ou representação da autoridade policial (Art. 311 do CPP c/c Lei 13.964/2019 e STF HC 188.888).');
  } else if (!c.hasMpRequest && !c.hasPoliceRepresentation) {
    blockers.push('FALTA DE LEGITIMIDADE/PROVOCAÇÃO: Ausente requerimento expresso do MP ou representação da autoridade policial. Princípio acusatório violado (Art. 3º-A e Art. 311 do CPP).');
  } else {
    legalBasisArticles.push('Art. 311');
  }

  // 2. CRIME CULPOSO OU DOLOSO
  if (c.isCulposo || !c.isIntentionalCrime) {
    blockers.push('INADMISSIBILIDADE EM CRIME CULPOSO: A prisão preventiva é cabível exclusivamente nos crimes dolosos (Art. 313, caput do CPP).');
  }

  // 3. HIPÓTESES DE ADMISSIBILIDADE (ART. 313 DO CPP)
  let meetsArt313 = false;

  if (c.maxPenaltyYears > 4) {
    meetsArt313 = true;
    admissibilityReasons.push(`Art. 313, I: Crime doloso com pena máxima privativa de liberdade em abstrato superior a 4 anos (${c.maxPenaltyYears} anos).`);
  }

  if (c.isRecidivist) {
    meetsArt313 = true;
    admissibilityReasons.push('Art. 313, II: Condenação prévia por outro crime doloso em sentença transitada em julgado (reincidência).');
  }

  if (c.isDomesticViolence) {
    meetsArt313 = true;
    admissibilityReasons.push('Art. 313, III: Delito envolvendo violência doméstica e familiar contra mulher, criança, adolescente, idoso, enfermo ou pessoa com deficiência para garantir medidas protetivas.');
  }

  if (c.hasCivilIdentityDoubt) {
    meetsArt313 = true;
    admissibilityReasons.push('Art. 313, parágrafo único: Dúvida substancial sobre a identidade civil do indiciado/acusado.');
  }

  if (!meetsArt313) {
    blockers.push(`NÃO ATENDE AO ART. 313 DO CPP: A infração dolosa possui pena máxima igual ou inferior a 4 anos (${c.maxPenaltyYears} anos) e o investigado não é reincidente doloso, não envolve violência doméstica nem dúvida identitária. Incabível prisão preventiva.`);
  } else {
    legalBasisArticles.push('Art. 313');
  }

  // 4. PRESSUPOSTOS - FUMUS COMISSI DELICTI (ART. 312, CAPUT, IN FINE)
  if (!c.crimeExistenceProven) {
    blockers.push('AUSÊNCIA DE PROVA DA EXISTÊNCIA DO CRIME: A materialidade delitiva não foi concretamente demonstrada (Art. 312, in fine).');
  } else {
    fumusReasons.push('Materialidade delitiva comprovada nos autos.');
  }

  if (!c.sufficientAuthorshipIndicia) {
    blockers.push('AUSÊNCIA DE INDÍCIOS SUFICIENTES DE AUTORIA: Não há suporte probatório mínimo vinculando o imputado à conduta (Art. 312, in fine).');
  } else {
    fumusReasons.push('Indícios suficientes de autoria presentes e individualizados.');
  }

  if (c.crimeExistenceProven && c.sufficientAuthorshipIndicia) {
    legalBasisArticles.push('Art. 312 (Fumus Comissi Delicti)');
  }

  // 5. FUNDAMENTOS - PERICULUM LIBERTATIS (ART. 312, CAPUT E § 1º)
  let meetsPericulum = false;

  if (c.publicOrderGuarantee) {
    meetsPericulum = true;
    periculumReasons.push(`Garantia da ordem pública: ${c.publicOrderReason || 'Gravidade concreta e perigo demonstrado pelo modus operandi.'}`);
  }

  if (c.economicOrderGuarantee) {
    meetsPericulum = true;
    periculumReasons.push('Garantia da ordem econômica: Relevante desestabilização da ordem financeira ou tributária.');
  }

  if (c.criminalInstructionConvenience) {
    meetsPericulum = true;
    periculumReasons.push(`Conveniência da instrução criminal: ${c.instructionReason || 'Risco de coação de testemunhas ou destruição probatória.'}`);
  }

  if (c.penalLawApplication) {
    meetsPericulum = true;
    periculumReasons.push(`Assegurar a aplicação da lei penal: ${c.flightRiskReason || 'Risco concreto e iminente de fuga ou desobediência judiciária.'}`);
  }

  if (c.breachOfPreviousMeasures) {
    meetsPericulum = true;
    periculumReasons.push('Descumprimento de obrigações impostas por outras medidas cautelares alternativas (Art. 282, § 4º e Art. 312, § 1º).');
  }

  if (!meetsPericulum) {
    blockers.push('AUSÊNCIA DE PERICULUM LIBERTATIS: Nenhum dos fundamentos do Art. 312 do CPP (ordem pública, ordem econômica, instrução criminal ou aplicação da lei penal) foi configurado.');
  } else {
    legalBasisArticles.push('Art. 312 (Periculum Libertatis)');
  }

  // 6. CONTEMPORANEIDADE E MOTIVAÇÃO CONCRETA (ART. 312, § 2º E ART. 315)
  if (!c.isContemporary) {
    blockers.push('FALTA DE CONTEMPORANEIDADE: A prisão preventiva não pode se apoiar em fatos pretéritos sem demonstração de urgência e risco atual (Art. 312, § 2º do CPP e jurisprudência STJ/STF).');
  }

  if (!c.concreteFactsDescription || c.concreteFactsDescription.trim().length < 15) {
    warnings.push('FUNDAMENTAÇÃO CONCRETA INSUFICIENTE: O Art. 315, § 2º do CPP impõe o dever de motivação substancial, repelindo cláusulas de estilo, remissão abstrata à gravidade do tipo ou clichês legais.');
  } else {
    legalBasisArticles.push('Art. 315');
  }

  // 7. SUBSIDIARIEDADE DAS CAUTELARES DIVERSAS (ART. 282, § 6º E ART. 319)
  if (!c.alternativeMeasuresInsufficient) {
    blockers.push('SUBSIDIARIEDADE: Não foi demonstrada a insuficiência das medidas cautelares diversas da prisão do Art. 319 (tornozeleira, recolhimento noturno, etc.). A prisão é a ultima ratio (Art. 282, § 6º do CPP).');
  } else {
    legalBasisArticles.push('Art. 282, § 6º c/c Art. 319');
  }

  // 8. PRISÃO DOMICILIAR SUBSTITUTIVA (ART. 318 E 318-A CPP)
  const isDomesticArrestEligible =
    (c.isMotherOfChildUpTo12 || c.isPregnantWoman) &&
    !c.committedCrimeWithViolenceAgainstDependent;

  if (isDomesticArrestEligible) {
    warnings.push('DIREITO À SUBSTITUIÇÃO POR PRISÃO DOMICILIAR (ART. 318-A DO CPP E HC 143.641/STF): A ré é gestante ou mãe de criança de até 12 anos e o delito não foi cometido com violência/grave ameaça a descendentes. A custódia deve ser cumprida em meio domiciliar.');
  }

  if (c.isOver80) {
    warnings.push('HIPÓTESE DE PRISÃO DOMICILIAR (ART. 318, I DO CPP): Pessoa maior de 80 (oitenta) anos.');
  }

  if (c.isExtremelyDebilitatedByIllness) {
    warnings.push('HIPÓTESE DE PRISÃO DOMICILIAR (ART. 318, II DO CPP): Pessoa extremamente debilitada por motivo de doença grave.');
  }

  const isLegal = blockers.length === 0;

  let summaryConclusion = '';
  if (isLegal) {
    if (isDomesticArrestEligible) {
      summaryConclusion = 'DECRETAÇÃO CABÍVEL COM CONVERSÃO OBRIGATÓRIA EM PRISÃO DOMICILIAR (Art. 318-A do CPP).';
    } else {
      summaryConclusion = 'PRISÃO PREVENTIVA JURIDICAMENTE ADMISSÍVEL E REGULAR segundo os Arts. 311, 312, 313 e 315 do CPP.';
    }
  } else {
    summaryConclusion = `PRISÃO PREVENTIVA INCABÍVEL OU ILEGAL (${blockers.length} óbice(s) legal(is) insanável(is)).`;
  }

  return {
    isLegal,
    blockers,
    warnings,
    admissibilityReasons,
    periculumReasons,
    fumusReasons,
    summaryConclusion,
    legalBasisArticles: Array.from(new Set(legalBasisArticles))
  };
}
