import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Topic } from "@shared/schema";
import { SUBJECT_METADATA } from "@/lib/subjects";
import { BookOpen } from "lucide-react";

interface TopicCardProps {
  topic: Topic;
}

export function TopicCard({ topic }: TopicCardProps) {
  const subject = SUBJECT_METADATA[topic.frontmatter.subject];
  
  return (
    <Link href={`/topic/${topic.slug}`}>
      <Card 
        className="p-6 hover:shadow-md transition-all duration-200 cursor-pointer border-card-border hover-elevate active-elevate-2 h-full flex flex-col"
        data-testid={`card-topic-${topic.slug}`}
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-base leading-tight mb-1 line-clamp-2">
                {topic.frontmatter.title}
              </h3>
            </div>
          </div>
        </div>
        
        {topic.frontmatter.description && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 font-serif">
            {topic.frontmatter.description}
          </p>
        )}
        
        <div className="flex flex-wrap gap-2 mt-auto">
          <Badge variant="outline" className="text-xs" data-testid={`badge-subject-${topic.slug}`}>
            {subject.name}
          </Badge>
          <Badge variant="secondary" className="text-xs" data-testid={`badge-level-${topic.slug}`}>
            {topic.frontmatter.level}
          </Badge>
        </div>
        
        {topic.frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border">
            {topic.frontmatter.tags.slice(0, 3).map(tag => (
              <span 
                key={tag} 
                className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded"
                data-testid={`tag-${topic.slug}-${tag}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Card>
    </Link>
  );
}
