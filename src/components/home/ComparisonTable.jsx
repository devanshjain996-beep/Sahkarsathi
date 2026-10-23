import React from "react";
import { Check, X, Scale, Sparkles } from "lucide-react";
import { BRAND } from "../../config/brand";
import { useT } from "../../i18n/useT";

export default function ComparisonTable() {
  const { t } = useT();

  const comparisonRows = [
    {
      feature: "Booking Scope",
      typical: "Single-worker booking only; struggle to coordinate multi-trade jobs",
      sahkar: "Single worker & coordinated bulk multi-trade hiring",
    },
    {
      feature: "Project Coordination",
      typical: "Customer coordinates multiple strangers with zero accountability",
      sahkar: "Dedicated supervisor-led teams handle on-site quality",
    },
    {
      feature: "Skill Architecture",
      typical: "Rigid fixed categories with no multi-skill recognition",
      sahkar: "Dynamic verified skills matrix with apprenticeships",
    },
    {
      feature: "Worker Status",
      typical: "Worker treated as anonymous listing or interchangeable unit",
      sahkar: "Cooperative member with digital ID, voting rights & welfare",
    },
    {
      feature: "Pricing Model",
      typical: "High commission (20-35%) plus unpredictable surge pricing",
      sahkar: "Democratic cooperative rates: zero surge, transparent fee",
    },
    {
      feature: "Work Allocation",
      typical: "Winner-takes-all algorithmic bias favoring a tiny fraction",
      sahkar: "Fair work sharing guaranteeing steady livelihood for all members",
    },
  ];

  return (
    <section id="comparison" className="py-16 lg:py-24 bg-surface/40 border-y border-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-semibold text-primary">
            <Scale className="w-3.5 h-3.5" />
            <span>{t("comparison.badge", "Ethical Alternative")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text tracking-tight">
            {t("comparison.title", "How SahkarSathi is Different")}
          </h2>

          <p className="text-sm sm:text-base text-text-muted">
            {t(
              "comparison.subtitle",
              "See how a cooperative architecture transforms gig work for homeowners, contractors, and craftspeople alike."
            )}
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="rounded-card bg-surface border border-border shadow-2xl overflow-hidden max-w-5xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface-2/80">
                  <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold uppercase tracking-wider text-text-muted w-1/4">
                    {t("comparison.colFeature", "Feature")}
                  </th>
                  <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold uppercase tracking-wider text-text-muted w-3/8">
                    {t("comparison.colTypical", "Typical Gig Platforms")}
                  </th>
                  <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold uppercase tracking-wider text-primary bg-primary/10 border-l border-primary/20 w-3/8">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>{BRAND.name} (Cooperative)</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-surface-2/40 transition-colors"
                  >
                    {/* Dimension / Feature name */}
                    <td className="p-4 sm:p-5 font-bold text-text font-heading align-top">
                      {row.feature}
                    </td>

                    {/* Typical Platform column */}
                    <td className="p-4 sm:p-5 text-text-muted align-top">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-danger/10 text-danger flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="leading-relaxed">{row.typical}</span>
                      </div>
                    </td>

                    {/* SahkarSathi column */}
                    <td className="p-4 sm:p-5 text-text bg-primary/[0.04] border-l border-primary/20 align-top">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="font-medium text-emerald-100 leading-relaxed">
                          {row.sahkar}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
