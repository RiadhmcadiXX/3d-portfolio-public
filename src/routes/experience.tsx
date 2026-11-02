import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell, rise } from "@/components/PageShell";
import { experience, skills } from "@/content/portfolio";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Alex Morgan" },
      { name: "description", content: "Where Alex Morgan has worked and the tools they use every day." },
      { property: "og:title", content: "Experience — Alex Morgan" },
      { property: "og:description", content: "Roles, studios and skills of a creative developer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <PageShell eyebrow="From the pinboard" title="Experience">
      <ol className="timeline">
        {experience.map((e, i) => (
          <motion.li
            key={e.company}
            className="timeline__item"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="timeline__years">{e.years}</span>
            <div>
              <h2 className="timeline__role">{e.role}</h2>
              <p className="timeline__company">{e.company}</p>
              <p className="timeline__text">{e.text}</p>
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
