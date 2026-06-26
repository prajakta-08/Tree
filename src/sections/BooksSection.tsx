import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import { BOOKS, type BookData } from '../lib/books-data';

gsap.registerPlugin(ScrollTrigger);

interface Book {
  title: string;
  author: string;
  season: string;
  chapter: number;
  quote: string;
}

const FEATURED_TITLES = [
  'Deep Work',
  'Atomic Habits',
  'Sapiens',
  'The Psychology of Money',
  'The Alchemist',
  'Man\u2019s Search for Meaning',
  'Think Like a Monk',
  'The 5 AM Club',
  'Meditations',
  'The Four Agreements',
  'Flow',
  'Essentialism',
];

const toBook = (b: BookData): Book => ({
  title: b.title,
  author: b.author,
  season: b.season,
  chapter: b.chapter,
  quote: b.quote,
});

const featuredBooks: Book[] = FEATURED_TITLES
  .map((t) => BOOKS.find((b) => b.title === t))
  .filter((b): b is BookData => Boolean(b))
  .map(toBook);

const moreBooks: Book[] = BOOKS
  .filter((b) => !FEATURED_TITLES.includes(b.title))
  .map(toBook);

const allBooks = [...featuredBooks, ...moreBooks];

export default function BooksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      const tiles = gridRef.current?.querySelectorAll('.book-tile');
      if (tiles) {
        gsap.fromTo(
          tiles,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1, duration: 0.5, stagger: 0.04, ease: 'expo.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (showAll) {
      const newTiles = gridRef.current?.querySelectorAll('.book-tile-more');
      if (newTiles) {
        gsap.fromTo(
          newTiles,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.03, ease: 'expo.out' }
        );
      }
    }
  }, [showAll]);

  const displayedBooks = showAll ? allBooks : featuredBooks;

  return (
    <section
      ref={sectionRef}
      className="section-xl"
      style={{ backgroundColor: '#2C2417' }}
    >
      <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '1200px' }}>
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-6 h-[2px] inline-block" style={{ backgroundColor: '#D4A853' }} />
            <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: '#D4A853' }}>
              THE BOOKS INSIDE
            </span>
          </div>
          <h2 className="font-playfair font-semibold text-display-md mb-4" style={{ color: '#FFFFFF' }}>
            100 Books. One Story.
          </h2>
          <p className="font-body mx-auto" style={{ color: '#E8D5B7', maxWidth: '540px', lineHeight: 1.7 }}>
            Every classic woven into Arjun's journey. Click any book to see where it appears in the story.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
          {displayedBooks.map((book, i) => (
            <button
              key={book.title}
              onClick={() => setSelectedBook(book)}
              className={`book-tile text-left p-4 rounded-md border transition-all duration-300 hover:-translate-y-1 group ${
                i >= 12 ? 'book-tile-more' : ''
              }`}
              style={{
                backgroundColor: 'rgba(253,246,227,0.06)',
                borderColor: 'rgba(232,213,183,0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(253,246,227,0.12)';
                e.currentTarget.style.borderColor = 'rgba(212,168,83,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(253,246,227,0.06)';
                e.currentTarget.style.borderColor = 'rgba(232,213,183,0.1)';
              }}
            >
              <img
                src="/mango-leaf.svg"
                alt=""
                className="w-4 h-4 mb-2 ml-auto opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                style={{ filter: 'invert(69%) sepia(52%) saturate(427%) hue-rotate(5deg) brightness(92%) contrast(88%)' }}
              />
              <h4 className="font-source-serif text-[13px] font-semibold mb-1" style={{ color: '#FDF6E3' }}>
                {book.title}
              </h4>
              <p className="font-ui text-[11px]" style={{ color: '#8B6F5E' }}>
                {book.author}
              </p>
            </button>
          ))}
        </div>

        {!showAll && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(true)}
              className="font-ui text-xs font-semibold uppercase tracking-[0.12em] px-8 py-3.5 rounded border-[1.5px] transition-all duration-300 hover:-translate-y-0.5"
              style={{ borderColor: '#E8D5B7', color: '#E8D5B7' }}
            >
              Show All 100
            </button>
          </div>
        )}
      </div>

      {selectedBook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(44,36,23,0.85)' }}
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="rounded-xl p-8 max-w-md w-full relative"
            style={{ backgroundColor: '#F5ECD7' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 p-1 rounded-full transition-colors duration-200 hover:bg-warm-sand"
              style={{ color: '#6B4C3B' }}
            >
              <X size={20} />
            </button>
            <span className="font-ui text-[11px] font-semibold uppercase tracking-wider" style={{ color: '#D4A853' }}>
              {selectedBook.season}
            </span>
            <h3 className="font-playfair text-2xl font-medium mt-2 mb-1" style={{ color: '#3A5233' }}>
              {selectedBook.title}
            </h3>
            <p className="font-ui text-sm mb-4" style={{ color: '#8B6F5E' }}>
              {selectedBook.author}
            </p>
            <p className="font-ui text-xs uppercase tracking-wider mb-4" style={{ color: '#6B4C3B' }}>
              Chapter {selectedBook.chapter}
            </p>
            <div className="p-4 rounded-lg" style={{ backgroundColor: '#FDF6E3', borderLeft: '3px solid #D4A853' }}>
              <p className="font-cormorant text-lg italic" style={{ color: '#3A5233' }}>
                {selectedBook.quote}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
