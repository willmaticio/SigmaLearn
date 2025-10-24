import { Topic, TopicFrontmatter } from "@shared/schema";

// Simple frontmatter parser for browser (no Buffer dependency)
function parseFrontmatter(text: string): { data: Record<string, any>; content: string } {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: text };
  
  const [, frontmatterText, content] = match;
  const data: Record<string, any> = {};
  
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value: any = line.slice(colonIndex + 1).trim();
      
      // Remove quotes
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      // Parse arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map((v: string) => v.trim().replace(/"/g, ''));
      }
      
      data[key] = value;
    }
  });
  
  return { data, content };
}

// In a real implementation, this would load from /content directory
// For now, we'll provide sample topics that can be expanded
const SAMPLE_TOPICS: Record<string, string> = {
  "linear-algebra/eigenvectors": `---
title: "Eigenvalues and Eigenvectors"
subject: "linear-algebra"
tags: ["spectral-theory", "diagonalization"]
level: "undergraduate"
description: "Understanding eigenvalues and eigenvectors for matrix transformations"
---

# Eigenvalues and Eigenvectors

## Definition

For a square matrix $A$, a nonzero vector $\\mathbf{v}$ is an **eigenvector** if:

$$A\\mathbf{v} = \\lambda \\mathbf{v}$$

where $\\lambda$ is a scalar called the **eigenvalue**.

## Key Properties

1. **Characteristic Equation**: $\\det(A - \\lambda I) = 0$
2. **Linearly Independent**: Eigenvectors corresponding to distinct eigenvalues are linearly independent
3. **Diagonalization**: If $A$ has $n$ linearly independent eigenvectors, then $A = PDP^{-1}$

## Example

Find the eigenvalues of $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$

**Solution**:
$$\\det(A - \\lambda I) = \\det\\begin{bmatrix} 2-\\lambda & 1 \\\\ 1 & 2-\\lambda \\end{bmatrix} = (2-\\lambda)^2 - 1 = 0$$

This gives $\\lambda = 3$ or $\\lambda = 1$.`,

  "linear-algebra/rref": `---
title: "Reduced Row Echelon Form (RREF)"
subject: "linear-algebra"
tags: ["gaussian-elimination", "systems"]
level: "undergraduate"
description: "Row reduction and solving linear systems"
---

# Reduced Row Echelon Form

## Definition

A matrix is in **RREF** if:

1. All zero rows are at the bottom
2. The leading entry (pivot) in each nonzero row is 1
3. Each pivot is the only nonzero entry in its column
4. Pivots move to the right as you go down

## Applications

- Solving systems of linear equations
- Finding matrix rank
- Determining linear independence
- Computing matrix inverses

## Example

Transform $\\begin{bmatrix} 1 & 2 & 1 \\\\ 2 & 4 & 0 \\\\ 3 & 6 & 3 \\end{bmatrix}$ to RREF.

Try this in the solver with the query: \`[[1,2,1],[2,4,0],[3,6,3]]\``,

  "calculus-1/product-rule": `---
title: "Product Rule"
subject: "calculus-1"
tags: ["differentiation", "rules"]
level: "undergraduate"
description: "Differentiating products of functions"
---

# The Product Rule

## Theorem

If $f$ and $g$ are differentiable functions, then:

$$(fg)' = f'g + fg'$$

## Proof Sketch

Using the limit definition:
$$\\frac{d}{dx}[f(x)g(x)] = \\lim_{h \\to 0} \\frac{f(x+h)g(x+h) - f(x)g(x)}{h}$$

Add and subtract $f(x+h)g(x)$ in the numerator to separate the derivatives.

## Example

Find $\\frac{d}{dx}[x^2 \\sin x]$

**Solution**: 
- $f(x) = x^2$, so $f'(x) = 2x$
- $g(x) = \\sin x$, so $g'(x) = \\cos x$
- $(x^2 \\sin x)' = 2x \\sin x + x^2 \\cos x$`,

  "calculus-1/chain-rule": `---
title: "Chain Rule"
subject: "calculus-1"
tags: ["differentiation", "rules", "composition"]
level: "undergraduate"
description: "Differentiating composite functions"
---

# The Chain Rule

## Theorem

If $y = f(g(x))$ where both $f$ and $g$ are differentiable, then:

$$\\frac{dy}{dx} = f'(g(x)) \\cdot g'(x)$$

Or in Leibniz notation: $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$ where $u = g(x)$.

## Example

Find $\\frac{d}{dx}[\\sin(x^2)]$

**Solution**:
- Outer function: $f(u) = \\sin u$, so $f'(u) = \\cos u$
- Inner function: $u = x^2$, so $\\frac{du}{dx} = 2x$
- Chain rule: $\\frac{d}{dx}[\\sin(x^2)] = \\cos(x^2) \\cdot 2x = 2x\\cos(x^2)$`,

  "calculus-2/integration-by-parts": `---
title: "Integration by Parts"
subject: "calculus-2"
tags: ["integration", "techniques"]
level: "undergraduate"
description: "Integration technique for products"
---

# Integration by Parts

## Formula

$$\\int u\\,dv = uv - \\int v\\,du$$

## LIATE Rule

Choose $u$ in this priority order:
1. **L**ogarithmic
2. **I**nverse trig
3. **A**lgebraic
4. **T**rigonometric
5. **E**xponential

## Example

Evaluate $\\int x e^x dx$

**Solution**:
- Let $u = x$, $dv = e^x dx$
- Then $du = dx$, $v = e^x$
- $\\int x e^x dx = xe^x - \\int e^x dx = xe^x - e^x + C = e^x(x-1) + C$`,

  "calculus-2/taylor-series": `---
title: "Taylor Series"
subject: "calculus-2"
tags: ["series", "approximation"]
level: "undergraduate"
description: "Power series expansion of functions"
---

# Taylor Series

## Definition

The Taylor series of $f(x)$ centered at $a$ is:

$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n$$

## Maclaurin Series (at $a=0$)

$$f(x) = f(0) + f'(0)x + \\frac{f''(0)}{2!}x^2 + \\frac{f'''(0)}{3!}x^3 + \\cdots$$

## Common Series

- $e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}$
- $\\sin x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!}$
- $\\cos x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n}}{(2n)!}$`,

  "discrete-math/demorgan": `---
title: "De Morgan's Laws"
subject: "discrete-math"
tags: ["logic", "boolean-algebra"]
level: "undergraduate"
description: "Fundamental laws of logical negation"
---

# De Morgan's Laws

## Laws

1. $\\neg(p \\land q) \\equiv \\neg p \\lor \\neg q$
2. $\\neg(p \\lor q) \\equiv \\neg p \\land \\neg q$

## English Translation

- "The negation of AND is OR of negations"
- "The negation of OR is AND of negations"

## Applications

- Simplifying logical expressions
- Digital circuit design
- Set theory (complement of intersection/union)
- Boolean algebra

## Example

Negate the statement: "It is raining AND it is cold"

**Solution**: Using De Morgan's law:
- Original: $p \\land q$
- Negation: $\\neg p \\lor \\neg q$
- English: "It is NOT raining OR it is NOT cold"`,

  "discrete-math/combinatorics": `---
title: "Permutations and Combinations"
subject: "discrete-math"
tags: ["combinatorics", "counting"]
level: "undergraduate"
description: "Counting arrangements and selections"
---

# Permutations and Combinations

## Permutations

Number of ways to arrange $r$ objects from $n$ distinct objects:

$$P(n,r) = \\frac{n!}{(n-r)!}$$

**Order matters!**

## Combinations

Number of ways to choose $r$ objects from $n$ distinct objects:

$$C(n,r) = \\binom{n}{r} = \\frac{n!}{r!(n-r)!}$$

**Order doesn't matter!**

## Example

How many ways can you arrange 3 books from a shelf of 5 books?

**Solution**: $P(5,3) = \\frac{5!}{2!} = \\frac{120}{2} = 60$

How many ways can you choose 3 books?

**Solution**: $C(5,3) = \\frac{5!}{3!2!} = \\frac{120}{6 \\cdot 2} = 10$`,
};

export async function loadTopic(slug: string): Promise<Topic | null> {
  const content = SAMPLE_TOPICS[slug];
  if (!content) return null;

  const { data, content: markdownContent } = parseFrontmatter(content);
  
  return {
    slug,
    frontmatter: data as TopicFrontmatter,
    content: markdownContent,
    rawContent: content,
  };
}

export async function loadAllTopics(): Promise<Topic[]> {
  const topics: Topic[] = [];
  
  for (const [slug, content] of Object.entries(SAMPLE_TOPICS)) {
    const { data, content: markdownContent } = parseFrontmatter(content);
    topics.push({
      slug,
      frontmatter: data as TopicFrontmatter,
      content: markdownContent,
      rawContent: content,
    });
  }
  
  return topics;
}

export async function loadTopicsBySubject(subject: string): Promise<Topic[]> {
  const allTopics = await loadAllTopics();
  return allTopics.filter(t => t.frontmatter.subject === subject);
}
