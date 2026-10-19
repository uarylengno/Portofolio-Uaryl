// ============================================================
// IMPORT
// ============================================================
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

// ============================================================
// TIPE DATA
// ============================================================

// Bahasa yang tersedia: Indonesia ('id') dan Inggris ('en')
type Language = 'id' | 'en';

// Isi context: apa saja yang bisa dipakai komponen lain
interface LanguageContextType {
  language: Language;                          // bahasa yang sedang aktif
  setLanguage: (lang: Language) => void;       // fungsi untuk mengganti bahasa
  t: (idText: string, enText: string) => string; // pilih teks sesuai bahasa aktif
}

// ============================================================
// CONTEXT
// Nilai awal undefined, supaya kita bisa mendeteksi jika
// komponen dipakai di luar LanguageProvider
// ============================================================
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ============================================================
// PROVIDER
// Bungkus aplikasi dengan komponen ini (biasanya di main.tsx atau App.tsx):
//   <LanguageProvider><App /></LanguageProvider>
// ============================================================
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Bahasa awal: Indonesia
  const [language, setLanguage] = useState<Language>('id');

  // Contoh pakai: t("Halo", "Hello") -> "Halo" jika bahasa 'id', "Hello" jika 'en'
  const t = (idText: string, enText: string) => (language === 'id' ? idText : enText);

  // Nilai context hanya dibuat ulang saat bahasa berubah
  const value = useMemo(() => ({ language, setLanguage, t }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// ============================================================
// HOOK: useLanguage
// Dipakai di komponen mana pun:
//   const { language, setLanguage, t } = useLanguage();
// ============================================================
export const useLanguage = () => {
  const context = useContext(LanguageContext);

  // Error jelas jika lupa membungkus dengan LanguageProvider
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');

  return context;
};