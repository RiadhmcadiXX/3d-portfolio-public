import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell, rise } from "@/components/PageShell";
import { categories, projects, type Category } from "@/content/portfolio";

export const Route = createFileRoute("/work/$category")({
  loader: ({ params }) => {
    const cat = categories[params.category as Category];
    if (!cat) throw notFound();
    return { key: params.category as Category, cat, list: projects.filter((p) => p.category === params.category) };
  },
  head: ({ loaderData }) => {
    const title = `${loaderData?.cat.title ?? "Work"} — Alex Morgan`;
    const desc = loaderData?.cat.blurb ?? "Projects by Alex Morgan.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: WorkPage,
});

function WorkPage() {
  const { cat, list } = Route.useLoaderData();
  return (
    <PageShell eyebrow="From the desk" title={cat.title}>
      <motion.p className="page-lede" variants={rise} initial="hidden" animate="show" custom={3}>
        {cat.blurb}
      </motion.p>
      <div className="work-grid">
        {list.map((p, i) => (
          <motion.div key={p.slug} variants={rise} initial="hidden" animate="show" custom={4 + i}>
            <Link to="/projects/$slug" params={{ slug: p.slug }} className="work-card">
              <p className="eyebrow">{p.year} · {p.role}</p>
              <h2>{p.title}</h2>
              <p>{p.summary}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
