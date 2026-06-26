export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  content: string[];
};

export const articles: Article[] = [
  {
    slug: "as-ballpark-rising-las-vegas-strip",
    title: "A's Ballpark Rising on the Las Vegas Strip",
    excerpt:
      "New photos show the Athletics' $2 billion domed ballpark is now visibly becoming part of the Las Vegas Strip skyline. Construction photos taken June 22 show the structure going vertical, with the 33,000-seat facility on track for the 2028 Opening Day.",
    date: "June 22, 2026",
    category: "Stadium",
    content: [
      "New construction photos taken June 22 reveal that the Athletics' $2 billion domed ballpark is now a visible part of the Las Vegas Strip skyline. What was once a construction site behind barriers is rapidly becoming one of the most anticipated sports venues in North America.",
      "The 33,000-seat facility, located near the former Tropicana site, is going vertical with steel framework and the distinctive domed roof structure now taking shape. Engineers and construction crews have been working around the clock to keep the project on schedule for the Athletics' targeted 2028 Opening Day in Las Vegas.",
      "Team officials have emphasized that the ballpark will be a climate-controlled, year-round destination designed for the desert environment — a major departure from the open-air experience in Oakland. Renderings show a modern facility with sweeping views of the Strip and integrated entertainment spaces.",
      "For Las Vegas Athletics fans, the visible progress is a tangible sign that the franchise's relocation is no longer a distant promise. With each new beam raised, the dream of Major League Baseball on the Las Vegas Strip moves closer to reality.",
    ],
  },
  {
    slug: "zack-gelof-hit-streak-ends-injury",
    title: "Zack Gelof's 24-Game Hit Streak Ends After Injury",
    excerpt:
      "A's second baseman Zack Gelof's impressive 24-game hitting streak — the longest active streak in the majors — came to a painful end Tuesday night after he was spiked on his right hand.",
    date: "June 22, 2026",
    category: "Team News",
    content: [
      "Athletics second baseman Zack Gelof saw his remarkable 24-game hitting streak come to an abrupt and painful end Tuesday night after he was spiked on his right hand during a play at second base.",
      "Gelof's streak was the longest active run in Major League Baseball, elevating him into the national conversation as one of the game's hottest hitters. Over the 24-game stretch, he consistently delivered at the plate and anchored the middle of the Athletics lineup.",
      "The injury occurred on a hard slide into second. Gelof remained in the game briefly but was removed shortly after as a precaution. Initial reports suggest no fracture, though swelling and bruising will require monitoring over the coming days.",
      "Manager and front office officials have not yet placed Gelof on the injured list, but his availability for the upcoming series remains uncertain. For a young Athletics core building toward the Las Vegas era, keeping Gelof healthy is a top priority.",
    ],
  },
  {
    slug: "aviators-pcl-first-half-title",
    title: "Aviators Claim First-Half PCL Title with A's Prospects Leading the Way",
    excerpt:
      "The Las Vegas Aviators claimed the first-half Pacific Coast League title, powered by top Athletics prospects who've already shown they can produce at the big league level. The Aviators will host a playoff series starting September 22.",
    date: "June 22, 2026",
    category: "Prospects",
    content: [
      "The Las Vegas Aviators have claimed the first-half Pacific Coast League title, cementing their status as one of the top farm clubs in all of Minor League Baseball and offering a preview of the talent pipeline feeding the future Las Vegas Athletics.",
      "Powered by top Athletics prospects who have already demonstrated they can produce at the big league level, the Aviators dominated the first half with strong pitching, timely hitting, and depth across the roster.",
      "Several Aviators players have made multiple trips to Oakland this season, gaining valuable MLB experience before the franchise's permanent move to Las Vegas. That cycle of development — prospects playing in Las Vegas before starring for the big league club — is exactly what the organization envisioned.",
      "The Aviators will host a playoff series beginning September 22 at Las Vegas Ballpark in Summerlin. For local fans, it's another opportunity to see future Athletics stars on home soil before the 2028 MLB debut on the Strip.",
    ],
  },
  {
    slug: "as-contingency-plan-ballys-plaza-2028",
    title: "A's Have Contingency Plan if Bally's Plaza Isn't Ready for 2028",
    excerpt:
      "The Athletics confirmed they have a backup plan if Bally's Corp doesn't complete the planned northwest plaza adjacent to the new ballpark before Opening Day 2028. Fans would access the stadium via existing pedestrian bridges from Excalibur and MGM Grand if needed.",
    date: "June 21, 2026",
    category: "Stadium",
    content: [
      "The Athletics have confirmed they have a contingency plan in place if Bally's Corp does not complete the planned northwest plaza adjacent to the new Las Vegas ballpark before Opening Day 2028.",
      "The mixed-use plaza was envisioned as a central fan gathering space with retail, dining, and entertainment connecting the ballpark to the Strip. However, construction timelines for large-scale developments in Las Vegas can shift, and team officials say they are prepared for multiple scenarios.",
      "If the plaza is not ready, fans would access the stadium via existing pedestrian bridges from the Excalibur and MGM Grand properties. The Athletics stress that the ballpark itself remains on track for 2028 and that the contingency plan ensures a smooth fan experience regardless of the plaza's status.",
      "Bally's Corp has not publicly revised its timeline, but the Athletics' transparency about backup access routes gives fans confidence that Opening Day will proceed as planned — even if the full entertainment district takes longer to deliver.",
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return articles.map((article) => article.slug);
}
