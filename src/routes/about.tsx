import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { PageShell, rise } from "@/components/PageShell";
import { owner } from "@/content/portfolio";
import TechStack from "@/components/TechStack";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Alex Morgan, Creative Developer" },
      { name: "description", content: "Who Alex Morgan is and how they build playful, fast 3D experiences for the web." },
      { property: "og:title", content: "About — Alex Morgan" },
      { property: "og:description", content: "A creative developer blending design, code and 3D." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();
  return (
    <PageShell eyebrow={`${owner.title} · ${owner.location}`} title={t("studio.about.title")}>
      <motion.p className="page-lede" variants={rise} initial="hidden" animate="show" custom={5}>
        {t("studio.about.lede")}
      </motion.p>
      <motion.p className="page-body" variants={rise} initial="hidden" animate="show" custom={6}>
        {t("studio.about.body")}
      </motion.p>

      <TechStack />
    </PageShell>
  );
}
