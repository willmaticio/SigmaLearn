import { z } from "zod";

// Subject types
export type Subject = "linear-algebra" | "calculus-1" | "calculus-2" | "discrete-math";
export type SubjectKey = "la" | "calc1" | "calc2" | "discrete";

// Difficulty levels
export type DifficultyLevel = "undergraduate" | "graduate" | "advanced";

// Topic frontmatter schema
export const topicFrontmatterSchema = z.object({
  title: z.string(),
  subject: z.enum(["linear-algebra", "calculus-1", "calculus-2", "discrete-math"]),
  tags: z.array(z.string()),
  level: z.enum(["undergraduate", "graduate", "advanced"]),
  description: z.string().optional(),
});

export type TopicFrontmatter = z.infer<typeof topicFrontmatterSchema>;

// Full topic with content
export interface Topic {
  slug: string;
  frontmatter: TopicFrontmatter;
  content: string;
  rawContent: string;
}

// Solver modes
export type SolverMode =
  | "auto"
  | "algebra"
  | "derivative"
  | "integral"
  | "limit"
  | "series"
  | "rref"
  | "eigen"
  | "det"
  | "nullspace"
  | "logic"
  | "combinatorics"
  | "recurrence";

// Step in solution
export interface Step {
  index: number;
  rule: string;
  before_latex?: string | null;
  after_latex?: string | null;
  note?: string | null;
  meta?: Record<string, any>;
}

// Solve request
export const solveRequestSchema = z.object({
  subject: z.enum(["la", "calc1", "calc2", "discrete"]),
  query: z.string(),
  mode: z.enum([
    "auto",
    "algebra",
    "derivative",
    "integral",
    "limit",
    "series",
    "rref",
    "eigen",
    "det",
    "nullspace",
    "logic",
    "combinatorics",
    "recurrence",
  ]).default("auto"),
  options: z.record(z.any()).optional(),
});

export type SolveRequest = z.infer<typeof solveRequestSchema>;

// Solve response
export interface SolveResponse {
  ok: boolean;
  result_latex?: string | null;
  steps: Step[];
  warnings: string[];
  errors?: string[];
  elapsed_ms?: number;
}

// OCR response
export interface OcrResponse {
  ok: boolean;
  latex?: string | null;
  warnings: string[];
}

// Subject metadata
export interface SubjectMetadata {
  id: Subject;
  key: SubjectKey;
  name: string;
  description: string;
  color: string;
  icon: string;
  route: string;
}

// Example problem
export interface Example {
  id: string;
  title: string;
  query: string;
  mode: SolverMode;
  description?: string;
}

// Search index entry
export interface SearchIndexEntry {
  slug: string;
  title: string;
  subject: Subject;
  tags: string[];
  level: DifficultyLevel;
  content: string;
  description?: string;
}
