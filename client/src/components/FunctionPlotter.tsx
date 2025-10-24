import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TrendingUp } from "lucide-react";
import { create, all } from "mathjs";

interface FunctionPlotterProps {
  initialFunction?: string;
}

const math = create(all);

export function FunctionPlotter({ initialFunction = "x^2" }: FunctionPlotterProps) {
  const [functionExpr, setFunctionExpr] = useState(initialFunction);
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [plotData, setPlotData] = useState<{x: number[], y: number[]} | null>(null);
  const [error, setError] = useState<string>("");

  const evaluateFunction = (expr: string, x: number): number | null => {
    try {
      const node = math.parse(expr);
      const compiled = node.compile();
      const result = compiled.evaluate({ x });
      
      if (typeof result !== "number" || !isFinite(result)) {
        return null;
      }
      
      return result;
    } catch (err) {
      return null;
    }
  };

  const generatePlot = () => {
    setError("");
    
    try {
      const numPoints = 200;
      const step = (xMax - xMin) / numPoints;
      const xValues: number[] = [];
      const yValues: number[] = [];
      
      for (let i = 0; i <= numPoints; i++) {
        const x = xMin + i * step;
        const y = evaluateFunction(functionExpr, x);
        
        if (y !== null && Math.abs(y) < 1000) {
          xValues.push(x);
          yValues.push(y);
        }
      }
      
      if (xValues.length === 0) {
        setError("Unable to plot function. Check your expression.");
        setPlotData(null);
        return;
      }
      
      setPlotData({ x: xValues, y: yValues });
    } catch (err) {
      setError("Invalid function expression");
      setPlotData(null);
    }
  };

  useEffect(() => {
    generatePlot();
  }, []);

  return (
    <Card className="p-6 border-card-border">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-subsection font-semibold text-foreground">
          Function Plotter
        </h3>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <Label htmlFor="function-input" className="text-sm font-medium">
              Function f(x)
            </Label>
            <Input
              id="function-input"
              value={functionExpr}
              onChange={(e) => setFunctionExpr(e.target.value)}
              placeholder="e.g., x^2, sin(x), x^3 - 2*x"
              data-testid="input-function"
              className="font-mono"
            />
          </div>

          <div>
            <Label htmlFor="x-min" className="text-sm font-medium">
              x min
            </Label>
            <Input
              id="x-min"
              type="number"
              value={xMin}
              onChange={(e) => setXMin(Number(e.target.value))}
              data-testid="input-xmin"
            />
          </div>

          <div>
            <Label htmlFor="x-max" className="text-sm font-medium">
              x max
            </Label>
            <Input
              id="x-max"
              type="number"
              value={xMax}
              onChange={(e) => setXMax(Number(e.target.value))}
              data-testid="input-xmax"
            />
          </div>
        </div>

        <Button 
          onClick={generatePlot} 
          data-testid="button-plot"
          className="w-full md:w-auto"
        >
          Plot Function
        </Button>

        {error && (
          <p className="text-sm text-destructive" data-testid="error-message">
            {error}
          </p>
        )}
      </div>

      {plotData && (
        <div className="bg-card rounded-lg border border-card-border overflow-hidden" data-testid="plot-container">
          <Plot
            data={[
              {
                x: plotData.x,
                y: plotData.y,
                type: "scatter",
                mode: "lines",
                line: { color: "hsl(211, 70%, 38%)", width: 2 },
                name: "f(x)",
              },
            ]}
            layout={{
              autosize: true,
              margin: { l: 50, r: 30, t: 30, b: 50 },
              xaxis: {
                title: "x",
                gridcolor: "hsl(var(--border))",
                zerolinecolor: "hsl(var(--muted-foreground))",
              },
              yaxis: {
                title: "f(x)",
                gridcolor: "hsl(var(--border))",
                zerolinecolor: "hsl(var(--muted-foreground))",
              },
              plot_bgcolor: "hsl(var(--background))",
              paper_bgcolor: "hsl(var(--card))",
              font: {
                family: "var(--font-sans)",
                color: "hsl(var(--foreground))",
              },
            }}
            config={{
              responsive: true,
              displayModeBar: true,
              displaylogo: false,
            }}
            style={{ width: "100%", height: "400px" }}
          />
        </div>
      )}
    </Card>
  );
}
