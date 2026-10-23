import React, { useState } from "react";
import { Search, Sparkles, ArrowRight, ShieldCheck, CheckCircle, Users, Award, Shield } from "lucide-react";
import { BRAND } from "../../config/brand";
import { useT } from "../../i18n/useT";
import WorkerIdCard from "./WorkerIdCard";

export default function Hero({ onNavigate }) {
  const { t } = useT();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onNavigate("/book", { searchQuery: searchQuery || "Kitchen tap repair" });
  };

  const chips = [
    t("hero.searchChips.0", "Kitchen tap leaking"),
    t("hero.searchChips.1", "Switchboard sparking"),
    t("hero.searchChips.2", "AC gas refilling"),
    t("hero.searchChips.3", "Full home painting"),
  ];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Background radial glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] lg:w-[900px] lg:h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-10 w-[400px] h-[350px] bg-info/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines, CTAs, Smart Search */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2/80 border border-border text-xs font-semibold text-primary shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>{BRAND.badgeText}</span>
            </div>

            {/* Main Headline: BRAND.tagline split in two lines */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-[1.12]">
              <span className="block text-text">
                {t("hero.taglineLine1", BRAND.taglineLine1)}
              </span>
              <span className="block text-primary mt-1">
                {t("hero.taglineLine2", BRAND.taglineLine2)}
              </span>
            </h1>

            {/* Sub-copy */}
            <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl">
              {t("hero.subcopy", BRAND.subcopy)}
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate("/book")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold bg-primary text-bg hover:bg-primary-hover shadow-glow-primary transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span>{t("hero.ctaBook", "Book a service")}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate("/projects")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold bg-surface-2 border border-border text-text hover:text-white hover:border-primary/50 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Users className="w-5 h-5 text-info" />
                <span>{t("hero.ctaTeam", "Hire a team for a project")}</span>
              </button>
            </div>

            {/* Smart Search Box */}
            <div className="pt-4">
              <form
                onSubmit={handleSearchSubmit}
                className="relative rounded-2xl bg-surface-2/90 border border-border p-2 sm:p-2.5 shadow-xl focus-within:border-primary/80 focus-within:ring-2 focus-within:ring-primary/20 transition-all"
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex items-center gap-3 px-3 py-2 flex-1">
                    <Search className="w-5 h-5 text-primary shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t("hero.searchPlaceholder", "Try: \"my kitchen tap is leaking\" or \"need 3 painters\"")}
                      className="w-full bg-transparent text-text placeholder:text-text-muted/60 text-sm sm:text-base focus:outline-none"
                      aria-label="Describe your service or project need"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-primary/20 text-primary-hover hover:bg-primary hover:text-bg border border-primary/40 transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{t("hero.searchButton", "Understand my need")}</span>
                  </button>
                </div>
              </form>

              {/* Quick suggestion chips */}
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-1">
                <span className="text-xs text-text-muted font-medium">Quick examples:</span>
                {chips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearchQuery(chip);
                      onNavigate("/book", { searchQuery: chip });
                    }}
                    className="text-xs px-2.5 py-1 rounded-lg bg-surface border border-border hover:border-primary/50 text-text-muted hover:text-text transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Verified Worker ID card Mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <WorkerIdCard onVerifyClick={() => onNavigate("/verify")} />
          </div>
        </div>

        {/* Trust Strip Underneath Hero */}
        <div className="mt-14 pt-8 border-t border-border/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface/60 border border-border/60">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text">
                  {t("hero.trustAadhaar", "Aadhaar eKYC")}
                </h4>
                <p className="text-xs text-text-muted">UIDAI digital authentication</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface/60 border border-border/60">
              <div className="p-2 rounded-lg bg-info/10 text-info">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text">
                  {t("hero.trustBackground", "Background checked")}
                </h4>
                <p className="text-xs text-text-muted">Police verified record history</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface/60 border border-border/60">
              <div className="p-2 rounded-lg bg-accent/10 text-accent">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text">
                  {t("hero.trustSkills", "Skill certified")}
                </h4>
                <p className="text-xs text-text-muted">Cooperative trade evaluated</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface/60 border border-border/60">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text">
                  {t("hero.trustCoop", "Cooperative backed")}
                </h4>
                <p className="text-xs text-text-muted">Democratic member protection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
