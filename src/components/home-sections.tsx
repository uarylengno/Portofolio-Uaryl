// ============================================================
// IMPORT
// ============================================================
import { useState, useRef, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  Code2,
  Heart,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  PenTool,
  Server,
  Zap,
  type LucideIcon,
} from 'lucide-react';

import { APP_CONFIG } from '../appConfig';
import { APP_CONFIG_EN } from '../appConfigEn';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './ImageWithFallback';
import InteractivePixelCat from './InteractivePixelCat';
import DigitalIdCard from './DigitalIdCard';

// ============================================================
// KONSTANTA
// ============================================================

const ABOUT_IMAGE = '/assets/images/logoaril.webp';

// Kurva animasi halus yang dipakai di Hero
const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

// ============================================================
// JUDUL "Porto*folio*"
// Bagian depan: sans-serif tebal. Huruf "f" dan sisanya: serif italic.
// Berlaku untuk "Portofolio" (ID) maupun "Portfolio" (EN).
// ============================================================
function PortfolioTitle({ text }: { text: string }) {
  const i = text.toLowerCase().indexOf('f');
  if (i === -1) return <span className="title-bold">{text}</span>;

  return (
    <>
      <span className="title-bold">{text.slice(0, i)}</span>
      <span className="title-serif title-serif-f">{text[i]}</span>
      <span className="title-serif">{text.slice(i + 1)}</span>
    </>
  );
}

// ============================================================
// SECTION 1: HERO (bagian paling atas halaman)
// ============================================================
export function Hero() {
  const { language, t } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;

  return (
    <section className="relative min-h-[100svh] bg-primary overflow-hidden flex items-center pt-20">
      {/* Tekstur titik-titik di latar belakang */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: SMOOTH_EASE }}
          className="lg:col-span-7 max-w-4xl"
        >
          {/* Label peran/profesi */}
          <div className="mb-4 inline-block px-4 py-2 bg-surface-white/10 text-accent font-bold text-sm rounded-full tracking-wider">
            {config.personal.role}
          </div>

          {/* Judul besar: Portofolio + nama */}
          <h1 className="font-black tracking-tighter mb-6 flex flex-col items-start gap-1">
            <span
              className="max-w-full leading-[0.9] text-surface-white break-words"
              style={{ fontSize: 'clamp(2.75rem, 13vw, 6.5rem)' }}
            >
              <PortfolioTitle text={t('Portofolio', 'Portfolio')} />
            </span>
            <span
              className="max-w-full leading-tight text-dark bg-accent px-3 py-1 mt-1 inline-block break-words"
              style={{ fontSize: 'clamp(1rem, 5vw, 3rem)' }}
            >
              {config.personal.name.toUpperCase()}
            </span>
          </h1>

          {/* Tagline singkat */}
          <p className="text-surface-white/80 text-lg md:text-xl font-medium max-w-xl mb-12 leading-relaxed">
            {config.personal.tagline}
          </p>

          {/* Tombol ajakan */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <a
              href="#projects"
              className="w-full sm:w-auto text-center bg-accent text-dark px-6 sm:px-8 py-4 rounded-full font-bold text-sm tracking-wider hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              {t('LIHAT PORTOFOLIO', 'VIEW PORTFOLIO')}
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto text-center border-2 border-surface-white/30 text-surface-white px-6 sm:px-8 py-4 rounded-full font-bold text-sm tracking-wider hover:bg-surface-white hover:text-dark transition-all"
            >
              {t('HUBUNGI SAYA', 'CONTACT ME')}
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: SMOOTH_EASE }}
          className="lg:col-span-5"
        >
          <DigitalIdCard />
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 2: ABOUT (tentang saya)
// ============================================================
export function About() {
  const { language, t } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;

  return (
    <section id="about" className="relative isolate overflow-hidden py-20 md:py-32 px-6 bg-background">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-12 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        animate={{ x: [0, 42, 0], y: [0, 34, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
        animate={{ x: [0, -36, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* ---------- Kolom kiri: foto bulat + lingkaran dekoratif ---------- */}
        <motion.div
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, x: -60, rotate: -7, scale: 0.88 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute top-0 right-0 z-0 h-32 w-32 rounded-full bg-accent"
            animate={{ x: [0, 10, 0], y: [0, -16, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 left-0 z-0 h-48 w-48 rounded-full bg-primary"
            animate={{ x: [0, -10, 0], y: [0, 14, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="relative z-10 mx-auto aspect-square w-3/4 overflow-hidden rounded-full border-8 border-surface-white bg-surface-white shadow-2xl lg:w-full"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.035, rotate: 2 }}
          >
            <ImageWithFallback
              src={ABOUT_IMAGE}
              alt="Logo Aril Engno Creative"
              className="w-full h-full object-contain p-6"
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 4.5, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>

        {/* ---------- Kolom kanan: teks ---------- */}
        <motion.div
          className="lg:col-span-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.14, delayChildren: 0.12 } },
          }}
        >
          {/* Label kecil */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
          >
            {t('TENTANG SAYA', 'ABOUT ME')}
          </motion.div>

          {/* Judul (kata terakhir berwarna biru) */}
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="font-black text-dark text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[1] mb-8"
          >
            {t('Lebih dari sekadar ', 'More than just a ')}
            <motion.span
              className="inline-block text-primary"
              animate={{ color: ['#250BF0', '#7C3AED', '#250BF0'] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            >
              {t('Kreator.', 'Creator.')}
            </motion.span>
          </motion.h2>

          {/* Deskripsi: paragraf pertama dari config, kedua ditulis langsung */}
          <div className="space-y-6 text-lg text-dark/80 font-medium">
            <motion.p
              variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {config.personal.description}
            </motion.p>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {t(
                'Saya meraih Juara 2 Aplikasi Dapur Kuliner Pak Ndut di Java Tech Exhibition 4.0, Juara 1 lomba poster Think Before You Post dan Java Tech Exhibition 3.0, serta Juara 3 Java Tech Exhibition 2.0. Saya juga aktif sebagai peserta dan panitia di berbagai kegiatan kampus.',
                'My achievements include 2nd Place for the Pak Ndut Culinary Kitchen app at Java Tech Exhibition 4.0, 1st Place in the Think Before You Post and Java Tech Exhibition 3.0 poster competitions, and 3rd Place at Java Tech Exhibition 2.0. I have also taken part as a participant and committee member in campus events.'
              )}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 3: PROJECTS (SelectedWorks)
// ============================================================

// Dua gaya warna kartu proyek: putih (default) dan biru (kartu tengah)
const PROJECT_STYLES = {
  white: {
    card: 'bg-surface-white border-primary text-dark',
    arrow: 'bg-primary text-surface-white',
    divider: 'bg-primary/20',
    description: 'text-dark/80',
  },
  blue: {
    card: 'bg-primary border-primary text-surface-white',
    arrow: 'bg-accent text-primary',
    divider: 'bg-surface-white/30',
    description: 'text-surface-white/90',
  },
};

const LOVE_PARTICLES = [
  { x: -78, y: -62, size: 18, rotate: -24 },
  { x: -60, y: -108, size: 14, rotate: 18 },
  { x: -38, y: -78, size: 22, rotate: -12 },
  { x: -16, y: -126, size: 13, rotate: 26 },
  { x: 8, y: -88, size: 19, rotate: -20 },
  { x: 29, y: -120, size: 15, rotate: 14 },
  { x: 52, y: -76, size: 22, rotate: 24 },
  { x: 76, y: -106, size: 14, rotate: -18 },
  { x: -92, y: -24, size: 13, rotate: 12 },
  { x: 94, y: -36, size: 16, rotate: -28 },
  { x: -49, y: -31, size: 12, rotate: 22 },
  { x: 48, y: -28, size: 13, rotate: -14 },
];

// Bentuk data satu proyek (diambil dari appConfig)
type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  role?: string;
  demoLink?: string;
  githubLink?: string;
  comingSoon?: boolean;
};

function readProjectLike(projectId: string) {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(`portfolio-project-like-${projectId}`) === 'true';
  } catch (error) {
    console.error('Could not read saved project like:', error);
    return false;
  }
}

// Satu kartu proyek
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useLanguage();
  const [liked, setLiked] = useState(() => readProjectLike(project.id));
  const [loveBurst, setLoveBurst] = useState(0);
  // Setiap kartu ke-2, 5, 8, ... memakai gaya biru
  const style = index % 3 === 1 ? PROJECT_STYLES.blue : PROJECT_STYLES.white;

  // Link kartu: pakai link demo; kalau kosong ("#"), pakai link GitHub.
  // Kalau dua-duanya kosong, kartu tidak bisa diklik.
  const isReal = (l?: string) => !!l && l !== '#';
  const projectLink = project.comingSoon
    ? undefined
    : isReal(project.demoLink)
    ? project.demoLink
    : isReal(project.githubLink)
    ? project.githubLink
    : undefined;

  const toggleLike = () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    if (nextLiked) setLoveBurst((current) => current + 1);
    try {
      window.localStorage.setItem(`portfolio-project-like-${project.id}`, String(nextLiked));
    } catch (error) {
      console.error('Could not save project like:', error);
    }
  };

  const projectContent = (
    <>
      {/* Header: judul + ikon panah (hanya hiasan, karena seluruh kartu sudah jadi link) */}
      <div className="flex justify-between items-start mb-6 gap-4">
        {/* Kata pertama judul dipisah ke baris sendiri */}
        <h3 className="break-words text-2xl sm:text-3xl font-black tracking-tight leading-[1.1] pr-2 sm:pr-4 whitespace-pre-wrap">
          {project.title.replace(' ', '\n')}
        </h3>
        {project.comingSoon ? (
          <span className="flex-shrink-0 rounded-full bg-accent px-3 py-2 text-center text-xs font-black tracking-wide text-dark">
            {t('SEGERA HADIR', 'COMING SOON')}
          </span>
        ) : (
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${style.arrow}`}
          >
            <ArrowUpRight size={28} strokeWidth={3} />
          </div>
        )}
      </div>

      {/* Garis pemisah */}
      <div className={`w-full h-[2px] mb-6 ${style.divider}`}></div>

      {/* Deskripsi proyek */}
      <p className={`text-base font-medium mb-8 ${style.description}`}>{project.description}</p>

      {/* Gambar proyek (menempel di bagian bawah kartu) */}
      {project.comingSoon ? (
        <div className="mt-auto flex min-h-48 flex-col items-center justify-center gap-3 rounded-3xl bg-primary/5 px-6 py-10 text-center text-primary">
          <Sparkles size={32} aria-hidden="true" />
          <p className="font-black text-lg">{t('Sedang disiapkan', 'Work in progress')}</p>
          <p className="text-sm font-medium text-muted">{project.role}</p>
        </div>
      ) : (
        <div className="mt-auto relative overflow-hidden rounded-3xl bg-surface-white">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="block h-auto w-full"
          />

          {/* Label teknologi (maksimal 3) di atas gambar */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-primary text-xs font-bold rounded-full shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative flex h-full flex-col rounded-[2.5rem] border-[3px] p-6 transition-transform lg:p-8 ${
        projectLink ? 'hover:-translate-y-2' : ''
      } ${style.card}`}
    >
      {projectLink ? (
        <a
          href={projectLink}
          target="_blank"
          rel="noreferrer"
          aria-label={project.title}
          className="flex flex-1 flex-col"
        >
          {projectContent}
        </a>
      ) : (
        <div className="flex flex-1 flex-col">{projectContent}</div>
      )}

      <div className="relative z-10 mt-4 flex justify-end">
        <motion.button
          type="button"
          onClick={toggleLike}
          whileTap={{ scale: 0.78, rotate: -5 }}
          animate={liked ? { scale: [1, 1.16, 0.96, 1], rotate: [0, -7, 6, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          aria-pressed={liked}
          aria-label={
            liked
              ? t(`Hapus suka untuk ${project.title}`, `Unlike ${project.title}`)
              : t(`Sukai ${project.title}`, `Like ${project.title}`)
          }
          className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
            liked
              ? 'bg-rose-100 text-rose-600'
              : 'bg-white/70 text-muted hover:bg-rose-50 hover:text-rose-500'
          }`}
        >
          <AnimatePresence>
            {loveBurst > 0 && liked && (
              <span key={loveBurst} className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                <motion.span
                  initial={{ opacity: 0, scale: 0.2, rotate: -25 }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [0.2, 1.55, 1.15, 0.6], rotate: [-25, 12, -8, 0] }}
                  transition={{ duration: 0.85, times: [0, 0.28, 0.62, 1], ease: 'easeOut' }}
                  className="absolute text-rose-500 drop-shadow-lg"
                >
                  <Heart size={58} fill="currentColor" strokeWidth={1.5} />
                </motion.span>
                {LOVE_PARTICLES.map((particle, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.1, x: 0, y: 0, rotate: 0 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      scale: [0.1, 1.25, 0.9, 0.2],
                      x: [0, particle.x * 0.65, particle.x],
                      y: [0, particle.y * 0.55, particle.y],
                      rotate: [0, particle.rotate, particle.rotate * 1.7],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.05, delay: index * 0.025, ease: 'easeOut' }}
                    className="absolute left-1/2 top-1/2 text-rose-500 drop-shadow-sm"
                  >
                    <Heart size={particle.size} fill="currentColor" />
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0.8, scale: 0.2 }}
                  animate={{ opacity: 0, scale: 2.8 }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                  className="absolute h-14 w-14 rounded-full border-[3px] border-rose-400"
                />
              </span>
            )}
          </AnimatePresence>
          <motion.span
            animate={liked ? { scale: [1, 1.65, 0.85, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.55, times: [0, 0.25, 0.55, 0.78, 1] }}
          >
            <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
          </motion.span>
          {liked ? t('Disukai', 'Liked') : t('Suka', 'Like')}
        </motion.button>
      </div>
    </motion.div>
  );
}

export function SelectedWorks() {
  const { language, t } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;

  return (
    <section id="projects" className="py-20 md:py-32 px-6 bg-surface-white">
      <div className="max-w-7xl mx-auto">
        {/* Judul & deskripsi section */}
        <div className="mb-20 max-w-2xl">
          <h2 className="font-black text-dark text-4xl md:text-5xl lg:text-7xl tracking-tighter leading-none mb-6">
            PROJECTS
          </h2>
          <p className="text-lg md:text-xl text-muted font-medium">
            {t(
              'Kumpulan proyek aplikasi dan website, termasuk Dapur Kuliner Pak Ndut serta proyek SMP Negeri 1 Loceret yang sedang disiapkan.',
              'A collection of app and website projects, including Pak Ndut Culinary Kitchen and the upcoming SMP Negeri 1 Loceret project.'
            )}
          </p>
        </div>

        {/* Grid kartu proyek: 1 kolom di HP, 2 di tablet, 3 di desktop */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {config.projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 4: DESIGNS (poster, pamflet, dan karya desain lain)
// Galeri 3D: kartu tengah menonjol, kartu samping miring
// ============================================================

// Bentuk data satu karya desain (diambil dari appConfig)
type Design = { id: string; title: string; category: string; year: string; image: string };

export function Designs() {
  const { language, t } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;
  const all: Design[] = config.designs ?? [];

  const [filter, setFilter] = useState('all');     // kategori yang dipilih
  const [active, setActive] = useState(Math.floor((all.length - 1) / 2)); // kartu yang sedang di tengah
  const [preview, setPreview] = useState<Design | null>(null); // gambar yang dibuka penuh

  // Kategori dibuat otomatis dari data (Poster, Pamflet, dst.)
  const categories = Array.from(new Set(all.map((d) => d.category)));
  const list = filter === 'all' ? all : all.filter((d) => d.category === filter);

  // Pastikan posisi aktif tidak melewati jumlah data
  const current = Math.min(active, Math.max(list.length - 1, 0));
  const go = (dir: -1 | 1) => setActive(Math.min(Math.max(current + dir, 0), list.length - 1));

  // Section disembunyikan jika belum ada data desain
  if (all.length === 0) return null;

  return (
    <section id="designs" className="relative py-20 md:py-32 px-6 bg-dark text-surface-white overflow-hidden">
      {/* Cahaya warna di latar belakang */}
      <div className="designs-glow-blue absolute -top-32 -left-32 w-96 h-96 bg-primary rounded-full blur-3xl opacity-40"></div>
      <div className="designs-glow-neon absolute -bottom-32 -right-32 w-96 h-96 bg-accent rounded-full blur-3xl opacity-20"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* ---------- Judul & deskripsi ---------- */}
        <div className="text-center mb-12">
          <h2 className="font-black text-4xl md:text-5xl lg:text-7xl tracking-tighter leading-none mb-6">
            DESIGNS
          </h2>
          <p className="text-xl text-surface-white/60 font-medium max-w-2xl mx-auto">
            {t(
              'Hasil desain poster, pamflet, dan materi visual yang pernah saya buat.',
              'A showcase of posters, flyers, and visual materials I have designed.'
            )}
          </p>
        </div>

        {/* ---------- Tombol filter kategori ---------- */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {['all', ...categories].map((c) => (
            <button
              key={c}
              onClick={() => {
                const filteredDesigns = c === 'all' ? all : all.filter((design) => design.category === c);
                setFilter(c);
                setActive(Math.floor((filteredDesigns.length - 1) / 2));
              }}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                filter === c
                  ? 'bg-accent text-dark'
                  : 'bg-surface-white/10 text-surface-white/80 hover:bg-surface-white/20'
              }`}
            >
              {c === 'all' ? t('Semua', 'All') : c}
            </button>
          ))}
        </div>

        {/* ---------- Galeri 3D ---------- */}
        <div className="relative h-[330px] min-[360px]:h-[350px] sm:h-[440px]" style={{ perspective: '1400px' }}>
          {list.map((d, i) => {
            const offset = i - current;   // 0 = tengah, negatif = kiri, positif = kanan
            const abs = Math.abs(offset);
            return (
              <button
                key={d.id ?? i}
                // Kartu tengah: buka gambar penuh. Kartu samping: pindah ke tengah
                onClick={() => (offset === 0 ? setPreview(d) : setActive(i))}
                aria-label={d.title}
                className="absolute top-0 left-1/2 w-[min(72vw,14rem)] sm:w-72 rounded-3xl bg-surface-white/10 border border-surface-white/20 backdrop-blur-md p-2 pt-7 shadow-2xl transition-all duration-500 ease-out"
                style={{
                  transform: `translateX(${-50 + offset * 78}%) rotateY(${offset * -30}deg) scale(${offset === 0 ? 1 : 0.86})`,
                  zIndex: 10 - abs,
                  opacity: abs > 2 ? 0 : 1 - abs * 0.3,
                  pointerEvents: abs > 2 ? 'none' : 'auto',
                }}
              >
                {/* Tiga titik di pojok seperti jendela browser */}
                <div className="absolute top-2.5 left-4 flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400"></span>
                  <span className="w-2 h-2 rounded-full bg-yellow-300"></span>
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                </div>
                <ImageWithFallback
                  src={d.image}
                  alt={d.title}
                  className="block h-auto w-full rounded-2xl"
                />
              </button>
            );
          })}

          {/* Pantulan cahaya di bawah galeri */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-10 bg-primary/50 blur-2xl rounded-full"></div>
        </div>

        {/* ---------- Keterangan karya + tombol panah ---------- */}
        {list[current] && (
          <div className="mx-auto mt-16 grid h-32 w-full max-w-2xl grid-cols-[3rem_minmax(0,1fr)_3rem] items-center gap-4">
            <button
              onClick={() => go(-1)} disabled={current === 0} aria-label="Previous"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-white/10 transition-colors hover:bg-accent hover:text-dark disabled:opacity-30 disabled:hover:bg-surface-white/10 disabled:hover:text-surface-white"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="min-w-0 text-center">
              <p className="break-words font-black text-base sm:text-2xl tracking-tight">{list[current].title}</p>
              <p className="text-surface-white/60 font-medium mt-1">
                {list[current].category} · {list[current].year}
              </p>
            </div>

            <button
              onClick={() => go(1)} disabled={current === list.length - 1} aria-label="Next"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-white/10 transition-colors hover:bg-accent hover:text-dark disabled:opacity-30 disabled:hover:bg-surface-white/10 disabled:hover:text-surface-white"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        )}
      </div>

      {/* ---------- Popup gambar penuh ---------- */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm cursor-pointer"
          >
            <button
              onClick={() => setPreview(null)} aria-label="Close"
              className="absolute top-4 right-4 bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full max-h-[90svh] overflow-y-auto cursor-default text-center"
            >
              <img
                src={preview.image} alt={preview.title}
                className="max-w-full max-h-[78vh] mx-auto object-contain rounded-2xl shadow-2xl"
              />
              <p className="text-white font-black text-xl mt-4">{preview.title}</p>
              <p className="text-white/60 font-medium">{preview.category} · {preview.year}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ============================================================
// SECTION 5: SKILLS
// ============================================================

// Data skill. Untuk menambah skill, cukup tambah teks di array "skills".
// Judul grup memakai dua bahasa: [Indonesia, Inggris]
type SkillGroup = {
  title: [string, string];
  icon: LucideIcon;
  skills: string[];
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: ['Programming', 'Programming'],
    icon: Code2,
    skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Python'],
  },
  {
    title: ['Design', 'Design'],
    icon: PenTool,
    skills: ['Figma', 'Ibis Paint X', 'Infinite Design', 'Canva', 'PixelLab'],
  },
  {
    title: ['IT & Infra', 'IT & Infra'],
    icon: Server,
    skills: ['Networking', 'Database Management', 'Linux'],
  },
  {
    title: ['Keahlian Lain', 'Other Skills'],
    icon: Zap,
    skills: ['Video Editing', 'UI/UX Design'],
  },
];

// Satu kartu skill: cahaya biru mengikuti kursor, kartu naik saat di-hover
function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = group.icon;

  // Simpan posisi kursor ke CSS variable supaya cahaya mengikuti mouse
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    // Animasi muncul dari bawah saat masuk layar (sekali saja)
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="group relative h-full overflow-hidden rounded-[2rem] border border-surface-white/10 bg-surface-white/5 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:bg-surface-white/10"
      >
        {/* Cahaya yang mengikuti kursor */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(37,11,240,0.45), transparent 70%)',
          }}
        />

        <div className="relative">
          {/* Ikon */}
          <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-surface-white shadow-lg shadow-primary/40 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
            <Icon size={26} strokeWidth={2} />
          </div>

          {/* Judul grup */}
          <h3 className="mb-6 text-xl font-black uppercase tracking-tight">
            {t(group.title[0], group.title[1])}
          </h3>

          {/* Daftar skill sebagai chip (berubah hijau neon saat di-hover) */}
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className="cursor-default rounded-full border border-surface-white/10 bg-surface-white/5 px-3.5 py-1.5 text-sm font-medium text-surface-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-dark"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const { t } = useLanguage();

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-dark py-20 text-surface-white md:py-32"
    >
      {/* Cahaya warna di latar belakang */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary opacity-40 blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent opacity-10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ---------- Judul & deskripsi ---------- */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-6 text-4xl font-black leading-none tracking-tighter md:text-5xl lg:text-7xl">
            SKILLS
          </h2>
          <p className="text-lg font-medium text-surface-white/60 md:text-xl">
            {t(
              'Teknologi, perangkat lunak, dan disiplin ilmu yang saya kuasai untuk membangun solusi digital.',
              'Technologies, software, and disciplines I use to build digital solutions.'
            )}
          </p>
        </div>

        {/* ---------- Grid kartu: 1 kolom di HP, 2 di tablet, 4 di desktop ---------- */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group, index) => (
            <SkillCard key={group.skills[0]} group={group} index={index} />
          ))}
        </div>

        {/* Kucing pixel: hidup di strip ini, di bawah kartu skill */}
        <div className="mt-10 md:mt-14">
          <InteractivePixelCat />
        </div>
      </div>

    </section>
  );
}