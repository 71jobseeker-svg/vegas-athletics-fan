import type { Metadata } from "next";

const SITE_NAME = "Las Vegas Athletics Fan Central";
const SITE_URL = "https://www.vegasathleticsmlb.com";

const KEYWORDS = [
  "Las Vegas Athletics",
  "Vegas Athletics MLB",
  "Vegas A's",
  "Las Vegas A's",
  "Vegas Athletics",
  "MLB Las Vegas",
  "Athletics relocation",
  "Vegas baseball",
  "Las Vegas Athletics Opening Day 2028",
  "Vegas A's news",
  "Las Vegas Athletics roster",
  "Las Vegas Athletics schedule",
];

const DEFAULT_TITLE =
  "Las Vegas Athletics Fan Central | Vegas A's News & Updates";
const DEFAULT_DESCRIPTION =
  "Your #1 fan site for the Las Vegas Athletics. News, roster, schedule, odds and countdown to Opening Day 2028.";

export function createDefaultMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    keywords: KEYWORDS,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function createPageMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const pageUrl = path ? `${SITE_URL}${path}` : SITE_URL;

  return {
    title: fullTitle,
    description,
    keywords: KEYWORDS,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: path || "/",
    },
    openGraph: {
      title: fullTitle,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export { SITE_NAME, SITE_URL, KEYWORDS, DEFAULT_TITLE, DEFAULT_DESCRIPTION };
