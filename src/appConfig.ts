// ============================================================
// KONFIGURASI KONTEN WEBSITE (BAHASA INDONESIA)
// Semua teks, link, dan data portofolio diatur di sini.
// File appConfigEn.ts harus punya struktur yang sama persis,
// hanya isinya dalam bahasa Inggris.
// ============================================================
export const APP_CONFIG = {
  // ----------------------------------------------------------
  // DATA PRIBADI (tampil di Hero, About, dan Footer)
  // ----------------------------------------------------------
  personal: {
    name: "Uaryl Engno Laurenca",
    brand: "Uaryl Engno Laurenca Creative",
    role: "IT Enthusiast & Creative Developer",
    tagline: "Membangun solusi digital melalui teknologi, desain, dan kreativitas.",
    description:
      "Perkenalkan, saya Uaryl Engno Laurenca. Saya memiliki minat besar di bidang teknologi informasi dan pengembangan kreatif. Fokus utama saya adalah menciptakan pengalaman digital yang tidak hanya fungsional secara teknis, tetapi juga menarik secara visual dan intuitif.",
  },

  // ----------------------------------------------------------
  // WARNA TEMA
  // ----------------------------------------------------------
  theme: {
    primary: "#250BF0",    // biru utama
    secondary: "#3B1CFF",  // biru pendukung
    accent: "#C8FF00",     // hijau neon (tombol & aksen)
    background: "#F4F7FC", // latar halaman terang
    white: "#FFFFFF",
    dark: "#111111",       // latar section gelap
    muted: "#6B7280",      // teks abu-abu
  },

  // ----------------------------------------------------------
  // KONTAK & SOSIAL MEDIA
  // ----------------------------------------------------------
  contact: {
    email: "dpa71845@gmail.com",
    whatsapp: "https://wa.me/62082334889598",
    instagram: "https://instagram.com/arilengno",
    linkedin:
      "https://www.linkedin.com/in/uaryl-engno-laurenca-b6a979249?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com",
    facebook: "https://facebook.com", // TODO: ganti dengan akun Facebook kamu
    youtube: "https://youtube.com",   // TODO: ganti dengan channel YouTube kamu
  },

  // ----------------------------------------------------------
  // KEAHLIAN (tampil di section Skills)
  // ----------------------------------------------------------
  skills: {
    programming: ["HTML", "CSS", "JavaScript", "PHP", "Python"],
    design: ["Figma", "Ibis Paint X", "Infinite Design", "Canva", "PixelLab"],
    it: ["Networking", "Database Management", "Linux"],
    other: ["Video Editing", "UI/UX Design"],
  },

  // ----------------------------------------------------------
  // PROYEK (tampil di section Projects)
  // demoLink: link demo. Isi "#" jika belum ada
  // githubLink: dipakai jika demoLink kosong ("#")
  // Seluruh kartu proyek bisa diklik dan membuka link di tab baru
  // ----------------------------------------------------------
  projects: [
    {
      id: "project-1",
      title: "Aplikasi Dapur Kuliner Pak Ndut",
      category: "Web Development",
      description:
        "Sistem terintegrasi untuk mengelola data siswa, absensi guru, dan informasi akademik sekolah secara real-time.",
      image: "/assets/images/ndut2.png",
      techStack: [],
      role: "Full-stack Developer",
      demoLink: "https://pameran-jti.polije.ac.id/product/589/aplikasi-dapur-kuliner-pak-ndut",
      githubLink: "#",
      size: "large",
    },
    {
      id: "project-2",
      title: "Website Dapur Kuliner Pak Ndut",
      category: "UI/UX Design",
      description:
        "Desain antarmuka aplikasi mobile e-commerce dengan fokus pada pengalaman pengguna dan kemudahan checkout.",
      image: "/assets/images/ndut1.png",
      techStack: [],
      role: "UI/UX Designer",
      demoLink: "https://pameran-jti.polije.ac.id/product/411/dapur-kuliner-pak-ndut",
      githubLink: "",
      size: "medium",
    },
    {
      id: "project-3",
      title: "Aplikasi Dan Website SMP Negeri 1 Loceret",
      category: "Web Development",
      description:
        "Website company profile responsif untuk startup teknologi dengan animasi modern dan performa tinggi.",
      image:
        "https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=1600&auto=format&fit=crop",
      techStack: [],
      role: "Front-end Developer",
      demoLink: "#",
      githubLink: "#",
      size: "medium",
    },
  ],

  // ----------------------------------------------------------
  // PENGALAMAN (tampil sebagai kartu folder di section Experience)
  // ----------------------------------------------------------
  experience: [
    {
      role: "Creative Developer Intern",
      company: "Tech Innovation Hub",
      year: "2025 - Present",
      description:
        "Mengembangkan antarmuka web interaktif, mengelola database, dan berkolaborasi dalam tim agile.",
    },
    {
      role: "Frontend Web Developer",
      company: "Digital Studio Nusantara",
      year: "2023 - 2024",
      description:
        "Membangun tampilan website responsif berbasis React dan melakukan integrasi API untuk berbagai proyek internal.",
    },
    {
      role: "Freelance Graphic Designer",
      company: "Self-Employed",
      year: "2024 - 2025",
      description:
        "Membuat desain UI/UX dan materi branding untuk berbagai klien UMKM nasional.",
    },
    {
      role: "IT Support Staff",
      company: "PT Teknologi Muda Berkarya",
      year: "2022 - 2023",
      description:
        "Menangani instalasi perangkat lunak, trouble shooting ringan, serta memastikan kelancaran jaringan lokal di kantor.",
    },
    {
      role: "Junior Web Developer",
      company: "Kreatif Tech Studio",
      year: "2021 - 2022",
      description:
        "Membantu pengembangan fitur website, memperbaiki bug, dan memelihara sistem manajemen konten klien.",
    },
    {
      role: "Content Creator Intern",
      company: "Media Edukasi Digital",
      year: "2020 - 2021",
      description:
        "Memproduksi desain grafis dan video pendek untuk keperluan edukasi dan pemasaran di media sosial.",
    },
  ],

  // ----------------------------------------------------------
  // PENDIDIKAN (tampil sebagai timeline di section Education)
  // major dan achievements boleh dikosongkan ("")
  // logo: file di public/assets/images/ (mis. "/assets/images/polije.png")
  //       boleh dikosongkan (""), nanti tampil huruf awal sekolah
  // ----------------------------------------------------------
  education: [
    {
      school: "Politeknik Negeri Jember",
      major: "Teknik Informatika",
      year: "2025 - Sekarang",
      achievements: "Anggota HMJTI Departemen Kominfo biro Publikasi",
      logo: "/assets/images/polije.png",
    },
    {
      school: "SMK Negeri 1 Gondang Nganjuk",
      major: "Teknik Jaringan dan Komputer",
      year: "2023 - 2025",
      achievements: "Anggota Osis Devisi Publikasi, dokumentasi & Desain",
      logo: "/assets/images/smk.jpg",
    },
    {
      school: "SMP Negeri 3 Tanjunganom",
      major: "",
      year: "2020 - 2023",
      achievements: "Anggota OSIS Devisi Publikasi, dokumentasi & Desain",
      logo: "/assets/images/smp.png",
    },
    {
      school: "SD Negeri 2 Sambirejo",
      major: "",
      year: "2011 - 2017",
      achievements: "",
      logo: "/assets/images/sd.png",
    },
  ],

  // ----------------------------------------------------------
  // DESAIN (poster, pamflet, dll. Tampil di section Designs)
  // category: dipakai sebagai tombol filter, mis. "Poster", "Pamflet"
  // ----------------------------------------------------------
  designs: [
    {
      id: "design-1792419131722",
      title: "Speakpreneur HMJTI 2026",
      category: "Pamflet",
      year: "2026",
      image: "/assets/images/speak.png",
    },
    {
      id: "design-1792419187132",
      title: "Nganjuk Skill Clash Challenge 2026",
      category: "Pamflet",
      year: "2026",
      image: "/assets/images/nganjukskill.png",
    },
    {
      id: "design-1792419223215",
      title: "Arak Arakan Wisudawan Teknologi Informasi 2026",
      category: "Pamflet",
      year: "2026",
      image: "/assets/images/arak.png",
    },
    {
      id: "design-1792419289402",
      title: "K3 Mental: Transformasi Keselamatan Kerja era Modern",
      category: "Poster",
      year: "2026",
      image: "/assets/images/k3kesehatanmental.jpg",
    },
    {
      id: "design-1792419335451",
      title: "KLATEN Dari mata Air mengalir Peradaban",
      category: "Poster",
      year: "2026",
      image: "/assets/images/klaten.jpg",
    },
    {
      id: "design-1792419371429",
      title: "EPIM-TI (IT Student Competition 2026)",
      category: "Pamflet",
      year: "2026",
      image: "/assets/images/epim.png",
    },
    {
      id: "design-1792419429363",
      title: "Satu Klik Seribu Dampak",
      category: "Poster",
      year: "2026",
      image: "/assets/images/satuklikseribudampak.jpg",
    },
    {
      id: "design-1792421268158",
      title: "Tangguh di Tengah Tekanan",
      category: "Poster",
      year: "2026",
      image: "/assets/images/tangguh.jpg",
    },
    {
      id: "design-1792421302296",
      title: "TEMPEVOLUSI (Transformasi Tempe menjadi energi Generasi Produktif)",
      category: "Poster",
      year: "2026",
      image: "/assets/images/tempe.jpg",
    },
  ],

  // ----------------------------------------------------------
  // SERTIFIKAT & PENGHARGAAN (tampil di section Certificates & Awards)
  // image: link internet, atau file di public/assets/images/
  // ----------------------------------------------------------
  certificates: [
    {
      title: "Juara 2 Aplikasi Dapur Kuliner Pak Ndut",
      issuer: "Java Tech Exhibition 4.0 Politeknik Negeri Jember",
      year: "2026",
      image: "/assets/images/juara2aplikasi.png",
      rank: "Juara 2",
      competition: "Java Tech Exhibition 4.0 Politeknik Negeri Jember",
    },
    {
      title: "Juara 1 Lomba Poster Digital Think Before You Post",
      issuer: "Universitas Duta Bangsa Surakarta",
      year: "2026",
      image: "/assets/images/juara1posterdutabangsasurakarta.jpg",
      rank: "Juara 1",
      competition: "Universitas Duta Bangsa Surakarta",
    },
    {
      title: "Juara 1 Lomba Poster Dapur Kuliner Pak Ndut",
      issuer: "Java Tech Exhibition 3.0 Politeknik Negeri Jember",
      year: "2026",
      image: "/assets/images/juara1posterpakndut.jpg",
      rank: "Juara 1",
      competition: "Java Tech Exhibition 3.0 Politeknik Negeri Jember",
    },
    {
      title: "Juara 3 Lomba Poster Digital",
      issuer: "Java Tech Exhibition 2.0 Politeknik Negeri Jember",
      year: "2025",
      image: "/assets/images/juara3jposteravatech.jpg",
      rank: "Juara 3",
      competition: "Java Tech Exhibition 2.0 Politeknik Negeri Jember",
    },
    {
      title: "Juara 2 Master Of Ceremony",
      issuer: "HUT RI Ke 79 Kecamatan Gondang Nganjuk",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop",
      rank: "Juara 2",
      competition: "HUT RI Ke 79 Kecamatan Gondang Nganjuk",
    },
  ],

  // ----------------------------------------------------------
  // LAYANAN (tampil di section Services)
  // ----------------------------------------------------------
  services: [
    { title: "Web Development", description: "Membangun website responsif dan dinamis." },
    { title: "UI/UX Design", description: "Merancang antarmuka pengguna yang intuitif." },
    { title: "Graphic Design", description: "Desain visual untuk branding dan marketing." },
    { title: "IT Support", description: "Pemeliharaan dan perbaikan sistem IT." },
    { title: "Video Editing", description: "Pengeditan video profesional untuk berbagai kebutuhan." },
  ],
};