import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { PageShell, rise } from "@/components/PageShell";
import { experience, skills } from "@/content/portfolio";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Riadh M Cadi" },
      { name: "description", content: "Where Riadh M Cadi has worked and the tools they use every day." },
      { property: "og:title", content: "Experience — Riadh M Cadi" },
      { property: "og:description", content: "Roles, studios and skills of a creative developer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  const { t } = useTranslation();
  return (
    <PageShell eyebrow={t("studio.experience.eyebrow")} title={t("studio.experience.title")}>
      <ol className="timeline">
        {experience.map((e, i) => (
          <motion.li
            key={`${e.role}-${e.company}`}
            className="timeline__item"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="timeline__years">{e.years}</span>
            <div>
              <h2 className="timeline__role">{e.role}</h2>
              <p className="timeline__company">{e.company}</p>
              <ul className="timeline__points">
                {e.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
      <motion.ul className="tag-list" variants={rise} initial="hidden" animate="show" custom={8}>
        {skills.map((s) => <li key={s} className="tag">{s}</li>)}
      </motion.ul>
    </PageShell>
  );
}
