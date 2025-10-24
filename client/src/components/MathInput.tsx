import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, Type, Sigma } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "mathlive";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': any;
    }
  }
}

interface MathInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MathInput({ 
  value, 
  onChange, 
  onSubmit, 
  placeholder = "Enter mathematical expression...",
  disabled = false 
}: MathInputProps) {
  const [inputMode, setInputMode] = useState<"latex" | "plain">("plain");
  const mathFieldRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputMode === "latex" && mathFieldRef.current) {
      const mf = mathFieldRef.current;
      
      // Set initial value
      if (value) {
        mf.setValue(value);
      }
      
      // Listen for input changes
      const handleInput = () => {
        const latexValue = mf.getValue();
        onChange(latexValue);
      };
      
      mf.addEventListener('input', handleInput);
      
      // Configure math field
      mf.setOptions({
        virtualKeyboardMode: 'manual',
        smartMode: true,
        smartFence: true,
        smartSuperscript: true,
      });
      
      return () => {
        mf.removeEventListener('input', handleInput);
      };
    }
  }, [inputMode]);

  useEffect(() => {
    if (inputMode === "latex" && mathFieldRef.current && value !== mathFieldRef.current.getValue()) {
      mathFieldRef.current.setValue(value);
    }
  }, [value, inputMode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-3" data-testid="math-input">
      <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as "latex" | "plain")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="plain" data-testid="tab-plain">
            <Type className="h-4 w-4 mr-2" />
            Plain Text
          </TabsTrigger>
          <TabsTrigger value="latex" data-testid="tab-latex">
            <Sigma className="h-4 w-4 mr-2" />
            LaTeX
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="plain" className="mt-4">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full min-h-[100px] p-4 font-mono text-base resize-none border-2 border-input rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none"
            disabled={disabled}
            data-testid="input-plain"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Examples: x^2 + 3*x - 5, sin(x^2), [[1,2],[3,4]]
          </p>
        </TabsContent>
        
        <TabsContent value="latex" className="mt-4">
          <math-field
            ref={mathFieldRef}
            class="w-full min-h-[100px] p-4 border-2 border-input rounded-lg focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/20"
            data-testid="input-latex"
          >
            {value}
          </math-field>
          <p className="text-xs text-muted-foreground mt-2">
            Use the virtual keyboard or type LaTeX directly: \frac, \int, \sum, \sin, \cos
          </p>
        </TabsContent>
      </Tabs>
      
      <div className="flex items-center gap-2">
        <Button 
          onClick={onSubmit} 
          disabled={disabled || !value.trim()}
          className="flex-1"
          data-testid="button-solve"
        >
          <Calculator className="h-4 w-4 mr-2" />
          Solve Step-by-Step
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        Press <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">Ctrl+Enter</kbd> to solve
      </p>
    </div>
  );
}
