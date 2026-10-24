// ============================================================
// IMPORT
// ============================================================
import { useState } from 'react';
import { motion } from 'motion/react';
import { Code, PenTool, Server, Zap } from 'lucide-react';

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
// SECTION 3: EDUCATION
// ============================================================

// Logo sekolah. Jika logo kosong / gagal dimuat, tampil huruf awal nama sekolah
function SchoolLogo({ src, name }: { src?: string; name: string }) {
  const [failed, setFailed] = useState(false);

  // Cadangan: kotak biru dengan huruf awal sekolah
  if (!src || failed) {
    return (
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary text-surface-white font-black text-2xl md:text-3xl flex items-center justify-center shrink-0">
        {name.trim().charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-surface-white border border-gray-200 shadow-sm p-2 flex items-center justify-center shrink-0">
      <img
        src={src}
        alt={`Logo ${name}`}
        onError={() => setFailed(true)}
        loading="lazy"
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
}

// Satu item pendidikan di timeline
function EducationItem({
  edu,
}: {
  edu: { school: string; major?: string; achievements?: string; year?: string; logo?: string };
}) {
  return (
    <div className="relative flex items-start group">
      {/* Titik penanda di garis timeline */}
      <div className="absolute left-5 md:left-8 -translate-x-1/2 mt-1.5 w-10 h-10 rounded-full bg-surface-white border-4 border-background flex items-center justify-center shadow-md group-hover:border-primary transition-colors z-10">
        <div className="w-3 h-3 bg-dark rounded-full group-hover:bg-primary transition-colors"></div>
      </div>

      {/* Kartu isi pendidikan */}
      <div className="pl-14 md:pl-20 w-full">
        <div className="bg-background p-5 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 flex flex-col md:flex-row justify-between md:items-center gap-5 sm:gap-6 hover:shadow-lg transition-shadow">
          {/* Kiri: logo + sekolah, jurusan, prestasi */}
          <div className="flex items-start gap-4 sm:gap-5 min-w-0">
            <SchoolLogo src={edu.logo} name={edu.school} />

            <div className="min-w-0">
              <h4 className="font-black text-xl sm:text-2xl md:text-3xl text-dark tracking-tight mb-2 break-words">
                {edu.school}
              </h4>

              {/* Jurusan (hanya tampil jika ada) */}
              {edu.major && <p className="text-lg sm:text-xl text-primary font-bold mb-4 break-words">{edu.major}</p>}

              {/* Prestasi (hanya tampil jika ada) */}
              {edu.achievements && (
                <p className="text-muted font-medium bg-surface-white inline-block max-w-full break-words px-3 sm:px-4 py-2 rounded-2xl sm:rounded-full border border-gray-200 text-xs sm:text-sm">
                  {edu.achievements}
                </p>
              )}
            </div>
          </div>

          {/* Kanan: tahun (tampil "-" jika kosong) */}
          <div className="md:text-right shrink-0">
            <div className="inline-block bg-dark text-surface-white px-5 py-2 rounded-full font-bold text-sm tracking-wider">
              {edu.year || '-'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Education() {
  const { language } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;

  return (
    <section id="education" className="py-20 md:py-32 px-6 bg-surface-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <SectionTitle className="text-dark">EDUCATION</SectionTitle>

        {/* Timeline: garis vertikal dibuat lewat before: */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-8 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-200 before:via-gray-300 before:to-transparent">
          {config.education.map((edu, i) => (
            <EducationItem key={i} edu={edu} />
          ))}
        </div>
      </div>
    </section>
  );
}