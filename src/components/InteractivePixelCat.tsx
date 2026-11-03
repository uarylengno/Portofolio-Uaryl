import { useEffect, useId, useRef, type CSSProperties } from 'react';
import { mountPixelCat } from '../lib/pixel-cat.esm.js';

type Props = {
  /** Tinggi area tempat kucing berjalan (px). */
  height?: number | string;
  /** Teks bubble saat mengeong. */
  messages?: string[];
  className?: string;
  /**
   * Warna di tepi atas area ini. Samakan dengan warna bagian bawah
   * section di atasnya (mis. pasir pantai) supaya sambungannya mulus.
   * Bawaan: #F4F7FC (warna halaman).
   */
  topColor?: string;
};

type AnimVars = CSSProperties & {
  '--dur'?: string;
  '--delay'?: string;
  '--amp'?: string;
};

const anim = (dur: number, delay: number, amp = 1): AnimVars => ({
  '--dur': `${dur}s`,
  '--delay': `${delay}s`,
  '--amp': String(amp),
});

const SCENE_CSS = `
.pc-sway, .pc-leaf, .pc-puff, .pc-blade, .pc-bob, .pc-cloud, .pc-fly, .pc-wing {
  transform-box: fill-box;
  animation-duration: var(--dur, 6s);
  animation-delay: var(--delay, 0s);
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}
.pc-sway { transform-origin: 50% 100%; animation-name: pc-sway; }
@keyframes pc-sway {
  0%, 100% { transform: rotate(calc(-1.1deg * var(--amp, 1))) skewX(calc(-0.8deg * var(--amp, 1))); }
  50% { transform: rotate(calc(1.5deg * var(--amp, 1))) skewX(calc(1.2deg * var(--amp, 1))); }
}
.pc-leaf { transform-origin: 50% 100%; animation-name: pc-leaf; }
@keyframes pc-leaf {
  0%, 100% { transform: translateX(calc(-2px * var(--amp, 1))) rotate(calc(-1.6deg * var(--amp, 1))); }
  50% { transform: translateX(calc(3px * var(--amp, 1))) rotate(calc(2.2deg * var(--amp, 1))); }
}
.pc-puff { transform-origin: 50% 70%; animation-name: pc-puff; }
@keyframes pc-puff {
  0%, 100% { transform: scale(1) translateY(0); }
  50% { transform: scale(1.045) translateY(-1.5px); }
}
.pc-blade { transform-origin: 50% 100%; animation-name: pc-blade; }
@keyframes pc-blade {
  0%, 100% { transform: rotate(calc(-5deg * var(--amp, 1))) skewX(-3deg); }
  50% { transform: rotate(calc(6deg * var(--amp, 1))) skewX(4deg); }
}
.pc-bob { transform-origin: 50% 100%; animation-name: pc-bob; }
@keyframes pc-bob {
  0%, 100% { transform: rotate(-5deg) translateY(0); }
  50% { transform: rotate(5deg) translateY(-1.2px); }
}
.pc-cloud { animation-name: pc-cloud; animation-timing-function: linear; animation-direction: alternate; }
@keyframes pc-cloud {
  from { transform: translateX(-70px); }
  to { transform: translateX(90px); }
}
.pc-fly { animation-name: pc-fly; animation-timing-function: ease-in-out; }
@keyframes pc-fly {
  0% { transform: translate(0, 0) rotate(-8deg); }
  20% { transform: translate(34px, -18px) rotate(10deg); }
  45% { transform: translate(70px, 4px) rotate(-6deg); }
  70% { transform: translate(28px, 22px) rotate(12deg); }
  100% { transform: translate(0, 0) rotate(-8deg); }
}
.pc-wing { transform-origin: 50% 50%; animation-name: pc-wing; animation-duration: .38s; animation-timing-function: linear; }
@keyframes pc-wing {
  0%, 100% { transform: scaleX(1); }
  50% { transform: scaleX(.25); }
}
@media (prefers-reduced-motion: reduce) {
  .pc-sway, .pc-leaf, .pc-puff, .pc-blade, .pc-bob, .pc-cloud, .pc-fly, .pc-wing {
    animation: none !important;
  }
}
`;

const BUSH_LUMPS: [number, number, number][] = [
  [0, -44, 62], [-84, -26, 46], [88, -30, 50], [-34, -78, 50],
  [42, -80, 45], [-128, -8, 32], [132, -6, 34], [4, -4, 70],
];

function Bush({
  x,
  y,
  scale = 1,
  delay = 0,
  flip = false,
  dark = '#2b5a24',
  mid = '#4f8a2e',
  light = '#7fc243',
}: {
  x: number;
  y: number;
  scale?: number;
  delay?: number;
  flip?: boolean;
  dark?: string;
  mid?: string;
  light?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <g className="pc-sway" style={anim(7.5, delay, 1)}>
        <g fill={dark}>
          {BUSH_LUMPS.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} />)}
        </g>
        <g className="pc-leaf" style={anim(6.2, delay - 1.3, 1)} fill={mid}>
          {BUSH_LUMPS.map(([cx, cy, r], i) => (
            <circle
              key={i}
              className="pc-puff"
              style={anim(4.6 + (i % 4) * 0.7, delay - i * 0.6)}
              cx={cx + 2}
              cy={cy + 6}
              r={r * 0.82}
            />
          ))}
        </g>
        <g className="pc-leaf" style={anim(5.4, delay - 2.4, 1.4)}>
          <g fill={light} opacity="0.55">
            <circle cx="-26" cy="-70" r="26" />
            <circle cx="44" cy="-74" r="22" />
            <circle cx="-92" cy="-34" r="18" />
            <circle cx="96" cy="-36" r="19" />
          </g>
          <g fill="none" stroke="#a9e060" strokeWidth="4" strokeLinecap="round" opacity="0.85">
            <path d="M-70 -78 Q-34 -104 6 -92" />
            <path d="M22 -96 Q58 -112 86 -84" />
            <path d="M-118 -34 Q-100 -52 -78 -50" />
          </g>
        </g>
      </g>
    </g>
  );
}

function Tuft({ x, y, s = 1, delay = 0, color = '#5c9420' }: { x: number; y: number; s?: number; delay?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={color} strokeWidth="2.4" strokeLinecap="round" fill="none">
      <path className="pc-blade" style={anim(3.4, delay, 1.2)} d="M-5 0 Q-9 -12 -15 -22" />
      <path className="pc-blade" style={anim(2.9, delay - 0.6, 1)} d="M-1 0 Q-2 -16 -3 -29" />
      <path className="pc-blade" style={anim(3.8, delay - 1.1, 1.3)} d="M3 0 Q7 -14 13 -25" />
      <path className="pc-blade" style={anim(3.1, delay - 1.7, 0.9)} d="M7 0 Q12 -8 18 -14" />
    </g>
  );
}

function Flower({ x, y, s = 1, delay = 0, petal = '#ffffff' }: { x: number; y: number; s?: number; delay?: number; petal?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="pc-bob" style={anim(3.6 + (delay % 2), delay)}>
        <path d="M0 0 V-12" stroke="#5c9420" strokeWidth="1.8" strokeLinecap="round" />
        <g transform="translate(0 -14)" fill={petal}>
          <circle cx="0" cy="-4" r="3.2" />
          <circle cx="3.8" cy="-1.2" r="3.2" />
          <circle cx="2.3" cy="3.3" r="3.2" />
          <circle cx="-2.3" cy="3.3" r="3.2" />
          <circle cx="-3.8" cy="-1.2" r="3.2" />
          <circle cx="0" cy="0" r="2.4" fill="#ffc83d" />
        </g>
      </g>
    </g>
  );
}

function Cloud({ x, y, s = 1, dur, delay }: { x: number; y: number; s?: number; dur: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity="0.85">
      <g className="pc-cloud" style={anim(dur, delay)} fill="#ffe4c6">
        <ellipse cx="0" cy="0" rx="46" ry="14" />
        <ellipse cx="-20" cy="-9" rx="24" ry="14" />
        <ellipse cx="14" cy="-13" rx="28" ry="16" />
      </g>
    </g>
  );
}

function Butterfly({ x, y, color, delay, dur }: { x: number; y: number; color: string; delay: number; dur: number }) {
  return (
    <g data-pc-butterfly="true" transform={`translate(${x} ${y})`}>
      <g className="pc-fly" style={anim(dur, delay)}>
        <g className="pc-wing" fill={color}>
          <ellipse cx="-4.5" cy="-2" rx="5" ry="6.5" />
          <ellipse cx="4.5" cy="-2" rx="5" ry="6.5" />
          <ellipse cx="-3" cy="4" rx="3.2" ry="4" opacity="0.85" />
          <ellipse cx="3" cy="4" rx="3.2" ry="4" opacity="0.85" />
        </g>
        <rect x="-0.8" y="-6" width="1.6" height="13" rx="0.8" fill="#4a3426" />
      </g>
    </g>
  );
}

function MeadowScene({ topColor }: { topColor: string }) {
  const uid = useId().replace(/:/g, '');
  const id = (name: string) => `${name}-${uid}`;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="absolute inset-0 z-0 h-full w-full pointer-events-none select-none"
      viewBox="0 0 1440 440"
      preserveAspectRatio="xMidYMax slice"
    >
      <style>{SCENE_CSS}</style>
      <defs>
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={topColor} />
          <stop offset="16%" stopColor="#ffe6c4" />
          <stop offset="42%" stopColor="#ffc98a" />
          <stop offset="72%" stopColor="#ffab5c" />
          <stop offset="100%" stopColor="#ff9b4a" />
        </linearGradient>
        <radialGradient id={id('sun')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff3d6" stopOpacity="1" />
          <stop offset="35%" stopColor="#ffd08a" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#ff9b4a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('hillBack')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b4d94a" />
          <stop offset="100%" stopColor="#9bc72c" />
        </linearGradient>
        <linearGradient id={id('hillMid')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#97c425" />
          <stop offset="100%" stopColor="#82b51d" />
        </linearGradient>
        <linearGradient id={id('hillFront')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8cbd1f" />
          <stop offset="55%" stopColor="#9ccb3a" />
          <stop offset="100%" stopColor="#d6ec9c" />
        </linearGradient>
        <linearGradient id={id('dirt')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c58e5c" />
          <stop offset="55%" stopColor="#bb844f" />
          <stop offset="100%" stopColor="#d9b697" />
        </linearGradient>
        <linearGradient id={id('dirtRim')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b4223" />
          <stop offset="100%" stopColor="#a87a55" />
        </linearGradient>
        <radialGradient id={id('dirtShine')} cx="0.5" cy="0.35" r="0.65">
          <stop offset="0%" stopColor="#e2b283" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#e2b283" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="440" fill={`url(#${id('sky')})`} />
      <circle cx="1090" cy="215" r="240" fill={`url(#${id('sun')})`} />
      <circle cx="1090" cy="215" r="46" fill="#fff1cf" opacity="0.95" />
      <Cloud x={260} y={92} s={1.1} dur={46} delay={-12} />
      <Cloud x={720} y={60} s={0.8} dur={58} delay={-30} />
      <Cloud x={1180} y={112} s={1} dur={52} delay={-4} />

      <path d="M0 292 C150 262 300 254 470 276 C650 300 760 322 940 270 C1100 226 1250 246 1440 282 V440 H0 Z" fill={`url(#${id('hillBack')})`} />
      <Bush x={470} y={300} scale={0.42} delay={-1.5} dark="#4a8a34" mid="#69a43f" light="#93cf5a" />
      <Bush x={1000} y={292} scale={0.36} delay={-3.5} flip dark="#4a8a34" mid="#69a43f" light="#93cf5a" />

      <path d="M0 330 C200 304 420 322 640 336 C860 350 1080 308 1240 306 C1320 305 1390 312 1440 322 V440 H0 Z" fill={`url(#${id('hillMid')})`} />
      <Bush x={140} y={382} scale={1.12} delay={0} />
      <Bush x={1320} y={380} scale={1.18} delay={-2.8} flip />
      <Bush x={405} y={352} scale={0.52} delay={-4.2} />
      <Bush x={1075} y={350} scale={0.5} delay={-1.1} flip />
      <path d="M0 368 C210 354 430 376 700 370 C960 364 1200 372 1440 350 V440 H0 Z" fill={`url(#${id('hillFront')})`} />

      <g>
        <path
          d="M176 370 C250 344 390 331 560 326 C800 320 1080 322 1260 336 C1370 346 1420 366 1396 384 C1370 404 1260 408 1120 410 C900 414 640 424 420 420 C300 418 220 410 190 402 C145 398 102 396 176 370 Z"
          fill={`url(#${id('dirtRim')})`}
        />
        <path
          d="M194 372 C260 350 400 339 566 334 C804 329 1074 331 1240 344 C1340 352 1384 368 1366 382 C1344 398 1250 400 1116 402 C900 406 640 414 424 410 C310 408 235 402 205 396 C155 393 128 394 194 372 Z"
          fill={`url(#${id('dirt')})`}
        />
        <path
          d="M230 372 C300 352 460 344 700 342 C940 340 1160 346 1290 360 C1230 378 1000 384 760 386 C520 388 300 388 230 372 Z"
          fill={`url(#${id('dirtShine')})`}
        />
        <g fill="#a9703f" opacity="0.8">
          <ellipse cx="380" cy="368" rx="30" ry="7" />
          <ellipse cx="560" cy="358" rx="44" ry="9" />
          <ellipse cx="880" cy="380" rx="36" ry="7" />
          <ellipse cx="1140" cy="352" rx="26" ry="6" />
        </g>
        <g fill="#e2bd98" opacity="0.8">
          <ellipse cx="560" cy="356" rx="30" ry="4" />
          <ellipse cx="880" cy="378" rx="24" ry="3" />
        </g>
        <g fill="#d8b393" opacity="0.75">
          <ellipse cx="1180" cy="408" rx="20" ry="5" />
          <ellipse cx="1290" cy="414" rx="16" ry="4" />
        </g>
      </g>

      <Tuft x={78} y={398} s={1.2} delay={0} />
      <Tuft x={236} y={410} s={1} delay={-1} color="#6aa626" />
      <Tuft x={452} y={354} s={0.8} delay={-2} />
      <Tuft x={744} y={338} s={0.9} delay={-0.5} />
      <Tuft x={990} y={376} s={0.8} delay={-1.6} color="#6aa626" />
      <Tuft x={1196} y={412} s={1.1} delay={-2.2} />
      <Tuft x={1378} y={402} s={1.25} delay={-0.8} />
      <Tuft x={34} y={420} s={1.1} delay={-2.7} color="#74b02c" />
      <Tuft x={1430} y={424} s={1} delay={-1.3} color="#74b02c" />
      <Flower x={64} y={414} s={1.1} delay={0} />
      <Flower x={176} y={398} s={0.9} delay={-1.4} />
      <Flower x={282} y={428} s={1} delay={-0.7} petal="#fff3f7" />
      <Flower x={520} y={316} s={0.7} delay={-2.1} />
      <Flower x={1212} y={316} s={0.7} delay={-1.1} />
      <Flower x={1300} y={420} s={1} delay={-1.9} />
      <Flower x={1396} y={412} s={1.15} delay={-0.4} petal="#fff3f7" />
      <Flower x={826} y={432} s={1} delay={-2.5} />
      <Flower x={1000} y={430} s={0.95} delay={-0.9} />
      {/* Cahaya sore: tint hangat tipis di atas bukit */}
      <rect width="1440" height="440" fill="#ff8a2a" opacity="0.1" />
      <Butterfly x={300} y={300} color="#ff9ec4" delay={0} dur={11} />
      <Butterfly x={1060} y={270} color="#ffd24d" delay={-5} dur={13} />
    </svg>
  );
}

/**
 * Kucing pixel bebas berkeliaran di lanskap padang bukit full-bleed.
 * Latar SVG inline berisi bukit, semak, rumput, bunga, awan, dan kupu-kupu.
 */
export default function InteractivePixelCat({
  height,
  messages,
  className = '',
  topColor = '#F4F7FC',
}: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const scene = sceneRef.current;
    const shadow = shadowRef.current;
    if (!box || !scene || !shadow) return;

    const cat = mountPixelCat({
      container: box,
      // Jaga kaki kucing pada satu garis yang berada di dalam jalur tanah.
      bottom: (boxH: number) => Math.round(boxH * 0.16),
      side: 'right',
      scale: 'auto',
      hideButton: false,
      roam: false,
      timeScale: 1.2,
      sleepAfter: 90,
      sound: true,
      messages: messages && messages.length ? messages : undefined,
      zIndex: 5,
    });

    const shadowTimer = window.setInterval(() => {
      const catElement = box.querySelector<HTMLElement>('.pxcat-wrap');
      if (!catElement) return;

      const boxBounds = box.getBoundingClientRect();
      const catBounds = catElement.getBoundingClientRect();
      const scale = catBounds.height / 38;
      const footY = catBounds.top - boxBounds.top + catBounds.height * (34 / 38);
      const groundY = box.clientHeight * 0.84;
      const lift = Math.max(0, groundY - footY);

      shadow.style.left = `${catBounds.left - boxBounds.left + catBounds.width / 2}px`;
      shadow.style.width = `${catBounds.width * 0.78}px`;
      shadow.style.opacity = String(Math.max(0.16, 0.42 - lift / 100));
      shadow.style.transform = `translateX(-50%) scaleX(${1 + Math.min(lift / 100, 0.65)})`;
      shadow.style.filter = `blur(${1 + Math.min(lift / 12, 3)}px)`;
      shadow.style.setProperty('--cat-shadow-height', `${Math.max(3, scale * 2.4)}px`);
    }, 40);

    let lastInteraction = 0;
    let hopTimer: ReturnType<typeof setTimeout> | undefined;
    const interactionTimer = window.setInterval(() => {
      const catElement = box.querySelector<HTMLElement>('.pxcat-wrap');
      if (!catElement) return;

      const catBounds = catElement.getBoundingClientRect();
      const catX = catBounds.left + catBounds.width / 2;
      const catY = catBounds.top + catBounds.height / 2;
      const maxDistanceX = Math.max(110, Math.min(240, scene.clientWidth * 0.18));
      const butterflyIsNear = Array.from(
        scene.querySelectorAll<SVGGElement>('[data-pc-butterfly="true"]'),
      ).some((butterfly) => {
        const bounds = butterfly.getBoundingClientRect();
        const dx = Math.abs(bounds.left + bounds.width / 2 - catX);
        const dy = Math.abs(bounds.top + bounds.height / 2 - catY);
        return dx < maxDistanceX && dy < scene.clientHeight * 0.42;
      });

      if (!butterflyIsNear || Date.now() - lastInteraction < 9000) return;
      lastInteraction = Date.now();
      if (cat.trigger('look')) {
        hopTimer = setTimeout(() => cat.trigger('hop'), 700);
      }
    }, 350);

    return () => {
      window.clearInterval(shadowTimer);
      window.clearInterval(interactionTimer);
      if (hopTimer) clearTimeout(hopTimer);
      cat.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={sceneRef}
      className={`relative w-full overflow-hidden select-none ${className}`}
      style={{
        height: height ?? 'clamp(280px, 33vw, 440px)',
      }}
      aria-label="Area kucing pixel berjalan di jalur tanah"
    >
      <style>{`.pc-cat-stage .pxcat-wrap.pxcat-in::after { display: none; }`}</style>
      <MeadowScene topColor={topColor} />
      <div
        ref={boxRef}
        className="pc-cat-stage absolute inset-y-0 left-[10%] right-[7%] z-[2]"
      >
        <div
          ref={shadowRef}
          aria-hidden="true"
          className="pointer-events-none absolute z-[4] rounded-[50%]"
          style={{
            bottom: '16%',
            height: 'var(--cat-shadow-height, 7px)',
            background:
              'radial-gradient(ellipse at center, rgba(47, 36, 24, 0.48) 0%, rgba(47, 36, 24, 0.25) 48%, rgba(47, 36, 24, 0) 100%)',
            transition: 'left 80ms linear, opacity 120ms ease-out, filter 120ms ease-out, transform 120ms ease-out',
          }}
        />
      </div>
      {/* Tepi atas: memudar dari warna section di atasnya (pasir pantai di Skills) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1]"
        style={{
          height: 'clamp(72px, 11vw, 128px)',
          background: `linear-gradient(to bottom, ${topColor} 0%, color-mix(in srgb, ${topColor} 82%, transparent) 30%, color-mix(in srgb, ${topColor} 35%, transparent) 65%, transparent 100%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1]"
        style={{
          height: 'clamp(44px, 7vw, 84px)',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.18) 30%, rgba(255, 255, 255, 0.62) 65%, #ffffff 100%)',
        }}
      />
    </div>
  );
}