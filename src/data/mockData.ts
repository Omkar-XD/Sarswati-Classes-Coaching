// TYPES
export interface CourseChapter {
  title: string;
  description: string;
  videoUrl: string; // direct YouTube link (not embedded)
}

export interface Course {
  id: string;
  title: string;
  category: "Foundation" | "Science" | "Competitive";
  description: string;
  fullDescription: string;
  mode: "Online" | "Offline" | "Online / Offline";
  image: string;
  chapters: CourseChapter[];
  demoVideoUrl: string; // YouTube embed link
}

export interface TestSeries {
  id: string;
  title: string;
  overview: string;
  features: string[];
  testPattern: string;
  benefits: string[];
  image: string;
  ctaLabel: string;
  demoTestLink: string;
  heroPosterThumbnail: string;
  showInHeroPoster: boolean;
}

export interface EnrollmentRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  courseOrSeries: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
  studentId?: string;
  username?: string;
  password?: string;
}

export interface PopupContent {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  enabled: boolean;
}

export interface StudentUser {
  id: string;
  email: string;
  password: string;
  name: string;
  approvedCourses: string[];
  approvedTestSeries: string[];
  createdAt: string;
}

export interface HeroPoster {
  id: string;
  imageUrl: string;
  testSeriesId: string;
  enabled: boolean;
  createdAt: string;
}

// DEFAULT COURSES
export const defaultCourses: Course[] = [
  {
    id: "8th-cbse",
    title: "8th CBSE",
    category: "Foundation",
    description: "Build strong fundamentals in Maths and Science for 8th CBSE.",
    fullDescription:
      "Our 8th CBSE foundation program focuses on conceptual clarity, regular assessments and doubt-solving to prepare students for higher classes and competitive exams.",
    mode: "Online / Offline",
    image: "https://placehold.co/400x250/0ea5e9/ffffff?text=8th+CBSE",
    demoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    chapters: [
      {
        title: "Number Systems Basics",
        description: "Understanding integers, fractions and decimals with real-life examples.",
        videoUrl: "https://www.youtube.com/watch?v=ysz5d6-0K8A",
      },
      {
        title: "Algebraic Expressions",
        description: "Introduction to variables, expressions and simple equations.",
        videoUrl: "https://www.youtube.com/watch?v=5MgBikgcWnY",
      },
      {
        title: "Introduction to Force and Pressure",
        description: "Key Science concepts with simple experiments.",
        videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      },
    ],
  },
  {
    id: "9th-cbse",
    title: "9th CBSE",
    category: "Foundation",
    description: "Strengthen problem-solving skills with focused 9th CBSE coaching.",
    fullDescription:
      "The 9th CBSE course prepares students with strong fundamentals in Algebra, Geometry, Physics and Chemistry with regular tests and detailed feedback.",
    mode: "Online / Offline",
    image: "https://placehold.co/400x250/0ea5e9/ffffff?text=9th+CBSE",
    demoVideoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
    chapters: [
      {
        title: "Linear Equations in Two Variables",
        description: "Graphical and algebraic methods to solve linear equations.",
        videoUrl: "https://www.youtube.com/watch?v=V-_O7nl0Ii0",
      },
      {
        title: "Sound and Its Properties",
        description: "Wave nature of sound and its applications.",
        videoUrl: "https://www.youtube.com/watch?v=uelHwf8o7_U",
      },
      {
        title: "Atoms and Molecules",
        description: "Laws of chemical combination and mole concept.",
        videoUrl: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y",
      },
    ],
  },
  {
    id: "10th-cbse",
    title: "10th CBSE",
    category: "Foundation",
    description: "Score high in board exams with structured 10th CBSE preparation.",
    fullDescription:
      "Comprehensive coverage of all subjects with regular board pattern tests, analysis, and revision modules for CBSE 10th board exams.",
    mode: "Online / Offline",
    image: "https://placehold.co/400x250/0ea5e9/ffffff?text=10th+CBSE",
    demoVideoUrl: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
    chapters: [
      {
        title: "Quadratic Equations",
        description: "Concept, factorization and quadratic formula based problems.",
        videoUrl: "https://www.youtube.com/watch?v=kXYiU_JCYtU",
      },
      {
        title: "Light: Reflection and Refraction",
        description: "Mirror and lens formulas with numericals.",
        videoUrl: "https://www.youtube.com/watch?v=fLexgOxsZu0",
      },
      {
        title: "Chemical Reactions and Equations",
        description: "Balancing equations and different types of reactions.",
        videoUrl: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
      },
    ],
  },
  {
    id: "9th-ssc",
    title: "9th SSC",
    category: "Foundation",
    description: "Concept-focused teaching for 9th SSC students.",
    fullDescription:
      "9th SSC course is designed to cover the Maharashtra State Board syllabus with exam-oriented preparation and regular practice sheets.",
    mode: "Offline",
    image: "https://placehold.co/400x250/0ea5e9/ffffff?text=9th+SSC",
    demoVideoUrl: "https://www.youtube.com/embed/kJQP7kiw5Fk",
    chapters: [
      {
        title: "Statistics Basics",
        description: "Understanding mean, median and mode with examples.",
        videoUrl: "https://www.youtube.com/watch?v=ktvTqknDobU",
      },
      {
        title: "Sets and Venn Diagrams",
        description: "Introduction to sets with Venn diagram representation.",
        videoUrl: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
      },
    ],
  },
  {
    id: "10th-ssc",
    title: "10th SSC",
    category: "Foundation",
    description: "Target high marks in SSC board exams.",
    fullDescription:
      "10th SSC program includes chapter-wise notes, question banks, and multiple full-syllabus mock tests based on latest board pattern.",
    mode: "Offline",
    image: "https://placehold.co/400x250/0ea5e9/ffffff?text=10th+SSC",
    demoVideoUrl: "https://www.youtube.com/embed/OPf0YbXqDm0",
    chapters: [
      {
        title: "Progressions",
        description: "Arithmetic and geometric progressions with applications.",
        videoUrl: "https://www.youtube.com/watch?v=34Na4j8AVgA",
      },
      {
        title: "Electricity",
        description: "Ohm’s law, series and parallel circuits and numericals.",
        videoUrl: "https://www.youtube.com/watch?v=pRpeEdMmmQ0",
      },
      {
        title: "Acids, Bases and Salts",
        description: "Everyday applications and important reactions.",
        videoUrl: "https://www.youtube.com/watch?v=lp-EO5I60KA",
      },
    ],
  },
  {
    id: "11th-science-pcmb",
    title: "11th Science PCMB",
    category: "Science",
    description: "Foundation for engineering and medical entrance exams.",
    fullDescription:
      "11th PCMB course strengthens conceptual understanding in Physics, Chemistry, Maths and Biology with a blend of board and entrance level questions.",
    mode: "Online / Offline",
    image: "https://placehold.co/400x250/0ea5e9/ffffff?text=11th+Science+PCMB",
    demoVideoUrl: "https://www.youtube.com/embed/e-ORhEE9VVg",
    chapters: [
      {
        title: "Kinematics",
        description: "Motion in a straight line and plane with graphs.",
        videoUrl: "https://www.youtube.com/watch?v=0KSOMA3QBU0",
      },
      {
        title: "Basic Trigonometry",
        description: "Trigonometric ratios and identities with problems.",
        videoUrl: "https://www.youtube.com/watch?v=SlPhMPnQ58k",
      },
      {
        title: "Cell Structure",
        description: "Introduction to cell as a unit of life.",
        videoUrl: "https://www.youtube.com/watch?v=CevxZvSJLk8",
      },
    ],
  },
  {
    id: "12th-science-pcmb",
    title: "12th Science PCMB",
    category: "Science",
    description: "Board + entrance-focused 12th Science coaching.",
    fullDescription:
      "12th PCMB course covers entire board syllabus along with advanced problems aligned with JEE, NEET and CET patterns.",
    mode: "Online / Offline",
    image: "https://placehold.co/400x250/0ea5e9/ffffff?text=12th+Science+PCMB",
    demoVideoUrl: "https://www.youtube.com/embed/09R8_2nJtjg",
    chapters: [
      {
        title: "Electrostatics",
        description: "Coulomb’s law, electric field and potential.",
        videoUrl: "https://www.youtube.com/watch?v=RubBzkZzpUA",
      },
      {
        title: "Organic Chemistry Basics",
        description: "Nomenclature and reaction mechanisms overview.",
        videoUrl: "https://www.youtube.com/watch?v=TT2p5g0H3-w",
      },
      {
        title: "Human Physiology",
        description: "Overview of important human body systems.",
        videoUrl: "https://www.youtube.com/watch?v=LsoLEjrDogU",
      },
    ],
  },
  {
    id: "jee-preparation",
    title: "JEE Preparation",
    category: "Competitive",
    description: "Intensive JEE Main & Advanced coaching.",
    fullDescription:
      "Two-year and one-year integrated JEE coaching with topic-wise tests, full-length mock exams and personalised performance analysis.",
    mode: "Online / Offline",
    image: "https://placehold.co/400x250/0ea5e9/ffffff?text=JEE+Prep",
    demoVideoUrl: "https://www.youtube.com/embed/uelHwf8o7_U",
    chapters: [
      {
        title: "Vectors and 3D Geometry",
        description: "Important tools for JEE coordinate geometry and physics.",
        videoUrl: "https://www.youtube.com/watch?v=2vjPBrBU-TM",
      },
      {
        title: "Limits, Continuity and Differentiability",
        description: "Core calculus concepts with JEE level problems.",
        videoUrl: "https://www.youtube.com/watch?v=YQHsXMglC9A",
      },
      {
        title: "Thermodynamics for JEE",
        description: "Key concepts and PYQ discussion.",
        videoUrl: "https://www.youtube.com/watch?v=3AtDnEC4zak",
      },
    ],
  },
  {
    id: "cet-preparation",
    title: "CET Preparation",
    category: "Competitive",
    description: "Target MAH-CET with focused PCM practice.",
    fullDescription:
      "CET preparation course focuses on speed, accuracy and smart shortcuts with multiple full-length CET pattern tests.",
    mode: "Online",
    image: "https://placehold.co/400x250/0ea5e9/ffffff?text=CET+Prep",
    demoVideoUrl: "https://www.youtube.com/embed/kOkQ4T5WO9E",
    chapters: [
      {
        title: "Speed Maths Techniques",
        description: "Shortcuts for arithmetic and algebra for CET.",
        videoUrl: "https://www.youtube.com/watch?v=RgKAFK5djSk",
      },
      {
        title: "Modern Physics Overview",
        description: "High-weightage CET topics in Modern Physics.",
        videoUrl: "https://www.youtube.com/watch?v=pXRviuL6vMY",
      },
    ],
  },
  {
    id: "neet-preparation",
    title: "NEET Preparation",
    category: "Competitive",
    description: "Comprehensive NEET UG coaching for MBBS aspirants.",
    fullDescription:
      "Structured NEET course with NCERT-focused notes, question banks and chapter-wise, unit-wise and full-syllabus tests.",
    mode: "Online / Offline",
    image: "https://placehold.co/400x250/0ea5e9/ffffff?text=NEET+Prep",
    demoVideoUrl: "https://www.youtube.com/embed/hT_nvWreIhg",
    chapters: [
      {
        title: "Human Anatomy Highlights",
        description: "Important diagrams and theory for NEET Biology.",
        videoUrl: "https://www.youtube.com/watch?v=6Dh-RL__uN4",
      },
      {
        title: "Chemical Bonding",
        description: "Conceptual coverage with previous year questions.",
        videoUrl: "https://www.youtube.com/watch?v=YykjpeuMNEk",
      },
      {
        title: "Kinematics for NEET",
        description: "Physics motion concepts tailored for NEET pattern.",
        videoUrl: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
      },
    ],
  },
];

// TEST SERIES
export const defaultTestSeriesList: TestSeries[] = [
  {
    id: "cet-pcm-test-series",
    title: "CET PCM Test Series",
    overview:
      "Rigorous full-syllabus CET PCM test series with detailed analysis to maximise your score.",
    features: [
      "30+ full syllabus and part syllabus mock tests",
      "Paper discussion and doubt-solving after every test",
      "Topic-wise analysis to identify strong and weak areas",
      "Time management tips and strategies for CET",
    ],
    testPattern: "150 questions | 90 minutes | No negative marking | PCM focused pattern",
    benefits: [
      "Build exam temperament through regular mock practice",
      "Understand question trends and frequently asked topics",
      "Improve speed and accuracy under time pressure",
      "Get personalised guidance based on your performance",
    ],
    image: "https://placehold.co/400x250/0ea5e9/ffffff?text=CET+PCM+Test+Series",
    ctaLabel: "Enroll Now",
    demoTestLink: "https://forms.gle/example-cet-test",
    heroPosterThumbnail:
      "https://placehold.co/600x450/0ea5e9/ffffff?text=CET+PCM+Test+Series",
    showInHeroPoster: true,
  },
  {
    id: "9th-cbse-test-series",
    title: "9th CBSE Maths & Science Test Series",
    overview:
      "Chapter-wise and full-syllabus 9th CBSE test series for strong fundamentals in Maths and Science.",
    features: [
      "Chapter-wise tests for every unit in Maths & Science",
      "Mixed-topic tests to build application skills",
      "Detailed paper solutions and doubt-solving sessions",
      "Performance tracking across the entire academic year",
    ],
    testPattern: "Objective + subjective pattern aligned with latest CBSE guidelines",
    benefits: [
      "Develop exam writing skills early in the year",
      "Identify conceptual gaps before final exams",
      "Boost confidence with regular exam practice",
      "Stay exam-ready with revision-oriented tests",
    ],
    image:
      "https://placehold.co/400x250/0ea5e9/ffffff?text=9th+CBSE+Test+Series",
    ctaLabel: "Enroll Now",
    demoTestLink: "https://forms.gle/example-9th-cbse-test",
    heroPosterThumbnail:
      "https://placehold.co/600x450/0ea5e9/ffffff?text=9th+CBSE+Test+Series",
    showInHeroPoster: true,
  },
  {
    id: "10th-cbse-test-series",
    title: "10th CBSE Maths & Science Test Series",
    overview:
      "Board-focused test series for 10th CBSE students targeting top scores in Maths and Science.",
    features: [
      "Prelim-style full syllabus papers",
      "Chapter-wise and unit-wise practice tests",
      "Detailed marking scheme based evaluation",
      "Revision booster papers before board exams",
    ],
    testPattern: "Board-style question papers with section-wise weightage",
    benefits: [
      "Experience real board-exam like environment",
      "Refine presentation and answer writing skills",
      "Get accurate feedback on your preparation level",
      "Reduce exam anxiety with multiple mock attempts",
    ],
    image:
      "https://placehold.co/400x250/0ea5e9/ffffff?text=10th+CBSE+Test+Series",
    ctaLabel: "Enroll Now",
    demoTestLink: "https://forms.gle/example-10th-cbse-test",
    heroPosterThumbnail:
      "https://placehold.co/600x450/0ea5e9/ffffff?text=10th+CBSE+Test+Series",
    showInHeroPoster: false,
  },
];

// HERO POSTERS (derived from test series)
export const defaultHeroPosters: HeroPoster[] = defaultTestSeriesList
  .filter((ts) => ts.showInHeroPoster)
  .map((ts, index) => ({
    id: `default-hero-${ts.id}-${index}`,
    imageUrl: ts.heroPosterThumbnail || ts.image,
    testSeriesId: ts.id,
    enabled: true,
    createdAt: new Date().toISOString(),
  }));

// POPUP (kept for backward compatibility)
export const defaultPopupContent: PopupContent = {
  title: "Explore Our Test Series",
  description: "Boost your exam preparation with structured practice.",
  ctaText: "View Test Series",
  ctaLink: "/test-series",
  enabled: false,
};

// BACKWARD EXPORTS
export const courses = defaultCourses;
export const testSeriesList = defaultTestSeriesList;

// TESTIMONIALS
export const testimonials = [
  {
    name: "Priya Sharma",
    course: "10th CBSE + CET Preparation",
    text: "Saraswati Classes helped me build a strong foundation in Maths and Science. Regular tests and personal guidance boosted my confidence for boards.",
    avatar: "https://placehold.co/80x80/0ea5e9/ffffff?text=PS",
  },
  {
    name: "Rahul Verma",
    course: "JEE Preparation",
    text: "The JEE batch is highly focused with conceptual teaching and lots of practice questions. Test analysis sessions were extremely useful.",
    avatar: "https://placehold.co/80x80/0ea5e9/ffffff?text=RV",
  },
  {
    name: "Sneha Patil",
    course: "NEET Preparation",
    text: "Detailed notes, doubt-solving and regular NEET pattern tests made my preparation structured and stress-free.",
    avatar: "https://placehold.co/80x80/0ea5e9/ffffff?text=SP",
  },
  {
    name: "Aditya Deshmukh",
    course: "9th & 10th Foundation",
    text: "I joined in 9th and continued till 10th. The friendly environment and clear explanations made even difficult topics easy to understand.",
    avatar: "https://placehold.co/80x80/0ea5e9/ffffff?text=AD",
  },
];
