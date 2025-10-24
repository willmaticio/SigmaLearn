import { SubjectMetadata, Subject, SubjectKey } from "@shared/schema";
import { Calculator, Binary, TrendingUp, Grid3x3 } from "lucide-react";

export const SUBJECT_METADATA: Record<Subject, SubjectMetadata> = {
  "linear-algebra": {
    id: "linear-algebra",
    key: "la",
    name: "Linear Algebra",
    description: "Matrices, vectors, eigenvalues, and transformations",
    color: "#2B6CB0",
    icon: "Grid3x3",
    route: "/linear-algebra",
  },
  "calculus-1": {
    id: "calculus-1",
    key: "calc1",
    name: "Calculus I",
    description: "Limits, derivatives, and applications",
    color: "#059669",
    icon: "TrendingUp",
    route: "/calculus-1",
  },
  "calculus-2": {
    id: "calculus-2",
    key: "calc2",
    name: "Calculus II",
    description: "Integration, series, and sequences",
    color: "#DC2626",
    icon: "Calculator",
    route: "/calculus-2",
  },
  "discrete-math": {
    id: "discrete-math",
    key: "discrete",
    name: "Discrete Math",
    description: "Logic, combinatorics, and graph theory",
    color: "#7C3AED",
    icon: "Binary",
    route: "/discrete-math",
  },
};

export function getSubjectByKey(key: SubjectKey): SubjectMetadata | undefined {
  return Object.values(SUBJECT_METADATA).find(s => s.key === key);
}

export function getSubjectIcon(iconName: string) {
  const icons: Record<string, any> = {
    Grid3x3,
    TrendingUp,
    Calculator,
    Binary,
  };
  return icons[iconName] || Grid3x3;
}

export const ALL_SUBJECTS = Object.values(SUBJECT_METADATA);
