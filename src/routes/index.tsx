import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

const OfficeScene = lazy(() => import("@/components/office/OfficeScene"));

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Alex Morgan — Walk-through 3D Studio Portfolio" },
      { name: "description", content: "Walk around a 3D office and open projects, experience and contact straight from the furniture." },
      { property: "og:title", content: "Alex Morgan — 3D Studio Portfolio" },
      { property: "og:description", content: "A walkable 3D office portfolio built with React and Three.js." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useTranslation();
  return (
    <Suspense fallback={<div className="office-loading">{t("studio.loading")}</div>}>
      <OfficeScene />
    </Suspense>
  );
}
