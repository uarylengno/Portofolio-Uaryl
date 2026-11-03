import React from "react";

/**
 * BeachBackground
 * Latar belakang pantai animasi (SVG + CSS, tanpa library tambahan),
 * mengikuti tata letak ilustrasi pantai milik pemilik website.
 *
 *   <section className="relative overflow-hidden">
 *     <BeachBackground />
 *     <div className="relative z-10">...konten hero...</div>
 *   </section>
 *
 * Tambahan: ikan melompat (tuna, ikan tropis, ikan terbang, marlin, kawanan sarden)
 * - Lompatan berbentuk parabola asli (naik ease-out, turun ease-in)
 * - Badan ikan 3 segmen (kepala, tengah, ekor) yang meliuk berantai, tidak kaku
 * - Rotasi mengikuti arah lintasan (hidung naik -> datar -> hidung turun)
 * - Percikan air, cincin riak, dan tetesan saat keluar & masuk air
 */

const W = 2353;
const H = 1568;
const HORIZON = 940;

const cv = (o: Record<string, string | number>) =>
  o as unknown as React.CSSProperties;

// Path gelombang yang bisa di-loop mulus (digeser sebesar 1 panjang gelombang)
function wavePath(y: number, amp: number, wl: number, bottom = H): string {
  const n = Math.ceil((W + wl) / (wl / 2)) + 2;
  let d = `M0 ${y} q ${wl / 4} ${-amp} ${wl / 2} 0`;
  for (let i = 0; i < n; i++) d += ` t ${wl / 2} 0`;
  d += ` V ${bottom} H 0 Z`;
  return d;
}

const FROND_ANGLES = [-170, -140, -110, -80, -50, -20, 10, 40];

const Palm: React.FC<{
  x: number;
  y: number;
  height: number;
  lean: number;
  scale?: number;
  delay?: number;
  trunk?: string;
}> = ({ x, y, height, lean, scale = 1, delay = 0, trunk = "#8a5a35" }) => {
  const tx = lean;
  const ty = -height;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className="bb-sway" style={{ animationDelay: `${delay}s` }}>
        <path
          d={`M-7 0 Q ${tx * 0.15} ${ty * 0.55} ${tx - 3} ${ty} L ${tx + 3} ${ty} Q ${tx * 0.15 + 9} ${ty * 0.55} 7 0 Z`}
          fill={trunk}
        />
        <path
          d={`M-1 0 Q ${tx * 0.15 + 1} ${ty * 0.55} ${tx - 1} ${ty}`}
          stroke="#5f3b20"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
        <g transform={`translate(${tx} ${ty})`}>
          {FROND_ANGLES.map((a, i) => {
            const t =
              a < -90 ? `scale(-1 1) rotate(${-180 - a})` : `rotate(${a})`;
            return (
              <g key={a} transform={t}>
                <g
                  className="bb-frond"
                  style={{ animationDelay: `${delay + i * 0.3}s` }}
                >
                  <path
                    d="M0 0 Q 40 -36 96 -6 Q 114 6 118 36 Q 70 -2 0 0 Z"
                    fill={i % 2 ? "#3f9a2c" : "#5db83a"}
                  />
                  <path
                    d="M0 0 Q 50 -22 104 4"
                    stroke="#2d7a1f"
                    strokeWidth="1.6"
                    fill="none"
                    opacity="0.8"
                  />
                </g>
              </g>
            );
          })}
        </g>
      </g>
    </g>
  );
};

const Grass: React.FC<{ x: number; y: number; s?: number }> = ({
  x,
  y,
  s = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-28, -8, 14, 34].map((a, i) => (
      <g key={a} transform={`rotate(${a})`}>
        <g className="bb-frond" style={{ animationDelay: `${i * 0.4}s` }}>
          <path
            d="M0 0 Q -6 -26 2 -52 Q 10 -26 0 0 Z"
            fill={i % 2 ? "#4aa634" : "#74c346"}
          />
        </g>
      </g>
    ))}
  </g>
);

const Bird: React.FC<{
  top: number;
  size: number;
  duration: number;
  delay: number;
  bob: number;
  flap: number;
}> = ({ top, size, duration, delay, bob, flap }) => (
  <g
    className="bb-fly"
    style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
  >
    <g transform={`translate(0 ${top})`}>
      <g
        className="bb-bob"
        style={{ animationDuration: `${bob}s`, animationDelay: `${delay}s` }}
      >
        <g
          className="bb-flap"
          style={{
            animationDuration: `${flap}s`,
            animationDelay: `${delay * 0.3}s`,
          }}
        >
          <path
            d={`M${-size} ${size * 0.15} Q ${-size * 0.55} ${-size * 0.75} 0 ${size * 0.05} Q ${size * 0.55} ${-size * 0.75} ${size} ${size * 0.15} Q ${size * 0.5} ${-size * 0.3} 0 ${size * 0.28} Q ${-size * 0.5} ${-size * 0.3} ${-size} ${size * 0.15} Z`}
            fill="#ffffff"
          />
        </g>
      </g>
    </g>
  </g>
);

/* ============================================================
   IKAN MELOMPAT
   Semua ikan digambar menghadap ke kanan (hidung di +x),
   dibagi 3 segmen supaya badannya meliuk berantai saat melompat.
   ============================================================ */

type FishKind = "tuna" | "tropical" | "flying" | "marlin" | "sardine";

interface FishShape {
  p1: number; // titik engsel segmen tengah
  p2: number; // titik engsel ekor
  front: React.ReactNode;
  mid: React.ReactNode;
  tail: React.ReactNode;
}

const FISH_SHAPES: Record<FishKind, FishShape> = {
  /* ---------- Tuna / tongkol: ramping, biru-perak ---------- */
  tuna: {
    p1: -20,
    p2: -48,
    front: (
      <>
        <path d="M-4 -15 L3 -28 L10 -16 Z" fill="#f5c542" />
        <path
          d="M-22 -12 C0 -21 38 -17 63 -2 C63 0 62 1 61 2 C38 12 6 16 -22 10 Z"
          fill="url(#bb-fish-tuna)"
        />
        <path d="M30 7 L16 19 L39 11 Z" fill="#2a5a96" />
        <path
          d="M-8 -14 C12 -18 34 -14 52 -5"
          stroke="#ffffff"
          strokeOpacity="0.3"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M-20 -2 C10 -4 34 -2 58 -1"
          stroke="#1b3f78"
          strokeOpacity="0.22"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M36 -10 Q32 -2 36 8"
          stroke="#0f2a55"
          strokeOpacity="0.4"
          strokeWidth="1.4"
          fill="none"
        />
        <circle cx="50" cy="-3" r="2.9" fill="#ffffff" />
        <circle cx="50.7" cy="-3" r="1.55" fill="#0b1b36" />
      </>
    ),
    mid: (
      <>
        <path
          d="M-30 -9 L-34 -16 L-39 -7 Z M-30 8 L-34 15 L-39 6 Z"
          fill="#f5c542"
        />
        <path
          d="M-20 -12 C-32 -9 -44 -5 -50 -3 L-50 3 C-44 5 -32 8 -20 10 Z"
          fill="url(#bb-fish-tuna)"
        />
      </>
    ),
    tail: (
      <path
        d="M-48 -3 L-58 -4 L-74 -21 C-68 -9 -67 -3 -65 0 C-67 3 -68 9 -74 21 L-58 4 L-48 3 Z"
        fill="#244f8c"
      />
    ),
  },

  /* ---------- Ikan tropis: oranye, belang putih, ekor kipas ---------- */
  tropical: {
    p1: -12,
    p2: -34,
    front: (
      <>
        <path
          d="M-8 -22 Q8 -48 40 -20 Q20 -30 -8 -22 Z"
          fill="#ff5a1f"
        />
        <path d="M18 18 L10 34 L30 20 Z" fill="#ff5a1f" />
        <path
          d="M-12 -21 C10 -33 40 -22 50 -2 C40 18 12 26 -12 20 Z"
          fill="url(#bb-fish-tropical)"
        />
        <path
          d="M12 -27 Q18 -2 10 23 L18 22 Q25 -2 19 -27 Z"
          fill="#ffffff"
          fillOpacity="0.93"
          stroke="#3a2a20"
          strokeOpacity="0.45"
          strokeWidth="0.8"
        />
        <path
          d="M32 -20 Q36 -2 31 14 L37 12 Q41 -2 38 -18 Z"
          fill="#ffffff"
          fillOpacity="0.93"
          stroke="#3a2a20"
          strokeOpacity="0.45"
          strokeWidth="0.8"
        />
        <path
          d="M-4 -19 C14 -28 34 -20 44 -8"
          stroke="#ffffff"
          strokeOpacity="0.35"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="40" cy="-6" r="4.3" fill="#ffffff" stroke="#3a2a20" strokeOpacity="0.6" strokeWidth="0.8" />
        <circle cx="41.2" cy="-6" r="2.4" fill="#16110c" />
      </>
    ),
    mid: (
      <path
        d="M-12 -21 C-24 -14 -32 -8 -36 -4 L-36 4 C-32 8 -24 14 -12 19 Z"
        fill="url(#bb-fish-tropical)"
      />
    ),
    tail: (
      <>
        <path
          d="M-34 -4 C-46 -14 -54 -28 -66 -30 C-61 -12 -61 12 -66 30 C-54 28 -46 14 -34 4 Z"
          fill="#ff6a1f"
        />
        <path
          d="M-40 0 L-62 -14 M-40 0 L-64 0 M-40 0 L-62 14"
          stroke="#ffd27a"
          strokeOpacity="0.75"
          strokeWidth="1.2"
          fill="none"
        />
      </>
    ),
  },

  /* ---------- Ikan terbang: sirip dada lebar seperti sayap ---------- */
  flying: {
    p1: -18,
    p2: -44,
    front: (
      <>
        {/* sayap jauh */}
        <g className="bb-wing" style={{ transformOrigin: "14px 2px" }}>
          <path
            d="M14 4 C4 22 -16 34 -40 33 C-28 22 -14 10 -6 2 Z"
            fill="#cfeaff"
            fillOpacity="0.55"
            stroke="#7fb7e8"
            strokeOpacity="0.6"
            strokeWidth="1"
          />
        </g>
        <path
          d="M-18 -9 C8 -15 38 -11 58 -1 C38 9 8 12 -18 8 Z"
          fill="url(#bb-fish-flying)"
        />
        <path
          d="M-8 -9 C14 -13 36 -9 52 -3"
          stroke="#ffffff"
          strokeOpacity="0.35"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        {/* sayap dekat */}
        <g className="bb-wing" style={{ transformOrigin: "16px -4px" }}>
          <path
            d="M16 -4 C8 -28 -16 -46 -44 -44 C-30 -30 -14 -14 -4 0 Z"
            fill="#d9f1ff"
            fillOpacity="0.74"
            stroke="#7fb7e8"
            strokeOpacity="0.85"
            strokeWidth="1"
          />
          <path
            d="M14 -4 L-38 -42 M12 -3 L-30 -30 M10 -2 L-20 -17"
            stroke="#7fb7e8"
            strokeOpacity="0.6"
            strokeWidth="0.9"
            fill="none"
          />
        </g>
        <circle cx="46" cy="-3" r="2.5" fill="#ffffff" />
        <circle cx="46.6" cy="-3" r="1.3" fill="#0b1b36" />
      </>
    ),
    mid: (
      <path
        d="M-18 -9 C-30 -7 -40 -4 -46 -2 L-46 2 C-40 4 -30 6 -18 8 Z"
        fill="url(#bb-fish-flying)"
      />
    ),
    tail: (
      <path
        d="M-44 -2 L-54 -6 L-62 -14 C-58 -6 -58 -2 -56 0 C-58 6 -60 14 -70 28 L-54 4 L-44 2 Z"
        fill="#2f64bd"
      />
    ),
  },

  /* ---------- Marlin: besar, layar punggung, moncong panjang ---------- */
  marlin: {
    p1: -26,
    p2: -56,
    front: (
      <>
        <path
          d="M-16 -17 C-2 -44 24 -44 44 -18 C28 -23 6 -22 -16 -17 Z"
          fill="#173f86"
        />
        <path
          d="M0 -22 L2 -38 M12 -21 L16 -38 M24 -20 L30 -34"
          stroke="#6ea0e0"
          strokeOpacity="0.5"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M-26 -15 C0 -25 34 -19 62 -4 L120 0 L62 3 C36 15 4 21 -26 13 Z"
          fill="url(#bb-fish-marlin)"
        />
        <path
          d="M-6 -20 L-2 14 M8 -22 L12 16 M22 -20 L26 12"
          stroke="#8fc0ff"
          strokeOpacity="0.22"
          strokeWidth="2.5"
          fill="none"
        />
        <path d="M32 8 L14 27 L41 14 Z" fill="#17408a" />
        <path
          d="M-10 -17 C14 -22 40 -17 58 -6"
          stroke="#ffffff"
          strokeOpacity="0.28"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="50" cy="-4" r="3.3" fill="#ffffff" />
        <circle cx="50.8" cy="-4" r="1.8" fill="#0b1b36" />
      </>
    ),
    mid: (
      <>
        <path
          d="M-40 -9 L-44 -16 L-50 -7 Z M-40 8 L-44 15 L-50 6 Z"
          fill="#173f86"
        />
        <path
          d="M-26 -15 C-38 -11 -50 -6 -58 -3 L-58 3 C-50 6 -38 10 -26 13 Z"
          fill="url(#bb-fish-marlin)"
        />
      </>
    ),
    tail: (
      <path
        d="M-56 -3 L-64 -6 L-82 -32 C-74 -13 -72 -4 -70 0 C-72 4 -74 13 -82 32 L-64 6 L-56 3 Z"
        fill="#173f86"
      />
    ),
  },

  /* ---------- Sarden: kecil, perak, berkawanan ---------- */
  sardine: {
    p1: -10,
    p2: -22,
    front: (
      <>
        <path d="M4 -7 L9 -12 L12 -7 Z" fill="#4a7aa5" />
        <path
          d="M-10 -6 C6 -9 22 -7 32 -1 C22 6 6 8 -10 5 Z"
          fill="url(#bb-fish-sardine)"
        />
        <path
          d="M-6 -4 C8 -6 20 -5 28 -2"
          stroke="#ffffff"
          strokeOpacity="0.55"
          strokeWidth="1.1"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="26" cy="-1.8" r="1.5" fill="#0b1b36" />
      </>
    ),
    mid: (
      <path
        d="M-10 -6 L-24 -3 L-24 3 L-10 5 Z"
        fill="url(#bb-fish-sardine)"
      />
    ),
    tail: <path d="M-22 -3 L-34 -11 L-31 0 L-34 11 L-22 3 Z" fill="#4a7aa5" />,
  },
};

// Tetesan air: [lontar-x, lontar-y, radius]
const DROPS: [number, number, number][] = [
  [-36, -48, 3.2],
  [-18, -64, 2.6],
  [12, -60, 3],
  [32, -42, 2.4],
  [-50, -24, 2],
  [46, -26, 2.2],
];

// Percikan saat ikan keluar ("out") atau masuk ("in") air
const Burst: React.FC<{
  x: number;
  kind: "out" | "in";
  s: number;
  cycle: number;
  delay: number;
}> = ({ x, kind, s, cycle, delay }) => {
  const t = { animationDuration: `${cycle}s` };
  return (
    <g transform={`translate(${x} 0)`}>
      <ellipse
        className={`bb-ring bb-ring-${kind}`}
        rx={30 * s}
        ry={7 * s}
        fill="none"
        stroke="#ffffff"
        strokeWidth={3}
        style={{ ...t, animationDelay: `${delay}s` }}
      />
      <ellipse
        className={`bb-ring bb-ring-${kind}`}
        rx={20 * s}
        ry={4.5 * s}
        fill="none"
        stroke="#ffffff"
        strokeWidth={2}
        style={{ ...t, animationDelay: `${delay + 0.1}s` }}
      />
      <g transform={`scale(${s})`}>
        <path
          className={`bb-crown bb-crown-${kind}`}
          d="M-16 0 Q-14 -12 -8 -3 Q-6 -24 0 -4 Q6 -24 8 -3 Q14 -12 16 0 Z"
          fill="#ffffff"
          style={{ ...t, animationDelay: `${delay}s` }}
        />
      </g>
      {DROPS.map(([sx, sy, r], i) => (
        <circle
          key={i}
          className={`bb-drop bb-drop-${kind}`}
          cx={0}
          cy={0}
          r={r * s}
          fill="#ffffff"
          style={cv({
            ...t,
            animationDelay: `${delay + i * 0.015}s`,
            "--sx": `${sx * s}px`,
            "--sy": `${sy * s}px`,
          })}
        />
      ))}
    </g>
  );
};

const Fish: React.FC<{
  kind: FishKind;
  x: number; // titik keluar dari air
  y: number; // garis permukaan air
  s: number; // ukuran
  dx: number; // jarak lompat (negatif = ke kiri)
  h: number; // tinggi lompatan
  cycle: number; // total siklus (detik); lompatan = 14% dari siklus
  delay: number; // offset (detik, boleh negatif)
  a0?: number; // sudut keluar (derajat)
  a1?: number; // sudut masuk (derajat)
  wag?: number; // kecepatan kibasan ekor (detik)
}> = ({
  kind,
  x,
  y,
  s,
  dx,
  h,
  cycle,
  delay,
  a0 = 52,
  a1 = 58,
  wag = 0.26,
}) => {
  const sh = FISH_SHAPES[kind];
  const dir = dx >= 0 ? 1 : -1;
  const t = { animationDuration: `${cycle}s`, animationDelay: `${delay}s` };

  return (
    <g transform={`translate(${x} ${y})`}>
      <Burst x={0} kind="out" s={s} cycle={cycle} delay={delay} />
      <Burst x={dx} kind="in" s={s} cycle={cycle} delay={delay} />

      <g clipPath="url(#bb-fishclip)">
        <g className="bb-fx" style={cv({ ...t, "--dx": `${dx}px` })}>
          <g
            className="bb-fy"
            style={cv({ ...t, "--h": `${h}px`, "--sink": `${40 * s}px` })}
          >
            <g
              className="bb-fr"
              style={cv({
                ...t,
                "--a0": `${-a0 * dir}deg`,
                "--a1": `${a1 * dir}deg`,
              })}
            >
              <g transform={`scale(${dir * s} ${s})`}>
                <g
                  className="bb-wa"
                  style={{
                    animationDuration: `${wag}s`,
                    transformOrigin: "0px 0px",
                  }}
                >
                  {sh.front}
                  <g
                    className="bb-wb"
                    style={{
                      animationDuration: `${wag}s`,
                      animationDelay: `${-wag * 0.18}s`,
                      transformOrigin: `${sh.p1}px 0px`,
                    }}
                  >
                    {sh.mid}
                    <g
                      className="bb-wc"
                      style={{
                        animationDuration: `${wag}s`,
                        animationDelay: `${-wag * 0.36}s`,
                        transformOrigin: `${sh.p2}px 0px`,
                      }}
                    >
                      {sh.tail}
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  );
};

const wl = (v: number) => ({ ["--wl" as string]: `${v}px` } as React.CSSProperties);

const BeachBackground: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <style>{`
        .bb-sway { animation: bb-sway 6.5s ease-in-out infinite alternate; transform-origin: 0 0; }
        @keyframes bb-sway {
          0% { transform: rotate(-1.6deg); }
          100% { transform: rotate(2deg); }
        }
        .bb-frond { animation: bb-frond 3.6s ease-in-out infinite alternate; transform-origin: 0 0; }
        @keyframes bb-frond {
          0% { transform: rotate(-4deg); }
          100% { transform: rotate(5deg); }
        }
        .bb-leaf { animation: bb-leaf 5s ease-in-out infinite alternate; }
        @keyframes bb-leaf {
          0% { transform: rotate(-1.5deg); }
          100% { transform: rotate(2deg); }
        }
        .bb-w1 { animation: bb-wave 22s linear infinite; }
        .bb-w2 { animation: bb-wave 16s linear infinite reverse; }
        .bb-w3 { animation: bb-wave 12s linear infinite; }
        .bb-w4 { animation: bb-wave 9s linear infinite reverse; }
        .bb-w5 { animation: bb-wave 7s linear infinite; }
        @keyframes bb-wave { to { transform: translateX(var(--wl)); } }
        .bb-bobwater { animation: bb-bobwater 5.5s ease-in-out infinite alternate; }
        @keyframes bb-bobwater {
          0% { transform: translateY(-5px); }
          100% { transform: translateY(7px); }
        }
        .bb-foam { animation: bb-foam 8s ease-in-out infinite; }
        @keyframes bb-foam {
          0%, 100% { transform: translateY(16px); opacity: .5; }
          50% { transform: translateY(-18px); opacity: .9; }
        }
        .bb-sparkle { animation: bb-sparkle 3.4s ease-in-out infinite; }
        @keyframes bb-sparkle {
          0%, 100% { opacity: 0; }
          50% { opacity: .8; }
        }
        .bb-sun-wrap { transform-box: fill-box; transform-origin: 683px 461px; }
        .bb-sun-core {
          animation: bb-sun-core 9s ease-in-out infinite alternate;
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes bb-sun-core {
          0% { transform: scale(0.985); }
          100% { transform: scale(1.015); }
        }
        .bb-sun-corona {
          animation: bb-sun-corona 8s ease-in-out infinite alternate;
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes bb-sun-corona {
          0% { transform: scale(0.96); opacity: 0.8; }
          50% { transform: scale(1.03); opacity: 0.95; }
          100% { transform: scale(1.07); opacity: 0.85; }
        }
        .bb-sun-ambient {
          animation: bb-sun-ambient 12s ease-in-out infinite alternate;
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes bb-sun-ambient {
          0% { transform: scale(0.94); opacity: 0.45; }
          100% { transform: scale(1.08); opacity: 0.8; }
        }
        .bb-haze { animation: bb-haze 26s ease-in-out infinite alternate; }
        @keyframes bb-haze {
          0% { transform: translateX(-50px); }
          100% { transform: translateX(50px); }
        }
        .bb-fly { animation: bb-fly linear infinite; }
        @keyframes bb-fly {
          from { transform: translateX(-160px); }
          to { transform: translateX(2520px); }
        }
        .bb-bob { animation: bb-bob ease-in-out infinite alternate; }
        @keyframes bb-bob {
          0% { transform: translateY(-18px) rotate(-3deg); }
          100% { transform: translateY(20px) rotate(3deg); }
        }
        .bb-flap { animation: bb-flap ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes bb-flap {
          0%, 100% { transform: scaleY(1); }
          35% { transform: scaleY(.2); }
          62% { transform: scaleY(1.12); }
        }

        /* ============================================================
           IKAN MELOMPAT
           Lompatan = 14% pertama dari siklus, sisanya ikan di bawah air.
           X: gerak lurus | Y: parabola (naik ease-out, turun ease-in)
           Rotasi: hidung naik -> datar di puncak -> hidung turun
           ============================================================ */
        .bb-fx { animation: bb-fx linear infinite; }
        @keyframes bb-fx {
          0%   { transform: translateX(0); opacity: 1; }
          14%  { transform: translateX(var(--dx)); opacity: 1; }
          14.01%, 100% { transform: translateX(var(--dx)); opacity: 0; }
        }
        .bb-fy { animation: bb-fy linear infinite; }
        @keyframes bb-fy {
          0% {
            transform: translateY(var(--sink));
            animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          7% {
            transform: translateY(calc(var(--h) * -1));
            animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
          }
          14%, 100% { transform: translateY(var(--sink)); }
        }
        .bb-fr { animation: bb-fr linear infinite; transform-origin: 0px 0px; }
        @keyframes bb-fr {
          0%  { transform: rotate(var(--a0)); }
          7%  { transform: rotate(0deg); }
          14%, 100% { transform: rotate(var(--a1)); }
        }

        /* Badan meliuk berantai (kepala -> badan -> ekor) */
        .bb-wa { animation: bb-wa ease-in-out infinite alternate; }
        .bb-wb { animation: bb-wb ease-in-out infinite alternate; }
        .bb-wc { animation: bb-wc ease-in-out infinite alternate; }
        @keyframes bb-wa { 0% { transform: rotate(-2.5deg); } 100% { transform: rotate(2.5deg); } }
        @keyframes bb-wb { 0% { transform: rotate(-7deg); }   100% { transform: rotate(7deg); } }
        @keyframes bb-wc { 0% { transform: rotate(-17deg); }  100% { transform: rotate(17deg); } }

        /* Sirip "sayap" ikan terbang */
        .bb-wing { animation: bb-wing 0.34s ease-in-out infinite alternate; }
        @keyframes bb-wing {
          0% { transform: rotate(-3deg); }
          100% { transform: rotate(5deg); }
        }

        /* Cincin riak di permukaan air */
        .bb-ring { opacity: 0; transform-box: fill-box; transform-origin: center; animation-timing-function: cubic-bezier(0.2, 0.6, 0.3, 1); animation-iteration-count: infinite; }
        .bb-ring-out { animation-name: bb-ring-out; }
        .bb-ring-in { animation-name: bb-ring-in; }
        @keyframes bb-ring-out {
          0%   { transform: scale(0.2); opacity: 0.95; }
          12%  { transform: scale(1);   opacity: 0.55; }
          22%, 100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes bb-ring-in {
          0%, 13.9% { transform: scale(0.2); opacity: 0; }
          14%  { transform: scale(0.2); opacity: 0.95; }
          26%  { transform: scale(1);   opacity: 0.55; }
          36%, 100% { transform: scale(1.8); opacity: 0; }
        }

        /* Mahkota percikan air */
        .bb-crown { opacity: 0; transform-box: fill-box; transform-origin: 50% 100%; animation-timing-function: ease-out; animation-iteration-count: infinite; }
        .bb-crown-out { animation-name: bb-crown-out; }
        .bb-crown-in { animation-name: bb-crown-in; }
        @keyframes bb-crown-out {
          0%   { transform: scale(0.5, 0.1); opacity: 0; }
          1.5% { transform: scale(0.9, 0.7); opacity: 0.95; }
          4.5% { transform: scale(1.1, 1.15); opacity: 0.9; }
          10%, 100% { transform: scale(1, 0.2); opacity: 0; }
        }
        @keyframes bb-crown-in {
          0%, 14% { transform: scale(0.5, 0.1); opacity: 0; }
          15.5% { transform: scale(0.9, 0.7); opacity: 0.95; }
          18.5% { transform: scale(1.1, 1.15); opacity: 0.9; }
          24%, 100% { transform: scale(1, 0.2); opacity: 0; }
        }

        /* Tetesan air melayang (parabola kecil) */
        .bb-drop { opacity: 0; animation-iteration-count: infinite; }
        .bb-drop-out { animation-name: bb-drop-out; }
        .bb-drop-in { animation-name: bb-drop-in; }
        @keyframes bb-drop-out {
          0% {
            transform: translate(0, 0); opacity: 1;
            animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          5% {
            transform: translate(calc(var(--sx) * 0.55), var(--sy)); opacity: 1;
            animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
          }
          11%, 100% { transform: translate(var(--sx), 0px); opacity: 0; }
        }
        @keyframes bb-drop-in {
          0%, 13.9% { transform: translate(0, 0); opacity: 0; }
          14% {
            transform: translate(0, 0); opacity: 1;
            animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          19% {
            transform: translate(calc(var(--sx) * 0.55), var(--sy)); opacity: 1;
            animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
          }
          25%, 100% { transform: translate(var(--sx), 0px); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bb-sway,.bb-frond,.bb-leaf,.bb-w1,.bb-w2,.bb-w3,.bb-w4,.bb-w5,
          .bb-bobwater,.bb-foam,.bb-sparkle,.bb-sun-core,.bb-sun-corona,.bb-sun-ambient,.bb-haze,.bb-fly,
          .bb-bob,.bb-flap { animation: none !important; }
          .bb-fishwrap { display: none; }
        }
      `}</style>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id="bb-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#269eff" />
            <stop offset="0.45" stopColor="#5fd0ff" />
            <stop offset="0.78" stopColor="#b9f0ff" />
            <stop offset="1" stopColor="#e4faff" />
          </linearGradient>
          <radialGradient id="bb-sunglow-inner" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bb-sunglow-outer" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bb-sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2ccfe6" />
            <stop offset="0.45" stopColor="#4fe8f5" />
            <stop offset="0.8" stopColor="#7cf3f4" />
            <stop offset="1" stopColor="#b9e8cf" />
          </linearGradient>
          <linearGradient id="bb-sand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f6b865" />
            <stop offset="1" stopColor="#fbd9a4" />
          </linearGradient>
          <linearGradient id="bb-shore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f9dca6" stopOpacity="0" />
            <stop offset="0.5" stopColor="#f5d49a" stopOpacity="0.95" />
            <stop offset="1" stopColor="#fbd7a3" />
          </linearGradient>
          <linearGradient id="bb-leafg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a8d842" />
            <stop offset="1" stopColor="#3d9a1f" />
          </linearGradient>
          <clipPath id="bb-seaclip">
            <rect x="0" y={HORIZON} width={W} height={H - HORIZON} />
          </clipPath>

          {/* Gradien ikan (userSpaceOnUse agar warna konsisten antar segmen) */}
          <linearGradient id="bb-fish-tuna" gradientUnits="userSpaceOnUse" x1="0" y1="-20" x2="0" y2="18">
            <stop offset="0" stopColor="#1d3f7a" />
            <stop offset="0.35" stopColor="#3f7fc4" />
            <stop offset="0.58" stopColor="#cfe3f2" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
          <linearGradient id="bb-fish-tropical" gradientUnits="userSpaceOnUse" x1="0" y1="-30" x2="0" y2="26">
            <stop offset="0" stopColor="#ff7a1a" />
            <stop offset="0.5" stopColor="#ffb02e" />
            <stop offset="1" stopColor="#fff0b0" />
          </linearGradient>
          <linearGradient id="bb-fish-flying" gradientUnits="userSpaceOnUse" x1="0" y1="-12" x2="0" y2="10">
            <stop offset="0" stopColor="#2457b8" />
            <stop offset="0.5" stopColor="#7fb7e8" />
            <stop offset="1" stopColor="#f3fbff" />
          </linearGradient>
          <linearGradient id="bb-fish-marlin" gradientUnits="userSpaceOnUse" x1="0" y1="-24" x2="0" y2="20">
            <stop offset="0" stopColor="#0f2f6b" />
            <stop offset="0.55" stopColor="#2a65b5" />
            <stop offset="0.8" stopColor="#9cc3e8" />
            <stop offset="1" stopColor="#eef6fb" />
          </linearGradient>
          <linearGradient id="bb-fish-sardine" gradientUnits="userSpaceOnUse" x1="0" y1="-8" x2="0" y2="7">
            <stop offset="0" stopColor="#3a6f9e" />
            <stop offset="0.45" stopColor="#a9c8de" />
            <stop offset="0.6" stopColor="#eef5fa" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>

          {/* Memotong bagian ikan yang ada di bawah permukaan air */}
          <clipPath id="bb-fishclip">
            <rect x="-700" y="-700" width="2600" height="700" />
          </clipPath>
        </defs>

        {/* Langit */}
        <rect width={W} height={HORIZON + 4} fill="url(#bb-sky)" />

        {/* Kabut / awan tipis bergelombang */}
        <g className="bb-haze">
          <path
            d="M-80 700 Q 200 730 360 700 Q 600 640 700 655 Q 900 790 1040 830 Q 1300 760 1550 580 Q 1760 610 1900 635 Q 2150 600 2450 540 L2450 960 L-80 960 Z"
            fill="#ffffff"
            opacity="0.16"
          />
          <path
            d="M-80 785 Q 420 775 700 765 Q 940 850 1080 872 Q 1400 800 1640 760 Q 1900 800 2100 790 Q 2300 730 2450 715 L2450 960 L-80 960 Z"
            fill="#ffffff"
            opacity="0.22"
          />
        </g>

        {/* Matahari: Sistem Pendaran Alami Multi-Layer */}
        <g id="bb-sun-system" className="bb-sun-wrap">
          {/* Pendaran Atmosfer Luas (Ambient Bloom, r=480) */}
          <circle
            cx="683"
            cy="461"
            r="480"
            fill="url(#bb-sunglow-outer)"
            className="bb-sun-ambient"
          />

          {/* Pendaran Korona Lembut (Corona Halo, r=260) */}
          <circle
            cx="683"
            cy="461"
            r="260"
            fill="url(#bb-sunglow-inner)"
            className="bb-sun-corona"
          />

          {/* Inti Matahari Cerah Bercahaya (Sun Core, r=144) */}
          <circle
            cx="683"
            cy="461"
            r="144"
            fill="#ffffff"
            className="bb-sun-core"
          />
        </g>

        {/* Laut */}
        <rect y={HORIZON} width={W} height={H - HORIZON} fill="url(#bb-sea)" />
        <rect y={HORIZON} width={W} height="4" fill="#d5f9ff" opacity="0.9" />

        <g clipPath="url(#bb-seaclip)">
          {/* Gelombang jauh */}
          <g className="bb-bobwater">
            <g className="bb-w1" style={wl(-520)}>
              <path d={wavePath(985, 9, 520)} fill="#25c6e2" opacity="0.45" />
            </g>
          </g>
          <g className="bb-bobwater" style={{ animationDelay: "-2s" }}>
            <g className="bb-w2" style={wl(-420)}>
              <path d={wavePath(1040, 10, 420)} fill="#1fb7dc" opacity="0.4" />
            </g>
          </g>

        </g>

        {/* Pulau kanan (tidak dipotong, agar pohon terlihat penuh) */}
          <g>
            <path
              d="M1210 1028 L1530 1012 L1585 985 L1695 970 L1765 1005 L1860 1013 L2050 992 Q2150 972 2200 925 Q2250 905 2353 905 L2353 1030 Z"
              fill="url(#bb-sand)"
            />
            <path
              d="M2200 925 Q2250 905 2353 905 L2353 960 Q2270 950 2200 960 Z"
              fill="#fbd29a"
              opacity="0.6"
            />
            <path d="M2060 990 L2095 978 L2140 992 L2130 1004 L2060 1004 Z" fill="#8c8a98" />
            <path d="M2140 998 L2200 996 L2235 1006 L2140 1012 Z" fill="#a8a5b4" />
            <Grass x={2110} y={985} s={0.8} />
            <Palm x={2152} y={990} height={250} lean={-22} scale={1} delay={0.6} />
            <Palm x={2128} y={992} height={165} lean={-62} scale={0.95} delay={1.9} />
            <Palm x={2318} y={1012} height={165} lean={-62} scale={0.95} delay={1.2} />
          </g>

        <g clipPath="url(#bb-seaclip)">
          {/* Gelombang tengah */}
          <g className="bb-bobwater" style={{ animationDelay: "-1s" }}>
            <g className="bb-w3" style={wl(-600)}>
              <path d={wavePath(1075, 12, 600)} fill="#19b5e0" opacity="0.38" />
            </g>
          </g>
          <g className="bb-bobwater" style={{ animationDelay: "-3s" }}>
            <g className="bb-w4" style={wl(-480)}>
              <path d={wavePath(1160, 14, 480)} fill="#5ff0fa" opacity="0.4" />
            </g>
          </g>

        </g>

        {/* Pulau kiri (tidak dipotong, agar pohon terlihat penuh) */}
          <g>
            <path
              d="M0 1050 Q 90 1062 200 1100 L380 1092 L430 1120 L660 1148 L0 1148 Z"
              fill="url(#bb-sand)"
            />
            <path d="M20 1100 L55 1092 L85 1102 L80 1116 L20 1116 Z" fill="#8c8a98" />
            <path d="M75 1118 L120 1104 L215 1100 L232 1118 L220 1124 L80 1124 Z" fill="#9b98a8" />
            <Grass x={22} y={1098} s={0.8} />
            <Grass x={150} y={1102} s={1.1} />
            <Palm x={35} y={1098} height={400} lean={62} scale={1} delay={0} />
            <Palm x={145} y={1102} height={272} lean={26} scale={1.05} delay={1.4} />
          </g>

        <g clipPath="url(#bb-seaclip)">
          {/* Gelombang depan */}
          <g className="bb-bobwater" style={{ animationDelay: "-2.5s" }}>
            <g className="bb-w5" style={wl(-700)}>
              <path d={wavePath(1235, 16, 700)} fill="#6df2fa" opacity="0.45" />
            </g>
          </g>
          <g className="bb-bobwater" style={{ animationDelay: "-4s" }}>
            <g className="bb-w2" style={wl(-560)}>
              <path d={wavePath(1320, 14, 560)} fill="#9bf6f6" opacity="0.4" />
            </g>
          </g>

          {/* Kilauan air */}
          <g stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none">
            {[
              [980, 1010, 0],
              [1250, 1100, 0.9],
              [820, 1150, 1.7],
              [1500, 1180, 0.4],
              [620, 1240, 2.4],
              [1100, 1260, 1.2],
              [1700, 1290, 2.0],
              [380, 1310, 0.7],
            ].map(([x, y, d], i) => (
              <path
                key={i}
                className="bb-sparkle"
                style={{ animationDelay: `${d}s` }}
                d={`M${x} ${y} l 52 0`}
              />
            ))}
          </g>
        </g>

        {/* Ikan-ikan melompat (di atas air, di bawah tepi pantai) */}
        <g className="bb-fishwrap">
          {/* Kawanan sarden (jauh, kecil, melompat berurutan) */}
          {[0, 1, 2, 3].map((i) => (
            <Fish
              key={`sar-${i}`}
              kind="sardine"
              x={1120 + i * 46}
              y={1088 + (i % 2) * 10}
              s={1}
              dx={240 + i * 12}
              h={72 - i * 7}
              cycle={8}
              delay={-2 - i * 0.14}
              a0={46}
              a1={50}
              wag={0.17}
            />
          ))}

          {/* Tuna kecil di kejauhan, melompat ke kiri */}
          <Fish
            kind="tuna"
            x={1720}
            y={1075}
            s={0.9}
            dx={-300}
            h={95}
            cycle={10}
            delay={-5}
            a0={50}
            a1={55}
          />

          {/* Ikan terbang: lompatan rendah & panjang */}
          <Fish
            kind="flying"
            x={880}
            y={1135}
            s={1.5}
            dx={640}
            h={85}
            cycle={13}
            delay={-1}
            a0={34}
            a1={38}
            wag={0.3}
          />

          {/* Tuna utama */}
          <Fish
            kind="tuna"
            x={1000}
            y={1220}
            s={1.4}
            dx={380}
            h={160}
            cycle={9}
            delay={-3}
            a0={52}
            a1={58}
          />

          {/* Marlin besar, melompat tinggi ke kiri */}
          <Fish
            kind="marlin"
            x={1900}
            y={1190}
            s={1.6}
            dx={-540}
            h={240}
            cycle={17}
            delay={-9}
            a0={56}
            a1={60}
            wag={0.34}
          />

          {/* Ikan tropis oranye */}
          <Fish
            kind="tropical"
            x={1380}
            y={1285}
            s={1.3}
            dx={310}
            h={140}
            cycle={11}
            delay={-7}
            a0={54}
            a1={58}
            wag={0.22}
          />
        </g>

        {/* Tepi pantai */}
        <rect y="1330" width={W} height={H - 1330} fill="url(#bb-shore)" />
        <g className="bb-foam">
          <path
            d={`M0 1380 Q 400 1350 800 1385 Q 1250 1425 1700 1375 Q 2050 1340 ${W} 1365`}
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
        </g>
        <path
          d={`M0 ${H} L0 1490 Q 500 1450 1000 1485 Q 1500 1520 ${W} 1470 L${W} ${H} Z`}
          fill="#fbd7a3"
        />

        {/* Batu kanan bawah */}
        <path
          d="M1230 1568 L1490 1470 L1600 1360 L1760 1388 L1960 1425 L2100 1335 L2300 1262 L2353 1240 L2353 1568 Z"
          fill="#a29aa9"
        />
        <path
          d="M1490 1470 L1600 1360 L1760 1388 L1700 1440 Z"
          fill="#c8c2cf"
        />
        <path
          d="M1830 1568 L2000 1445 L2250 1392 L2353 1425 L2353 1568 Z"
          fill="#6e6f84"
        />
        <path
          d="M2100 1335 L2300 1262 L2353 1240 L2353 1290 L2200 1340 Z"
          fill="#bdb7c6"
        />

        {/* Tanaman besar kanan bawah */}
        <g transform="translate(2300 1568)">
          <g className="bb-leaf" style={{ transformOrigin: "0px 0px" }}>
            <path
              d="M-60 -528 Q 30 -320 53 -140 L0 -70 Q -10 -300 -60 -528 Z"
              fill="url(#bb-leafg)"
            />
            <path
              d="M-315 -233 Q -150 -258 -10 -148 Q 40 -98 53 -68 Q -100 -168 -315 -233 Z"
              fill="url(#bb-leafg)"
            />
            <path
              d="M-190 -148 Q -70 -98 -10 0 L-60 0 Q -120 -88 -190 -148 Z"
              fill="#5fb52c"
            />
            <path
              d="M-290 -148 Q -310 -68 -305 0 L-340 0 Q -320 -78 -290 -148 Z"
              fill="#74c23a"
            />
            <path
              d="M-190 -170 Q -250 -90 -210 0 L-250 0 Q -270 -90 -190 -170 Z"
              fill="#3f9a1f"
              opacity="0.9"
            />
          </g>
        </g>

        {/* Burung-burung */}
        <g>
          <Bird top={527} size={22} duration={52} delay={-20} bob={3.4} flap={0.95} />
          <Bird top={592} size={38} duration={46} delay={-6} bob={3.9} flap={1.15} />
          <Bird top={672} size={24} duration={50} delay={-30} bob={3.1} flap={0.85} />
          <Bird top={708} size={52} duration={40} delay={-14} bob={4.4} flap={1.25} />
          <Bird top={797} size={24} duration={56} delay={-38} bob={3.0} flap={0.8} />
          <Bird top={541} size={8} duration={64} delay={-45} bob={3.6} flap={0.7} />
        </g>

        {/* Transisi pantai menyatu ke halaman berikutnya (#F4F7FC) */}
        <path
          d={`M0 ${H} L0 1480 Q 400 1440 900 1485 Q 1400 1530 1900 1470 Q 2150 1440 ${W} 1455 L${W} ${H} Z`}
          fill="#F4F7FC"
          opacity="0.8"
        />
        <path
          d={`M0 ${H} L0 1515 Q 500 1475 1100 1515 Q 1650 1555 2050 1505 L${W} 1510 L${W} ${H} Z`}
          fill="#F4F7FC"
        />
        <rect y="1320" width={W} height={H - 1320 + 2} fill="url(#bb-blend-fade)" />
      </svg>

      {/* Gradien CSS responsif: menjamin transisi mulus di semua rasio layar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "clamp(120px, 18vh, 240px)",
          background:
            "linear-gradient(to bottom, rgba(244, 247, 252, 0) 0%, rgba(244, 247, 252, 0.2) 30%, rgba(244, 247, 252, 0.65) 65%, rgba(244, 247, 252, 0.95) 88%, #F4F7FC 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default BeachBackground;