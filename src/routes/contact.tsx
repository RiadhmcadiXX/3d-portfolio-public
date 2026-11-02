import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell, rise } from "@/components/PageShell";
import { owner } from "@/content/portfolio";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Alex Morgan" },
      { name: "description", content: "Grab a virtual coffee and get in touch with Alex Morgan about a project." },
      { property: "og:title", content: "Contact — Alex Morgan" },
      { property: "og:description", content: "Start a project or just say hello." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell eyebrow="Coffee corner" title="Let's make something.">
      <motion.p className="page-lede" variants={rise} initial="hidden" animate="show" custom={4}>
        Open for freelance projects and full-time roles. Coffee's on me.
      </motion.p>
      <motion.a
        href={`mailto:${owner.email}`}
        className="mail-link"
        variants={rise}
        initial="hidden"
        animate="show"
        custom={5}
        whileHover={{ x: 8 }}
      >
        {owner.email} →
      </motion.a>
    </PageShell>
  );
}
