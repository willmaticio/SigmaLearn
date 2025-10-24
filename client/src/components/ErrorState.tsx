import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = "Something went wrong", 
  message, 
  onRetry 
}: ErrorStateProps) {
  return (
    <Card className="p-8 border-destructive/50 bg-destructive/5" data-testid="error-state">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mb-6">
          {message}
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" data-testid="button-retry">
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
}
