import React from "react";
import { ArrowRight, Sparkles, Users } from "lucide-react";
import { BRAND } from "../../config/brand";
import { useT } from "../../i18n/useT";

export default function FinalCta({ onNavigate }) {
  const { t } = useT();

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background radial emerald / indigo glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary/15 via-info/10 to-primary/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-card bg-gradient-to-b from-surface to-surface-2 border border-primary/40 p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-2xl space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("finalCta.ready", "Ready to experience cooperative quality?")}</span>
          </div>

          {/* Headline featuring BRAND.tagline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-text leading-tight">
            <span>{BRAND.name}: </span>
            <span className="text-primary">{BRAND.tagline}</span>
          </h2>

          <p className="text-sm sm:text-base text-text-muted max-w-2xl mx-auto leading-relaxed">
            {t(
              "finalCta.sub",
              "Join thousands of Indian households, contractors, and craftspeople building a more equitable gig economy."
            )}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate("/book")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold bg-primary text-bg hover:bg-primary-hover shadow-glow-primary transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>{t("nav.bookService", "Book a service")}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate("/worker/join")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold bg-surface-2 border border-border text-text hover:text-white hover:border-primary/50 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Users className="w-5 h-5 text-primary" />
              <span>{t("forWorkers.cta", "Join the cooperative")}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
