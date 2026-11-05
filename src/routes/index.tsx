import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { StudioLoading } from "@/components/office/StudioLoading";

const OfficeScene = lazy(() => import("@/components/office/OfficeScene"));

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Riadh M Cadi — Walk-through 3D Studio Portfolio" },
      { name: "description", content: "Walk around a 3D office and open projects, experience and contact straight from the furniture." },
      { property: "og:title", content: "Riadh M Cadi — 3D Studio Portfolio" },
      { property: "og:description", content: "A walkable 3D office portfolio built with React and Three.js." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const MIN_LOADING_MS = 3000;

function Index() {
  const [booted, setBooted] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMinElapsed(true), MIN_LOADING_MS);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <OfficeScene onBoot={() => setBooted(true)} />
      </Suspense>
      {!(booted && minElapsed) && <StudioLoading />}
    </>
  );
}
