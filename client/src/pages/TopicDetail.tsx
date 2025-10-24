import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { AppShell } from "@/components/AppShell";
import { ErrorState } from "@/components/ErrorState";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { MathInput } from "@/components/MathInput";
import { StepsView } from "@/components/StepsView";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { loadTopic } from "@/lib/content";
import { solve } from "@/lib/api";
import { Topic, SolveResponse } from "@shared/schema";
import { SUBJECT_METADATA } from "@/lib/subjects";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default function TopicDetail() {
  const [location] = useLocation();
  // Extract slug from URL: /topic/subject/topic-name -> subject/topic-name
  const slug = location.startsWith("/topic/") ? location.slice(7) : "";
  
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [solving, setSolving] = useState(false);
  const [solution, setSolution] = useState<SolveResponse | null>(null);

  useEffect(() => {
    async function load() {
      if (!slug) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const loadedTopic = await loadTopic(slug);
      setTopic(loadedTopic);
      setLoading(false);
    }
    load();
  }, [slug]);

  const handleSolve = async () => {
    if (!query.trim() || !topic) return;
    
    setSolving(true);
    setSolution(null);
    
    try {
      const subject = SUBJECT_METADATA[topic.frontmatter.subject];
      const response = await solve({
        subject: subject.key,
        query: query.trim(),
        mode: "auto",
      });
      
      if (response.ok) {
        setSolution(response);
      }
    } catch (err) {
      console.error("Solve error:", err);
    } finally {
      setSolving(false);
    }
  };

  if (loading) {
    return (
      <AppShell>
        <LoadingSkeleton />
      </AppShell>
    );
  }

  if (!topic) {
    return (
      <AppShell>
        <ErrorState
          title="Topic not found"
          message="The requested topic does not exist."
        />
      </AppShell>
    );
  }

  const subject = SUBJECT_METADATA[topic.frontmatter.subject];

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Link href={subject.route}>
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {subject.name}
            </Button>
          </Link>
        </div>

        {/* Topic Header */}
        <div className="text-center mb-8">
          <h1 className="text-page-title font-bold text-foreground mb-4">
            {topic.frontmatter.title}
          </h1>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline" data-testid="badge-subject">
              {subject.name}
            </Badge>
            <Badge variant="secondary" data-testid="badge-level">
              {topic.frontmatter.level}
            </Badge>
            {topic.frontmatter.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs" data-testid={`badge-tag-${tag}`}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Content */}
        <Card className="p-8 mb-8 border-card-border">
          <div 
            className="prose prose-lg max-w-none font-serif"
            data-testid="topic-content"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {topic.content}
            </ReactMarkdown>
          </div>
        </Card>

        {/* Try It Section */}
        <Card className="p-8 border-card-border bg-muted/30">
          <h2 className="text-section font-semibold text-foreground mb-6">
            Try It Yourself
          </h2>
          <div className="space-y-6">
            <MathInput
              value={query}
              onChange={setQuery}
              onSubmit={handleSolve}
              disabled={solving}
              placeholder="Enter a problem related to this topic..."
            />
            
            {solving && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-sm text-muted-foreground mt-4">Solving...</p>
              </div>
            )}
            
            {solution && !solving && (
              <StepsView steps={solution.steps} result={solution.result_latex} />
            )}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
