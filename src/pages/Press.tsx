import { motion } from 'framer-motion';
import { Download, Image as ImageIcon, FileText, Mail } from 'lucide-react';
import Seo from '../components/Seo';

const SHORT_BIO = `Dhruv Jain is the author of The Mango Seed, a novel that weaves the wisdom of 100 great books into one story. He is the Chairman of Ziqsy Group, a technology and AI company operating across Ireland, Dubai, and the UK.`;

const MEDIUM_BIO = `Dhruv Jain spent two decades in global banking before founding the Ziqsy Group, a technology and AI firm operating across Ireland, Dubai, and the UK. His health-tech arm, Ziqsy Health AI, has been granted twelve patents. The Mango Seed — his debut novel — was written as a gift for his son Ved's eleventh birthday and grew into a forty-chapter book that distils the wisdom of one hundred classics into the life of one fictional man: Arjun, a boy from a Rajasthan village who becomes a grandfather worth listening to.`;

const LONG_BIO = `Dhruv Jain is an author and entrepreneur. After two decades in global banking, he founded the Ziqsy Group — a technology, AI, and health-tech company headquartered across Ireland, Dubai, and the UK. His health-tech division, Ziqsy Health AI, holds twelve patents in clinical workflow and diagnostics.

The Mango Seed is his debut novel. It began as a private gift: a story written for his son Ved's eleventh birthday on 13 July 2026, designed to pass down the lessons of a hundred great books in the form a child could one day grow into. Over its forty chapters, it follows Arjun — a boy raised under a 200-year-old mango tree in Rampur, Rajasthan — through every season of a long life. Twenty "Core Laws of Life" emerge, drawn from voices as varied as Marcus Aurelius, Viktor Frankl, James Clear, Morgan Housel, Paulo Coelho and Eckhart Tolle.

The Mango Seed releases worldwide on 13 July 2026, in paperback, hardcover collector's edition, e-book, and audiobook. Dhruv lives between Dubai, London, and Dublin with his family.`;

const KEY_FACTS = [
  ['Title', 'The Mango Seed'],
  ['Subtitle', 'A Life Lived in Full'],
  ['Author', 'Dhruv Jain'],
  ['Genre', 'Literary fiction with wisdom & self-development threads'],
  ['Release date', '13 July 2026'],
  ['Chapters', '40'],
  ['Length', 'Approx. 384 pages'],
  ['Formats', 'Paperback, hardcover collector’s edition, e-book, audiobook'],
  ['Themes', '20 Core Laws of Life distilled from 100 great books'],
  ['Setting', 'Rampur, Rajasthan, and beyond'],
];

const PRESS_QUOTES = [
  '"A novel that reads like a grandfather’s voice you wish you had heard sooner."',
  '"The wisdom of a hundred books, distilled into a single life."',
  '"Quiet, generous, surprisingly hard to put down."',
];

interface AssetCard {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
  download?: boolean;
}

const assets: AssetCard[] = [
  {
    icon: <ImageIcon size={20} />,
    title: 'Author headshot',
    desc: '1200×1599 · JPEG',
    href: '/author-dhruv.jpg',
    download: true,
  },
  {
    icon: <ImageIcon size={20} />,
    title: 'Book cover',
    desc: 'Hi-res · PNG',
    href: '/book-cover-mockup.jpg',
    download: true,
  },
  {
    icon: <ImageIcon size={20} />,
    title: 'Social card',
    desc: '1200×630 · JPEG',
    href: '/og-image.jpg',
    download: true,
  },
];

function copyToClipboard(text: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => {});
  }
}

export default function Press() {
  return (
    <main>
      <Seo
        title="Press Kit"
        description="Press kit for The Mango Seed by Dhruv Jain. Downloadable author photo, book cover, short and long bios, and key facts for journalists, podcasters, and reviewers."
        path="/press"
      />

      {/* Hero */}
      <section className="section-lg" style={{ backgroundColor: '#2C2417' }}>
        <div className="mx-auto px-6 lg:px-12 text-center" style={{ maxWidth: '900px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: '#D4A853' }}
            >
              &mdash;&mdash;&mdash; PRESS KIT
            </div>
            <h1
              className="font-playfair font-semibold mb-5"
              style={{
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                lineHeight: 1.05,
                letterSpacing: '-0.015em',
                color: '#FDF6E3',
              }}
            >
              For journalists &amp; reviewers.
            </h1>
            <p
              className="font-source-serif max-w-[640px] mx-auto"
              style={{ fontSize: '17px', lineHeight: 1.7, color: '#E8D5B7' }}
            >
              Everything you need to write about The Mango Seed: bios in three lengths, hi-res assets,
              key facts, and a direct line to the author for interviews and review copies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="section-lg" style={{ backgroundColor: '#F5ECD7' }}>
        <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '1100px' }}>
          <h2
            className="font-playfair font-semibold mb-8"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 40px)',
              color: '#3A5233',
            }}
          >
            At a glance
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
            {KEY_FACTS.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-2" style={{ borderBottom: '1px solid rgba(107,76,59,0.15)' }}>
                <dt
                  className="font-inter text-[11px] font-semibold uppercase tracking-[0.1em] shrink-0"
                  style={{ color: '#8B6F5E', paddingTop: '4px' }}
                >
                  {k}
                </dt>
                <dd
                  className="font-source-serif text-right"
                  style={{ fontSize: '15px', lineHeight: 1.5, color: '#3A5233' }}
                >
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Bios */}
      <section className="section-lg" style={{ backgroundColor: '#FDF6E3' }}>
        <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '1100px' }}>
          <h2
            className="font-playfair font-semibold mb-10"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 40px)',
              color: '#3A5233',
            }}
          >
            Author bios
          </h2>

          {[
            { label: 'Short · ~50 words', body: SHORT_BIO },
            { label: 'Medium · ~120 words', body: MEDIUM_BIO },
            { label: 'Long · ~280 words', body: LONG_BIO },
          ].map((b) => (
            <div key={b.label} className="mb-10">
              <div className="flex items-center justify-between mb-3">
                <p
                  className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: '#D4A853' }}
                >
                  {b.label}
                </p>
                <button
                  onClick={() => copyToClipboard(b.body)}
                  className="font-inter text-[11px] font-semibold uppercase tracking-[0.08em] px-3 py-1.5 rounded transition-colors"
                  style={{ color: '#6B4C3B', border: '1px solid rgba(107,76,59,0.3)' }}
                  aria-label={`Copy ${b.label} bio`}
                >
                  Copy
                </button>
              </div>
              <p
                className="font-source-serif"
                style={{ fontSize: '17px', lineHeight: 1.75, color: '#3A5233', whiteSpace: 'pre-line' }}
              >
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Downloads */}
      <section className="section-lg" style={{ backgroundColor: '#F5ECD7' }}>
        <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '1100px' }}>
          <h2
            className="font-playfair font-semibold mb-3"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 40px)',
              color: '#3A5233',
            }}
          >
            Downloads
          </h2>
          <p className="font-source-serif mb-8" style={{ color: '#6B4C3B', fontSize: '15px' }}>
            Right-click and save, or click to download.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {assets.map((a) => (
              <a
                key={a.title}
                href={a.href}
                download={a.download ? '' : undefined}
                className="block rounded-lg p-5 transition-all duration-300 hover:-translate-y-1"
                style={{ backgroundColor: '#FDF6E3', border: '1px solid #E8D5B7' }}
              >
                <div className="flex items-center justify-between mb-3" style={{ color: '#D4A853' }}>
                  {a.icon}
                  <Download size={16} />
                </div>
                <p className="font-source-serif font-semibold mb-1" style={{ color: '#3A5233', fontSize: '15px' }}>
                  {a.title}
                </p>
                <p className="font-inter text-[11px]" style={{ color: '#8B6F5E' }}>
                  {a.desc}
                </p>
              </a>
            ))}

            <a
              href="/sample-chapter.pdf"
              className="block rounded-lg p-5 transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: '#FDF6E3', border: '1px solid #E8D5B7' }}
            >
              <div className="flex items-center justify-between mb-3" style={{ color: '#D4A853' }}>
                <FileText size={20} />
                <Download size={16} />
              </div>
              <p className="font-source-serif font-semibold mb-1" style={{ color: '#3A5233', fontSize: '15px' }}>
                Sample chapters
              </p>
              <p className="font-inter text-[11px]" style={{ color: '#8B6F5E' }}>
                Coming soon &middot; PDF
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Pull quotes */}
      <section className="section-lg" style={{ backgroundColor: '#FDF6E3' }}>
        <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '900px' }}>
          <h2
            className="font-playfair font-semibold mb-8"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 40px)',
              color: '#3A5233',
            }}
          >
            Pull quotes
          </h2>
          <p className="font-inter text-[11px] uppercase tracking-[0.12em] mb-6" style={{ color: '#8B6F5E' }}>
            Use freely · attribute to the book where relevant
          </p>
          <ul className="space-y-6">
            {PRESS_QUOTES.map((q, i) => (
              <li
                key={i}
                className="font-cormorant italic"
                style={{
                  fontSize: 'clamp(20px, 2.5vw, 26px)',
                  lineHeight: 1.5,
                  color: '#3A5233',
                  borderLeft: '3px solid #D4A853',
                  paddingLeft: '20px',
                }}
              >
                {q}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section className="section-lg" style={{ backgroundColor: '#2C2417' }}>
        <div className="mx-auto px-6 lg:px-12 text-center" style={{ maxWidth: '700px' }}>
          <div
            className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
            style={{ color: '#D4A853' }}
          >
            &mdash;&mdash;&mdash; PRESS ENQUIRIES
          </div>
          <h2
            className="font-playfair font-semibold mb-5"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              color: '#FDF6E3',
              lineHeight: 1.1,
            }}
          >
            Need an interview, review copy, or quote?
          </h2>
          <a
            href="mailto:press@themangoseed.com"
            className="inline-flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-[0.12em] px-8 py-3.5 rounded transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: '#D4A853', color: '#2C2417' }}
          >
            <Mail size={15} />
            press@themangoseed.com
          </a>
        </div>
      </section>
    </main>
  );
}
