import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Season Data                                                        */
/* ------------------------------------------------------------------ */
interface Season {
  number: string;
  title: string;
  subtitle: string;
  range: string;
  image: string;
  description: string;
  books: string[];
}

const SEASONS: Season[] = [
  {
    number: '01',
    title: 'The Village',
    subtitle: 'The Roots',
    range: 'Chapters 1 \u2013 5',
    image: '/chapter-village.jpg',
    description:
      'In Rampur, Rajasthan, a boy named Arjun grows up beneath an ancient mango tree. He learns from observation, not classrooms \u2014 from his mother Savitri\u2019s resilience, his father Govind\u2019s quiet wisdom, and Chacha Bhim, who teaches him to see what others overlook. The seeds of everything he will become are planted here, in red dust and golden light.',
    books: ['Educated', 'The Prophet', 'The Little Prince'],
  },
  {
    number: '02',
    title: 'The Road Out',
    subtitle: 'The Journey',
    range: 'Chapters 6 \u2013 10',
    image: '/chapter-road.jpg',
    description:
      'First jobs. First city. The library of dust above a tea shop. Arjun discovers that learning to be useful is the most underrated skill in the world. He builds habits before he knows they\u2019re called habits.',
    books: ['Atomic Habits', 'Deep Work', 'The 5 AM Club', "Can't Hurt Me"],
  },
  {
    number: '03',
    title: 'Love & Building',
    subtitle: 'The Building',
    range: 'Chapters 11 \u2013 15',
    image: '/open-book-pages.jpg',
    description:
      'Meera enters his life. His first business teaches him that the compound effect works in relationships as surely as in money. He begins to understand the story of his own self.',
    books: [
      'The Compound Effect',
      'The Psychology of Money',
      'How to Win Friends',
      'Never Split the Difference',
    ],
  },
  {
    number: '04',
    title: 'Success & Breaking',
    subtitle: 'The Breaking',
    range: 'Chapters 16 \u2013 20',
    image: '/city-skyline-dusk.jpg',
    description:
      'The hunger for more becomes a hunger that nothing satisfies. The breaking point arrives not as a single moment but as a slow realization: success without meaning is just a prettier kind of emptiness.',
    books: [
      'Ego Is the Enemy',
      'The Hard Thing About Hard Things',
      'Shoe Dog',
      'Leaders Eat Last',
    ],
  },
  {
    number: '05',
    title: 'Wisdom & Legacy',
    subtitle: 'The Return',
    range: 'Chapters 21 \u2013 28',
    image: '/meditation-quiet.jpg',
    description:
      'The quiet years. The purpose beneath the purpose. A conversation with death that changes everything. Arjun discovers what leaders actually do, what wealth actually is, and that enough is not a quantity \u2014 it is a relationship with what you have.',
    books: [
      "Man's Search for Meaning",
      'Meditations',
      'The Power of Now',
      'Think Like a Monk',
      'Tuesdays with Morrie',
    ],
  },
  {
    number: '06',
    title: 'The Inheritance',
    subtitle: 'The Seed',
    range: 'Chapters 29 \u2013 40',
    image: '/chapter-wisdom.jpg',
    description:
      'The next generation. The 20 Core Laws of Life, distilled from every lesson learned. Rohan\u2019s questions. And finally \u2014 The Mango Seed. The understanding that everything Arjun built was practice. The real gift was the story itself.',
    books: ['The Alchemist', 'The Four Agreements', 'Sapiens', 'Flow', 'Essentialism'],
  },
];

const SEASON_COLOUR: Record<string, string> = {
  'The Village': '#4A6741',
  'The Road Out': '#D4A853',
  'Love & Building': '#C4654A',
  'Success & Breaking': '#A8423F',
  'Wisdom & Legacy': '#6B4C3B',
  'The Inheritance': '#D4A574',
};

/* ------------------------------------------------------------------ */
/*  Six Seasons — GSAP ScrollTrigger Pinned Section                    */
/* ------------------------------------------------------------------ */
export default function SixSeasonsSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const pin = pinRef.current;
    if (!wrap || !pin) return;

    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray<HTMLElement>('.s-season-img');
      const texts = gsap.utils.toArray<HTMLElement>('.s-season-text');
      const watermarks = gsap.utils.toArray<HTMLElement>('.s-watermark');
      const dots = gsap.utils.toArray<HTMLElement>('.s-dot');

      // Initial states — hide everything
      gsap.set(images, { opacity: 0, scale: 1.06 });
      gsap.set(texts, { opacity: 0, x: 35 });
      gsap.set(watermarks, { opacity: 0, scale: 0.85, filter: 'blur(6px)' });
      gsap.set(dots, { opacity: 0.25, scale: 1 });

      // Show first season immediately
      gsap.set(images[0], { opacity: 1, scale: 1 });
      gsap.set(texts[0], { opacity: 1, x: 0 });
      gsap.set(watermarks[0], { opacity: 0.08, scale: 1, filter: 'blur(0px)' });
      gsap.set(dots[0], { opacity: 1, scale: 1.4 });

      const slot = 1 / 6; // each season gets 1/6 of progress
      const halfFade = slot * 0.28; // fade overlap

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: '+=400%',
          pin: pin,
          scrub: 0.6,
          onUpdate: (self) => {
            // Progress bar
            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleY: self.progress });
            }
            // Progress text
            const activeIdx = Math.min(5, Math.floor(self.progress * 6));
            if (progTextRef.current) {
              progTextRef.current.textContent = `${activeIdx + 1} / 6`;
            }
            // Dots
            dots.forEach((dot, i) => {
              if (i === activeIdx) {
                gsap.to(dot, { opacity: 1, scale: 1.4, duration: 0.2 });
              } else {
                gsap.to(dot, { opacity: 0.25, scale: 1, duration: 0.2 });
              }
            });
          },
        },
      });

      // Build transition timeline
      for (let i = 0; i < 5; i++) {
        const cross = (i + 1) * slot;

        // ---- Current season exits ----
        tl.to(
          images[i],
          { opacity: 0, scale: 1.04, duration: halfFade, ease: 'power2.in' },
          cross - halfFade * 0.6,
        );
        tl.to(
          texts[i],
          { opacity: 0, x: -30, duration: halfFade * 0.8, ease: 'power2.in' },
          cross - halfFade * 0.6,
        );
        tl.to(
          watermarks[i],
          { opacity: 0, scale: 0.9, filter: 'blur(6px)', duration: halfFade },
          cross - halfFade,
        );

        // ---- Next season enters ----
        tl.fromTo(
          images[i + 1],
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: halfFade, ease: 'power2.out' },
          cross - halfFade * 0.3,
        );
        tl.fromTo(
          texts[i + 1],
          { opacity: 0, x: 35 },
          { opacity: 1, x: 0, duration: halfFade * 1.1, ease: 'power2.out' },
          cross - halfFade * 0.2,
        );
        tl.fromTo(
          watermarks[i + 1],
          { opacity: 0, scale: 0.85, filter: 'blur(6px)' },
          {
            opacity: 0.08,
            scale: 1,
            filter: 'blur(0px)',
            duration: halfFade * 1.2,
            ease: 'power2.out',
          },
          cross,
        );
      }
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section>
      {/* Header */}
      <div
        className="text-center"
        style={{
          backgroundColor: '#FDF6E3',
          paddingTop: '120px',
          paddingBottom: '60px',
        }}
      >
        <div className="mx-auto px-6" style={{ maxWidth: '1200px' }}>
          <div
            className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
            style={{ color: '#D4A853' }}
          >
            &mdash;&mdash;&mdash; THE STRUCTURE
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
            Six Seasons of a Life
          </h2>
        </div>
      </div>

      {/* Pinned scroll area */}
      <div ref={wrapRef} className="relative" style={{ height: '400vh' }}>
        <div
          ref={pinRef}
          className="h-[100dvh] relative overflow-hidden"
          style={{ backgroundColor: '#FDF6E3' }}
        >
          <div className="flex h-full">
            {/* Left: Images (desktop only) */}
            <div className="hidden lg:block w-[42%] h-full relative">
              {SEASONS.map((s) => (
                <div
                  key={`img-${s.number}`}
                  className="s-season-img absolute inset-0"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover"
                    style={{ borderRadius: '0 16px 16px 0' }}
                  />
                  {/* Subtle gradient overlay on image */}
                  <div
                    className="absolute inset-0"
                    style={{
                      borderRadius: '0 16px 16px 0',
                      background:
                        'linear-gradient(90deg, transparent 70%, #FDF6E3 100%)',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Right: Text content */}
            <div className="w-full lg:w-[58%] h-full relative">
              {SEASONS.map((s) => (
                <div
                  key={`text-${s.number}`}
                  className="s-season-text absolute inset-0 flex items-center px-8 md:px-14 lg:px-20"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div className="max-w-[580px]">
                    {/* Chapter range label */}
                    <div
                      className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] mb-3"
                      style={{ color: '#D4A853' }}
                    >
                      &mdash;&mdash;&mdash; {s.range}
                    </div>

                    {/* Subtitle */}
                    <div
                      className="font-inter text-[10px] font-semibold uppercase tracking-[0.2em] mb-3"
                      style={{
                        color: SEASON_COLOUR[s.title] || '#D4A853',
                      }}
                    >
                      {s.subtitle}
                    </div>

                    {/* Title */}
                    <h3
                      className="font-playfair font-medium mb-5"
                      style={{
                        fontSize: 'clamp(28px, 3.2vw, 42px)',
                        lineHeight: 1.15,
                        letterSpacing: '-0.01em',
                        color: '#3A5233',
                      }}
                    >
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="font-source-serif mb-6"
                      style={{
                        fontSize: '16px',
                        lineHeight: 1.75,
                        color: '#6B4C3B',
                      }}
                    >
                      {s.description}
                    </p>

                    {/* Key books */}
                    <div className="flex flex-wrap gap-2">
                      {s.books.map((book) => (
                        <span
                          key={book}
                          className="font-inter text-[10px] font-medium uppercase tracking-wider px-3 py-1.5 rounded-full"
                          style={{
                            backgroundColor: `${SEASON_COLOUR[s.title]}12`,
                            color: SEASON_COLOUR[s.title],
                          }}
                        >
                          {book}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Watermark numbers */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {SEASONS.map((s) => (
              <div
                key={`wm-${s.number}`}
                className="s-watermark absolute right-[8%] lg:right-[12%] top-1/2 -translate-y-1/2 font-playfair font-normal"
                style={{
                  fontSize: 'clamp(140px, 18vw, 220px)',
                  lineHeight: 1,
                  color: '#D4A853',
                  willChange: 'transform, opacity, filter',
                }}
              >
                {s.number}
              </div>
            ))}
          </div>

          {/* Progress indicator (right edge) */}
          <div className="absolute right-5 lg:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
            <div
              className="font-inter text-[10px] font-semibold tracking-wider"
              style={{ color: '#D4A853' }}
              ref={progTextRef as any}
            >
              1 / 6
            </div>
            <div
              className="w-[2px] h-20 rounded-full overflow-hidden"
              style={{ backgroundColor: 'rgba(212,168,83,0.2)' }}
            >
              <div
                ref={progressRef}
                className="w-full origin-top rounded-full"
                style={{
                  height: '100%',
                  backgroundColor: '#D4A853',
                  transform: 'scaleY(0)',
                  willChange: 'transform',
                }}
              />
            </div>
          </div>

          {/* Dot indicators (bottom) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {SEASONS.map((s) => (
              <div
                key={`dot-${s.number}`}
                className="s-dot w-2 h-2 rounded-full transition-all"
                style={{
                  backgroundColor: SEASON_COLOUR[s.title] || '#D4A853',
                  willChange: 'transform, opacity',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
