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
    role: "Informatics Student | App & Visual Design",
    tagline: "Building digital solutions through technology, design, and creativity.",
    description:
      "I am Uaryl Engno Laurenca, an Informatics Engineering student at Politeknik Negeri Jember. I develop apps and websites, design UI/UX, and create posters and pamphlets. My portfolio includes the Pak Ndut Culinary Kitchen app and website, as well as visual work for various events.",
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
    youtube: "https://youtube.com/@uarylengnolaurenca849?si=PL3sAyYv7Lv-YIWR",
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
        "A food-ordering app for Pak Ndut Culinary Kitchen, featuring menu search, category filters, a shopping cart, order history, and user profiles. Designed to make ordering faster and easier.",
      image: "/assets/images/dapurkuliner.webp",
      techStack: [],
      role: "Application Developer",
      demoLink: "https://pameran-jti.polije.ac.id/product/589/aplikasi-dapur-kuliner-pak-ndut",
      githubLink: "#",
      size: "large",
    },
    {
      id: "project-2",
      title: "Pak Ndut Culinary Kitchen Website",
      category: "UI/UX Design",
      description:
        "A small-business website for Pak Ndut Culinary Kitchen that showcases its menu, business information, and food-ordering service. Features include an automatic cart, instant total calculation, order tracking, and menu management.",
      image: "/assets/images/ndut1.webp",
      techStack: [],
      role: "Website Designer",
      demoLink: "https://pameran-jti.polije.ac.id/product/411/dapur-kuliner-pak-ndut",
      githubLink: "",
      size: "medium",
    },
    {
      id: "project-3",
      title: "SMP Negeri 1 Loceret App & Website",
      category: "App & Website Development",
      description:
        "The app and website project for SMP Negeri 1 Loceret is currently in development. Project information and details will be added when they are ready.",
      image: "",
      techStack: [],
      role: "In Development",
      demoLink: "",
      githubLink: "",
      size: "medium",
      comingSoon: true,
    },
  ],

  // ----------------------------------------------------------
  // EXPERIENCE (shown as folder cards in the Experience section)
  // ----------------------------------------------------------
  experience: [
    {
      role: "Application & Website Developer",
      company: "Pak Ndut Culinary Kitchen Portfolio Project",
      year: "2026",
      description:
        "Developed a food-ordering app and a website to showcase the menu and business information. The application received 2nd Place at Java Tech Exhibition 4.0.",
    },
    {
      role: "Graphic Designer & Visual Creator",
      company: "Independent Design Projects",
      year: "2025 - 2026",
      description:
        "Created posters and pamphlets for various events, including Java Tech Exhibition, Speakpreneur HMJTI, Open Recruitment HMJTI, and Visit IT.",
    },
    {
      role: "Campus Event Committee Member",
      company: "Politeknik Negeri Jember and HMJTI",
      year: "2025 - 2026",
      description:
        "Served on the committees for Sekolah Bisnis dan Digital, Basic Leadership Training, Nganjuk Skill Clash Challenge, and the Digital Opportunities Workshop.",
    },
    {
      role: "Competition Achievements",
      company: "Poster, Application, and Master of Ceremony Competitions",
      year: "2024 - 2026",
      description:
        "Earned 1st Place in the Think Before You Post and Java Tech Exhibition 3.0 poster competitions, 2nd Place for the Pak Ndut Culinary Kitchen app and in the 79th Indonesian Independence Day Master of Ceremony competition, and 3rd Place at Java Tech Exhibition 2.0.",
    },
  ],

  // ----------------------------------------------------------
  // EDUCATION (shown as a timeline in the Education section)
  // major and achievements can be left empty ("")
  // logo: file in public/assets/images/ (e.g. "/assets/images/polije.webp")
  //       can also be empty (""), then the school initial will be shown
  // ----------------------------------------------------------
  education: [
    {
      school: "Politeknik Negeri Jember (State Polytechnic of Jember)",
      major: "Informatics Engineering",
      year: "2025 - Present",
      achievements: "Member of HMJTI Communication and Information Department, Publication Bureau",
      logo: "/assets/images/polije.webp",
    },
    {
      school: "SMK Negeri 1 Gondang Nganjuk (State Vocational High School)",
      major: "Computer and Network Engineering",
      year: "2023 - 2025",
      achievements: "Student Council Member, Publication, Documentation and Design Division",
      logo: "/assets/images/smk.webp",
    },
    {
      school: "SMP Negeri 3 Tanjunganom (State Junior High School)",
      major: "",
      year: "2020 - 2023",
      achievements: "Student Council Member, Publication, Documentation and Design Division",
      logo: "/assets/images/smp.webp",
    },
    {
      school: "SD Negeri 2 Sambirejo (State Elementary School)",
      major: "",
      year: "2011 - 2017",
      achievements: "",
      logo: "/assets/images/sd.webp",
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
      image: "/assets/images/speak.webp",
    },
    {
      id: "design-open-recruitment-hmjti-2026",
      title: "Open Recruitment HMJTI 2026/2027",
      category: "Pamphlet",
      year: "2026",
      image: "/assets/images/open.webp",
    },
    {
      id: "design-visit-it-2026",
      title: "Open Registration Visit IT 2026",
      category: "Pamphlet",
      year: "2026",
      image: "/assets/images/visit.webp",
    },
    {
      id: "design-1792419187132",
      title: "Nganjuk Skill Clash Challenge 2026",
      category: "Pamphlet",
      year: "2026",
      image: "/assets/images/nganjukskill.webp",
    },
    {
      id: "design-1792419223215",
      title: "Arak Arakan Wisudawan Teknologi Informasi 2026",
      category: "Pamphlet",
      year: "2026",
      image: "/assets/images/arak.webp",
    },
    {
      id: "design-workshop-peluang-digital-nganjuk-2026",
      title: "Digital Opportunities Workshop for Sustainable Business",
      category: "Pamphlet",
      year: "2026",
      image: "/assets/images/wpdnganjuk.webp",
    },
    {
      id: "design-tasyakuran-ramadhan-2026",
      title: "Ramadan Thanksgiving 2026",
      category: "Pamphlet",
      year: "2026",
      image: "/assets/images/raber.webp",
    },
    {
      id: "design-campus-expo-smeksago-2026",
      title: "SMEKSAGO Campus Expo 2026",
      category: "Pamphlet",
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
      category: "Pamphlet",
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
  // CERTIFICATES & AWARDS (shown in the Certificates & Awards section)
  // image: internet link or file in public/assets/images/
  // ----------------------------------------------------------
  certificates: [
    {
      title: "2nd Place, Pak Ndut Culinary Kitchen Application",
      issuer: "Java Tech Exhibition 4.0, Politeknik Negeri Jember",
      year: "2026",
      image: "/assets/images/juara2aplikasi.webp",
      rank: "2nd Place",
      competition: "Java Tech Exhibition 4.0, Politeknik Negeri Jember",
    },
    {
      title: "1st Place, Think Before You Post Digital Poster Competition",
      issuer: "Universitas Duta Bangsa Surakarta",
      year: "2026",
      image: "/assets/images/juara1posterdutabangsasurakarta.webp",
      rank: "1st Place",
      competition: "Universitas Duta Bangsa Surakarta",
    },
    {
      title: "1st Place, Pak Ndut Culinary Kitchen Poster Competition",
      issuer: "Java Tech Exhibition 3.0, Politeknik Negeri Jember",
      year: "2026",
      image: "/assets/images/juara1posterpakndut.webp",
      rank: "1st Place",
      competition: "Java Tech Exhibition 3.0, Politeknik Negeri Jember",
    },
    {
      title: "3rd Place, Digital Poster Competition",
      issuer: "Java Tech Exhibition 2.0, Politeknik Negeri Jember",
      year: "2025",
      image: "/assets/images/juara3jposteravatech.webp",
      rank: "3rd Place",
      competition: "Java Tech Exhibition 2.0, Politeknik Negeri Jember",
    },
    {
      title: "2nd Place, Master of Ceremony Competition",
      issuer: "79th Indonesian Independence Day, Gondang Nganjuk District",
      year: "2024",
      image: "",
      rank: "2nd Place",
      competition: "79th Indonesian Independence Day, Gondang Nganjuk District",
    },
    {
      title: "Committee Member, Nganjuk Skill Clash Challenge Mobile Legends Competition",
      issuer: "Politeknik Negeri Jember, PSDKU Nganjuk Campus 3",
      year: "2026",
      image: "/assets/images/panitaml2026.webp",
      category: "committee" as const,
    },
    {
      title: "Committee Member, Business and Digital School",
      issuer: "BEM Politeknik Negeri Jember, PSDKU 3 Nganjuk Campus",
      year: "2025",
      image: "/assets/images/panitiasbd.webp",
      category: "committee" as const,
    },
    {
      title: "Committee Member, Basic Leadership Training",
      issuer: "Information Technology Student Association, Politeknik Negeri Jember",
      year: "2026",
      image: "/assets/images/panitialdk.webp",
      category: "committee" as const,
    },
    {
      title: "Committee Member, Nganjuk Skill Clash Challenge Mobile Legends Competition",
      issuer: "Politeknik Negeri Jember, PSDKU Nganjuk Campus 3",
      year: "2025",
      image: "/assets/images/panitianganjukskill2025.webp",
      category: "committee" as const,
    },
    {
      title: "Committee Member, Digital Opportunities Workshop for Sustainable Business",
      issuer: "Politeknik Negeri Jember, PSDKU 3 Nganjuk Campus",
      year: "2026",
      image: "/assets/images/panitiaworkshop.webp",
      category: "committee" as const,
    },
    {
      title: "Participant, Klaten Tourism Exploration Infographic Competition",
      issuer: "Balairung Klaten Association, UGM",
      year: "2026",
      image: "/assets/images/pesertainfografisklaten.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Participant, 12th Dies Maulidiyah Infographic Competition",
      issuer: "PGMI Student Association, IAINU Tuban",
      year: "2026",
      image: "/assets/images/pesertainfografistuban.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Participant, National Infographic Chemistry Event (NICE) 2026",
      issuer: "Universitas Negeri Surabaya",
      year: "2026",
      image: "/assets/images/pesertainfographic.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Participant, National Tempe Day Infographic Poster Competition 2026",
      issuer: "Poltekkes Kemenkes Jayapura",
      year: "2026",
      image: "/assets/images/pesertaposterharitempe.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Participant, Diplomacy Seminar",
      issuer: "Politeknik Negeri Jember",
      year: "2026",
      image: "/assets/images/pesertaseminardiplomasi.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Participant, Smartweek 10.0 National Webinar",
      issuer: "HIMA PGSD FKIP UNS Kebumen Campus",
      year: "2026",
      image: "/assets/images/pesertawebinar.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Participant, Visual Pro Webinar 2026",
      issuer: "Universitas Airlangga",
      year: "2026",
      image: "/assets/images/pesertawebinarvisualpro.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Participant, Sekolah Aksi (Constructive Advocacy) 2026",
      issuer: "BEM Politeknik Negeri Jember",
      year: "2026",
      image: "/assets/images/pesertasekolahaksi.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Participant, Sekolah Ilmiah 2026",
      issuer: "BEM KM POLIJE and UKM SKIM",
      year: "2026",
      image: "/assets/images/pesertasekolahilmiah.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Participant, Welcome Nasional 2025",
      issuer: "BEM Institut Teknologi Sepuluh Nopember",
      year: "2025",
      image: "/assets/images/pesertawelcomeits.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Participant, ASTRO 2025",
      issuer: "Information Technology Student Association, Politeknik Negeri Jember",
      year: "2025",
      image: "/assets/images/pesertaastro.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Participant, LKMM Pra-TD 2025",
      issuer: "Information Technology Student Association, Politeknik Negeri Jember",
      year: "2025",
      image: "/assets/images/pesertalkmmpratd.webp",
      category: "non-achievement" as const,
    },
    {
      title: "Participant, International Human Rights Day Poster Competition",
      issuer: "HIMA RMIK Institut Tarumanagara",
      year: "2025",
      image: "/assets/images/pesertalombaposteritaru.webp",
      category: "non-achievement" as const,
    },
  ],

  // ----------------------------------------------------------
  // SERVICES (shown in the Services section)
  // ----------------------------------------------------------
  services: [
    {
      title: "Application Development",
      description: "Building ordering apps with menu search, category filters, a shopping cart, and order history, as demonstrated in the Pak Ndut Culinary Kitchen project.",
    },
    {
      title: "Website Development",
      description: "Creating websites to present business profiles, information, and product catalogs in an accessible format.",
    },
    {
      title: "UI/UX Design",
      description: "Designing clear, engaging, and easy-to-use interfaces for apps and websites.",
    },
    {
      title: "Poster & Pamphlet Design",
      description: "Creating promotional and event visuals. My poster work earned 1st Place at Think Before You Post and Java Tech Exhibition 3.0, and 3rd Place at Java Tech Exhibition 2.0.",
    },
    {
      title: "School App Development",
      description: "The app project for SMP Negeri 1 Loceret is in development. Feature details will be shared when the project is ready.",
    },
    {
      title: "School Website Development",
      description: "The website project for SMP Negeri 1 Loceret is in development. Website information will be added when it is ready to be shown.",
    },
  ],
};