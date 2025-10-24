import { Example } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ExampleViewerProps {
  examples: Example[];
  onSelectExample: (example: Example) => void;
}

export function ExampleViewer({ examples, onSelectExample }: ExampleViewerProps) {
  if (examples.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4" data-testid="example-viewer">
      <h3 className="text-lg font-semibold text-foreground">
        Try These Examples
      </h3>
      <div className="grid gap-3">
        {examples.map((example) => (
          <Card 
            key={example.id} 
            className="p-4 hover:shadow-md transition-shadow border-card-border"
            data-testid={`example-${example.id}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-medium text-sm text-foreground mb-1">
                  {example.title}
                </h4>
                {example.description && (
                  <p className="text-xs text-muted-foreground mb-2 font-serif">
                    {example.description}
                  </p>
                )}
                <code className="text-xs bg-muted px-2 py-1 rounded font-mono block mt-2">
                  {example.query}
                </code>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onSelectExample(example)}
                className="flex-shrink-0"
                data-testid={`button-send-${example.id}`}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
