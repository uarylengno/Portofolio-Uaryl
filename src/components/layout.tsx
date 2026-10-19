// ============================================================
// IMPORT
// ============================================================
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, UserCog } from 'lucide-react';

import { APP_CONFIG } from '../appConfig';
import { APP_CONFIG_EN } from '../appConfigEn';
import { useLanguage } from '../contexts/LanguageContext';

// ============================================================
// KOMPONEN KECIL: MENU TAMBAHAN DI NAVBAR DESKTOP
// Ikon tiga garis -> dropdown berisi ganti bahasa & masuk admin
// ============================================================
function MoreMenu({ textColor }: { textColor: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { language, setLanguage } = useLanguage();

  // Tutup dropdown jika klik di luar atau tekan Esc
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const itemClass =
    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-dark hover:bg-background transition-colors text-left';

  return (
    <div ref={ref} className="relative">
      {/* Tombol ikon tiga garis */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="More"
        aria-expanded={open}
        className={`flex items-center hover:text-accent transition-colors ${textColor}`}
      >
        <Menu size={26} />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-4 w-56 bg-surface-white rounded-2xl shadow-2xl border border-gray-100 p-2"
          >
            {/* Ganti bahasa (menampilkan bahasa tujuan) */}
            <button
              onClick={() => { setLanguage(language === 'id' ? 'en' : 'id'); setOpen(false); }}
              className={itemClass}
            >
              <Globe size={18} className="text-primary" />
              {language === 'id' ? 'English' : 'Bahasa Indonesia'}
            </button>

            {/* Masuk admin (#admin ditangani di main.tsx) */}
            <a href="#admin" onClick={() => setOpen(false)} className={itemClass}>
              <UserCog size={18} className="text-primary" />
              Admin
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// NAVBAR
// ============================================================
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);       // menu mobile terbuka/tertutup
  const [isScrolled, setIsScrolled] = useState(false); // true jika halaman sudah di-scroll
  const { language, setLanguage, t } = useLanguage();

  // Pantau scroll: setelah 50px, navbar berubah jadi putih
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Daftar menu (href harus sama dengan id section di halaman)
  const navLinks = [
    { label: t('TENTANG', 'ABOUT'), href: '#about' },
    { label: t('KEAHLIAN', 'SKILLS'), href: '#skills' },
    { label: t('PROYEK', 'PROJECTS'), href: '#projects' },
    { label: t('PENGALAMAN', 'EXPERIENCE'), href: '#experience' },
    { label: t('PENDIDIKAN', 'EDUCATION'), href: '#education' },
    { label: t('PENGHARGAAN', 'AWARDS'), href: '#awards' },
  ];

  // Warna teks mengikuti posisi scroll (putih di atas, gelap setelah scroll)
  const textColor = isScrolled ? 'text-dark' : 'text-surface-white';

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-surface-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* ---------- Logo ---------- */}
        <a href="#" className="flex flex-col z-50">
          <span
            className={`font-black text-xl leading-none tracking-tight ${
              isScrolled ? 'text-primary' : 'text-surface-white'
            }`}
          >
            ARIL ENGNO
          </span>
          <span
            className={`text-xs font-bold tracking-widest ${
              isScrolled ? 'text-dark' : 'text-accent'
            }`}
          >
            CREATIVE
          </span>
        </a>

        {/* ---------- Menu Desktop ---------- */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-bold tracking-wider hover:text-accent transition-colors ${textColor}`}
            >
              {item.label}
            </a>
          ))}

          {/* Tombol ajakan menghubungi */}
          <a
            href="#contact"
            className="bg-accent text-dark px-6 py-2 rounded-full font-bold text-sm tracking-wider hover:bg-white hover:scale-105 transition-all"
          >
            {t('MARI BERBICARA', "LET'S TALK")} &rarr;
          </a>

          {/* Ikon tiga garis: bahasa & admin */}
          <MoreMenu textColor={textColor} />
        </div>

        {/* ---------- Tombol Mobile (hanya hamburger) ---------- */}
        <div className="md:hidden flex items-center z-50 relative">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? (
              <X size={28} className="text-dark" />
            ) : (
              <Menu size={28} className={isScrolled ? 'text-dark' : 'text-surface-white'} />
            )}
          </button>
        </div>
      </div>

      {/* ---------- Menu Mobile (layar penuh) ---------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-surface-white z-40 flex flex-col justify-center items-center overflow-y-auto pt-20 pb-10 space-y-6 sm:space-y-8"
          >
            {/* Link menu: menu menutup otomatis setelah diklik */}
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

            {/* Tombol ajakan menghubungi */}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="bg-primary text-surface-white px-8 py-4 rounded-full font-bold text-xl tracking-wider hover:bg-accent hover:text-dark transition-all mt-4"
            >
              {t('MARI BERBICARA', "LET'S TALK")} &rarr;
            </a>

            {/* Ganti bahasa & masuk admin */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-background text-dark font-bold text-sm"
              >
                <Globe size={18} className="text-primary" />
                {language === 'id' ? 'English' : 'Bahasa Indonesia'}
              </button>
              <a
                href="#admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-background text-dark font-bold text-sm"
              >
                <UserCog size={18} className="text-primary" />
                Admin
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ============================================================
// FOOTER
// ============================================================
export function Footer() {
  const { language, t } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;

  // Menu cepat di footer
  const footerLinks = [
    { label: t('TENTANG', 'ABOUT'), href: '#about' },
    { label: t('KEAHLIAN', 'SKILLS'), href: '#skills' },
    { label: t('PROYEK', 'PROJECTS'), href: '#projects' },
    { label: t('KONTAK', 'CONTACT'), href: '#contact' },
  ];

  // Link sosial media (link-nya diambil dari appConfig.ts & appConfigEn.ts)
  const socialLinks = [
    { label: 'WhatsApp', href: config.contact.whatsapp },
    { label: 'Instagram', href: config.contact.instagram },
    { label: 'LinkedIn', href: config.contact.linkedin },
    { label: 'GitHub', href: config.contact.github },
    { label: 'Facebook', href: config.contact.facebook },
    { label: 'YouTube', href: config.contact.youtube },
  ];

  return (
    <footer className="bg-dark text-surface-white py-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
        {/* ---------- Kiri: nama & peran ---------- */}
        <div className="mb-8 md:mb-0">
          <div className="flex flex-col mb-4">
            <span className="font-black text-3xl md:text-4xl leading-none tracking-tight text-surface-white">
              {config.personal.name}
            </span>
            <span className="text-sm font-bold tracking-widest text-accent">
              {config.personal.role}
            </span>
          </div>
        </div>

        {/* ---------- Kanan: menu & sosial media ---------- */}
        <div className="flex flex-col space-y-4 md:text-right">
          {/* Menu cepat */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold tracking-wider text-surface-white mb-4">
            {footerLinks.map((item) => (
              <a key={item.label} href={item.href} className="hover:text-accent transition-colors">
                {item.label}
              </a>
            ))}
          </div>

          {/* Sosial media */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end text-muted">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-surface-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Baris hak cipta ---------- */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-surface-white/10 text-muted text-xs flex flex-col sm:flex-row gap-3 justify-between">
        <p>
          &copy; {new Date().getFullYear()} {config.personal.name}.{' '}
          {t('Seluruh hak cipta dilindungi.', 'All rights reserved.')}
        </p>
      </div>
    </footer>
  );
}