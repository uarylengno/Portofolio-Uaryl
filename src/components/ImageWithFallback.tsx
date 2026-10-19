// ============================================================
// IMPORT
// ============================================================
import { useState } from 'react';

// ============================================================
// KONSTANTA & TIPE
// ============================================================

// Gambar cadangan default. Dipakai jika gambar utama gagal dimuat
// dan tidak ada fallbackSrc khusus yang diberikan
const DEFAULT_FALLBACK =
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop';

type Props = {
  src: string;           // alamat gambar utama
  alt: string;           // teks alternatif (untuk aksesibilitas)
  className?: string;    // class Tailwind (opsional)
  fallbackSrc?: string;  // gambar cadangan khusus (opsional)
};

// ============================================================
// KOMPONEN: GAMBAR DENGAN CADANGAN
// Contoh pakai:
//   <ImageWithFallback src="/foto.jpg" alt="Foto" className="w-full" />
// ============================================================
export function ImageWithFallback({ src, alt, className, fallbackSrc }: Props) {
  // true jika gambar utama gagal dimuat
  const [error, setError] = useState(false);

  // Jika error, pakai gambar cadangan; jika tidak, pakai gambar utama
  const imageSrc = error ? fallbackSrc || DEFAULT_FALLBACK : src;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => setError(true)} // dipanggil saat gambar gagal dimuat
      loading="lazy"                 // gambar dimuat saat mendekati layar (hemat kuota)
      decoding="async"               // proses gambar tanpa menghambat tampilan
    />
  );
}