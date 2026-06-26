import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PromiseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      ScrollTrigger.create({
        trigger: counterRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: 100,
            duration: 2,
            ease: 'expo.out',
            onUpdate: function () {
              setCount(Math.round(this.targets()[0].val));
            },
          });
        },
        once: true,
      });

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: 'expo.out', delay: 0.2,
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <div ref={labelRef} className="flex items-center gap-3 mb-8" style={{ opacity: 0 }}>
              <span className="w-6 h-[2px] inline-block" style={{ backgroundColor: '#D4A853' }} />
              <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: '#D4A853' }}>
                THE PROMISE
              </span>
            </div>

            <h2
              ref={headlineRef}
              className="font-playfair font-semibold text-display-md mb-6"
              style={{ color: '#3A5233', opacity: 0 }}
            >
              100 Books. One Life. Every Lesson Inside a Story You'll Never Forget.
            </h2>

            <p
              ref={bodyRef}
              className="font-body text-lg lg:text-xl mb-10"
              style={{ color: '#6B4C3B', lineHeight: 1.7, opacity: 0 }}
            >
              The Alchemist. Atomic Habits. Sapiens. The Psychology of Money. Think Like a Monk. Deep Work. Man's Search for Meaning. 93 more. Each chapter of The Mango Seed weaves 2–5 classics into the life of Arjun — from a Rajasthan village to the world stage — so you absorb their wisdom the way humans were meant to: through story.
            </p>

            <div ref={counterRef} className="mb-8">
              <span className="font-playfair text-6xl lg:text-7xl font-semibold" style={{ color: '#D4A853' }}>
                {count}+
              </span>
              <p className="font-ui text-[13px] font-medium uppercase tracking-wider mt-2" style={{ color: '#8B6F5E' }}>
                Great Books Woven Into One Narrative
              </p>
            </div>

            <Link
              to="/book"
              className="inline-flex items-center gap-2 font-inter text-sm font-semibold transition-all duration-300 group"
              style={{ color: '#C4654A' }}
            >
              Explore the 100 Books
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>

          <div className="lg:col-span-5 lg:mt-16 relative">
            <div ref={imageRef} style={{ opacity: 0 }}>
              <img
                src="/stack-of-classics.jpg"
                alt="Stack of classic books"
                className="w-full rounded-lg"
                style={{ boxShadow: '0 20px 60px rgba(44,36,23,0.15)' }}
              />
              <img
                src="/mango-leaf.svg"
                alt=""
                className="absolute -top-5 -right-5 w-10 h-10"
                style={{ opacity: 0.2, filter: 'sepia(1) saturate(2) hue-rotate(10deg)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
