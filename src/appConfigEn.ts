// ============================================================
// WEBSITE CONTENT CONFIGURATION (ENGLISH)
// This file structure must match appConfig.ts exactly,
// with the content written in English.
// ============================================================
export const APP_CONFIG_EN = {
  // ----------------------------------------------------------
  // PERSONAL DATA (shown in Hero, About, and Footer)
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
  // THEME COLORS
  // ----------------------------------------------------------
  theme: {
    primary: "#250BF0",    // primary blue
    secondary: "#3B1CFF",  // supporting blue
    accent: "#C8FF00",     // neon green (buttons & accents)
    background: "#F4F7FC", // light page background
    white: "#FFFFFF",
    dark: "#111111",       // dark section background
    muted: "#6B7280",      // gray text
  },

  // ----------------------------------------------------------
  // CONTACT & SOCIAL MEDIA
  // ----------------------------------------------------------
  contact: {
    email: "dpa71845@gmail.com",
    whatsapp: "https://wa.me/62082334889598",
    instagram: "https://instagram.com/arilengno",
    linkedin:
      "https://www.linkedin.com/in/uaryl-engno-laurenca-b6a979249?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com",
    facebook: "https://facebook.com", // TODO: replace with your Facebook account
    youtube: "https://youtube.com",   // TODO: replace with your YouTube channel
  },

  // ----------------------------------------------------------
  // SKILLS (shown in the Skills section)
  // ----------------------------------------------------------
  skills: {
    programming: ["HTML", "CSS", "JavaScript", "PHP", "Python"],
    design: ["Figma", "Ibis Paint X", "Infinite Design", "Canva", "PixelLab"],
    it: ["Networking", "Database Management", "Linux"],
    other: ["Video Editing", "UI/UX Design"],
  },

  // ----------------------------------------------------------
  // PROJECTS (shown in the Projects section)
  // demoLink: demo link. Use "#" if not available yet
  // githubLink: used if demoLink is empty ("#")
  // All project cards can be clicked and open links in a new tab
  // ----------------------------------------------------------
  projects: [
    {
      id: "project-1",
      title: "Pak Ndut Culinary Kitchen Application",
      category: "Web Development",
      description:
        "An integrated system for managing student data, teacher attendance, and school academic information in real time.",
      image: "/assets/images/ndut2.png",
      techStack: [],
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
      image: "/assets/images/ndut1.png",
      techStack: [],
      role: "UI/UX Designer",
      demoLink: "https://pameran-jti.polije.ac.id/product/411/dapur-kuliner-pak-ndut",
      githubLink: "",
      size: "medium",
    },
    {
      id: "project-3",
      title: "SMP Negeri 1 Loceret Application and Website",
      category: "Web Development",
      description:
        "A responsive company profile website for a technology startup with modern animations and high performance.",
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
  // EXPERIENCE (shown as folder cards in the Experience section)
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
      role: "Frontend Web Developer",
      company: "Digital Studio Nusantara",
      year: "2023 - 2024",
      description:
        "Built responsive websites with React and integrated APIs for various internal projects.",
    },
    {
      role: "Freelance Graphic Designer",
      company: "Self-Employed",
      year: "2024 - 2025",
      description:
        "Created UI/UX designs and branding materials for various Indonesian MSME clients.",
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
  // EDUCATION (shown as a timeline in the Education section)
  // major and achievements can be left empty ("")
  // logo: file in public/assets/images/ (e.g. "/assets/images/polije.png")
  //       can also be empty (""), then the school initial will be shown
  // ----------------------------------------------------------
  education: [
    {
      school: "Politeknik Negeri Jember (State Polytechnic of Jember)",
      major: "Informatics Engineering",
      year: "2025 - Present",
      achievements: "Member of HMJTI Communication and Information Department, Publication Bureau",
      logo: "/assets/images/polije.png",
    },
    {
      school: "SMK Negeri 1 Gondang Nganjuk (State Vocational High School)",
      major: "Computer and Network Engineering",
      year: "2023 - 2025",
      achievements: "Student Council Member, Publication, Documentation and Design Division",
      logo: "/assets/images/smk.jpg",
    },
    {
      school: "SMP Negeri 3 Tanjunganom (State Junior High School)",
      major: "",
      year: "2020 - 2023",
      achievements: "Student Council Member, Publication, Documentation and Design Division",
      logo: "/assets/images/smp.png",
    },
    {
      school: "SD Negeri 2 Sambirejo (State Elementary School)",
      major: "",
      year: "2011 - 2017",
      achievements: "",
      logo: "/assets/images/sd.png",
    },
  ],

  // ----------------------------------------------------------
  // DESIGNS (posters, pamphlets, etc. shown in the Designs section)
  // category: used as a filter button, e.g. "Poster", "Pamphlet"
  // ----------------------------------------------------------
  designs: [
    {
      id: "design-1792419131722",
      title: "Speakpreneur HMJTI 2026",
      category: "Pamphlet",
      year: "2026",
      image: "/assets/images/speak.png",
    },
    {
      id: "design-1792419187132",
      title: "Nganjuk Skill Clash Challenge 2026",
      category: "Pamphlet",
      year: "2026",
      image: "/assets/images/nganjukskill.png",
    },
    {
      id: "design-1792419223215",
      title: "Arak Arakan Wisudawan Teknologi Informasi 2026",
      category: "Pamphlet",
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
      category: "Pamphlet",
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
  // CERTIFICATES & AWARDS (shown in the Certificates & Awards section)
  // image: internet link or file in public/assets/images/
  // ----------------------------------------------------------
  certificates: [
    {
      title: "2nd Place, Pak Ndut Culinary Kitchen Application",
      issuer: "Java Tech Exhibition 4.0, Politeknik Negeri Jember",
      year: "2026",
      image: "/assets/images/juara2aplikasi.png",
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
  // SERVICES (shown in the Services section)
  // ----------------------------------------------------------
  services: [
    { title: "Web Development", description: "Building responsive and dynamic websites." },
    { title: "UI/UX Design", description: "Designing intuitive user interfaces." },
    { title: "Graphic Design", description: "Visual designs for branding and marketing." },
    { title: "IT Support", description: "IT systems maintenance and troubleshooting." },
    { title: "Video Editing", description: "Professional video editing for various needs." },
  ],
};