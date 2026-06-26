import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const STORAGE_KEY = 'mangoseed.cookieConsent';
type Choice = 'accepted' | 'rejected';

declare global {
  interface Window {
    __cookieConsent?: Choice;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Choice | null;
      if (saved === 'accepted' || saved === 'rejected') {
        window.__cookieConsent = saved;
        return;
      }
    } catch {}
    setVisible(true);
  }, []);

  const choose = (c: Choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {}
    window.__cookieConsent = c;
    window.dispatchEvent(new CustomEvent('cookieConsentChange', { detail: c }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-heading"
      className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:left-6 sm:right-6 sm:bottom-6 z-50 rounded-xl shadow-2xl"
      style={{
        backgroundColor: '#2C2417',
        border: '1px solid rgba(212,168,83,0.4)',
        maxWidth: '720px',
        margin: '0 auto',
      }}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-5 p-5 md:p-6">
        <div className="flex-1">
          <p
            id="cookie-consent-heading"
            className="font-playfair font-semibold mb-1"
            style={{ color: '#FDF6E3', fontSize: '17px', lineHeight: 1.3 }}
          >
            A small note on cookies.
          </p>
          <p
            className="font-body"
            style={{ color: '#E8D5B7', fontSize: '13px', lineHeight: 1.55 }}
          >
            We use only what is needed to make this site work, plus optional analytics to understand
            how readers find us. You decide.{' '}
            <Link to="/privacy" className="underline" style={{ color: '#D4A853' }}>
              Read our privacy notice
            </Link>
            .
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
          <button
            onClick={() => choose('rejected')}
            className="flex-1 md:flex-none font-ui text-[11px] font-semibold uppercase tracking-[0.1em] px-4 py-2.5 rounded transition-colors"
            style={{
              backgroundColor: 'transparent',
              color: '#E8D5B7',
              border: '1px solid rgba(232,213,183,0.4)',
            }}
          >
            Reject
          </button>
          <button
            onClick={() => choose('accepted')}
            className="flex-1 md:flex-none font-ui text-[11px] font-semibold uppercase tracking-[0.1em] px-4 py-2.5 rounded transition-colors"
            style={{ backgroundColor: '#D4A853', color: '#2C2417' }}
          >
            Accept All
          </button>
          <button
            onClick={() => choose('rejected')}
            aria-label="Close cookie notice (rejects optional cookies)"
            className="p-2 rounded transition-colors"
            style={{ color: '#8B6F5E' }}
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
