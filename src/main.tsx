// ============================================================
// IMPORT
// ============================================================
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AdminPage } from './components/AdminPage';
import { loadContent } from './loadContent';
import './index.css';

// ============================================================
// ROOT: memilih halaman berdasarkan alamat
//   localhost:3000         -> website portofolio
//   localhost:3000/#admin  -> halaman admin
// ============================================================
function Root() {
  const [isAdmin, setIsAdmin] = useState(location.hash === '#admin');

  // Ikuti perubahan alamat tanpa perlu refresh halaman
  useEffect(() => {
    const onHashChange = () => setIsAdmin(location.hash === '#admin');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return isAdmin ? <AdminPage /> : <App />;
}

// ============================================================
// MULAI APLIKASI
// Data terbaru dari admin dimuat dulu, baru halaman ditampilkan.
// Jika gagal dimuat, website tetap tampil dengan data bawaan config.
// ============================================================
loadContent().finally(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Root />
    </StrictMode>,
  );
});