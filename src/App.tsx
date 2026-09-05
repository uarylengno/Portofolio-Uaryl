import { Navbar, Footer } from './components/layout';
import { Hero, About, SelectedWorks } from './components/home-sections';
import { Skills, Experience, Education } from './components/experience-sections';
import { Services, Certificates, ContactSection } from './components/portfolio-sections';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <main className="font-sans antialiased text-dark bg-background selection:bg-accent selection:text-dark">
        <Navbar />
        
        {/* 1. Hero / Beranda */}
        <Hero />
        
        {/* 2. About Me */}
        <About />
        
        {/* 3. Skills / Keahlian */}
        <Skills />
        
        {/* 4. Projects / Portfolio */}
        <SelectedWorks />
        
        {/* 5. Experience / Pengalaman */}
        <Experience />
        
        {/* 6. Education / Pendidikan */}
        <Education />
        
        {/* 7. Achievements / Sertifikat */}
        <Certificates />
        
        {/* 8. Services */}
        <Services />
        
        {/* 9. Contact */}
        <ContactSection />
        
        {/* 10. Footer */}
        <Footer />
      </main>
    </LanguageProvider>
  );
}

export default App;
