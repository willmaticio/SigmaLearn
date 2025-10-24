export function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse" data-testid="loading-skeleton">
      <div className="h-8 bg-muted rounded-lg w-3/4"></div>
      <div className="h-4 bg-muted rounded w-full"></div>
      <div className="h-4 bg-muted rounded w-5/6"></div>
      <div className="h-4 bg-muted rounded w-4/6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-48 bg-muted rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
}

export function TopicCardSkeleton() {
  return (
    <div className="p-6 border border-card-border rounded-2xl animate-pulse" data-testid="skeleton-topic-card">
      <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-muted rounded w-full mb-2"></div>
      <div className="h-4 bg-muted rounded w-5/6 mb-4"></div>
      <div className="flex gap-2">
        <div className="h-6 bg-muted rounded w-20"></div>
        <div className="h-6 bg-muted rounded w-24"></div>
      </div>
    </div>
  );
}
