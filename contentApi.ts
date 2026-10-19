import { Router, json, type RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';

// File penyimpanan data hasil edit admin
const FILE = path.join(process.cwd(), 'data', 'content.json');
const SECTIONS = ['skills', 'projects', 'designs', 'experience', 'education', 'certificates'];

const read = () => {
  try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; }
};

// Cek password admin (diambil dari ADMIN_PASSWORD di file .env)
const auth: RequestHandler = (req, res, next) => {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || req.header('x-admin-password') !== pw) {
    res.status(401).json({ error: 'Password salah' });
    return;
  }
  next();
};

export const contentRouter = Router();
contentRouter.use(json({ limit: '1mb' }));

// Dibaca website untuk menampilkan data terbaru
contentRouter.get('/content', (_req, res) => res.json(read()));

// Dipakai halaman admin untuk cek login
contentRouter.get('/admin/check', auth, (_req, res) => res.json({ ok: true }));

// Simpan satu bagian (mis. projects) untuk satu bahasa
contentRouter.put('/content/:lang/:section', auth, (req, res) => {
  const { lang, section } = req.params;
  if (!['id', 'en'].includes(lang) || !SECTIONS.includes(section)) {
    res.status(400).json({ error: 'Bagian tidak valid' });
    return;
  }
  const data = read();
  data[lang] = { ...data[lang], [section]: req.body };
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  res.json({ ok: true });
});