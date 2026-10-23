import React from "react";
import { Users2, Receipt, ShieldCheck, Briefcase, HeartHandshake } from "lucide-react";
import { BRAND } from "../../config/brand";
import { useT } from "../../i18n/useT";

export default function WhySahkarSathi() {
  const { t } = useT();

  const cards = [
    {
      id: "fair",
      icon: Users2,
      accent: "primary",
      iconBg: "bg-primary/10 text-primary",
      borderColor: "hover:border-primary/50",
      title: t("why.fairTitle", "Fair opportunities for workers"),
      desc: t(
        "why.fairDesc",
        "Work is shared fairly across verified cooperative members, not only the top-rated few."
      ),
    },
    {
      id: "payments",
      icon: Receipt,
      accent: "accent",
      iconBg: "bg-accent/10 text-accent",
      borderColor: "hover:border-accent/50",
      title: t("why.paymentsTitle", "Transparent payments"),
      desc: t(
        "why.paymentsDesc",
        "See the full price breakdown upfront. Workers are paid on time, with milestone payments for larger jobs."
      ),
    },
    {
      id: "trusted",
      icon: ShieldCheck,
      accent: "primary",
      iconBg: "bg-primary/10 text-primary",
      borderColor: "hover:border-primary/50",
      title: t("why.trustedTitle", "Trusted professionals for your home"),
      desc: t(
        "why.trustedDesc",
        "Every worker has a verified digital ID you can check before they arrive."
      ),
    },
    {
      id: "contractors",
      icon: Briefcase,
      accent: "info",
      iconBg: "bg-info/10 text-info",
      borderColor: "hover:border-info/50",
      title: t("why.contractorsTitle", "Contractors and skilled workers, connected"),
      desc: t(
        "why.contractorsDesc",
        "Contractors find skilled teams for repair and construction projects, and workers find steady work through one cooperative platform."
      ),
    },
  ];

  return (
    <section id="why" className="py-16 lg:py-20 bg-surface/40 border-y border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-semibold text-primary">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{t("why.badge", "Why SahkarSathi")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text tracking-tight">
            {t("why.title", "A Dignified, Democratic Model for Home & Project Services")}
          </h2>

          <p className="text-sm sm:text-base text-text-muted">
            {t(
              "why.subtitle",
              "Built on the timeless cooperative philosophy: when craftspeople thrive with security and pride, homeowners receive superior, reliable craftsmanship."
            )}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`relative rounded-card bg-surface p-6 border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${card.borderColor} flex flex-col justify-between`}
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${card.iconBg}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-text mb-2.5 font-heading">
                    {card.title}
                  </h3>

                  <p className="text-sm text-text-muted leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand Statement Banner */}
        <div className="mt-12 text-center">
          <div className="inline-block p-4 sm:p-5 rounded-2xl bg-surface-2/80 border border-primary/30 max-w-3xl mx-auto shadow-md">
            <p className="text-base sm:text-lg font-medium text-text">
              <span className="text-primary font-bold">"</span>
              {t("why.statement", BRAND.brandStatement)}
              <span className="text-primary font-bold">"</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
