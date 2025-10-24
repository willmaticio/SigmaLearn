import { Step } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import "katex/dist/katex.min.css";
import katex from "katex";

interface StepsViewProps {
  steps: Step[];
  result?: string | null;
}

function renderLatex(latex: string): string {
  try {
    return katex.renderToString(latex, {
      displayMode: true,
      throwOnError: false,
    });
  } catch (e) {
    return `<code>${latex}</code>`;
  }
}

export function StepsView({ steps, result }: StepsViewProps) {
  if (steps.length === 0 && !result) {
    return null;
  }

  return (
    <div className="space-y-6" data-testid="steps-view">
      {result && (
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Final Result
          </h3>
          <div 
            className="text-center py-4 font-serif text-lg"
            dangerouslySetInnerHTML={{ __html: renderLatex(result) }}
            data-testid="result-latex"
          />
        </Card>
      )}
      
      <div className="space-y-4">
        {steps.map((step) => (
          <Card 
            key={step.index} 
            className="p-6 border-l-4 border-primary/50"
            data-testid={`step-${step.index}`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-mono text-sm font-semibold">
                  {step.index}
                </div>
              </div>
              
              <div className="flex-1 space-y-3">
                <div>
                  <Badge variant="secondary" className="text-xs font-semibold uppercase tracking-wide">
                    {step.rule}
                  </Badge>
                </div>
                
                {step.before_latex && (
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">
                      Before
                    </div>
                    <div 
                      className="font-serif"
                      dangerouslySetInnerHTML={{ __html: renderLatex(step.before_latex) }}
                      data-testid={`step-${step.index}-before`}
                    />
                  </div>
                )}
                
                {step.after_latex && (
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">
                      After
                    </div>
                    <div 
                      className="font-serif"
                      dangerouslySetInnerHTML={{ __html: renderLatex(step.after_latex) }}
                      data-testid={`step-${step.index}-after`}
                    />
                  </div>
                )}
                
                {step.note && (
                  <p className="text-sm text-muted-foreground italic font-serif">
                    {step.note}
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
