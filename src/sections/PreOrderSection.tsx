import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PreOrderSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );

      gsap.to(sectionRef.current, {
        backgroundPositionY: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-xl relative overflow-hidden"
      style={{
        backgroundImage: 'url(/sunset-tree-silhouette.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(44,36,23,0.7) 0%, rgba(44,36,23,0.85) 50%, rgba(44,36,23,0.7) 100%)',
        }}
      />

      <div ref={contentRef} className="relative z-10 mx-auto px-6 lg:px-12 text-center" style={{ maxWidth: '700px' }}>
        <h2 className="font-playfair font-semibold text-display-lg mb-6" style={{ color: '#FFFFFF' }}>
          Plant Your Seed Today.
        </h2>

        <p className="font-body text-lg lg:text-xl mb-8" style={{ color: '#E8D5B7', lineHeight: 1.7 }}>
          Pre-order now and receive exclusive bonus content: the complete 20 Core Laws guide, a curated reading list, and early access to the audiobook.
        </p>

        <p className="font-playfair text-2xl lg:text-[28px] font-medium mb-10" style={{ color: '#D4A853' }}>
          Starting at ₹499 / $12.99
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link
            to="/preorder"
            className="font-ui text-xs font-semibold uppercase tracking-[0.12em] px-12 py-4 rounded transition-all duration-300 hover:-translate-y-0.5"
            style={{
              backgroundColor: '#D4A853',
              color: '#2C2417',
              boxShadow: '0 8px 24px rgba(212,168,83,0.3)',
            }}
          >
            Pre-Order Now
          </Link>
          <Link
            to="/preorder"
            className="inline-flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-[0.12em] px-8 py-4 rounded border-[1.5px] border-warm-sand/40 transition-all duration-300 hover:-translate-y-0.5"
            style={{ color: '#E8D5B7' }}
          >
            View All Editions
            <ArrowRight size={14} />
          </Link>
        </div>

        <p className="font-ui text-[11px] font-medium uppercase tracking-[0.1em]" style={{ color: 'rgba(232,213,183,0.6)' }}>
          Available in Paperback · Hardcover · E-book · Audiobook
        </p>
      </div>
    </section>
  );
}
