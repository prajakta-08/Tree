import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Loader2 } from 'lucide-react';
import {
  validateNewsletter,
  submitNewsletter,
  type FormStatus,
} from '../lib/forms';

gsap.registerPlugin(ScrollTrigger);

interface NewsletterSectionProps {
  source?: string;
}

export default function NewsletterSection({ source = 'home' }: NewsletterSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const payload = { email, source, company };
    const validationErr = validateNewsletter(payload);
    if (validationErr === '') {
      // honeypot triggered — fail silently to look like success
      setStatus('success');
      return;
    }
    if (validationErr) {
      setErrorMsg(validationErr);
      return;
    }
    setStatus('submitting');
    try {
      await submitNewsletter(payload);
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again in a moment.',
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-lg"
      style={{ backgroundColor: '#F5ECD7' }}
      aria-labelledby="newsletter-heading"
    >
      <div ref={contentRef} className="mx-auto px-6 lg:px-12 text-center" style={{ maxWidth: '600px' }}>
        <img
          src="/mango-seed.svg"
          alt=""
          aria-hidden="true"
          className="w-10 h-10 mx-auto mb-6"
          style={{ filter: 'sepia(1) saturate(2) hue-rotate(10deg)', opacity: 0.7 }}
        />

        <h2 id="newsletter-heading" className="font-playfair font-semibold text-display-sm mb-4" style={{ color: '#3A5233' }}>
          Stay Rooted in Wisdom.
        </h2>

        <p className="font-body mb-10" style={{ color: '#6B4C3B', lineHeight: 1.7 }}>
          Join the community. Receive chapter previews, behind-the-scenes stories, and wisdom from the 100 books &mdash; delivered as carefully as Arjun would deliver it.
        </p>

        {status === 'success' ? (
          <div
            className="p-6 rounded-lg"
            style={{ backgroundColor: '#FDF6E3', border: '2px solid #D4A853' }}
            role="status"
            aria-live="polite"
          >
            <p className="font-playfair text-lg font-medium" style={{ color: '#3A5233' }}>
              Welcome to the journey.
            </p>
            <p className="font-body text-sm mt-2" style={{ color: '#6B4C3B' }}>
              Check your inbox for a confirmation email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              autoComplete="email"
              aria-invalid={!!errorMsg}
              aria-describedby={errorMsg ? 'newsletter-error' : undefined}
              disabled={status === 'submitting'}
              className="w-full h-14 px-5 rounded-md border-2 font-body text-base outline-none transition-colors duration-300 focus:border-amber"
              style={{
                borderColor: errorMsg ? '#C4654A' : '#E8D5B7',
                backgroundColor: '#FDF6E3',
                color: '#2C2417',
              }}
            />
            {/* Honeypot — hidden from real users, bots fill it */}
            <input
              type="text"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full h-14 font-ui text-xs font-semibold uppercase tracking-[0.12em] rounded transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                backgroundColor: '#D4A853',
                color: '#2C2417',
                boxShadow: '0 8px 24px rgba(212,168,83,0.3)',
              }}
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Joining&hellip;
                </>
              ) : (
                'Join the Journey'
              )}
            </button>

            {errorMsg && (
              <p
                id="newsletter-error"
                className="font-body text-sm"
                role="alert"
                style={{ color: '#A8423F' }}
              >
                {errorMsg}
              </p>
            )}
          </form>
        )}

        <p className="font-ui text-[11px] mt-3" style={{ color: '#8B6F5E' }}>
          No spam. Unsubscribe anytime. Your email is safe with us.
        </p>
      </div>
    </section>
  );
}
