import React, { useState } from "react";
import {
  User,
  Users,
  HardHat,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
} from "lucide-react";
import { useT } from "../../i18n/useT";

export default function HireModes({ onNavigate }) {
  const { t } = useT();
  const [activeTab, setActiveTab] = useState("team"); // "single" | "team"

  const tradeChips = [
    { name: "Mason", count: "3 members", color: "border-amber-500/40 text-amber-300 bg-amber-500/10" },
    { name: "Electrician", count: "2 members", color: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10" },
    { name: "Plumber", count: "2 members", color: "border-cyan-500/40 text-cyan-300 bg-cyan-500/10" },
    { name: "Carpenter", count: "2 members", color: "border-indigo-500/40 text-indigo-300 bg-indigo-500/10" },
    { name: "Painter", count: "4 members", color: "border-purple-500/40 text-purple-300 bg-purple-500/10" },
  ];

  return (
    <section id="hire-modes" className="py-16 lg:py-24 bg-surface/50 border-y border-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-semibold text-primary">
            <Layers className="w-3.5 h-3.5" />
            <span>{t("hireModes.badge", "Flexible Engagement")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text tracking-tight">
            {t("hireModes.title", "Two Ways to Hire")}
          </h2>

          <p className="text-sm sm:text-base text-text-muted">
            {t(
              "hireModes.subtitle",
              "Choose single-worker assistance for immediate fixes or supervisor-led multi-trade crews for comprehensive site renovations."
            )}
          </p>
        </div>

        {/* Tab Toggle Controls */}
        <div className="flex justify-center mb-10">
          <div
            role="tablist"
            aria-label="Hiring options"
            className="inline-flex p-1.5 rounded-2xl bg-surface-2 border border-border"
          >
            <button
              role="tab"
              aria-selected={activeTab === "single"}
              onClick={() => setActiveTab("single")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "single"
                  ? "bg-primary text-bg shadow-glow-primary"
                  : "text-text-muted hover:text-text hover:bg-surface"
              }`}
            >
              <User className="w-4 h-4" />
              <span>{t("hireModes.singleTab", "Single worker")}</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === "team"}
              onClick={() => setActiveTab("team")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "team"
                  ? "bg-primary text-bg shadow-glow-primary"
                  : "text-text-muted hover:text-text hover:bg-surface"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{t("hireModes.teamTab", "Team / Bulk hiring")}</span>
            </button>
          </div>
        </div>

        {/* Tab Content 1: Single Worker */}
        {activeTab === "single" && (
          <div className="rounded-card bg-surface border border-border p-6 sm:p-10 shadow-xl max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs uppercase font-bold tracking-wider text-primary">
                  Fast Home Assistance
                </span>
                <h3 className="text-2xl font-bold font-heading text-text">
                  {t("hireModes.singleTitle", "Individual Craftsperson for Quick Visits")}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {t(
                    "hireModes.singleDesc",
                    "Ideal for household repairs, maintenance visits, or specialized diagnostic tasks. Matched directly via cooperative dispatch."
                  )}
                </p>

                <ul className="space-y-2.5 pt-2">
                  {[
                    "Fixed transparent rates upfront with no surge pricing",
                    "Direct digital ID verification before arrival",
                    "14-day service quality guarantee by cooperative",
                    "Average match within 8 minutes across 8 primary trades",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-text">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <button
                    onClick={() => onNavigate("/book")}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-bg font-semibold hover:bg-primary-hover shadow-glow-primary transition-all"
                  >
                    <span>Book a single specialist</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Graphic card for Single Worker */}
              <div className="p-6 rounded-2xl bg-surface-2 border border-border/80 space-y-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mx-auto">
                  <User className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-text">Direct Dispatch Model</h4>
                <p className="text-xs text-text-muted">
                  You specify the issue → Nearby member accepts → Clear quote locked → Work completed with digital receipt.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
                  <Clock className="w-3.5 h-3.5" />
                  <span>On-demand arrival: 30 - 60 mins</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Team / Bulk Hiring (Requested Feature) */}
        {activeTab === "team" && (
          <div className="rounded-card bg-surface border border-border p-6 sm:p-10 shadow-xl max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
              <span className="text-xs uppercase font-bold tracking-wider text-info">
                Multi-Trade Construction & Renovation
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-text">
                {t("hireModes.teamTitle", "Supervisor-Led Multi-Trade Crews")}
              </h3>
              <p className="text-sm text-text-muted">
                {t(
                  "hireModes.teamDesc",
                  "One unified project, many skilled trades, all coordinated through a single master supervisor. No homeowner headache managing disparate contractors."
                )}
              </p>
            </div>

            {/* Central Architecture Flow Diagram */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-surface-2/70 border border-border/80">
              {/* Highlight Banner */}
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-1.5 rounded-full bg-info/15 text-info font-semibold text-xs sm:text-sm border border-info/30">
                  ⚡ {t("hireModes.supervisorMessage", "One project, many trades, one supervisor.")}
                </span>
              </div>

              {/* Trade Chips Feed into Supervisor Node */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* 5 Trade Chips */}
                <div className="lg:col-span-5 space-y-2.5">
                  <span className="text-xs uppercase font-bold tracking-wider text-text-muted block mb-3">
                    Multi-Trade Cooperative Partners
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                    {tradeChips.map((trade, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded-xl border ${trade.color} transition-transform hover:translate-x-1`}
                      >
                        <span className="font-semibold text-sm">{trade.name}</span>
                        <span className="text-xs opacity-80">{trade.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flow Connector Arrow */}
                <div className="lg:col-span-2 flex justify-center py-2 lg:py-0">
                  <div className="flex lg:flex-col items-center gap-2 text-primary">
                    <span className="text-xs uppercase tracking-wider font-mono font-semibold hidden lg:block text-text-muted">
                      Coordinates
                    </span>
                    <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-primary shadow-glow-primary">
                      <ArrowRight className="w-5 h-5 lg:rotate-0" />
                    </div>
                  </div>
                </div>

                {/* Supervisor Node */}
                <div className="lg:col-span-5">
                  <div className="p-6 rounded-2xl bg-surface border-2 border-primary/50 shadow-glow-primary space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                        <HardHat className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-text font-heading">
                          {t("hireModes.supervisorRole", "Site Supervisor (Master Craftsman)")}
                        </h4>
                        <span className="text-xs text-primary font-medium">
                          Single Point of Accountability
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-text-muted leading-relaxed">
                      {t(
                        "hireModes.supervisorNote",
                        "Oversees site safety, quality checks, attendance, and milestone verification. Escrow funds release only upon mutual sign-off."
                      )}
                    </p>

                    <div className="pt-2 border-t border-border flex items-center justify-between text-xs font-medium text-text-muted">
                      <span>✓ Daily attendance log</span>
                      <span>✓ Escrow milestones</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action for Team Tab */}
              <div className="mt-8 text-center pt-6 border-t border-border/80">
                <button
                  onClick={() => onNavigate("/projects")}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-bg font-semibold hover:bg-primary-hover shadow-glow-primary transition-all"
                >
                  <Users className="w-5 h-5" />
                  <span>Configure your project crew now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
