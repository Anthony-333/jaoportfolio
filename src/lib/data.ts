// Edit this file to personalise the portfolio. Content is taken from the résumé in /public.

export const profile = {
  name: "John Anthony P. Oling",
  shortName: "John",
  role: "Software Developer",
  intro:
    "I build scalable websites with Adobe Experience Manager, WordPress, React and Next.js — reusable components, fast pages and content editors can run on their own.",
  location: "Philippines",
  email: "anthonyoling333@gmail.com",
  phone: "+63 946 353 9483",
  phoneHref: "tel:+639463539483",
  portrait: "/portrait.svg",
  avatar: "/avatar.svg",
  cv: "/John-Anthony-Oling-Resume.pdf",
  cvFileName: "John-Anthony-Oling-Resume.pdf",
  available: true,
  badge: "SOFTWARE DEVELOPER · SINCE 2021 ·",
  linkedin: "https://linkedin.com/in/john-anthony-oling",
  linkedinLabel: "linkedin.com/in/john-anthony-oling",
};

export const stats = [
  { value: "5+", label: "Years of experience" },
  { value: "4", label: "Development roles" },
];

export const companies = [
  { name: "inGnius Systems", period: "2026" },
  { name: "WHG Philippines", period: "2023–25" },
  { name: "Stratus Health", period: "2023" },
  { name: "Vactrans", period: "2021–22" },
] as const;

export const summary = [
  "Software Developer with experience in Adobe Experience Manager (AEM) Sites, content management systems and scalable web component development.",
  "I build AEM components, editable templates, Sling Models and ClientLibs, plus front-ends in HTML, CSS, JavaScript, React.js and Next.js — with a focus on performance, REST API integration, Agile delivery and documentation the whole team can use.",
];

export const services = [
  {
    title: "AEM Sites Development",
    description: "AEM components, editable templates, Sling Models and ClientLibs — built to be reused across sites and authored with ease.",
  },
  {
    title: "WordPress Theme Development",
    description: "Custom themes with PHP partials, SCSS, Custom Post Types, ACF and REST API endpoints, so editors manage content without a developer.",
  },
  {
    title: "React & Next.js Apps",
    description: "Web and cross-platform React Native apps with admin dashboards and Stripe payment integration.",
  },
  {
    title: "Performance Optimisation",
    description: "Faster pages through Largest Contentful Paint (LCP) improvements, lean asset pipelines and skeleton-loaded UIs.",
  },
];

type Job = {
  period: string;
  role: string;
  company: string;
  location?: string;
  highlights: string[];
};

export const experience: Job[] = [
  {
    period: "Jan 2026 — Present",
    role: "WordPress Front End Developer",
    company: "inGnius Systems Private Limited",
    highlights: [
      "Architected a custom WordPress theme for a luxury yacht charter and sales website using reusable PHP partials, SCSS components and a Gulp-based asset pipeline.",
      "Designed content models with Custom Post Types, taxonomies and ACF field groups so editors manage listings, galleries and marketing sections on their own.",
      "Developed REST API endpoints for charter search, yacht catalogs, filters and locations, powering listing UIs with pagination, skeleton loaders and client-side filtering.",
      "Built custom rewrite routing for SEO-friendly detail URLs and reusable section components (hero, FAQs, partner brands, contact CTAs).",
    ],
  },
  {
    period: "Aug 2023 — Dec 2025",
    role: "Webmaster / Web Developer (AEM Sites)",
    company: "WHG Customer Services Philippines Inc.",
    highlights: [
      "Helped migrate flagship websites from a legacy CMS to Adobe Experience Manager (AEM) Sites, improving productivity across DevOps processes.",
      "Developed and maintained AEM components, editable templates, Sling Models and ClientLibs for scalable, reusable site components.",
      "Improved the homepage Largest Contentful Paint (LCP) score, significantly reducing page load times.",
      "Built a React.js promotional page that improved user engagement, and authored Confluence documentation for future developers.",
    ],
  },
  {
    period: "Feb 2023 — Jul 2023",
    role: "Web and Mobile App Developer",
    company: "Stratus Health Solutions, LLC",
    highlights: [
      "Developed a cross-platform React Native application (Android and iOS) connected to an admin dashboard.",
      "Integrated Stripe payments in Next.js and React Native.",
      "Built a Next.js website with admin controls and supported the web and mobile applications.",
    ],
  },
  {
    period: "May 2021 — Dec 2022",
    role: "Web Developer and 3D Modeler",
    company: "Engineering Services Fluid Mechanics and Thermodynamics",
    highlights: [
      "Built and maintained the website for Vactrans LLC.",
      "Created a 3D animation of a train model used in investor presentations.",
      "Provided technical support as a virtual assistant.",
    ],
  },
];

export const education = {
  school: "ICCT Colleges Foundation Inc.",
  degree: "Bachelor of Science in Information Technology",
  date: "Dec 2022",
  gpa: "1.50",
  gpaLabel: "GWA",
};

export const certificates: { title: string; issuer: string; year: string }[] = [];

// What I've built, grouped by type of work (from the experience above).
export const projects = [
  { title: "Custom WordPress Theme", tag: "inGnius Systems", hue: "from-sky-500 to-indigo-700" },
  { title: "Charter Search REST API", tag: "inGnius Systems", hue: "from-violet-500 to-fuchsia-800" },
  { title: "AEM Components & Templates", tag: "WHG Philippines", hue: "from-emerald-500 to-teal-800" },
  { title: "React Native App with Stripe", tag: "Stratus Health", hue: "from-amber-400 to-orange-700" },
  { title: "3D Train Animation", tag: "Vactrans", hue: "from-neutral-600 to-black" },
];

type FeaturedProject = {
  title: string;
  year: string;
  role: string;
  // Must match a name in `companies` — used by the project filter.
  company: (typeof companies)[number]["name"];
  description: string;
  highlights: string[];
  stack: string[];
  images: string[];
  links: { live?: string; code?: string };
};

// Featured projects — descriptions come from the résumé. Add `links` and swap the placeholder images.
// Drop preview images in /public/projects and list them under `images` (first one is the cover).
export const featuredProjects: FeaturedProject[] = [
  {
    title: "Australian Superyachts",
    year: "2026",
    role: "WordPress Front End Developer",
    company: "inGnius Systems",
    description:
      "A custom WordPress theme for Australian Superyachts — a luxury yacht charter, sales, management and agency business — with dynamic charter search and yacht catalogs that editors manage without developer help.",
    highlights: [
      "REST API endpoints for search, filters and locations",
      "Pagination, skeleton loaders and client-side filtering",
      "SEO-friendly rewrite routing for detail pages",
    ],
    stack: ["WordPress", "PHP", "ACF", "SCSS", "JavaScript", "Gulp"],
    images: ["/projects/asy-hero.jpg", "/projects/asy-story.jpg", "/projects/asy-services.jpg", "/projects/asy-charters.jpg"],
    links: { live: "https://www.australiansuperyachts.com.au/" },
  },
  {
    title: "888casino",
    year: "2023–25",
    role: "Webmaster / Web Developer (AEM Sites)",
    company: "WHG Philippines",
    description:
      "Helped migrate 888's flagship websites, including 888casino, from a legacy CMS to Adobe Experience Manager Sites, building the reusable components and templates the new sites run on.",
    highlights: [
      "Components, editable templates, Sling Models and ClientLibs",
      "Improved homepage LCP and page load times",
      "React.js promotional page for higher engagement",
    ],
    stack: ["AEM Sites", "Sling Models", "ClientLibs", "React.js", "Jira"],
    images: ["/projects/888-home.jpg", "/projects/888-jackpot.jpg", "/projects/888-live.jpg"],
    links: { live: "https://www.888casino.com/" },
  },
  {
    title: "Health App & Admin Dashboard",
    year: "2023",
    role: "Web and Mobile App Developer",
    company: "Stratus Health",
    description:
      "A cross-platform mobile app for Android and iOS, connected to a Next.js website and admin dashboard, with payments built in.",
    highlights: ["React Native app for Android and iOS", "Stripe payments on web and mobile", "Next.js site with admin controls"],
    stack: ["React Native", "Next.js", "Stripe"],
    images: ["/projects/project-three-1.svg", "/projects/project-three-2.svg"],
    links: {},
  },
];

export const skills = [
  {
    group: "Adobe Experience Manager",
    items: ["AEM Sites", "AEM as a Cloud Service", "Components", "Editable Templates", "Sling Models", "ClientLibs", "Content & Experience Fragments", "AEM Assets (DAM)"],
  },
  { group: "Front-end", items: ["JavaScript (ES6)", "HTML5", "CSS3", "SASS", "React.js", "Next.js", "React Native"] },
  { group: "CMS & backend", items: ["WordPress", "Custom Post Types", "ACF", "REST API", "Stripe"] },
  { group: "Tools & practices", items: ["Git", "Jira", "Confluence", "Agile / Scrum", "Gulp", "Performance (LCP)"] },
];
