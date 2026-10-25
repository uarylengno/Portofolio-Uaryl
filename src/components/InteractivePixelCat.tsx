import { useEffect, useRef } from 'react';
import { mountPixelCat } from '../lib/pixel-cat.esm.js';

type Props = {
  /** Tinggi area tempat kucing berjalan (px). */
  height?: number;
  /** Teks bubble saat mengeong. */
  messages?: string[];
  className?: string;
};

/**
 * Kucing pixel yang hidup di dalam strip ini. Taruh tepat di bawah grid Skills.
 * Kucing hanya berjalan di dalam strip, jadi tidak pernah menutupi kartu/teks/tautan.
 */
export default function InteractivePixelCat({ height = 150, messages, className = '' }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const cat = mountPixelCat({
      container: box,
      bottom: 14,
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
      className={className}
      style={{ position: 'relative', width: '100%', height, overflow: 'hidden' }}
      aria-label="Area kucing pixel"
    >
      {/* garis lantai tipis */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: 0, right: 0, bottom: 10, height: 2, background: 'rgba(255,255,255,0.08)' }}
      />
    </div>
  );
}
