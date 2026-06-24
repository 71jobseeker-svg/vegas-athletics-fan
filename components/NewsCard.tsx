type NewsCardProps = {
  title: string;
  excerpt: string;
  date: string;
  category: string;
};

export default function NewsCard({
  title,
  excerpt,
  date,
  category,
}: NewsCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-athletics-dark transition-all hover:border-athletics-green/40 hover:shadow-lg hover:shadow-athletics-green/10">
      <div className="h-1.5 bg-gradient-to-r from-athletics-green to-athletics-gold" />
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-full bg-athletics-green/20 px-3 py-1 text-xs font-medium text-athletics-gold">
            {category}
          </span>
          <time className="text-xs text-zinc-500">{date}</time>
        </div>
        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-athletics-gold">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
          {excerpt}
        </p>
        <span className="mt-4 text-sm font-medium text-athletics-green transition-colors group-hover:text-athletics-gold">
          Read more &rarr;
        </span>
      </div>
    </article>
  );
}
