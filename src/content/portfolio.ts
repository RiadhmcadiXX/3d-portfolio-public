// Placeholder portfolio content — replace with the owner's real details.
export type Category = "software" | "apps" | "technical";
export const categories: Record<Category, { title: string; blurb: string }> = {
  software: { title: "Software & Web", blurb: "Web applications and desktop software." },
  apps: { title: "Mobile Apps", blurb: "Apps for iOS and Android." },
  technical: { title: "Technical Projects", blurb: "Infrastructure, servers and systems work." },
};

export type Project = {
  category: Category;
  slug: string;
  title: string;
  year: string;
  role: string;
  summary: string;
  body: string[];
  tags: string[];
  stats: { label: string; value: string }[];
};

export const owner = {
  name: "Riadh M Cadi",
  title: "Creative Developer",
  email: "Riadhmcadi@gmail.com",
  location: "Québec, Canada",
};

export const projects: Project[] = [
  {
    slug: "atlas",
    category: "software",
    title: "Atlas",
    year: "2026",
    role: "Lead front-end",
    summary: "A real-time map dashboard for city transit teams.",
    body: [
      "Atlas turns thousands of live vehicle pings into a calm, readable map that dispatchers can act on in seconds.",
      "I led the interface, built the WebGL map layer and shaped a design language around clarity under pressure.",
    ],
    tags: ["React", "WebGL", "TypeScript"],
    stats: [
      { label: "Vehicles tracked", value: "4,200" },
      { label: "Faster decisions", value: "38%" },
      { label: "Frame budget", value: "16ms" },
    ],
  },
  {
    slug: "lumen",
    category: "software",
    title: "Lumen",
    year: "2025",
    role: "Design & 3D",
    summary: "An interactive 3D product configurator for a lighting brand.",
    body: [
      "Lumen lets shoppers place lamps in a room, change finishes and see the light fall in real time.",
      "I modelled the products in Blender and brought them to the browser with Three.js.",
    ],
    tags: ["Three.js", "Blender", "Shaders"],
    stats: [
      { label: "Products", value: "60+" },
      { label: "Conversion lift", value: "22%" },
      { label: "Avg. session", value: "4m 12s" },
    ],
  },
  {
    slug: "fieldnotes",
    category: "apps",
    title: "Fieldnotes",
    year: "2024",
    role: "Full-stack",
    summary: "A writing app that keeps research, quotes and drafts together.",
    body: [
      "Fieldnotes is a quiet writing space with linked notes, offline sync and a focus mode.",
      "I built it end to end, from the editor to the sync engine.",
    ],
    tags: ["React", "Node", "Offline-first"],
    stats: [
      { label: "Writers", value: "12k" },
      { label: "Notes synced", value: "1.8M" },
      { label: "Uptime", value: "99.98%" },
    ],
  },
  {
    slug: "relay",
    category: "technical",
    title: "Relay",
    year: "2023",
    role: "Infrastructure",
    summary: "A self-hosted build and deploy cluster for a small studio.",
    body: ["Relay replaced a pile of scripts with a reliable, monitored deploy pipeline running on in-house servers."],
    tags: ["Linux", "Docker", "CI/CD"],
    stats: [
      { label: "Deploys / week", value: "300+" },
      { label: "Build time", value: "-61%" },
      { label: "Servers", value: "6" },
    ],
  },
];

export type Experience = {
  years: string;
  company: string;
  role: string;
  /** Short label drawn on the office pinboard. */
  pin: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    years: "2023 — Present",
    company: "Self-employed",
    role: "Independent Software and Web Developer",
    pin: "Independent Developer",
    points: [
      "Design and develop custom web, mobile, and desktop applications for small business clients and personal projects.",
      "Develop frontend and backend features using C#, .NET, React, TypeScript, Node.js, and REST APIs.",
      "Integrate Stripe payment processing into multiple client websites and applications.",
      "Modernize legacy applications by migrating them to more maintainable technology stacks based on React and .NET.",
      "Perform large-scale data migrations from SQL Server and MongoDB to PostgreSQL.",
      "Migrate data from Google Sheets and other sources into structured SQL and PostgreSQL databases.",
      "Integrate AI APIs, including OpenAI and other large language model APIs, into client applications.",
    ],
  },
  {
    years: "2025",
    company: "COGIWEB",
    role: "Programmer Analyst Intern",
    pin: "Programmer Analyst",
    points: [
      "Developed and modified application features using C#, .NET, JavaScript, and ASPX.",
      "Investigated and fixed software bugs and application issues.",
      "Created and optimized SQL Server queries.",
      "Used Entity Framework Core to access data and manage database migrations.",
      "Developed reusable pages and components.",
      "Participated in functional and unit testing to validate application behaviour.",
      "Deployed and verified application changes using Jenkins and DevOps tools.",
      "Collaborated with team members to understand requirements.",
    ],
  },
  {
    years: "2022 — 2025",
    company: "Walmart",
    role: "Electronics Department Associate",
    pin: "Electronics Associate",
    points: [
      "Provided customer service and helped customers select mobile devices, plans, and electronic accessories based on their needs.",
      "Explained technical product features and recommended appropriate solutions.",
    ],
  },
  {
    years: "2021 — 2022",
    company: "University graduation internship",
    role: "Mobile Developer — Mobile Delivery Application",
    pin: "Mobile Developer",
    points: [
      "Worked with team members to implement project requirements and deliver the mobile delivery application.",
    ],
  },
  {
    years: "2017 — 2018",
    company: "Algerian Red Crescent",
    role: "IT Technician",
    pin: "IT Technician",
    points: [
      "Installed, configured, and maintained computer equipment.",
      "Troubleshot hardware and software issues in Red Crescent facilities.",
    ],
  },
  {
    years: "2017 — 2018",
    company: "IRepair",
    role: "IT Repair and Support Technician",
    pin: "Support Technician",
    points: [
      "Diagnosed and repaired mobile devices, including screens, batteries, and software issues.",
      "Performed Windows installation, software installation, computer formatting, and troubleshooting.",
    ],
  },
  {
    years: "2016 — 2018",
    company: "Phone Store",
    role: "Mobile Phone and Accessories Sales Associate",
    pin: "Sales Associate",
    points: [
      "Assisted customers with mobile phones, plans, accessories, chargers, and headphones.",
      "Recommended products based on customer needs and budget.",
    ],
  },
];

export const skills = [
  "C#",
  ".NET",
  "React",
  "TypeScript",
  "Node.js",
  "JavaScript",
  "REST APIs",
  "PostgreSQL",
  "SQL Server",
  "Entity Framework",
  "Stripe",
  "Jenkins",
];
