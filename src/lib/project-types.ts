// Shared, browser-safe shape of a project as stored in the database.
export type Category = "software" | "apps" | "technical";

export const CATEGORIES: Record<Category, { title: string; blurb: string }> = {
  software: { title: "Software & Web", blurb: "Web applications, websites and desktop software." },
  apps: { title: "Mobile Apps", blurb: "Apps for iOS and Android." },
  technical: { title: "Technical Projects", blurb: "Infrastructure, servers and systems work." },
};

export const isCategory = (v: string): v is Category => v in CATEGORIES;

export type Stat = { label: string; value: string };
export type Feature = { title: string; description: string; image?: string | null };
export type MobileApp = { title: string; description: string; platforms: string[]; image?: string | null };
export type GalleryItem = { image: string; caption?: string };

export type ProjectInput = {
  slug: string;
  name: string;
  category: Category;
  summary: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  year: string;
  role: string;
  status: string;
  link: string | null;
  cover_image_url: string | null;
  tags: string[];
  tech_stack: string[];
  stats: Stat[];
  features: Feature[];
  mobile_app: MobileApp | null;
  gallery: GalleryItem[];
  is_public: boolean;
  sort_order: number;
};

export type Project = ProjectInput & { id: string; updated_at: string };

export const emptyProject = (): ProjectInput => ({
  slug: "", name: "", category: "software", summary: "", overview: "", problem: "", solution: "",
  architecture: "", year: String(new Date().getFullYear()), role: "", status: "", link: null,
  cover_image_url: null, tags: [], tech_stack: [], stats: [], features: [], mobile_app: null,
  gallery: [], is_public: false, sort_order: 0,
});

export const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
