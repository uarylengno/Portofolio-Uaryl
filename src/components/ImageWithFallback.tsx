import { useState } from 'react';

export function ImageWithFallback({ src, alt, className, fallbackSrc }: { src: string, alt: string, className?: string, fallbackSrc?: string }) {
  const [error, setError] = useState(false);
  
  const defaultFallback = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop";

  return (
    <img
      src={error ? (fallbackSrc || defaultFallback) : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
      decoding="async"
    />
  );
}
