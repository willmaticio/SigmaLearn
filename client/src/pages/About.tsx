import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Callout } from "@/components/Callout";
import { Button } from "@/components/ui/button";
import { Github, BookOpen, Code2 } from "lucide-react";

export default function About() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-page-title font-bold text-foreground mb-4">
            About SigmaLearn
          </h1>
          <p className="text-body font-serif text-muted-foreground">
            An open-source academic math platform for Computer Science and Data Science students
          </p>
        </div>

        <div className="space-y-8">
          <Card className="p-8 border-card-border">
            <h2 className="text-section font-semibold text-foreground mb-4">
              Our Mission
            </h2>
            <p className="text-body font-serif text-muted-foreground leading-relaxed mb-4">
              SigmaLearn is designed to help students master the mathematical foundations essential
              for Computer Science and Data Science. We believe that understanding the step-by-step
              process of solving mathematical problems is key to developing deep, lasting knowledge.
            </p>
            <p className="text-body font-serif text-muted-foreground leading-relaxed">
              Our platform focuses on four core areas: Linear Algebra, Calculus I, Calculus II, and
              Discrete Mathematics, providing detailed explanations and interactive problem-solving
              tools to enhance learning.
            </p>
          </Card>

          <Card className="p-8 border-card-border">
            <h2 className="text-section font-semibold text-foreground mb-4">
              Features
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Knowledge Base</h3>
                  <p className="text-sm text-muted-foreground font-serif">
                    Comprehensive topics covering essential mathematical concepts with clear definitions and examples.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Code2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Step-by-Step Solver</h3>
                  <p className="text-sm text-muted-foreground font-serif">
                    Interactive solver powered by SymPy that shows every step of the solution process with clear rule labels.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Github className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Open Source</h3>
                  <p className="text-sm text-muted-foreground font-serif">
                    Completely free and open-source. Code licensed under MIT, content under CC BY-SA.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-card-border">
            <h2 className="text-section font-semibold text-foreground mb-4">
              Technology Stack
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Frontend</h3>
                <ul className="text-sm text-muted-foreground font-serif space-y-1">
                  <li>• React + Vite + TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• KaTeX for math rendering</li>
                  <li>• MathLive for input</li>
                  <li>• Lunr.js for search</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Backend</h3>
                <ul className="text-sm text-muted-foreground font-serif space-y-1">
                  <li>• FastAPI (Python)</li>
                  <li>• SymPy for symbolic math</li>
                  <li>• Step-by-step logging</li>
                  <li>• Optional OCR support</li>
                </ul>
              </div>
            </div>
          </Card>

          <Callout type="info" title="Open Source">
            <p className="mb-3">
              SigmaLearn is open-source and welcomes contributions. Whether you want to add new topics,
              improve solver algorithms, or enhance the UI, we'd love your help!
            </p>
            <Button variant="outline" asChild data-testid="button-github">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                View on GitHub
              </a>
            </Button>
          </Callout>

          <Card className="p-8 border-card-border bg-muted/30">
            <h2 className="text-section font-semibold text-foreground mb-4">
              License
            </h2>
            <div className="space-y-3 text-sm font-serif text-muted-foreground">
              <p>
                <strong className="text-foreground">Code:</strong> MIT License - Free to use, modify, and distribute
              </p>
              <p>
                <strong className="text-foreground">Content:</strong> CC BY-SA 4.0 - Free to share and adapt with attribution
              </p>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
