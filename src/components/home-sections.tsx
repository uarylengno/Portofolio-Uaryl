// ============================================================
// IMPORT
// ============================================================
import { useState, useRef, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  Code2,
  Sparkles,
  Palette,
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

// ============================================================
// KONSTANTA
// ============================================================

// Foto sementara dari Unsplash. Ganti dengan fotomu sendiri,
// misalnya "/assets/images/fotoku.jpg" (file ada di folder public)
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=1600&auto=format&fit=crop';
const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop';

// Kurva animasi halus yang dipakai di Hero
const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

// ============================================================
// JUDUL "Porto*folio*"
// Bagian depan: sans-serif tebal. Huruf "f" dan sisanya: serif italic.
// Berlaku untuk "Portofolio" (ID) maupun "Portfolio" (EN).
// Gaya .title-bold dan .title-serif ada di src/index.css
// ============================================================
function PortfolioTitle({ text }: { text: string }) {
  // Cari huruf "f" pertama sebagai titik pemisah
  const i = text.toLowerCase().indexOf('f');

  // Kalau tidak ada huruf "f", tampilkan seluruhnya dengan gaya tebal
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
        {/* ---------- Kolom kiri: teks ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: SMOOTH_EASE }}
          className="lg:col-span-7 pt-12 lg:pt-0"
        >
          {/* Label peran/profesi */}
          <div className="mb-4 inline-block px-4 py-2 bg-surface-white/10 text-accent font-bold text-sm rounded-full tracking-wider">
            {config.personal.role}
          </div>

          {/* Judul besar: Portofolio + nama (ukuran huruf menyesuaikan lebar layar) */}
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

        {/* ---------- Kolom kanan: foto + elemen melayang ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: SMOOTH_EASE }}
          className="lg:col-span-5 relative mt-8 lg:mt-0"
        >
          {/* Cahaya blur dekoratif di belakang foto */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-accent/40 rounded-full blur-3xl opacity-60 animate-pulse z-0"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-400/30 rounded-full blur-3xl opacity-60 animate-pulse delay-700 z-0"></div>

          {/* Foto utama (hitam putih, zoom saat di-hover) */}
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group border-4 border-surface-white/10 shadow-2xl z-10">
            <ImageWithFallback
              src={HERO_IMAGE}
              alt="Uaryl Engno Laurenca"
              className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
            />
            {/* Lapisan warna biru tipis di atas foto */}
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
          </div>

          {/* Badge melayang: Web Developer (kiri atas, naik-turun) */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            className="absolute top-4 -left-6 md:-left-12 bg-surface-white text-dark py-3 px-6 rounded-full font-bold text-sm shadow-xl flex items-center gap-3 border border-gray-100 z-20"
          >
            <div className="bg-primary/10 p-2 rounded-full">
              <Code2 size={18} className="text-primary" />
            </div>
            Web Developer
          </motion.div>

          {/* Badge melayang: UI/UX Designer (kanan bawah, turun-naik) */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-6 -right-4 md:-right-8 bg-accent text-dark py-3 px-6 rounded-full font-bold text-sm shadow-xl flex items-center gap-3 z-20"
          >
            <Palette size={18} /> UI/UX Designer
          </motion.div>

          {/* Bintang berputar (tengah kiri) */}
          <motion.div
            animate={{ rotate: -360, scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 7, ease: 'linear', delay: 0.5 }}
            className="absolute top-1/2 -left-8 md:-left-12 -translate-y-1/2 text-surface-white/80 z-20 drop-shadow-lg"
          >
            <Sparkles size={36} strokeWidth={1.5} />
          </motion.div>

          {/* Bintang berputar (kanan atas) */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            className="absolute top-12 -right-6 md:-right-12 text-accent z-20 drop-shadow-lg"
          >
            <Sparkles size={48} strokeWidth={1.5} />
          </motion.div>
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
    <section id="about" className="py-20 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
        {/* ---------- Kolom kiri: foto bulat + lingkaran dekoratif ---------- */}
        <div className="lg:col-span-5 relative">
          <div className="aspect-square rounded-full overflow-hidden border-8 border-surface-white shadow-2xl relative z-10 w-3/4 mx-auto lg:w-full">
            <ImageWithFallback
              src={ABOUT_IMAGE}
              alt="About Aril Engno"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Lingkaran hijau (kanan atas) dan biru (kiri bawah) */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent rounded-full -z-0 translate-x-4 -translate-y-4"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary rounded-full -z-0 -translate-x-8 translate-y-8"></div>
        </div>

        {/* ---------- Kolom kanan: teks ---------- */}
        <div className="lg:col-span-7">
          {/* Label kecil */}
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            {t('TENTANG SAYA', 'ABOUT ME')}
          </div>

          {/* Judul (kata terakhir berwarna biru) */}
          <h2 className="font-black text-dark text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[1] mb-8">
            {t('Lebih dari sekadar ', 'More than just a ')}
            <span className="text-primary">{t('Kreator.', 'Creator.')}</span>
          </h2>

          {/* Deskripsi: paragraf pertama dari config, kedua ditulis langsung */}
          <div className="space-y-6 text-lg text-dark/80 font-medium">
            <p>{config.personal.description}</p>
            <p>
              {t(
                'Saya selalu antusias mengeksplorasi teknologi terbaru, mulai dari pengembangan web modern hingga desain grafis dan UI/UX. Saya percaya bahwa produk digital yang baik harus menyeimbangkan antara estetika, performa, dan kegunaan.',
                'I am always enthusiastic about exploring the latest technologies, from modern web development to graphic design and UI/UX. I believe that a good digital product must balance aesthetics, performance, and usability.'
              )}
            </p>
          </div>
        </div>
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
    imageBg: 'bg-primary',
  },
  blue: {
    card: 'bg-primary border-primary text-surface-white',
    arrow: 'bg-accent text-primary',
    divider: 'bg-surface-white/30',
    description: 'text-surface-white/90',
    imageBg: 'bg-accent',
  },
};

// Bentuk data satu proyek (diambil dari appConfig)
type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  demoLink?: string;
  githubLink?: string;
};

// Satu kartu proyek
function ProjectCard({ project, index }: { project: Project; index: number }) {
  // Setiap kartu ke-2, 5, 8, ... memakai gaya biru
  const style = index % 3 === 1 ? PROJECT_STYLES.blue : PROJECT_STYLES.white;

  // Link kartu: pakai link demo; kalau kosong ("#"), pakai link GitHub.
  // Kalau dua-duanya kosong, kartu tidak bisa diklik.
  const isReal = (l?: string) => !!l && l !== '#';
  const projectLink = isReal(project.demoLink)
    ? project.demoLink
    : isReal(project.githubLink)
    ? project.githubLink
    : undefined;

  // Seluruh kartu menjadi link (buka di tab baru) jika link tersedia
  const Card: any = projectLink ? motion.a : motion.div;
  const linkProps = projectLink
    ? { href: projectLink, target: '_blank', rel: 'noreferrer', 'aria-label': project.title }
    : {};

  return (
    // Animasi muncul dari bawah saat kartu masuk layar (sekali saja)
    <Card
      {...linkProps}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group rounded-[2.5rem] p-6 lg:p-8 flex flex-col h-full border-[3px] transition-transform hover:-translate-y-2 ${
        projectLink ? 'cursor-pointer' : ''
      } ${style.card}`}
    >
      {/* Header: judul + ikon panah (hanya hiasan, karena seluruh kartu sudah jadi link) */}
      <div className="flex justify-between items-start mb-6 gap-4">
        {/* Kata pertama judul dipisah ke baris sendiri */}
        <h3 className="text-3xl font-black tracking-tight leading-[1.1] pr-4 whitespace-pre-wrap">
          {project.title.replace(' ', '\n')}
        </h3>
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${style.arrow}`}
        >
          <ArrowUpRight size={28} strokeWidth={3} />
        </div>
      </div>

      {/* Garis pemisah */}
      <div className={`w-full h-[2px] mb-6 ${style.divider}`}></div>

      {/* Deskripsi proyek */}
      <p className={`text-base font-medium mb-8 ${style.description}`}>{project.description}</p>

      {/* Gambar proyek (menempel di bagian bawah kartu) */}
      <div className={`mt-auto relative rounded-3xl overflow-hidden aspect-[4/3] ${style.imageBg}`}>
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
    </Card>
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
              'Koleksi karya terbaik yang mencakup pengembangan web, desain UI/UX, dan eksplorasi digital lainnya.',
              'A collection of my best works covering web development, UI/UX design, and other digital explorations.'
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
  const [active, setActive] = useState(0);         // kartu yang sedang di tengah
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
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary rounded-full blur-3xl opacity-40"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent rounded-full blur-3xl opacity-20"></div>

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
              onClick={() => { setFilter(c); setActive(0); }}
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
        <div className="relative h-[350px] sm:h-[440px]" style={{ perspective: '1400px' }}>
          {list.map((d, i) => {
            const offset = i - current;   // 0 = tengah, negatif = kiri, positif = kanan
            const abs = Math.abs(offset);
            return (
              <button
                key={d.id ?? i}
                // Kartu tengah: buka gambar penuh. Kartu samping: pindah ke tengah
                onClick={() => (offset === 0 ? setPreview(d) : setActive(i))}
                aria-label={d.title}
                className="absolute top-0 left-1/2 w-56 sm:w-72 rounded-3xl bg-surface-white/10 border border-surface-white/20 backdrop-blur-md p-2 pt-7 shadow-2xl transition-all duration-500 ease-out"
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
                  className="w-full aspect-[3/4] object-cover rounded-2xl"
                />
              </button>
            );
          })}

          {/* Pantulan cahaya di bawah galeri */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-10 bg-primary/50 blur-2xl rounded-full"></div>
        </div>

        {/* ---------- Keterangan karya + tombol panah ---------- */}
        {list[current] && (
          <div className="mt-16 flex items-center justify-center gap-6">
            <button
              onClick={() => go(-1)} disabled={current === 0} aria-label="Previous"
              className="w-12 h-12 rounded-full bg-surface-white/10 flex items-center justify-center hover:bg-accent hover:text-dark transition-colors disabled:opacity-30 disabled:hover:bg-surface-white/10 disabled:hover:text-surface-white"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="text-center min-w-0 max-w-xs sm:max-w-md">
              <p className="font-black text-xl sm:text-2xl tracking-tight">{list[current].title}</p>
              <p className="text-surface-white/60 font-medium mt-1">
                {list[current].category} · {list[current].year}
              </p>
            </div>

            <button
              onClick={() => go(1)} disabled={current === list.length - 1} aria-label="Next"
              className="w-12 h-12 rounded-full bg-surface-white/10 flex items-center justify-center hover:bg-accent hover:text-dark transition-colors disabled:opacity-30 disabled:hover:bg-surface-white/10 disabled:hover:text-surface-white"
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
              className="max-w-3xl w-full cursor-default text-center"
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

// ============================================================
// ROBOT LUCU YANG BERJALAN LEWAT
// Gambar SVG + animasi CSS (keyframes ada di <style> komponen Skills).
// Warna mengikuti tema: primary (badan), accent (mata & lampu), dark (layar wajah)
// ============================================================
function CuteRobot() {
  return (
    <svg viewBox="0 0 80 96" className="h-24 w-20 overflow-visible" aria-hidden="true">
      {/* Seluruh badan robot naik-turun saat melangkah */}
      <g className="robot-bob">
        {/* Antena + bola lampu berkedip */}
        <line x1="40" y1="8" x2="40" y2="17" stroke="var(--color-primary, #250BF0)" strokeWidth="3" strokeLinecap="round" />
        <circle className="robot-glow" cx="40" cy="6" r="4.5" fill="var(--color-accent, #C8F000)" />

        {/* Telinga */}
        <rect x="12" y="27" width="6" height="13" rx="3" fill="var(--color-accent, #C8F000)" />
        <rect x="62" y="27" width="6" height="13" rx="3" fill="var(--color-accent, #C8F000)" />

        {/* Kepala */}
        <rect x="17" y="16" width="46" height="34" rx="13" fill="var(--color-primary, #250BF0)" />
        {/* Layar wajah */}
        <rect x="22" y="21" width="36" height="23" rx="9" fill="var(--color-dark, #111111)" />

        {/* Mata (berkedip) */}
        <ellipse className="robot-eye" cx="33" cy="31" rx="3.6" ry="4.6" fill="var(--color-accent, #C8F000)" />
        <ellipse className="robot-eye" cx="47" cy="31" rx="3.6" ry="4.6" fill="var(--color-accent, #C8F000)" />

        {/* Pipi + senyum */}
        <circle cx="27" cy="38" r="2.2" fill="var(--color-accent, #C8F000)" opacity="0.35" />
        <circle cx="53" cy="38" r="2.2" fill="var(--color-accent, #C8F000)" opacity="0.35" />
        <path d="M35 38 Q40 42 45 38" stroke="var(--color-accent, #C8F000)" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Lengan (berayun bergantian) */}
        <g className="robot-arm robot-arm-back">
          <rect x="15" y="54" width="8" height="19" rx="4" fill="var(--color-primary, #250BF0)" />
          <circle cx="19" cy="74" r="4" fill="var(--color-accent, #C8F000)" />
        </g>
        <g className="robot-arm robot-arm-front">
          <rect x="57" y="54" width="8" height="19" rx="4" fill="var(--color-primary, #250BF0)" />
          <circle cx="61" cy="74" r="4" fill="var(--color-accent, #C8F000)" />
        </g>

        {/* Badan + lampu dada */}
        <rect x="23" y="52" width="34" height="26" rx="10" fill="var(--color-primary, #250BF0)" />
        <circle className="robot-glow" cx="40" cy="65" r="5.5" fill="var(--color-accent, #C8F000)" />
        <circle cx="40" cy="65" r="2.2" fill="var(--color-dark, #111111)" />
      </g>

      {/* Kaki (melangkah bergantian, tidak ikut naik-turun) */}
      <g className="robot-leg robot-leg-back">
        <rect x="28" y="76" width="9" height="14" rx="4.5" fill="var(--color-primary, #250BF0)" />
        <rect x="25" y="87" width="15" height="7" rx="3.5" fill="var(--color-accent, #C8F000)" />
      </g>
      <g className="robot-leg robot-leg-front">
        <rect x="43" y="76" width="9" height="14" rx="4.5" fill="var(--color-primary, #250BF0)" />
        <rect x="40" y="87" width="15" height="7" rx="3.5" fill="var(--color-accent, #C8F000)" />
      </g>
    </svg>
  );
}

export function Skills() {
  const { t } = useLanguage();

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-dark py-20 text-surface-white md:py-32"
    >
      {/* Animasi robot (otomatis diam jika pengguna memilih reduced motion) */}
      <style>{`
        /* Robot berjalan dari kiri ke kanan layar lalu mengulang */
        .robot-walker {
          animation: robot-walk 16s linear infinite;
        }
        @keyframes robot-walk {
          from { transform: translateX(-140px); }
          to { transform: translateX(calc(100vw + 40px)); }
        }

        /* Badan naik-turun */
        .robot-bob { animation: robot-bob 0.6s ease-in-out infinite; }
        @keyframes robot-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        /* Kaki melangkah bergantian */
        .robot-leg, .robot-arm {
          transform-box: fill-box;
          transform-origin: 50% 0%;
        }
        .robot-leg { animation: robot-swing 0.6s ease-in-out infinite; }
        .robot-leg-back { animation-delay: -0.3s; }
        @keyframes robot-swing {
          0%, 100% { transform: rotate(26deg); }
          50% { transform: rotate(-26deg); }
        }

        /* Lengan berayun berlawanan dengan kaki */
        .robot-arm { animation: robot-arm-swing 0.6s ease-in-out infinite; }
        .robot-arm-front { animation-delay: -0.3s; }
        @keyframes robot-arm-swing {
          0%, 100% { transform: rotate(-30deg); }
          50% { transform: rotate(30deg); }
        }

        /* Mata berkedip */
        .robot-eye {
          transform-box: fill-box;
          transform-origin: center;
          animation: robot-blink 4s ease-in-out infinite;
        }
        @keyframes robot-blink {
          0%, 92%, 100% { transform: scaleY(1); }
          96% { transform: scaleY(0.1); }
        }

        /* Lampu antena & dada berkedip pelan */
        .robot-glow { animation: robot-glow 1.2s ease-in-out infinite; }
        @keyframes robot-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* Balon "Beep boop!" muncul sebentar di tengah perjalanan */
        .robot-bubble { animation: robot-bubble 16s ease-in-out infinite; }
        @keyframes robot-bubble {
          0%, 20% { opacity: 0; transform: translateY(6px) scale(0.8); }
          25%, 40% { opacity: 1; transform: translateY(0) scale(1); }
          45%, 100% { opacity: 0; transform: translateY(6px) scale(0.8); }
        }

        @media (prefers-reduced-motion: reduce) {
          .robot-walker { animation: none; transform: translateX(40px); }
          .robot-bob, .robot-leg, .robot-arm, .robot-eye, .robot-glow { animation: none; }
          .robot-bubble { animation: none; opacity: 0; }
        }
      `}</style>

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
      </div>

      {/* ---------- Jalur robot: robot lucu berjalan lewat di atas garis tanah ---------- */}
      <div className="relative mt-16 h-36 overflow-hidden" aria-hidden="true">
        {/* Garis tanah putus-putus */}
        <div className="absolute inset-x-0 bottom-3 border-t-2 border-dashed border-surface-white/10"></div>

        {/* Robot + balon + bayangan (satu kesatuan yang bergerak) */}
        <div className="robot-walker absolute bottom-3 left-0 w-20">
          {/* Balon ucapan */}
          <div className="robot-bubble absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs font-black text-dark shadow-lg">
            Beep boop!
          </div>

          <CuteRobot />

          {/* Bayangan di tanah */}
          <div className="absolute -bottom-1 left-1/2 h-2 w-14 -translate-x-1/2 rounded-full bg-black/40 blur-sm"></div>
        </div>
      </div>
    </section>
  );
}