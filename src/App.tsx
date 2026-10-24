// ===== Layout =====
import { Navbar, Footer } from './components/layout';
import { PortfolioChatbot } from './components/PortfolioChatbot';

// ===== Sections: Home =====
import { Hero, About, SelectedWorks, Designs, Skills } from './components/home-sections';

// ===== Sections: Experience =====
import { Experience, Education } from './components/experience-sections';

// ===== Sections: Portfolio =====
import { Services, Certificates, ContactSection } from './components/portfolio-sections';

// ===== Context =====
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    // Provider bahasa membungkus seluruh aplikasi (ID/EN)
    <LanguageProvider>
      <main className="font-sans antialiased text-dark bg-background selection:bg-accent selection:text-dark">
        {/* Navigasi atas */}
        <Navbar />

        {/* 1. Hero / Beranda */}
        <Hero />

        {/* 2. About Me / Tentang Saya */}
        <About />

        {/* 3. Skills / Keahlian */}
        <Skills />

        {/* 4. Projects / Portfolio */}
        <SelectedWorks />

        {/* 5. Designs / Karya Desain */}
        <Designs />

        {/* 6. Experience / Pengalaman */}
        <Experience />

        {/* 7. Education / Pendidikan */}
        <Education />

        {/* 8. Certificates / Sertifikat */}
        <Certificates />

        {/* 9. Services / Layanan */}
        <Services />

        {/* 10. Contact / Kontak */}
        <ContactSection />

        {/* 11. Footer */}
        <Footer />

        <PortfolioChatbot />
      </main>
    </LanguageProvider>
  );
}

export default App;