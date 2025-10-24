import lunr from "lunr";
import { SearchIndexEntry, Topic } from "@shared/schema";

let searchIndex: lunr.Index | null = null;
let indexedTopics: SearchIndexEntry[] = [];

export function buildSearchIndex(topics: Topic[]): void {
  indexedTopics = topics.map(topic => ({
    slug: topic.slug,
    title: topic.frontmatter.title,
    subject: topic.frontmatter.subject,
    tags: topic.frontmatter.tags,
    level: topic.frontmatter.level,
    content: topic.content,
    description: topic.frontmatter.description,
  }));

  searchIndex = lunr(function() {
    this.ref('slug');
    this.field('title', { boost: 10 });
    this.field('description', { boost: 5 });
    this.field('tags', { boost: 3 });
    this.field('content');

    indexedTopics.forEach(entry => {
      this.add({
        slug: entry.slug,
        title: entry.title,
        description: entry.description || '',
        tags: entry.tags.join(' '),
        content: entry.content,
      });
    });
  });
}

export function searchTopics(query: string): SearchIndexEntry[] {
  if (!searchIndex || !query.trim()) {
    return indexedTopics;
  }

  const results = searchIndex.search(query);
  
  return results
    .map(result => indexedTopics.find(t => t.slug === result.ref))
    .filter((t): t is SearchIndexEntry => t !== undefined);
}

export function filterTopicsBySubject(subject: string): SearchIndexEntry[] {
  return indexedTopics.filter(t => t.subject === subject);
}

export function filterTopicsByTag(tag: string): SearchIndexEntry[] {
  return indexedTopics.filter(t => t.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  indexedTopics.forEach(t => t.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}
