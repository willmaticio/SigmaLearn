import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { AppShell } from "@/components/AppShell";
import { TopicCard } from "@/components/TopicCard";
import { MathInput } from "@/components/MathInput";
import { StepsView } from "@/components/StepsView";
import { ExampleViewer } from "@/components/ExampleViewer";
import { ErrorState } from "@/components/ErrorState";
import { LoadingSkeleton, TopicCardSkeleton } from "@/components/LoadingSkeleton";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SUBJECT_METADATA, getSubjectIcon } from "@/lib/subjects";
import { loadTopicsBySubject } from "@/lib/content";
import { solve } from "@/lib/api";
import { EXAMPLES } from "@/lib/examples";
import { Topic, SolveResponse, Example, Subject, SubjectKey } from "@shared/schema";

export default function SubjectHub() {
  const [match, params] = useRoute("/:subject");
  const subjectId = params?.subject as Subject;
  const subject = SUBJECT_METADATA[subjectId];
  
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [solving, setSolving] = useState(false);
  const [solution, setSolution] = useState<SolveResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const loadedTopics = await loadTopicsBySubject(subjectId);
      setTopics(loadedTopics);
      setLoading(false);
    }
    if (subjectId) load();
  }, [subjectId]);

  const handleSolve = async () => {
    if (!query.trim()) return;
    
    setSolving(true);
    setError(null);
    setSolution(null);
    
    try {
      const response = await solve({
        subject: subject.key as SubjectKey,
        query: query.trim(),
        mode: "auto",
      });
      
      if (!response.ok) {
        setError(response.errors?.join(", ") || "Failed to solve");
      } else {
        setSolution(response);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSolving(false);
    }
  };

  const handleSelectExample = (example: Example) => {
    setQuery(example.query);
    setSolution(null);
    setError(null);
  };

  if (!subject) {
    return (
      <AppShell>
        <ErrorState
          title="Subject not found"
          message="The requested subject does not exist."
        />
      </AppShell>
    );
  }

  const Icon = getSubjectIcon(subject.icon);
  const examples = EXAMPLES[subject.key as SubjectKey] || [];

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-page-title font-bold text-foreground">
                {subject.name}
              </h1>
              <p className="text-body font-serif text-muted-foreground">
                {subject.description}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Topics Grid - 2 columns */}
          <div className="lg:col-span-2">
            <h2 className="text-section font-semibold text-foreground mb-6">
              Topics
            </h2>
            {loading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => <TopicCardSkeleton key={i} />)}
              </div>
            ) : topics.length === 0 ? (
              <Card className="p-8 text-center border-card-border">
                <p className="text-muted-foreground">No topics available yet.</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {topics.map((topic) => (
                  <TopicCard key={topic.slug} topic={topic} />
                ))}
              </div>
            )}
          </div>

          {/* Solver Panel - 1 column */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 border-card-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Interactive Solver
              </h2>
              
              <Tabs defaultValue="solve">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="solve" data-testid="tab-solve">Solve</TabsTrigger>
                  <TabsTrigger value="examples" data-testid="tab-examples">Examples</TabsTrigger>
                </TabsList>
                
                <TabsContent value="solve" className="space-y-4">
                  <MathInput
                    value={query}
                    onChange={setQuery}
                    onSubmit={handleSolve}
                    disabled={solving}
                  />
                  
                  {error && (
                    <ErrorState message={error} onRetry={handleSolve} />
                  )}
                  
                  {solving && (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      <p className="text-sm text-muted-foreground mt-4">Solving...</p>
                    </div>
                  )}
                  
                  {solution && !solving && (
                    <div className="max-h-[500px] overflow-y-auto">
                      <StepsView steps={solution.steps} result={solution.result_latex} />
                      {solution.warnings.length > 0 && (
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <p className="text-xs text-amber-800 font-medium">Warnings:</p>
                          <ul className="text-xs text-amber-700 mt-1 space-y-1">
                            {solution.warnings.map((w, i) => <li key={i}>• {w}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="examples">
                  <ExampleViewer examples={examples} onSelectExample={handleSelectExample} />
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
