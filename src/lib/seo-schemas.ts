import { SITE_URL } from '../components/Seo';

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dhruv Jain',
  url: `${SITE_URL}/author`,
  image: `${SITE_URL}/author-dhruv.jpg`,
  jobTitle: 'Author',
  description:
    'Author of The Mango Seed. Chairman of Ziqsy Group (Ireland, Dubai, UK). Two decades in banking; technology, AI, and health-tech entrepreneur.',
  worksFor: {
    '@type': 'Organization',
    name: 'Ziqsy Group',
  },
  sameAs: [],
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Mango Seed',
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  founder: { '@type': 'Person', name: 'Dhruv Jain' },
};

export const bookSchema = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: 'The Mango Seed',
  alternateName: 'The Mango Seed: A Life Lived in Full',
  bookFormat: 'https://schema.org/Paperback',
  numberOfPages: 384,
  inLanguage: 'en',
  datePublished: '2026-07-13',
  description:
    'The Mango Seed is a novel that weaves the wisdom of 100 great books into one story — Arjun’s life from a Rajasthan village to a life lived in full. Forty chapters. Twenty Core Laws of Life.',
  image: `${SITE_URL}/og-image.jpg`,
  url: `${SITE_URL}/book`,
  author: {
    '@type': 'Person',
    name: 'Dhruv Jain',
    url: `${SITE_URL}/author`,
  },
  publisher: {
    '@type': 'Organization',
    name: 'The Mango Seed',
  },
  workExample: [
    {
      '@type': 'Book',
      bookFormat: 'https://schema.org/EBook',
      inLanguage: 'en',
      isbn: '',
      potentialAction: {
        '@type': 'ReadAction',
        target: `${SITE_URL}/preorder`,
      },
    },
    {
      '@type': 'Book',
      bookFormat: 'https://schema.org/Paperback',
      inLanguage: 'en',
      isbn: '',
    },
    {
      '@type': 'Book',
      bookFormat: 'https://schema.org/Hardcover',
      inLanguage: 'en',
      isbn: '',
    },
    {
      '@type': 'Book',
      bookFormat: 'https://schema.org/AudiobookFormat',
      inLanguage: 'en',
      isbn: '',
    },
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'The Mango Seed',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};
