import React from "react";
import {
  FileText,
  ShieldCheck,
  Cpu,
  UserCheck,
  Users2,
  CheckCircle,
  ArrowRight,
  GitCommit,
} from "lucide-react";
import { useT } from "../../i18n/useT";

export default function HowItWorks() {
  const { t } = useT();

  const stepIcons = [FileText, ShieldCheck, Cpu, UserCheck, Users2, CheckCircle];

  // Retrieve steps from i18n
  const rawSteps = t("howItWorks.steps");
  const steps = Array.isArray(rawSteps)
    ? rawSteps
    : [
        {
          num: "01",
          title: "Service requirement",
          desc: "Describe your household repair or project scope in plain Hindi, English, or voice note.",
        },
        {
          num: "02",
          title: "Worker verification",
          desc: "System matches verified trade certificates, police clearance, and e-Shram cooperative status.",
        },
        {
          num: "03",
          title: "AI matching",
          desc: "Fair rotation algorithm matches nearest available member without bias or unfair bidding wars.",
        },
        {
          num: "04",
          title: "Worker assignment",
          desc: "Receive digital ID profile, contact card, estimated arrival time, and upfront transparent quote.",
        },
        {
          num: "05",
          title: "Team formation",
          desc: "For large projects, a designated supervisor convenes verified multi-trade crew members.",
        },
        {
          num: "06",
          title: "Completion & feedback",
          desc: "Inspect work, release escrow payment, and leave reciprocal cooperative community feedback.",
        },
      ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-semibold text-primary">
            <GitCommit className="w-3.5 h-3.5" />
            <span>{t("howItWorks.badge", "Step-by-step Transparency")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text tracking-tight">
            {t("howItWorks.title", "How SahkarSathi Works")}
          </h2>

          <p className="text-sm sm:text-base text-text-muted">
            {t(
              "howItWorks.subtitle",
              "From requirement scoping to verified milestone completion, guaranteed by cooperative standards."
            )}
          </p>
        </div>

        {/* Stepper Container: Horizontal on desktop/tablet, vertical on mobile */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div
            className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 -translate-y-8 z-0 pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = stepIcons[idx] || CheckCircle;

              return (
                <div
                  key={idx}
                  className="relative rounded-card bg-surface border border-border p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-card-hover group"
                >
                  <div>
                    {/* Top Step Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold px-2 py-1 rounded-md bg-surface-2 text-primary border border-primary/20">
                        {step.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-bg transition-colors shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-base font-bold text-text mb-2 font-heading group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs text-text-muted leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Flow Arrow for mobile/tablet */}
                  <div className="mt-4 pt-3 border-t border-border/50 flex lg:hidden items-center justify-end text-xs text-primary font-medium">
                    <span>Next step</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
