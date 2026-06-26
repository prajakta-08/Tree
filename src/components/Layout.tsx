import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import SessionLedger from './SessionLedger';
import CookieConsent from './CookieConsent';
import { trackEvent } from '../lib/analytics';

gsap.registerPlugin(ScrollTrigger);

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
    trackEvent('page_view', { path: location.pathname });
  }, [location.pathname]);

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded font-ui text-[12px] font-semibold uppercase tracking-[0.1em]"
        style={{ backgroundColor: '#D4A853', color: '#2C2417' }}
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
      <Footer />
      <SessionLedger />
      <CookieConsent />
    </div>
  );
}
