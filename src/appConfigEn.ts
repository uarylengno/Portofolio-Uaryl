// ============================================================
// KONFIGURASI KONTEN WEBSITE (BAHASA INGGRIS)
// Struktur file ini harus sama persis dengan appConfig.ts,
// hanya isinya dalam bahasa Inggris.
// ============================================================
export const APP_CONFIG_EN = {
  // ----------------------------------------------------------
  // DATA PRIBADI (tampil di Hero, About, dan Footer)
  // ----------------------------------------------------------
  personal: {
    name: "Uaryl Engno Laurenca",
    brand: "Uaryl Engno Laurenca Creative",
    role: "IT Enthusiast & Creative Developer",
    tagline: "Building digital solutions through technology, design, and creativity.",
    description:
      "Hello, I am Uaryl Engno Laurenca. I have a huge interest in information technology and creative development. My main focus is to create digital experiences that are not only technically functional, but also visually appealing and intuitive.",
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
      title: "Pak Ndut Culinary Kitchen Application",
      category: "Web Development",
      description:
        "An integrated system for managing student data, teacher attendance, and school academic information in real time.",
      image:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1600&auto=format&fit=crop",
      techStack: ["Laravel", "MySQL", "Bootstrap"],
      role: "Full-stack Developer",
      demoLink: "https://pameran-jti.polije.ac.id/product/589/aplikasi-dapur-kuliner-pak-ndut",
      githubLink: "#",
      size: "large",
    },
    {
      id: "project-2",
      title: "Pak Ndut Culinary Kitchen Website",
      category: "UI/UX Design",
      description:
        "A mobile e-commerce app interface designed with a focus on user experience and an easy checkout process.",
      image:
        "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=1600&auto=format&fit=crop",
      techStack: ["Figma", "Prototyping"],
      role: "UI/UX Designer",
      demoLink: "#",
      githubLink: "",
      size: "medium",
    },
    {
      id: "project-3",
      title: "SiTani Application and Website, Nganjuk Regency Agriculture Office",
      category: "Web Development",
      description:
        "A responsive company profile website for a technology startup with modern animations and high performance.",
      image:
        "https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=1600&auto=format&fit=crop",
      techStack: ["React", "Tailwind CSS", "Vite"],
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
        "Developed interactive web interfaces, managed databases, and collaborated with an agile team.",
    },
    {
      role: "Freelance Graphic Designer",
      company: "Self-Employed",
      year: "2024 - 2025",
      description:
        "Created UI/UX designs and branding materials for various Indonesian MSME clients.",
    },
    {
      role: "Frontend Web Developer",
      company: "Digital Studio Nusantara",
      year: "2023 - 2024",
      description:
        "Built responsive websites with React and integrated APIs for various internal projects.",
    },
    {
      role: "IT Support Staff",
      company: "PT Teknologi Muda Berkarya",
      year: "2022 - 2023",
      description:
        "Handled software installation, basic troubleshooting, and maintained the office's local network stability.",
    },
    {
      role: "Junior Web Developer",
      company: "Kreatif Tech Studio",
      year: "2021 - 2022",
      description:
        "Assisted with website feature development, fixed bugs, and maintained clients' content management systems.",
    },
    {
      role: "Content Creator Intern",
      company: "Media Edukasi Digital",
      year: "2020 - 2021",
      description:
        "Produced graphic designs and short videos for educational and marketing purposes on social media.",
    },
  ],

  // ----------------------------------------------------------
  // PENDIDIKAN (tampil sebagai timeline di section Education)
  // major dan achievements boleh dikosongkan ("")
  // ----------------------------------------------------------
  education: [
    {
      school: "Politeknik Negeri Jember (State Polytechnic of Jember)",
      major: "Informatics Engineering",
      year: "2025 - Present",
      achievements: "Member of HMJTI Communication and Information Department, Publication Bureau",
    },
    {
      school: "SMK Negeri 1 Gondang Nganjuk (State Vocational High School)",
      major: "Computer and Network Engineering",
      year: "2023 - 2025",
      achievements: "Student Council Member, Publication, Documentation and Design Division",
    },
    {
      school: "SMP Negeri 3 Tanjunganom (State Junior High School)",
      major: "",
      year: "2020 - 2023",
      achievements: "Student Council Member, Publication, Documentation and Design Division",
    },
    {
      school: "SD Negeri 2 Sambirejo (State Elementary School)",
      major: "",
      year: "2011 - 2017",
      achievements: "",
    },
  ],

  // ----------------------------------------------------------
  // DESAIN (poster, pamflet, dll. Tampil di section Designs)
  // category: dipakai sebagai tombol filter, mis. "Poster", "Pamphlet"
  // ----------------------------------------------------------
  designs: [
    {
      id: "design-1",
      title: "Think Before You Post",
      category: "Poster",
      year: "2026",
      image: "/assets/images/juara1posterdutabangsasurakarta.jpg",
    },
    {
      id: "design-2",
      title: "Pak Ndut Culinary Kitchen",
      category: "Poster",
      year: "2026",
      image: "/assets/images/juara1posterpakndut.jpg",
    },
    {
      id: "design-3",
      title: "Java Tech Exhibition 2.0",
      category: "Poster",
      year: "2025",
      image: "/assets/images/juara3jposteravatech.jpg",
    },
  ],

  // ----------------------------------------------------------
  // SERTIFIKAT & PENGHARGAAN (tampil di section Certificates & Awards)
  // image: link internet, atau file di public/assets/images/
  // ----------------------------------------------------------
  certificates: [
    {
      title: "2nd Place, Pak Ndut Culinary Kitchen Application",
      issuer: "Java Tech Exhibition 4.0, Politeknik Negeri Jember",
      year: "2026",
      image:
        "https://cdn.phototourl.com/free/2026-09-06-d0a9e7f3-9f8e-4aab-ac0b-b76d5a591be9.jpg",
      rank: "2nd Place",
      competition: "Java Tech Exhibition 4.0, Politeknik Negeri Jember",
    },
    {
      title: "1st Place, Think Before You Post Digital Poster Competition",
      issuer: "Universitas Duta Bangsa Surakarta",
      year: "2026",
      image: "/assets/images/juara1posterdutabangsasurakarta.jpg",
      rank: "1st Place",
      competition: "Universitas Duta Bangsa Surakarta",
    },
    {
      title: "1st Place, Pak Ndut Culinary Kitchen Poster Competition",
      issuer: "Java Tech Exhibition 3.0, Politeknik Negeri Jember",
      year: "2026",
      image: "/assets/images/juara1posterpakndut.jpg",
      rank: "1st Place",
      competition: "Java Tech Exhibition 3.0, Politeknik Negeri Jember",
    },
    {
      title: "3rd Place, Digital Poster Competition",
      issuer: "Java Tech Exhibition 2.0, Politeknik Negeri Jember",
      year: "2025",
      image: "/assets/images/juara3jposteravatech.jpg",
      rank: "3rd Place",
      competition: "Java Tech Exhibition 2.0, Politeknik Negeri Jember",
    },
    {
      title: "2nd Place, Master of Ceremony Competition",
      issuer: "79th Indonesian Independence Day, Gondang Nganjuk District",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop",
      rank: "2nd Place",
      competition: "79th Indonesian Independence Day, Gondang Nganjuk District",
    },
  ],

  // ----------------------------------------------------------
  // LAYANAN (tampil di section Services)
  // ----------------------------------------------------------
  services: [
    { title: "Web Development", description: "Building responsive and dynamic websites." },
    { title: "UI/UX Design", description: "Designing intuitive user interfaces." },
    { title: "Graphic Design", description: "Visual designs for branding and marketing." },
    { title: "IT Support", description: "IT systems maintenance and troubleshooting." },
    { title: "Video Editing", description: "Professional video editing for various needs." },
  ],
};