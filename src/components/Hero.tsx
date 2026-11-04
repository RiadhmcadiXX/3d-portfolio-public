import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Download, Dribbble, Instagram, Linkedin } from "lucide-react";
import portraitAsset from "@/assets/portrait-sticker-v3.png.asset.json";
import dev_avatar from "@/assets/Riadh_avatar.png";
const portraitImage = portraitAsset.url;

const Hero = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative px-1 md:px-4 lg:px-6   overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left content */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-tag text-tag-foreground rounded-full text-xs font-semibold uppercase tracking-wider mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {t("hero.available")}
          </span> */}

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-8">
            {t("hero.title1")}<br />
            {t("hero.title2")}<br />
            {t("hero.title3")}<span className="text-muted-foreground">©</span>
          </h1>

          <p className="text-base text-muted-foreground max-w-md mb-8 leading-relaxed">
            {t("hero.description")}
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-10">
            <div className="relative inline-block">
              <span
                aria-hidden
                className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-full bg-black hover:bg-brand-darkTeal mx-0 text-left"
              />
              <a
                href="#proContact"
                className="relative inline-flex items-center gap-2 rounded-sm bg-brand-teal text-background px-6 h-12 text-sm font-medium hover:bg-brand-darkTeal transition-colors"
              >
                {t("hero.getInTouch")}
                <ArrowUpRight className="w-4 h-4 text-primary" />
              </a>
            </div>
            <a
              href="https://jeidwzliqjnoioovrpeh.supabase.co/storage/v1/object/public/Resume/CV%20DEVELOPPEUR.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-70 hover:text-brand-darkTeal transition-opacity"
            >
              {t("hero.downloadCV")}
              <Download className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">{t("hero.findMeOn")}</span>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Dribbble"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
              >
                <Dribbble className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/riadhcadi/"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/riadh-cadi-913998257/"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right - portrait + floating cards */}
        <div
          className={`relative transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          <div className="relative aspect-square max-w-md ml-auto rounded-[2rem] overflow-hidden bg-muted">
            <img
              src={dev_avatar}
              alt="Developer portrait"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating info card - temporarily hidden */}
          {false && (
          <div className="absolute -left-2 md:left-0 top-8 bg-card rounded-2xl shadow-elevated p-4 w-52 animate-float">
            <p className="font-bold text-sm">DNova</p>
            <p className="text-xs text-muted-foreground mb-3">{t("hero.location")}</p>
            <div className="h-16 rounded-lg bg-gradient-to-br from-tag to-accent/20" />
            <div className="flex items-center justify-between mt-3">
              <span className="text-[10px] uppercase font-semibold bg-tag text-tag-foreground px-2 py-1 rounded-full">
                {t("hero.reactExpert")}
              </span>
            </div>
            <p className="text-xs text-accent font-semibold mt-2">{t("hero.rate")}</p>
          </div>
          )}

          {/* Floating brands card - temporarily hidden */}
          {false && (
          <div
            className="absolute -bottom-4 left-4 md:left-12 bg-card/90 backdrop-blur rounded-2xl shadow-elevated p-4 max-w-xs animate-float"
            style={{ animationDelay: "1s" }}
          >
            <p className="text-xs text-muted-foreground mb-2 whitespace-pre-line">
              {t("hero.brands")}
            </p>
            <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground/70">
              <span>STRIPE</span>
              <span>•</span>
              <span>asana</span>
              <span>•</span>
              <span>linear</span>
            </div>
          </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
