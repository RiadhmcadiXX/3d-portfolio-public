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
  name: "Alex Morgan",
  title: "Creative Developer",
  email: "hello@alexmorgan.dev",
  location: "Toronto, Canada",
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

export const experience = [
  { years: "2024 — now", company: "Northlight Studio", role: "Senior Creative Developer", text: "Interactive 3D sites and product experiences for global brands." },
  { years: "2021 — 2024", company: "Parcel Labs", role: "Front-end Engineer", text: "Design systems and data-heavy dashboards used by 200+ teams." },
  { years: "2019 — 2021", company: "Freelance", role: "Designer & Developer", text: "Websites, motion and identity for small studios and startups." },
];

export const skills = ["React", "TypeScript", "Three.js", "Blender", "GLSL", "Motion design", "Node", "Figma"];
