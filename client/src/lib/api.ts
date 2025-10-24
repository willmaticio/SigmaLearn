import { SolveRequest, SolveResponse, OcrResponse } from "@shared/schema";

export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

export async function solve(body: SolveRequest): Promise<SolveResponse> {
  try {
    const response = await fetch(`${API_BASE}/solve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new Error(await response.text());
    }
    
    return await response.json();
  } catch (error) {
    // Mock fallback for demo
    console.warn("Backend unreachable, using mock response", error);
    return {
      ok: true,
      result_latex: "\\frac{d}{dx}[x^2\\sin x] = 2x\\sin x + x^2\\cos x",
      steps: [
        { 
          index: 1, 
          rule: "Product Rule: prepare", 
          before_latex: "x^{2} \\sin{x}",
        },
        { 
          index: 2, 
          rule: "Product Rule: apply d/dx", 
          before_latex: "x^{2} \\sin{x}",
          after_latex: "2 x \\sin{x} + x^{2} \\cos{x}",
        }
      ],
      warnings: ["Mock response: backend unreachable"],
    };
  }
}

export async function ocrToLatex(file: File): Promise<OcrResponse> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    
    const response = await fetch(`${API_BASE}/ocr_to_latex`, {
      method: "POST",
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(await response.text());
    }
    
    return await response.json();
  } catch (error) {
    console.warn("OCR not available", error);
    return {
      ok: false,
      warnings: ["OCR feature not enabled on backend"],
    };
  }
}

export async function checkHealth(): Promise<{ status: string; ocr: boolean; java: boolean }> {
  try {
    const response = await fetch(`${API_BASE.replace("/api", "")}/health`);
    if (!response.ok) throw new Error("Health check failed");
    return await response.json();
  } catch (error) {
    return { status: "unavailable", ocr: false, java: false };
  }
}
