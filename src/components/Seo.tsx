import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://themangoseed.vercel.app';
const SITE_NAME = 'The Mango Seed';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const TWITTER_HANDLE = '@TheMangoSeed';

export interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'book' | 'article' | 'profile';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
}

export default function Seo({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd,
  noIndex = false,
}: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title === SITE_NAME ? title : `${title} — ${SITE_NAME}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  const schemas = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export { SITE_URL, SITE_NAME };
