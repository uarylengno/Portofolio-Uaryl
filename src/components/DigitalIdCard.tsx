import { motion, useSpring } from 'motion/react';
import './digital-id-card.css';

export default function DigitalIdCard() {
  const swing = useSpring(0, { stiffness: 180, damping: 14 });

  return (
    <div className="idc-gallery" aria-label="Kartu identitas mahasiswa, sisi depan dan belakang">
      <motion.div
        className="idc-hanging-group"
        drag
        dragConstraints={{ left: -50, right: 50, top: -12, bottom: 45 }}
        dragElastic={0.28}
        dragMomentum={false}
        dragSnapToOrigin
        onDrag={(_, info) => swing.set(Math.max(-18, Math.min(18, info.offset.x * 0.14)))}
        onDragEnd={() => swing.set(0)}
        style={{ rotate: swing }}
      >
        <div className="idc-lanyard" aria-hidden="true">
          <div className="idc-strap">
            <span>UARYL ENGNO • ID CARD •</span>
          </div>
          <svg className="idc-clip" viewBox="0 0 48 52" aria-hidden="true">
            <rect x="7" y="0" width="34" height="12" rx="3" />
            <path d="M24 12v8a10 10 0 1 0 10 10" />
          </svg>
        </div>
        <img
          className="idc-image idc-image-back"
          src="/assets/idcardback.png"
          alt="Bagian belakang kartu identitas"
          draggable="false"
          loading="eager"
        />
        <img
          className="idc-image idc-image-front"
          src="/assets/idcarddepan.png"
          alt="Bagian depan kartu identitas"
          draggable="false"
          loading="eager"
        />
      </motion.div>
      <div className="idc-caption" aria-hidden="true">
        TARIK KARTU <span /> DEPAN & BELAKANG
      </div>
    </div>
  );
}
