import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ALL_SUBJECTS, getSubjectIcon } from "@/lib/subjects";
import { Link } from "wouter";
import { BookOpen, Calculator, Zap } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export default function Home() {
  return (
    <AppShell>
      {/* Hero Section */}
      <div className="mb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-hero font-bold text-foreground leading-tight">
              Master Math with{" "}
              <span className="text-primary">Step-by-Step</span> Solutions
            </h1>
            <p className="text-body font-serif text-muted-foreground max-w-xl">
              Open-source academic platform for Computer Science and Data Science students.
              Learn Linear Algebra, Calculus, and Discrete Math with detailed, interactive solutions.
            </p>
            <div className="flex gap-4">
              <Link href="/kb">
                <Button size="lg" data-testid="button-get-started">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Browse Topics
                </Button>
              </Link>
              <Link href="/linear-algebra">
                <Button variant="outline" size="lg" data-testid="button-try-solver">
                  <Calculator className="h-5 w-5 mr-2" />
                  Try Solver
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full h-80 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border-2 border-primary/20">
              <div className="text-6xl font-serif text-primary/30">
                ∑ ∫ ∂ ∇
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
        <Card className="p-6 text-center border-card-border">
          <div className="text-3xl font-bold text-primary mb-2">8+</div>
          <div className="text-sm text-muted-foreground font-medium">Topics Available</div>
        </Card>
        <Card className="p-6 text-center border-card-border">
          <div className="text-3xl font-bold text-primary mb-2">4</div>
          <div className="text-sm text-muted-foreground font-medium">Subject Areas</div>
        </Card>
        <Card className="p-6 text-center border-card-border">
          <div className="text-3xl font-bold text-primary mb-2">∞</div>
          <div className="text-sm text-muted-foreground font-medium">Step-by-Step Solutions</div>
        </Card>
      </div>

      {/* Subject Cards */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-section font-bold text-foreground mb-8">Explore Subjects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {ALL_SUBJECTS.map((subject) => {
            const Icon = getSubjectIcon(subject.icon);
            return (
              <Link key={subject.id} href={subject.route}>
                <Card className="p-8 hover:shadow-lg transition-all duration-200 cursor-pointer border-card-border hover-elevate active-elevate-2 h-full" data-testid={`card-subject-${subject.id}`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {subject.name}
                      </h3>
                      <p className="text-sm text-muted-foreground font-serif">
                        {subject.description}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full justify-start text-primary hover:bg-primary/5" data-testid={`button-start-${subject.id}`}>
                    Start Learning →
                  </Button>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Features */}
      <div className="mt-20 max-w-5xl mx-auto">
        <h2 className="text-section font-bold text-foreground mb-8 text-center">Why SigmaLearn?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Step-by-Step Solutions</h3>
            <p className="text-sm text-muted-foreground font-serif">
              Understand every step of the solving process with detailed explanations and rules.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Comprehensive Topics</h3>
            <p className="text-sm text-muted-foreground font-serif">
              Curated content covering essential concepts for CS and Data Science students.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Interactive Solver</h3>
            <p className="text-sm text-muted-foreground font-serif">
              Try your own problems with our LaTeX and plain-text math input.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
