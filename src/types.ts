export interface CaseData {
  fileData: string; // Base64 string of the PDF
  mimeType: string;
  fileName: string;
  additionalInfo?: string;
}

export interface AnalysisResult {
  decision: string;
  isLoading: boolean;
  error: string | null;
}
