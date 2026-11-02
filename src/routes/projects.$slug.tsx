import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell, rise } from "@/components/PageShell";
import { projects } from "@/content/portfolio";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.title} — Project by Alex Morgan` : "Project — Alex Morgan";
    const desc = p?.summary ?? "A project from Alex Morgan's portfolio.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  return (
    <PageShell eyebrow={`Project · ${project.year} · ${project.role}`} title={project.title}>
      <motion.p className="page-lede" variants={rise} initial="hidden" animate="show" custom={3}>
        {project.summary}
      </motion.p>
      <div className="stat-row">
        {project.stats.map((s, i) => (
          <motion.div key={s.label} className="stat" variants={rise} initial="hidden" animate="show" custom={4 + i}>
            <span className="stat__value">{s.value}</span>
            <span className="stat__label">{s.label}</span>
          </motion.div>
        ))}
      </div>
      <div className="prose-cols">
        {project.body.map((t, i) => (
          <motion.p key={i} variants={rise} initial="hidden" animate="show" custom={7 + i}>{t}</motion.p>
        ))}
      </div>
      <motion.ul className="tag-list" variants={rise} initial="hidden" animate="show" custom={9}>
        {project.tags.map((t) => <li key={t} className="tag">{t}</li>)}
      </motion.ul>
      <motion.div variants={rise} initial="hidden" animate="show" custom={10}>
        <Link to="/projects/$slug" params={{ slug: next.slug }} className="next-link">
          Next project: {next.title} →
        </Link>
      </motion.div>
    </PageShell>
  );
}
