import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <main
      className="flex items-center justify-center px-6"
      style={{ minHeight: '85vh', backgroundColor: '#2C2417' }}
    >
      <Seo
        title="Page Not Found"
        description="This page has wandered off the path. Return to The Mango Seed homepage."
        path="/404"
        noIndex
      />
      <div className="text-center" style={{ maxWidth: '640px' }}>
        <div
          className="font-inter text-[11px] font-semibold uppercase tracking-[0.18em] mb-6"
          style={{ color: '#D4A853' }}
        >
          &mdash;&mdash;&mdash; 404
        </div>
        <h1
          className="font-playfair font-semibold mb-6"
          style={{
            fontSize: 'clamp(48px, 7vw, 96px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#FDF6E3',
          }}
        >
          The path is not yet planted.
        </h1>
        <p
          className="font-cormorant italic mb-10"
          style={{
            fontSize: 'clamp(18px, 2.2vw, 22px)',
            lineHeight: 1.6,
            color: '#E8D5B7',
          }}
        >
          You have wandered off the road. That is fine — every road in this
          story begins by leaving another one. Choose your next step:
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-inter text-xs font-semibold uppercase tracking-[0.12em] px-8 py-3.5 rounded transition-all duration-300 hover:-translate-y-0.5"
            style={{
              backgroundColor: '#D4A853',
              color: '#2C2417',
            }}
          >
            Return Home
            <ArrowRight size={14} />
          </Link>
          <Link
            to="/book"
            className="font-inter text-xs font-semibold uppercase tracking-[0.12em] px-8 py-3.5 rounded transition-all duration-300 hover:-translate-y-0.5"
            style={{
              backgroundColor: 'transparent',
              border: '1.5px solid #E8D5B7',
              color: '#E8D5B7',
            }}
          >
            Explore the Book
          </Link>
        </div>
      </div>
    </main>
  );
}
