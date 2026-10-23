import React from "react";
import { Building, ClipboardCheck, Users2, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { useT } from "../../i18n/useT";

export default function ForContractors({ onNavigate }) {
  const { t } = useT();

  const points = [
    {
      icon: ClipboardCheck,
      title: t("contractors.p1Title", "Post your project specifications"),
      desc: t(
        "contractors.p1Desc",
        "Specify required trades, duration, timeline, and material scope in minutes."
      ),
    },
    {
      icon: Users2,
      title: t("contractors.p2Title", "Get matched with verified multi-trade teams"),
      desc: t(
        "contractors.p2Desc",
        "Receive coordinated crews with designated team supervisors who guarantee attendance."
      ),
    },
    {
      icon: ShieldCheck,
      title: t("contractors.p3Title", "Track progress and milestone payments"),
      desc: t(
        "contractors.p3Desc",
        "Funds stay secure in project escrow until work passes supervisor and site engineer inspections."
      ),
    },
  ];

  return (
    <section id="contractors" className="py-16 lg:py-20 bg-surface-2/60 border-b border-border/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-card bg-gradient-to-br from-surface via-surface-2 to-surface border border-primary/30 p-8 sm:p-12 shadow-2xl overflow-hidden">
          {/* Background subtle radial glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold text-primary">
                <Building className="w-3.5 h-3.5" />
                <span>{t("contractors.badge", "For General Contractors & Builders")}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-text tracking-tight">
                {t("contractors.title", "Find skilled teams for repair and construction projects")}
              </h2>

              <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                {t(
                  "contractors.subtitle",
                  "Overcome labor shortages, unreliable subcontractors, and daily site headaches with dependable, cooperative-vetted trade crews."
                )}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate("/contractors")}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-bg font-semibold hover:bg-primary-hover shadow-glow-primary transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <span>{t("contractors.cta", "Register as a contractor")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Three Points */}
            <div className="lg:col-span-7 grid grid-cols-1 gap-4">
              {points.map((pt, idx) => {
                const Icon = pt.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-surface/90 border border-border/80 flex items-start gap-4 hover:border-primary/50 transition-colors shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-text font-heading flex items-center gap-2">
                        <span>{pt.title}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
