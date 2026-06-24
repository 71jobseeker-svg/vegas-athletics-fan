import NewsCard from "@/components/NewsCard";
import PageHeader from "@/components/PageHeader";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "News",
  description:
    "Latest Las Vegas Athletics news and updates. Stay informed on Vegas Athletics MLB relocation, stadium developments, roster moves, and fan community news.",
  path: "/news",
});

const articles = [
  {
    title: "Las Vegas Athletics Stadium Plans Take Shape",
    excerpt:
      "The proposed ballpark on the Las Vegas Strip continues to generate excitement among fans as renderings and timeline details emerge. The state-of-the-art facility promises to be a crown jewel of MLB venues.",
    date: "Jun 20, 2026",
    category: "Stadium",
  },
  {
    title: "Vegas A's Relocation: What Fans Need to Know",
    excerpt:
      "Everything you need to know about the Athletics' move from Oakland to Las Vegas, including key dates, ticket information, and what it means for the fan experience in Sin City.",
    date: "Jun 15, 2026",
    category: "Relocation",
  },
  {
    title: "Building a Fan Base in the Desert",
    excerpt:
      "Las Vegas sports fans are ready to embrace Major League Baseball. Here's how the Vegas Athletics community is growing across Nevada and beyond.",
    date: "Jun 10, 2026",
    category: "Community",
  },
  {
    title: "What the Move Means for the AL West",
    excerpt:
      "The Las Vegas Athletics' arrival reshapes the American League West landscape. We break down how the Vegas A's will impact rivalries and travel schedules.",
    date: "Jun 5, 2026",
    category: "Analysis",
  },
  {
    title: "Top Prospects to Watch for Vegas A's",
    excerpt:
      "The Athletics farm system is loaded with talent. These rising stars could make an impact when the team takes the field in Las Vegas.",
    date: "May 28, 2026",
    category: "Prospects",
  },
  {
    title: "Las Vegas Embraces Major League Baseball",
    excerpt:
      "From the Golden Knights to the Raiders, Las Vegas has proven it can support big-league sports. Now it's baseball's turn with the Las Vegas Athletics.",
    date: "May 20, 2026",
    category: "Community",
  },
];

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        title="News"
        subtitle="The latest headlines, analysis, and updates from the Las Vegas Athletics world."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.title} {...article} />
        ))}
      </div>
    </div>
  );
}
