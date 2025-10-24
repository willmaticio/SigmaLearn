import { AppShell } from "@/components/AppShell";
import { FunctionPlotter } from "@/components/FunctionPlotter";

export default function Visualizations() {
  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-page-title font-bold text-foreground mb-4">
            Function Visualizations
          </h1>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Explore mathematical functions with interactive graphs. Visualize behavior, identify patterns, and gain deeper insights.
          </p>
        </div>

        <div className="space-y-8">
          <FunctionPlotter />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FunctionPlotter initialFunction="sin(x)" />
            <FunctionPlotter initialFunction="x^3 - 3*x" />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
