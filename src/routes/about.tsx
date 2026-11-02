import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell, rise } from "@/components/PageShell";
import { owner } from "@/content/portfolio";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Alex Morgan, Creative Developer" },
      { name: "description", content: "Who Alex Morgan is and how they build playful, fast 3D experiences for the web." },
      { property: "og:title", content: "About — Alex Morgan" },
      { property: "og:description", content: "A creative developer blending design, code and 3D." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell eyebrow={`${owner.title} · ${owner.location}`} title="Hi, I build rooms you can walk into.">
      <motion.p className="page-lede" variants={rise} initial="hidden" animate="show" custom={5}>
        I design and code interactive experiences where 3D, motion and good typography meet. I model in Blender,
        build in React and Three.js, and care about every frame.
      </motion.p>
      <motion.p className="page-body" variants={rise} initial="hidden" animate="show" custom={6}>
        This studio is my portfolio: every piece of furniture leads somewhere. Head back and try the pinboard.
      </motion.p>
    </PageShell>
  );
}
