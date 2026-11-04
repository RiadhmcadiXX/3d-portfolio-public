import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { PageShell, rise } from "@/components/PageShell";
import { ProjectGrid } from "@/components/ProjectGrid";
import { listPublicProjects } from "@/lib/projects.functions";

const allQuery = queryOptions({ queryKey: ["projects", "all"], queryFn: () => listPublicProjects({ data: {} }) });

export const Route = createFileRoute("/projects/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(allQuery),
  head: () => ({
    meta: [
      { title: "All projects — Alex Morgan" },
      { name: "description", content: "Software, websites, mobile apps and technical projects by Alex Morgan." },
      { property: "og:title", content: "All projects — Alex Morgan" },
      { property: "og:description", content: "Software, websites, mobile apps and technical projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
  errorComponent: ({ error }) => <PageShell eyebrow="Work" title="Couldn't load"><p className="page-lede">{error.message}</p></PageShell>,
});

function ProjectsPage() {
  const { data } = useSuspenseQuery(allQuery);
  return (
    <PageShell eyebrow="Everything I've built" title="Projects">
      <motion.p className="page-lede" variants={rise} initial="hidden" animate="show" custom={3}>
        Software, websites, mobile apps and technical work.
      </motion.p>
      <ProjectGrid projects={data} />
    </PageShell>
  );
}
