import { useState, useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { TopicCard } from "@/components/TopicCard";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { loadAllTopics } from "@/lib/content";
import { buildSearchIndex, searchTopics, getAllTags } from "@/lib/search";
import { Topic } from "@shared/schema";
import { ALL_SUBJECTS } from "@/lib/subjects";

export default function KnowledgeBase() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      const allTopics = await loadAllTopics();
      setTopics(allTopics);
      setFilteredTopics(allTopics);
      buildSearchIndex(allTopics);
      setAllTags(getAllTags());
      setLoading(false);
    }
    loadContent();
  }, []);

  useEffect(() => {
    let results = searchQuery.trim() 
      ? searchTopics(searchQuery).map(entry => 
          topics.find(t => t.slug === entry.slug)
        ).filter((t): t is Topic => t !== undefined)
      : topics;

    if (selectedSubject) {
      results = results.filter(t => t.frontmatter.subject === selectedSubject);
    }

    if (selectedTag) {
      results = results.filter(t => t.frontmatter.tags.includes(selectedTag));
    }

    setFilteredTopics(results);
  }, [searchQuery, selectedSubject, selectedTag, topics]);

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-page-title font-bold text-foreground mb-4">
            Knowledge Base
          </h1>
          <p className="text-body font-serif text-muted-foreground max-w-2xl">
            Browse our collection of mathematical topics. Search by keyword, filter by subject, or explore by tags.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search topics, tags, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
              autoFocus
              data-testid="input-kb-search"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="text-sm text-muted-foreground font-medium mr-2 flex items-center">
              Subjects:
            </div>
            <Badge
              variant={selectedSubject === null ? "default" : "outline"}
              className="cursor-pointer hover-elevate"
              onClick={() => setSelectedSubject(null)}
              data-testid="filter-all"
            >
              All
            </Badge>
            {ALL_SUBJECTS.map((subject) => (
              <Badge
                key={subject.id}
                variant={selectedSubject === subject.id ? "default" : "outline"}
                className="cursor-pointer hover-elevate"
                onClick={() => setSelectedSubject(subject.id)}
                data-testid={`filter-${subject.id}`}
              >
                {subject.name}
              </Badge>
            ))}
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <div className="text-sm text-muted-foreground font-medium mr-2 flex items-center">
                Tags:
              </div>
              {allTags.slice(0, 8).map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "secondary" : "outline"}
                  className="cursor-pointer text-xs hover-elevate"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  data-testid={`tag-filter-${tag}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <LoadingSkeleton />
        ) : filteredTopics.length === 0 ? (
          <EmptyState
            icon="search"
            title="No topics found"
            description="Try adjusting your search query or filters."
          />
        ) : (
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredTopics.length} topic{filteredTopics.length !== 1 ? "s" : ""}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTopics.map((topic) => (
                <TopicCard key={topic.slug} topic={topic} />
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
