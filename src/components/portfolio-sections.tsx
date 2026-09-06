import { useState } from 'react';
import { APP_CONFIG } from '../appConfig';
import { APP_CONFIG_EN } from '../appConfigEn';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, Instagram, Linkedin, Github, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Certificates() {
  const { language, t } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;
  const [selectedCert, setSelectedCert] = useState<{title: string, issuer: string, year: string, image: string, rank?: string, competition?: string} | null>(null);

  return (
    <section id="awards" className="py-20 md:py-32 px-6 bg-dark text-surface-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5 sticky top-32">
          <h2 className="font-black text-4xl md:text-5xl lg:text-7xl tracking-tighter leading-none mb-6">
            CERTIFICATES<br />& AWARDS
          </h2>
          <p className="text-surface-white/60 text-lg font-medium">
            {t("Bukti dedikasi dan pengembangan diri berkelanjutan di bidang teknologi dan desain. Klik sertifikat untuk melihat detail.", "Proof of dedication and continuous self-development in technology and design. Click on a certificate to view details.")}
          </p>
        </div>
        
        <div className="lg:col-span-7">
          <div className="space-y-4">
            {config.certificates.map((cert, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedCert(cert)}
                className="group cursor-pointer bg-surface-white/5 border border-surface-white/10 p-8 rounded-3xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-surface-white/10 hover:border-accent transition-all duration-300"
              >
                <div>
                  <h4 className="font-black text-xl mb-2 group-hover:text-accent transition-colors">{cert.title}</h4>
                  <p className="text-surface-white/60 text-sm font-medium">{cert.issuer}</p>
                </div>
                <div className="bg-primary/20 text-surface-white font-bold text-sm px-5 py-2 rounded-full whitespace-nowrap self-start sm:self-auto group-hover:bg-primary transition-colors">
                  {cert.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-surface-white rounded-3xl overflow-hidden cursor-default shadow-2xl"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="flex-1 min-h-0 bg-gray-100 flex items-center justify-center">
                <img 
                  src={selectedCert.image} 
                  alt={selectedCert.title} 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="p-6 md:p-8 shrink-0 bg-white border-t border-gray-100 text-left">
                {selectedCert.rank && (
                  <div className="inline-block bg-accent/20 text-dark px-3 py-1 rounded-full text-sm font-bold mb-3">
                    {selectedCert.rank}
                  </div>
                )}
                <h3 className="text-2xl md:text-3xl font-black text-dark tracking-tight mb-2">
                  {selectedCert.competition || selectedCert.title}
                </h3>
                <p className="text-muted font-medium text-lg">
                  {selectedCert.competition ? selectedCert.title : selectedCert.issuer}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function Services() {
  const { language } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;

  return (
    <section className="py-20 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-black text-4xl md:text-5xl lg:text-7xl text-dark tracking-tighter leading-none">
            SERVICES
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.services.map((service, i) => (
            <div key={i} className="bg-surface-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group">
              <h3 className="text-2xl font-black text-dark tracking-tight mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-muted font-medium">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const { language, t } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const whatsappMessage = [
      `Nama: ${contactForm.name}`,
      `Email: ${contactForm.email}`,
      '',
      contactForm.message,
    ].join('\n');

    window.open(`${config.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-6 bg-primary text-surface-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <div>
          <h2 className="font-black text-4xl md:text-5xl lg:text-7xl tracking-tighter leading-[0.9] mb-8">
            CONTACT <span className="text-accent">US.</span>
          </h2>
          <p className="text-lg text-surface-white/80 font-medium mb-12 max-w-md">
            {t(
              "Terbuka untuk kolaborasi kreatif, proyek desain, pengembangan aplikasi, dan peluang menarik lainnya. Jangan ragu untuk menyapa!",
              "Open for creative collaborations, design projects, app development, and other exciting opportunities. Don't hesitate to say hello!"
            )}
          </p>
          
          <div className="space-y-6 mb-12">
            <a href={`mailto:${config.contact.email}`} className="flex items-center gap-4 text-surface-white hover:text-accent transition-colors font-bold text-lg">
              <div className="w-12 h-12 rounded-full bg-surface-white/10 flex items-center justify-center"><Mail size={20} /></div>
              {config.contact.email}
            </a>
            <a href={config.contact.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-surface-white hover:text-accent transition-colors font-bold text-lg">
              <div className="w-12 h-12 rounded-full bg-surface-white/10 flex items-center justify-center"><Phone size={20} /></div>
              WhatsApp Message
            </a>
          </div>
          
          <div className="flex gap-4">
            <a href={config.contact.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-surface-white/10 flex items-center justify-center hover:bg-accent hover:text-dark transition-colors">
              <Instagram size={20} />
            </a>
            <a href={config.contact.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-surface-white/10 flex items-center justify-center hover:bg-accent hover:text-dark transition-colors">
              <Linkedin size={20} />
            </a>
            <a href={config.contact.github} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-surface-white/10 flex items-center justify-center hover:bg-accent hover:text-dark transition-colors">
              <Github size={20} />
            </a>
          </div>
        </div>

        {/* Contact Form UI */}
        <div className="bg-surface-white rounded-[2rem] p-8 md:p-12 text-dark shadow-2xl">
          <h3 className="font-black text-3xl mb-8">{t("Kirim Pesan", "Send Message")}</h3>
          <form className="space-y-6" onSubmit={handleContactSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-bold tracking-wider text-muted uppercase">{t("Nama Lengkap", "Full Name")}</label>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(event) => setContactForm({ ...contactForm, name: event.target.value })}
                className="w-full bg-background border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold tracking-wider text-muted uppercase">Email Address</label>
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(event) => setContactForm({ ...contactForm, email: event.target.value })}
                className="w-full bg-background border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold tracking-wider text-muted uppercase">{t("Pesan", "Message")}</label>
              <textarea
                rows={4}
                required
                value={contactForm.message}
                onChange={(event) => setContactForm({ ...contactForm, message: event.target.value })}
                className="w-full bg-background border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                placeholder={t("Ceritakan tentang ide atau project Anda...", "Tell us about your idea or project...")}
              ></textarea>
            </div>
            <button className="w-full bg-dark text-surface-white font-bold text-lg tracking-wider py-4 rounded-xl hover:bg-primary transition-colors">
              {t("KIRIM PESAN", "SEND MESSAGE")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
