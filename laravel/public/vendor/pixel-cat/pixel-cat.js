/*! pixel-cat-pet - kucing pixel-art interaktif (Canvas 2D, tanpa dependensi) */
(function(){
'use strict';
// ---- atlas-data.js ----
// DIHASILKAN oleh tools/build_atlas.py — jangan edit manual.
const ATLAS = {"cellW": 32, "cellH": 24, "palette": [[5, 3, 2], [43, 25, 12], [81, 47, 23], [111, 66, 32], [148, 52, 80], [132, 80, 39], [153, 94, 46], [163, 84, 94], [168, 106, 53], [179, 115, 58], [192, 127, 69], [187, 120, 125], [234, 201, 166], [250, 228, 200]], "frames": {"0_0": {"x": 0, "y": 0, "w": 19, "h": 20, "ax": 14, "ay": 20, "px": 10.3, "py": 10.3, "l": 0, "t": 0, "r": 19, "b": 20, "eyes": [{"x": 11, "y": 7, "w": 1, "h": 2, "fur": [132, 80, 39]}, {"x": 16, "y": 7, "w": 1, "h": 2, "fur": [111, 66, 32]}], "nose": {"x": 13, "y": 9}, "ears": [[10, 10], [14, 17]], "earTop": 0}, "0_1": {"x": 32, "y": 0, "w": 19, "h": 20, "ax": 14, "ay": 20, "px": 9.9, "py": 10.1, "l": 0, "t": 0, "r": 19, "b": 20, "eyes": [{"x": 11, "y": 7, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 15, "y": 7, "w": 1, "h": 2, "fur": [132, 80, 39]}], "nose": {"x": 13, "y": 9}, "ears": [[10, 10], [14, 17]], "earTop": 0}, "0_2": {"x": 64, "y": 0, "w": 17, "h": 20, "ax": 12, "ay": 20, "px": 8.6, "py": 10.0, "l": 0, "t": 0, "r": 17, "b": 20, "eyes": [{"x": 9, "y": 7, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 13, "y": 7, "w": 1, "h": 2, "fur": [179, 115, 58]}], "nose": {"x": 11, "y": 9}, "ears": [], "earTop": 0}, "0_3": {"x": 96, "y": 0, "w": 20, "h": 20, "ax": 14, "ay": 20, "px": 11.0, "py": 10.3, "l": 0, "t": 0, "r": 20, "b": 20, "eyes": [{"x": 16, "y": 7, "w": 1, "h": 2, "fur": [179, 115, 58]}], "nose": {"x": 14, "y": 9}, "ears": [[10, 11], [15, 18]], "earTop": 0}, "0_4": {"x": 128, "y": 0, "w": 19, "h": 20, "ax": 14, "ay": 20, "px": 9.9, "py": 10.2, "l": 0, "t": 0, "r": 19, "b": 20, "eyes": [{"x": 11, "y": 7, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 16, "y": 7, "w": 1, "h": 2, "fur": [153, 94, 46]}], "nose": {"x": 13, "y": 9}, "ears": [[10, 10], [14, 17]], "earTop": 0}, "0_5": {"x": 160, "y": 0, "w": 18, "h": 20, "ax": 12, "ay": 20, "px": 9.2, "py": 10.1, "l": 0, "t": 0, "r": 18, "b": 20, "eyes": [{"x": 9, "y": 7, "w": 1, "h": 2, "fur": [153, 94, 46]}, {"x": 14, "y": 7, "w": 1, "h": 2, "fur": [168, 106, 53]}], "nose": {"x": 12, "y": 9}, "ears": [], "earTop": 0}, "1_0": {"x": 0, "y": 24, "w": 27, "h": 17, "ax": 20, "ay": 17, "px": 14.8, "py": 8.6, "l": 0, "t": 0, "r": 27, "b": 17, "eyes": [{"x": 20, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 24, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}], "nose": {"x": 22, "y": 8}, "ears": [[16, 19], [22, 25]], "earTop": 0}, "1_1": {"x": 32, "y": 24, "w": 27, "h": 17, "ax": 20, "ay": 17, "px": 15.0, "py": 8.6, "l": 0, "t": 0, "r": 27, "b": 17, "eyes": [{"x": 24, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}], "nose": {"x": 22, "y": 8}, "ears": [[15, 19], [22, 25]], "earTop": 0}, "1_2": {"x": 64, "y": 24, "w": 26, "h": 17, "ax": 19, "ay": 17, "px": 14.3, "py": 8.7, "l": 0, "t": 0, "r": 26, "b": 17, "eyes": [{"x": 19, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 23, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}], "nose": {"x": 21, "y": 8}, "ears": [[15, 18], [21, 24]], "earTop": 0}, "1_3": {"x": 96, "y": 24, "w": 27, "h": 17, "ax": 20, "ay": 17, "px": 14.9, "py": 8.5, "l": 0, "t": 0, "r": 27, "b": 17, "eyes": [{"x": 20, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 24, "y": 6, "w": 1, "h": 2, "fur": [168, 106, 53]}], "nose": {"x": 22, "y": 8}, "ears": [[15, 19], [22, 25]], "earTop": 0}, "1_4": {"x": 128, "y": 24, "w": 27, "h": 18, "ax": 20, "ay": 18, "px": 15.0, "py": 9.5, "l": 0, "t": 0, "r": 27, "b": 18, "eyes": [{"x": 20, "y": 7, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 24, "y": 7, "w": 1, "h": 2, "fur": [168, 106, 53]}], "nose": {"x": 22, "y": 9}, "ears": [[16, 18], [22, 24]], "earTop": 0}, "1_5": {"x": 160, "y": 24, "w": 27, "h": 18, "ax": 20, "ay": 18, "px": 14.9, "py": 9.1, "l": 0, "t": 0, "r": 27, "b": 18, "eyes": [{"x": 20, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 24, "y": 6, "w": 1, "h": 2, "fur": [192, 127, 69]}], "nose": {"x": 22, "y": 9}, "ears": [[15, 18], [22, 25]], "earTop": 0}, "2_0": {"x": 0, "y": 48, "w": 27, "h": 16, "ax": 20, "ay": 16, "px": 15.0, "py": 7.8, "l": 0, "t": 0, "r": 27, "b": 16, "eyes": [{"x": 20, "y": 6, "w": 1, "h": 2, "fur": [192, 127, 69]}, {"x": 24, "y": 6, "w": 1, "h": 2, "fur": [168, 106, 53]}], "nose": {"x": 22, "y": 8}, "ears": [[16, 19], [22, 25]], "earTop": 0}, "2_1": {"x": 32, "y": 48, "w": 27, "h": 16, "ax": 20, "ay": 16, "px": 14.8, "py": 8.1, "l": 0, "t": 0, "r": 27, "b": 16, "eyes": [{"x": 20, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 24, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 16, "y": 9, "w": 1, "h": 1, "fur": [111, 66, 32]}], "nose": {"x": 22, "y": 8}, "ears": [[16, 19], [22, 25]], "earTop": 0}, "2_2": {"x": 64, "y": 48, "w": 28, "h": 16, "ax": 21, "ay": 16, "px": 15.5, "py": 8.1, "l": 0, "t": 0, "r": 28, "b": 16, "eyes": [{"x": 21, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 25, "y": 6, "w": 1, "h": 2, "fur": [168, 106, 53]}], "nose": {"x": 23, "y": 8}, "ears": [[17, 20], [24, 26]], "earTop": 0}, "2_3": {"x": 96, "y": 48, "w": 28, "h": 16, "ax": 21, "ay": 16, "px": 15.5, "py": 7.9, "l": 0, "t": 0, "r": 28, "b": 16, "eyes": [{"x": 21, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 25, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}], "nose": {"x": 23, "y": 8}, "ears": [[17, 20], [23, 26]], "earTop": 0}, "2_4": {"x": 128, "y": 48, "w": 28, "h": 16, "ax": 21, "ay": 16, "px": 15.6, "py": 8.1, "l": 0, "t": 0, "r": 28, "b": 16, "eyes": [{"x": 21, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 25, "y": 6, "w": 1, "h": 2, "fur": [192, 127, 69]}], "nose": {"x": 23, "y": 8}, "ears": [[17, 20], [23, 25]], "earTop": 0}, "2_5": {"x": 160, "y": 48, "w": 28, "h": 16, "ax": 21, "ay": 16, "px": 15.5, "py": 8.0, "l": 0, "t": 0, "r": 28, "b": 16, "eyes": [{"x": 21, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 25, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}], "nose": {"x": 23, "y": 8}, "ears": [[17, 20], [24, 26]], "earTop": 0}, "3_0": {"x": 0, "y": 72, "w": 27, "h": 13, "ax": 20, "ay": 13, "px": 15.2, "py": 6.9, "l": 0, "t": 0, "r": 27, "b": 13, "eyes": [{"x": 20, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 24, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 11, "y": 10, "w": 1, "h": 1, "fur": [111, 66, 32]}], "nose": {"x": 22, "y": 8}, "ears": [[16, 20], [22, 25]], "earTop": 0}, "3_1": {"x": 32, "y": 72, "w": 25, "h": 16, "ax": 19, "ay": 16, "px": 13.8, "py": 8.3, "l": 0, "t": 0, "r": 25, "b": 16, "eyes": [{"x": 19, "y": 5, "w": 1, "h": 2, "fur": [179, 115, 58]}], "nose": {"x": 22, "y": 1}, "ears": [[15, 18], [21, 23]], "earTop": 0}, "3_2": {"x": 64, "y": 72, "w": 25, "h": 17, "ax": 18, "ay": 17, "px": 13.5, "py": 8.2, "l": 0, "t": 0, "r": 25, "b": 17, "eyes": [{"x": 18, "y": 5, "w": 1, "h": 2, "fur": [179, 115, 58]}], "nose": {"x": 20, "y": 8}, "ears": [[15, 18], [21, 22]], "earTop": 0}, "3_3": {"x": 96, "y": 72, "w": 21, "h": 15, "ax": 14, "ay": 15, "px": 11.2, "py": 6.8, "l": 0, "t": 0, "r": 21, "b": 15, "eyes": [{"x": 14, "y": 5, "w": 1, "h": 2, "fur": [179, 115, 58]}], "nose": {"x": 16, "y": 8}, "ears": [[10, 13], [16, 19]], "earTop": 0}, "3_4": {"x": 128, "y": 72, "w": 27, "h": 15, "ax": 20, "ay": 15, "px": 14.9, "py": 6.2, "l": 0, "t": 0, "r": 27, "b": 15, "eyes": [{"x": 20, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 24, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}], "nose": {"x": 22, "y": 8}, "ears": [[16, 19], [23, 24]], "earTop": 0}, "3_5": {"x": 160, "y": 72, "w": 25, "h": 13, "ax": 18, "ay": 13, "px": 13.3, "py": 6.7, "l": 0, "t": 0, "r": 25, "b": 13, "eyes": [{"x": 18, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 22, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}], "nose": {"x": 20, "y": 8}, "ears": [[14, 17], [20, 23]], "earTop": 0}, "4_0": {"x": 0, "y": 96, "w": 21, "h": 14, "ax": 15, "ay": 14, "px": 10.1, "py": 7.0, "l": 0, "t": 0, "r": 21, "b": 14, "eyes": [{"x": 14, "y": 7, "w": 1, "h": 1, "fur": [81, 47, 23]}, {"x": 18, "y": 7, "w": 1, "h": 1, "fur": [153, 94, 46]}], "nose": {"x": 16, "y": 9}, "ears": [[11, 14], [17, 18]], "earTop": 0}, "4_1": {"x": 32, "y": 96, "w": 21, "h": 13, "ax": 15, "ay": 13, "px": 10.2, "py": 6.4, "l": 0, "t": 0, "r": 21, "b": 13, "eyes": [{"x": 14, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 18, "y": 6, "w": 1, "h": 2, "fur": [179, 115, 58]}], "nose": {"x": 16, "y": 8}, "ears": [[11, 13], [16, 19]], "earTop": 0}, "4_2": {"x": 64, "y": 96, "w": 19, "h": 16, "ax": 14, "ay": 16, "px": 9.2, "py": 9.9, "l": 0, "t": 4, "r": 19, "b": 16, "eyes": [{"x": 16, "y": 10, "w": 1, "h": 2, "fur": [179, 115, 58]}, {"x": 11, "y": 11, "w": 2, "h": 1, "fur": [168, 106, 53]}], "nose": {"x": 17, "y": 10}, "ears": [[10, 12], [15, 16]], "earTop": 4}, "4_3": {"x": 96, "y": 96, "w": 18, "h": 16, "ax": 12, "ay": 16, "px": 8.5, "py": 10.0, "l": 0, "t": 4, "r": 18, "b": 16, "eyes": [{"x": 5, "y": 10, "w": 2, "h": 3, "fur": [179, 115, 58]}, {"x": 10, "y": 11, "w": 2, "h": 1, "fur": [168, 106, 53]}, {"x": 14, "y": 11, "w": 2, "h": 1, "fur": [179, 115, 58]}], "nose": {"x": 15, "y": 6}, "ears": [[9, 10], [14, 15]], "earTop": 4}, "4_4": {"x": 128, "y": 96, "w": 21, "h": 13, "ax": 15, "ay": 13, "px": 9.9, "py": 6.1, "l": 0, "t": 0, "r": 21, "b": 13, "eyes": [{"x": 5, "y": 9, "w": 1, "h": 1, "fur": [153, 94, 46]}], "nose": {"x": 16, "y": 8}, "ears": [[11, 13], [17, 18]], "earTop": 0}, "4_5": {"x": 160, "y": 96, "w": 20, "h": 13, "ax": 14, "ay": 13, "px": 9.5, "py": 6.3, "l": 0, "t": 0, "r": 20, "b": 13, "eyes": [{"x": 16, "y": 7, "w": 1, "h": 1, "fur": [168, 106, 53]}], "nose": {"x": 18, "y": 6}, "ears": [[10, 13], [16, 17]], "earTop": 0}, "5_0": {"x": 0, "y": 120, "w": 18, "h": 15, "ax": 12, "ay": 15, "px": 9.6, "py": 7.7, "l": 0, "t": 0, "r": 18, "b": 15, "eyes": [{"x": 15, "y": 6, "w": 1, "h": 2, "fur": [168, 106, 53]}], "nose": {"x": 14, "y": 8}, "ears": [[8, 11], [15, 15]], "earTop": 0}, "5_1": {"x": 32, "y": 120, "w": 16, "h": 15, "ax": 10, "ay": 15, "px": 8.2, "py": 7.5, "l": 0, "t": 0, "r": 16, "b": 15, "eyes": [], "nose": {"x": 11, "y": 13}, "ears": [[5, 8], [12, 14]], "earTop": 0}, "5_2": {"x": 64, "y": 120, "w": 16, "h": 15, "ax": 6, "ay": 15, "px": 6.6, "py": 7.4, "l": 0, "t": 0, "r": 16, "b": 15, "eyes": [], "nose": {"x": 13, "y": 10}, "ears": [[1, 4], [7, 10]], "earTop": 0}, "5_3": {"x": 96, "y": 120, "w": 21, "h": 16, "ax": 10, "ay": 16, "px": 10.2, "py": 8.0, "l": 4, "t": 0, "r": 19, "b": 16, "eyes": [], "nose": {"x": 16, "y": 11}, "ears": [[6, 9], [12, 13]], "earTop": 0}, "5_4": {"x": 128, "y": 120, "w": 22, "h": 16, "ax": 12, "ay": 16, "px": 10.2, "py": 8.0, "l": 2, "t": 0, "r": 18, "b": 16, "eyes": [], "nose": {"x": 15, "y": 11}, "ears": [[8, 10], [14, 16]], "earTop": 0}, "5_5": {"x": 160, "y": 120, "w": 15, "h": 17, "ax": 5, "ay": 17, "px": 6.4, "py": 8.4, "l": 0, "t": 0, "r": 15, "b": 17, "eyes": [{"x": 5, "y": 8, "w": 1, "h": 1, "fur": [153, 94, 46]}], "nose": {"x": 8, "y": 13}, "ears": [[1, 4], [8, 9]], "earTop": 0}}, "image": "data:image/png;base64,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"};

// ---- config.js ----
// Konstanta global, nama frame, dan parameter "rasa" gerakan.
// Semua satuan jarak memakai "lp" = 1 piksel seni (1 piksel pada sprite sheet asli).

// Kanvas logis (piksel seni) dan titik jangkar sprite (tengah kepala, garis tanah).
const CW = 44;
const CH = 38;
const AX = 22;
const AY = 34;

// Nama frame = "baris_kolom" pada lembar sprite referensi.
const FR = {
  rest: ['0_0', '0_5'],
  tailFlickA: '0_1',
  tailUp: '0_4',
  tailLow: '0_2',
  tailStraight: '0_3',
  walk: ['1_0', '1_1', '1_2', '1_3', '1_4', '1_5'],
  run: ['2_0', '2_1', '2_2', '2_3', '2_4', '2_5'],
  crouch: '3_0',
  launch: '3_1',
  reach: '3_2',
  tuck: '3_3',
  bow: '3_4',
  settle: '3_5',
  loafA: '4_0',
  loafB: '4_1',
  snoozeA: '4_2',
  snoozeB: '4_3',
  sleepA: '4_4',
  sleepB: '4_5',
  spin: ['5_0', '5_1', '5_2', '5_3', '5_4', '5_5'],
};

// Baris sprite tempat tubuh boleh diregangkan/ditekan (duplikasi/penghapusan 1 baris piksel).
const SPLIT_BY_ROW = { 0: 15, 1: 10, 2: 9, 3: 7, 4: 8, 5: 9 };

const TUNE = {
  gravity: 230,        // lp/s^2
  walkSpeed: 15,       // lp/s
  walkAccel: 70,
  walkStride: 10,      // lp per siklus 6 frame (menyinkronkan kaki dengan kecepatan)
  runSpeed: 46,
  runAccel: 120,
  runStride: 24,
  near: 130,           // pointer dianggap "mendekat"
  far: 190,            // pointer dianggap "menjauh" (histeresis)
  stopDistance: 26,    // jarak berhenti dari pointer saat mendekat
  clickCooldown: 0.65, // detik
  edgeMargin: 15,      // lp dari tepi layar
};

const DEFAULT_MESSAGES = ['Meong!', 'Miaw~', 'Prrr...', 'Meow!', 'Halo!'];

// ---- util.js ----
// Utilitas kecil: matematika dan RNG yang bisa di-seed (supaya perilaku bisa diuji deterministik).
const TAU = Math.PI * 2;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const sign = (v) => (v < 0 ? -1 : 1);

function makeRng(seed) {
  let s = (seed >>> 0) || ((Math.random() * 4294967296) >>> 0);
  const next = function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const rng = {
    next,
    range: (a, b) => a + (b - a) * next(),
    int: (a, b) => Math.floor(a + (b - a + 1) * next()),
    chance: (p) => next() < p,
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    // items: [{ w: bobot, ... }] -> item terpilih (bobot 0 tidak pernah terpilih)
    weighted(items) {
      let total = 0;
      for (const it of items) total += Math.max(0, it.w);
      if (total <= 0) return null;
      let r = next() * total;
      for (const it of items) {
        r -= Math.max(0, it.w);
        if (r <= 0) return it;
      }
      return items[items.length - 1];
    },
  };
  return rng;
}

// ---- animator.js ----
// Animator: memilih frame sprite. Tiga mode: loop berbasis waktu, loop berbasis jarak
// (kaki sinkron dengan kecepatan), dan urutan berdurasi (mis. berbaring -> tidur).
class Animator {
  constructor() {
    this.frame = '0_0';
    this.mode = 'hold';
    this.keys = [];
    this.fps = 8;
    this.pos = 0;
    this.items = null;
    this.idx = 0;
    this.t = 0;
    this.cur = null;
    this.done = false;
    this.loopSeq = false;
  }
  hold(key) {
    this.mode = 'hold';
    this.frame = key;
    this.cur = null;
  }
  loop(keys, fps, phase = 0) {
    this.mode = 'loop';
    this.keys = keys;
    this.fps = fps;
    this.pos = phase;
    this.frame = keys[Math.floor(this.pos) % keys.length];
    this.cur = null;
  }
  // Mode jarak: panggil advance(jumlahFrame) dari logika gerak.
  distance(keys) {
    this.mode = 'distance';
    this.keys = keys;
    this.cur = null;
    if (this.pos >= keys.length) this.pos = 0;
    this.frame = keys[Math.floor(this.pos) % keys.length];
  }
  advance(n) {
    if (this.mode !== 'distance') return;
    this.pos += n;
    this.frame = this.keys[Math.floor(this.pos) % this.keys.length];
  }
  // items: [{ f: frame, d: durasi, expr?, stretch? }]
  seq(items, loop = false) {
    this.mode = 'seq';
    this.items = items;
    this.idx = 0;
    this.t = 0;
    this.done = false;
    this.loopSeq = loop;
    this.cur = items[0];
    this.frame = items[0].f;
  }
  update(dt) {
    if (this.mode === 'loop') {
      this.pos += dt * this.fps;
      this.frame = this.keys[Math.floor(this.pos) % this.keys.length];
    } else if (this.mode === 'seq' && !this.done) {
      this.t += dt;
      while (this.t >= this.cur.d) {
        this.t -= this.cur.d;
        this.idx++;
        if (this.idx >= this.items.length) {
          if (this.loopSeq) {
            this.idx = 0;
          } else {
            this.idx = this.items.length - 1;
            this.done = true;
            this.t = 0;
            break;
          }
        }
        this.cur = this.items[this.idx];
      }
      this.frame = this.cur.f;
    }
  }
}

// ---- sprites.js ----
const rgb = (c) => `rgb(${c[0]},${c[1]},${c[2]})`;
const BLACK = '#0a0502';
const MOUTH = '#2b190c';

// Pembungkus atlas sprite. Semua gambar memakai koordinat lokal dengan (0,0) = titik jangkar
// frame (tengah kepala, garis tanah), sehingga rotasi/mirror dilakukan lewat transform kanvas.
class SpriteSheet {
  constructor(atlas) {
    this.meta = atlas.frames;
    this.img = new Image();
    this.ready = new Promise((resolve, reject) => {
      this.img.onload = () => resolve(this);
      this.img.onerror = () => reject(new Error('PixelCat: gagal memuat atlas sprite'));
    });
    this.img.src = atlas.image;
  }

  info(key) {
    return this.meta[key];
  }

  splitRow(key) {
    return SPLIT_BY_ROW[key[0]] ?? Math.round(this.meta[key].h * 0.6);
  }

  // Mata: dipakai untuk kedip/ekspresi. Frame sit yang deteksinya tidak lengkap memakai
  // posisi relatif terhadap jangkar kepala (bentuk kepala sama di semua frame sit).
  eyesOf(key) {
    const m = this.meta[key];
    if (!m) return [];
    const row = key[0];
    if (row === '0') {
      if (m.eyes.length === 2) return m.eyes;
      const fur = (m.eyes[0] && m.eyes[0].fur) || [185, 120, 60];
      return [-3, 2].map((dx) => ({ x: m.ax + dx, y: 7, w: 1, h: 2, fur }));
    }
    if (key === '3_0' || key === '3_5' || key === '4_0' || key === '4_1') return m.eyes.filter((e) => e.h <= 2).slice(0, 2);
    return [];
  }

  earsOf(key) {
    const m = this.meta[key];
    if (!m) return [];
    if (key[0] === '0') return [[m.ax - 7, m.ax - 4], [m.ax, m.ax + 3]];
    return m.ears || [];
  }

  // o: { stretch, split, expr, ear }
  draw(ctx, key, o = {}) {
    const m = this.meta[key];
    if (!m) return;
    const img = this.img;
    const { x: sx, y: sy, w, h, ax, ay } = m;
    const k = o.stretch | 0;
    const s = o.split ?? this.splitRow(key);
    let up = 0;
    if (k === 0) {
      ctx.drawImage(img, sx, sy, w, h, -ax, -ay, w, h);
    } else if (k > 0) {
      // regangkan: duplikasi baris s sebanyak k kali (badan memanjang, kaki tetap di tanah)
      ctx.drawImage(img, sx, sy, w, s, -ax, -ay - k, w, s);
      ctx.drawImage(img, sx, sy + s, w, 1, -ax, -ay + s - k, w, k + 1);
      ctx.drawImage(img, sx, sy + s + 1, w, h - s - 1, -ax, -ay + s + 1, w, h - s - 1);
      up = -k;
    } else {
      // tekan: buang |k| baris pada s
      const r = -k;
      ctx.drawImage(img, sx, sy, w, s, -ax, -ay + r, w, s);
      ctx.drawImage(img, sx, sy + s + r, w, h - s - r, -ax, -ay + s + r, w, h - s - r);
      up = r;
    }
    this.paintFace(ctx, key, o, up);
  }

  paintFace(ctx, key, o, up) {
    const m = this.meta[key];
    const expr = o.expr || 'normal';
    if (expr !== 'normal') {
      for (const e of this.eyesOf(key)) {
        const x = -m.ax + e.x;
        const y = -m.ay + e.y + up;
        if (expr === 'blink' || expr === 'squint' || expr === 'dizzy') {
          if (e.h >= 2) {
            ctx.fillStyle = rgb(e.fur);
            ctx.fillRect(x, y, e.w, e.h - 1);
          }
        } else if (expr === 'wide') {
          ctx.fillStyle = BLACK;
          ctx.fillRect(x, y - 1, e.w, 1);
        }
      }
      if (expr === 'meow' && m.nose && key[0] !== '5') {
        ctx.fillStyle = MOUTH;
        ctx.fillRect(-m.ax + m.nose.x, -m.ay + m.nose.y + 1 + up, 1, 1);
      }
    }
    // kibasan telinga: telinga memendek 1 baris
    if (o.ear != null && o.ear >= 0) {
      const ears = this.earsOf(key);
      const range = ears[o.ear];
      if (range) {
        const top = (m.earTop || 0);
        const wd = range[1] - range[0] + 1;
        const dx = -m.ax + range[0];
        const dy = -m.ay + top + up;
        ctx.clearRect(dx, dy, wd, 2);
        ctx.drawImage(this.img, m.x + range[0], m.y + top, wd, 2, dx, dy + 1, wd, 2);
      }
    }
  }
}

// ---- fx.js ----
// Efek partikel piksel (Z tidur, hati, bintang pusing). Digambar di kanvas logis, dengan outline
// gelap supaya terlihat di latar terang maupun gelap.
const BITMAPS = {
  z4: ['####', '..#.', '.#..', '####'],
  z5: ['#####', '...#.', '..#..', '.#...', '#####'],
  heart: ['.#.#.', '#####', '#####', '.###.', '..#..'],
  star: ['.#.', '###', '.#.'],
  spark: ['#'],
};
const COLORS = {
  z4: '#fae4c8',
  z5: '#fae4c8',
  heart: '#f0688c',
  star: '#ffe070',
  spark: '#ffe070',
};
const OUTLINE = '#0a0502';

function drawBitmap(ctx, rows, x, y, fill) {
  ctx.fillStyle = OUTLINE;
  for (let j = 0; j < rows.length; j++) {
    for (let i = 0; i < rows[j].length; i++) {
      if (rows[j][i] !== '#') continue;
      ctx.fillRect(x + i - 1, y + j, 1, 1);
      ctx.fillRect(x + i + 1, y + j, 1, 1);
      ctx.fillRect(x + i, y + j - 1, 1, 1);
      ctx.fillRect(x + i, y + j + 1, 1, 1);
    }
  }
  ctx.fillStyle = fill;
  for (let j = 0; j < rows.length; j++) {
    for (let i = 0; i < rows[j].length; i++) {
      if (rows[j][i] === '#') ctx.fillRect(x + i, y + j, 1, 1);
    }
  }
}

class Fx {
  constructor() {
    this.list = [];
    this.max = 14;
  }
  get active() {
    return this.list.length > 0;
  }
  clear() {
    this.list.length = 0;
  }
  // x,y: posisi pada kanvas logis (piksel seni)
  spawn(type, x, y, o = {}) {
    if (this.list.length >= this.max) this.list.shift();
    this.list.push({ type, x, y, t: 0, life: o.life || 1.6, vx: o.vx || 0, vy: o.vy ?? -7, phase: o.phase || 0,
      orbit: o.orbit || null, cx: x, cy: y });
  }
  // Bintang pusing yang mengorbit di atas kepala
  orbitStars(cx, cy, n = 3, life = 1.8) {
    for (let i = 0; i < n; i++) {
      this.spawn('star', cx, cy, { life, vy: 0, orbit: { r: 7, a: (i / n) * TAU, w: 7 } });
    }
  }
  update(dt) {
    for (const p of this.list) {
      p.t += dt;
      if (p.orbit) {
        p.orbit.a += p.orbit.w * dt;
        p.x = p.cx + Math.cos(p.orbit.a) * p.orbit.r;
        p.y = p.cy + Math.sin(p.orbit.a) * p.orbit.r * 0.35;
      } else {
        p.x += p.vx * dt + Math.sin(p.t * 3 + p.phase) * 3 * dt;
        p.y += p.vy * dt;
      }
    }
    this.list = this.list.filter((p) => p.t < p.life);
  }
  // pindahkan titik pusat orbit (mengikuti kepala)
  follow(cx, cy) {
    for (const p of this.list) {
      if (p.orbit) {
        p.cx = cx;
        p.cy = cy;
      }
    }
  }
  draw(ctx) {
    for (const p of this.list) {
      const k = p.t / p.life;
      let type = p.type;
      if (type === 'z4' && k > 0.45) type = 'z5';
      const rows = BITMAPS[type];
      ctx.globalAlpha = k > 0.7 ? Math.max(0, 1 - (k - 0.7) / 0.3) : 1;
      drawBitmap(ctx, rows, Math.round(p.x), Math.round(p.y), COLORS[type]);
    }
    ctx.globalAlpha = 1;
  }
}

// ---- renderer.js ----
// Renderer: menggambar pose ke kanvas logis CW x CH (1 px kanvas = 1 piksel seni). Kanvas diperbesar
// oleh CSS dengan image-rendering: pixelated, sehingga piksel tetap tajam.
class Renderer {
  constructor(canvas, sheet, fx) {
    this.canvas = canvas;
    this.sheet = sheet;
    this.fx = fx;
    canvas.width = CW;
    canvas.height = CH;
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    // pivot rotasi salto = pusat massa pose "tuck" relatif terhadap jangkar
    const t = sheet.info('3_3');
    this.pivot = { x: Math.round(t.px - t.ax), y: Math.round(t.py - t.ay) };
    this.sig = '';
    this.bounds = { x0: 0, y0: 0, x1: CW, y1: CH };
  }

  // Posisi puncak kepala pada kanvas (untuk partikel Z / hati / bintang)
  head(frame, pose) {
    const m = this.sheet.info(frame);
    return { x: AX + (pose.offX || 0), y: AY - (m ? m.h : 20) - (pose.stretch > 0 ? pose.stretch : 0) };
  }

  // Kotak area klik (dalam piksel seni) berdasarkan sprite yang sedang digambar
  computeBounds(frame, pose, facing) {
    if (pose.angle) return { x0: 0, y0: 0, x1: CW, y1: CH };
    const m = this.sheet.info(frame);
    const pad = 2;
    let x0, x1;
    if (facing >= 0) {
      x0 = AX - m.ax;
      x1 = x0 + m.w;
    } else {
      x1 = AX + m.ax;
      x0 = x1 - m.w;
    }
    const st = pose.stretch || 0;
    const y1 = AY + 1;
    const y0 = AY - m.ay - (st > 0 ? st : 0);
    return { x0: Math.max(0, x0 - pad + (pose.offX || 0)), x1: Math.min(CW, x1 + pad + (pose.offX || 0)),
      y0: Math.max(0, y0 - pad), y1: Math.min(CH, y1) };
  }

  // Menggambar ulang hanya jika pose berubah atau ada partikel aktif. Mengembalikan true jika digambar.
  draw(frame, pose, facing, fxActive) {
    const sig = `${frame}|${facing}|${pose.stretch}|${pose.angle}|${pose.expr}|${pose.ear}|${pose.offX}|${pose.split}`;
    if (sig === this.sig && !fxActive) return false;
    this.sig = sig;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, CW, CH);
    ctx.save();
    ctx.translate(AX + (pose.offX || 0), AY);
    ctx.scale(facing >= 0 ? 1 : -1, 1);
    if (pose.angle) {
      ctx.translate(this.pivot.x, this.pivot.y);
      ctx.rotate(pose.angle);
      ctx.translate(-this.pivot.x, -this.pivot.y);
    }
    this.sheet.draw(ctx, frame, { stretch: pose.stretch, split: pose.split ?? undefined, expr: pose.expr, ear: pose.ear });
    ctx.restore();
    if (fxActive) this.fx.draw(ctx);
    this.bounds = this.computeBounds(frame, pose, facing);
    return true;
  }
}

// ---- brain.js ----
// ---------------------------------------------------------------------------------------------
// BRAIN: state machine perilaku kucing. Tidak menyentuh DOM / kanvas.
// Setiap state punya: priority, enter/update/exit, locked() (tidak boleh di-interrupt),
// onRequest() (opsional, menangani permintaan state lain) dan moves (apakah posisi diintegrasi).
// Permintaan pindah state lewat request(); yang gagal bisa di-antre (pending) sebentar.
// ---------------------------------------------------------------------------------------------

const REDUCED_BLOCKED = new Set(['WALK', 'RUN', 'JUMP', 'APPROACH', 'CHASE_TAIL', 'STRETCH', 'DIZZY']);
const WAG = ['0_1', '0_4', '0_1', '0_2'];
const smooth = (p) => p * p * (3 - 2 * p);

// Pengendali gerak horizontal: akselerasi halus, deselerasi sebelum target (tidak melewati target).
function drive(b, target, speed, accel, dt) {
  const w = b.w;
  const d = target - w.x;
  const dir = Math.sign(d);
  if (Math.abs(w.vx) < 2 && dir !== 0) w.facing = dir;
  const vDes = dir * Math.min(speed, Math.sqrt(2 * accel * Math.abs(d)));
  const dv = vDes - w.vx;
  const m = accel * dt;
  w.vx += Math.abs(dv) <= m ? dv : Math.sign(dv) * m;
  if (Math.abs(w.vx) > 0.8) w.facing = w.vx < 0 ? -1 : 1;
  const rem = Math.abs(d);
  if (rem < 0.7) {
    w.x = target;
    w.vx = 0;
  }
  return rem;
}

const STATES = {
  // ------------------------------------------------------------------ IDLE / bernapas
  IDLE: {
    priority: 10,
    moves: true,
    enter(b, p) {
      const sd = b.sd, r = b.rng;
      sd.dwell = p.dwell ?? r.range(2.8, 6.8);
      sd.blink = r.range(1.2, 3.6);
      sd.ear = r.range(3, 8);
      sd.flick = r.range(1.6, 4.5);
      sd.look = r.range(3, 7);
      sd.expr = r.range(6, 11);
      sd.mode = 'rest';
      sd.restSwap = r.range(1.8, 3.2);
      b.stateExpr = 'normal';
      b.pose.split = null;
      b.anim.hold(r.pick(FR.rest));
      if (p.look) {
        b.w.facing *= -1;
        sd.dwell = Math.min(sd.dwell, 3.6);
      }
      if (p.expr) b.setExpr(p.expr, p.exprT || 0.9);
    },
    update(b, dt) {
      const sd = b.sd, w = b.w, r = b.rng;
      w.vx *= Math.exp(-14 * dt);
      if (Math.abs(w.vx) < 0.2) w.vx = 0;
      b.pose.stretch = Math.sin((b.t * TAU) / 3.4) > 0.25 ? 1 : 0; // napas
      if (sd.mode === 'flick') {
        if (b.anim.done) {
          sd.mode = 'rest';
          b.anim.hold(r.pick(FR.rest));
          sd.restSwap = r.range(1.8, 3.2);
        }
      } else {
        sd.restSwap -= dt;
        if (sd.restSwap <= 0) {
          b.anim.hold(r.pick(FR.rest));
          sd.restSwap = r.range(1.8, 3.4);
        }
        sd.flick -= dt;
        if (sd.flick <= 0) {
          sd.flick = r.range(2.5, 6);
          sd.mode = 'flick';
          const seqs = [
            [{ f: '0_1', d: 0.15 }, { f: '0_4', d: 0.19 }, { f: '0_1', d: 0.15 }, { f: '0_0', d: 0.12 }],
            [{ f: '0_4', d: 0.2 }, { f: '0_1', d: 0.14 }, { f: '0_4', d: 0.2 }, { f: '0_1', d: 0.14 }, { f: '0_2', d: 0.14 }],
          ];
          b.anim.seq(r.pick(seqs));
        }
      }
      sd.blink -= dt;
      if (sd.blink <= 0) {
        b.setExpr('blink', 0.12);
        sd.blink = r.chance(0.2) ? 0.3 : r.range(1.8, 4.8);
      }
      sd.ear -= dt;
      if (sd.ear <= 0) {
        b.earTwitch(r.chance(0.5) ? 0 : 1, 0.2);
        sd.ear = r.range(3, 9);
      }
      sd.look -= dt;
      if (sd.look <= 0) {
        if (!b.pNear) w.facing *= -1; // menoleh
        sd.look = r.range(3, 8);
      }
      sd.expr -= dt;
      if (sd.expr <= 0) {
        b.setExpr(r.chance(0.65) ? 'squint' : 'wide', r.range(0.7, 1.4));
        sd.expr = r.range(6, 12);
      }
      if (b.t >= sd.dwell) b.chooseNext();
    },
  },

  // ------------------------------------------------------------------ WALK
  WALK: {
    priority: 20,
    moves: true,
    enter(b, p) {
      const sd = b.sd;
      sd.target = clamp(p.x, b.w.xMin, b.w.xMax);
      sd.speed = TUNE.walkSpeed * (p.speedMul || 1);
      b.stateExpr = 'normal';
      b.pose.split = null;
      b.anim.distance(FR.walk);
      if (Math.abs(b.w.vx) < 2) b.w.facing = sign(sd.target - b.w.x);
    },
    update(b, dt) {
      const w = b.w, sd = b.sd;
      const rem = drive(b, sd.target, sd.speed, TUNE.walkAccel, dt);
      b.anim.advance((Math.abs(w.vx) * dt) / (TUNE.walkStride / 6));
      if ((rem < 1.2 && Math.abs(w.vx) < 2) || b.t > 14) {
        w.vx = 0;
        b.finish();
      }
    },
  },

  // ------------------------------------------------------------------ RUN
  RUN: {
    priority: 30,
    moves: true,
    enter(b, p) {
      const sd = b.sd;
      sd.target = clamp(p.x, b.w.xMin, b.w.xMax);
      b.stateExpr = 'normal';
      b.pose.split = null;
      b.anim.distance(FR.run);
      if (Math.abs(b.w.vx) < 2) b.w.facing = sign(sd.target - b.w.x);
    },
    update(b, dt) {
      const w = b.w, sd = b.sd;
      const rem = drive(b, sd.target, TUNE.runSpeed, TUNE.runAccel, dt);
      b.anim.advance((Math.abs(w.vx) * dt) / (TUNE.runStride / 6));
      if ((rem < 1.2 && Math.abs(w.vx) < 2) || b.t > 10) {
        w.vx = 0;
        b.finish();
      }
    },
  },

  // ------------------------------------------------------------------ JUMP (lompat, hop berulang, salto)
  JUMP: {
    priority: 40,
    locked: (b) => b.sd.phase === 'air',
    enter(b, p) {
      const sd = b.sd, w = b.w;
      sd.h = p.h ?? 12;
      sd.dx = p.dx ?? 0;
      sd.flip = p.flip ?? 0;
      sd.chain = p.chain ?? 0;
      sd.crouch = p.crouch ?? 0.16;
      sd.hop = !!p.hop;
      sd.phase = 'crouch';
      sd.pt = 0;
      b.stateExpr = 'normal';
      b.pose.split = null;
      b.anim.hold(FR.crouch);
      if (Math.abs(sd.dx) > 1) w.facing = sign(sd.dx);
      if (p.expr) b.setExpr(p.expr, 1.2);
    },
    update(b, dt) {
      const sd = b.sd, w = b.w, g = TUNE.gravity;
      sd.pt += dt;
      if (sd.phase === 'crouch') {
        b.pose.stretch = -1;
        w.vx *= Math.exp(-14 * dt);
        w.x += w.vx * dt;
        if (sd.pt >= sd.crouch) {
          // tolakan: lintasan parabola
          const tx = clamp(w.x + sd.dx, w.xMin, w.xMax);
          sd.vy0 = Math.sqrt(2 * g * sd.h);
          sd.T = (2 * sd.vy0) / g;
          w.vy = sd.vy0;
          w.vx = (tx - w.x) / sd.T;
          sd.phase = 'air';
          sd.pt = 0;
          b.pose.stretch = 0;
        }
      } else if (sd.phase === 'air') {
        w.vy -= g * dt;
        w.y += w.vy * dt;
        w.x = clamp(w.x + w.vx * dt, w.xMin, w.xMax);
        const r = w.vy / sd.vy0;
        if (sd.flip) {
          const p = clamp(sd.pt / sd.T, 0, 1);
          const ang = sd.flip * smooth(p) * TAU;
          const step = TAU / 8;
          b.pose.angle = Math.round(ang / step) * step; // rotasi per 45° agar tetap bergaya pixel-art
          b.anim.hold(p < 0.12 ? FR.reach : p < 0.8 ? FR.tuck : FR.bow);
          b.pose.stretch = 0;
        } else {
          let f = FR.reach;
          if (sd.pt < 0.06) f = FR.launch;
          else if (r > 0.45) f = FR.reach;
          else if (r > -0.2) f = FR.tuck;
          else f = FR.bow;
          b.anim.hold(f);
          b.pose.stretch = r > 0.6 || r < -0.7 ? 1 : 0;
        }
        if (w.y <= 0 && w.vy < 0) {
          w.y = 0;
          w.vy = 0;
          b.pose.angle = 0;
          if (sd.chain > 0) {
            // hop berikutnya: tinggi, jarak, dan jeda sedikit berbeda
            const r2 = b.rng;
            sd.chain--;
            sd.h = clamp(sd.h * r2.range(0.8, 1.2), 5, 14);
            sd.dx = r2.range(-12, 12);
            sd.crouch = r2.range(0.04, 0.09);
            sd.phase = 'crouch';
            sd.pt = 0;
            b.anim.hold(FR.settle);
            if (Math.abs(sd.dx) > 1) w.facing = sign(sd.dx);
          } else {
            b.go('LAND', { vx: w.vx * 0.25 });
          }
        }
      }
    },
    exit(b) {
      b.pose.angle = 0;
      b.pose.stretch = 0;
    },
  },

  // ------------------------------------------------------------------ LAND (mendarat, squash ringan)
  LAND: {
    priority: 90,
    moves: true,
    locked: () => true,
    enter(b, p) {
      b.w.y = 0;
      b.w.vy = 0;
      b.w.vx = p.vx ?? b.w.vx * 0.3;
      b.pose.split = null;
      b.stateExpr = p.expr || 'normal';
      b.anim.seq([
        { f: FR.bow, d: 0.07, stretch: -2 },
        { f: FR.settle, d: 0.12, stretch: -1 },
        { f: FR.settle, d: 0.08, stretch: 0 },
      ]);
    },
    update(b, dt) {
      b.w.vx *= Math.exp(-10 * dt);
      if (b.anim.done) b.finish();
    },
  },

  // ------------------------------------------------------------------ FALL (setelah dilepas dari drag)
  FALL: {
    priority: 95,
    enter(b, p) {
      b.w.vy = p.vy || 0;
      b.w.vx = clamp(p.vx || 0, -35, 35);
      b.stateExpr = 'wide';
      b.pose.split = null;
      b.anim.hold(FR.tuck);
    },
    update(b, dt) {
      const w = b.w;
      w.vy -= TUNE.gravity * dt;
      w.y += w.vy * dt;
      w.x = clamp(w.x + w.vx * dt, w.xMin, w.xMax);
      b.anim.hold(w.vy > 20 ? FR.reach : w.vy > -30 ? FR.tuck : FR.bow);
      if (w.y <= 0) {
        w.y = 0;
        b.go('LAND', { vx: w.vx * 0.3, expr: 'wide' });
      }
    },
  },

  // ------------------------------------------------------------------ DRAG (diseret pengunjung)
  DRAG: {
    priority: 100,
    enter(b) {
      const sd = b.sd, w = b.w, p = b.p;
      sd.grabX = p.x - w.x;
      sd.grabY = p.y - (w.ground - w.y);
      sd.prevX = w.x;
      sd.vxs = 0;
      sd.vys = 0;
      sd.prevY = w.y;
      w.vx = 0;
      w.vy = 0;
      b.stateExpr = 'wide';
      b.pose.split = null;
      b.anim.hold(FR.tuck);
      b.fx.clear();
    },
    update(b, dt) {
      const sd = b.sd, w = b.w, p = b.p;
      const tx = clamp(p.x - sd.grabX, w.xMin, w.xMax);
      const ty = clamp(w.ground - (p.y - sd.grabY), 0, Math.max(0, w.ground - 24));
      const k = Math.min(1, 22 * dt);
      w.x = lerp(w.x, tx, k);
      w.y = lerp(w.y, ty, k);
      sd.vxs = lerp(sd.vxs, (w.x - sd.prevX) / Math.max(dt, 1e-3), 0.25);
      sd.vys = lerp(sd.vys, (w.y - sd.prevY) / Math.max(dt, 1e-3), 0.25);
      sd.prevX = w.x;
      sd.prevY = w.y;
      if (Math.abs(sd.vxs) > 12) w.facing = sd.vxs < 0 ? -1 : 1;
      // kaki menjuntai: bergantian pose "tuck" dan "reach" mengikuti gerakan
      const swing = Math.abs(sd.vxs) > 28 || Math.abs(sd.vys) > 40;
      b.anim.hold(swing && Math.floor(b.t * 7) % 2 === 0 ? FR.reach : FR.tuck);
    },
    exit(b) {
      b.pose.stretch = 0;
    },
  },

  // ------------------------------------------------------------------ STRETCH (meregangkan tubuh)
  STRETCH: {
    priority: 25,
    enter(b) {
      b.pose.split = null;
      b.stateExpr = 'normal';
      b.anim.seq([
        { f: FR.crouch, d: 0.32 },
        { f: FR.bow, d: 1.7, expr: 'squint' },
        { f: FR.settle, d: 0.3 },
      ]);
    },
    update(b) {
      if (b.anim.done) b.finish();
    },
  },

  // ------------------------------------------------------------------ SLEEP (berbaring, menggulung, tidur, bangun)
  SLEEP: {
    priority: 5,
    locked: () => false,
    onRequest(b, name, params, pr) {
      if (name === 'SLEEP') return true;
      if (pr < 50) return true; // aktivitas otomatis diabaikan saat tidur
      if (name === 'NOTICE') return true; // pointer mendekat ditangani sendiri (telinga bergerak dulu)
      if (b.sd.phase !== 'waking') b.beginWake(true);
      b.pending = { name, params, pr, until: b.time + 4 };
      return true;
    },
    enter(b, p) {
      const sd = b.sd;
      sd.phase = p.instant ? 'asleep' : 'down';
      sd.z = 0.8;
      sd.nearT = 0;
      sd.twitched = false;
      sd.dur = b.rng.range(28, 60);
      b.stateExpr = 'normal';
      b.pose.split = 8;
      if (p.instant) {
        b.anim.seq([{ f: FR.sleepA, d: 1.7 }, { f: FR.sleepB, d: 1.7 }], true);
      } else {
        b.anim.seq([
          { f: '0_0', d: 0.35, expr: 'squint' },
          { f: FR.settle, d: 0.55 },
          { f: FR.loafA, d: 0.6 },
          { f: FR.loafB, d: 0.7, expr: 'blink' },
          { f: FR.snoozeA, d: 0.9 },
        ]);
      }
    },
    update(b, dt) {
      const sd = b.sd, w = b.w;
      w.vx *= Math.exp(-14 * dt);
      if (sd.phase === 'down') {
        b.pose.split = null;
        if (b.anim.done) {
          sd.phase = 'asleep';
          sd.t0 = b.t;
          b.pose.split = 8;
          b.anim.seq([{ f: FR.sleepA, d: 1.7 }, { f: FR.sleepB, d: 1.7 }], true);
        }
        if (b.pNear && b.hover) b.beginWake(true);
      } else if (sd.phase === 'asleep') {
        b.pose.stretch = Math.sin((b.t * TAU) / 4.2) > 0.1 ? 1 : 0; // napas pelan
        sd.z -= dt;
        if (sd.z <= 0) {
          const h = b.env.head();
          b.fx.spawn('z4', h.x + 2, h.y - 1, { life: 2.4, vy: -6, vx: 1.5, phase: b.rng.range(0, 6) });
          sd.z = 1.8;
        }
        if (b.pNear) sd.nearT += dt;
        else sd.nearT = Math.max(0, sd.nearT - dt);
        if (sd.nearT > 0.8 && !sd.twitched) {
          sd.twitched = true;
          sd.wakeAt = b.t + 0.9;
          b.earTwitch(0, 0.25);
        } else if (sd.twitched && b.t < sd.wakeAt && Math.floor(b.t * 5) % 3 === 0 && !b.pose.ear) {
          b.earTwitch(1, 0.2);
        }
        if (sd.twitched && b.t >= sd.wakeAt) b.beginWake(false);
        else if (b.t - sd.t0 > sd.dur) b.beginWake(false);
      } else if (sd.phase === 'waking') {
        b.pose.stretch = 0;
        if (b.anim.done) b.finish();
      }
    },
    exit(b) {
      b.pose.stretch = 0;
      b.pose.split = null;
    },
  },

  // ------------------------------------------------------------------ CHASE_TAIL -> DIZZY
  CHASE_TAIL: {
    priority: 28,
    enter(b) {
      const r = b.rng;
      const loops = r.int(3, 5);
      const items = [{ f: '0_4', d: 0.4 }, { f: '0_1', d: 0.28, flip: true }];
      for (let i = 0; i < loops; i++) {
        FR.spin.forEach((f, j) => items.push({ f, d: j === 0 ? 0.11 : 0.095, flip: j === 0 && i > 0 }));
      }
      b.pose.split = null;
      b.stateExpr = 'normal';
      b.anim.seq(items);
    },
    update(b, dt) {
      b.w.vx *= Math.exp(-12 * dt);
      if (b.anim.done) b.go('DIZZY');
    },
  },
  DIZZY: {
    priority: 28,
    enter(b) {
      const sd = b.sd;
      sd.dur = 1.9;
      b.pose.split = null;
      b.stateExpr = 'dizzy';
      b.anim.hold('0_0');
      const h = b.env.head();
      b.fx.orbitStars(h.x, h.y - 3, 3, sd.dur);
    },
    update(b, dt) {
      const sd = b.sd;
      b.w.vx *= Math.exp(-12 * dt);
      b.pose.offX = Math.round(Math.sin(b.t * 9) * 1.2); // oleng
      b.pose.stretch = Math.sin(b.t * 8) > 0.4 ? 1 : 0;
      const h = b.env.head();
      b.fx.follow(h.x + b.pose.offX, h.y - 3);
      if (b.t >= sd.dur) {
        b.pose.offX = 0;
        b.setExpr('blink', 0.2);
        b.finish();
      }
    },
    exit(b) {
      b.pose.offX = 0;
    },
  },

  // ------------------------------------------------------------------ NOTICE -> APPROACH -> PLAY
  NOTICE: {
    priority: 50,
    enter(b) {
      const sd = b.sd;
      sd.dur = b.rng.range(0.55, 0.95);
      sd.ear2 = 0.28;
      b.pose.split = null;
      b.stateExpr = 'wide';
      b.anim.hold(b.rng.pick(FR.rest));
      b.turnToPointer(0);
      b.earTwitch(0, 0.25);
    },
    update(b, dt) {
      const sd = b.sd;
      b.w.vx *= Math.exp(-14 * dt);
      b.turnToPointer(6);
      b.pose.stretch = Math.sin((b.t * TAU) / 3.4) > 0.25 ? 1 : 0;
      if (sd.ear2 > 0) {
        sd.ear2 -= dt;
        if (sd.ear2 <= 0) b.earTwitch(1, 0.25);
      }
      if (b.t >= sd.dur) {
        if (!b.opts.reduced && b.approachCd <= 0 && b.p.active && b.rng.chance(0.72)) {
          b.approachCd = 7;
          b.go('APPROACH');
        } else {
          b.finish();
        }
      }
    },
  },
  APPROACH: {
    priority: 55,
    moves: true,
    enter(b) {
      const sd = b.sd;
      sd.run = Math.abs(b.p.x - b.w.x) > 120;
      sd.lost = 0;
      b.stateExpr = 'normal';
      b.pose.split = null;
      b.anim.distance(sd.run ? FR.run : FR.walk);
    },
    update(b, dt) {
      const sd = b.sd, w = b.w, p = b.p;
      const dist = Math.abs(p.x - w.x);
      if (!sd.run && dist > 120) {
        sd.run = true;
        b.anim.distance(FR.run);
      } else if (sd.run && dist < 70) {
        sd.run = false;
        b.anim.distance(FR.walk);
      }
      const dir = Math.sign(p.x - w.x) || w.facing;
      const target = clamp(p.x - dir * TUNE.stopDistance, w.xMin, w.xMax);
      const speed = sd.run ? TUNE.runSpeed * 0.85 : TUNE.walkSpeed * 1.15;
      drive(b, target, speed, sd.run ? TUNE.runAccel : TUNE.walkAccel, dt);
      b.anim.advance((Math.abs(w.vx) * dt) / ((sd.run ? TUNE.runStride : TUNE.walkStride) / 6));
      if (!p.active || !b.pNear) {
        sd.lost += dt;
        if (sd.lost > 1.2) {
          b.returnHome();
          return;
        }
      } else {
        sd.lost = 0;
      }
      if (dist < TUNE.stopDistance + 10 && Math.abs(w.vx) < 6) {
        w.vx = 0;
        b.go('PLAY', { arrived: true });
      } else if (b.t > 12) {
        b.returnHome();
      }
    },
  },
  PLAY: {
    priority: 52,
    moves: true,
    enter(b, p) {
      const sd = b.sd;
      sd.phase = p.arrived ? 'sniff' : 'watch';
      sd.still = 0;
      sd.heart = 0.4;
      sd.lost = 0;
      b.pose.split = null;
      b.stateExpr = 'normal';
      b.anim.hold('0_0');
      if (sd.phase === 'sniff') {
        b.anim.seq([
          { f: FR.crouch, d: 0.25 },
          { f: FR.settle, d: 0.22, stretch: 0 },
          { f: FR.crouch, d: 0.22 },
          { f: FR.settle, d: 0.2 },
        ]);
      } else {
        b.anim.loop(WAG, 5);
      }
    },
    update(b, dt) {
      const sd = b.sd, w = b.w, p = b.p;
      w.vx *= Math.exp(-12 * dt);
      const dx = p.x - w.x;
      if (Math.abs(dx) > 7 && sd.phase !== 'lie') w.facing = sign(dx);
      sd.still = p.speed < 10 ? sd.still + dt : 0;
      if (b.hover) {
        b.stateExpr = 'squint';
        sd.heart -= dt;
        if (sd.heart <= 0 && sd.phase === 'watch') {
          const h = b.env.head();
          b.fx.spawn('heart', h.x + b.rng.range(-3, 3), h.y - 1, { life: 1.4, vy: -8 });
          sd.heart = 1.15;
        }
      } else {
        b.stateExpr = 'normal';
      }
      // pointer menghilang / menjauh
      if (!b.pNear && !b.hover) {
        sd.lost += dt;
        if (sd.lost > 1.4) {
          b.returnHome();
          return;
        }
      } else {
        sd.lost = 0;
      }
      if (sd.phase === 'sniff') {
        b.pose.stretch = 0;
        if (b.anim.done) {
          sd.phase = 'watch';
          b.anim.loop(WAG, 5);
        }
      } else if (sd.phase === 'watch') {
        b.pose.stretch = Math.sin((b.t * TAU) / 3) > 0.25 ? 1 : 0;
        // pointer bergerak menjauh: ikuti lagi
        if (!b.hover && b.pNear && Math.abs(dx) > TUNE.stopDistance + 34) {
          b.go('APPROACH');
          return;
        }
        // tangkap pointer yang bergerak cepat di dekatnya (lompat kecil)
        if (!b.opts.reduced && p.speed > 90 && Math.abs(dx) < 46 && b.cool('pounce', 3.5) && b.rng.chance(dt * 0.8)) {
          b.last.pounce = b.time;
          b.request('JUMP', { h: 9, dx: clamp(dx * 0.6, -26, 26), crouch: 0.1 }, { priority: 60 });
          return;
        }
        // pointer diam lama: berbaring di dekatnya
        if (!b.opts.reduced && sd.still > 4.5 && !b.hover) {
          sd.phase = 'lie';
          b.anim.seq([{ f: FR.settle, d: 0.45 }, { f: FR.loafA, d: 0.6 }, { f: FR.loafB, d: 1, expr: 'blink' }]);
          b.pose.split = 8;
        }
      } else if (sd.phase === 'lie') {
        b.pose.stretch = b.anim.done && Math.sin((b.t * TAU) / 3.6) > 0.2 ? 1 : 0;
        if (b.anim.done) b.anim.hold(FR.loafB);
        if (p.speed > 30 || b.hover) {
          sd.phase = 'up';
          b.pose.stretch = 0;
          b.anim.seq([{ f: FR.loafA, d: 0.28 }, { f: FR.settle, d: 0.25 }, { f: '0_0', d: 0.15 }]);
        }
      } else if (sd.phase === 'up') {
        if (b.anim.done) {
          sd.phase = 'watch';
          b.pose.split = null;
          b.anim.loop(WAG, 5);
        }
      }
    },
    exit(b) {
      b.pose.stretch = 0;
      b.pose.split = null;
    },
  },

  // ------------------------------------------------------------------ reaksi klik
  MEOW: {
    priority: 60,
    enter(b) {
      b.pose.split = null;
      b.stateExpr = 'meow';
      b.anim.hold('0_4');
      b.sd.dur = 1.25;
      b.env.say(b.rng.pick(b.env.messages), 1400);
    },
    update(b, dt) {
      b.w.vx *= Math.exp(-14 * dt);
      b.pose.stretch = b.t < 0.25 ? 1 : 0;
      if (b.t > 0.6) b.stateExpr = 'normal';
      if (b.t >= b.sd.dur) b.finish();
    },
  },
  WAG: {
    priority: 60,
    enter(b) {
      b.pose.split = null;
      b.stateExpr = 'squint';
      b.anim.loop(WAG, 8);
      b.sd.dur = 1.4;
    },
    update(b, dt) {
      b.w.vx *= Math.exp(-14 * dt);
      b.pose.stretch = Math.sin((b.t * TAU) / 0.7) > 0.5 ? 1 : 0;
      if (b.t >= b.sd.dur) b.finish();
    },
  },
  PET: {
    priority: 60,
    enter(b) {
      const sd = b.sd;
      b.pose.split = null;
      b.stateExpr = 'squint';
      b.anim.hold('0_0');
      sd.dur = 2;
      sd.heart = 0.1;
      sd.n = 0;
    },
    update(b, dt) {
      const sd = b.sd;
      b.w.vx *= Math.exp(-14 * dt);
      b.pose.stretch = Math.sin((b.t * TAU) / 0.8) > 0 ? 1 : 0; // mendengkur kecil
      sd.heart -= dt;
      if (sd.heart <= 0 && sd.n < 4) {
        const h = b.env.head();
        b.fx.spawn('heart', h.x + b.rng.range(-4, 4), h.y, { life: 1.3, vy: -9 });
        sd.heart = 0.42;
        sd.n++;
      }
      if (b.t > 0.6 && b.t < 0.9) b.anim.hold('0_1');
      else b.anim.hold(b.t > 1.4 ? '0_5' : '0_0');
      if (b.t >= sd.dur) b.finish();
    },
  },
};

// ---------------------------------------------------------------------------------------------
class Brain {
  constructor(env) {
    this.env = env;
    this.w = env.world;
    this.p = env.pointer;
    this.rng = env.rng;
    this.opts = env.opts;
    this.fx = env.fx;
    this.anim = new Animator();
    this.pose = { baseExpr: 'normal', expr: 'normal', exprT: 0, exprOver: null, stretch: 0, split: null,
      angle: 0, offX: 0, ear: null, earT: 0 };
    this.stateExpr = 'normal';
    this.time = 0;
    this.t = 0;
    this.name = null;
    this.sd = {};
    this.last = {};
    this.lastChoice = null;
    this.pending = null;
    this.lastActivity = 0;
    this.pNear = false;
    this.pDist = Infinity;
    this.hover = false;
    this.clickCd = 0;
    this.approachCd = 0;
    this.lastItem = null;
    this.log = [];
    this.enter('IDLE', {});
  }

  get state() {
    return this.name;
  }
  get locked() {
    const st = STATES[this.name];
    return st.locked ? !!st.locked(this) : false;
  }

  // ------------------------------------------------------------ transisi
  enter(name, params = {}) {
    const prev = STATES[this.name];
    if (prev && prev.exit) prev.exit(this);
    this.name = name;
    this.sd = {};
    this.t = 0;
    this.lastItem = null;
    const pz = this.pose;
    pz.angle = 0;
    pz.offX = 0;
    pz.stretch = 0;
    this.stateExpr = 'normal';
    STATES[name].enter(this, params);
    if (this.log.length > 40) this.log.shift();
    this.log.push(name);
    return true;
  }
  go(name, params) {
    return this.enter(name, params);
  }
  finish() {
    const q = this.pending;
    this.pending = null;
    if (q && q.until >= this.time && !(this.opts.reduced && REDUCED_BLOCKED.has(q.name))) this.enter(q.name, q.params);
    else this.enter('IDLE', {});
  }
  // Permintaan state baru: diterima jika prioritas lebih tinggi dan state sekarang tidak terkunci.
  request(name, params = {}, opt = {}) {
    if (!STATES[name]) return false;
    if (this.opts.reduced && REDUCED_BLOCKED.has(name)) return false;
    const pr = opt.priority ?? STATES[name].priority;
    if (opt.force || pr >= 100) return this.enter(name, params);
    const cur = STATES[this.name];
    if (cur.onRequest && cur.onRequest(this, name, params, pr)) return true;
    const locked = cur.locked ? cur.locked(this) : false;
    if (!locked && (pr > cur.priority || this.name === 'IDLE')) return this.enter(name, params);
    if (opt.queue) this.pending = { name, params, pr, until: this.time + 1.6 };
    return false;
  }

  // ------------------------------------------------------------ util perilaku
  setExpr(name, dur) {
    this.pose.exprOver = name;
    this.pose.exprT = dur;
  }
  earTwitch(i, dur = 0.22) {
    this.pose.ear = i;
    this.pose.earT = dur;
  }
  cool(name, cd) {
    return this.time - (this.last[name] ?? -1e9) >= cd;
  }
  turnToPointer(dead = 6) {
    if (!this.p.active) return;
    const d = this.p.x - this.w.x;
    if (Math.abs(d) > dead) this.w.facing = d < 0 ? -1 : 1;
  }
  beginWake(startled) {
    const sd = this.sd;
    sd.phase = 'waking';
    this.pose.split = null;
    this.pose.stretch = 0;
    const k = startled ? 0.6 : 1;
    this.anim.seq([
      { f: FR.snoozeB, d: 0.25 * k },
      { f: FR.loafB, d: 0.3 * k, expr: 'wide' },
      { f: FR.loafA, d: 0.25 * k },
      { f: FR.settle, d: 0.2 * k },
      { f: '0_0', d: 0.15 * k },
    ]);
  }
  returnHome() {
    const home = this.env.home();
    if (!this.opts.reduced && Math.abs(this.w.x - home) > 70 && this.rng.chance(0.55)) {
      this.go('WALK', { x: home + this.rng.range(-20, 20) });
    } else {
      this.finish();
    }
  }

  // ------------------------------------------------------------ pilihan aktivitas otomatis
  chooseNext() {
    const o = this.opts;
    if (o.autonomous === false) {
      this.enter('IDLE', {});
      return;
    }
    const idleFor = this.time - this.lastActivity;
    const reduced = o.reduced;
    const rec = (n, cd) => (cd ? clamp((this.time - (this.last[n] ?? -1e9)) / cd, 0, 1) : 1);
    const sleepW = idleFor > o.sleepAfter ? Math.min(9, 2.5 + (idleFor - o.sleepAfter) / 8) : 0;
    const items = [
      { n: 'look', w: 3 },
      { n: 'sit', w: 3 },
      { n: 'walk', w: reduced ? 0 : 4 },
      { n: 'hop', w: reduced ? 0 : 2, cd: 14 },
      { n: 'run', w: reduced ? 0 : 1.5, cd: 16 },
      { n: 'stretch', w: reduced ? 0 : 1.2, cd: 22 },
      { n: 'chase', w: reduced ? 0 : 1, cd: 50 },
      { n: 'flip', w: reduced ? 0 : 0.45, cd: 80 },
      { n: 'sleep', w: sleepW },
    ];
    for (const it of items) {
      it.w *= rec(it.n, it.cd);
      if (it.cd && it.w < 0.02 * (it.cd / 14)) it.w = 0;
      if (it.n === this.lastChoice) it.w *= 0.3;
    }
    const pick = this.rng.weighted(items);
    if (!pick) {
      this.enter('IDLE', {});
      return;
    }
    this.lastChoice = pick.n;
    this.doAction(pick.n, { auto: true });
  }

  walkTarget(minD, maxD) {
    const w = this.w, r = this.rng;
    let dir = r.chance(0.5) ? -1 : 1;
    let x = w.x + dir * r.range(minD, maxD);
    if (x < w.xMin + 8 || x > w.xMax - 8) {
      dir = -dir;
      x = w.x + dir * r.range(minD, maxD);
    }
    if (r.chance(0.2)) x = lerp(w.x, this.env.home(), r.range(0.3, 0.8));
    return clamp(x, w.xMin, w.xMax);
  }
  hopParams() {
    const r = this.rng;
    return { h: r.range(6.5, 10), dx: (r.chance(0.5) ? -1 : 1) * r.range(0, 14), chain: r.int(1, 3), crouch: r.range(0.1, 0.18), hop: true };
  }
  flipParams() {
    const r = this.rng;
    const back = r.chance(0.7);
    const f = this.w.facing;
    return { h: 16, dx: back ? -f * r.range(0, 10) : f * r.range(8, 18), flip: back ? -1 : 1, crouch: 0.24 };
  }

  // Menjalankan aksi bernama. Dipakai oleh aktivitas otomatis, klik, dan API trigger().
  doAction(n, o = {}) {
    const pr = o.priority;
    const opt = { priority: pr, queue: !o.auto, force: !!o.force };
    this.last[n] = this.time;
    switch (n) {
      case 'look':
        return this.request('IDLE', { look: true }, opt) || this.enter('IDLE', { look: true });
      case 'sit':
        return this.enter('IDLE', { dwell: this.rng.range(6, 10) });
      case 'walk':
        return this.request('WALK', { x: this.walkTarget(30, 120) }, opt);
      case 'run':
        return this.request('RUN', { x: this.walkTarget(80, 200) }, opt);
      case 'hop':
        return this.request('JUMP', this.hopParams(), opt);
      case 'jump':
        return this.request('JUMP', { h: 14, dx: this.w.facing * this.rng.range(6, 16), crouch: 0.2 }, opt);
      case 'flip':
        return this.request('JUMP', this.flipParams(), opt);
      case 'stretch':
        return this.request('STRETCH', {}, opt);
      case 'chase':
        return this.request('CHASE_TAIL', {}, opt);
      case 'dizzy':
        return this.request('DIZZY', {}, opt);
      case 'sleep':
        return this.request('SLEEP', {}, { ...opt, priority: o.auto ? undefined : 25 });
      case 'wake':
        if (this.name === 'SLEEP' && this.sd.phase !== 'waking') this.beginWake(false);
        return true;
      case 'meow':
        return this.request('MEOW', {}, opt);
      case 'wag':
        return this.request('WAG', {}, opt);
      case 'pet':
        return this.request('PET', {}, opt);
      case 'blink':
        return this.request('IDLE', { dwell: 1.8, expr: 'squint', exprT: 1.2 }, opt);
      default:
        return false;
    }
  }

  // ------------------------------------------------------------ input dari UI
  // Klik/tap/Enter pada kucing: pilih reaksi acak dengan cooldown agar animasi tidak bertumpuk.
  click() {
    if (this.clickCd > 0) return false;
    this.clickCd = TUNE.clickCooldown;
    this.lastActivity = this.time;
    const red = this.opts.reduced;
    const items = [
      { n: 'hop', w: red ? 0 : 24 },
      { n: 'flip', w: red || !this.cool('flip', 8) ? 0 : 10 },
      { n: 'meow', w: 22 },
      { n: 'wag', w: 14 },
      { n: 'chase', w: red || !this.cool('chase', 20) ? 0 : 10 },
      { n: 'blink', w: 8 },
      { n: 'pet', w: 20 },
    ];
    for (const it of items) if (it.n === this.lastClick) it.w *= 0.25;
    const pick = this.rng.weighted(items);
    this.lastClick = pick.n;
    this.doAction(pick.n, { priority: 60 });
    return pick.n;
  }
  setHover(h) {
    if (h === this.hover) return;
    this.hover = h;
    if (h) {
      this.lastActivity = this.time;
      if (this.name !== 'DRAG' && this.name !== 'FALL' && this.name !== 'PLAY') this.request('PLAY', { hover: true }, { queue: true });
    }
  }
  startDrag() {
    this.lastActivity = this.time;
    this.pending = null;
    this.enter('DRAG', {});
  }
  releaseDrag() {
    if (this.name !== 'DRAG') return;
    const sd = this.sd, w = this.w;
    this.pose.stretch = 0;
    if (w.y < 0.8) {
      w.y = 0;
      this.go('LAND', { vx: 0, expr: 'wide' });
    } else {
      this.go('FALL', { vx: clamp(sd.vxs * 0.35, -30, 30), vy: clamp(sd.vys * 0.2, -10, 25) });
    }
  }

  // ------------------------------------------------------------ loop
  sense() {
    const w = this.w, p = this.p;
    if (p.active) {
      const dx = p.x - w.x;
      const dy = (p.y - (w.ground - w.y - 8)) * 0.5;
      this.pDist = Math.hypot(dx, dy);
      if (!this.pNear && this.pDist < TUNE.near) {
        this.pNear = true;
        this.lastActivity = this.time;
        if (this.name === 'IDLE') this.request('NOTICE', {});
      } else if (this.pNear && this.pDist > TUNE.far) {
        this.pNear = false;
      }
    } else {
      this.pDist = Infinity;
      this.pNear = false;
    }
  }

  update(dt) {
    this.time += dt;
    this.t += dt;
    if (this.clickCd > 0) this.clickCd -= dt;
    if (this.approachCd > 0) this.approachCd -= dt;
    this.sense();
    const st = STATES[this.name];
    if (st.update) st.update(this, dt);
    const cur = STATES[this.name];
    const w = this.w;
    if (cur.moves && w.vx) {
      w.x += w.vx * dt;
      if (w.x < w.xMin) { w.x = w.xMin; w.vx = 0; }
      else if (w.x > w.xMax) { w.x = w.xMax; w.vx = 0; }
    }
    this.anim.update(dt);
    const c = this.anim.cur;
    const pz = this.pose;
    if (c !== this.lastItem) {
      this.lastItem = c;
      if (c && c.flip) w.facing *= -1;
    }
    if (c && c.stretch != null) pz.stretch = c.stretch;
    pz.baseExpr = (c && c.expr) || this.stateExpr;
    if (pz.exprT > 0) {
      pz.exprT -= dt;
      if (pz.exprT <= 0) pz.exprOver = null;
    }
    pz.expr = pz.exprOver || pz.baseExpr;
    if (pz.earT > 0) {
      pz.earT -= dt;
      if (pz.earT <= 0) pz.ear = null;
    }
    if (this.pending && this.pending.until < this.time) this.pending = null;
  }

  snapshot() {
    return { state: this.name, t: +this.t.toFixed(2), frame: this.anim.frame, x: +this.w.x.toFixed(1), y: +this.w.y.toFixed(1),
      vx: +this.w.vx.toFixed(1), facing: this.w.facing, expr: this.pose.expr, angle: +this.pose.angle.toFixed(2),
      stretch: this.pose.stretch, near: this.pNear, hover: this.hover, locked: this.locked, pending: this.pending && this.pending.name };
  }
}

// ---- pixel-cat.js ----
const VERSION = '1.0.0';

const STYLE_ID = 'pxcat-style';
const CSS = `
.pxcat-wrap{position:fixed;left:0;top:0;z-index:var(--pxcat-z,9999);pointer-events:none;will-change:transform;contain:layout style;}
.pxcat-canvas{display:block;image-rendering:-moz-crisp-edges;image-rendering:crisp-edges;image-rendering:pixelated;pointer-events:auto;touch-action:none;cursor:pointer;-webkit-tap-highlight-color:transparent;outline:none;-webkit-user-select:none;user-select:none;}
.pxcat-canvas.pxcat-grabbing{cursor:grabbing;}
.pxcat-canvas:focus-visible{clip-path:none!important;outline:2px solid #ffcc00;outline-offset:-2px;}
.pxcat-bubble{position:absolute;left:0;top:0;transform:translate(-50%,-100%);background:#fff7e6;color:#2b190c;border:2px solid #0a0502;padding:2px 6px;font:700 12px/1.25 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:nowrap;opacity:0;pointer-events:none;box-shadow:2px 2px 0 rgba(0,0,0,.35);transition:opacity .12s steps(2);}
.pxcat-bubble.pxcat-on{opacity:1;}
.pxcat-bubble::after{content:'';position:absolute;left:50%;bottom:-6px;width:6px;height:6px;margin-left:-3px;background:#fff7e6;border-right:2px solid #0a0502;border-bottom:2px solid #0a0502;transform:rotate(45deg);}
.pxcat-hide{position:absolute;width:18px;height:18px;padding:0;border:2px solid #0a0502;border-radius:0;background:#fff7e6;color:#0a0502;font:700 13px/1 ui-monospace,Menlo,Consolas,monospace;cursor:pointer;opacity:0;pointer-events:none;transition:opacity .15s;}
.pxcat-wrap.pxcat-controls .pxcat-hide,.pxcat-wrap:focus-within .pxcat-hide{opacity:1;pointer-events:auto;}
.pxcat-hide:focus-visible,.pxcat-show:focus-visible{outline:2px solid #ffcc00;outline-offset:1px;}
@media (pointer:coarse){.pxcat-hide{width:28px;height:28px;font-size:18px;}}
.pxcat-show{position:fixed;z-index:var(--pxcat-z,9999);width:32px;height:32px;padding:0;display:none;align-items:center;justify-content:center;border:2px solid #0a0502;border-radius:0;background:#fff7e6;box-shadow:2px 2px 0 rgba(0,0,0,.35);cursor:pointer;}
.pxcat-show canvas{width:24px;height:24px;image-rendering:pixelated;display:block;}
.pxcat-debug .pxcat-canvas{outline:1px dashed rgba(255,0,0,.6);}
`;

const DEFAULT_OPTS = {
  parent: null,            // elemen tujuan (default: document.body)
  scale: 'auto',           // 'auto' (2 di mobile, 3 di desktop) atau angka piksel layar per piksel seni
  bottom: 6,               // jarak tanah dari bawah layar (px)
  side: 'right',           // posisi awal & "rumah": 'left' | 'right' | angka (px dari kiri)
  zIndex: 9999,
  messages: null,          // teks bubble saat mengeong
  autonomous: true,        // perilaku otomatis
  sleepAfter: 30,          // detik tanpa aktivitas sebelum boleh tidur
  respectReducedMotion: true,
  persistHidden: true,     // simpan status sembunyi di localStorage
  hideButton: true,        // tombol kecil untuk menyembunyikan pet
  ariaLabel: 'Kucing pixel interaktif. Tekan Enter untuk bermain.',
  seed: null,              // seed RNG (untuk pengujian)
  timeScale: 1,            // percepat/perlambat simulasi (untuk pengujian)
  debug: false,
};

const HIDDEN_KEY = 'pixelcat:hidden';

function injectStyle() {
  if (document.getElementById(STYLE_ID)) return;
  const st = document.createElement('style');
  st.id = STYLE_ID;
  st.textContent = CSS;
  document.head.appendChild(st);
}
const el = (tag, cls) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  return e;
};
function safeGet(k) {
  try { return window.localStorage.getItem(k); } catch (e) { return null; }
}
function safeSet(k, v) {
  try { window.localStorage.setItem(k, v); } catch (e) { /* abaikan */ }
}

function noopController() {
  const noop = () => {};
  return { destroy: noop, hide: noop, show: noop, toggle: noop, say: noop, trigger: () => false, pause: noop, resume: noop,
    setScale: noop, getState: () => null, hidden: true, ready: Promise.resolve(null), element: null };
}

function mountPixelCat(userOpts = {}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return noopController(); // aman untuk SSR
  const opts = { ...DEFAULT_OPTS, ...userOpts };
  const messages = opts.messages && opts.messages.length ? opts.messages : DEFAULT_MESSAGES;
  injectStyle();

  const S = { destroyed: false, hidden: false, paused: false, raf: 0, last: 0, cssScale: 3, dpr: 1, down: null,
    controlsTimer: 0, bubbleTimer: 0, touchTimer: 0, posKey: '', clipKey: '', ready: false };
  S.hidden = opts.persistHidden && safeGet(HIDDEN_KEY) === '1';

  // ------------------------------------------------------------------ DOM
  const parent = opts.parent || document.body;
  const wrap = el('div', 'pxcat-wrap');
  wrap.style.setProperty('--pxcat-z', String(opts.zIndex));
  const canvas = el('canvas', 'pxcat-canvas');
  canvas.tabIndex = 0;
  canvas.setAttribute('role', 'button');
  canvas.setAttribute('aria-label', opts.ariaLabel);
  const bubble = el('div', 'pxcat-bubble');
  bubble.setAttribute('role', 'status');
  bubble.setAttribute('aria-live', 'polite');
  const hideBtn = el('button', 'pxcat-hide');
  hideBtn.type = 'button';
  hideBtn.textContent = '×';
  hideBtn.setAttribute('aria-label', 'Sembunyikan kucing');
  hideBtn.title = 'Sembunyikan kucing';
  if (!opts.hideButton) hideBtn.style.display = 'none';
  const showBtn = el('button', 'pxcat-show');
  showBtn.type = 'button';
  showBtn.setAttribute('aria-label', 'Tampilkan kucing');
  showBtn.title = 'Tampilkan kucing';
  const showCanvas = el('canvas');
  showCanvas.width = 24;
  showCanvas.height = 24;
  showBtn.appendChild(showCanvas);
  wrap.append(canvas, bubble, hideBtn);
  if (opts.debug) wrap.classList.add('pxcat-debug');
  wrap.style.visibility = 'hidden';

  // ------------------------------------------------------------------ dunia & input
  const world = { x: 0, y: 0, vx: 0, vy: 0, facing: -1, xMin: TUNE.edgeMargin, xMax: 300, ground: 200, viewW: 400, viewH: 300 };
  const pointer = { x: 0, y: 0, active: false, speed: 0, touch: false, px: 0, py: 0, pt: 0 };
  const fx = new Fx();
  const rng = makeRng(opts.seed);
  const mql = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  const aiOpts = { autonomous: opts.autonomous, sleepAfter: opts.sleepAfter, reduced: !!(opts.respectReducedMotion && mql && mql.matches) };

  let sheet = null, renderer = null, brain = null;

  const homeX = () => {
    if (typeof opts.side === 'number') return clamp(opts.side / S.cssScale, world.xMin, world.xMax);
    return opts.side === 'left' ? world.xMin + 12 : world.xMax - 12;
  };

  function layout() {
    S.dpr = window.devicePixelRatio || 1;
    const base = opts.scale === 'auto' ? (window.innerWidth < 640 ? 2 : 3) : Number(opts.scale) || 3;
    S.cssScale = Math.max(1, Math.round(base * S.dpr)) / S.dpr; // kelipatan bulat piksel perangkat => tetap tajam
    const cs = S.cssScale;
    const w = CW * cs, h = CH * cs;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    wrap.style.width = w + 'px';
    wrap.style.height = h + 'px';
    world.viewW = window.innerWidth / cs;
    world.viewH = window.innerHeight / cs;
    world.ground = (window.innerHeight - opts.bottom) / cs;
    world.xMin = TUNE.edgeMargin;
    world.xMax = Math.max(world.xMin + 1, world.viewW - TUNE.edgeMargin);
    world.x = clamp(world.x, world.xMin, world.xMax);
    bubble.style.top = (AY - 22) * cs + 'px';
    hideBtn.style.left = (AX + 7) * cs + 'px';
    hideBtn.style.top = (AY - 27) * cs + 'px';
    showBtn.style.right = '12px';
    showBtn.style.bottom = '12px';
    S.posKey = '';
    S.clipKey = '';
    if (renderer) renderer.sig = '';
  }

  // ------------------------------------------------------------------ UI helpers
  function say(text, ms = 1500) {
    bubble.textContent = text;
    bubble.classList.add('pxcat-on');
    clearTimeout(S.bubbleTimer);
    S.bubbleTimer = setTimeout(() => bubble.classList.remove('pxcat-on'), ms);
    placeBubble();
  }
  function placeBubble() {
    if (!bubble.classList.contains('pxcat-on')) return;
    const cs = S.cssScale;
    const left = (world.x - AX) * cs;
    const bw = bubble.offsetWidth;
    const c = left + AX * cs;
    let shift = 0;
    if (c - bw / 2 < 4) shift = 4 - (c - bw / 2);
    else if (c + bw / 2 > window.innerWidth - 4) shift = window.innerWidth - 4 - (c + bw / 2);
    bubble.style.left = AX * cs + shift + 'px';
  }
  function flashControls(ms = 2600) {
    wrap.classList.add('pxcat-controls');
    clearTimeout(S.controlsTimer);
    S.controlsTimer = setTimeout(() => wrap.classList.remove('pxcat-controls'), ms);
  }

  // ------------------------------------------------------------------ input
  function updatePointer(e) {
    const cs = S.cssScale;
    const x = e.clientX / cs, y = e.clientY / cs;
    const now = performance.now();
    if (pointer.pt) {
      const dt = Math.max(1, now - pointer.pt) / 1000;
      const v = Math.hypot(x - pointer.px, y - pointer.py) / dt;
      pointer.speed = lerp(pointer.speed, Math.min(v, 600), 0.35);
    }
    pointer.px = pointer.x = x;
    pointer.py = pointer.y = y;
    pointer.pt = now;
    pointer.active = true;
    pointer.touch = e.pointerType === 'touch';
    if (brain) brain.lastActivity = brain.time;
  }
  const onMove = (e) => {
    updatePointer(e);
  };
  const onDown = (e) => {
    updatePointer(e);
    if (brain) brain.lastActivity = brain.time;
  };
  const onUp = (e) => {
    if (e.pointerType === 'touch') {
      clearTimeout(S.touchTimer);
      S.touchTimer = setTimeout(() => { pointer.active = false; }, 2500);
    }
  };
  const onLeaveDoc = () => { pointer.active = false; };
  const onActivity = () => { if (brain) brain.lastActivity = brain.time; };

  const cDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    S.down = { x: e.clientX, y: e.clientY, id: e.pointerId, moved: false };
    try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* abaikan */ }
  };
  const cMove = (e) => {
    const d = S.down;
    if (!d || d.id !== e.pointerId) return;
    if (!d.moved && Math.hypot(e.clientX - d.x, e.clientY - d.y) > 6) {
      d.moved = true;
      canvas.classList.add('pxcat-grabbing');
      if (brain) brain.startDrag();
    }
  };
  const endPress = (e, cancelled) => {
    const d = S.down;
    if (!d || d.id !== e.pointerId) return;
    S.down = null;
    canvas.classList.remove('pxcat-grabbing');
    try { canvas.releasePointerCapture(e.pointerId); } catch (err) { /* abaikan */ }
    if (!brain) return;
    if (d.moved) brain.releaseDrag();
    else if (!cancelled) {
      brain.click();
      if (e.pointerType === 'touch') flashControls(3200);
    }
  };
  const cUp = (e) => endPress(e, false);
  const cCancel = (e) => endPress(e, true);
  const cEnter = (e) => {
    if (e.pointerType === 'touch') return;
    if (brain) brain.setHover(true);
    flashControls(2600);
  };
  const cLeave = () => {
    if (brain) brain.setHover(false);
    flashControls(1800);
  };
  const cKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (brain) brain.click();
    }
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onDown, { passive: true });
  window.addEventListener('pointerup', onUp, { passive: true });
  window.addEventListener('keydown', onActivity, { passive: true });
  window.addEventListener('wheel', onActivity, { passive: true });
  window.addEventListener('scroll', onActivity, { passive: true });
  document.documentElement.addEventListener('mouseleave', onLeaveDoc);
  canvas.addEventListener('pointerdown', cDown);
  canvas.addEventListener('pointermove', cMove);
  canvas.addEventListener('pointerup', cUp);
  canvas.addEventListener('pointercancel', cCancel);
  canvas.addEventListener('pointerenter', cEnter);
  canvas.addEventListener('pointerleave', cLeave);
  canvas.addEventListener('keydown', cKey);
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  hideBtn.addEventListener('click', (e) => { e.stopPropagation(); api.hide(); });
  showBtn.addEventListener('click', () => api.show());

  const onResize = () => layout();
  window.addEventListener('resize', onResize);
  const onMql = () => {
    aiOpts.reduced = !!(opts.respectReducedMotion && mql && mql.matches);
    if (brain && aiOpts.reduced) brain.enter('IDLE', {});
  };
  if (mql && mql.addEventListener) mql.addEventListener('change', onMql);
  const onVis = () => {
    if (document.hidden) {
      cancelAnimationFrame(S.raf);
      S.raf = 0;
    } else if (!S.destroyed && !S.hidden && !S.paused && S.ready) {
      startLoop();
    }
  };
  document.addEventListener('visibilitychange', onVis);

  // ------------------------------------------------------------------ loop
  function drawShowIcon() {
    const c = showCanvas.getContext('2d');
    c.imageSmoothingEnabled = false;
    c.clearRect(0, 0, 24, 24);
    const m = sheet.info('0_0');
    c.drawImage(sheet.img, m.x, m.y, m.w, m.h, Math.round((24 - m.w) / 2) + 1, 2, m.w, m.h);
  }

  function render() {
    const frame = brain.anim.frame;
    const pose = brain.pose;
    const drawn = renderer.draw(frame, pose, world.facing, fx.active);
    const cs = S.cssScale, d = S.dpr;
    const px = Math.round((world.x - AX) * cs * d) / d;
    const py = Math.round((world.ground - world.y - AY) * cs * d) / d;
    const key = px + ',' + py;
    if (key !== S.posKey) {
      S.posKey = key;
      wrap.style.transform = `translate3d(${px}px,${py}px,0)`;
      placeBubble();
    }
    if (drawn || S.clipKey === '') {
      const b = renderer.bounds;
      const ck = `${b.x0},${b.y0},${b.x1},${b.y1}`;
      if (ck !== S.clipKey) {
        S.clipKey = ck;
        canvas.style.clipPath = `inset(${b.y0 * cs}px ${(CW - b.x1) * cs}px ${(CH - b.y1) * cs}px ${b.x0 * cs}px)`;
      }
    }
  }

  function tick(ts) {
    if (S.destroyed) return;
    S.raf = requestAnimationFrame(tick);
    const dt = Math.min(0.05, Math.max(0, (ts - S.last) / 1000)) * opts.timeScale;
    S.last = ts;
    if (S.paused || S.hidden || !brain) return;
    pointer.speed *= Math.exp(-5 * dt);
    brain.update(dt);
    fx.update(dt);
    if (fx.active) {
      const h = renderer.head(brain.anim.frame, brain.pose);
      fx.follow(h.x + (brain.pose.offX || 0), h.y - 3);
    }
    render();
  }
  function startLoop() {
    cancelAnimationFrame(S.raf);
    S.last = performance.now();
    S.raf = requestAnimationFrame(tick);
  }

  // ------------------------------------------------------------------ API publik
  const api = {
    element: wrap,
    get hidden() { return S.hidden; },
    ready: null,
    hide() {
      S.hidden = true;
      wrap.style.display = 'none';
      showBtn.style.display = 'flex';
      if (opts.persistHidden) safeSet(HIDDEN_KEY, '1');
    },
    show() {
      S.hidden = false;
      wrap.style.display = '';
      showBtn.style.display = 'none';
      if (opts.persistHidden) safeSet(HIDDEN_KEY, '0');
      S.last = performance.now();
      S.posKey = '';
      if (brain && !S.raf && !document.hidden) startLoop();
    },
    toggle() { S.hidden ? api.show() : api.hide(); },
    say,
    // Memicu perilaku: hop, jump, flip, run, walk, sleep, wake, stretch, chase, dizzy, meow, wag, pet, blink, sit, look
    trigger(name) {
      if (!brain) return false;
      if (name === 'sit') return brain.enter('IDLE', { dwell: 6 });
      if (name === 'click') return brain.click();
      return brain.doAction(name, { priority: 70, force: true });
    },
    pause() { S.paused = true; },
    resume() { S.paused = false; S.last = performance.now(); },
    setScale(n) { opts.scale = n; layout(); },
    setPointer(x, y, active = true) { // untuk pengujian / kendali manual
      pointer.x = x / S.cssScale; pointer.y = y / S.cssScale; pointer.active = active; pointer.speed = 0;
    },
    getState() { return brain ? { ...brain.snapshot(), scale: S.cssScale, hidden: S.hidden, fx: fx.list.length, reduced: aiOpts.reduced } : null; },
    get brain() { return brain; },
    destroy() {
      S.destroyed = true;
      cancelAnimationFrame(S.raf);
      clearTimeout(S.controlsTimer); clearTimeout(S.bubbleTimer); clearTimeout(S.touchTimer);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('keydown', onActivity);
      window.removeEventListener('wheel', onActivity);
      window.removeEventListener('scroll', onActivity);
      window.removeEventListener('resize', onResize);
      document.documentElement.removeEventListener('mouseleave', onLeaveDoc);
      document.removeEventListener('visibilitychange', onVis);
      if (mql && mql.removeEventListener) mql.removeEventListener('change', onMql);
      wrap.remove();
      showBtn.remove();
    },
  };

  // ------------------------------------------------------------------ start
  sheet = new SpriteSheet(ATLAS);
  api.ready = sheet.ready.then(() => {
    if (S.destroyed) return api;
    parent.append(wrap, showBtn);
    renderer = new Renderer(canvas, sheet, fx);
    layout();
    world.x = homeX();
    brain = new Brain({
      world, pointer, rng, opts: aiOpts, fx, messages,
      say,
      head: () => renderer.head(brain.anim.frame, brain.pose),
      home: homeX,
    });
    drawShowIcon();
    if (S.hidden) api.hide();
    wrap.style.visibility = '';
    S.ready = true;
    render();
    if (!S.hidden && !document.hidden) startLoop();
    return api;
  }).catch((err) => {
    console.error(err);
    return api;
  });
  return api;
}

window.PixelCat={mountPixelCat:mountPixelCat,VERSION:VERSION};
})();
