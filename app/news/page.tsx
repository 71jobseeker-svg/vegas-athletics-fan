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
    title: "A's Ballpark Rising on the Las Vegas Strip",
    excerpt:
      "New photos show the Athletics' $2 billion domed ballpark is now visibly becoming part of the Las Vegas Strip skyline. Construction photos taken June 22 show the structure going vertical, with the 33,000-seat facility on track for the 2028 Opening Day.",
    date: "June 22, 2026",
    category: "Stadium",
  },
  {
    title: "Zack Gelof's 24-Game Hit Streak Ends After Injury",
    excerpt:
      "A's second baseman Zack Gelof's impressive 24-game hitting streak — the longest active streak in the majors — came to a painful end Tuesday night after he was spiked on his right hand.",
    date: "June 22, 2026",
    category: "Team News",
  },
  {
    title: "Aviators Claim First-Half PCL Title with A's Prospects Leading the Way",
    excerpt:
      "The Las Vegas Aviators claimed the first-half Pacific Coast League title, powered by top Athletics prospects who've already shown they can produce at the big league level. The Aviators will host a playoff series starting September 22.",
    date: "June 22, 2026",
    category: "Prospects",
  },
  {
    title: "A's Have Contingency Plan if Bally's Plaza Isn't Ready for 2028",
    excerpt:
      "The Athletics confirmed they have a backup plan if Bally's Corp doesn't complete the planned northwest plaza adjacent to the new ballpark before Opening Day 2028. Fans would access the stadium via existing pedestrian bridges from Excalibur and MGM Grand if needed.",
    date: "June 21, 2026",
    category: "Stadium",
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
