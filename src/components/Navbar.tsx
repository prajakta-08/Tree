import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/book', label: 'The Book' },
  { path: '/author', label: 'The Author' },
  { path: '/excerpts', label: 'Excerpts' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          height: '72px',
          backgroundColor: scrolled ? 'rgba(253,246,227,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(232,213,183,0.3)' : '1px solid transparent',
        }}
      >
        <div className="mx-auto flex h-full items-center justify-between px-6 lg:px-12" style={{ maxWidth: '1200px' }}>
          <Link to="/" className="font-playfair text-xl font-medium tracking-tight" style={{ color: scrolled ? '#3A5233' : '#FDF6E3' }}>
            The Mango Seed
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-ui text-[13px] font-medium uppercase tracking-[0.1em] transition-colors duration-300 relative"
                  style={{ color: isActive ? '#D4A853' : scrolled ? '#6B4C3B' : '#FDF6E3' }}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px]" style={{ backgroundColor: '#D4A853' }} />
                  )}
                </Link>
              );
            })}
            <Link
              to="/preorder"
              className="font-ui text-xs font-semibold uppercase tracking-[0.12em] px-6 py-2.5 rounded-full transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: '#D4A853',
                color: '#2C2417',
              }}
            >
              Pre-Order
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={24} style={{ color: '#FDF6E3' }} />
            ) : (
              <Menu size={24} style={{ color: scrolled ? '#3A5233' : '#FDF6E3' }} />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ backgroundColor: 'rgba(44,36,23,0.98)' }}
          >
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    className="font-playfair text-3xl font-medium transition-colors duration-300"
                    style={{ color: isActive ? '#D4A853' : '#FDF6E3' }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Link
                to="/preorder"
                className="font-ui text-sm font-semibold uppercase tracking-[0.12em] px-8 py-3 rounded-full mt-4 inline-block"
                style={{ backgroundColor: '#D4A853', color: '#2C2417' }}
              >
                Pre-Order Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
