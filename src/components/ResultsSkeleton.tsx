import { Skeleton } from "@/components/ui/skeleton";

export function ResultsSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-24" />
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-4 border-b border-border last:border-0 grid grid-cols-12 gap-4 items-center">
          <div className="col-span-5 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <div className="col-span-3"><Skeleton className="h-6 w-24" /></div>
          <div className="col-span-2"><Skeleton className="h-4 w-16" /></div>
          <div className="col-span-2"><Skeleton className="h-8 w-20 ml-auto" /></div>
        </div>
      ))}
    </div>
  );
}
