import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { PageShell, rise } from "@/components/PageShell";
import { owner } from "@/content/portfolio";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Riadh M Cadi" },
      { name: "description", content: "Grab a virtual coffee and get in touch with Riadh M Cadi about a project." },
      { property: "og:title", content: "Contact — Riadh M Cadi" },
      { property: "og:description", content: "Start a project or just say hello." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useTranslation();
  return (
    <PageShell eyebrow={t("studio.contact.eyebrow")} title={t("studio.contact.title")}>
      <motion.p className="page-lede" variants={rise} initial="hidden" animate="show" custom={4}>
        {t("studio.contact.lede")}
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
