import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { rise } from "@/components/PageShell";
import type { Project } from "@/lib/project-types";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (!projects.length) return <p className="page-body">No projects here yet.</p>;
  return (
    <div className="project-grid">
      {projects.map((p, i) => (
        <motion.div key={p.id} variants={rise} initial="hidden" animate="show" custom={4 + i}>
          <Link to="/projects/$slug" params={{ slug: p.slug }} className="project-card">
            <div className="project-card__img">
              {p.cover_image_url ? <img src={p.cover_image_url} alt={p.name} loading="lazy" /> : <span>{p.name.slice(0, 1)}</span>}
            </div>
            <div className="project-card__body">
              <p className="eyebrow">{p.year}{p.role ? ` · ${p.role}` : ""}</p>
              <h2>{p.name}</h2>
              <p>{p.summary}</p>
              <ul className="tag-list" style={{ margin: "0.75rem 0 0" }}>
                {p.tags.slice(0, 3).map((t) => <li key={t} className="tag">{t}</li>)}
              </ul>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
