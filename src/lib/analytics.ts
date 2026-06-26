declare global {
  interface Window {
    __cookieConsent?: 'accepted' | 'rejected';
  }
}

const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined;

let loaded = false;

function loadGtm() {
  if (loaded || !GTM_ID || typeof window === 'undefined') return;
  loaded = true;

  // GTM snippet
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);

  // dataLayer
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
}

export function initAnalytics() {
  if (typeof window === 'undefined') return;

  const tryLoad = () => {
    if (window.__cookieConsent === 'accepted') loadGtm();
  };

  // 1. If they've already accepted on a previous visit
  tryLoad();

  // 2. Listen for changes (banner click)
  window.addEventListener('cookieConsentChange', () => {
    tryLoad();
  });
}

export function trackEvent(name: string, props: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  if (window.__cookieConsent !== 'accepted') return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event: name, ...props });
}
