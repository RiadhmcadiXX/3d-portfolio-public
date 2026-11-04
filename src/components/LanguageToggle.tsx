import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LANGS = ["fr", "en"] as const;

/** Applies a saved language after hydration and keeps the choice in localStorage. */
export function LanguageSync() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const apply = (lng: string) => {
      const code = lng.startsWith("en") ? "en" : "fr";
      localStorage.setItem("lang", code);
      document.documentElement.lang = code;
    };

    const stored = localStorage.getItem("lang");
    if ((stored === "en" || stored === "fr") && !i18n.language.startsWith(stored)) {
      void i18n.changeLanguage(stored);
    } else {
      document.documentElement.lang = i18n.language.startsWith("en") ? "en" : "fr";
    }

    i18n.on("languageChanged", apply);
    return () => {
      i18n.off("languageChanged", apply);
    };
  }, [i18n]);

  return null;
}

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage?.startsWith("en") ? "en" : "fr";

  return (
    <div className={`lang-toggle ${className}`.trim()} role="group" aria-label={t("studio.language")}>
      {LANGS.map((lng) => (
        <button
          key={lng}
          type="button"
          className={current === lng ? "is-active" : ""}
          aria-pressed={current === lng}
          onClick={() => void i18n.changeLanguage(lng)}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
