"use client";

import DataError from "@/components/ui/DataError";

export default function OddsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <DataError title="Odds failed to load" message={error.message} />
      <button
        onClick={reset}
        className="mt-4 rounded-lg bg-athletics-green px-4 py-2 text-sm font-medium text-white hover:bg-athletics-green/90"
      >
        Try again
      </button>
    </div>
  );
}
