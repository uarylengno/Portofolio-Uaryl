import { APP_CONFIG } from '../appConfig';
import { APP_CONFIG_EN } from '../appConfigEn';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Code2, Sparkles, Palette, MonitorSmartphone } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export function Hero() {
  const { language, t } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;

  return (
    <section className="relative min-h-[100svh] bg-primary overflow-hidden flex items-center pt-20">
      {/* Abstract Texture */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 pt-12 lg:pt-0"
        >
          <div className="mb-4 inline-block px-4 py-2 bg-surface-white/10 text-accent font-bold text-sm rounded-full tracking-wider">
            {config.personal.role}
          </div>
          
          <h1 className="font-black tracking-tighter mb-6 flex flex-col items-start gap-1">
            <span className="leading-[0.9] text-surface-white" style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)' }}>PORTOFOLIO</span>
            <span className="leading-tight text-dark bg-accent px-3 py-1 mt-1 inline-block" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>{config.personal.name.toUpperCase()}</span>
          </h1>
          
          <p className="text-surface-white/80 text-lg md:text-xl font-medium max-w-xl mb-12 leading-relaxed">
            {config.personal.tagline}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="bg-accent text-dark px-8 py-4 rounded-full font-bold text-sm tracking-wider hover:bg-white hover:scale-105 transition-all flex items-center gap-2">
              {t("LIHAT PORTOFOLIO", "VIEW PORTFOLIO")}
            </a>
            <a href="#contact" className="border-2 border-surface-white/30 text-surface-white px-8 py-4 rounded-full font-bold text-sm tracking-wider hover:bg-surface-white hover:text-dark transition-all">
              {t("HUBUNGI SAYA", "CONTACT ME")}
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative mt-8 lg:mt-0"
        >
          {/* Decorative Background Blurs */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-accent/40 rounded-full blur-3xl opacity-60 animate-pulse z-0"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-400/30 rounded-full blur-3xl opacity-60 animate-pulse delay-700 z-0"></div>

          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group border-4 border-surface-white/10 shadow-2xl z-10">
             {/* Note: This is an unpslash fallback for the user to replace later */}
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=1600&auto=format&fit=crop" 
              alt="Uaryl Engno Laurenca" 
              className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
          </div>

          {/* Floating Element 1 - Top Left */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="absolute top-4 -left-6 md:-left-12 bg-surface-white text-dark py-3 px-6 rounded-full font-bold text-sm shadow-xl flex items-center gap-3 border border-gray-100 z-20"
          >
            <div className="bg-primary/10 p-2 rounded-full">
              <Code2 size={18} className="text-primary" />
            </div>
            Web Developer
          </motion.div>

          {/* Floating Element 2 - Bottom Right */}
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -right-4 md:-right-8 bg-accent text-dark py-3 px-6 rounded-full font-bold text-sm shadow-xl flex items-center gap-3 z-20"
          >
            <Palette size={18} /> UI/UX Designer
          </motion.div>

          {/* Floating Element 3 - Center Left Sparkle */}
          <motion.div 
            animate={{ rotate: -360, scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 7, ease: "linear", delay: 0.5 }}
            className="absolute top-1/2 -left-8 md:-left-12 -translate-y-1/2 text-surface-white/80 z-20 drop-shadow-lg"
          >
            <Sparkles size={36} strokeWidth={1.5} />
          </motion.div>

          {/* Floating Element 4 - Top Right Sparkle */}
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="absolute top-12 -right-6 md:-right-12 text-accent z-20 drop-shadow-lg"
          >
            <Sparkles size={48} strokeWidth={1.5} />
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}

export function About() {
  const { language, t } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;

  return (
    <section id="about" className="py-20 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
        
        <div className="lg:col-span-5 relative">
          <div className="aspect-square rounded-full overflow-hidden border-8 border-surface-white shadow-2xl relative z-10 w-3/4 mx-auto lg:w-full">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop" 
              alt="About Aril Engno" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent rounded-full -z-0 translate-x-4 -translate-y-4"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary rounded-full -z-0 -translate-x-8 translate-y-8"></div>
        </div>
        
        <div className="lg:col-span-7">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            {t("TENTANG SAYA", "ABOUT ME")}
          </div>
          <h2 className="font-black text-dark text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[1] mb-8">
            {t("Lebih dari sekadar ", "More than just a ")}<span className="text-primary">{t("Kreator.", "Creator.")}</span>
          </h2>
          <div className="space-y-6 text-lg text-dark/80 font-medium">
            <p>
              {config.personal.description}
            </p>
            <p>
              {t(
                "Saya selalu antusias mengeksplorasi teknologi terbaru, mulai dari pengembangan web modern hingga desain grafis dan UI/UX. Saya percaya bahwa produk digital yang baik harus menyeimbangkan antara estetika, performa, dan kegunaan.",
                "I am always enthusiastic about exploring the latest technologies, from modern web development to graphic design and UI/UX. I believe that a good digital product must balance aesthetics, performance, and usability."
              )}
            </p>
          </div>
        </div>
        
      </div>
    </section>
  );
}

export function SelectedWorks() {
  const { language, t } = useLanguage();
  const config = language === 'id' ? APP_CONFIG : APP_CONFIG_EN;

  return (
    <section id="projects" className="py-20 md:py-32 px-6 bg-surface-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 max-w-2xl">
          <h2 className="font-black text-dark text-4xl md:text-5xl lg:text-7xl tracking-tighter leading-none mb-6">
            PROJECTS
          </h2>
          <p className="text-xl text-muted font-medium">
            {t(
              "Koleksi karya terbaik yang mencakup pengembangan web, desain UI/UX, dan eksplorasi digital lainnya.",
              "A collection of my best works covering web development, UI/UX design, and other digital explorations."
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {config.projects.map((project, i) => {
            const isBlue = i % 3 === 1; // Middle card style
            
            return (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group rounded-[2.5rem] p-6 lg:p-8 flex flex-col h-full border-[3px] transition-transform hover:-translate-y-2 ${
                  isBlue 
                    ? 'bg-primary border-primary text-surface-white' 
                    : 'bg-surface-white border-primary text-dark'
                }`}
              >
                {/* Header: Title + Arrow */}
                <div className="flex justify-between items-start mb-6 gap-4">
                  <h3 className="text-3xl font-black tracking-tight leading-[1.1] pr-4 whitespace-pre-wrap">
                    {project.title.replace(' ', '\n')}
                  </h3>
                  <a 
                    href={project.demoLink !== "#" ? project.demoLink : (project.githubLink || "#")}
                    className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${
                      isBlue 
                        ? 'bg-accent text-primary' 
                        : 'bg-primary text-surface-white'
                    }`}
                  >
                    <ArrowUpRight size={28} strokeWidth={3} />
                  </a>
                </div>
                
                {/* Divider */}
                <div className={`w-full h-[2px] mb-6 ${isBlue ? 'bg-surface-white/30' : 'bg-primary/20'}`}></div>
                
                {/* Description */}
                <p className={`text-base font-medium mb-8 ${isBlue ? 'text-surface-white/90' : 'text-dark/80'}`}>
                  {project.description}
                </p>
                
                {/* Image */}
                <div className={`mt-auto relative rounded-3xl overflow-hidden aspect-[4/3] ${isBlue ? 'bg-accent' : 'bg-primary'}`}>
                  <ImageWithFallback 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Tech stack floating pills */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                     {project.techStack.slice(0, 3).map(tech => (
                       <span key={tech} className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-primary text-xs font-bold rounded-full shadow-sm">
                         {tech}
                       </span>
                     ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
