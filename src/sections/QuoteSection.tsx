import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const quotes = [
  {
    text: 'The tree did not grow tall by hurrying. It grew tall because it faced the sun, one day at a time, for a very long time.',
    attribution: 'Arjun to Rohan, The Mango Seed',
  },
  {
    text: 'Every failure is a question from reality. The only wrong answer is to refuse to respond.',
    attribution: 'Law 3, The 20 Core Laws',
  },
  {
    text: 'You cannot fake genuine interest indefinitely. The world has a way of testing what is real.',
    attribution: 'Law 6, The 20 Core Laws',
  },
  {
    text: 'Enough is not a quantity. It is a relationship with what you have.',
    attribution: 'Law 18, The 20 Core Laws',
  },
  {
    text: 'The building is not the point. The building is the practice.',
    attribution: 'Law 17, The 20 Core Laws',
  },
];

export default function QuoteSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextQuote = useCallback(() => {
    setCurrent((prev) => (prev + 1) % quotes.length);
  }, []);

  const prevQuote = useCallback(() => {
    setCurrent((prev) => (prev - 1 + quotes.length) % quotes.length);
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      timerRef.current = setInterval(nextQuote, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, nextQuote]);

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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-lg"
      style={{ backgroundColor: '#FDF6E3' }}
    >
      <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '1000px' }}>
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-6 h-[2px] inline-block" style={{ backgroundColor: '#D4A853' }} />
            <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: '#D4A853' }}>
              WORDS THAT STAY
            </span>
          </div>
          <h2 className="font-playfair font-semibold text-display-md" style={{ color: '#3A5233' }}>
            The Kind of Wisdom That Changes How You See.
          </h2>
        </div>

        <div
          className="relative text-center py-12"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <span
            className="absolute top-0 left-1/2 -translate-x-1/2 font-playfair text-[120px] font-normal leading-none select-none pointer-events-none"
            style={{ color: 'rgba(212,168,83,0.15)' }}
          >
            &ldquo;
          </span>

          <div className="relative min-h-[180px] flex flex-col items-center justify-center">
            {quotes.map((quote, i) => (
              <div
                key={i}
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500"
                style={{
                  opacity: current === i ? 1 : 0,
                  transform: current === i ? 'translateX(0)' : i < current ? 'translateX(-20px)' : 'translateX(20px)',
                }}
              >
                <p
                  className="font-cormorant text-2xl lg:text-[32px] italic leading-relaxed mb-8"
                  style={{ color: '#3A5233', maxWidth: '700px' }}
                >
                  {quote.text}
                </p>
                <div className="w-10 h-[2px] mb-4" style={{ backgroundColor: '#D4A853' }} />
                <p className="font-ui text-xs font-medium uppercase tracking-[0.1em]" style={{ color: '#8B6F5E' }}>
                  — {quote.attribution}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prevQuote}
              className="p-2 rounded-full transition-colors duration-200 hover:bg-warm-sand"
              aria-label="Previous quote"
            >
              <ChevronLeft size={20} style={{ color: '#8B6F5E' }} />
            </button>
            <div className="flex gap-2">
              {quotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: current === i ? '#D4A853' : 'rgba(107,76,59,0.2)',
                    transform: current === i ? 'scale(1.3)' : 'scale(1)',
                  }}
                  aria-label={`Go to quote ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextQuote}
              className="p-2 rounded-full transition-colors duration-200 hover:bg-warm-sand"
              aria-label="Next quote"
            >
              <ChevronRight size={20} style={{ color: '#8B6F5E' }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
