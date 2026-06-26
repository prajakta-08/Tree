import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const seasons = [
  {
    num: '01',
    title: 'The Village',
    chapters: 'Ch. 1–5',
    desc: 'Roots in red dust. The old mango tree. A boy who learns by watching.',
    image: '/chapter-village.jpg',
    quote: '"The tree did not grow tall by hurrying."',
  },
  {
    num: '02',
    title: 'The Road Out',
    chapters: 'Ch. 6–10',
    desc: 'First jobs. First city. The library of dust. Learning to be useful.',
    image: '/chapter-road.jpg',
    quote: '"Every step away from home is a step toward yourself."',
  },
  {
    num: '03',
    title: 'Love & Building',
    chapters: 'Ch. 11–15',
    desc: 'Meera. First business. The compound effect. The story of the self.',
    image: '/grandfather-grandson.jpg',
    quote: '"The life you build is built in the small hours."',
  },
  {
    num: '04',
    title: 'Success & Breaking',
    chapters: 'Ch. 16–20',
    desc: 'The hunger for more. The breaking point. The quiet years.',
    image: '/chapter-city.jpg',
    quote: '"Sometimes the fall is the only path to clarity."',
  },
  {
    num: '05',
    title: 'Wisdom & Legacy',
    chapters: 'Ch. 21–28',
    desc: 'The purpose beneath the purpose. The conversation with death. The art of enough.',
    image: '/meditation-quiet.jpg',
    quote: '"Enough is not a quantity. It is a relationship."',
  },
  {
    num: '06',
    title: 'The Inheritance',
    chapters: 'Ch. 29–40',
    desc: 'The next generation. The 20 Core Laws. Rohan\'s questions. The Mango Seed.',
    image: '/chapter-wisdom.jpg',
    quote: '"The seed carries everything the tree ever was."',
  },
];

export default function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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

      const cards = cardsRef.current?.querySelectorAll('.season-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'expo.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
          }
        );
      }

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1, duration: 1.5, ease: 'expo.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-lg"
      style={{ backgroundColor: '#F5ECD7' }}
    >
      <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '1200px' }}>
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-6 h-[2px] inline-block" style={{ backgroundColor: '#D4A853' }} />
            <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: '#D4A853' }}>
              THE JOURNEY
            </span>
          </div>
          <h2 className="font-playfair font-semibold text-display-md mb-4" style={{ color: '#3A5233' }}>
            Six Seasons. One Life.
          </h2>
          <p className="font-body text-lg mx-auto" style={{ color: '#6B4C3B', maxWidth: '600px', lineHeight: 1.7 }}>
            Follow Arjun's path from village boy to wise elder. Each season holds the lessons of a lifetime.
          </p>
        </div>

        <div ref={cardsRef} className="relative">
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] origin-left"
            style={{ backgroundColor: '#E8D5B7', transform: 'translateY(-50%)' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {seasons.map((season) => (
              <div
                key={season.num}
                className="season-card group relative p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                style={{
                  background: 'linear-gradient(145deg, #F5ECD7 0%, #E8D5B7 100%)',
                  boxShadow: '0 4px 20px rgba(44,36,23,0.08)',
                }}
              >
                <span className="font-playfair text-5xl font-normal" style={{ color: 'rgba(212,168,83,0.4)' }}>
                  {season.num}
                </span>
                <div className="mt-4 mb-3 overflow-hidden rounded-md">
                  <img
                    src={season.image}
                    alt={season.title}
                    className="w-full h-20 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-playfair text-xl font-medium mb-1" style={{ color: '#3A5233' }}>
                  {season.title}
                </h3>
                <p className="font-ui text-[11px] font-medium uppercase tracking-wider mb-2" style={{ color: '#8B6F5E' }}>
                  {season.chapters}
                </p>
                <p className="font-body text-sm" style={{ color: '#6B4C3B', lineHeight: 1.6 }}>
                  {season.desc}
                </p>
                <div
                  className="absolute inset-0 rounded-xl flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: 'rgba(44,36,23,0.9)' }}
                >
                  <p className="font-cormorant text-xl italic text-center" style={{ color: '#FDF6E3' }}>
                    {season.quote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
