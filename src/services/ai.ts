import { CaseData } from "../types";

const STREAM_ERROR_MARKER = "\n\n[[ERRO_STREAM]]";

/**
 * Envia o PDF ao servidor e recebe a decisão em streaming.
 * `onChunk` recebe o texto acumulado até o momento, para exibição progressiva.
 */
export async function generateAnalysis(
  caseData: CaseData,
  onChunk?: (textSoFar: string) => void
): Promise<string> {
  let response: Response;
  try {
    response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileData: caseData.fileData,
        fileName: caseData.fileName,
        additionalInfo: caseData.additionalInfo,
      }),
    });
  } catch (error) {
    console.error("Erro de rede ao chamar /api/analyze:", error);
    throw new Error("Falha na conexão com o servidor. Verifique sua conexão e tente novamente.");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Erro no servidor durante a análise (HTTP ${response.status}).`);
  }

  if (!response.body) {
    const text = await response.text();
    return finalize(text);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
      const visible = text.split(STREAM_ERROR_MARKER)[0];
      onChunk?.(visible);
    }
    text += decoder.decode();
  } catch (error) {
    console.error("Conexão interrompida durante o streaming:", error);
    if (text.trim()) {
      throw new PartialDecisionError(text, "A conexão caiu antes do fim da geração. O texto abaixo está incompleto.");
    }
    throw new Error("A conexão com o servidor foi interrompida durante a análise. Tente novamente.");
  }

  return finalize(text);
}

function finalize(text: string): string {
  const [decision, streamError] = text.split(STREAM_ERROR_MARKER);
  if (streamError !== undefined) {
    throw new PartialDecisionError(decision, `${streamError.trim()} O texto abaixo está incompleto.`);
  }
  if (!decision.trim()) {
    throw new Error("Nenhuma minuta foi gerada. Por favor, tente novamente.");
  }
  return decision;
}

/** Erro que carrega o texto parcial já gerado, para não descartá-lo. */
export class PartialDecisionError extends Error {
  constructor(public partialText: string, message: string) {
    super(message);
    this.name = "PartialDecisionError";
  }
}
