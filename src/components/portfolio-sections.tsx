// ============================================================
// IMPORT
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Phone,
  Instagram,
  Linkedin,
  Github,
  Facebook,
  Youtube,
  X,
  Trophy,
  Medal,
  type LucideIcon,
} from 'lucide-react';

import { APP_CONFIG } from '../appConfig';
import { APP_CONFIG_EN } from '../appConfigEn';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './ImageWithFallback';

// ============================================================
// TIPE DATA & KONSTANTA
// ============================================================

// Bentuk data satu sertifikat (diambil dari appConfig)
type Certificate = {
  title: string;
  issuer: string;
  year: string;
  image: string;
  rank?: string;        // opsional: peringkat, mis. "Juara 1"
  competition?: string; // opsional: nama lomba
};

// Class untuk lingkaran ikon (dipakai di kontak & sosial media)
const ICON_CIRCLE = 'w-12 h-12 rounded-full bg-surface-white/10 flex items-center justify-center';

// Class untuk tombol sosial media (lingkaran + efek hover)
const SOCIAL_BUTTON = `${ICON_CIRCLE} hover:bg-accent hover:text-dark transition-colors`;

// Class untuk kolom isian form
const INPUT_CLASS =
  'w-full bg-background border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all';

// Class untuk label form
const LABEL_CLASS = 'text-sm font-bold tracking-wider text-muted uppercase';

// Ambil angka peringkat dari teks, mis. "Juara 1" atau "1st Place" -> 1
const getRankNumber = (rank?: string) => Number(rank?.match(/\d+/)?.[0]) || 0;

// Warna lencana sesuai peringkat (1 = hijau neon, 2 = perak, 3 = perunggu)
const MEDAL_STYLE: Record<number, string> = {
  1: 'bg-accent text-dark',
  2: 'bg-gray-200 text-dark',
  3: 'bg-orange-300 text-dark',
};

// ============================================================
// SECTION 1: CERTIFICATES & AWARDS
// ============================================================

// Popup detail sertifikat (muncul saat kartu sertifikat diklik)
function CertificateModal({
  cert,
  onClose,
}: {
  cert: Certificate | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {cert && (
        // Latar gelap: klik di luar popup untuk menutup
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-pointer"
        >
          {/* Kotak popup: klik di dalam tidak menutup */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90svh] flex flex-col bg-surface-white rounded-2xl sm:rounded-3xl overflow-hidden cursor-default shadow-2xl"
          >
            {/* Tombol tutup */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black transition-colors"
            >
              <X size={24} />
            </button>

            {/* Gambar sertifikat */}
            <div className="h-[38svh] sm:h-[55vh] min-h-0 bg-gray-100 flex items-center justify-center">
              <img
                src={cert.image}
                alt={cert.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Keterangan sertifikat */}
            <div className="p-4 sm:p-6 md:p-8 shrink-0 bg-white border-t border-gray-100 text-left">
              {/* Badge peringkat (hanya tampil jika ada) */}
              {cert.rank && (
                <div className="inline-block bg-accent/20 text-dark px-3 py-1 rounded-full text-sm font-bold mb-3">
                  {cert.rank}
                </div>
              )}
              <h3 className="break-words text-xl sm:text-2xl md:text-3xl font-black text-dark tracking-tight mb-2">
                {cert.competition || cert.title}
              </h3>
              <p className="text-muted font-medium text-lg">
                {cert.competition ? cert.title : cert.issuer}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Certificates() {
  const { language, t } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;
  const certs: Certificate[] = config.certificates;

  // Sertifikat yang sedang dibuka di popup (null = popup tertutup)
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Angka ringkasan (dihitung otomatis dari data)
  const firstPlaces = certs.filter((c) => getRankNumber(c.rank) === 1).length;
  const latestYear = certs.length ? Math.max(...certs.map((c) => Number(c.year) || 0)) : '-';
  const stats = [
    { value: certs.length, label: t('Penghargaan', 'Awards') },
    { value: firstPlaces, label: t('Juara 1', '1st Places') },
    { value: latestYear, label: t('Terbaru', 'Latest') },
  ];

  return (
    <section id="awards" className="relative py-20 md:py-32 px-6 bg-dark text-surface-white overflow-hidden">
      {/* Cahaya warna di latar belakang */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-accent rounded-full blur-3xl opacity-10"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* ---------- Judul, deskripsi, dan angka ringkasan ---------- */}
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-16">
          <div className="lg:col-span-7">
            <h2 className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tighter leading-none mb-6">
              CERTIFICATES<br />& AWARDS
            </h2>
            <p className="text-surface-white/60 text-lg font-medium max-w-xl">
              {t(
                'Bukti dedikasi dan pengembangan diri berkelanjutan di bidang teknologi dan desain. Klik sertifikat untuk melihat detail.',
                'Proof of dedication and continuous self-development in technology and design. Click on a certificate to view details.'
              )}
            </p>
          </div>

          {/* Tiga angka ringkasan */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-surface-white/5 border border-surface-white/10 rounded-3xl p-4 sm:p-5 text-center"
              >
                <p className="font-black text-2xl sm:text-4xl text-accent tracking-tight">{s.value}</p>
                <p className="break-words text-[0.65rem] sm:text-sm font-bold text-surface-white/60 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Galeri kartu sertifikat ---------- */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, i) => {
            const rankNumber = getRankNumber(cert.rank);
            const medal = MEDAL_STYLE[rankNumber] ?? 'bg-surface-white/20 text-surface-white';

            return (
              <motion.button
                key={i}
                onClick={() => setSelectedCert(cert)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="group text-left bg-surface-white/5 border border-surface-white/10 rounded-[2rem] p-3 hover:bg-surface-white/10 hover:border-accent hover:-translate-y-2 transition-all duration-300 flex flex-col"
              >
                {/* Gambar sertifikat + lencana peringkat */}
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-surface-white/10">
                  <ImageWithFallback
                    src={cert.image}
                    alt={cert.title}
                    className="h-full w-full object-contain"
                  />

                  {/* Lencana peringkat (hanya tampil jika ada) */}
                  {cert.rank && (
                    <div
                      className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black shadow-lg ${medal}`}
                    >
                      {rankNumber > 0 && rankNumber <= 3 ? <Medal size={14} /> : <Trophy size={14} />}
                      {cert.rank}
                    </div>
                  )}

                  {/* Tahun */}
                  <div className="absolute bottom-3 right-3 bg-dark/70 backdrop-blur-md text-surface-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {cert.year}
                  </div>
                </div>

                {/* Judul & penyelenggara */}
                <div className="p-4 pb-3">
                  <h4 className="font-black text-lg leading-snug mb-2 group-hover:text-accent transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-surface-white/60 text-sm font-medium">{cert.issuer}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Popup detail sertifikat */}
      <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </section>
  );
}

// ============================================================
// SECTION 2: SERVICES
// ============================================================
export function Services() {
  const { language } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;

  return (
    <section className="py-20 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Judul section */}
        <div className="text-center mb-20">
          <h2 className="font-black text-4xl md:text-5xl lg:text-7xl text-dark tracking-tighter leading-none">
            SERVICES
          </h2>
        </div>

        {/* Grid kartu layanan */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.services.map((service, i) => (
            <div
              key={i}
              className="bg-surface-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group"
            >
              <h3 className="text-2xl font-black text-dark tracking-tight mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted font-medium">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 3: CONTACT
// ============================================================

// Form pesan: isinya dikirim lewat WhatsApp saat disubmit
function ContactForm() {
  const { language, t } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;

  // Isi form (nama, email, pesan)
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  // Helper: update satu kolom form tanpa mengubah kolom lain
  const updateField = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // Saat form dikirim: susun pesan lalu buka WhatsApp di tab baru
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const whatsappMessage = [
      `Nama: ${form.name}`,
      `Email: ${form.email}`,
      '',
      form.message,
    ].join('\n');

    window.open(
      `${config.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="bg-surface-white rounded-[2rem] p-6 sm:p-8 md:p-12 text-dark shadow-2xl">
      <h3 className="font-black text-2xl sm:text-3xl mb-8">{t('Kirim Pesan', 'Send Message')}</h3>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Kolom nama */}
        <div className="space-y-2">
          <label className={LABEL_CLASS}>{t('Nama Lengkap', 'Full Name')}</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            className={INPUT_CLASS}
            placeholder="John Doe"
          />
        </div>

        {/* Kolom email */}
        <div className="space-y-2">
          <label className={LABEL_CLASS}>Email Address</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            className={INPUT_CLASS}
            placeholder="john@example.com"
          />
        </div>

        {/* Kolom pesan */}
        <div className="space-y-2">
          <label className={LABEL_CLASS}>{t('Pesan', 'Message')}</label>
          <textarea
            rows={4}
            required
            value={form.message}
            onChange={(e) => updateField('message', e.target.value)}
            className={`${INPUT_CLASS} resize-none`}
            placeholder={t(
              'Ceritakan tentang ide atau project Anda...',
              'Tell us about your idea or project...'
            )}
          />
        </div>

        {/* Tombol kirim */}
        <button className="w-full bg-dark text-surface-white font-bold text-lg tracking-wider py-4 rounded-xl hover:bg-primary transition-colors">
          {t('KIRIM PESAN', 'SEND MESSAGE')}
        </button>
      </form>
    </div>
  );
}

export function ContactSection() {
  const { language, t } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;

  // Daftar sosial media. Untuk menambah ikon baru, cukup tambah satu baris di sini
  // (dan isi link-nya di appConfig.ts & appConfigEn.ts)
  const socialLinks: { label: string; href: string; Icon: LucideIcon }[] = [
    { label: 'Instagram', href: config.contact.instagram, Icon: Instagram },
    { label: 'LinkedIn', href: config.contact.linkedin, Icon: Linkedin },
    { label: 'GitHub', href: config.contact.github, Icon: Github },
    { label: 'Facebook', href: config.contact.facebook, Icon: Facebook },
    { label: 'YouTube', href: config.contact.youtube, Icon: Youtube },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 px-6 bg-primary text-surface-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        {/* ---------- Kolom kiri: info kontak ---------- */}
        <div>
          {/* Judul */}
          <h2 className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.9] mb-8">
            CONTACT <span className="text-accent">US.</span>
          </h2>

          {/* Deskripsi */}
          <p className="text-lg text-surface-white/80 font-medium mb-12 max-w-md">
            {t(
              'Terbuka untuk kolaborasi kreatif, proyek desain, pengembangan aplikasi, dan peluang menarik lainnya. Jangan ragu untuk menyapa!',
              "Open for creative collaborations, design projects, app development, and other exciting opportunities. Don't hesitate to say hello!"
            )}
          </p>

          {/* Email & WhatsApp */}
          <div className="space-y-6 mb-12">
            <a
              href={`mailto:${config.contact.email}`}
              className="flex min-w-0 items-center gap-3 sm:gap-4 break-all text-surface-white hover:text-accent transition-colors font-bold text-sm sm:text-lg"
            >
              <div className={ICON_CIRCLE}>
                <Mail size={20} />
              </div>
              {config.contact.email}
            </a>

            <a
              href={config.contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 sm:gap-4 text-surface-white hover:text-accent transition-colors font-bold text-sm sm:text-lg"
            >
              <div className={ICON_CIRCLE}>
                <Phone size={20} />
              </div>
              WhatsApp Message
            </a>
          </div>

          {/* Ikon sosial media (dibuat otomatis dari daftar socialLinks) */}
          <div className="flex flex-wrap gap-4">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={SOCIAL_BUTTON}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* ---------- Kolom kanan: form kirim pesan ---------- */}
        <ContactForm />
      </div>
    </section>
  );
}