import HeroSection from '../sections/HeroSection';
import PromiseSection from '../sections/PromiseSection';
import JourneySection from '../sections/JourneySection';
import BooksSection from '../sections/BooksSection';
import QuoteSection from '../sections/QuoteSection';
import ChapterSection from '../sections/ChapterSection';
import VideoSection from '../sections/VideoSection';
import AuthorSection from '../sections/AuthorSection';
import PreOrderSection from '../sections/PreOrderSection';
import NewsletterSection from '../sections/NewsletterSection';
import SectionDivider from '../components/SectionDivider';
import Seo from '../components/Seo';
import { bookSchema, personSchema, organizationSchema, websiteSchema } from '../lib/seo-schemas';

export default function Home() {
  return (
    <div>
      <Seo
        title="The Mango Seed"
        description="A novel by Dhruv Jain. The wisdom of 100 great books told as one unforgettable story. Forty chapters. Twenty Core Laws of Life. Releasing July 2026."
        path="/"
        type="book"
        jsonLd={[websiteSchema, bookSchema, personSchema, organizationSchema]}
      />
      <HeroSection />
      <SectionDivider from="dark" to="light" />
      <PromiseSection />
      <SectionDivider from="light" to="parchment" />
      <JourneySection />
      <SectionDivider from="parchment" to="dark" pattern="mango-leaves" />
      <BooksSection />
      <SectionDivider from="dark" to="light" pattern="tree-rings" />
      <QuoteSection />
      <SectionDivider from="light" to="sunset" />
      <ChapterSection />
      <SectionDivider from="sunset" to="dark" />
      <VideoSection />
      <SectionDivider from="dark" to="light" pattern="tree-rings" />
      <AuthorSection />
      <PreOrderSection />
      <SectionDivider from="dark" to="parchment" />
      <NewsletterSection />
    </div>
  );
}
