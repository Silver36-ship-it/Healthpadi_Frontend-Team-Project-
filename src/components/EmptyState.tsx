import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ title, description, actionLabel, onAction }: { title: string; description: string; actionLabel?: string; onAction?: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center">
      <div className="mx-auto mb-6 relative w-24 h-24">
        <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-full blur-2xl" />
        <div className="relative w-full h-full rounded-full bg-accent flex items-center justify-center">
          <SearchX className="h-10 w-10 text-primary" strokeWidth={1.5} />
        </div>
      </div>
      <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mx-auto mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline">{actionLabel}</Button>
      )}
    </div>
  );
}
