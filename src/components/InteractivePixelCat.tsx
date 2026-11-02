import { useEffect, useRef } from 'react';
import { mountPixelCat } from '../lib/pixel-cat.esm.js';

type Props = {
  /** Tinggi area tempat kucing berjalan (px). */
  height?: number | string;
  /** Teks bubble saat mengeong. */
  messages?: string[];
  className?: string;
};

/**
 * Kucing pixel bebas berkeliaran di lanskap padang rumput (meadow) full-bleed.
 * Bebas tanpa kotak tertutup seperti background Beranda,
 * dengan transisi atas-bawah yang menyatu mulus ke section Skills dan Projects.
 */
export default function InteractivePixelCat({
  height,
  messages,
  className = '',
}: Props) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const cat = mountPixelCat({
      container: box,
      // Posisi kaki kucing tepat di jalur tanah & rumput (17% dari dasar kontainer)
      // Menjamin telapak kaki memijak tanah dengan kokoh dan tidak mengambang
      bottom: (boxH: number) => Math.round(boxH * 0.17),
      side: 'right',
      scale: 'auto',
      hideButton: false,
      timeScale: 1.2,
      sleepAfter: 90,
      sound: true,
      messages: messages && messages.length ? messages : undefined,
      zIndex: 5,
    });

    return () => cat.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={boxRef}
      className={`relative w-full overflow-hidden select-none ${className}`}
      style={{
        height: height ?? 'clamp(260px, 30vw, 400px)',
      }}
      aria-label="Area kucing pixel di padang rumput bebas"
    >
      {/* 1. Gambar latar belakang padang rumput full-bleed dari ujung ke ujung layar */}
      <img
        src="/assets/images/cat-meadow-path.svg"
        alt="Jalan Kucing di Padang Rumput"
        className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none z-0"
        loading="eager"
        decoding="async"
      />

      {/* 2. Transisi atas: Menyatu lembut dari latar gelap Skills (#111111) ke langit padang rumput */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-[1]"
        style={{
          height: 'clamp(80px, 11vw, 140px)',
          background:
            'linear-gradient(to bottom, #111111 0%, rgba(17, 17, 17, 0.8) 35%, rgba(17, 17, 17, 0.25) 70%, transparent 100%)',
        }}
      />

      {/* 3. Transisi bawah: Menyatu mulus dari padang rumput ke latar putih Projects (#FFFFFF) */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-[1]"
        style={{
          height: 'clamp(90px, 12vw, 160px)',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.18) 30%, rgba(255, 255, 255, 0.65) 65%, rgba(255, 255, 255, 0.95) 88%, #FFFFFF 100%)',
        }}
      />
    </div>
  );
}
