import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pretitleRef = useRef<HTMLParagraphElement>(null);
  const title1Ref = useRef<HTMLSpanElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 }
      )
        .fromTo(
          pretitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 0.9, y: 0, duration: 0.6, ease: 'power3.out' },
          0.4
        )
        .fromTo(
          title1Ref.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' },
          0.6
        )
        .fromTo(
          title2Ref.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' },
          0.9
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' },
          1.3
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' },
          1.6
        )
        .fromTo(
          scrollIndRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          2.2
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#2C2417' }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity: videoLoaded ? 0.6 : 0 }}
      >
        <source src="/hero-tree-breeze.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #2C2417 0%, rgba(44,36,23,0.8) 60%, rgba(44,36,23,0) 100%)',
        }}
      />

      <div className="relative z-10 mx-auto px-6 text-center" style={{ maxWidth: '800px' }}>
        <p
          ref={pretitleRef}
          className="font-ui text-xs font-medium uppercase tracking-[0.2em] mb-6"
          style={{ color: '#D4A853', opacity: 0 }}
        >
          A Story That Grew From 100 Great Books
        </p>

        <h1 className="font-playfair font-semibold text-pure-white mb-8" style={{ letterSpacing: '-0.03em' }}>
          <span
            ref={title1Ref}
            className="block text-display-xl"
            style={{ opacity: 0 }}
          >
            The Mango
          </span>
          <span
            ref={title2Ref}
            className="block text-display-xl"
            style={{ color: '#D4A853', opacity: 0, marginLeft: '0.3em' }}
          >
            Seed
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="font-body text-lg lg:text-xl mx-auto mb-12"
          style={{ color: '#E8D5B7', maxWidth: '560px', lineHeight: 1.7, opacity: 0 }}
        >
          A grandfather's life. A grandson's inheritance. One story that holds every lesson you were never taught.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-5" style={{ opacity: 0 }}>
          <Link
            to="/preorder"
            className="font-ui text-xs font-semibold uppercase tracking-[0.12em] px-9 py-3.5 rounded transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: '#D4A853', color: '#2C2417', boxShadow: '0 8px 24px rgba(212,168,83,0.3)' }}
          >
            Pre-Order Now
          </Link>
          <Link
            to="/excerpts"
            className="font-ui text-xs font-semibold uppercase tracking-[0.12em] px-9 py-3.5 rounded border-[1.5px] transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor: '#E8D5B7', color: '#E8D5B7' }}
          >
            Read the First Chapter
          </Link>
        </div>
      </div>

      <div
        ref={scrollIndRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <img
          src="/mango-seed.svg"
          alt=""
          className="w-6 h-8 animate-bob"
          style={{ filter: 'invert(69%) sepia(52%) saturate(427%) hue-rotate(5deg) brightness(92%) contrast(88%)' }}
        />
        <span className="font-ui text-[10px] uppercase tracking-wider" style={{ color: 'rgba(232,213,183,0.5)' }}>
          Scroll to enter
        </span>
      </div>
    </section>
  );
}
