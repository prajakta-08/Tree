import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Mail, MapPin } from 'lucide-react';
import Seo from '../components/Seo';
import { validateContact, submitContact, type FormStatus } from '../lib/forms';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const payload = { name, email, message, company };
    const validationErr = validateContact(payload);
    if (validationErr === '') {
      // honeypot
      setStatus('success');
      return;
    }
    if (validationErr) {
      setErrorMsg(validationErr);
      return;
    }
    setStatus('submitting');
    try {
      await submitContact(payload);
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
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
    <main>
      <Seo
        title="Contact"
        description="Get in touch with The Mango Seed — press enquiries, reader notes, partnership requests, and questions about the book."
        path="/contact"
      />

      <section className="section-xl" style={{ backgroundColor: '#FDF6E3' }}>
        <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '900px' }}>
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: '#D4A853' }}
            >
              &mdash;&mdash;&mdash; GET IN TOUCH
            </div>
            <h1
              className="font-playfair font-semibold mb-5"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                color: '#3A5233',
              }}
            >
              Say hello.
            </h1>
            <p
              className="font-source-serif max-w-[560px] mx-auto"
              style={{ fontSize: '17px', lineHeight: 1.7, color: '#6B4C3B' }}
            >
              Press, partnerships, reader notes, or a question about the book &mdash; the door is open.
              Replies come from Dhruv directly, usually within a few days.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              {status === 'success' ? (
                <div
                  className="p-8 rounded-lg text-center"
                  style={{ backgroundColor: '#F5ECD7', border: '2px solid #D4A853' }}
                  role="status"
                  aria-live="polite"
                >
                  <p className="font-playfair text-2xl font-medium mb-2" style={{ color: '#3A5233' }}>
                    Your message has landed.
                  </p>
                  <p className="font-body text-sm" style={{ color: '#6B4C3B' }}>
                    Thank you. We will respond to your note as soon as we can.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="font-inter text-[11px] font-semibold uppercase tracking-[0.1em] mb-2 block"
                      style={{ color: '#6B4C3B' }}
                    >
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="name"
                      disabled={status === 'submitting'}
                      className="w-full h-14 px-5 rounded-md border-2 font-body text-base outline-none transition-colors duration-300"
                      style={{
                        borderColor: '#E8D5B7',
                        backgroundColor: '#FDF6E3',
                        color: '#2C2417',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="font-inter text-[11px] font-semibold uppercase tracking-[0.1em] mb-2 block"
                      style={{ color: '#6B4C3B' }}
                    >
                      Email address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      disabled={status === 'submitting'}
                      className="w-full h-14 px-5 rounded-md border-2 font-body text-base outline-none transition-colors duration-300"
                      style={{
                        borderColor: '#E8D5B7',
                        backgroundColor: '#FDF6E3',
                        color: '#2C2417',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="font-inter text-[11px] font-semibold uppercase tracking-[0.1em] mb-2 block"
                      style={{ color: '#6B4C3B' }}
                    >
                      Your message
                    </label>
                    <textarea
                      id="contact-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={6}
                      disabled={status === 'submitting'}
                      className="w-full px-5 py-4 rounded-md border-2 font-body text-base outline-none transition-colors duration-300 resize-y"
                      style={{
                        borderColor: '#E8D5B7',
                        backgroundColor: '#FDF6E3',
                        color: '#2C2417',
                      }}
                    />
                  </div>

                  {/* honeypot */}
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

                  {errorMsg && (
                    <p
                      className="font-body text-sm"
                      role="alert"
                      style={{ color: '#A8423F' }}
                    >
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="self-start font-ui text-xs font-semibold uppercase tracking-[0.12em] px-10 py-4 rounded transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    style={{
                      backgroundColor: '#D4A853',
                      color: '#2C2417',
                    }}
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending&hellip;
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Aside */}
            <aside className="lg:col-span-2">
              <div
                className="rounded-lg p-7"
                style={{ backgroundColor: '#F5ECD7', borderLeft: '3px solid #D4A853' }}
              >
                <h2
                  className="font-playfair text-2xl font-medium mb-5"
                  style={{ color: '#3A5233' }}
                >
                  Other ways
                </h2>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <Mail size={18} style={{ color: '#D4A853', marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <p
                        className="font-inter text-[10px] font-semibold uppercase tracking-wider mb-1"
                        style={{ color: '#8B6F5E' }}
                      >
                        Press &amp; partnerships
                      </p>
                      <a
                        href="mailto:hello@themangoseed.com"
                        className="font-body text-sm hover:underline"
                        style={{ color: '#3A5233' }}
                      >
                        hello@themangoseed.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={18} style={{ color: '#D4A853', marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <p
                        className="font-inter text-[10px] font-semibold uppercase tracking-wider mb-1"
                        style={{ color: '#8B6F5E' }}
                      >
                        Publisher
                      </p>
                      <p className="font-body text-sm" style={{ color: '#3A5233' }}>
                        [To be announced]
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
