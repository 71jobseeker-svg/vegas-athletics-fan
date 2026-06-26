import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { SITE_URL } from "@/lib/metadata";

const routes = [
  { path: "", priority: 1.0, changeFrequency: "daily" as const },
  { path: "/news", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/today", priority: 0.9, changeFrequency: "hourly" as const },
  { path: "/odds", priority: 0.8, changeFrequency: "hourly" as const },
  { path: "/schedule", priority: 0.8, changeFrequency: "daily" as const },
  { path: "/roster", priority: 0.8, changeFrequency: "daily" as const },
  { path: "/giveaway", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const articlePages = articles.map((article) => ({
    url: `${SITE_URL}/news/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
