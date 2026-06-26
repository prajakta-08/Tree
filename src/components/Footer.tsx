import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Youtube, Send, Loader2, Check } from 'lucide-react';
import {
  validateNewsletter,
  submitNewsletter,
  type FormStatus,
} from '../lib/forms';

const bookLinks = [
  { label: 'The Story', path: '/book' },
  { label: '100 Books', path: '/book' },
  { label: '20 Core Laws', path: '/book' },
  { label: 'Pre-Order', path: '/preorder' },
];

const exploreLinks = [
  { label: 'The Author', path: '/author' },
  { label: 'Excerpts', path: '/excerpts' },
  { label: 'Press Kit', path: '/press' },
  { label: 'Contact', path: '/contact' },
];

const legalLinks = [
  { label: 'Privacy', path: '/privacy' },
  { label: 'Terms', path: '/terms' },
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/themangoseed' },
  { icon: Twitter, label: 'X (Twitter)', href: 'https://x.com/TheMangoSeed' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhruvjain' },
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@themangoseed' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { email, source: 'footer', company };
    const err = validateNewsletter(payload);
    if (err === '') {
      setStatus('success');
      return;
    }
    if (err) return; // silent — they can see the empty state
    setStatus('submitting');
    try {
      await submitNewsletter(payload);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer style={{ backgroundColor: '#2C2417' }} className="relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'url(/mango-leaf.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '120px',
          transform: 'rotate(-15deg) scale(1.2)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-12" style={{ maxWidth: '1200px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-6" style={{ color: '#FDF6E3' }}>
              The Book
            </h3>
            <ul className="space-y-3">
              {bookLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="font-ui text-sm transition-colors duration-300 hover:text-amber"
                    style={{ color: '#E8D5B7' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-6" style={{ color: '#FDF6E3' }}>
              Explore
            </h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="font-ui text-sm transition-colors duration-300 hover:text-amber"
                    style={{ color: '#E8D5B7' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-6" style={{ color: '#FDF6E3' }}>
              Connect
            </h3>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    border: '1.5px solid rgba(232,213,183,0.3)',
                    color: '#E8D5B7',
                  }}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="font-ui text-[11px] uppercase tracking-[0.1em] transition-colors"
                    style={{ color: '#8B6F5E' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-6" style={{ color: '#FDF6E3' }}>
              Newsletter
            </h3>
            <p className="font-body text-sm mb-4" style={{ color: '#8B6F5E' }}>
              Stay rooted in wisdom. Receive updates and exclusive content.
            </p>
            {status === 'success' ? (
              <p
                role="status"
                aria-live="polite"
                className="font-body text-sm flex items-center gap-2"
                style={{ color: '#D4A853' }}
              >
                <Check size={16} /> Subscribed. Check your inbox.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2" noValidate>
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Your email
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  autoComplete="email"
                  disabled={status === 'submitting'}
                  className="flex-1 h-10 px-3 font-ui text-sm bg-transparent border-b-2 outline-none transition-colors duration-300 focus:border-amber disabled:opacity-60"
                  style={{
                    borderColor: '#E8D5B7',
                    color: '#FDF6E3',
                  }}
                />
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
                  className="h-10 px-4 rounded transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                  style={{ backgroundColor: '#D4A853', color: '#2C2417' }}
                  aria-label="Subscribe"
                >
                  {status === 'submitting' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="font-body text-xs mt-2" role="alert" style={{ color: '#C4654A' }}>
                Could not subscribe. Please try again in a moment.
              </p>
            )}
          </div>
        </div>

        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(232,213,183,0.15)' }}
        >
          <p className="font-ui text-xs" style={{ color: '#8B6F5E' }}>
            &copy; 2026 Dhruv Jain. All rights reserved.
          </p>
          <div className="flex items-center gap-2 opacity-30">
            <img src="/mango-leaf.svg" alt="" aria-hidden="true" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
