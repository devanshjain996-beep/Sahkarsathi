import React from "react";
import { IdCard, Users, Scale, ShieldCheck, ArrowRight, QrCode } from "lucide-react";
import { useT } from "../../i18n/useT";

export default function WorkerRights({ onNavigate }) {
  const { t } = useT();

  const cards = [
    {
      icon: IdCard,
      badge: "Tamper-Proof ID",
      title: t("rights.card1Title", "Digital Worker ID"),
      desc: t(
        "rights.card1Desc",
        "Tamper-proof digital card equipped with QR verification, verified trades, and background check records. Inspect before letting anyone enter your home."
      ),
      bullets: [
        "Aadhaar-based eKYC verification",
        "Official police clearance record check",
        "Direct trade skills peer certification",
      ],
      linkText: "Verify a worker ID",
      route: "/verify",
    },
    {
      icon: Users,
      badge: "Democratic Governance",
      title: t("rights.card2Title", "Cooperative Membership"),
      desc: t(
        "rights.card2Desc",
        "Every worker is a democratic co-owner with equal voting rights, fair work allocation, and dividend shares rather than extractive platform cuts."
      ),
      bullets: [
        "One member, one democratic vote",
        "Cooperative surplus distributed as dividends",
        "Transparent dispute peer arbitration",
      ],
      linkText: "Learn cooperative structure",
      route: "/worker/join",
    },
    {
      icon: Scale,
      badge: "Social Protection",
      title: t("rights.card3Title", "Know Your Rights & Welfare"),
      desc: t(
        "rights.card3Desc",
        "Direct linkage with government e-Shram database, accident insurance, maternity benefits, pension schemes, and minimum fair wage guidelines."
      ),
      bullets: [
        "National e-Shram portal linkage",
        "Emergency group accident protection",
        "Living wage adherence with zero surge exploitation",
      ],
      linkText: "View welfare guidelines",
      route: "/worker/join",
    },
  ];

  return (
    <section id="worker-rights" className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-semibold text-primary">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t("rights.badge", "Worker Dignity & Verification")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text tracking-tight">
            {t("rights.title", "Verified Identity & Worker Rights")}
          </h2>

          <p className="text-sm sm:text-base text-text-muted">
            {t(
              "rights.subtitle",
              "Protecting both homeowners and workers through digital proof of credentials and collective welfare empowerment."
            )}
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="rounded-card bg-surface border border-border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-card-hover"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-surface-2 border border-border text-primary flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-text-muted bg-surface-2 px-2.5 py-1 rounded-md border border-border">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-text font-heading mb-2.5">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-5">
                    {card.desc}
                  </p>

                  <ul className="space-y-2 border-t border-border/70 pt-4 mb-6">
                    {card.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-text">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-border/70">
                  <button
                    onClick={() => onNavigate(card.route)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover group"
                  >
                    <span>{card.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
