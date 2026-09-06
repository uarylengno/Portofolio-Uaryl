import { APP_CONFIG } from '../appConfig';
import { APP_CONFIG_EN } from '../appConfigEn';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('TENTANG', 'ABOUT'), href: '#about' },
    { label: t('KEAHLIAN', 'SKILLS'), href: '#skills' },
    { label: t('PROYEK', 'PROJECTS'), href: '#projects' },
    { label: t('PENGALAMAN', 'EXPERIENCE'), href: '#experience' },
    { label: t('PENDIDIKAN', 'EDUCATION'), href: '#education' },
    { label: t('PENGHARGAAN', 'AWARDS'), href: '#awards' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-surface-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex flex-col z-50">
          <span className={`font-black text-xl leading-none tracking-tight ${isScrolled ? 'text-primary' : 'text-surface-white'}`}>ARIL ENGNO</span>
          <span className={`text-xs font-bold tracking-widest ${isScrolled ? 'text-dark' : 'text-accent'}`}>CREATIVE</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} className={`text-sm font-bold tracking-wider hover:text-accent transition-colors ${isScrolled ? 'text-dark' : 'text-surface-white'}`}>
              {item.label}
            </a>
          ))}
          <button 
            onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
            className={`flex items-center gap-2 text-sm font-bold tracking-wider hover:text-accent transition-colors ${isScrolled ? 'text-dark' : 'text-surface-white'}`}
          >
            <Globe size={16} />
            {language === 'id' ? 'EN' : 'ID'}
          </button>
          <a href="#contact" className="bg-accent text-dark px-6 py-2 rounded-full font-bold text-sm tracking-wider hover:bg-white hover:scale-105 transition-all">
            {t("MARI BERBICARA", "LET'S TALK")} &rarr;
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4 z-50 relative">
          <button 
            onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
            className={`flex items-center gap-1 text-sm font-bold tracking-wider ${isOpen || isScrolled ? 'text-dark' : 'text-surface-white'}`}
          >
            <Globe size={18} />
            {language === 'id' ? 'EN' : 'ID'}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} className="text-dark" /> : <Menu size={28} className={isScrolled ? 'text-dark' : 'text-surface-white'} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-surface-white z-40 flex flex-col justify-center items-center overflow-y-auto pt-20 pb-10 space-y-6 sm:space-y-8"
          >
            {navLinks.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className="text-3xl sm:text-4xl font-black text-dark hover:text-primary transition-colors tracking-tighter"
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="bg-primary text-surface-white px-8 py-4 rounded-full font-bold text-xl tracking-wider hover:bg-accent hover:text-dark transition-all mt-4"
            >
               {t("MARI BERBICARA", "LET'S TALK")} &rarr;
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  const { language, t } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;

  return (
    <footer className="bg-dark text-surface-white py-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-8 md:mb-0">
          <div className="flex flex-col mb-4">
             <span className="font-black text-3xl md:text-4xl leading-none tracking-tight text-surface-white">{config.personal.name}</span>
             <span className="text-sm font-bold tracking-widest text-accent">{config.personal.role}</span>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4 md:text-right">
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold tracking-wider text-surface-white mb-4">
            <a href="#about" className="hover:text-accent transition-colors">{t('TENTANG', 'ABOUT')}</a>
            <a href="#skills" className="hover:text-accent transition-colors">{t('KEAHLIAN', 'SKILLS')}</a>
            <a href="#projects" className="hover:text-accent transition-colors">{t('PROYEK', 'PROJECTS')}</a>
            <a href="#contact" className="hover:text-accent transition-colors">{t('KONTAK', 'CONTACT')}</a>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end text-muted">
            <a href={config.contact.whatsapp} target="_blank" rel="noreferrer" className="hover:text-surface-white transition-colors">WhatsApp</a>
            <a href={config.contact.instagram} target="_blank" rel="noreferrer" className="hover:text-surface-white transition-colors">Instagram</a>
            <a href={config.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-surface-white transition-colors">LinkedIn</a>
            <a href={config.contact.github} target="_blank" rel="noreferrer" className="hover:text-surface-white transition-colors">GitHub</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-surface-white/10 text-muted text-xs flex flex-col sm:flex-row gap-3 justify-between">
        <p>&copy; {new Date().getFullYear()} {config.personal.name}. {t('Seluruh hak cipta dilindungi.', 'All rights reserved.')}</p>
      </div>
    </footer>
  );
}
