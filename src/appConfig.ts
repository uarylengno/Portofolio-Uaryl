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
    role: "Mahasiswa Teknik Informatika | App & Visual Design",
    tagline: "Membangun solusi digital melalui teknologi, desain, dan kreativitas.",
    description:
      "Saya Uaryl Engno Laurenca, mahasiswa Teknik Informatika di Politeknik Negeri Jember. Saya mengembangkan aplikasi dan website, merancang UI/UX, serta membuat poster dan pamflet. Portofolio saya mencakup aplikasi dan website Dapur Kuliner Pak Ndut serta karya visual untuk berbagai kegiatan.",
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
    youtube: "https://youtube.com/@uarylengnolaurenca849?si=PL3sAyYv7Lv-YIWR",
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
        "Aplikasi pemesanan makanan Dapur Kuliner Pak Ndut dengan pencarian menu, filter kategori, keranjang belanja, riwayat pesanan, dan profil pengguna. Dirancang agar pemesanan lebih cepat dan mudah digunakan.",
      image: "/assets/images/dapurkuliner.webp",
      techStack: [],
      role: "Application Developer",
      demoLink: "https://pameran-jti.polije.ac.id/product/589/aplikasi-dapur-kuliner-pak-ndut",
      githubLink: "#",
      size: "large",
    },
    {
      id: "project-2",
      title: "Website Dapur Kuliner Pak Ndut",
      category: "UI/UX Design",
      description:
        "Website UMKM Dapur Kuliner Pak Ndut untuk menampilkan menu, informasi usaha, dan layanan pemesanan makanan. Dilengkapi keranjang otomatis, perhitungan total harga, pelacakan pesanan, serta pengelolaan menu.",
      image: "/assets/images/ndut1.webp",
      techStack: [],
      role: "Website Designer",
      demoLink: "https://pameran-jti.polije.ac.id/product/411/dapur-kuliner-pak-ndut",
      githubLink: "",
      size: "medium",
    },
    {
      id: "project-3",
      title: "Aplikasi & Website SMP Negeri 1 Loceret",
      category: "Pengembangan Aplikasi & Website",
      description:
        "Proyek aplikasi dan website untuk SMP Negeri 1 Loceret sedang dalam proses pengembangan. Informasi dan detail proyek akan ditampilkan setelah siap.",
      image: "",
      techStack: [],
      role: "Dalam Pengembangan",
      demoLink: "",
      githubLink: "",
      size: "medium",
      comingSoon: true,
    },
  ],

  // ----------------------------------------------------------
  // PENGALAMAN (tampil sebagai kartu folder di section Experience)
  // ----------------------------------------------------------
  experience: [
    {
      role: "Pengembang Aplikasi & Website",
      company: "Proyek Portofolio Dapur Kuliner Pak Ndut",
      year: "2026",
      description:
        "Mengembangkan aplikasi pemesanan makanan dan website untuk menampilkan menu serta informasi usaha. Proyek ini meraih Juara 2 Aplikasi Dapur Kuliner Pak Ndut di Java Tech Exhibition 4.0.",
    },
    {
      role: "Desainer Grafis & Kreator Visual",
      company: "Proyek Desain Independen",
      year: "2025 - 2026",
      description:
        "Membuat poster dan pamflet untuk berbagai kegiatan, termasuk Java Tech Exhibition, Speakpreneur HMJTI, Open Recruitment HMJTI, dan Visit IT.",
    },
    {
      role: "Panitia Kegiatan Kampus",
      company: "Politeknik Negeri Jember dan HMJTI",
      year: "2025 - 2026",
      description:
        "Terlibat sebagai panitia dalam kegiatan Sekolah Bisnis dan Digital, Latihan Dasar Kepemimpinan, Nganjuk Skill Clash Challenge, dan Workshop Peluang Digital.",
    },
    {
      role: "Prestasi Kompetisi",
      company: "Kompetisi Poster, Aplikasi, dan Master of Ceremony",
      year: "2024 - 2026",
      description:
        "Meraih Juara 1 poster Think Before You Post dan Java Tech Exhibition 3.0, Juara 2 aplikasi Dapur Kuliner Pak Ndut dan lomba Master of Ceremony HUT RI ke-79, serta Juara 3 Java Tech Exhibition 2.0.",
    },
  ],

  // ----------------------------------------------------------
  // PENDIDIKAN (tampil sebagai timeline di section Education)
  // major dan achievements boleh dikosongkan ("")
  // logo: file di public/assets/images/ (mis. "/assets/images/polije.webp")
  //       boleh dikosongkan (""), nanti tampil huruf awal sekolah
  // ----------------------------------------------------------
  education: [
    {
      school: "Politeknik Negeri Jember",
      major: "Teknik Informatika",
      year: "2025 - Sekarang",
      achievements: "Anggota HMJTI Departemen Kominfo biro Publikasi",
      logo: "/assets/images/polije.webp",
    },
    {
      school: "SMK Negeri 1 Gondang Nganjuk",
      major: "Teknik Jaringan dan Komputer",
      year: "2023 - 2025",
      achievements: "Anggota Osis Devisi Publikasi, dokumentasi & Desain",
      logo: "/assets/images/smk.webp",
    },
    {
      school: "SMP Negeri 3 Tanjunganom",
      major: "",
      year: "2020 - 2023",
      achievements: "Anggota OSIS Devisi Publikasi, dokumentasi & Desain",
      logo: "/assets/images/smp.webp",
    },
    {
      school: "SD Negeri 2 Sambirejo",
      major: "",
      year: "2011 - 2017",
      achievements: "",
      logo: "/assets/images/sd.webp",
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
      image: "/assets/images/speak.webp",
    },
    {
      id: "design-open-recruitment-hmjti-2026",
      title: "Open Recruitment HMJTI 2026/2027",
      category: "Pamflet",
      year: "2026",
      image: "/assets/images/open.webp",
    },
    {
      id: "design-visit-it-2026",
      title: "Open Registrasi Visit IT 2026",
      category: "Pamflet",
      year: "2026",
      image: "/assets/images/visit.webp",
    },
    {
      id: "design-1792419187132",
      title: "Nganjuk Skill Clash Challenge 2026",
      category: "Pamflet",
      year: "2026",
      image: "/assets/images/nganjukskill.webp",
    },
    {
      id: "design-1792419223215",
      title: "Arak Arakan Wisudawan Teknologi Informasi 2026",
      category: "Pamflet",
      year: "2026",
      image: "/assets/images/arak.webp",
    },
    {
      id: "design-workshop-peluang-digital-nganjuk-2026",
      title: "Workshop Peluang Digital untuk Bisnis Berkelanjutan",
      category: "Pamflet",
      year: "2026",
      image: "/assets/images/wpdnganjuk.webp",
    },
    {
      id: "design-tasyakuran-ramadhan-2026",
      title: "Tasyakuran Ramadhan 2026",
      category: "Pamflet",
      year: "2026",
      image: "/assets/images/raber.webp",
    },
    {
      id: "design-campus-expo-smeksago-2026",
      title: "Campus Expo SMEKSAGO 2026",
      category: "Pamflet",
      year: "2026",
      image: "/assets/images/exposmeksago.webp",
    },
    {
      id: "design-1792419289402",
      title: "K3 Mental: Transformasi Keselamatan Kerja era Modern",
      category: "Poster",
      year: "2026",
      image: "/assets/images/k3kesehatanmental.webp",
    },
    {
      id: "design-1792419335451",
      title: "KLATEN Dari mata Air mengalir Peradaban",
      category: "Poster",
      year: "2026",
      image: "/assets/images/klaten.webp",
    },
    {
      id: "design-jejak-hijau",
      title: "Jejak Hijau",
      category: "Poster",
      year: "2026",
      image: "/assets/images/jejakhijau.webp",
    },
    {
      id: "design-java-tech-exhibition",
      title: "Java Tech Exhibition",
      category: "Poster",
      year: "2026",
      image: "/assets/images/javatech.webp",
    },
    {
      id: "design-1792419371429",
      title: "EPIM-TI (IT Student Competition 2026)",
      category: "Pamflet",
      year: "2026",
      image: "/assets/images/epim.webp",
    },
    {
      id: "design-1792419429363",
      title: "Satu Klik Seribu Dampak",
      category: "Poster",
      year: "2026",
      image: "/assets/images/satuklikseribudampak.webp",
    },
    {
      id: "design-1792421268158",
      title: "Tangguh di Tengah Tekanan",
      category: "Poster",
      year: "2026",
      image: "/assets/images/tangguh.webp",
    },
    {
      id: "design-1792421302296",
      title: "TEMPEVOLUSI (Transformasi Tempe menjadi energi Generasi Produktif)",
      category: "Poster",
      year: "2026",
      image: "/assets/images/tempe.webp",
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
      image: "/assets/images/juara2aplikasi.webp",
      rank: "Juara 2",
      competition: "Java Tech Exhibition 4.0 Politeknik Negeri Jember",
    },
    {
      title: "Juara 1 Lomba Poster Digital Think Before You Post",
      issuer: "Universitas Duta Bangsa Surakarta",
      year: "2026",
      image: "/assets/images/juara1posterdutabangsasurakarta.webp",
      rank: "Juara 1",
      competition: "Universitas Duta Bangsa Surakarta",
    },
    {
      title: "Juara 1 Lomba Poster Dapur Kuliner Pak Ndut",
      issuer: "Java Tech Exhibition 3.0 Politeknik Negeri Jember",
      year: "2026",
      image: "/assets/images/juara1posterpakndut.webp",
      rank: "Juara 1",
      competition: "Java Tech Exhibition 3.0 Politeknik Negeri Jember",
    },
    {
      title: "Juara 3 Lomba Poster Digital",
      issuer: "Java Tech Exhibition 2.0 Politeknik Negeri Jember",
      year: "2025",
      image: "/assets/images/juara3jposteravatech.webp",
      rank: "Juara 3",
      competition: "Java Tech Exhibition 2.0 Politeknik Negeri Jember",
    },
    {
      title: "Juara 2 Master Of Ceremony",
      issuer: "HUT RI Ke 79 Kecamatan Gondang Nganjuk",
      year: "2024",
      image: "",
      rank: "Juara 2",
      competition: "HUT RI Ke 79 Kecamatan Gondang Nganjuk",
    },
    {
      title: "Panitia Lomba Mobile Legends Nganjuk Skill Clash Challenge",
      issuer: "Politeknik Negeri Jember Kampus 3 PSDKU Nganjuk",
      year: "2026",
      image: "/assets/images/panitaml2026.webp",
      category: "committee" as const,
    },
    {
      title: "Panitia Sekolah Bisnis dan Digital",
      issuer: "BEM Politeknik Negeri Jember Kampus PSDKU 3 Nganjuk",
      year: "2025",
      image: "/assets/images/panitiasbd.webp",
      category: "committee" as const,
    },
    {
      title: "Panitia Latihan Dasar Kepemimpinan",
      issuer: "Himpunan Mahasiswa Jurusan Teknologi Informasi Politeknik Negeri Jember",
      year: "2026",
      image: "/assets/images/panitialdk.webp",
      category: "committee" as const,
    },
    {
      title: "Panitia Lomba Mobile Legends Nganjuk Skill Clash Challenge",
      issuer: "Politeknik Negeri Jember Kampus 3 PSDKU Nganjuk",
      year: "2025",
      image: "/assets/images/panitianganjukskill2025.webp",
      category: "committee" as const,
    },
    {
      title: "Panitia Workshop Peluang Digital untuk Bisnis Berkelanjutan",
      issuer: "Politeknik Negeri Jember Kampus PSDKU 3 Nganjuk",
      year: "2026",
      image: "/assets/images/panitiaworkshop.webp",
      category: "committee" as const,
    },
    {
      title: "Peserta Lomba Infografis Eksplorasi Pesona Wisata Klaten",
      issuer: "Balairung Klaten Association UGM",
      year: "2026",
      image: "/assets/images/pesertainfografisklaten.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Peserta Lomba Infografis Dies Maulidiyah ke-12",
      issuer: "Himpunan Mahasiswa PGMI IAINU Tuban",
      year: "2026",
      image: "/assets/images/pesertainfografistuban.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Peserta National Infographic Chemistry Event (NICE) 2026",
      issuer: "Universitas Negeri Surabaya",
      year: "2026",
      image: "/assets/images/pesertainfographic.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Peserta Lomba Poster Infografis Hari Tempe Nasional 2026",
      issuer: "Poltekkes Kemenkes Jayapura",
      year: "2026",
      image: "/assets/images/pesertaposterharitempe.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Peserta Seminar Diplomasi",
      issuer: "Politeknik Negeri Jember",
      year: "2026",
      image: "/assets/images/pesertaseminardiplomasi.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Peserta Webinar Nasional Smartweek 10.0",
      issuer: "HIMA PGSD FKIP UNS Kampus Kebumen",
      year: "2026",
      image: "/assets/images/pesertawebinar.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Peserta Webinar Visual Pro 2026",
      issuer: "Universitas Airlangga",
      year: "2026",
      image: "/assets/images/pesertawebinarvisualpro.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Peserta Sekolah Aksi (Advokasi Konstruktif) 2026",
      issuer: "BEM Politeknik Negeri Jember",
      year: "2026",
      image: "/assets/images/pesertasekolahaksi.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Peserta Sekolah Ilmiah 2026",
      issuer: "BEM KM POLIJE dan UKM SKIM",
      year: "2026",
      image: "/assets/images/pesertasekolahilmiah.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Peserta Welcome Nasional 2025",
      issuer: "BEM Institut Teknologi Sepuluh Nopember",
      year: "2025",
      image: "/assets/images/pesertawelcomeits.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Peserta ASTRO 2025",
      issuer: "Himpunan Mahasiswa Jurusan Teknologi Informasi Politeknik Negeri Jember",
      year: "2025",
      image: "/assets/images/pesertaastro.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Peserta LKMM Pra-TD 2025",
      issuer: "Himpunan Mahasiswa Jurusan Teknologi Informasi Politeknik Negeri Jember",
      year: "2025",
      image: "/assets/images/pesertalkmmpratd.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Peserta Lomba Poster Hari HAM Internasional",
      issuer: "HIMA RMIK Institut Tarumanagara",
      year: "2025",
      image: "/assets/images/pesertalombaposteritaru.webp",
      category: "non-achievement" as const,
    },
  ],

  // ----------------------------------------------------------
  // LAYANAN (tampil di section Services)
  // ----------------------------------------------------------
  services: [
    {
      title: "Pengembangan Aplikasi",
      description: "Membuat aplikasi pemesanan dengan fitur pencarian menu, filter kategori, keranjang, dan riwayat pesanan seperti proyek Dapur Kuliner Pak Ndut.",
    },
    {
      title: "Pengembangan Website",
      description: "Membangun website untuk menampilkan profil usaha, informasi, dan katalog produk dengan tampilan yang mudah diakses.",
    },
    {
      title: "Desain UI/UX",
      description: "Merancang antarmuka aplikasi dan website yang jelas, menarik, dan mudah digunakan.",
    },
    {
      title: "Desain Poster & Pamflet",
      description: "Membuat materi visual untuk promosi dan kegiatan. Karya poster saya meraih Juara 1 di Think Before You Post dan Java Tech Exhibition 3.0, serta Juara 3 di Java Tech Exhibition 2.0.",
    },
    {
      title: "Pengembangan Aplikasi Sekolah",
      description: "Proyek aplikasi untuk SMP Negeri 1 Loceret sedang dalam pengembangan. Detail fitur akan dibagikan setelah proyek siap.",
    },
    {
      title: "Pengembangan Website Sekolah",
      description: "Proyek website untuk SMP Negeri 1 Loceret sedang dalam pengembangan. Informasi website akan ditambahkan setelah siap ditampilkan.",
    },
  ],
};