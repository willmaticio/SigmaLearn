import { ReactNode } from "react";
import { Info, AlertCircle, CheckCircle2, Lightbulb } from "lucide-react";

interface CalloutProps {
  children: ReactNode;
  type?: "info" | "warning" | "success" | "tip";
  title?: string;
  className?: string;
}

const icons = {
  info: Info,
  warning: AlertCircle,
  success: CheckCircle2,
  tip: Lightbulb,
};

const styles = {
  info: "bg-[#EEF2FF] border-primary",
  warning: "bg-amber-50 border-amber-500",
  success: "bg-emerald-50 border-emerald-500",
  tip: "bg-blue-50 border-blue-400",
};

export function Callout({ children, type = "info", title, className = "" }: CalloutProps) {
  const Icon = icons[type];
  
  return (
    <div className={`rounded-xl border-l-4 p-6 ${styles[type]} ${className}`} data-testid={`callout-${type}`}>
      <div className="flex gap-3">
        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold text-sm uppercase tracking-wide mb-2 text-foreground">
              {title}
            </h4>
          )}
          <div className="text-sm leading-relaxed text-foreground/90">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
