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
 */

const W = 2353;
const H = 1568;
const HORIZON = 940;

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
        @media (prefers-reduced-motion: reduce) {
          .bb-sway,.bb-frond,.bb-leaf,.bb-w1,.bb-w2,.bb-w3,.bb-w4,.bb-w5,
          .bb-bobwater,.bb-foam,.bb-sparkle,.bb-sun-core,.bb-sun-corona,.bb-sun-ambient,.bb-haze,.bb-fly,
          .bb-bob,.bb-flap { animation: none !important; }
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
