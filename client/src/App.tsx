import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import KnowledgeBase from "@/pages/KnowledgeBase";
import SubjectHub from "@/pages/SubjectHub";
import TopicDetail from "@/pages/TopicDetail";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/kb" component={KnowledgeBase} />
      <Route path="/about" component={About} />
      <Route path="/linear-algebra" component={SubjectHub} />
      <Route path="/calculus-1" component={SubjectHub} />
      <Route path="/calculus-2" component={SubjectHub} />
      <Route path="/discrete-math" component={SubjectHub} />
      <Route path="/topic/*" component={TopicDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
