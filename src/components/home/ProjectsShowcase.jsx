import React from "react";
import {
  HardHat,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Lock,
  Building2,
  Users,
} from "lucide-react";
import { useT } from "../../i18n/useT";

export default function ProjectsShowcase({ onNavigate }) {
  const { t } = useT();

  const assignedWorkers = [
    { initials: "VS", name: "Er. Vikram Singh", role: "Site Supervisor", badge: "Lead" },
    { initials: "RK", name: "Ramesh Kumar", role: "Master Mason", badge: "3 Crew" },
    { initials: "AK", name: "Anil Kushwaha", role: "Electrician", badge: "2 Crew" },
    { initials: "MS", name: "Mohd. Salim", role: "Plumber", badge: "2 Crew" },
    { initials: "DP", name: "Dinesh Pal", role: "Carpenter", badge: "2 Crew" },
  ];

  const milestones = [
    { name: "Foundation & Basement PCC", amount: "₹1,80,000", status: "released", date: "Verified Oct 02" },
    { name: "Ground & First Floor Masonry", amount: "₹2,40,000", status: "released", date: "Verified Oct 16" },
    { name: "Concealed Plumbing & Electrical", amount: "₹1,20,000", status: "pending", date: "Inspection Oct 28" },
    { name: "Plastering, Flooring & Finishing", amount: "₹1,60,000", status: "pending", date: "Due Nov 15" },
  ];

  return (
    <section id="projects" className="py-16 lg:py-24 bg-surface/30 border-b border-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-semibold text-primary">
            <Building2 className="w-3.5 h-3.5" />
            <span>{t("projects.badge", "Commercial & Residential Projects")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text tracking-tight">
            {t("projects.title", "Supervisor-Led Projects Showcase")}
          </h2>

          <p className="text-sm sm:text-base text-text-muted">
            {t(
              "projects.subtitle",
              "Milestone payments held in escrow and released only upon supervisor approval and homeowner satisfaction."
            )}
          </p>
        </div>

        {/* Dark Dashboard Preview Card */}
        <div className="relative rounded-card bg-surface border border-border p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden max-w-5xl mx-auto">
          {/* Subtle Glow corner */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-info/10 rounded-full blur-3xl pointer-events-none" />

          {/* Dashboard Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-info/10 border border-info/30 flex items-center justify-center text-info shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                    {t("projects.sampleTag", "Live Demo Preview")}
                  </span>
                  <span className="text-xs text-text-muted">ID: #PRJ-2026-DEL-09</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-text mt-1">
                  {t("projects.projectTitle", "House Construction G+2 • Model Town Site")}
                </h3>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-text-muted block">Contract Escrow Value</span>
              <span className="text-xl font-bold font-heading text-primary">₹7,00,000</span>
            </div>
          </div>

          {/* Progress Bar Metric */}
          <div className="py-6 border-b border-border/70 space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-semibold text-text flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>{t("projects.progressLabel", "Overall Project Progress")}</span>
              </span>
              <span className="font-bold text-primary">68% Completed</span>
            </div>
            <div className="w-full h-3 rounded-full bg-surface-2 overflow-hidden border border-border">
              <div
                className="h-full bg-gradient-to-r from-primary via-primary-hover to-info rounded-full transition-all duration-1000"
                style={{ width: "68%" }}
              />
            </div>
          </div>

          {/* Dashboard Grid: Workers Roster & Milestone Payments */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-6">
            {/* Left: Supervisor & Assigned Workers */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                  <Users className="w-4 h-4 text-info" />
                  <span>{t("projects.assignedTeam", "Assigned Trade Crew")}</span>
                </h4>
                <span className="text-xs text-primary font-medium">10 Workers Active</span>
              </div>

              <div className="space-y-2.5">
                {assignedWorkers.map((worker, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                      i === 0
                        ? "bg-surface-2 border-primary/40 shadow-sm"
                        : "bg-surface-2/60 border-border"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${
                          i === 0
                            ? "bg-primary text-bg"
                            : "bg-surface border border-border text-text"
                        }`}
                      >
                        {worker.initials}
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-text block">
                          {worker.name}
                        </span>
                        <span className="text-[11px] text-text-muted">
                          {worker.role}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                        i === 0
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-surface border border-border text-text-muted"
                      }`}
                    >
                      {worker.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Milestone Payments Schedule */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                  <Lock className="w-4 h-4 text-accent" />
                  <span>{t("projects.milestoneTitle", "Milestone Escrow Schedule")}</span>
                </h4>
                <span className="text-xs text-accent font-medium">Protected in Escrow</span>
              </div>

              <div className="space-y-3">
                {milestones.map((ms, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-surface-2/70 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <span className="text-sm font-bold text-text block">
                        {ms.name}
                      </span>
                      <span className="text-xs text-text-muted">{ms.date}</span>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="font-mono font-bold text-sm text-text">
                        {ms.amount}
                      </span>
                      {ms.status === "released" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-primary/15 text-primary border border-primary/30">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t("projects.released", "Released")}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-accent/15 text-accent border border-accent/30">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{t("projects.pending", "Escrow Pending")}</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Escrow Guarantee Statement */}
              <div className="p-3.5 rounded-xl bg-surface-2/40 border border-primary/20 flex items-start gap-3 mt-4 text-xs text-text-muted">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p>
                  Escrow Guarantee: Funds are held safely with our banking partner. The supervisor submits stage completion photos, and funds are only disbursed once the client approves the milestone.
                </p>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-text-muted">
              Ready to execute multi-trade renovations without contractor fraud?
            </span>
            <button
              onClick={() => onNavigate("/projects")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-bg font-semibold hover:bg-primary-hover shadow-glow-primary transition-all text-sm"
            >
              <span>Explore Project Management Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
