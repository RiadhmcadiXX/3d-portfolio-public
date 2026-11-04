import { createFileRoute, notFound, type ErrorComponentProps } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
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
  head: ({ params }) => {
    const category = isCategory(params.category) ? params.category : null;
    const title = `${category ? i18n.t(`studio.work.${category}.title`) : "Work"} — Riadh M Cadi`;
    const desc = category ? i18n.t(`studio.work.${category}.blurb`) : "Projects by Riadh M Cadi.";
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
  errorComponent: WorkError,
  notFoundComponent: WorkNotFound,
});

function WorkError({ error }: ErrorComponentProps) {
  const { t } = useTranslation();
  return (
    <PageShell eyebrow="Work" title={t("studio.work.errorTitle")}>
      <p className="page-lede">{error instanceof Error ? error.message : "Something went wrong"}</p>
    </PageShell>
  );
}

function WorkNotFound() {
  const { t } = useTranslation();
  return (
    <PageShell eyebrow="Work" title={t("studio.work.notFound")}>
      <p className="page-lede">{t("studio.work.missing")}</p>
    </PageShell>
  );
}

function WorkPage() {
  const { t } = useTranslation();
  const { category } = Route.useParams();
  const { data } = useSuspenseQuery(categoryQuery(category));
  return (
    <PageShell eyebrow={t("studio.work.eyebrow")} title={t(`studio.work.${category}.title`)}>
      <motion.p className="page-lede" variants={rise} initial="hidden" animate="show" custom={3}>{t(`studio.work.${category}.blurb`)}</motion.p>
      <ProjectGrid projects={data} />
    </PageShell>
  );
}
