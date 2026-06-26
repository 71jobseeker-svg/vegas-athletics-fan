import NewsCard from "@/components/NewsCard";
import PageHeader from "@/components/PageHeader";
import { articles } from "@/lib/articles";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Las Vegas Athletics News — Vegas A's Headlines",
  description:
    "Latest Las Vegas Athletics news and Vegas A's headlines. Stadium updates, roster moves, prospect news, and everything happening with the Athletics MLB relocation to Las Vegas.",
  path: "/news",
});

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        title="News"
        subtitle="The latest headlines, analysis, and updates from the Las Vegas Athletics world."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.slug} {...article} />
        ))}
      </div>
    </div>
  );
}
