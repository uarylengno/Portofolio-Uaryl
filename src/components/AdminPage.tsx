// ============================================================
// IMPORT
// ============================================================
import { useState, useEffect } from 'react';
import {
  Plus, Pencil, Trash2, ArrowUp, ArrowDown, ArrowLeft, LogOut, ExternalLink, X, Lock, Languages,
  Code2, FolderKanban, Briefcase, GraduationCap, Award, Palette, type LucideIcon,
} from 'lucide-react';

import { APP_CONFIG } from '../appConfig';
import { APP_CONFIG_EN } from '../appConfigEn';

type Lang = 'id' | 'en';
type Item = Record<string, any>;
type Field = { key: string; label: string; kind?: 'area' | 'list' };

// ============================================================
// PENYIMPANAN SESI (hilang otomatis saat tab ditutup)
// Dipakai supaya tidak perlu login ulang setelah pindah halaman / refresh
// ============================================================
const PW_KEY = 'admin-password';
const TAB_KEY = 'admin-tab';
const LANG_KEY = 'admin-lang';
const SYNC_KEY = 'admin-sync-en';

const store = {
  get: (k: string) => { try { return sessionStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { sessionStorage.setItem(k, v); } catch { /* abaikan */ } },
  del: (k: string) => { try { sessionStorage.removeItem(k); } catch { /* abaikan */ } },
};

// ============================================================
// DAFTAR BAGIAN & KOLOM
// Untuk menambah kolom baru, cukup tambah satu baris di "fields"
// ============================================================
const SECTIONS: Record<
  string,
  { label: string; Icon: LucideIcon; fields: Field[]; blank: () => Item; summary: (i: Item) => [string, string] }
> = {
  projects: {
    label: 'Projects',
    Icon: FolderKanban,
    summary: (i) => [i.title, i.category],
    fields: [
      { key: 'title', label: 'Judul' },
      { key: 'category', label: 'Kategori' },
      { key: 'description', label: 'Deskripsi', kind: 'area' },
      { key: 'image', label: 'Link gambar' },
      { key: 'techStack', label: 'Tech stack (pisahkan dengan koma)', kind: 'list' },
      { key: 'role', label: 'Peran' },
      { key: 'demoLink', label: 'Link demo (isi # jika belum ada)' },
      { key: 'githubLink', label: 'Link GitHub' },
    ],
    blank: () => ({ id: `project-${Date.now()}`, title: '', category: '', description: '', image: '', techStack: [], role: '', demoLink: '#', githubLink: '', size: 'medium' }),
  },

  // ---------- Designs (poster, pamflet, dll) ----------
  designs: {
    label: 'Designs',
    Icon: Palette,
    summary: (i) => [i.title, `${i.category} · ${i.year}`],
    fields: [
      { key: 'title', label: 'Judul' },
      { key: 'category', label: 'Kategori (mis. Poster, Pamflet)' },
      { key: 'year', label: 'Tahun' },
      { key: 'image', label: 'Link gambar (atau /assets/images/nama.jpg)' },
    ],
    blank: () => ({ id: `design-${Date.now()}`, title: '', category: 'Poster', year: '', image: '' }),
  },

  experience: {
    label: 'Experience',
    Icon: Briefcase,
    summary: (i) => [i.role, `${i.company} · ${i.year}`],
    fields: [
      { key: 'role', label: 'Jabatan' },
      { key: 'company', label: 'Perusahaan' },
      { key: 'year', label: 'Tahun' },
      { key: 'description', label: 'Deskripsi', kind: 'area' },
    ],
    blank: () => ({ role: '', company: '', year: '', description: '' }),
  },

  // ---------- Education (dengan logo sekolah) ----------
  education: {
    label: 'Education',
    Icon: GraduationCap,
    summary: (i) => [i.school, `${i.major || '-'} · ${i.year}`],
    fields: [
      { key: 'school', label: 'Sekolah / Kampus' },
      { key: 'major', label: 'Jurusan (boleh kosong)' },
      { key: 'year', label: 'Tahun' },
      { key: 'achievements', label: 'Prestasi / organisasi (boleh kosong)' },
      { key: 'logo', label: 'Logo sekolah (mis. /assets/images/logo-polije.png, boleh kosong)' },
    ],
    blank: () => ({ school: '', major: '', year: '', achievements: '', logo: '' }),
  },

  certificates: {
    label: 'Awards',
    Icon: Award,
    summary: (i) => [i.title, `${i.issuer} · ${i.year}`],
    fields: [
      { key: 'title', label: 'Judul' },
      { key: 'issuer', label: 'Penyelenggara' },
      { key: 'year', label: 'Tahun' },
      { key: 'image', label: 'Link gambar (atau /assets/images/nama.jpg)' },
      { key: 'rank', label: 'Peringkat (mis. Juara 1)' },
      { key: 'competition', label: 'Nama lomba' },
    ],
    blank: () => ({ title: '', issuer: '', year: '', image: '', rank: '', competition: '' }),
  },
};

// ============================================================
// KOLOM YANG TIDAK BERGANTUNG BAHASA
// Saat "Sinkron ke EN" aktif, hanya kolom ini yang disalin dari ID ke EN
// ketika mengedit item. Teks (judul, deskripsi, dll.) tidak diubah.
// ============================================================
const SHARED: Record<string, string[]> = {
  projects: ['id', 'image', 'techStack', 'demoLink', 'githubLink', 'size'],
  designs: ['id', 'image', 'year'],
  experience: [],
  education: ['logo'],
  certificates: ['image', 'year'],
};

// Ambil sebagian kolom dari satu item
const pick = (item: Item, keys: string[]): Item =>
  Object.fromEntries(keys.filter((k) => k in item).map((k) => [k, item[k]]));

// Cari posisi item yang sama di daftar EN:
// pakai "id" jika ada, kalau tidak pakai nomor urut yang sama
const matchIndex = (list: Item[], ref: Item, fallbackIndex: number): number => {
  if (ref?.id) return list.findIndex((x) => x.id === ref.id);
  return fallbackIndex >= 0 && fallbackIndex < list.length ? fallbackIndex : -1;
};

// Menu sidebar: Skills + semua bagian di atas
const TABS: { id: string; label: string; Icon: LucideIcon }[] = [
  { id: 'skills', label: 'Skills', Icon: Code2 },
  ...Object.entries(SECTIONS).map(([id, s]) => ({ id, label: s.label, Icon: s.Icon })),
];

const SKILL_GROUPS = ['programming', 'design', 'it', 'other'];

// Gaya yang dipakai berulang
const INPUT =
  'w-full bg-background border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all mt-1.5';
const ICON_BTN =
  'w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:hover:bg-transparent';

// Rapikan data sebelum disimpan: potong spasi, buang isi kosong di daftar
const clean = (v: any): any =>
  typeof v === 'string' ? v.trim()
  : Array.isArray(v) ? v.map(clean).filter((x) => x !== '')
  : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, clean(x)]))
  : v;

// ============================================================
// KOLOM ISIAN (teks, teks panjang, atau daftar dipisah koma)
// ============================================================
function FieldInput({ field, value, onChange }: { field: Field; value: any; onChange: (v: any) => void }) {
  const text = field.kind === 'list' ? (value ?? []).join(', ') : value ?? '';
  const change = (v: string) => onChange(field.kind === 'list' ? v.split(',').map((s) => s.trimStart()) : v);
  return (
    <label className="block">
      <span className="text-xs font-bold text-muted">{field.label}</span>
      {field.kind === 'area'
        ? <textarea rows={3} value={text} onChange={(e) => change(e.target.value)} className={`${INPUT} resize-none`} />
        : <input value={text} onChange={(e) => change(e.target.value)} className={INPUT} />}
    </label>
  );
}

// ============================================================
// HALAMAN ADMIN
// ============================================================
export function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(() => !!store.get(PW_KEY)); // true saat mengecek sesi tersimpan
  const [lang, setLang] = useState<Lang>(() => (store.get(LANG_KEY) === 'en' ? 'en' : 'id'));
  const [tab, setTab] = useState(() => {
    const saved = store.get(TAB_KEY);
    return saved && TABS.some((t) => t.id === saved) ? saved : 'skills';
  });
  // Sinkron ke EN: aktif secara bawaan, hanya berlaku saat mengedit di bahasa ID
  const [syncEn, setSyncEn] = useState(() => store.get(SYNC_KEY) !== 'off');
  const [loginError, setLoginError] = useState('');
  const [toast, setToast] = useState<{ text: string; ok: boolean } | null>(null);
  const [newSkill, setNewSkill] = useState<Record<string, string>>({});
  // Item yang sedang dibuka di formulir (index null = item baru)
  const [editing, setEditing] = useState<{ index: number | null; item: Item } | null>(null);
  // Salinan data untuk diedit (diambil dari config yang sudah memuat data terbaru dari server)
  const [content, setContent] = useState<Record<Lang, any>>(() => structuredClone({ id: APP_CONFIG, en: APP_CONFIG_EN }));

  const headers = { 'Content-Type': 'application/json', 'x-admin-password': password };

  // true jika perubahan di bahasa ID juga harus diterapkan ke EN
  const syncing = syncEn && lang === 'id';

  // Ingat tab, bahasa, dan pengaturan sinkron
  useEffect(() => { store.set(TAB_KEY, tab); }, [tab]);
  useEffect(() => { store.set(LANG_KEY, lang); }, [lang]);
  useEffect(() => { store.set(SYNC_KEY, syncEn ? 'on' : 'off'); }, [syncEn]);

  // ---------- Masuk otomatis jika sesi sebelumnya masih tersimpan ----------
  useEffect(() => {
    const saved = store.get(PW_KEY);
    if (!saved) return;
    fetch('/api/admin/check', { headers: { 'Content-Type': 'application/json', 'x-admin-password': saved } })
      .then((res) => {
        if (res.ok) { setPassword(saved); setAuthed(true); }
        else store.del(PW_KEY); // password sudah tidak berlaku
      })
      .catch(() => { /* server tidak terjangkau: tampilkan layar login */ })
      .finally(() => setChecking(false));
  }, []);

  // Ambil daftar item satu bagian (aman jika bagian belum ada di config, mis. "designs")
  const listOf = (section: string): Item[] => content[lang][section] ?? [];

  // Tampilkan notifikasi kecil selama 2,5 detik
  const notify = (text: string, ok = true) => {
    setToast({ text, ok });
    setTimeout(() => setToast(null), 2500);
  };

  // ---------- Login ----------
  const login = async () => {
    try {
      const res = await fetch('/api/admin/check', { headers });
      if (res.ok) {
        store.set(PW_KEY, password);
        setAuthed(true);
        setLoginError('');
      } else if (res.status === 401 || res.status === 403) {
        setLoginError('Password salah.');
      } else {
        setLoginError(`Server menolak login (kode ${res.status}). Cek ADMIN_PASSWORD di file .env lalu restart server.`);
      }
    } catch {
      setLoginError('Tidak bisa terhubung ke server. Pastikan npm run dev masih berjalan.');
    }
  };

  // ---------- Keluar (menghapus sesi tersimpan) ----------
  const logout = () => {
    store.del(PW_KEY);
    setAuthed(false);
    setPassword('');
  };

  // ---------- Simpan satu bagian ke server untuk SATU bahasa ----------
  const persist = async (section: string, value: any, target: Lang = lang): Promise<boolean> => {
    const data = clean(value);
    const res = await fetch(`/api/content/${target}/${section}`, { method: 'PUT', headers, body: JSON.stringify(data) });
    if (!res.ok) return false;

    setContent((c) => ({ ...c, [target]: { ...c[target], [section]: data } }));

    // Perbarui config bersama supaya website dan admin langsung menampilkan data terbaru
    (target === 'id' ? (APP_CONFIG as any) : (APP_CONFIG_EN as any))[section] = data;
    return true;
  };

  // ---------- Simpan di bahasa aktif, lalu ikut ke EN jika sinkron aktif ----------
  // toEn: fungsi yang menerima daftar EN saat ini dan mengembalikan daftar EN baru
  const commit = async (section: string, value: any, toEn: (en: any) => any): Promise<boolean> => {
    if (!(await persist(section, value))) {
      notify('Gagal menyimpan', false);
      return false;
    }
    if (syncing) {
      const enOk = await persist(section, toEn(content.en[section]), 'en');
      notify(enOk ? 'Tersimpan (ID + EN)' : 'Tersimpan di ID, tetapi gagal ke EN', enOk);
    } else {
      notify(`Tersimpan (${lang.toUpperCase()})`);
    }
    return true;
  };

  // ---------- CREATE & UPDATE ----------
  const saveItem = async () => {
    if (!editing) return;
    const { index, item } = editing;
    const list: Item[] = [...listOf(tab)];
    if (index === null) list.push(item);
    else list[index] = item;

    const ok = await commit(tab, list, (en) => {
      const enList: Item[] = [...(en ?? [])];
      if (index === null) {
        // Item baru: disalin ke EN (teks masih bahasa Indonesia, terjemahkan lewat tab EN)
        enList.push(structuredClone(item));
        return enList;
      }
      // Edit: hanya kolom yang tidak bergantung bahasa yang disalin
      const n = matchIndex(enList, item, index);
      if (n >= 0) enList[n] = { ...enList[n], ...pick(item, SHARED[tab] ?? []) };
      return enList;
    });
    if (ok) setEditing(null);
  };

  // ---------- DELETE ----------
  const removeItem = (i: number) => {
    const message = syncing ? 'Hapus item ini di versi ID dan EN?' : 'Hapus item ini?';
    if (!confirm(message)) return;
    const target = listOf(tab)[i];
    commit(tab, listOf(tab).filter((_: Item, n: number) => n !== i), (en) => {
      const enList: Item[] = [...(en ?? [])];
      const n = matchIndex(enList, target, i);
      if (n >= 0) enList.splice(n, 1);
      return enList;
    });
  };

  // ---------- Ubah urutan ----------
  const moveItem = (i: number, dir: -1 | 1) => {
    const list: Item[] = [...listOf(tab)];
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const a = list[i];
    const b = list[j];
    [list[i], list[j]] = [list[j], list[i]];

    commit(tab, list, (en) => {
      const enList: Item[] = [...(en ?? [])];
      const x = matchIndex(enList, a, i);
      const y = matchIndex(enList, b, j);
      if (x >= 0 && y >= 0) [enList[x], enList[y]] = [enList[y], enList[x]];
      return enList;
    });
  };

  // ---------- Skills (nama teknologi sama di kedua bahasa, jadi ikut disalin utuh) ----------
  const saveSkills = (group: string, list: string[]) =>
    commit('skills', { ...content[lang].skills, [group]: list }, (en) => ({ ...(en ?? {}), [group]: list }));

  // Jumlah item per menu (ditampilkan sebagai angka kecil di sidebar)
  const countOf = (id: string) =>
    id === 'skills'
      ? SKILL_GROUPS.reduce((n, g) => n + (content[lang].skills?.[g]?.length ?? 0), 0)
      : content[lang][id]?.length ?? 0;

  // ============================================================
  // LAYAR TUNGGU (mengecek sesi tersimpan, mencegah layar login berkedip)
  // ============================================================
  if (checking) {
    return <div className="min-h-screen bg-dark" />;
  }

  // ============================================================
  // LAYAR LOGIN
  // ============================================================
  if (!authed) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center p-6 relative overflow-hidden">
        {/* Hiasan cahaya di latar */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent rounded-full blur-3xl opacity-20"></div>

        {/* Tombol kembali ke website (href="#" menghapus #admin dari alamat) */}
        <a
          href="#"
          className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-white/10 text-surface-white text-sm font-bold hover:bg-accent hover:text-dark transition-colors"
        >
          <ArrowLeft size={18} />
          Kembali ke website
        </a>

        <div className="relative bg-surface-white rounded-[2rem] p-8 md:p-10 w-full max-w-sm shadow-2xl">
          <div className="w-14 h-14 bg-primary text-surface-white rounded-2xl flex items-center justify-center mb-6">
            <Lock size={26} />
          </div>
          <h1 className="font-black text-3xl tracking-tight">Admin</h1>
          <p className="text-muted text-sm mt-1 mb-6">Masuk untuk mengelola isi portofolio.</p>

          <input
            type="password" placeholder="Password" value={password} autoFocus
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            className={`${INPUT} !mt-0`}
          />
          <button onClick={login}
            className="w-full mt-4 bg-dark text-surface-white font-bold py-3 rounded-xl hover:bg-primary transition-colors">
            Masuk
          </button>
          {loginError && <p className="text-sm text-red-600 mt-4">{loginError}</p>}
        </div>
      </div>
    );
  }

  const section = SECTIONS[tab];
  const items: Item[] = section ? listOf(tab) : [];
  const current = TABS.find((t) => t.id === tab)!;

  // ============================================================
  // LAYAR UTAMA ADMIN
  // ============================================================
  return (
    <div className="min-h-screen bg-background text-dark md:flex">
      {/* ---------- SIDEBAR (jadi bar atas di HP) ---------- */}
      <aside className="bg-dark text-surface-white md:w-64 md:h-screen md:sticky md:top-0 p-4 md:p-6 flex flex-col gap-4 md:gap-8 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-black text-xl leading-none tracking-tight">ARIL ENGNO</p>
            <p className="text-xs font-bold tracking-widest text-accent mt-1">ADMIN PANEL</p>
          </div>
          <button onClick={logout} aria-label="Keluar"
            className="md:hidden w-9 h-9 rounded-full bg-surface-white/10 flex items-center justify-center">
            <LogOut size={16} />
          </button>
        </div>

        {/* Menu bagian */}
        <nav className="flex md:flex-col gap-2 overflow-x-auto -mx-1 px-1 pb-1 md:pb-0">
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
                tab === id ? 'bg-accent text-dark' : 'text-surface-white/70 hover:bg-surface-white/10'
              }`}>
              <Icon size={18} />
              <span className="flex-1 text-left">{label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${tab === id ? 'bg-dark/10' : 'bg-surface-white/10'}`}>
                {countOf(id)}
              </span>
            </button>
          ))}
        </nav>

        {/* Tautan bawah (hanya di desktop) */}
        <div className="hidden md:flex flex-col gap-2 mt-auto">
          <a href="/" target="_blank" rel="noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-surface-white/70 hover:bg-surface-white/10">
            <ExternalLink size={18} /> Lihat website
          </a>
          <button onClick={logout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-surface-white/70 hover:bg-surface-white/10">
            <LogOut size={18} /> Keluar
          </button>
        </div>
      </aside>

      {/* ---------- KONTEN ---------- */}
      <main className="flex-1 p-4 md:p-10 min-w-0">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header: judul bagian + sinkron + pilihan bahasa + tombol tambah */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary text-surface-white rounded-2xl flex items-center justify-center">
                <current.Icon size={22} />
              </div>
              <div>
                <h1 className="font-black text-2xl md:text-3xl tracking-tight leading-none">{current.label}</h1>
                <p className="text-sm text-muted mt-1">{countOf(tab)} data · versi {lang === 'id' ? 'Indonesia' : 'Inggris'}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Sinkron ke EN (hanya tampil saat mengedit versi Indonesia) */}
              {lang === 'id' && (
                <button
                  onClick={() => setSyncEn(!syncEn)}
                  title="Jika aktif, tambah, hapus, urutan, serta gambar/link/logo ikut diterapkan ke versi Inggris"
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                    syncEn
                      ? 'bg-accent text-dark border-accent'
                      : 'bg-surface-white text-muted border-gray-200 hover:text-dark'
                  }`}
                >
                  <Languages size={16} />
                  Sinkron ke EN: {syncEn ? 'ON' : 'OFF'}
                </button>
              )}

              {/* Pilihan bahasa */}
              <div className="bg-surface-white rounded-full p-1 flex shadow-sm border border-gray-100">
                {(['id', 'en'] as Lang[]).map((l) => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
                      lang === l ? 'bg-dark text-surface-white' : 'text-muted hover:text-dark'
                    }`}>{l.toUpperCase()}</button>
                ))}
              </div>

              {section && (
                <button onClick={() => setEditing({ index: null, item: section.blank() })}
                  className="bg-primary text-surface-white font-bold text-sm px-5 py-2.5 rounded-full flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-primary/30">
                  <Plus size={18} /> Tambah
                </button>
              )}
            </div>
          </div>

          {/* ---------- SKILLS ---------- */}
          {tab === 'skills' && (
            <div className="grid sm:grid-cols-2 gap-4">
              {SKILL_GROUPS.map((g) => {
                const list: string[] = content[lang].skills?.[g] ?? [];
                return (
                  <div key={g} className="bg-surface-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-black text-sm tracking-widest uppercase text-primary mb-4">{g}</h3>

                    {/* Chip skill: klik teks untuk edit, disimpan saat klik di luar */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {list.map((skill, i) => (
                        <div key={`${g}-${i}-${skill}`}
                          className="bg-background border border-gray-200 rounded-full pl-4 pr-1 py-1 flex items-center gap-1">
                          <input
                            defaultValue={skill} size={Math.max(skill.length, 3)}
                            className="bg-transparent text-sm font-medium outline-none"
                            onBlur={(e) => {
                              const v = e.target.value.trim();
                              if (v && v !== skill) saveSkills(g, list.map((s, n) => (n === i ? v : s)));
                            }} />
                          <button onClick={() => saveSkills(g, list.filter((_, n) => n !== i))}
                            aria-label="Hapus skill"
                            className="w-6 h-6 rounded-full flex items-center justify-center text-muted hover:bg-red-100 hover:text-red-600">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                      {list.length === 0 && <p className="text-sm text-muted">Belum ada skill.</p>}
                    </div>

                    {/* Tambah skill baru */}
                    <div className="flex gap-2">
                      <input
                        placeholder="Skill baru..." value={newSkill[g] ?? ''}
                        onChange={(e) => setNewSkill({ ...newSkill, [g]: e.target.value })}
                        onKeyDown={async (e) => {
                          if (e.key !== 'Enter') return;
                          const v = (newSkill[g] ?? '').trim();
                          if (v && (await saveSkills(g, [...list, v]))) setNewSkill({ ...newSkill, [g]: '' });
                        }}
                        className={`${INPUT} !mt-0`} />
                      <button
                        onClick={async () => {
                          const v = (newSkill[g] ?? '').trim();
                          if (v && (await saveSkills(g, [...list, v]))) setNewSkill({ ...newSkill, [g]: '' });
                        }}
                        aria-label="Tambah skill"
                        className="bg-dark text-surface-white w-11 rounded-xl flex items-center justify-center hover:bg-primary transition-colors shrink-0">
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ---------- PROJECTS / DESIGNS / EXPERIENCE / EDUCATION / AWARDS ---------- */}
          {section && (
            <div className="space-y-3">
              {items.length === 0 && (
                <div className="border-2 border-dashed border-gray-300 rounded-3xl py-16 text-center text-muted">
                  <section.Icon size={36} className="mx-auto mb-3 opacity-40" />
                  <p className="font-medium">Belum ada data. Klik “Tambah” untuk mulai.</p>
                </div>
              )}

              {items.map((item, i) => {
                const [title, sub] = section.summary(item);
                return (
                  <div key={i}
                    className="bg-surface-white rounded-3xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                    {/* Thumbnail: gambar, atau logo sekolah, atau ikon jika keduanya kosong */}
                    {item.image ? (
                      <img src={item.image} alt="" onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
                        className="w-16 h-16 rounded-2xl object-cover bg-gray-100 shrink-0" />
                    ) : item.logo ? (
                      <img src={item.logo} alt="" onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
                        className="w-16 h-16 rounded-2xl object-contain bg-gray-50 border border-gray-100 p-1.5 shrink-0" />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <section.Icon size={24} />
                      </div>
                    )}

                    {/* Judul, keterangan, dan badge */}
                    <div className="flex-1 min-w-0">
                      <p className="font-black tracking-tight truncate">{title || '(tanpa judul)'}</p>
                      <p className="text-sm text-muted truncate">{sub}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {item.rank && (
                          <span className="bg-accent text-dark text-xs font-bold px-2.5 py-0.5 rounded-full">{item.rank}</span>
                        )}
                        {(item.techStack ?? []).slice(0, 3).map((t: string) => (
                          <span key={t} className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Tombol aksi */}
                    <div className="flex items-center shrink-0">
                      <div className="hidden sm:flex">
                        <button onClick={() => moveItem(i, -1)} disabled={i === 0} className={ICON_BTN} aria-label="Naik"><ArrowUp size={16} /></button>
                        <button onClick={() => moveItem(i, 1)} disabled={i === items.length - 1} className={ICON_BTN} aria-label="Turun"><ArrowDown size={16} /></button>
                      </div>
                      <button onClick={() => setEditing({ index: i, item: structuredClone(item) })}
                        className={ICON_BTN} aria-label="Edit"><Pencil size={16} /></button>
                      <button onClick={() => removeItem(i)}
                        className={`${ICON_BTN} text-red-600 hover:!bg-red-50`} aria-label="Hapus"><Trash2 size={16} /></button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* ---------- FORMULIR TAMBAH / EDIT (popup) ---------- */}
      {editing && section && (
        <div className="fixed inset-0 bg-dark/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setEditing(null)}>
          <div className="bg-surface-white rounded-[2rem] w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}>
            {/* Judul popup */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
              <div>
                <h2 className="font-black text-xl tracking-tight">
                  {editing.index === null ? 'Tambah' : 'Edit'} {section.label}
                </h2>
                <p className="text-xs text-muted mt-0.5">Versi {lang === 'id' ? 'Indonesia' : 'Inggris'}</p>
              </div>
              <button onClick={() => setEditing(null)} className={ICON_BTN} aria-label="Tutup"><X size={18} /></button>
            </div>

            {/* Isian formulir */}
            <div className="p-6 space-y-4 overflow-y-auto">
              {/* Keterangan sinkron */}
              {syncing && (
                <div className="flex items-start gap-3 bg-accent/30 rounded-2xl p-3 text-xs font-medium text-dark">
                  <Languages size={16} className="shrink-0 mt-0.5" />
                  <p>
                    {editing.index === null
                      ? 'Item baru juga ditambahkan ke versi Inggris dengan teks yang sama. Terjemahkan lewat tab EN.'
                      : 'Gambar, logo, link, dan tahun ikut diterapkan ke versi Inggris. Teks versi Inggris tidak diubah.'}
                  </p>
                </div>
              )}

              {/* Pratinjau gambar jika ada kolom gambar */}
              {editing.item.image && (
                <img src={editing.item.image} alt="Pratinjau"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                  className="w-full h-40 object-cover rounded-2xl bg-gray-100" />
              )}

              {/* Pratinjau logo sekolah (kotak kecil, gambar utuh tanpa terpotong) */}
              {editing.item.logo && (
                <div className="flex items-center gap-4 bg-background rounded-2xl p-3 border border-gray-100">
                  <img src={editing.item.logo} alt="Pratinjau logo"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                    className="w-16 h-16 object-contain bg-surface-white rounded-xl border border-gray-100 p-1.5" />
                  <p className="text-xs text-muted font-medium">
                    Pratinjau logo. Kalau tidak muncul, cek nama file di folder public/assets/images.
                  </p>
                </div>
              )}

              {section.fields.map((f) => (
                <FieldInput key={f.key} field={f} value={editing.item[f.key]}
                  onChange={(v) => setEditing({ ...editing, item: { ...editing.item, [f.key]: v } })} />
              ))}
            </div>

            {/* Tombol bawah */}
            <div className="flex gap-3 justify-end p-6 pt-4 border-t border-gray-100">
              <button onClick={() => setEditing(null)}
                className="px-6 py-2.5 rounded-full bg-gray-100 font-bold text-sm hover:bg-gray-200 transition-colors">Batal</button>
              <button onClick={saveItem}
                className="px-6 py-2.5 rounded-full bg-primary text-surface-white font-bold text-sm hover:scale-105 transition-transform">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- NOTIFIKASI ---------- */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-full text-sm font-bold shadow-xl ${
          toast.ok ? 'bg-dark text-accent' : 'bg-red-600 text-surface-white'
        }`}>
          {toast.text}
        </div>
      )}
    </div>
  );
}