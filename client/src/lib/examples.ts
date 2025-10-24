import { Example, SubjectKey } from "@shared/schema";

export const EXAMPLES: Record<SubjectKey, Example[]> = {
  la: [
    {
      id: "la-1",
      title: "RREF of 3x3 Matrix",
      query: "[[1,2,1],[2,4,0],[3,6,3]]",
      mode: "rref",
      description: "Reduce a matrix to row echelon form",
    },
    {
      id: "la-2",
      title: "Eigenvalues of 2x2",
      query: "[[2,1],[1,2]]",
      mode: "eigen",
      description: "Find eigenvalues and eigenvectors",
    },
    {
      id: "la-3",
      title: "Matrix Determinant",
      query: "[[1,2,3],[4,5,6],[7,8,9]]",
      mode: "det",
      description: "Calculate determinant of a matrix",
    },
  ],
  calc1: [
    {
      id: "calc1-1",
      title: "Product Rule",
      query: "x^2 * sin(x)",
      mode: "derivative",
      description: "Differentiate using product rule",
    },
    {
      id: "calc1-2",
      title: "Chain Rule",
      query: "sin(x^2)",
      mode: "derivative",
      description: "Differentiate composite function",
    },
    {
      id: "calc1-3",
      title: "Quotient Rule",
      query: "(x^2 + 1) / (x - 1)",
      mode: "derivative",
      description: "Differentiate quotient",
    },
    {
      id: "calc1-4",
      title: "Limit at Infinity",
      query: "(3*x^2 + 2*x) / (x^2 - 1)",
      mode: "limit",
      description: "Evaluate limit as x approaches infinity",
    },
  ],
  calc2: [
    {
      id: "calc2-1",
      title: "Integration by Parts",
      query: "x * exp(x)",
      mode: "integral",
      description: "Integrate using integration by parts",
    },
    {
      id: "calc2-2",
      title: "Trigonometric Integral",
      query: "sin(x) * cos(x)",
      mode: "integral",
      description: "Integrate trig product",
    },
    {
      id: "calc2-3",
      title: "Taylor Series",
      query: "exp(x)",
      mode: "series",
      description: "Find Maclaurin series expansion",
    },
  ],
  discrete: [
    {
      id: "disc-1",
      title: "De Morgan's Law",
      query: "!(A & B)",
      mode: "logic",
      description: "Simplify using De Morgan's laws",
    },
    {
      id: "disc-2",
      title: "Binomial Coefficient",
      query: "C(10, 3)",
      mode: "combinatorics",
      description: "Calculate combinations",
    },
  ],
};
