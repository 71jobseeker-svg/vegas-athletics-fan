import { CardSkeleton } from "@/components/ui/Skeleton";

export default function TodayLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 border-b border-white/10 pb-8">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-white/10" />
        <div className="mt-3 h-5 w-full max-w-lg animate-pulse rounded-lg bg-white/10" />
      </div>
      <div className="space-y-8">
        <CardSkeleton />
        <div className="grid gap-8 lg:grid-cols-2">
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <CardSkeleton />
      </div>
    </div>
  );
}
