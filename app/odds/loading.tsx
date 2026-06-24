import { CardSkeleton, TableSkeleton } from "@/components/ui/Skeleton";

export default function OddsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 border-b border-white/10 pb-8">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-white/10" />
        <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded-lg bg-white/10" />
      </div>
      <TableSkeleton rows={6} />
    </div>
  );
}
