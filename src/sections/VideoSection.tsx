import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        videoContainerRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: videoContainerRef.current, start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-lg"
      style={{ backgroundColor: '#2C2417' }}
    >
      <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '1100px' }}>
        <div ref={headerRef} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-6 h-[2px] inline-block" style={{ backgroundColor: '#D4A853' }} />
            <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: '#D4A853' }}>
              WATCH
            </span>
          </div>
          <h2 className="font-playfair font-semibold text-display-md" style={{ color: '#FFFFFF' }}>
            The World of The Mango Seed
          </h2>
        </div>

        <div
          ref={videoContainerRef}
          className="relative rounded-xl overflow-hidden cursor-pointer group"
          style={{
            aspectRatio: '16/9',
            border: '1px solid rgba(212,168,83,0.2)',
          }}
          onClick={() => setIsPlaying(true)}
        >
          {!isPlaying ? (
            <>
              <img
                src="/sunset-tree-silhouette.jpg"
                alt="Video poster"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 animate-pulse-glow"
                  style={{ backgroundColor: '#D4A853' }}
                >
                  <Play size={28} fill="#2C2417" style={{ color: '#2C2417', marginLeft: '3px' }} />
                </div>
              </div>
            </>
          ) : (
            <video
              autoPlay
              controls
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/book-trailer.mp4" type="video/mp4" />
            </video>
          )}
        </div>

        <p
          className="font-body text-center italic mt-6"
          style={{ color: '#E8D5B7', lineHeight: 1.7 }}
        >
          Experience the journey from Rajasthan village to global wisdom in 60 seconds.
        </p>
      </div>
    </section>
  );
}
