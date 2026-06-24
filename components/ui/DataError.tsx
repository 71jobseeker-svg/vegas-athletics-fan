export default function DataError({
  title = "Unable to load data",
  message,
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
      <p className="font-medium text-red-300">{title}</p>
      {message && <p className="mt-2 text-sm text-red-400/80">{message}</p>}
    </div>
  );
}
