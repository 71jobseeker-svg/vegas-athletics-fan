import type { Metadata } from "next";

const SITE_NAME = "Las Vegas Athletics Fan Central";
const SITE_URL = "https://vegasathleticsmlb.com";

const KEYWORDS = [
  "Las Vegas Athletics",
  "Vegas Athletics MLB",
  "Vegas A's",
  "Las Vegas A's",
  "Vegas Athletics",
  "MLB Las Vegas",
  "Athletics relocation",
  "Vegas baseball",
];

export function createPageMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords: KEYWORDS,
    authors: [{ name: "Las Vegas Athletics Fan Central" }],
    creator: "Las Vegas Athletics Fan Central",
    publisher: "Las Vegas Athletics Fan Central",
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: path || "/",
    },
    openGraph: {
      title: fullTitle,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export { SITE_NAME, SITE_URL, KEYWORDS };
