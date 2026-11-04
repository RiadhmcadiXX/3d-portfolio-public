import { createFileRoute, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { PageShell, rise } from "@/components/PageShell";
import { ProjectGrid } from "@/components/ProjectGrid";
import { listPublicProjects } from "@/lib/projects.functions";
import { CATEGORIES, isCategory } from "@/lib/project-types";

const categoryQuery = (category: string) =>
  queryOptions({ queryKey: ["projects", category], queryFn: () => listPublicProjects({ data: { category } }) });

export const Route = createFileRoute("/work/$category")({
  loader: async ({ params, context }) => {
    if (!isCategory(params.category)) throw notFound();
    await context.queryClient.ensureQueryData(categoryQuery(params.category));
    return { cat: CATEGORIES[params.category] };
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
  errorComponent: ({ error }) => <PageShell eyebrow="Work" title="Couldn't load"><p className="page-lede">{error.message}</p></PageShell>,
  notFoundComponent: () => <PageShell eyebrow="Work" title="Not found"><p className="page-lede">This category doesn't exist.</p></PageShell>,
});

function WorkPage() {
  const { category } = Route.useParams();
  const { cat } = Route.useLoaderData();
  const { data } = useSuspenseQuery(categoryQuery(category));
  return (
    <PageShell eyebrow="From the desk" title={cat.title}>
      <motion.p className="page-lede" variants={rise} initial="hidden" animate="show" custom={3}>{cat.blurb}</motion.p>
      <ProjectGrid projects={data} />
    </PageShell>
  );
}
