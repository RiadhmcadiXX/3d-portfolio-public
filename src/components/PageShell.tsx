import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@/components/LanguageToggle";

export const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } }),
};

export function PageShell({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  const { t } = useTranslation();
  return (
    <motion.main
      className="page"
      initial={{ clipPath: "circle(0% at 50% 50%)" }}
      animate={{ clipPath: "circle(150% at 50% 50%)" }}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
    >
      <nav className="page-nav">
        <Link to="/" reloadDocument className="back-link">← {t("studio.back")}</Link>
        <span className="page-nav__end">
          <LanguageToggle />
          <span className="eyebrow">Riadh M Cadi</span>
        </span>
      </nav>
      <div className="page-inner">
        <motion.p className="eyebrow" variants={rise} initial="hidden" animate="show" custom={0}>{eyebrow}</motion.p>
        {/* <h1 className="page-title" aria-label={title}>
          {title.split(" ").map((w, i) => (
            <span key={i} className="word-mask">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>{" "}
            </span>
          ))}
        </h1> */}
        {children}
      </div>
    </motion.main>
  );
}
