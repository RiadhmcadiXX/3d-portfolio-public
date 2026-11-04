import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useState } from "react";
import { PageShell, rise } from "@/components/PageShell";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getPublicProject } from "@/lib/projects.functions";
import { CATEGORIES } from "@/lib/project-types";

const projectQuery = (slug: string) =>
  queryOptions({ queryKey: ["project", slug], queryFn: () => getPublicProject({ data: { slug } }) });

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params, context }) => {
    const res = await context.queryClient.ensureQueryData(projectQuery(params.slug));
    if (!res) throw notFound();
    return res;
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.name} — Project by Alex Morgan` : "Project — Alex Morgan";
    const desc = p?.summary || "A project from Alex Morgan's portfolio.";
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
  errorComponent: ({ error }) => <PageShell eyebrow="Project" title="Couldn't load"><p className="page-lede">{error.message}</p></PageShell>,
  notFoundComponent: () => (
    <PageShell eyebrow="Project" title="Not found">
      <Link to="/projects" className="next-link">See all projects →</Link>
    </PageShell>
  ),
});

function Section({ title, i, children }: { title: string; i: number; children: React.ReactNode }) {
  return (
    <motion.section className="pd-section" variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
      <h2 className="pd-h2">{title}</h2>
      {children}
    </motion.section>
  );
}

function ProjectPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(projectQuery(slug));
  const { project: p, next } = data!;
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);
  const meta = [
    { label: "Category", value: CATEGORIES[p.category]?.title },
    { label: "Year", value: p.year },
    { label: "Role", value: p.role },
    { label: "Status", value: p.status },
  ].filter((m) => m.value);

  return (
    <PageShell eyebrow={[CATEGORIES[p.category]?.title, p.year].filter(Boolean).join(" · ")} title={p.name}>
      <div className="pd-hero">
        <div>
          <motion.ul className="tag-list" style={{ margin: 0 }} variants={rise} initial="hidden" animate="show" custom={2}>
            {p.tags.map((t) => <li key={t} className="tag">{t}</li>)}
          </motion.ul>
          <motion.p className="page-lede" style={{ marginTop: "1.25rem" }} variants={rise} initial="hidden" animate="show" custom={3}>{p.summary}</motion.p>
          {p.link && (
            <motion.a href={p.link} target="_blank" rel="noopener noreferrer" className="pd-visit" variants={rise} initial="hidden" animate="show" custom={4}>
              Visit project ↗
            </motion.a>
          )}
        </div>
        {p.cover_image_url && (
          <motion.button type="button" className="pd-cover" onClick={() => setZoom({ src: p.cover_image_url!, alt: p.name })} variants={rise} initial="hidden" animate="show" custom={4}>
            <img src={p.cover_image_url} alt={p.name} />
          </motion.button>
        )}
      </div>

      {meta.length > 0 && (
        <div className="stat-row">
          {meta.map((m, i) => (
            <motion.div key={m.label} className="stat" variants={rise} initial="hidden" animate="show" custom={5 + i}>
              <span className="stat__label">{m.label}</span>
              <span className="pd-meta">{m.value}</span>
            </motion.div>
          ))}
        </div>
      )}

      {p.overview && <Section title="Overview" i={0}><p className="pd-text">{p.overview}</p></Section>}

      {(p.problem || p.solution) && (
        <Section title="Problem & solution" i={0}>
          <div className="prose-cols">
            {p.problem && <div><p className="eyebrow">The problem</p><p className="pd-text">{p.problem}</p></div>}
            {p.solution && <div><p className="eyebrow">The solution</p><p className="pd-text">{p.solution}</p></div>}
          </div>
        </Section>
      )}

      {p.stats.length > 0 && (
        <div className="stat-row">
          {p.stats.map((s) => (
            <div key={s.label} className="stat"><span className="stat__value">{s.value}</span><span className="stat__label">{s.label}</span></div>
          ))}
        </div>
      )}

      {p.features.length > 0 && (
        <Section title="Features" i={0}>
          <div className="pd-features">
            {p.features.map((f, i) => (
              <motion.div key={i} className="pd-feature" variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i % 3}>
                {f.image && (
                  <button type="button" className="pd-feature__img" onClick={() => setZoom({ src: f.image!, alt: f.title })}>
                    <img src={f.image} alt={f.title} loading="lazy" />
                  </button>
                )}
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {p.architecture && <Section title="How it works" i={0}><p className="pd-text">{p.architecture}</p></Section>}

      {p.tech_stack.length > 0 && (
        <Section title="Tech stack" i={0}>
          <ul className="tag-list" style={{ margin: 0 }}>{p.tech_stack.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
        </Section>
      )}

      {p.mobile_app && (
        <Section title={p.mobile_app.title || "Mobile app"} i={0}>
          <div className="pd-hero">
            <div>
              <p className="pd-text">{p.mobile_app.description}</p>
              <ul className="tag-list">{p.mobile_app.platforms.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
            </div>
            {p.mobile_app.image && (
              <button type="button" className="pd-cover" onClick={() => setZoom({ src: p.mobile_app!.image!, alt: "Mobile app" })}>
                <img src={p.mobile_app.image} alt="Mobile app" loading="lazy" />
              </button>
            )}
          </div>
        </Section>
      )}

      {p.gallery.length > 0 && (
        <Section title="Gallery" i={0}>
          <div className="pd-features">
            {p.gallery.map((g, i) => (
              <button key={i} type="button" className="pd-feature__img" onClick={() => setZoom({ src: g.image, alt: g.caption ?? p.name })}>
                <img src={g.image} alt={g.caption ?? p.name} loading="lazy" />
              </button>
            ))}
          </div>
        </Section>
      )}

      {next && (
        <div style={{ marginTop: "4rem" }}>
          <Link to="/projects/$slug" params={{ slug: next.slug }} className="next-link">Next project: {next.name} →</Link>
        </div>
      )}

      <Dialog open={!!zoom} onOpenChange={(o) => !o && setZoom(null)}>
        <DialogContent className="max-w-5xl p-2">
          <DialogTitle className="sr-only">{zoom?.alt}</DialogTitle>
          {zoom && <img src={zoom.src} alt={zoom.alt} className="w-full h-auto rounded-md" />}
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
