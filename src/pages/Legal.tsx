import Seo from '../components/Seo';

interface LegalProps {
  kind: 'privacy' | 'terms';
}

const COPY = {
  privacy: {
    title: 'Privacy Notice',
    metaDescription:
      'How The Mango Seed collects, uses, and protects personal information of its readers and newsletter subscribers.',
    intro:
      'This page is a placeholder. The final Privacy Notice will be published before the book’s launch on 13 July 2026 and will cover data collection, lawful basis, storage, retention, your rights under GDPR/UK GDPR, and how to contact us.',
    sections: [
      {
        heading: 'What we collect',
        body: 'Email address when you join the newsletter. Name, email, and message when you use the contact form. We do not knowingly collect data from children under 16.',
      },
      {
        heading: 'How we use it',
        body: 'We send chapter previews, behind-the-scenes notes, and launch updates relating to The Mango Seed. We respond to contact-form messages directly. We do not sell your data, ever.',
      },
      {
        heading: 'Where it lives',
        body: 'Subscriber data is stored in our email-service provider (final choice to be confirmed before launch). Contact-form submissions are routed to our team mailbox. We use industry-standard encryption at rest and in transit.',
      },
      {
        heading: 'Cookies',
        body: 'We use only the cookies strictly necessary for the site to function. Analytics and marketing cookies are off by default and only set if you accept them via the consent banner.',
      },
      {
        heading: 'Your rights',
        body: 'You may request access to your data, correction, deletion, or withdrawal of consent at any time. Email privacy@themangoseed.com. We will respond within 30 days.',
      },
    ],
  },
  terms: {
    title: 'Terms of Use',
    metaDescription:
      'Terms of use for The Mango Seed website and digital products.',
    intro:
      'This page is a placeholder. The final Terms of Use will be published before launch and will cover acceptable use, intellectual property, purchases, returns, and limitation of liability.',
    sections: [
      {
        heading: 'Acceptance',
        body: 'By using this website you agree to these Terms. If you do not agree, please do not use the site.',
      },
      {
        heading: 'Intellectual property',
        body: 'All text, images, the book cover, the trade dress of The Mango Seed, and the contents of The Mango Seed (the book) are the intellectual property of the author and licensors. You may not reproduce, distribute, or create derivative works without written permission, with usual exceptions for fair use, review, and academic citation.',
      },
      {
        heading: 'Pre-orders and purchases',
        body: 'Pre-orders are subject to a separate set of purchase terms which will be presented at checkout once the payment system goes live. Cancellation and refund policy will be documented there.',
      },
      {
        heading: 'No warranty',
        body: 'The site is provided “as is.” We make no warranty about uninterrupted availability. The wisdom in the book is offered for reflection, not as personal medical, legal, or financial advice.',
      },
      {
        heading: 'Governing law',
        body: 'These Terms are governed by the laws of England & Wales. Final jurisdiction to be confirmed.',
      },
    ],
  },
};

export default function Legal({ kind }: LegalProps) {
  const data = COPY[kind];
  const path = kind === 'privacy' ? '/privacy' : '/terms';
  return (
    <main>
      <Seo
        title={data.title}
        description={data.metaDescription}
        path={path}
      />

      <section className="section-xl" style={{ backgroundColor: '#FDF6E3' }}>
        <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '760px' }}>
          <div
            className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
            style={{ color: '#D4A853' }}
          >
            &mdash;&mdash;&mdash; LEGAL
          </div>
          <h1
            className="font-playfair font-semibold mb-6"
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              lineHeight: 1.1,
              color: '#3A5233',
            }}
          >
            {data.title}
          </h1>
          <p
            className="font-cormorant italic mb-10 pb-8"
            style={{
              fontSize: '17px',
              lineHeight: 1.7,
              color: '#6B4C3B',
              borderBottom: '1px solid rgba(107,76,59,0.2)',
            }}
          >
            <strong>Placeholder.</strong> {data.intro}
          </p>

          {data.sections.map((s) => (
            <div key={s.heading} className="mb-8">
              <h2
                className="font-playfair font-semibold mb-3"
                style={{
                  fontSize: '22px',
                  lineHeight: 1.3,
                  color: '#3A5233',
                }}
              >
                {s.heading}
              </h2>
              <p
                className="font-source-serif"
                style={{ fontSize: '16px', lineHeight: 1.7, color: '#6B4C3B' }}
              >
                {s.body}
              </p>
            </div>
          ))}

          <p
            className="font-inter text-[11px] uppercase tracking-[0.1em] mt-12 pt-6"
            style={{ color: '#8B6F5E', borderTop: '1px solid rgba(107,76,59,0.2)' }}
          >
            Last updated: pre-launch &middot; Final version due before 13 July 2026
          </p>
        </div>
      </section>
    </main>
  );
}
