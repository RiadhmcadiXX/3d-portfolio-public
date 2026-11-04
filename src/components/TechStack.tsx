import { useEffect, useRef, useState } from "react";
import { Cpu } from "lucide-react";
import { useTranslation } from "react-i18next";

type Tech = {
  name: string;
  slug: string; // simpleicons slug
  bg: string;
};

type Category = {
  key: string;
  techs: Tech[];
};

const CATEGORIES: Category[] = [
  {
    key: "frontend",
    techs: [
      { name: "React",       slug: "react",       bg: "linear-gradient(135deg, #0a1929 0%, #1b3a55 100%)" },
      { name: "Next.js",     slug: "nextdotjs",   bg: "linear-gradient(135deg, #1f2937 0%, #000000 100%)" },
      { name: "Vue.js",      slug: "vuedotjs",    bg: "linear-gradient(135deg, #34d399 0%, #059669 100%)" },
      { name: "TypeScript",  slug: "typescript",  bg: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)" },
      { name: "JavaScript",  slug: "javascript",  bg: "linear-gradient(135deg, #fde047 0%, #eab308 100%)" },
      { name: "Tailwind CSS",slug: "tailwindcss", bg: "linear-gradient(135deg, #38bdf8 0%, #0369a1 100%)" },
    ],
  },
  {
    key: "backend",
    techs: [
      { name: "Node.js",     slug: "nodedotjs",   bg: "linear-gradient(135deg, #4ade80 0%, #15803d 100%)" },
      { name: "C#",          slug: "sharp",      bg: "linear-gradient(135deg, #a78bfa 0%, #5b21b6 100%)" },
      { name: ".NET",        slug: "dotnet",      bg: "linear-gradient(135deg, #60a5fa 0%, #4f46e5 100%)" },
      { name: "Express",     slug: "express",     bg: "linear-gradient(135deg, #374151 0%, #111827 100%)" },
      { name: "Python",      slug: "python",      bg: "linear-gradient(135deg, #3b82f6 0%, #facc15 100%)" },
      { name: "Django",      slug: "django",      bg: "linear-gradient(135deg, #4ade80 0%, #064e3b 100%)" },
      //{ name: "PHP",         slug: "php",         bg: "linear-gradient(135deg, #818cf8 0%, #4f46e5 100%)" },
      // { name: "Laravel",     slug: "laravel",     bg: "linear-gradient(135deg, #f87171 0%, #b91c1c 100%)" },
    ],
  },
  {
    key: "database",
    techs: [
      { name: "PostgreSQL",  slug: "postgresql",  bg: "linear-gradient(135deg, #60a5fa 0%, #1e3a8a 100%)" },
      { name: "MySQL",       slug: "mysql",       bg: "linear-gradient(135deg, #38bdf8 0%, #0e7490 100%)" },
      { name: "MongoDB",     slug: "mongodb",     bg: "linear-gradient(135deg, #4ade80 0%, #166534 100%)" },
      { name: "Supabase",    slug: "supabase",    bg: "linear-gradient(135deg, #34d399 0%, #047857 100%)" },
      { name: "Firebase",    slug: "firebase",    bg: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)" },
      { name: "Appwrite",    slug: "appwrite",    bg: "linear-gradient(135deg, #f87171 0%, #be123c 100%)" },
    ],
  },
  {
    key: "mobile",
    techs: [
      { name: "Flutter",     slug: "flutter",     bg: "linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%)" },
      { name: "React Native",slug: "react",       bg: "linear-gradient(135deg, #22d3ee 0%, #0e7490 100%)" },
      { name: "Android",     slug: "android",     bg: "linear-gradient(135deg, #4ade80 0%, #15803d 100%)" },
      { name: "Electron",    slug: "electron",    bg: "linear-gradient(135deg, #38bdf8 0%, #1e3a8a 100%)" },
    ],
  },
  {
    key: "devops",
    techs: [
      { name: "Git",         slug: "git",         bg: "linear-gradient(135deg, #fb923c 0%, #c2410c 100%)" },
      { name: "Docker",      slug: "docker",      bg: "linear-gradient(135deg, #38bdf8 0%, #1e40af 100%)" },
      { name: "AWS",         slug: "amazonwebservices", bg: "linear-gradient(135deg, #1f2937 0%, #f59e0b 100%)" },
      { name: "Azure",       slug: "microsoftazure", bg: "linear-gradient(135deg, #38bdf8 0%, #1e40af 100%)" },
      { name: "Vercel",      slug: "vercel",      bg: "linear-gradient(135deg, #111827 0%, #000000 100%)" },
    ],
  },
  {
    key: "design",
    techs: [
      { name: "Figma",       slug: "figma",       bg: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)" },
      { name: "Canva",       slug: "canva",       bg: "linear-gradient(135deg, #22d3ee 0%, #7c3aed 100%)" },
    ],
  },
  {
    key: "productivity",
    techs: [
      { name: "Jira",        slug: "jira",            bg: "linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%)" },
      { name: "Trello",      slug: "trello",          bg: "linear-gradient(135deg, #38bdf8 0%, #0c4a6e 100%)" },
      { name: "Notion",      slug: "notion",          bg: "linear-gradient(135deg, #f3f4f6 0%, #9ca3af 100%)" },
      { name: "Slack",       slug: "slack",           bg: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)" },
    ],
  },
  {
    key: "ides",
    techs: [
      { name: "VS Code",     slug: "visualstudiocode", bg: "linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%)" },
      { name: "Rider",       slug: "rider",           bg: "linear-gradient(135deg, #ec4899 0%, #facc15 100%)" },
      { name: "WebStorm",    slug: "webstorm",        bg: "linear-gradient(135deg, #22d3ee 0%, #4f46e5 100%)" },
      { name: "Android Studio", slug: "androidstudio", bg: "linear-gradient(135deg, #4ade80 0%, #1e40af 100%)" },
    ],
  },
];

const TechStack = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  let globalIndex = 0;

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="px-2 md:px-6 lg:px-8 py-10 md:py-6 "
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-tag text-tag-foreground rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu size={12} />
            {t("techStack.tag")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {t("techStack.title1")}
            <br />
            {t("techStack.title2")}
          </h2>
        </div>

        <p
          className={`text-sm text-muted-foreground max-w-md md:text-right transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          {t("techStack.description")}
        </p>
      </div>

      <div className="space-y-10">
        {CATEGORIES.map((cat, ci) => (
          <div
            key={cat.key}
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: `${0.1 + ci * 0.08}s` }}
          >
            <div className="flex items-center gap-3 mb-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t(`techStack.categories.${cat.key}`)}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-5 md:gap-7">
              {cat.techs.map((tech) => {
                const i = globalIndex++;
                return (
                  <div
                    key={tech.slug}
                    className={`group flex flex-col items-center gap-2 transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                    style={{ transitionDelay: `${0.15 + i * 0.025}s` }}
                  >
                    <button
                      type="button"
                      aria-label={tech.name}
                      className="relative w-16 h-16 md:w-[72px] md:h-[72px] rounded-[22%] flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition-all duration-150 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_14px_28px_-8px_rgba(0,0,0,0.35)] active:scale-[0.88] active:brightness-90 active:shadow-[0_4px_10px_-4px_rgba(0,0,0,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 cursor-pointer select-none"
                      style={{ background: tech.bg }}
                    >
                      <div className="absolute inset-0 rounded-[22%] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                      <img
                        src={`https://cdn.simpleicons.org/${tech.slug}/white`}
                        alt=""
                        loading="lazy"
                        draggable={false}
                        className="w-8 h-8 md:w-9 md:h-9 relative pointer-events-none"
                      />
                    </button>
                    <span className="text-[11px] md:text-xs text-muted-foreground text-center font-medium">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
