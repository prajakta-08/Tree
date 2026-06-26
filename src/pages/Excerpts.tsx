import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import Seo from '../components/Seo';

/* ------------------------------------------------------------------ */
/*  Animation variants                                                */
/* ------------------------------------------------------------------ */

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Seed divider SVG                                                  */
/* ------------------------------------------------------------------ */

function SeedDivider({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <div className={`flex items-center justify-center my-10 ${className}`}>
      <img
        src="/mango-seed.svg"
        alt=""
        width={size}
        height={size}
        className="opacity-40"
        style={{ filter: 'invert(64%) sepia(56%) saturate(382%) hue-rotate(8deg) brightness(92%) contrast(88%)' }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mango leaves divider SVG                                          */
/* ------------------------------------------------------------------ */

function LeavesDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 my-10 ${className}`}>
      {[0, 1, 2].map((i) => (
        <img
          key={i}
          src="/mango-leaf.svg"
          alt=""
          width={20}
          height={20}
          className="opacity-30"
          style={{
            filter: 'invert(64%) sepia(56%) saturate(382%) hue-rotate(8deg) brightness(92%) contrast(88%)',
            transform: i === 1 ? 'rotate(-10deg)' : i === 2 ? 'rotate(10deg)' : 'none',
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Drop cap paragraph component                                      */
/* ------------------------------------------------------------------ */

function DropCapParagraph({ text }: { text: string }) {
  const firstLetter = text.charAt(0);
  const rest = text.slice(1);
  return (
    <p className="font-body text-[20px] leading-[1.75] tracking-[0.01em]" style={{ color: 'var(--bark)' }}>
      <span
        className="font-display font-semibold float-left mr-3 mt-1"
        style={{
          fontSize: '72px',
          lineHeight: 0.8,
          color: 'var(--amber)',
        }}
      >
        {firstLetter}
      </span>
      {rest}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Pull quote component                                              */
/* ------------------------------------------------------------------ */

function PullQuote({ text }: { text: string }) {
  return (
    <motion.blockquote
      className="my-10 pl-6 border-l-[3px]"
      style={{ borderColor: 'var(--amber)' }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      <p
        className="font-script text-[24px] leading-[1.4]"
        style={{ color: 'var(--terracotta)' }}
      >
        {text}
      </p>
    </motion.blockquote>
  );
}

/* ------------------------------------------------------------------ */
/*  Section label                                                     */
/* ------------------------------------------------------------------ */

function SectionLabel({ text }: { text: string }) {
  return (
    <p
      className="font-ui text-[11px] font-semibold uppercase tracking-[0.15em] mb-6"
      style={{ color: 'var(--amber)' }}
    >
      {text}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Quote card component                                              */
/* ------------------------------------------------------------------ */

function QuoteCard({
  quote,
  attribution,
  variant = 'left',
  index,
}: {
  quote: string;
  attribution: string;
  variant?: 'left' | 'top';
  index: number;
}) {
  return (
    <motion.div
      className="rounded-lg p-8 lg:p-10 transition-all duration-400 hover:-translate-y-1"
      style={{
        backgroundColor: 'var(--parchment)',
        borderLeft: variant === 'left' ? '3px solid var(--amber)' : 'none',
        borderTop: variant === 'top' ? '3px solid var(--amber)' : 'none',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
    >
      <p
        className="font-script text-[22px] leading-[1.5] mb-4"
        style={{ color: 'var(--mango-green-dark)' }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <p
        className="font-ui text-[12px] font-medium uppercase tracking-[0.1em]"
        style={{ color: 'var(--bark-light)' }}
      >
        {attribution}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Excerpts Page Component                                      */
/* ------------------------------------------------------------------ */

export default function Excerpts() {
  const chapter1Ref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <Seo
        title="Read an Excerpt"
        description="Read free chapter excerpts from The Mango Seed by Dhruv Jain — Chapter 1: The Village Before the World, and Chapter 6: The Library of Dust."
        path="/excerpts"
        type="article"
      />
      {/* ============================================================ */}
      {/*  SECTION 1 — HERO                                            */}
      {/* ============================================================ */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: '60vh', backgroundColor: 'var(--charcoal)' }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/open-book-pages.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.3 }}
          />
          {/* Tree canopy gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, #2C2417 0%, rgba(44,36,23,0.8) 60%, rgba(44,36,23,0) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(44,36,23,0.6)',
            }}
          />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-6"
          style={{ maxWidth: '700px', paddingTop: '120px', paddingBottom: '80px' }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={staggerChild}>
            <SectionLabel text="━━━ EXCERPTS" />
          </motion.div>

          <motion.h1
            className="font-display font-semibold text-display-lg mb-6"
            style={{ color: 'var(--pure-white)' }}
            variants={staggerChild}
          >
            Step Into the Story
          </motion.h1>

          <motion.p
            className="font-body text-[20px] leading-[1.7] tracking-[0.01em]"
            style={{ color: 'var(--warm-sand)' }}
            variants={staggerChild}
          >
            Read the opening chapters. Feel the voice. Discover why this book is being
            called the most immersive self-development story ever written.
          </motion.p>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 2 — CHAPTER 1 (FULL PREVIEW)                        */}
      {/* ============================================================ */}
      <section
        ref={chapter1Ref}
        style={{ backgroundColor: 'var(--cream)' }}
        className="section-xl"
      >
        <div className="mx-auto px-6" style={{ maxWidth: '720px' }}>
          {/* Chapter header */}
          <motion.div
            className="text-center mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p
              className="font-ui text-[11px] font-semibold uppercase tracking-[0.15em] mb-4"
              style={{ color: 'var(--amber)' }}
              variants={staggerChild}
            >
              CHAPTER ONE
            </motion.p>

            <motion.h2
              className="font-display font-semibold text-display-md mb-4"
              style={{ color: 'var(--mango-green-dark)' }}
              variants={staggerChild}
            >
              The Village Before the World
            </motion.h2>

            <motion.p
              className="font-script text-[20px] leading-[1.4]"
              style={{ color: 'var(--bark-light)' }}
              variants={staggerChild}
            >
              Silence is not the absence of sound. It is the presence of attention.
            </motion.p>

            <motion.div variants={staggerChild}>
              <LeavesDivider />
            </motion.div>
          </motion.div>

          {/* Chapter image */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <img
              src="/chapter-village.jpg"
              alt="The village of Rampur, Rajasthan"
              className="w-full rounded-lg"
              style={{ maxHeight: '450px', objectFit: 'cover' }}
            />
            <p
              className="font-ui text-[12px] font-semibold uppercase tracking-[0.08em] mt-3 text-center"
              style={{ color: 'var(--bark-light)' }}
            >
              The village of Rampur, Rajasthan — where the story begins.
            </p>
          </motion.div>

          {/* Chapter body text */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <DropCapParagraph
                text="The mango tree behind our house was so old that nobody could remember who had planted it. It had outlived three generations of our family and several monsoons that should have killed it. Lightning had blackened its left arm one summer when I was four. By the time I was old enough to climb, it had grown a new configuration around the scar. Not despite the wound. Through it."
              />
            </motion.div>

            <motion.p
              className="font-body text-[20px] leading-[1.75] tracking-[0.01em]"
              style={{ color: 'var(--bark)' }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              My grandfather used to say the tree did not grow tall by hurrying. It grew tall because it had no choice but to face the sun, one day at a time, for a very long time. I understand now what he was telling me. I did not understand at eight. At eight I was mainly occupied with climbing the tree before the neighbour&rsquo;s goat did.
            </motion.p>

            <motion.p
              className="font-body text-[20px] leading-[1.75] tracking-[0.01em]"
              style={{ color: 'var(--bark)' }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              I want to begin there, Rohan. Not because the tree is poetic, though it is, but because everything I eventually became can be traced back to that red-dust courtyard, that old scarred tree, and the silence that settles over a village in the hour before dawn. Silence is not the absence of sound. It is the presence of attention. And attention, I have come to understand, is the rarest thing a human being can offer, to the world, or to themselves.
            </motion.p>

            {/* Pull quote */}
            <PullQuote text="The old mango tree did not grow tall by hurrying. It grew tall because it faced the sun, one day at a time, for a very long time." />

            <motion.p
              className="font-body text-[20px] leading-[1.75] tracking-[0.01em]"
              style={{ color: 'var(--bark)' }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              My name is Arjun. I was a slight boy who grew into a slight man. Not thin exactly. The kind of compact that turns out to be efficient. My mother said I had my grandfather&rsquo;s hands. Wide-palmed. Short-fingered. Good for holding things. I did not know until I was very old that they were also good for letting things go.
            </motion.p>

            <SeedDivider />

            <motion.p
              className="font-body text-[20px] leading-[1.75] tracking-[0.01em]"
              style={{ color: 'var(--bark)' }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              I was born in Rampur, a village in the dry plains of Rajasthan that sat in the landscape like a thumbprint pressed into sand. Four hundred families. One temple. One shared well. One man who owned a radio, which made him, for one unbroken hour between six and seven every evening, the most powerful person in the village. We were not rich. But I did not know that for years, because everyone around me was exactly the same shade of not rich, and so it felt like the natural condition of the world.
            </motion.p>

            <motion.p
              className="font-body text-[20px] leading-[1.75] tracking-[0.01em]"
              style={{ color: 'var(--bark)' }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              My father, Govind, was a farmer and part-time ironmonger. He was a quiet man whose intelligence lived entirely in his hands. He could hold a broken plough and know, without touching it, where it had failed. He spoke rarely. But when he did, the room leaned in. That was my first education in the difference between noise and substance, a distinction I have spent sixty years defending, and sixty years watching the world try to blur.
            </motion.p>

            <motion.p
              className="font-body text-[20px] leading-[1.75] tracking-[0.01em]"
              style={{ color: 'var(--bark)' }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              My mother, Savitri, was his opposite in the best possible way. She was a river, constant, warm, occasionally flooding. She told stories to anyone who would stay still long enough. And she had decided, before I could walk, that her son was going to do something extraordinary. Not because of any evidence. Because she had decided it was true, and she understood, in some wordless way that I only fully grasped when I was fifty, that decided things have a way of becoming true.
            </motion.p>

            <motion.p
              className="font-body text-[20px] leading-[1.75] tracking-[0.01em]"
              style={{ color: 'var(--bark)' }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              The year I turned nine, the monsoon failed. Not partially — completely. The sky remained a cruel, cloudless blue for months while the earth cracked open like a puzzle no one could solve. I watched my father walk the fields each morning, his shoulders carrying a weight that had no name. The well dropped to a whisper. Crops turned to dust before they had a chance to become anything. And yet, my mother woke every morning before dawn and swept the courtyard with the same steady rhythm, as if the act of tending to what was in front of her was itself a kind of prayer.
            </motion.p>

            <motion.p
              className="font-body text-[20px] leading-[1.75] tracking-[0.01em]"
              style={{ color: 'var(--bark)' }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              &ldquo;The rain will come,&rdquo; she said, not because she believed it, but because she knew that despair is a luxury the responsible cannot afford. I learned something in that dry season that I would not put words to for decades: resilience is not a feeling. It is a practice. You do not wait to feel strong. You act as if strength exists, and the feeling eventually catches up.
            </motion.p>

            <motion.p
              className="font-body text-[20px] leading-[1.75] tracking-[0.01em]"
              style={{ color: 'var(--bark)' }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              My first teacher outside the home was Chacha Bhim, a man who had failed at every occupation he attempted — farming, shopkeeping, even priesthood — but had somehow accumulated more wisdom than anyone else in Rampur. He taught me to read under the mango tree, using a slate board and chalk that crumbled in the heat. His method was unconventional. He did not begin with the alphabet. He began with observation.
            </motion.p>

            <motion.p
              className="font-body text-[20px] leading-[1.75] tracking-[0.01em]"
              style={{ color: 'var(--bark)' }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              &ldquo;Look at the ant,&rdquo; he said one afternoon, pointing to a line of red ants carrying grains across the courtyard. &ldquo;Most people glance. Looking requires that you forget what you expect to see. The ant does not carry the grain because it is motivated. It carries the grain because that is what ants do. Motivation is a modern lie. Character is doing what needs to be done, especially when no one is watching, especially when you do not feel like it.&rdquo;
            </motion.p>

            <motion.p
              className="font-body text-[20px] leading-[1.75] tracking-[0.01em]"
              style={{ color: 'var(--bark)' }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              I did not know then that these lessons would become the foundation of everything I would build. I only knew that sitting under that ancient tree, watching the ants work, listening to a failed man speak with more clarity than anyone I had ever met, I felt the first stirrings of a different kind of hunger. Not the hunger of the stomach. The hunger of the mind. The hunger that does not ask for comfort, but for truth.
            </motion.p>

            {/* End of chapter */}
            <motion.div
              className="text-center pt-8 pb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-2xl tracking-widest mb-6" style={{ color: 'var(--amber)' }}>
                * &nbsp;&nbsp; * &nbsp;&nbsp; *
              </p>
              <Link
                to="#chapter-6"
                className="inline-flex items-center gap-2 font-ui text-[14px] font-semibold transition-colors duration-300 hover:opacity-80"
                style={{ color: 'var(--terracotta)' }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('chapter-6')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Continue to Chapter 6 <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 3 — CHAPTER 11 (TEASER)                             */}
      {/* ============================================================ */}
      <section
        id="chapter-6"
        style={{ backgroundColor: 'var(--parchment)' }}
        className="section-xl"
      >
        <div className="mx-auto px-6" style={{ maxWidth: '720px' }}>
          {/* Chapter header */}
          <motion.div
            className="text-center mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p
              className="font-ui text-[11px] font-semibold uppercase tracking-[0.15em] mb-4"
              style={{ color: 'var(--amber)' }}
              variants={staggerChild}
            >
              CHAPTER SIX
            </motion.p>

            <motion.h2
              className="font-display font-semibold text-display-md mb-4"
              style={{ color: 'var(--mango-green-dark)' }}
              variants={staggerChild}
            >
              The Library of Dust
            </motion.h2>

            <motion.p
              className="font-script text-[20px] leading-[1.4]"
              style={{ color: 'var(--bark-light)' }}
              variants={staggerChild}
            >
              The key Ramesh-bhai gave me opened his store. The key I found for myself opened something larger.
            </motion.p>

            <motion.div variants={staggerChild}>
              <LeavesDivider />
            </motion.div>
          </motion.div>

          {/* Chapter image */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <img
              src="/chapter-road.jpg"
              alt="The road out of Rampur"
              className="w-full rounded-lg"
              style={{ maxHeight: '450px', objectFit: 'cover' }}
            />
            <p
              className="font-ui text-[12px] font-semibold uppercase tracking-[0.08em] mt-3 text-center"
              style={{ color: 'var(--bark-light)' }}
            >
              The road out — first steps into a larger world.
            </p>
          </motion.div>

          {/* Chapter 11 teaser body with gradient fade */}
          <div className="relative">
            <div className="space-y-6">
              <motion.p
                className="font-body text-[20px] leading-[1.75] tracking-[0.01em]"
                style={{ color: 'var(--bark)' }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                I was seventeen when I first entered the library. It stood behind the bus station on a lane most people seemed to use only when they were trying to avoid being seen. The building had once been painted cream, I think, though years of dust and heat had turned it into the colour of old paper. A neem tree leaned over one side of it, dropping thin shadows across the wall like handwriting no one had bothered to read.
              </motion.p>

              <motion.p
                className="font-body text-[20px] leading-[1.75] tracking-[0.01em]"
                style={{ color: 'var(--bark)' }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                The sign above the entrance said Public Library in blue letters that had faded unevenly, so that the word public looked more certain than the word library. The door was half open. Not invitingly. Simply open in the way neglected places are open, as if they no longer expected anyone but would not object if someone came.
              </motion.p>

              <motion.p
                className="font-body text-[20px] leading-[1.75] tracking-[0.01em]"
                style={{ color: 'var(--bark)' }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                Inside, the air was cooler. Not clean-cool. Paper-cool. Dust-cool. The kind of cool that buildings acquire when they have spent decades keeping still. There was a smell I still remember exactly. Old glue. Damp long since dried. Cloth covers. Human hands. Time.
              </motion.p>

              <motion.p
                className="font-body text-[20px] leading-[1.75] tracking-[0.01em]"
                style={{ color: 'var(--bark)' }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                Behind a desk sat a man with thick spectacles and a face that seemed to have folded inward over the years into something sharper rather than softer. He looked up at me without surprise. &ldquo;You want a membership?&rdquo; he asked. It had not occurred to me that I did. &ldquo;I want to read,&rdquo; I said. He nodded once, as if this was close enough.
              </motion.p>

              <motion.p
                className="font-body text-[20px] leading-[1.75] tracking-[0.01em]"
                style={{ color: 'var(--bark)' }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                He took out a ledger so large it looked less like a register than a family record. He asked my name. Wrote it slowly. Blew once on the page though the ink was already dry. Then he handed me a card and said, &ldquo;Return books on time. Don&rsquo;t bend pages. And do not choose what looks easy.&rdquo; That last sentence stayed with me.
              </motion.p>

              <motion.p
                className="font-body text-[20px] leading-[1.75] tracking-[0.01em]"
                style={{ color: 'var(--bark)' }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                I began badly. The first book I borrowed was too difficult for me. I understood perhaps half of what I read and only half of that properly. The sentences were long, the ideas kept opening into other ideas, and by the third page I had the humiliating sensation of reading words without possessing them. I almost took it back the next day. Instead, I forced myself through another ten pages. Then I went back and read the same ten pages again.
              </motion.p>

              <motion.p
                className="font-body text-[20px] leading-[1.75] tracking-[0.01em]"
                style={{ color: 'var(--bark)' }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                It was the first time I understood that not understanding something was not proof that I could not learn it. It was only proof that I had reached the edge of what I knew. This is an important distinction. Most people meet the edge of their understanding and retreat. They call the retreat realism. They say, this is not for me. What they mean is: I do not like the feeling of being a beginner.
              </motion.p>
            </div>

            {/* Gradient fade-out at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{
                height: '120px',
                background: 'linear-gradient(to bottom, transparent 0%, var(--parchment) 100%)',
              }}
            />
          </div>

          {/* CTA below faded text */}
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/preorder"
              className="inline-flex items-center gap-3 font-ui text-xs font-semibold uppercase tracking-[0.12em] px-9 py-4 rounded transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--amber)',
                color: 'var(--charcoal)',
              }}
            >
              <BookOpen size={16} />
              Read the Full Chapter in The Mango Seed
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 4 — KEY PASSAGES                                     */}
      {/* ============================================================ */}
      <section style={{ backgroundColor: 'var(--cream)' }} className="section-lg">
        <div className="mx-auto px-6" style={{ maxWidth: '1000px' }}>
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={staggerChild}>
              <SectionLabel text="━━━ WISDOM IN BRIEF" />
            </motion.div>

            <motion.h2
              className="font-display font-semibold text-display-md"
              style={{ color: 'var(--mango-green-dark)' }}
              variants={staggerChild}
            >
              Passages That Stay With You
            </motion.h2>
          </motion.div>

          {/* Passage grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuoteCard
              quote="The tree did not grow tall by hurrying. It grew tall because it faced the sun, one day at a time, for a very long time. And so will you."
              attribution="Arjun, Chapter 1"
              variant="left"
              index={0}
            />
            <QuoteCard
              quote="Most people glance. Looking requires that you forget what you expect to see."
              attribution="Chacha Bhim, Chapter 1"
              variant="top"
              index={1}
            />
            <QuoteCard
              quote="Silence is not the absence of sound. It is the presence of attention."
              attribution="Arjun, Chapter 1"
              variant="left"
              index={2}
            />
            <QuoteCard
              quote="Money is not the goal. It is optionality. The freedom to choose what deserves your time."
              attribution="Arjun, Chapter 22"
              variant="top"
              index={3}
            />
            <QuoteCard
              quote="Character is the most portable thing you own. You can lose your job, your money, your home. But character travels with you everywhere."
              attribution="Arjun, Chapter 33"
              variant="left"
              index={4}
            />
            <QuoteCard
              quote="Enough is not a quantity. It is a relationship with what you have."
              attribution="Arjun, Chapter 31"
              variant="top"
              index={5}
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 5 — CTA                                              */}
      {/* ============================================================ */}
      <section
        className="section-xl"
        style={{
          background: 'linear-gradient(135deg, #D4A574 0%, #C4654A 50%, #A8423F 100%)',
        }}
      >
        <motion.div
          className="mx-auto px-6 text-center"
          style={{ maxWidth: '700px' }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="font-display font-semibold text-display-lg mb-6"
            style={{ color: 'var(--pure-white)' }}
            variants={staggerChild}
          >
            40 Chapters Await
          </motion.h2>

          <motion.p
            className="font-body text-[20px] leading-[1.7] tracking-[0.01em] mb-10"
            style={{ color: 'var(--cream)' }}
            variants={staggerChild}
          >
            The complete story — 100 books woven into one unforgettable narrative.
            Pre-order now and begin the journey.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" variants={staggerChild}>
            <Link
              to="/preorder"
              className="inline-flex items-center gap-3 font-ui text-xs font-semibold uppercase tracking-[0.12em] px-9 py-4 rounded transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--amber)',
                color: 'var(--charcoal)',
                boxShadow: '0 8px 24px rgba(212,168,83,0.3)',
              }}
            >
              Pre-Order Your Copy
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div className="mt-6" variants={staggerChild}>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 font-ui text-[14px] font-semibold transition-opacity duration-300 hover:opacity-80"
              style={{ color: 'var(--cream)' }}
            >
              Explore All Chapters <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
