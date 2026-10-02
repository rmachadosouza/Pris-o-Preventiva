import { CaseData } from "../types";

export async function generateAnalysis(caseData: CaseData): Promise<string> {
  const doFetch = async () => {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileData: caseData.fileData,
        mimeType: caseData.mimeType,
        additionalInfo: caseData.additionalInfo,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Erro no servidor durante a análise (Código HTTP ${response.status})`);
    }

    const data = await response.json();
    return data.text || "Nenhuma minuta foi gerada. Por favor, tente novamente.";
  };

  try {
    return await doFetch();
  } catch (error: any) {
    console.error("Erro ao chamar API de análise:", error);
    
    // If it's a network glitch or server was restarting, attempt once more after a short pause
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return await doFetch();
      } catch (retryError: any) {
        console.error("Erro na segunda tentativa:", retryError);
        throw new Error("Falha na conexão com o servidor. O arquivo pode ser muito grande ou a conexão foi interrompida. Verifique o tamanho do PDF e tente novamente.");
      }
    }
    
    throw new Error(error.message || "Falha ao conectar com o serviço de análise jurídica da IA.");
  }
}


