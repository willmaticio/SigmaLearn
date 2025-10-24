import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import "katex/dist/katex.min.css";
import katex from "katex";

interface FormulaSection {
  title: string;
  formulas: { label: string; latex: string }[];
}

interface RightRailProps {
  sections: FormulaSection[];
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

export function RightRail({ sections }: RightRailProps) {
  if (sections.length === 0) {
    return null;
  }

  return (
    <aside className="hidden xl:block w-80 sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
      <Card className="p-6 border-card-border">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-4">
          Key Formulas
        </h2>
        
        <Accordion type="multiple" defaultValue={sections.map((_, i) => `section-${i}`)}>
          {sections.map((section, index) => (
            <AccordionItem key={index} value={`section-${index}`}>
              <AccordionTrigger className="text-sm font-medium">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {section.formulas.map((formula, fIndex) => (
                    <div key={fIndex} className="space-y-1">
                      <p className="text-xs text-muted-foreground font-medium">
                        {formula.label}
                      </p>
                      <div
                        className="text-sm font-serif"
                        dangerouslySetInnerHTML={{ __html: renderLatex(formula.latex) }}
                      />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </aside>
  );
}
