import { ReactNode } from "react";
import { Search, BookOpen, Calculator } from "lucide-react";

interface EmptyStateProps {
  icon?: "search" | "book" | "calculator";
  title: string;
  description: string;
  action?: ReactNode;
}

const icons = {
  search: Search,
  book: BookOpen,
  calculator: Calculator,
};

export function EmptyState({ 
  icon = "book", 
  title, 
  description, 
  action 
}: EmptyStateProps) {
  const Icon = icons[icon];
  
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center" data-testid="empty-state">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground max-w-md mb-6">
        {description}
      </p>
      {action && action}
    </div>
  );
}
