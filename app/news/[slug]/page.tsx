import Link from "next/link";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return createPageMetadata({
      title: "Article Not Found",
      description: "The requested Las Vegas Athletics news article could not be found.",
      path: `/news/${slug}`,
    });
  }

  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/news/${article.slug}`,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <span className="rounded-full bg-athletics-green/20 px-3 py-1 text-xs font-medium text-athletics-gold">
          {article.category}
        </span>
        <time className="text-sm text-zinc-500">{article.date}</time>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {article.title}
      </h1>

      <div className="mt-8 space-y-6 border-t border-white/10 pt-8">
        {article.content.map((paragraph, index) => (
          <p key={index} className="text-base leading-relaxed text-zinc-300">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-12 border-t border-white/10 pt-8">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 rounded-lg bg-athletics-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-athletics-green/90"
        >
          &larr; Back to News
        </Link>
      </div>
    </div>
  );
}
