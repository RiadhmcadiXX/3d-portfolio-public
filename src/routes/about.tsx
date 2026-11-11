import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { PageShell, rise } from "@/components/PageShell";
import { owner } from "@/content/portfolio";
import TechStack from "@/components/TechStack";
import Hero from "@/components/Hero";
import { useState } from "react";
import { GitHubHeatmap } from "@/components/GitHubHeatmap";
import { getGitHubContributions } from "@/lib/github.functions";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Riadh M Cadi, Creative Developer" },
      { name: "description", content: "Who Riadh M Cadi is and how they build playful, fast 3D experiences for the web." },
      { property: "og:title", content: "About — Riadh M Cadi" },
      { property: "og:description", content: "A creative developer blending design, code and 3D." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async () => {
    const calendar = await getGitHubContributions();
    return { calendar }
  },
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();
  
  const { calendar } = Route.useLoaderData();


  const [isVisible, setIsVisible] = useState(true);
  return (
    <PageShell eyebrow={`${owner.title} · ${owner.location}`} title={t("studio.about.title")}>
      <Hero />

      <div
        className={`bg-brand-blue text-accent-foreground rounded-[2rem] p-8 md:p-14 mb-20 mt-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <p className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-4xl mb-8">
          {t("about.mission")}
        </p>

        {/* <div className="flex flex-wrap items-center gap-6 md:gap-10 opacity-70 font-bold text-sm md:text-base">
          <span>Jeep</span>
          <span>amazon</span>
          <span>● bitcoin</span>
          <span>HubSpot</span>
          <span>stripe</span>
          <span>Google</span>
        </div> */}
      </div>
      <motion.p className="page-lede" variants={rise} initial="hidden" animate="show" custom={5}>
        {t("studio.about.lede")}
      </motion.p>

      <motion.p className="page-body" variants={rise} initial="hidden" animate="show" custom={6}>
        {t("studio.about.body")}
      </motion.p>

      {/* <GitHubHeatmap calendar={calendar} /> */}
      <TechStack />

    </PageShell>
  );
}
