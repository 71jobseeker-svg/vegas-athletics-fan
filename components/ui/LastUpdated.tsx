import { formatFetchedAt } from "@/lib/format";

export default function LastUpdated({
  timestamp,
  label = "Last updated",
}: {
  timestamp: string;
  label?: string;
}) {
  return (
    <p className="text-xs text-zinc-500">
      {label}: {formatFetchedAt(timestamp)}
    </p>
  );
}
