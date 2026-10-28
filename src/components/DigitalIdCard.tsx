import { useState, useEffect, useRef, useCallback } from 'react';
import './digital-id-card.css';

// Exact ID card dimensions & geometry
const CARD_WIDTH = 285;
const CARD_HEIGHT = 454;
const CARD_TOP = 18;
const SLOT_Y = CARD_TOP + 12; // = 30px (center of slot hole)
const CRIMP_OFFSET = 32; // px from slot hole to strap crimp
const INITIAL_ANCHOR_Y = -520;

// High-precision, zero-flicker Bézier path generator
function computeLanyardPath(
  cx: number,
  cy: number,
  angleRad: number,
  ay: number
) {
  const ax = 0;
  const dx = cx - ax;
  const dy = cy - ay;
  const dist = Math.hypot(dx, dy);
  const restDist = Math.abs(SLOT_Y - CRIMP_OFFSET - ay);

  // Smooth continuous sag (no discrete sign flips)
  const sagAmount = Math.max(0, restDist - dist) * 0.7;
  const sagDir = Math.tanh(dx / 35);

  const cp1x = ax + dx * 0.22 + sagDir * sagAmount * 0.35;
  const cp1y = ay + dy * 0.42 + sagAmount * 0.8;

  const cp2x = cx - Math.sin(angleRad) * (dy * 0.32) + sagDir * sagAmount * 0.2;
  const cp2y = cy - Math.cos(angleRad) * (dy * 0.32) + sagAmount * 0.4;

  return `M ${ax.toFixed(2)} ${ay.toFixed(2)} C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${cx.toFixed(2)} ${cy.toFixed(2)}`;
}

// Initial resting path (guarantees DOM always has valid geometry on first paint)
const INITIAL_PATH = computeLanyardPath(0, SLOT_Y - CRIMP_OFFSET, 0, INITIAL_ANCHOR_Y);

export default function DigitalIdCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const innerCardRef = useRef<HTMLDivElement>(null);

  // SVG Layer refs for all 4 ribbon stroke layers
  const pathLayerRefs = useRef<(SVGPathElement | null)[]>([]);
  const crimpRef = useRef<SVGGElement>(null);
  const hookRef = useRef<SVGGElement>(null);
  const frontGlareRef = useRef<HTMLDivElement>(null);
  const backGlareRef = useRef<HTMLDivElement>(null);

  // Flip State (0 or 180 degrees)
  const [isFlipped, setIsFlipped] = useState(false);

  // Physical State stored in Refs for zero-latency 60-144fps updates
  const stateRef = useRef({
    // Pendulum state
    theta: 0,        // angular displacement (radians)
    omega: 0,        // angular velocity (rad/s)
    stretch: 0,      // vertical stretch along cord (px)
    stretchVel: 0,   // vertical stretch velocity (px/s)
    
    // Position (px)
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,

    // 3D Tilt angles (degrees)
    tiltX: 0,
    tiltY: 0,
    flipAngle: 0,
    targetFlip: 0,

    // Drag target tracking
    isDragging: false,
    dragTargetX: 0,
    dragTargetY: 0,
    pointerStartX: 0,
    pointerStartY: 0,
    pointerStartTime: 0,
    lastPointerX: 0,
    lastPointerY: 0,
    lastPointerTime: 0,
    smoothedDragVx: 0,
    smoothedDragVy: 0,

    // Scroll inertia tracking
    scrollVel: 0,
    lastScrollY: 0,
    lastScrollTime: 0,

    // Anchor position (fixed layout coordinate behind navbar)
    anchorY: INITIAL_ANCHOR_Y,
  });

  const animFrameRef = useRef<number | null>(null);

  // Dynamically update anchor position so lanyard connects seamlessly behind navbar
  const updateAnchor = useCallback(() => {
    if (!containerRef.current) return;
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      const hero = containerRef.current.closest('section');
      if (hero) {
        const heroRect = hero.getBoundingClientRect();
        const contRect = containerRef.current.getBoundingClientRect();
        // Distance from card container to top of hero section (-50px behind navbar)
        const dist = heroRect.top - contRect.top - 50;
        stateRef.current.anchorY = Math.min(-220, Math.max(-680, dist));
        return;
      }
    }
    // Mobile / Tablet fallback
    stateRef.current.anchorY = -170;
  }, []);

  useEffect(() => {
    updateAnchor();

    const handleResize = () => updateAnchor();
    const handleScroll = () => {
      const s = stateRef.current;
      const now = performance.now();
      const currentY = window.scrollY;
      const dt = Math.max(1, now - (s.lastScrollTime || now));
      const dy = currentY - (s.lastScrollY || currentY);

      // Instantaneous scroll speed (px/s)
      const instVel = (dy / dt) * 1000;
      // Filtered scroll velocity
      s.scrollVel = s.scrollVel * 0.45 + Math.max(-2800, Math.min(2800, instVel)) * 0.55;

      s.lastScrollY = currentY;
      s.lastScrollTime = now;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateAnchor]);

  // Sync target flip angle when state toggles
  useEffect(() => {
    stateRef.current.targetFlip = isFlipped ? 180 : 0;
  }, [isFlipped]);

  // Unified DOM update function (applied every animation frame)
  const renderFrame = (
    x: number,
    y: number,
    angleDeg: number,
    tiltX: number,
    tiltY: number,
    flip: number,
    ay: number
  ) => {
    if (!cardRef.current || !innerCardRef.current) return;

    // 1. Move card container (sub-pixel precision transform)
    cardRef.current.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotateZ(${angleDeg.toFixed(2)}deg)`;

    // 2. 3D Card box (Pitch, Yaw, and 180deg Flip)
    innerCardRef.current.style.transform = `rotateX(${tiltX.toFixed(2)}deg) rotateY(${(tiltY + flip).toFixed(2)}deg)`;

    // 3. Dynamic glass reflection
    const glareX = Math.max(-100, Math.min(100, (tiltY + angleDeg) * 2.5));
    const glareOpacity = Math.min(0.4, (Math.abs(tiltX) + Math.abs(tiltY)) * 0.015 + 0.08);

    if (frontGlareRef.current) {
      frontGlareRef.current.style.transform = `translateX(${glareX.toFixed(1)}%)`;
      frontGlareRef.current.style.opacity = `${glareOpacity.toFixed(2)}`;
    }
    if (backGlareRef.current) {
      backGlareRef.current.style.transform = `translateX(${(-glareX).toFixed(1)}%)`;
      backGlareRef.current.style.opacity = `${glareOpacity.toFixed(2)}`;
    }

    // 4. Update SVG lanyard curve
    const rad = (angleDeg * Math.PI) / 180;
    const cx = x - Math.sin(rad) * CRIMP_OFFSET;
    const cy = SLOT_Y + y - Math.cos(rad) * CRIMP_OFFSET;

    const pathData = computeLanyardPath(cx, cy, rad, ay);
    for (let i = 0; i < pathLayerRefs.current.length; i++) {
      const el = pathLayerRefs.current[i];
      if (el) el.setAttribute('d', pathData);
    }

    // 5. Crimp and Hook transforms
    if (crimpRef.current) {
      crimpRef.current.setAttribute(
        'transform',
        `translate(${cx.toFixed(2)}, ${cy.toFixed(2)}) rotate(${angleDeg.toFixed(2)})`
      );
    }
    if (hookRef.current) {
      const hookY = SLOT_Y + y;
      hookRef.current.setAttribute(
        'transform',
        `translate(${x.toFixed(2)}, ${hookY.toFixed(2)}) rotate(${angleDeg.toFixed(2)})`
      );
    }
  };

  // High-performance, stable Physics Loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (now: number) => {
      // Clamped delta time for rock-solid stability across 60Hz, 120Hz, 144Hz
      const dt = Math.min((now - lastTime) / 1000, 0.024);
      lastTime = now;

      const s = stateRef.current;
      const ay = s.anchorY;
      const restHangDist = Math.abs(SLOT_Y - ay);

      // Smooth critically-damped 3D flip rotation
      const flipDiff = s.targetFlip - s.flipAngle;
      s.flipAngle += flipDiff * (1 - Math.exp(-14 * dt));

      if (s.isDragging) {
        // --- WHILE DRAGGING: Liquid smooth cursor following ---
        const followSpeed = 1 - Math.exp(-28 * dt);
        const prevX = s.x;
        const prevY = s.y;

        s.x += (s.dragTargetX - s.x) * followSpeed;
        s.y += (s.dragTargetY - s.y) * followSpeed;

        s.vx = (s.x - prevX) / dt;
        s.vy = (s.y - prevY) / dt;

        // Current angle from anchor to card
        const hangAngleRad = Math.atan2(s.x, s.y + SLOT_Y - ay);
        const inertiaAngleRad = Math.max(-0.4, Math.min(0.4, s.smoothedDragVx * 0.00035));
        
        s.theta = hangAngleRad * 0.88 + inertiaAngleRad;
        s.omega = (s.vx / restHangDist);

        // 3D Pitch and Yaw
        const targetTiltX = -Math.max(-20, Math.min(20, s.y * 0.035 + s.vy * 0.008));
        const targetTiltY = Math.max(-25, Math.min(25, s.vx * 0.012 - s.x * 0.025));
        s.tiltX += (targetTiltX - s.tiltX) * followSpeed;
        s.tiltY += (targetTiltY - s.tiltY) * followSpeed;

        // Calculate stretch
        const currentDist = Math.hypot(s.x, s.y + SLOT_Y - ay);
        s.stretch = Math.max(0, currentDist - restHangDist);
        s.stretchVel = 0;
      } else {
        // --- WHEN RELEASED: Authentic Compound Pendulum Physics ---
        // Natural frequency: w0 = 4.8 rad/s (approx 1.3s swing period)
        const omega0Sq = 23.0;
        const dampingBeta = 1.6; // gentle, natural decay

        // Continuous natural ambient sway (berayun lembut ke kanan dan ke kiri secara terus-menerus agar tidak diam)
        const ambientTorque = Math.sin(now * 0.0018) * 0.65 + Math.sin(now * 0.0031) * 0.15;

        // --- SCROLL INERTIA REACTION ---
        // Fast scroll triggers authentic pendulum sways, vertical cord bounces, and 3D aerodynamic pitch!
        const scrollSpd = Math.abs(s.scrollVel);
        if (scrollSpd > 60) {
          // Dynamic lateral sway (momentum makes the badge swing side-to-side)
          const swayImpulse = Math.sign(s.scrollVel) * Math.sin(now * 0.009) * Math.min(4.5, scrollSpd * 0.004);
          s.omega += swayImpulse * dt * 2.8;

          // Vertical cord stretch bounce (page scrolling induces dynamic downward/upward tug)
          const stretchImpulse = Math.min(32, Math.max(-22, s.scrollVel * 0.022));
          s.stretchVel += stretchImpulse * dt * 16;

          // 3D Pitch tilt (card bottom leans aerodynamically against scroll direction)
          const scrollPitch = Math.max(-20, Math.min(20, s.scrollVel * 0.015));
          s.tiltX += (scrollPitch - s.tiltX) * Math.min(1, dt * 14);

          // 3D Yaw vibration / wobble (subtle natural twist)
          const scrollYaw = Math.cos(now * 0.012) * Math.min(14, scrollSpd * 0.008);
          s.tiltY += (scrollYaw - s.tiltY) * Math.min(1, dt * 14);
        }

        // Smoothly decay scroll velocity
        s.scrollVel *= Math.pow(0.84, dt * 60);

        // Symplectic Verlet / Semi-implicit Euler integration
        const angularAccel = -omega0Sq * Math.sin(s.theta) - dampingBeta * s.omega + ambientTorque;
        s.omega += angularAccel * dt;
        s.theta += s.omega * dt;

        // Vertical elastic cord stretch oscillation
        const kStretch = 75;
        const dampingStretch = 6.0;
        const stretchAccel = -kStretch * s.stretch - dampingStretch * s.stretchVel;
        s.stretchVel += stretchAccel * dt;
        s.stretch += s.stretchVel * dt;

        // Position strictly derived from pendulum angle & cord distance (Zero desync!)
        const effectiveLength = restHangDist + s.stretch;
        s.x = Math.sin(s.theta) * effectiveLength;
        s.y = ay + Math.cos(s.theta) * effectiveLength - SLOT_Y;

        // Aerodynamic 3D tilt decays smoothly with angular velocity
        const targetTiltX = -Math.cos(s.theta) * 2.5 + Math.min(10, s.stretch * 0.15);
        const targetTiltY = -Math.sin(s.theta) * 12.0 + s.omega * 2.8;
        s.tiltX += (targetTiltX - s.tiltX) * (1 - Math.exp(-8 * dt));
        s.tiltY += (targetTiltY - s.tiltY) * (1 - Math.exp(-8 * dt));
      }

      const angleDeg = (s.theta * 180) / Math.PI;

      // Render to DOM
      renderFrame(
        s.x,
        s.y,
        angleDeg,
        s.tiltX,
        s.tiltY,
        s.flipAngle,
        ay
      );

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Smooth elastic drag curve: 1:1 near center, progressive soft spring tension when pulled far
  const elasticResponse = (raw: number, max: number) => {
    const abs = Math.abs(raw);
    const sign = Math.sign(raw);
    return sign * max * Math.tanh(abs / max);
  };

  // Pointer Interaction Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const s = stateRef.current;
    s.isDragging = true;
    if (cardRef.current) cardRef.current.classList.add('is-dragging');

    const now = performance.now();
    s.pointerStartX = e.clientX;
    s.pointerStartY = e.clientY;
    s.pointerStartTime = now;
    s.lastPointerX = e.clientX;
    s.lastPointerY = e.clientY;
    s.lastPointerTime = now;
    s.dragTargetX = s.x;
    s.dragTargetY = s.y;
    s.smoothedDragVx = 0;
    s.smoothedDragVy = 0;

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = stateRef.current;
    if (!s.isDragging) return;
    e.preventDefault();

    const now = performance.now();
    const dt = Math.max(1, now - s.lastPointerTime);

    const rawDx = e.clientX - s.pointerStartX;
    const rawDy = e.clientY - s.pointerStartY;

    // Generous movement bounds (smooth tanh elasticity)
    s.dragTargetX = elasticResponse(rawDx, 360);
    s.dragTargetY = rawDy >= 0 ? elasticResponse(rawDy, 320) : elasticResponse(rawDy, 140);

    // Filtered velocity estimation (filters out micro-mouse jitter)
    const instVx = ((e.clientX - s.lastPointerX) / dt) * 1000;
    const instVy = ((e.clientY - s.lastPointerY) / dt) * 1000;

    s.smoothedDragVx = s.smoothedDragVx * 0.7 + instVx * 0.3;
    s.smoothedDragVy = s.smoothedDragVy * 0.7 + instVy * 0.3;

    s.lastPointerX = e.clientX;
    s.lastPointerY = e.clientY;
    s.lastPointerTime = now;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = stateRef.current;
    if (!s.isDragging) return;
    s.isDragging = false;
    if (cardRef.current) cardRef.current.classList.remove('is-dragging');

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const now = performance.now();
    const totalDist = Math.hypot(
      e.clientX - s.pointerStartX,
      e.clientY - s.pointerStartY
    );
    const duration = now - s.pointerStartTime;

    // Quick click (< 8px movement and < 280ms duration) toggles 3D flip!
    if (totalDist < 8 && duration < 280) {
      setIsFlipped((prev) => !prev);
      return;
    }

    // Seamless handoff to pendulum physics: convert velocity into initial angular velocity
    const ay = s.anchorY;
    const restHangDist = Math.abs(SLOT_Y - ay);
    const releaseOmega = (s.vx / restHangDist);
    s.omega = Math.max(-6.5, Math.min(6.5, releaseOmega));
    s.stretchVel = s.vy * 0.5;
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    handlePointerUp(e);
  };

  return (
    <div
      ref={containerRef}
      className="idc-gallery"
      aria-label="Kartu Identitas Digital Mahasiswa"
    >
      {/* ============================================================ */}
      {/* SVG LANYARD: Suspended from behind navbar                    */}
      {/* ViewBox matches 1000x1500px canvas to prevent tile culling   */}
      {/* ============================================================ */}
      <svg
        className="idc-svg-layer"
        aria-hidden="true"
        viewBox="-500 -700 1000 1500"
      >
        <defs>
          {/* Lanyard Fabric Gradient (Deep Indigo & Navy with Woven Sheen) */}
          <linearGradient id="idcStrapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0c0e24" />
            <stop offset="15%" stopColor="#1e1b4b" />
            <stop offset="50%" stopColor="#4338ca" />
            <stop offset="85%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0c0e24" />
          </linearGradient>

          {/* Chrome Metal Gradient */}
          <linearGradient id="idcMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#d1d5db" />
            <stop offset="50%" stopColor="#6b7280" />
            <stop offset="75%" stopColor="#e5e7eb" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
        </defs>

        {/* 1. LANYARD STRAP RIBBON (Extended behind navbar) */}
        {/* Layer A: Dark Outer Edge & Shadow Base */}
        <path
          ref={(el) => {
            pathLayerRefs.current[0] = el;
          }}
          d={INITIAL_PATH}
          fill="none"
          stroke="#070919"
          strokeWidth="26"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Layer B: Dashed White Stitching Edge */}
        <path
          ref={(el) => {
            pathLayerRefs.current[1] = el;
          }}
          d={INITIAL_PATH}
          fill="none"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="22"
          strokeDasharray="4 3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Layer C: Main Woven Indigo Ribbon Fabric */}
        <path
          ref={(el) => {
            pathLayerRefs.current[2] = el;
          }}
          d={INITIAL_PATH}
          fill="none"
          stroke="url(#idcStrapGrad)"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Layer D: Central Light Weave Sheen */}
        <path
          ref={(el) => {
            pathLayerRefs.current[3] = el;
          }}
          d={INITIAL_PATH}
          fill="none"
          stroke="rgba(255, 255, 255, 0.18)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 2. STRAP CRIMP & SWIVEL RING (Connecting Ribbon to Clip) */}
        <g ref={crimpRef} className="idc-strap-crimp">
          <rect
            x="-16"
            y="-10"
            width="32"
            height="18"
            rx="4"
            fill="url(#idcMetalGrad)"
            stroke="#374151"
            strokeWidth="1"
          />
          <line x1="-12" y1="-2" x2="12" y2="-2" stroke="#111827" strokeWidth="1" />
          <line x1="-12" y1="3" x2="12" y2="3" stroke="#111827" strokeWidth="1" />
          {/* Swivel Ring */}
          <circle cx="0" cy="14" r="8" fill="none" stroke="url(#idcMetalGrad)" strokeWidth="3.2" />
        </g>

        {/* 3. CHROME LOBSTER CLASP / HOOK (Latched through the Card Slot) */}
        <g ref={hookRef} className="idc-clip-hook">
          <ellipse cx="0" cy="-14" rx="5" ry="7" fill="none" stroke="url(#idcMetalGrad)" strokeWidth="3" />
          <path
            d="M -5 -8 C -5 6, -2 12, 0 16 C 2 12, 5 6, 5 -8"
            fill="none"
            stroke="url(#idcMetalGrad)"
            strokeWidth="3.8"
            strokeLinecap="round"
          />
          <rect x="-3" y="-6" width="6" height="5" rx="1.5" fill="#1f2937" />
        </g>
      </svg>

      {/* ============================================================ */}
      {/* 3D SINGLE ID CARD (BISA DI BOLAK-BALIK & DI TARIK BEBAS)     */}
      {/* ============================================================ */}
      <div
        ref={cardRef}
        className="idc-card-container"
        style={{
          width: `${CARD_WIDTH}px`,
          height: `${CARD_HEIGHT}px`,
          marginTop: `${CARD_TOP}px`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <div ref={innerCardRef} className="idc-card-3d-box">
          {/* FRONT FACE (BAGIAN DEPAN) */}
          <div className="idc-card-face idc-card-front">
            {/* Top slot cutout for the lanyard hook */}
            <div className="idc-slot-hole" aria-hidden="true" />
            <img
              src="/assets/idcarddepan.png"
              alt="Kartu Identitas Mahasiswa Uaryl Engno - Bagian Depan"
              className="idc-face-img"
              draggable={false}
              loading="eager"
            />
            {/* 3D Glass / Sheen reflection */}
            <div ref={frontGlareRef} className="idc-glare-overlay" aria-hidden="true" />
          </div>

          {/* BACK FACE (BAGIAN BELAKANG) */}
          <div className="idc-card-face idc-card-back">
            {/* Top slot cutout for the lanyard hook */}
            <div className="idc-slot-hole" aria-hidden="true" />
            <img
              src="/assets/idcardback.png"
              alt="Kartu Identitas Mahasiswa Uaryl Engno - Bagian Belakang"
              className="idc-face-img"
              draggable={false}
              loading="eager"
            />
            {/* 3D Glass / Sheen reflection */}
            <div ref={backGlareRef} className="idc-glare-overlay" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
