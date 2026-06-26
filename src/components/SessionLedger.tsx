import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';

/**
 * SessionLedger
 * ──────────────────────────────────────────────────────────────
 * A persistent, accumulating reading log. Watches every <section>
 * on the page and writes a styled row when the visitor crosses
 * 25% into a new section. When the footer comes into view, the
 * ledger is "signed" with a wax-seal flourish.
 *
 * - Self-discovering: no per-section edits required. Looks for
 *   any <section> with a heading (h1/h2/h3) inside it and uses
 *   that as the label. Sections with `data-ledger-id` win.
 * - Privacy: pure client-side. No network. localStorage stores
 *   only the user's "I dismissed it" preference.
 * - Accessibility: role="log" aria-live; full keyboard nav;
 *   honors prefers-reduced-motion.
 */

type Entry = {
  id: string;
  label: string;
  ts: number; // ms
};

const STORAGE_DISMISSED = 'mango.ledger.dismissed';
const STORAGE_HIDE_FOREVER = 'mango.ledger.hide_forever';

function pageKey(pathname: string) {
  return pathname === '/' ? 'home' : pathname.replace(/^\//, '').replace(/\//g, '-');
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function formatTime(ms: number) {
  const d = new Date(ms);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDuration(ms: number) {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return r === 0 ? `${m} min` : `${m} min ${r}s`;
}

function deriveLabel(el: Element, fallback: string): string {
  const explicit = (el as HTMLElement).dataset?.ledgerId;
  if (explicit) {
    return explicit
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  const heading = el.querySelector('h1, h2, h3');
  if (heading) {
    const txt = (heading.textContent || '').trim();
    if (txt) return txt.length > 64 ? txt.slice(0, 61) + '…' : txt;
  }
  const id = (el as HTMLElement).id;
  if (id) {
    return id
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return fallback;
}

export default function SessionLedger() {
  const location = useLocation();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [signed, setSigned] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const startedAt = useRef<number>(Date.now());
  const seenIds = useRef<Set<string>>(new Set());
  const reduced = useRef<boolean>(false);

  // Hydrate dismissal preference once
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_HIDE_FOREVER) === '1') {
        setDismissed(true);
      } else if (localStorage.getItem(STORAGE_DISMISSED) === '1') {
        // dismissed for this session only — still hidden until refresh? No, soft-dismiss is per-tab.
      }
    } catch {}
    reduced.current = prefersReducedMotion();
    setMounted(true);
  }, []);

  // Reset on route change so each page has its own ledger
  useEffect(() => {
    setEntries([]);
    seenIds.current = new Set();
    setSigned(false);
    startedAt.current = Date.now();
  }, [location.pathname]);

  // Observe sections + footer
  useEffect(() => {
    if (!mounted || dismissed) return;
    if (typeof window === 'undefined') return;

    let raf = 0;
    const setup = () => {
      const sections = Array.from(document.querySelectorAll('main section'));
      const footer = document.querySelector('footer');
      const all: Element[] = [...sections, ...(footer ? [footer] : [])];
      if (all.length === 0) return;

      const sectionObserver = new IntersectionObserver(
        (records) => {
          for (const r of records) {
            if (!r.isIntersecting) continue;
            const el = r.target as HTMLElement;
            if (el.tagName.toLowerCase() === 'footer') {
              setSigned(true);
              setExpanded(true);
              continue;
            }
            const idx = sections.indexOf(el);
            const id = `${pageKey(location.pathname)}-${idx}`;
            if (seenIds.current.has(id)) continue;
            seenIds.current.add(id);
            const label = deriveLabel(el, `Section ${idx + 1}`);
            setEntries((prev) => [
              ...prev,
              { id, label, ts: Date.now() },
            ]);
          }
        },
        { threshold: 0.25 },
      );

      all.forEach((el) => sectionObserver.observe(el));

      return () => sectionObserver.disconnect();
    };

    // Slight delay to let the page lay out (esp. after route change)
    const t = window.setTimeout(() => {
      raf = requestAnimationFrame(() => {
        const cleanup = setup();
        // Stash on window so we can clean up on next route change
        (window as any).__mangoLedgerCleanup?.();
        (window as any).__mangoLedgerCleanup = cleanup;
      });
    }, 250);

    return () => {
      window.clearTimeout(t);
      cancelAnimationFrame(raf);
      const c = (window as any).__mangoLedgerCleanup;
      if (typeof c === 'function') c();
      (window as any).__mangoLedgerCleanup = null;
    };
  }, [mounted, dismissed, location.pathname]);

  const totalSections = useMemo(() => {
    if (typeof document === 'undefined') return 0;
    return document.querySelectorAll('main section').length || entries.length;
  }, [entries.length, location.pathname]);

  if (!mounted || dismissed) return null;

  const dismissForSession = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_DISMISSED, '1');
    } catch {}
  };

  const dismissForever = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_HIDE_FOREVER, '1');
    } catch {}
  };

  const transition = reduced.current
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <div
      className="fixed z-40 print:hidden"
      style={{ right: 'clamp(12px, 2vw, 24px)', bottom: 'clamp(12px, 2vw, 24px)' }}
      role="log"
      aria-live="polite"
      aria-label="Reading session ledger"
    >
      <AnimatePresence mode="wait" initial={false}>
        {!expanded ? (
          <motion.button
            key="pill"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={transition}
            onClick={() => setExpanded(true)}
            className="group flex items-center gap-2.5 rounded-full backdrop-blur"
            style={{
              backgroundColor: 'rgba(245,236,215,0.95)',
              border: '1px solid #E8D5B7',
              boxShadow: '0 8px 24px rgba(44,36,23,0.12)',
              padding: '10px 16px',
              color: '#3A5233',
            }}
            aria-label={`Open reading ledger. ${entries.length} of ${totalSections || '–'} sections read.`}
          >
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: '#D4A853' }}
              aria-hidden
            />
            <span
              className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em]"
            >
              Reading log
            </span>
            <span
              className="font-source-serif text-[12px] tabular-nums"
              style={{ color: '#6B4C3B' }}
            >
              {entries.length}{totalSections ? `/${totalSections}` : ''}
            </span>
            <Plus
              size={14}
              strokeWidth={2}
              className="opacity-60 group-hover:opacity-100 transition-opacity"
              aria-hidden
            />
          </motion.button>
        ) : (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={transition}
            className="rounded-xl overflow-hidden"
            style={{
              width: 'min(320px, calc(100vw - 32px))',
              backgroundColor: '#F5ECD7',
              border: '1px solid #E8D5B7',
              boxShadow: '0 16px 48px rgba(44,36,23,0.18)',
            }}
          >
            {/* Header strip */}
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ backgroundColor: '#3A5233', color: '#FDF6E3' }}
            >
              <div className="flex items-center gap-2">
                <img
                  src="/mango-leaf.svg"
                  alt=""
                  className="w-3.5 h-3.5"
                  style={{ filter: 'brightness(0) invert(1)', opacity: 0.85 }}
                />
                <span className="font-playfair text-[14px] tracking-wide">
                  Reading Log
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setExpanded(false)}
                  aria-label="Collapse"
                  className="p-1 rounded hover:bg-white/10 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <button
                  onClick={dismissForSession}
                  aria-label="Dismiss for this session"
                  className="p-1 rounded hover:bg-white/10 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div
              className="px-4 py-3 max-h-[55vh] overflow-y-auto"
              style={{ backgroundColor: '#F5ECD7' }}
            >
              {entries.length === 0 ? (
                <p
                  className="font-source-serif italic text-[13px] py-2"
                  style={{ color: '#8B6F5E' }}
                >
                  Begin reading. Each section you cross will be noted here.
                </p>
              ) : (
                <ul className="space-y-2.5">
                  <AnimatePresence initial={false}>
                    {entries.map((e) => (
                      <motion.li
                        key={e.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={transition}
                        className="flex items-baseline gap-3"
                      >
                        <span
                          className="font-inter text-[10px] tabular-nums tracking-wider"
                          style={{ color: '#8B6F5E' }}
                        >
                          {formatTime(e.ts)}
                        </span>
                        <span className="flex-1 relative">
                          <span
                            className="font-source-serif text-[14px] leading-snug"
                            style={{ color: '#3A5233' }}
                          >
                            {e.label}
                          </span>
                          <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="absolute left-0 right-0 -bottom-0.5 origin-left"
                            style={{
                              height: 1,
                              backgroundColor: '#D4A853',
                              opacity: 0.45,
                            }}
                          />
                        </span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}

              {/* Signed-at-the-close-of-the-road footer */}
              {signed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-4 pt-4"
                  style={{ borderTop: '1px solid #E8D5B7' }}
                >
                  <div className="flex items-center gap-3">
                    <motion.img
                      src="/mango-seed.svg"
                      alt=""
                      initial={{ rotate: -8, scale: 0.8 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ duration: 0.7, ease: 'backOut' }}
                      className="w-7 h-7"
                      style={{ filter: 'sepia(1) saturate(4) hue-rotate(-15deg) brightness(0.65)' }}
                    />
                    <div className="flex-1">
                      <p
                        className="font-cormorant italic text-[15px] leading-tight"
                        style={{ color: '#A8423F' }}
                      >
                        Signed at the close of the road.
                      </p>
                      <p
                        className="font-inter text-[10px] uppercase tracking-[0.1em] mt-0.5"
                        style={{ color: '#8B6F5E' }}
                      >
                        {formatDuration(Date.now() - startedAt.current)} ·{' '}
                        {entries.length} section{entries.length === 1 ? '' : 's'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={dismissForever}
                    className="mt-3 font-inter text-[10px] uppercase tracking-[0.1em] underline decoration-dotted underline-offset-4 transition-opacity hover:opacity-70"
                    style={{ color: '#8B6F5E' }}
                  >
                    Don't show again
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
