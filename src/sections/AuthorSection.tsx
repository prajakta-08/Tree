import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AuthorSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        textRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-xl"
      style={{ backgroundColor: '#FDF6E3' }}
    >
      <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '1200px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 relative">
            <div ref={imageRef} style={{ opacity: 0 }}>
              <img
                src="/author-dhruv.jpg"
                alt="Dhruv Jain, Author"
                className="w-full rounded-lg"
                style={{ boxShadow: '0 20px 60px rgba(44,36,23,0.12)' }}
              />
              <img
                src="/mango-leaf.svg"
                alt=""
                className="absolute -bottom-4 -left-4 w-10 h-10"
                style={{ opacity: 0.2, filter: 'sepia(1) saturate(2) hue-rotate(10deg)' }}
              />
              <p className="font-ui text-[11px] font-medium uppercase tracking-wider mt-4" style={{ color: '#8B6F5E' }}>
                Dhruv Jain — Author &amp; Founder, Ziqsy Group
              </p>
            </div>
          </div>

          <div ref={textRef} className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[2px] inline-block" style={{ backgroundColor: '#D4A853' }} />
              <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: '#D4A853' }}>
                FROM THE AUTHOR
              </span>
            </div>

            <h2 className="font-playfair font-semibold text-display-md mb-6" style={{ color: '#3A5233' }}>
              A Gift for My Son. A Story for Everyone.
            </h2>

            <p className="font-body text-lg lg:text-xl mb-8" style={{ color: '#6B4C3B', lineHeight: 1.7 }}>
              I wrote The Mango Seed for my son Ved's eleventh birthday. I wanted to give him the wisdom of a hundred books — not as a reading list, but as a life lived. A story he could carry with him. A grandfather's voice he could hear when I am not there to speak. What began as a father's gift became something I believe the world needs: a reminder that the most important education is the one that arrives without a school to deliver it.
            </p>

            <Link
              to="/author"
              className="inline-flex items-center gap-2 font-inter text-sm font-semibold transition-all duration-300 group"
              style={{ color: '#C4654A' }}
            >
              Meet the Author
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
