import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { bookSchema } from '../lib/seo-schemas';
import { trackEvent } from '../lib/analytics';
import {
  Check,
  Lock,
  Truck,
  ShieldCheck,
  Headphones,
  BookOpen,
  BookMarked,
  Tablet,
  FileText,
  List,
  Clock,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  return { ref, inView };
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
};

/* ------------------------------------------------------------------ */
/*  Icons for edition cards                                            */
/* ------------------------------------------------------------------ */

function EbookIcon() {
  return <Tablet size={48} strokeWidth={1.5} />;
}

function PaperbackIcon() {
  return <BookOpen size={48} strokeWidth={1.5} />;
}

function HardcoverIconComp() {
  return <BookMarked size={48} strokeWidth={1.5} />;
}

function AudiobookIcon() {
  return <Headphones size={48} strokeWidth={1.5} />;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Currency = 'USD' | 'GBP' | 'AED' | 'INR';

const CURRENCIES: { code: Currency; label: string }[] = [
  { code: 'USD', label: 'USD $' },
  { code: 'GBP', label: 'GBP £' },
  { code: 'AED', label: 'AED' },
  { code: 'INR', label: 'INR \u20B9' },
];

function formatPrice(currency: Currency, amount: number): string {
  if (currency === 'USD') return `$${amount.toFixed(2).replace(/\.00$/, '')}`;
  if (currency === 'GBP') return `\u00A3${amount.toFixed(2).replace(/\.00$/, '')}`;
  if (currency === 'AED') return `AED ${Math.round(amount)}`;
  return `\u20B9${Math.round(amount).toLocaleString('en-IN')}`;
}

const CurrencyContext = createContext<{
  currency: Currency;
  setCurrency: (c: Currency) => void;
}>({ currency: 'USD', setCurrency: () => {} });

function useCurrency() {
  return useContext(CurrencyContext);
}

function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('USD');

  useEffect(() => {
    const saved = localStorage.getItem('preorderCurrency') as Currency | null;
    if (saved && (['USD', 'GBP', 'AED', 'INR'] as const).includes(saved)) {
      setCurrencyState(saved);
      return;
    }
    const locale = (navigator.language || '').toUpperCase();
    if (locale.includes('IN')) setCurrencyState('INR');
    else if (locale.includes('GB') || locale.includes('UK')) setCurrencyState('GBP');
    else if (locale.includes('AE')) setCurrencyState('AED');
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('preorderCurrency', c);
    } catch {}
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

const editions = [
  {
    key: 'ebook',
    icon: <EbookIcon />,
    name: 'E-Book',
    prices: { USD: 7.99, GBP: 6.99, AED: 29, INR: 349 } as Record<Currency, number>,
    badge: null,
    ctaStyle: 'secondary' as const,
    features: [
      'Instant delivery on release day',
      'Read on any device',
      'Bonus: 20 Core Laws printable',
    ],
  },
  {
    key: 'paperback',
    icon: <PaperbackIcon />,
    name: 'Paperback',
    prices: { USD: 16.99, GBP: 13.99, AED: 62, INR: 599 } as Record<Currency, number>,
    badge: 'MOST POPULAR',
    ctaStyle: 'primary' as const,
    features: [
      '304 pages, premium quality',
      'Signed bookplate included (pre-orders only)',
      'Free shipping',
      'Bonus: All digital bonuses',
    ],
  },
  {
    key: 'hardcover',
    icon: <HardcoverIconComp />,
    name: "Hardcover Collector's Edition",
    prices: { USD: 29.99, GBP: 23.99, AED: 110, INR: 1199 } as Record<Currency, number>,
    badge: "COLLECTOR'S",
    ctaStyle: 'secondary' as const,
    features: [
      'Cloth-bound with foil stamping',
      'Ribbon bookmark, deckle edge pages',
      'Signed by the author',
      'Exclusive dust jacket art',
      'Bonus: All digital bonuses + author note',
    ],
  },
  {
    key: 'audiobook',
    icon: <AudiobookIcon />,
    name: 'Audiobook',
    prices: { USD: 14.99, GBP: 12.99, AED: 55, INR: 499 } as Record<Currency, number>,
    badge: null,
    ctaStyle: 'secondary' as const,
    features: [
      'Professional narration',
      '12+ hours of immersive storytelling',
      'Early access (1 week before general release)',
      'Bonus: Exclusive interview with author',
    ],
  },
];

const bonuses = [
  {
    icon: <FileText size={40} strokeWidth={1.5} />,
    title: 'The 20 Laws Guide',
    desc: 'A beautifully designed digital guide with all 20 laws, their context from the book, and reflection prompts for each.',
  },
  {
    icon: <List size={40} strokeWidth={1.5} />,
    title: 'The 100 Books Reading List',
    desc: "The complete list of 100+ books woven into The Mango Seed, organized by theme and season, with Dhruv's personal notes on each.",
  },
  {
    icon: <Clock size={40} strokeWidth={1.5} />,
    title: 'Early Audiobook Access',
    desc: 'Audiobook purchasers get immediate access. Other editions receive the audiobook 48 hours before public release.',
  },
];

const faqItems = [
  {
    q: 'When will I receive my book?',
    a: 'The Mango Seed releases in July 2026. E-book and audiobook are delivered instantly on release day. Paperback and hardcover ship to arrive on or before release day for all pre-orders.',
  },
  {
    q: 'Is this a self-help book or a novel?',
    a: 'Both. The Mango Seed reads like a novel — the story of Arjun\'s life from Rajasthan village to global wisdom — but every chapter weaves in the lessons of 2-5 classic self-development books. You absorb the wisdom through story.',
  },
  {
    q: 'Do I need to have read the 100 books?',
    a: "Not at all. The Mango Seed is designed as a complete experience. If you have read some of the 100 books, you'll appreciate the weaving. If not, you'll discover them through Arjun's story.",
  },
  {
    q: 'Is this only for Indian readers?',
    a: "The story is rooted in Rajasthan, but its lessons are universal. Early readers from across the world have connected deeply with Arjun's journey. The Indian setting adds flavor; the wisdom transcends borders.",
  },
  {
    q: 'Can I gift this to someone?',
    a: 'Absolutely. The Mango Seed was born as a gift. Each edition makes a beautiful, meaningful present. Gift wrapping is available for paperback and hardcover pre-orders.',
  },
];

/* ------------------------------------------------------------------ */
/*  Section 1 — Hero                                                   */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const { ref, inView } = useReveal();

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '50vh', backgroundColor: '#2C2417' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{ opacity: 0.4 }}
      >
        <img
          src="/mango-seed-closeup.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Radial overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(44,36,23,0.3) 0%, rgba(44,36,23,0.85) 100%)',
        }}
      />

      {/* Content */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 text-center px-6"
        style={{ maxWidth: '700px', paddingTop: '120px', paddingBottom: '60px' }}
      >
        <motion.p
          variants={fadeUp}
          className="font-ui text-xs font-semibold uppercase tracking-[0.15em] mb-6"
          style={{ color: '#D4A853' }}
        >
          &mdash;&mdash;&mdash; PRE-ORDER
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-playfair font-semibold text-display-lg"
          style={{ color: '#FFFFFF' }}
        >
          Plant Your Seed.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="font-body text-body-lg mt-6"
          style={{ color: '#E8D5B7' }}
        >
          Choose your edition. Every pre-order includes exclusive bonus content.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="font-ui text-xs font-medium uppercase tracking-[0.1em] mt-5"
          style={{ color: '#D4A853' }}
        >
          Shipping July 2026 &middot; E-book &amp; Audiobook available on release day
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2 — Edition Cards                                          */
/* ------------------------------------------------------------------ */

function EditionCardsSection() {
  const { ref, inView } = useReveal();
  const { currency, setCurrency } = useCurrency();
  const [loadingEdition, setLoadingEdition] = useState<string | null>(null);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePreorder = async (editionKey: string) => {
    setLoadingEdition(editionKey);
    try {
      if (currency === 'INR') {
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          throw new Error('Failed to load Razorpay SDK');
        }
          const res = await fetch('/api/checkout/razorpay', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ edition: editionKey }),
          });

          const responseText = await res.text();
          console.log("API Response:", responseText);

          if (!res.ok) {
              throw new Error(responseText || "Failed to create Razorpay order");
          }

          const data = JSON.parse(responseText);
        
        const options = {
          key: data.keyId,
          amount: data.amount,
          currency: 'INR',
          name: 'The Mango Seed',
          description: `Pre-order ${editionKey}`,
          order_id: data.orderId,
          handler: function (response: any) {
            window.location.href = `/preorder?success=true&payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&edition=${editionKey}`;
          },
          theme: {
            color: '#D4A853',
          },
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        const res = await fetch('/api/checkout/stripe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ edition: editionKey, currency }),
        });
        if (!res.ok) throw new Error('Failed to create Stripe checkout session');
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error('No checkout URL returned');
        }
      }
      trackEvent('preorder_cta_click', { edition: editionKey, currency });
    } catch (err: any) {
        console.error(err);

        if (err instanceof Error) {
            alert(err.message);
        } else {
            alert("Checkout could not be initialized.");
        }
    } finally {
        setLoadingEdition(null);
    }
  };

  return (
    <section id="editions" className="section-xl" style={{ backgroundColor: '#FDF6E3' }}>
      <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-10"
        >
          <motion.h2
            variants={fadeUp}
            className="font-playfair font-semibold text-display-md"
            style={{ color: '#3A5233' }}
          >
            Choose Your Format.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-body text-body mt-4"
            style={{ color: '#6B4C3B' }}
          >
            Available in four editions, each with exclusive pre-order bonuses.
          </motion.p>
        </motion.div>

        {/* Currency selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          <span
            className="font-ui text-[11px] font-semibold uppercase tracking-[0.12em] mr-2"
            style={{ color: '#8B6F5E' }}
          >
            Currency
          </span>
          <div
            className="inline-flex rounded-full p-1"
            style={{ backgroundColor: '#F5ECD7', border: '1px solid #E8D5B7' }}
            role="radiogroup"
            aria-label="Select currency"
          >
            {CURRENCIES.map((c) => {
              const active = currency === c.code;
              return (
                <button
                  key={c.code}
                  onClick={() => setCurrency(c.code)}
                  role="radio"
                  aria-checked={active}
                  className="font-ui text-[12px] font-semibold px-4 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    backgroundColor: active ? '#D4A853' : 'transparent',
                    color: active ? '#2C2417' : '#6B4C3B',
                  }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {editions.map((edition) => (
            <motion.div
              key={edition.key}
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutExpo } },
              }}
              className="relative"
            >
              <div
                className="relative h-full rounded-2xl p-8 lg:p-10 border-2 border-transparent transition-all duration-400 hover:-translate-y-1.5 flex flex-col"
                style={{
                  background: 'linear-gradient(145deg, #F5ECD7 0%, #E8D5B7 100%)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#D4A853';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(44,36,23,0.12)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'transparent';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                {/* Badge */}
                {edition.badge && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 font-ui text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap"
                    style={{ backgroundColor: '#D4A853', color: '#2C2417' }}
                  >
                    {edition.badge}
                  </span>
                )}

                {/* Icon */}
                <div style={{ color: '#D4A853' }} className="mb-4">
                  {edition.icon}
                </div>

                {/* Edition name */}
                <h3
                  className="font-playfair text-2xl font-medium mb-2"
                  style={{ color: '#3A5233' }}
                >
                  {edition.name}
                </h3>

                {/* Price */}
                <motion.div
                  key={currency}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="font-playfair text-4xl font-semibold mb-4"
                  style={{ color: '#D4A853' }}
                >
                  {formatPrice(currency, edition.prices[currency])}
                  <span className="text-lg font-normal ml-2" style={{ color: '#8B6F5E' }}>
                    {currency}
                  </span>
                </motion.div>

                {/* Features */}
                <ul className="space-y-3 mb-6 flex-1">
                  {edition.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={18} strokeWidth={2} style={{ color: '#D4A853', marginTop: '3px', flexShrink: 0 }} />
                      <span className="font-body text-sm" style={{ color: '#6B4C3B' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handlePreorder(edition.key)}
                  disabled={loadingEdition !== null}
                  className="w-full mt-auto font-ui text-xs font-semibold uppercase tracking-[0.12em] py-3.5 px-6 rounded transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={
                    edition.ctaStyle === 'primary'
                      ? {
                          backgroundColor: '#D4A853',
                          color: '#2C2417',
                        }
                      : {
                          backgroundColor: 'transparent',
                          border: '1.5px solid #4A6741',
                          color: '#3A5233',
                        }
                  }
                  onMouseEnter={(e) => {
                    if (loadingEdition !== null) return;
                    if (edition.ctaStyle === 'primary') {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#B8923E';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(212,168,83,0.3)';
                    } else {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#4A6741';
                      (e.currentTarget as HTMLButtonElement).style.color = '#FDF6E3';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (edition.ctaStyle === 'primary') {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#D4A853';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                    } else {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                      (e.currentTarget as HTMLButtonElement).style.color = '#3A5233';
                    }
                  }}
                >
                  {loadingEdition === edition.key ? 'Loading...' : `Pre-Order ${edition.name.split(' ')[0]}`}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 — Bonus Content                                          */
/* ------------------------------------------------------------------ */

function BonusSection() {
  const { ref, inView } = useReveal();

  return (
    <section className="section-lg" style={{ backgroundColor: '#F5ECD7' }}>
      <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '1000px' }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="font-ui text-xs font-semibold uppercase tracking-[0.15em] mb-4"
            style={{ color: '#D4A853' }}
          >
            &mdash;&mdash;&mdash; BONUSES
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-playfair font-semibold text-display-md"
            style={{ color: '#3A5233' }}
          >
            Every Pre-Order Includes.
          </motion.h2>
        </motion.div>

        {/* Bonus Cards */}
        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {bonuses.map((bonus, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutExpo } },
              }}
              className="rounded-xl p-8 transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: '#FDF6E3',
                borderLeft: '3px solid #D4A853',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(44,36,23,0.12)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              <div style={{ color: '#D4A853' }} className="mb-4">
                {bonus.icon}
              </div>
              <h3 className="font-playfair text-xl font-medium mb-3" style={{ color: '#3A5233' }}>
                {bonus.title}
              </h3>
              <p className="font-body text-[15px]" style={{ color: '#6B4C3B', lineHeight: 1.7 }}>
                {bonus.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4 — Book Preview                                           */
/* ------------------------------------------------------------------ */

function BookPreviewSection() {
  const { ref, inView } = useReveal();

  const specs = [
    'Publisher: [To be announced]',
    'Release: July 2026',
    'Pages: 304',
    'Language: English',
    'Available: Worldwide',
  ];

  return (
    <section className="section-lg" style={{ backgroundColor: '#FDF6E3' }}>
      <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '1200px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left — Book Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40, rotate: -3 }}
            animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 1, ease: easeOutExpo }}
            className="lg:col-span-2 flex justify-center"
          >
            <div className="group" style={{ maxWidth: '360px' }}>
              <img
                src="/book-cover-mockup.jpg"
                alt="The Mango Seed book cover mockup"
                className="w-full h-auto rounded-lg transition-transform duration-400 group-hover:rotate-2"
                style={{ boxShadow: '0 24px 60px rgba(44,36,23,0.2)' }}
              />
            </div>
          </motion.div>

          {/* Right — Specs */}
          <motion.div
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            variants={staggerContainer}
            className="lg:col-span-3"
          >
            <motion.h2
              variants={fadeUp}
              className="font-playfair font-semibold text-display-md mb-8"
              style={{ color: '#3A5233' }}
            >
              A Book Worth Holding.
            </motion.h2>

            <ul className="space-y-4 mb-8">
              {specs.map((spec, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  className="flex items-center gap-3"
                >
                  <img
                    src="/mango-leaf.svg"
                    alt=""
                    className="w-3 h-3"
                    style={{ filter: 'none' }}
                  />
                  <span className="font-inter text-[15px]" style={{ color: '#6B4C3B' }}>
                    {spec}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.blockquote
              variants={fadeUp}
              className="font-script text-lg italic mt-8 pl-6"
              style={{
                color: '#C4654A',
                borderLeft: '2px solid #D4A853',
                lineHeight: 1.6,
              }}
            >
              "The kind of book you buy in every format because you want to give it to everyone you love."
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5 — FAQ Accordion                                          */
/* ------------------------------------------------------------------ */

function FAQSection() {
  const { ref, inView } = useReveal();

  return (
    <section className="section-lg" style={{ backgroundColor: '#F5ECD7' }}>
      <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="font-ui text-xs font-semibold uppercase tracking-[0.15em] mb-4"
            style={{ color: '#D4A853' }}
          >
            &mdash;&mdash;&mdash; QUESTIONS
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-playfair font-semibold text-display-md"
            style={{ color: '#3A5233' }}
          >
            What Readers Ask.
          </motion.h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
                }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="border-0"
                  style={{ borderBottom: '1px solid #E8D5B7' }}
                >
                  <AccordionTrigger
                    className="font-body text-lg font-semibold py-5 hover:no-underline"
                    style={{ color: '#3A5233' }}
                  >
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="font-body text-base pb-5"
                    style={{ color: '#6B4C3B', lineHeight: 1.75 }}
                  >
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 6 — Final CTA                                              */
/* ------------------------------------------------------------------ */

function CTASection() {
  const { ref, inView } = useReveal();
  const { currency } = useCurrency();
  const ebookPrice = editions.find((e) => e.key === 'ebook')!.prices[currency];

  return (
    <section
      className="section-xl"
      style={{ backgroundColor: '#2C2417' }}
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        variants={staggerContainer}
        className="mx-auto px-6 lg:px-12 text-center"
        style={{ maxWidth: '700px' }}
      >
        {/* Mango Seed Mark */}
        <motion.div variants={fadeUp} className="mb-8 flex justify-center">
          <img
            src="/mango-seed.svg"
            alt=""
            className="w-12 h-12"
            style={{ filter: 'brightness(1.2)', opacity: 1 }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h2
          variants={fadeUp}
          className="font-playfair font-semibold text-display-lg"
          style={{ color: '#FFFFFF' }}
        >
          Your Story Begins Here.
        </motion.h2>

        {/* Subhead */}
        <motion.p
          variants={fadeUp}
          className="font-body text-body-lg mt-6"
          style={{ color: '#E8D5B7' }}
        >
          Pre-order The Mango Seed today. A grandfather's wisdom. 100 great books. One story that will change how you see everything.
        </motion.p>

        {/* Trust Indicators */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-6 mt-8"
        >
          {[
            { icon: <Lock size={14} />, text: 'Secure Checkout' },
            { icon: <Truck size={14} />, text: 'Free Shipping' },
            { icon: <ShieldCheck size={14} />, text: '30-Day Guarantee' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 font-ui text-[11px] font-medium uppercase tracking-wider"
              style={{ color: 'rgba(232,213,183,0.6)' }}
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={fadeUp} className="mt-10">
          <a
            href="#editions"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('editions')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-block font-ui text-xs font-semibold uppercase tracking-[0.12em] rounded transition-all duration-300 hover:-translate-y-0.5"
            style={{
              backgroundColor: '#D4A853',
              color: '#2C2417',
              padding: '18px 56px',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#B8923E';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(212,168,83,0.3)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#D4A853';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
            }}
          >
            Pre-Order Now &mdash; Starting at {formatPrice(currency, ebookPrice)}
          </a>
        </motion.div>

        {/* Payment note */}
        <motion.p
          variants={fadeUp}
          className="font-ui text-xs mt-4"
          style={{ color: '#8B6F5E' }}
        >
          All major cards accepted &middot; UPI &middot; PayPal
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Export                                                        */
/* ------------------------------------------------------------------ */

export default function Preorder() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success') === 'true';
  const cancelled = searchParams.get('cancelled') === 'true';
  const edition = searchParams.get('edition');

  return (
    <CurrencyProvider>
      <Seo
        title="Pre-Order The Mango Seed"
        description="Pre-order The Mango Seed in paperback, hardcover collector's edition, e-book, or audiobook. Releasing 13 July 2026. Exclusive pre-order bonuses included."
        path="/preorder"
        type="book"
        jsonLd={bookSchema}
      />
      <main>
        {success && (
          <div className="bg-[#4A6741] text-[#FDF6E3] py-4 px-6 text-center font-ui text-sm font-semibold relative animate-fade-in">
            🎉 Thank you for pre-ordering the {edition ? edition.toUpperCase() : 'book'}! Your pre-order is confirmed. We have sent the details to your email.
          </div>
        )}
        {cancelled && (
          <div className="bg-[#B84E3E] text-[#FDF6E3] py-4 px-6 text-center font-ui text-sm font-semibold relative animate-fade-in">
            Checkout was cancelled. If you experienced any issues, please contact hello@themangoseed.com.
          </div>
        )}
        <HeroSection />
        <EditionCardsSection />
        <BonusSection />
        <BookPreviewSection />
        <FAQSection />
        <CTASection />
      </main>
    </CurrencyProvider>
  );
}
