import React from "react";
import { UserCheck, ShieldCheck, Coins, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import { useT } from "../../i18n/useT";

export default function ForWorkersCTA({ onNavigate }) {
  const { t } = useT();

  const benefits = [
    {
      icon: ShieldCheck,
      title: t("forWorkers.b1Title", "Fair Work Sharing"),
      desc: t(
        "forWorkers.b1Desc",
        "No algorithm favoritism. Steady, equitable distribution of residential and commercial project requests."
      ),
    },
    {
      icon: Coins,
      title: t("forWorkers.b2Title", "Transparent Timely Payments"),
      desc: t(
        "forWorkers.b2Desc",
        "Direct bank transfer upon milestone sign-off. Cooperative escrow safeguards your hard-earned wages."
      ),
    },
    {
      icon: BookOpen,
      title: t("forWorkers.b3Title", "Worker Rights & Welfare Schemes"),
      desc: t(
        "forWorkers.b3Desc",
        "Seamless linkage to e-Shram, medical coverage, accident insurance, and skill upskilling workshops."
      ),
    },
  ];

  return (
    <section id="for-workers" className="py-16 lg:py-24 bg-surface-2/40 border-y border-border/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-card bg-surface border border-primary/40 p-8 sm:p-12 shadow-2xl overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-xs font-semibold text-primary">
                <UserCheck className="w-3.5 h-3.5" />
                <span>{t("forWorkers.badge", "Worker Empowerment")}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text tracking-tight">
                {t("forWorkers.title", "Join as a worker, get your digital ID")}
              </h2>

              <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                {t(
                  "forWorkers.subtitle",
                  "Be an owner, not an algorithm's commodity. Join your local craft cooperative and access steady, dignified work with full social security."
                )}
              </p>

              <div className="pt-3">
                <button
                  onClick={() => onNavigate("/worker/join")}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-bg font-semibold hover:bg-primary-hover shadow-glow-primary transition-all duration-200 transform hover:-translate-y-0.5 text-base"
                >
                  <span>{t("forWorkers.cta", "Join the cooperative")}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right: 3 Benefits */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {benefits.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-surface-2/80 border border-border flex flex-col justify-between hover:border-primary/50 transition-colors shadow-sm"
                  >
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 border border-primary/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-text mb-2 font-heading">
                        {b.title}
                      </h3>
                      <p className="text-xs text-text-muted leading-relaxed">
                        {b.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Cooperative Protected</span>
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
