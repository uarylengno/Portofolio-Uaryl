// ============================================================
// IMPORT
// ============================================================
import { useState } from 'react';
import { motion } from 'motion/react';
import { Code, PenTool, Server, Zap, Sparkles } from 'lucide-react';

import { APP_CONFIG } from '../appConfig';
import { APP_CONFIG_EN } from '../appConfigEn';
import { useLanguage } from '../contexts/LanguageContext';

// ============================================================
// KOMPONEN KECIL: JUDUL SECTION
// Dipakai oleh section Experience dan Education
// ============================================================
function SectionTitle({ children, className }: { children: string; className: string }) {
  return (
    <div className="text-center mb-20">
      <h2
        className={`font-black text-4xl md:text-5xl lg:text-7xl tracking-tighter leading-none ${className}`}
      >
        {children}
      </h2>
    </div>
  );
}

// ============================================================
// SECTION 1: SKILLS
// ============================================================
export function Skills() {
  const { language, t } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;

  // Kategori keahlian. Data skill diambil dari appConfig
  const skillCategories = [
    { id: 'programming', title: 'PROGRAMMING', icon: <Code size={24} />, data: config.skills.programming },
    { id: 'design', title: 'DESIGN', icon: <PenTool size={24} />, data: config.skills.design },
    { id: 'it', title: 'IT & INFRA', icon: <Server size={24} />, data: config.skills.it },
    { id: 'other', title: 'OTHER SKILLS', icon: <Zap size={24} />, data: config.skills.other },
  ];

  return (
    <section id="skills" className="py-20 md:py-32 px-6 bg-dark text-surface-white">
      <div className="max-w-7xl mx-auto">
        {/* Judul & deskripsi section */}
        <div className="text-center mb-20">
          <h2 className="font-black text-4xl md:text-5xl lg:text-7xl tracking-tighter leading-none mb-6">
            SKILLS
          </h2>
          <p className="text-xl text-surface-white/60 font-medium max-w-2xl mx-auto">
            {t(
              'Bidang dan perangkat yang saya gunakan atau pelajari melalui proyek aplikasi, website, dan desain.',
              'Areas and tools I use or study through app, website, and design projects.'
            )}
          </p>
        </div>

        {/* Grid kartu kategori */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-surface-white/5 border border-surface-white/10 rounded-3xl p-8 hover:bg-surface-white/10 transition-colors"
            >
              {/* Ikon kategori */}
              <div className="w-14 h-14 bg-primary text-surface-white rounded-2xl flex items-center justify-center mb-8">
                {cat.icon}
              </div>

              {/* Nama kategori */}
              <h3 className="text-xl font-black tracking-tight mb-6">{cat.title}</h3>

              {/* Daftar skill (titik hijau dibuat lewat before:) */}
              <ul className="space-y-3">
                {cat.data.map((skill) => (
                  <li
                    key={skill}
                    className="font-medium text-surface-white/80 flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full before:mr-3"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 2: EXPERIENCE
// ============================================================

// Tema warna kartu pengalaman. Dipakai bergantian: kartu 1, 2, 3, lalu ulang dari awal
const EXPERIENCE_THEMES = [
  {
    // Kartu hijau
    bg: 'bg-accent',
    title: 'text-dark',
    company: 'text-primary',
    desc: 'text-dark/80',
    pill: 'bg-white/50 text-dark border-dark/10',
  },
  {
    // Kartu putih
    bg: 'bg-surface-white',
    title: 'text-dark',
    company: 'text-primary',
    desc: 'text-dark/70',
    pill: 'bg-gray-50 text-dark border-gray-200',
  },
  {
    // Kartu gelap
    bg: 'bg-dark',
    title: 'text-surface-white',
    company: 'text-accent',
    desc: 'text-surface-white/80',
    pill: 'bg-white/10 text-surface-white border-white/20',
  },
];

// Satu kartu pengalaman berbentuk folder
function ExperienceCard({
  exp,
  index,
}: {
  exp: { role: string; company: string; year: string; description: string };
  index: number;
}) {
  // Pilih tema sesuai urutan kartu
  const theme = EXPERIENCE_THEMES[index % EXPERIENCE_THEMES.length];

  return (
    // Animasi muncul dari kiri saat kartu masuk layar (sekali saja)
    <motion.div
      initial={{ opacity: 0, y: 48, x: index % 2 === 0 ? -28 : 28, rotate: index % 2 === 0 ? -3 : 3, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -9, scale: 1.025, rotate: index % 2 === 0 ? 0.6 : -0.6 }}
      className="relative flex items-start group"
    >
      <div className="w-full h-full relative">
        {/* Tab folder (bagian kecil di atas kartu) */}
        <motion.div
          className={`absolute -top-4 left-4 h-6 w-32 ${theme.bg} rounded-t-lg border-t border-l border-r border-white/10 z-0 origin-left`}
          whileHover={{ scaleX: 1.14, x: 4 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />

        {/* Badan folder */}
        <div
          className={`relative z-10 ${theme.bg} p-8 rounded-3xl rounded-tl-none shadow-md border border-white/10 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-black/20 h-full flex flex-col overflow-hidden`}
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/20 blur-2xl"
            initial={{ opacity: 0, scale: 0.6 }}
            whileHover={{ opacity: 1, scale: 1.3, x: -10, y: 10 }}
            transition={{ duration: 0.55 }}
          />
          {/* Baris atas: jabatan, perusahaan, tahun */}
          <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
            <div>
              <motion.h4
                className={`font-black text-xl sm:text-2xl tracking-tight break-words ${theme.title}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.13 + 0.18 }}
              >
                {exp.role}
              </motion.h4>
              <p className={`font-bold mt-1 ${theme.company}`}>{exp.company}</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.08, rotate: 2 }}
              className={`${theme.pill} max-w-full px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border inline-block shadow-sm whitespace-nowrap`}
            >
              {exp.year}
            </motion.div>
          </div>

          {/* Deskripsi pekerjaan */}
          <motion.p
            className={`relative z-10 font-medium leading-relaxed mt-auto ${theme.desc}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.13 + 0.28 }}
          >
            {exp.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const { language } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;

  return (
    <section id="experience" className="relative isolate overflow-hidden py-20 md:py-32 px-6 bg-primary">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -28, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl"
        animate={{ x: [0, -42, 0], y: [0, 32, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative mx-auto max-w-4xl">
        <SectionTitle className="text-surface-white">EXPERIENCE</SectionTitle>

        {/* Grid kartu pengalaman: 1 kolom di HP, 2 kolom di layar lebar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {config.experience.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ============================================================
// SECTION 3: EDUCATION
// ============================================================

// Logo sekolah dengan animasi hover interaktif
function SchoolLogo({ src, name, index }: { src?: string; name: string; index: number }) {
  const [failed, setFailed] = useState(false);

  // Cadangan: kotak biru dengan huruf awal sekolah
  if (!src || failed) {
    return (
      <motion.div
        whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 3 : -3 }}
        transition={{ type: 'spring', stiffness: 380, damping: 16 }}
        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary text-surface-white font-black text-2xl md:text-3xl flex items-center justify-center shrink-0 shadow-sm"
      >
        {name.trim().charAt(0).toUpperCase()}
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 3 : -3 }}
      transition={{ type: 'spring', stiffness: 380, damping: 16 }}
      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-surface-white border border-gray-200/80 shadow-xs group-hover:border-primary/40 group-hover:shadow-md p-2.5 flex items-center justify-center shrink-0 transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <img
        src={src}
        alt={`Logo ${name}`}
        onError={() => setFailed(true)}
        loading="lazy"
        className="max-w-full max-h-full object-contain relative z-10"
      />
    </motion.div>
  );
}

// Satu item pendidikan di timeline dengan animasi stagger & interaktif
function EducationItem({
  edu,
  index,
}: {
  edu: { school: string; major?: string; achievements?: string; year?: string; logo?: string };
  index: number;
}) {
  const isCurrent =
    index === 0 ||
    edu.year?.toLowerCase().includes('sekarang') ||
    edu.year?.toLowerCase().includes('present');

  return (
    <div className="relative flex items-start group">
      {/* Titik penanda di garis timeline */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.13 + 0.1 }}
        whileHover={{ scale: 1.25 }}
        className="absolute left-5 md:left-8 -translate-x-1/2 mt-2 w-10 h-10 rounded-full bg-surface-white border-4 border-background flex items-center justify-center shadow-md group-hover:border-gray-300 transition-all duration-300 z-10"
      >
        <div
          className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
            isCurrent
              ? 'bg-dark ring-4 ring-gray-200 scale-110'
              : 'bg-gray-400 group-hover:bg-gray-600 group-hover:scale-125'
          }`}
        />
      </motion.div>

      {/* Kartu isi pendidikan dengan stagger reveal & hover elevation */}
      <div className="pl-14 md:pl-20 w-full">
        <motion.div
          initial={{ opacity: 0, x: 45, y: 18, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: index * 0.13, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6, scale: 1.012 }}
          className="bg-background p-5 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 flex flex-col md:flex-row justify-between md:items-center gap-5 sm:gap-6 shadow-xs hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-400 relative overflow-hidden"
        >
          {/* Efek glowing ambient di sudut kartu saat di-hover */}
          <div className="pointer-events-none absolute -right-20 -top-20 w-52 h-52 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/15 transition-all duration-500" />

          {/* Kiri: logo + sekolah, jurusan, prestasi */}
          <div className="flex items-start gap-4 sm:gap-5 min-w-0 relative z-10">
            <SchoolLogo src={edu.logo} name={edu.school} index={index} />

            <div className="min-w-0">
              <h4 className="font-black text-xl sm:text-2xl md:text-3xl text-dark tracking-tight mb-2 break-words group-hover:text-primary transition-colors duration-300">
                {edu.school}
              </h4>

              {/* Jurusan (hanya tampil jika ada) */}
              {edu.major && (
                <p className="text-lg sm:text-xl text-primary font-bold mb-4 break-words">
                  {edu.major}
                </p>
              )}

              {/* Prestasi / Organisasi dengan animasi hover halus */}
              {edu.achievements && (
                <motion.p
                  whileHover={{ scale: 1.02, x: 3 }}
                  className="text-muted font-medium bg-surface-white inline-flex items-center gap-2 max-w-full break-words px-3 sm:px-4 py-2 rounded-2xl sm:rounded-full border border-gray-200 text-xs sm:text-sm shadow-xs group-hover:border-primary/20 transition-all duration-300"
                >
                  <Sparkles size={13} className="text-primary shrink-0" />
                  <span>{edu.achievements}</span>
                </motion.p>
              )}
            </div>
          </div>

          {/* Kanan: tag tahun dengan animasi scale & status aktif */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="md:text-right shrink-0 relative z-10"
          >
            <div
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs sm:text-sm tracking-wider shadow-sm transition-all duration-300 ${
                isCurrent
                  ? 'bg-dark text-surface-white group-hover:bg-primary'
                  : 'bg-dark text-surface-white group-hover:bg-primary/90'
              }`}
            >
              {isCurrent && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              )}
              <span>{edu.year || '-'}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function Education() {
  const { language } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;

  return (
    <section id="education" className="relative isolate overflow-hidden py-20 md:py-32 px-6 bg-surface-white border-t border-gray-100">
      {/* Background ambient orbs beranimasi */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-16 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 bottom-12 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        animate={{ x: [0, -35, 0], y: [0, -25, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Header section dengan animasi reveal & badge */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-black text-4xl md:text-5xl lg:text-7xl tracking-tighter leading-none text-dark">
            EDUCATION
          </h2>
        </motion.div>

        {/* Timeline dengan garis vertikal netral */}
        <div className="space-y-8 relative">
          <div className="absolute left-5 md:left-8 top-4 bottom-4 w-1 -translate-x-1/2 bg-gray-200/70 rounded-full" />

          {config.education.map((edu, i) => (
            <EducationItem key={i} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
