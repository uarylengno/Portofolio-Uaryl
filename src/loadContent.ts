import { APP_CONFIG } from './appConfig';
import { APP_CONFIG_EN } from './appConfigEn';

// Ambil data hasil edit admin lalu timpa data bawaan di config
export async function loadContent() {
  try {
    const res = await fetch('/api/content');
    if (!res.ok) return;
    const saved = await res.json();
    Object.assign(APP_CONFIG, saved.id ?? {});
    Object.assign(APP_CONFIG_EN, saved.en ?? {});
  } catch {
    // Kalau gagal, pakai data bawaan
  }
}