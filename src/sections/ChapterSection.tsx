import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    num: 'CHAPTER 01',
    title: 'The Village Before the World',
    preview: 'The old mango tree stood at the edge of the village before the village had a name. Its trunk was wider than three men with linked arms could circle. Its roots had cracked the stone wall of the old well and reached down to water no one else could find...',
    image: '/chapter-village.jpg',
  },
  {
    num: 'CHAPTER 06',
    title: 'The Library of Dust',
    preview: 'The city library was a single room above a tea shop. The books smelled of mildew and ambition. Arjun ran his finger along a spine and pulled out a copy of something called The 7 Habits of Highly Effective People...',
    image: '/chapter-road.jpg',
  },
  {
    num: 'CHAPTER 26',
    title: 'The Conversation with Death',
    preview: 'It was not a conversation Arjun had sought. It arrived on an ordinary Tuesday, delivered by a doctor\'s quiet voice and the sudden clarity that comes when time reveals itself as finite...',
    image: '/chapter-wisdom.jpg',
  },
];

export default function ChapterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      const cards = cardsRef.current?.querySelectorAll('.chapter-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'expo.out',
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
      className="section-xl"
      style={{
        background: 'linear-gradient(135deg, #D4A574 0%, #C4654A 50%, #A8423F 100%)',
      }}
    >
      <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '1200px' }}>
        <div ref={headerRef} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[2px] inline-block" style={{ backgroundColor: '#FDF6E3', opacity: 0.5 }} />
            <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: '#FDF6E3', opacity: 0.8 }}>
              SAMPLE THE STORY
            </span>
          </div>
          <h2 className="font-playfair font-semibold text-display-md" style={{ color: '#FFFFFF' }}>
            Read the Opening. Feel the Journey Begin.
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {chapters.map((chapter) => (
            <div
              key={chapter.num}
              className="chapter-card group rounded-xl overflow-hidden transition-all duration-400 hover:-translate-y-1.5 cursor-pointer"
              style={{
                backgroundColor: '#FDF6E3',
                boxShadow: '0 4px 20px rgba(44,36,23,0.1)',
              }}
            >
              <div className="overflow-hidden h-44">
                <img
                  src={chapter.image}
                  alt={chapter.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <span className="font-ui text-[11px] font-semibold uppercase tracking-wider" style={{ color: '#D4A853' }}>
                  {chapter.num}
                </span>
                <h3 className="font-playfair text-[22px] font-medium mt-2 mb-3" style={{ color: '#3A5233' }}>
                  {chapter.title}
                </h3>
                <p className="font-body text-[15px] mb-4 line-clamp-4" style={{ color: '#6B4C3B', lineHeight: 1.65 }}>
                  {chapter.preview}
                </p>
                <Link
                  to="/excerpts"
                  className="inline-flex items-center gap-1.5 font-inter text-[13px] font-semibold transition-all duration-300 group/link"
                  style={{ color: '#C4654A' }}
                >
                  Read More
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/book"
            className="inline-flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-[0.12em] px-8 py-3.5 rounded border-[1.5px] border-warm-sand/50 transition-all duration-300 hover:-translate-y-0.5"
            style={{ color: '#FDF6E3' }}
          >
            Read All 40 Chapters
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
