import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Instagram } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Seo from '../components/Seo';
import { personSchema } from '../lib/seo-schemas';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  SECTION 1 — HERO                                                  */
/* ------------------------------------------------------------------ */
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
      });
      gsap.from(contentRef.current?.children || [], {
        x: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.3,
        ease: 'expo.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: '#2C2417', height: '80vh', minHeight: '600px' }}
      className="relative overflow-hidden flex"
    >
      {/* Left Column — Image */}
      <div
        ref={imageRef}
        className="absolute inset-y-0 left-0 w-full lg:w-[45%] hidden lg:block"
      >
        <img
          src="/author-dhruv.jpg"
          alt="Dhruv Jain"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-y-0 right-0 w-32"
          style={{
            background:
              'linear-gradient(to right, transparent, #2C2417)',
          }}
        />
      </div>

      {/* Right Column — Content */}
      <div className="relative z-10 flex items-center justify-center lg:justify-start w-full lg:w-[55%] lg:ml-auto px-6 lg:pl-16 py-16">
        <div
          ref={contentRef}
          className="max-w-[560px] text-center lg:text-left"
        >
          {/* Section Label */}
          <div
            className="font-ui text-[11px] font-semibold uppercase tracking-[0.15em] mb-6"
            style={{ color: '#D4A853' }}
          >
            ━━━ THE AUTHOR
          </div>

          {/* Headline */}
          <h1
            className="font-display text-display-lg font-semibold"
            style={{ color: '#FFFFFF' }}
          >
            Dhruv Jain
          </h1>

          {/* Tagline */}
          <p
            className="font-body text-lg italic mt-4"
            style={{ color: '#E8D5B7' }}
          >
            Banker. Builder. Father. Writer of the book he wished his younger
            self had read.
          </p>

          {/* Bio Teaser */}
          <p
            className="font-body text-base mt-6 leading-relaxed"
            style={{ color: 'rgba(232,213,183,0.8)' }}
          >
            Dhruv Jain grew up believing the most important education was the one
            that arrived without a school to deliver it. He spent twenty years in
            big banks. Then he built something different.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
            {[
              { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhruvjain' },
              { Icon: Twitter, label: 'X (Twitter)', href: 'https://x.com/TheMangoSeed' },
              { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/themangoseed' },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-colors duration-300"
                style={{ color: '#E8D5B7' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = '#D4A853')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = '#E8D5B7')
                }
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 2 — ORIGIN STORY                                          */
/* ------------------------------------------------------------------ */
function OriginSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Paragraphs stagger
      gsap.from(
        (leftRef.current?.querySelectorAll('.origin-para') as NodeListOf<Element>) || [],
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Pull quote
      gsap.from(quoteRef.current, {
        x: -20,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 85%',
        },
      });

      // Image
      gsap.from(rightRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: rightRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-xl"
      style={{ backgroundColor: '#FDF6E3' }}
    >
      <div
        className="mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-start"
        style={{ maxWidth: '1200px' }}
      >
        {/* Left — Text */}
        <div ref={leftRef}>
          <div
            className="font-ui text-[11px] font-semibold uppercase tracking-[0.15em] mb-6"
            style={{ color: '#D4A853' }}
          >
            ━━━ THE ORIGIN
          </div>

          <h2
            className="font-display text-display-md font-semibold mb-8"
            style={{ color: '#3A5233' }}
          >
            It Began as a Birthday Gift.
          </h2>

          <p
            className="origin-para font-body text-base leading-relaxed mb-6"
            style={{ color: '#6B4C3B' }}
          >
            In July 2026, Dhruv&apos;s son Ved turned eleven. Like any father who
            has spent decades learning what matters, Dhruv wanted to give his son
            something that would outlast any toy or gadget. He wanted to give him
            wisdom — but not as a lecture. As a story.
          </p>

          <p
            className="origin-para font-body text-base leading-relaxed mb-6"
            style={{ color: '#6B4C3B' }}
          >
            He sat down and wrote the first chapter. Then the second. What began
            as a single tale grew into 40 chapters, weaving together the lessons
            of one hundred books Dhruv had read and lived over forty years.
          </p>

          <p
            className="origin-para font-body text-base leading-relaxed mb-8"
            style={{ color: '#6B4C3B' }}
          >
            The book was never meant for publication. It was a father&apos;s voice,
            preserved in pages, so his son could hear it even when Dhruv was not
            there to speak.
          </p>

          {/* Pull Quote */}
          <blockquote
            ref={quoteRef}
            className="pl-6 my-10"
            style={{ borderLeft: '3px solid #D4A853' }}
          >
            <p
              className="font-script text-2xl leading-relaxed"
              style={{ color: '#C4654A' }}
            >
              I wanted Ved to have a grandfather&apos;s wisdom even if I am not
              there to deliver it in person.
            </p>
          </blockquote>

          <p
            className="origin-para font-body text-lg font-semibold leading-relaxed"
            style={{ color: '#3A5233' }}
          >
            Then friends read it. Then their friends. And something became
            clear: this was not just a gift for one boy. It was a story the world
            was waiting for.
          </p>
        </div>

        {/* Right — Image */}
        <div ref={rightRef} className="relative">
          <img
            src="/grandfather-grandson.jpg"
            alt="The story that started as a gift"
            className="w-full rounded-lg"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
          {/* Decorative mango seed watermark */}
          <img
            src="/mango-seed.svg"
            alt=""
            className="absolute -bottom-8 -right-4 pointer-events-none"
            style={{
              width: '200px',
              height: '200px',
              opacity: 0.05,
              color: '#D4A853',
            }}
          />
          <p
            className="font-ui text-[11px] font-medium mt-3"
            style={{ color: '#8B6F5E' }}
          >
            The story that started as a gift.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 3 — THE PATH (Timeline)                                   */
/* ------------------------------------------------------------------ */
function PathSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      // Timeline line draw animation
      if (lineRef.current) {
        const lineLength = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: lineLength,
          strokeDashoffset: lineLength,
        });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: 1,
          },
        });
      }

      // Node animations
      nodesRef.current.forEach((node, i) => {
        if (!node) return;
        const isLeft = i % 2 === 0;

        gsap.from(node, {
          x: isLeft ? -30 : 30,
          opacity: 0,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 85%',
          },
        });

        // Circle scale
        const circle = node.querySelector('.tl-circle');
        if (circle) {
          gsap.from(circle, {
            scale: 0,
            duration: 0.3,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
            },
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const timelineItems = [
    {
      label: 'THE EARLY YEARS',
      text: 'Grew up with the belief that the best education comes from life, not just classrooms. Built a career in banking across two decades \u2014 learning how money, people, and systems actually work.',
    },
    {
      label: 'ZIQSY GROUP',
      text: 'Founded Ziqsy Group \u2014 a social enterprise spanning Ireland, Dubai, and the UK in consulting, AI, and health technology. Ziqsy Health AI holds 12 patents and builds diagnostic tools for underserved populations.',
    },
    {
      label: 'THE BOOK',
      text: "On July 13, 2026 \u2014 Ved's 11th birthday \u2014 the first draft was complete. What began as a father's gift became The Mango Seed: a narrative that weaves 100+ great books into one unforgettable story.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-lg"
      style={{ backgroundColor: '#F5ECD7' }}
    >
      <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '1000px' }}>
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div
            className="font-ui text-[11px] font-semibold uppercase tracking-[0.15em] mb-6"
            style={{ color: '#D4A853' }}
          >
            ━━━ THE PATH
          </div>
          <h2
            className="font-display text-display-md font-semibold"
            style={{ color: '#3A5233' }}
          >
            Twenty Years in Banks. Then a Different Kind of Building.
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line SVG */}
          <svg
            className="absolute left-1/2 top-0 h-full -translate-x-1/2 hidden lg:block"
            width="4"
            style={{ overflow: 'visible' }}
          >
            <line
              ref={lineRef}
              x1="2"
              y1="0"
              x2="2"
              y2="100%"
              stroke="#E8D5B7"
              strokeWidth="2"
            />
          </svg>

          {/* Mobile line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-[2px] lg:hidden"
            style={{ backgroundColor: '#E8D5B7' }}
          />

          {/* Nodes */}
          <div className="space-y-16 lg:space-y-24">
            {timelineItems.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={item.label}
                  ref={(el) => { nodesRef.current[i] = el; }}
                  className={`relative flex flex-col lg:flex-row items-start gap-8 lg:gap-0 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 pl-12 lg:pl-0 ${
                      isLeft ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'
                    }`}
                  >
                    <div
                      className="font-ui text-xs font-medium uppercase tracking-[0.1em] mb-2"
                      style={{ color: '#D4A853' }}
                    >
                      {item.label}
                    </div>
                    <p
                      className="font-body text-base leading-relaxed"
                      style={{ color: '#6B4C3B' }}
                    >
                      {item.text}
                    </p>
                  </div>

                  {/* Circle node */}
                  <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 top-1">
                    <div
                      className="tl-circle w-3 h-3 rounded-full"
                      style={{ backgroundColor: '#D4A853' }}
                    />
                  </div>

                  {/* Empty half for alternating layout */}
                  <div className="hidden lg:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 4 — PHILOSOPHY                                            */
/* ------------------------------------------------------------------ */
function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.12,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const cards = [
    {
      title: 'Education Without Classrooms',
      quote:
        'The most important education is the one that arrives without a school to deliver it. The world teaches those who pay attention.',
    },
    {
      title: 'Business as Service',
      quote:
        'The building is not the point. The building is the practice. What you become while building matters more than what you build.',
    },
    {
      title: 'The Power of Stories',
      quote:
        'A single story can hold the wisdom of a hundred books if it is told with enough love and enough truth.',
    },
    {
      title: 'Wisdom Over Information',
      quote:
        'Money is not the goal. It is optionality. True wealth is the freedom to choose how you spend your days.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-xl"
      style={{ backgroundColor: '#FDF6E3' }}
    >
      <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '1000px' }}>
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="font-ui text-[11px] font-semibold uppercase tracking-[0.15em] mb-6"
            style={{ color: '#D4A853' }}
          >
            ━━━ PHILOSOPHY
          </div>
          <h2
            className="font-display text-display-md font-semibold"
            style={{ color: '#3A5233' }}
          >
            The Ideas That Shaped a Life.
          </h2>
        </div>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, i) => (
            <div
              key={card.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="rounded-lg p-10 transition-all duration-400 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(145deg, #F5ECD7 0%, #E8D5B7 100%)',
                borderLeft: '3px solid #D4A853',
              }}
            >
              <h3
                className="font-ui text-xs font-semibold uppercase tracking-[0.12em] mb-4"
                style={{ color: '#D4A853' }}
              >
                {card.title}
              </h3>
              <p
                className="font-script text-xl leading-relaxed"
                style={{ color: '#3A5233' }}
              >
                {card.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 5 — ZIQSY GROUP                                           */
/* ------------------------------------------------------------------ */
function ZiqsySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stat count-up
      const statEls =
        statsRef.current?.querySelectorAll('.stat-number') || [];
      statEls.forEach((el, i) => {
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        gsap.from(el, {
          textContent: 0,
          duration: 1.5,
          delay: i * 0.2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
          onUpdate: function () {
            const val = Math.round(Number(el.textContent || 0));
            el.textContent = String(val) + (i === 1 ? '' : i === 0 ? '' : i === 2 ? '+' : '');
          },
        });
        // Set final value after animation
        gsap.to(el, {
          textContent: target + (i === 2 ? '+' : ''),
          duration: 1.5,
          delay: i * 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
        });
      });

      // Description
      gsap.from(descRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 12, label: 'Patents in Health AI' },
    { value: 3, label: 'Countries (Ireland, Dubai, UK)' },
    { value: 20, label: 'Years in Finance' },
    { value: 1, label: 'Book That Changed Everything' },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-lg"
      style={{ backgroundColor: '#2C2417' }}
    >
      <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="font-ui text-[11px] font-semibold uppercase tracking-[0.15em] mb-6"
            style={{ color: '#D4A853' }}
          >
            ━━━ THE ENTERPRISE
          </div>
          <h2
            className="font-display text-display-md font-semibold"
            style={{ color: '#FFFFFF' }}
          >
            Ziqsy Group.
          </h2>
          <p
            className="font-body text-lg italic mt-4"
            style={{ color: '#E8D5B7' }}
          >
            Building technology that serves people.
          </p>
        </div>

        {/* Stats Row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="stat-number font-display text-[56px] font-semibold"
                style={{ color: '#D4A853' }}
                data-target={stat.value}
              >
                {stat.value}
                {stat.value === 20 ? '+' : ''}
              </div>
              <div
                className="font-ui text-[11px] font-medium uppercase tracking-[0.08em] mt-2"
                style={{ color: '#E8D5B7' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div ref={descRef} className="text-center">
          <p
            className="font-body text-base leading-relaxed mx-auto"
            style={{
              color: 'rgba(232,213,183,0.8)',
              maxWidth: '720px',
            }}
          >
            Ziqsy Group operates across consulting, artificial intelligence, and
            health technology. Ziqsy Health AI focuses on building diagnostic
            tools for populations that traditional healthcare infrastructure
            often overlooks. The same belief that shaped The Mango Seed — that
            the most important things arrive when you pay attention to what
            others overlook — drives the company&apos;s mission.
          </p>

          <a
            href="https://www.ziqsy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 font-ui text-xs font-semibold uppercase tracking-[0.12em] px-8 py-3.5 rounded transition-all duration-300 hover:-translate-y-0.5"
            style={{
              border: '1.5px solid #E8D5B7',
              color: '#E8D5B7',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E8D5B7';
              e.currentTarget.style.color = '#2C2417';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#E8D5B7';
            }}
          >
            Learn More About Ziqsy →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 6 — CTA                                                   */
/* ------------------------------------------------------------------ */
function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-lg"
      style={{
        background: 'linear-gradient(90deg, #FDF6E3 0%, #E8D5B7 50%, #D4A853 100%)',
      }}
    >
      <div
        ref={contentRef}
        className="mx-auto px-6 lg:px-12 text-center"
        style={{ maxWidth: '700px' }}
      >
        <h2
          className="font-display text-display-lg font-semibold"
          style={{ color: '#3A5233' }}
        >
          The Story Is Waiting.
        </h2>

        <p
          className="font-body text-lg mt-4"
          style={{ color: '#6B4C3B' }}
        >
          A grandfather&apos;s life. 100 great books. One story you&apos;ll never
          forget.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            to="/preorder"
            className="font-ui text-xs font-semibold uppercase tracking-[0.12em] px-10 py-4 rounded transition-all duration-300 hover:-translate-y-0.5"
            style={{
              backgroundColor: '#D4A853',
              color: '#2C2417',
            }}
          >
            Pre-Order Now
          </Link>

          <Link
            to="/excerpts"
            className="font-ui text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-300"
            style={{ color: '#C4654A' }}
          >
            Read a Sample →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                              */
/* ------------------------------------------------------------------ */
export default function Author() {
  return (
    <div>
      <Seo
        title="The Author"
        description="Dhruv Jain — Chairman of Ziqsy Group (Ireland, Dubai, UK), two decades in banking, and author of The Mango Seed. A book written for his son Ved's eleventh birthday — and for anyone who has wondered what really matters."
        path="/author"
        type="profile"
        image="/author-dhruv.jpg"
        jsonLd={personSchema}
      />
      <HeroSection />
      <OriginSection />
      <PathSection />
      <PhilosophySection />
      <ZiqsySection />
      <CTASection />
    </div>
  );
}
