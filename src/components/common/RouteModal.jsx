import React, { useEffect } from "react";
import { X, ExternalLink, ArrowRight, ShieldCheck, Compass } from "lucide-react";
import { useT } from "../../i18n/useT";

export default function RouteModal({ activeRoute, onClose, extraData }) {
  const { t } = useT();

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (activeRoute) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeRoute, onClose]);

  if (!activeRoute) return null;

  const routeDescriptions = {
    "/services": "Explore our full catalog of 20+ cooperative-standard trades with fair rates and verified craftspeople.",
    "/book": "Direct cooperative dispatch portal. Select your trade requirement, preferred schedule, and verified member tier.",
    "/login": "Secure portal for cooperative member craftspeople, contractors, supervisors, and households.",
    "/worker/join": "Worker onboarding: link e-Shram, submit trade certificates, attend trade peer verification, and receive your Digital Worker ID.",
    "/projects": "Commercial and multi-trade project dashboard with milestone escrow tracking, supervisor logs, and trade rosters.",
    "/verify": "Public credential verification lookup: enter an 8-digit Cooperative ID or scan QR to inspect police verification and trade badges.",
    "/contractors": "Contractor registration & enterprise portal: source verified multi-trade crews with supervisor guarantees for construction projects.",
  };

  const description = routeDescriptions[activeRoute] || t("modal.description", "Placeholder route for upcoming portal module.");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-route-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-surface border border-border rounded-card p-6 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-surface-2 border border-border text-primary">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {t("modal.title", "Route Navigation Placeholder")}
              </span>
              <h3 id="modal-route-title" className="text-lg font-bold text-text">
                {activeRoute}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-lg text-text-muted hover:text-text hover:bg-surface-2 transition-colors focus:ring-2 focus:ring-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="py-5 space-y-4">
          <p className="text-sm text-text-muted leading-relaxed">
            {description}
          </p>

          {extraData?.searchQuery && (
            <div className="p-3.5 rounded-xl bg-surface-2/70 border border-primary/30">
              <span className="text-xs text-primary font-semibold block mb-1">
                Passed Input Requirement:
              </span>
              <p className="text-sm text-text italic">
                "{extraData.searchQuery}"
              </p>
            </div>
          )}

          <div className="p-3.5 rounded-xl bg-surface-2 border border-border flex items-center gap-3 text-xs text-text-muted">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
            <span>
              Home page only build. In production, this navigates to the complete{" "}
              <strong className="text-text">{activeRoute}</strong> submodule.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-lg text-text-muted hover:text-text hover:bg-surface-2 transition-colors"
          >
            {t("modal.action", "Close preview")}
          </button>
          <button
            onClick={() => {
              window.history.pushState(null, "", activeRoute);
              onClose();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-bg hover:bg-primary-hover transition-colors shadow-glow-primary"
          >
            <span>Simulate Route Change</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
