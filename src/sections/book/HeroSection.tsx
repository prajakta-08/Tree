import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Dust Particle                                                      */
/* ------------------------------------------------------------------ */
interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  phase: number;
}

/* ------------------------------------------------------------------ */
/*  Hero Section — GSAP only (isolated)                                */
/* ------------------------------------------------------------------ */
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* ---- Dust particles (canvas, rAF) ---- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    const createParticles = () => {
      particles.length = 0;
      for (let i = 0; i < 18; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.8,
          speedY: -(Math.random() * 0.25 + 0.08),
          speedX: (Math.random() - 0.5) * 0.12,
          opacity: Math.random() * 0.35 + 0.12,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001;

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.phase) * 0.04;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        const flicker = 0.7 + Math.sin(time * 1.5 + p.phase) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,168,83,${p.opacity * flicker})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* ---- GSAP entrance + zoom ---- */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Slow zoom on background
      gsap.to(bgRef.current, {
        scale: 1.06,
        duration: 18,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      });

      // Stagger content entrance
      const els = contentRef.current?.children;
      if (els) {
        gsap.from(els, {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.4,
        });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ height: '70vh', minHeight: '520px', backgroundColor: '#2C2417' }}
    >
      {/* Background image with slow zoom */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-100"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/village-dusk.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        />
        {/* Tree canopy gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #2C2417 0%, rgba(44,36,23,0.85) 50%, rgba(44,36,23,0.4) 100%)',
          }}
        />
      </div>

      {/* Dust particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6"
        style={{ maxWidth: '800px', margin: '0 auto' }}
      >
        <div ref={contentRef}>
          {/* Section label */}
          <div
            className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] mb-6"
            style={{ color: '#D4A853' }}
          >
            &mdash;&mdash;&mdash; THE BOOK
          </div>

          {/* Headline */}
          <h1
            className="font-playfair font-semibold mb-6"
            style={{
              fontSize: 'clamp(36px, 5.5vw, 72px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
            }}
          >
            The Journey of a Lifetime
          </h1>

          {/* Subtitle */}
          <p
            className="font-source-serif mb-10 max-w-[600px] mx-auto"
            style={{
              fontSize: '18px',
              lineHeight: 1.75,
              color: '#E8D5B7',
            }}
          >
            Six seasons. One extraordinary journey. 40 chapters weaving together
            100 great books into a single life lived from a Rajasthan village to
            global wisdom — told the way a grandfather tells it: with patience,
            warmth, and truth that stays.
          </p>

          {/* CTA */}
          <div>
            <Link
              to="/excerpts"
              className="inline-flex items-center gap-2 font-inter text-xs font-semibold uppercase tracking-[0.12em] px-9 py-3.5 rounded transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: '#D4A853',
                color: '#2C2417',
              }}
            >
              Start Reading
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
