import { APP_CONFIG } from './appConfig';
import { APP_CONFIG_EN } from './appConfigEn';

// Salinan data pendidikan bawaan, diambil sebelum ditimpa data dari server
const DEFAULT_EDUCATION: Record<'id' | 'en', any[]> = {
  id: structuredClone(APP_CONFIG.education),
  en: structuredClone(APP_CONFIG_EN.education),
};

// Jika data simpanan belum punya kolom logo, ambil dari config (dicocokkan lewat nama sekolah)
function fillLogos(saved: any, defaults: any[]) {
  if (!Array.isArray(saved)) return saved;
  return saved.map((item) => {
    if (item.logo !== undefined) return item; // sudah diisi (atau sengaja dikosongkan) lewat admin
    const def = defaults.find((d) => d.school === item.school);
    return def?.logo ? { ...item, logo: def.logo } : item;
  });
}

// Ambil data hasil edit admin lalu timpa data bawaan di config
export async function loadContent() {
  try {
    const res = await fetch('/api/content');
    if (!res.ok) return;
    const saved = await res.json();

    if (saved.id?.education) saved.id.education = fillLogos(saved.id.education, DEFAULT_EDUCATION.id);
    if (saved.en?.education) saved.en.education = fillLogos(saved.en.education, DEFAULT_EDUCATION.en);

    Object.assign(APP_CONFIG, saved.id ?? {});
    Object.assign(APP_CONFIG_EN, saved.en ?? {});
  } catch {
    // Kalau gagal, pakai data bawaan
  }
}