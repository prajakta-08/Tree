import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ArrowRight,
  BookOpen,
  Quote,
} from 'lucide-react';

import HeroSection from '../sections/book/HeroSection';
import SixSeasonsSection from '../sections/book/SixSeasonsSection';
import { BOOKS } from '../lib/books-data';
import Seo from '../components/Seo';
import { bookSchema } from '../lib/seo-schemas';

const SEASON_COLOUR: Record<string, string> = {
  'The Village': '#4A6741',
  'The Road Out': '#D4A853',
  'Love & Building': '#C4654A',
  'Success & Breaking': '#A8423F',
  'Wisdom & Legacy': '#6B4C3B',
  'The Inheritance': '#D4A574',
};

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const SEASONS_LIST = [
  'All',
  'The Village',
  'The Road Out',
  'Love & Building',
  'Success & Breaking',
  'Wisdom & Legacy',
  'The Inheritance',
];

/* ---- 20 Core Laws ---- */
interface Law {
  number: number;
  text: string;
  context: string;
  season: string;
  chapter: number;
  tags: string[];
}

const LAWS: Law[] = [
  { number: 1, text: 'The world will not adjust to your preferences.', context: 'Arjun learned this in his first job in the city, where the tea shop owner told him: "The road does not change because your feet hurt. You change because the road demands it."', season: 'The Road Out', chapter: 8, tags: ['Reality', 'Adaptation'] },
  { number: 2, text: 'Save first. Spend from what remains.', context: 'The first rule Govind taught Arjun about money. Not deprivation \u2014 but the discipline of paying your future self before your present desires.', season: 'Love & Building', chapter: 12, tags: ['Finance', 'Discipline'] },
  { number: 3, text: 'Every failure is a question from reality.', context: 'When Arjun\u2019s first business collapsed, Chacha Bhim helped him see that failure was not a verdict \u2014 it was feedback. The only true failure is refusing to hear the question.', season: 'The Road Out', chapter: 10, tags: ['Resilience', 'Growth'] },
  { number: 4, text: 'Confidence earned in one domain does not transfer automatically.', context: 'Arjun\u2019s success in business did not make him a good father or a wise friend. Each domain demands its own proof.', season: 'Success & Breaking', chapter: 18, tags: ['Humility', 'Awareness'] },
  { number: 5, text: 'The mind is a wild animal. It can be gentled.', context: 'In his darkest season, Arjun discovered that meditation was not escape \u2014 it was training. The mind, like any wild thing, responds to patient, repeated care.', season: 'Wisdom & Legacy', chapter: 24, tags: ['Mindfulness', 'Discipline'] },
  { number: 6, text: 'You cannot fake genuine interest indefinitely.', context: 'The relationships that endured were those Arjun truly invested in. People sense pretense before words reveal it.', season: 'Love & Building', chapter: 13, tags: ['Relationships', 'Authenticity'] },
  { number: 7, text: 'The things that took most of your time will rarely be what mattered most.', context: 'On his deathbed, Arjun\u2019s father never mentioned the promotions or the profits. He spoke of mornings under the mango tree.', season: 'Wisdom & Legacy', chapter: 28, tags: ['Priorities', 'Legacy'] },
  { number: 8, text: 'Protect against ruin before you protect against disappointment.', context: 'The single most important financial decision is not how much you make \u2014 it\u2019s the margin of safety that keeps one mistake from destroying everything.', season: 'Love & Building', chapter: 15, tags: ['Risk', 'Finance'] },
  { number: 9, text: 'The leader who needs to be right is the primary obstacle.', context: 'Arjun watched brilliant leaders fail because they could not admit uncertainty. The best leaders he met were comfortable with "I don\u2019t know."', season: 'Success & Breaking', chapter: 20, tags: ['Leadership', 'Humility'] },
  { number: 10, text: 'Joy deferred on the grounds of imperfect conditions is joy abandoned.', context: 'Meera taught Arjun this: waiting for the perfect moment to be happy ensures you never will be. Joy is a practice, not a destination.', season: 'Love & Building', chapter: 14, tags: ['Happiness', 'Presence'] },
  { number: 11, text: 'What you give sustained attention to, you allow to shape you.', context: 'The books Arjun read, the people he spent time with, the thoughts he rehearsed \u2014 these were not passive choices. They were the architecture of his character.', season: 'The Inheritance', chapter: 32, tags: ['Attention', 'Character'] },
  { number: 12, text: 'Compounding applies to money, habits, knowledge, and reputation equally.', context: 'The most powerful force in the universe, Einstein supposedly said, is compound interest. Arjun found it equally true of kindness, learning, and trust.', season: 'The Inheritance', chapter: 30, tags: ['Growth', 'Patience'] },
  { number: 13, text: 'Money is not the goal. It is optionality.', context: 'Enough money means the freedom to say no, to wait, to choose work that matters, to walk away. It is a tool of autonomy, not a scorecard.', season: 'Love & Building', chapter: 12, tags: ['Wealth', 'Freedom'] },
  { number: 14, text: 'Your circumstances are not your identity.', context: 'Arjun met people who rose from nothing and people who collapsed from everything. The difference was never circumstance \u2014 it was the story they told about it.', season: 'The Village', chapter: 4, tags: ['Identity', 'Mindset'] },
  { number: 15, text: 'Do not love the idea of people. Love the actual person.', context: 'The greatest disappointments in Arjun\u2019s life came from loving who he wished someone was, rather than who they actually were.', season: 'Love & Building', chapter: 15, tags: ['Relationships', 'Acceptance'] },
  { number: 16, text: 'Character is the most portable thing you own.', context: 'Businesses fail. Markets crash. Cities change. But who you are when no one is watching \u2014 that travels with you everywhere.', season: 'The Inheritance', chapter: 33, tags: ['Character', 'Integrity'] },
  { number: 17, text: 'The building is not the point. The building is the practice.', context: 'Every empire Arjun built, every achievement he accumulated \u2014 they were all preparation. The real product was the person he became in the process.', season: 'Success & Breaking', chapter: 20, tags: ['Process', 'Growth'] },
  { number: 18, text: 'Enough is not a quantity. It is a relationship with what you have.', context: 'The wealthiest man Arjun ever met lived in a small house and walked everywhere. He had mastered the art of sufficiency.', season: 'Wisdom & Legacy', chapter: 26, tags: ['Contentment', 'Wealth'] },
  { number: 19, text: 'Pay attention to the quiet things.', context: 'The most important moments in Arjun\u2019s life were not announced with fanfare. They were quiet: a look from his father, a question from his son, a pause beneath a tree.', season: 'Wisdom & Legacy', chapter: 27, tags: ['Awareness', 'Presence'] },
  { number: 20, text: 'The tree did not grow tall by hurrying.', context: 'The ancient mango tree in Rampur had stood for 200 years. It did not rush. It simply grew, season after season, toward the light.', season: 'The Inheritance', chapter: 40, tags: ['Patience', 'Purpose'] },
];

/* ---- Testimonials ---- */
const TESTIMONIALS = [
  {
    quote: 'I have read dozens of self-help books. This is the first one that made me cry. The wisdom of 100 books, told as one beautiful story \u2014 I did not know I needed this until I read it.',
    name: 'Priya M.',
    role: 'Early Reader',
  },
  {
    quote: 'As someone in the Indian diaspora, I saw my grandfather in Arjun. I saw my own journey from a small town to a big city. This book is a mirror and a map at the same time.',
    name: 'Rajesh K.',
    role: 'Early Reader',
  },
  {
    quote: 'I gave this to my son. He is 14 and does not read \u201cself-help.\u201d He finished it in three days and asked me which of the 100 books he should read next. That has never happened before.',
    name: 'Ananya S.',
    role: 'Early Reader',
  },
];

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
/*  BOOKS SECTION                                                      */
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function BooksSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedBook, setExpandedBook] = useState<string | null>(null);

  const filtered =
    activeFilter === 'All'
      ? BOOKS
      : BOOKS.filter((b) => b.season === activeFilter);

  return (
    <section style={{ backgroundColor: '#F5ECD7' }} className="section-xl">
      <div className="mx-auto px-6" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div
            className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
            style={{ color: '#D4A853' }}
          >
            &mdash;&mdash;&mdash; THE BOOKS INSIDE
          </div>
          <h2
            className="font-playfair font-semibold mb-5"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: '#3A5233',
            }}
          >
            100 Great Books. One Living Story.
          </h2>
          <p
            className="font-source-serif max-w-[680px] mx-auto"
            style={{ fontSize: '17px', lineHeight: 1.7, color: '#6B4C3B' }}
          >
            Every book below appears in The Mango Seed &mdash; not as a reference,
            but as a lived experience. Click any season to see which books belong
            to which chapter of Arjun&rsquo;s life.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          {SEASONS_LIST.map((season) => (
            <button
              key={season}
              onClick={() => {
                setActiveFilter(season);
                setExpandedBook(null);
              }}
              className="font-inter text-[12px] md:text-[13px] font-medium uppercase tracking-[0.08em] px-4 py-2 rounded transition-all duration-300"
              style={{
                color:
                  activeFilter === season
                    ? '#3A5233'
                    : '#6B4C3B',
                borderBottom:
                  activeFilter === season
                    ? '2px solid #D4A853'
                    : '2px solid transparent',
                backgroundColor: 'transparent',
              }}
            >
              {season}
            </button>
          ))}
        </motion.div>

        {/* Book Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((book, idx) => {
              const isExpanded = expandedBook === book.title;
              const seasonColour = SEASON_COLOUR[book.season] || '#D4A853';
              return (
                <motion.div
                  key={book.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: idx * 0.02 }}
                  onClick={() =>
                    setExpandedBook(isExpanded ? null : book.title)
                  }
                  className="cursor-pointer rounded-lg p-4 md:p-5 transition-all duration-300 hover:-translate-y-[3px]"
                  style={{
                    backgroundColor: '#FDF6E3',
                    border: `1px solid ${isExpanded ? '#D4A853' : '#E8D5B7'}`,
                    boxShadow: isExpanded
                      ? '0 8px 24px rgba(44,36,23,0.1)'
                      : 'none',
                  }}
                >
                  {/* Season dot */}
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: seasonColour }}
                    />
                    <span
                      className="font-inter text-[9px] font-semibold uppercase tracking-wider"
                      style={{ color: '#8B6F5E' }}
                    >
                      Ch. {book.chapter}
                    </span>
                  </div>

                  {/* Title */}
                  <h4
                    className="font-source-serif font-semibold mb-1 leading-snug"
                    style={{
                      fontSize: '14px',
                      color: '#3A5233',
                    }}
                  >
                    {book.title}
                  </h4>

                  {/* Author */}
                  <p
                    className="font-inter mb-2"
                    style={{ fontSize: '11px', color: '#8B6F5E' }}
                  >
                    {book.author}
                  </p>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div
                          className="pt-2 mt-2"
                          style={{
                            borderTop: '1px solid rgba(232,213,183,0.5)',
                          }}
                        >
                          <span
                            className="font-inter text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: `${seasonColour}18`,
                              color: seasonColour,
                            }}
                          >
                            {book.theme}
                          </span>
                          <p
                            className="font-inter mt-2"
                            style={{
                              fontSize: '10px',
                              color: '#8B6F5E',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                            }}
                          >
                            {book.season}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Count */}
        <motion.p
          className="text-center mt-10 font-inter text-sm"
          style={{ color: '#8B6F5E' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Showing {filtered.length} of {BOOKS.length} books
          {activeFilter !== 'All' && ` in "${activeFilter}"`}
        </motion.p>
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
/*  LAWS SECTION                                                       */
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function LawsSection() {
  const [expandedLaw, setExpandedLaw] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  /* Count-up animation */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let current = 0;
          const interval = setInterval(() => {
            current++;
            setVisibleCount(current);
            if (current >= 20) clearInterval(interval);
          }, 60);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: '#2C2417' }}
      className="section-xl"
    >
      <div className="mx-auto px-6" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div
            className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
            style={{ color: '#D4A853' }}
          >
            &mdash;&mdash;&mdash; THE WISDOM
          </div>
          <h2
            className="font-playfair font-semibold mb-5"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: '#FFFFFF',
            }}
          >
            The 20 Core Laws of Life
          </h2>
          <p
            className="font-source-serif max-w-[560px] mx-auto"
            style={{ fontSize: '17px', lineHeight: 1.7, color: '#E8D5B7' }}
          >
            Distilled from 100 books and one life fully lived. These are the
            laws Arjun leaves for Rohan &mdash; and for you.
          </p>
        </motion.div>

        {/* Laws list */}
        <div>
          {LAWS.map((law, idx) => {
            const isExpanded = expandedLaw === law.number;
            return (
              <motion.div
                key={law.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.04,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                style={{
                  borderBottom:
                    idx < LAWS.length - 1
                      ? '1px solid rgba(232,213,183,0.12)'
                      : 'none',
                }}
              >
                <button
                  onClick={() =>
                    setExpandedLaw(isExpanded ? null : law.number)
                  }
                  className="w-full text-left py-7 md:py-9 flex items-baseline gap-6 md:gap-10 group"
                >
                  {/* Number */}
                  <span
                    className="font-playfair shrink-0 w-14 md:w-20 text-right tabular-nums select-none"
                    style={{
                      fontSize: 'clamp(44px, 5vw, 72px)',
                      fontWeight: 300,
                      fontStyle: 'italic',
                      lineHeight: 0.95,
                      letterSpacing: '-0.02em',
                      color: '#D4A853',
                      opacity: 0.55,
                    }}
                  >
                    {visibleCount >= law.number
                      ? String(law.number).padStart(2, '0')
                      : '——'}
                  </span>

                  {/* Text + expand */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-6">
                      <p
                        className="font-playfair"
                        style={{
                          fontSize: 'clamp(19px, 2.1vw, 26px)',
                          fontWeight: 400,
                          lineHeight: 1.35,
                          letterSpacing: '-0.005em',
                          color: '#FDF6E3',
                        }}
                      >
                        {law.text}
                      </p>
                      <ChevronDown
                        size={18}
                        className="shrink-0 transition-transform duration-300 self-center"
                        style={{
                          color: '#D4A853',
                          transform: isExpanded
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                          opacity: 0.7,
                        }}
                      />
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="pt-5 pb-2 max-w-[640px]">
                            {/* Gold hairline ornament */}
                            <div
                              className="mb-5"
                              style={{
                                width: '32px',
                                height: '1px',
                                backgroundColor: '#D4A853',
                                opacity: 0.5,
                              }}
                            />
                            <p
                              className="font-cormorant italic mb-5"
                              style={{
                                fontSize: 'clamp(16px, 1.6vw, 19px)',
                                lineHeight: 1.65,
                                color: '#E8D5B7',
                              }}
                            >
                              {law.context}
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                              <span
                                className="font-inter text-[10px] font-medium uppercase tracking-[0.12em]"
                                style={{ color: '#8B6F5E' }}
                              >
                                From {law.season} &middot; Chapter {law.chapter}
                              </span>
                              {law.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="font-inter text-[10px] font-medium uppercase tracking-[0.1em] px-2.5 py-1 rounded-full"
                                  style={{
                                    backgroundColor: 'rgba(212,168,83,0.12)',
                                    color: '#D4A853',
                                    border: '1px solid rgba(212,168,83,0.25)',
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
/*  TESTIMONIALS SECTION                                               */
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function TestimonialsSection() {
  return (
    <section style={{ backgroundColor: '#FDF6E3' }} className="section-lg">
      <div className="mx-auto px-6" style={{ maxWidth: '1000px' }}>
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div
            className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
            style={{ color: '#D4A853' }}
          >
            &mdash;&mdash;&mdash; EARLY READERS
          </div>
          <h2
            className="font-playfair font-semibold"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: '#3A5233',
            }}
          >
            What People Are Saying
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.15,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              className="rounded-lg p-6 md:p-8 relative"
              style={{
                backgroundColor: '#F5ECD7',
                borderLeft: '3px solid #D4A853',
              }}
            >
              <Quote
                size={22}
                className="mb-4 opacity-30"
                style={{ color: '#D4A853' }}
              />
              <p
                className="font-cormorant italic mb-6"
                style={{
                  fontSize: '18px',
                  lineHeight: 1.55,
                  color: '#3A5233',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p
                  className="font-inter text-[12px] font-medium uppercase tracking-[0.08em]"
                  style={{ color: '#6B4C3B' }}
                >
                  {t.name}
                </p>
                <p
                  className="font-inter text-[11px]"
                  style={{ color: '#8B6F5E' }}
                >
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
/*  CTA SECTION                                                        */
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function CTASection() {
  return (
    <section
      className="section-xl"
      style={{
        background:
          'linear-gradient(135deg, #D4A574 0%, #C4654A 50%, #A8423F 100%)',
      }}
    >
      <div className="mx-auto px-6 text-center" style={{ maxWidth: '700px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <h2
            className="font-playfair font-semibold mb-5"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
            }}
          >
            Your Copy Awaits
          </h2>
          <p
            className="font-source-serif mb-10"
            style={{
              fontSize: '18px',
              lineHeight: 1.7,
              color: 'rgba(253,246,227,0.9)',
            }}
          >
            Available in paperback, hardcover, e-book, and audiobook. Pre-order
            now for exclusive bonuses.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/preorder"
              className="inline-flex items-center gap-2 font-inter text-xs font-semibold uppercase tracking-[0.12em] px-10 py-4 rounded transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: '#FDF6E3',
                color: '#2C2417',
                boxShadow: '0 8px 32px rgba(44,36,23,0.25)',
              }}
            >
              <BookOpen size={15} />
              Pre-Order The Mango Seed
            </Link>

            <Link
              to="/excerpts"
              className="inline-flex items-center gap-1 font-inter text-sm font-medium transition-all duration-300 hover:gap-2"
              style={{ color: '#FDF6E3' }}
            >
              Read a Free Sample
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
/*  MAIN BOOK PAGE                                                     */
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
export default function Book() {
  return (
    <div>
      <Seo
        title="The Book"
        description="Inside The Mango Seed: 40 chapters, 100 great books woven into one story, the 20 Core Laws of Life, and six seasons of Arjun's journey from Rajasthan village to a life lived in full."
        path="/book"
        type="book"
        jsonLd={bookSchema}
      />
      <HeroSection />
      <SixSeasonsSection />
      <BooksSection />
      <LawsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
