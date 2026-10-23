import React, { useState } from "react";
import { ShieldCheck, Star, QrCode, CheckCircle2, Award, Building, Sparkles } from "lucide-react";
import { useT } from "../../i18n/useT";

export default function WorkerIdCard({ onVerifyClick }) {
  const { t } = useT();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-md mx-auto group"
    >
      {/* Ambient background glow */}
      <div className="absolute -inset-1 rounded-[22px] bg-gradient-to-r from-primary/30 via-info/20 to-primary/40 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

      {/* ID Card Box */}
      <div className="relative rounded-card bg-surface/95 backdrop-blur-xl border border-primary/30 p-6 shadow-2xl transition-transform duration-300 transform group-hover:-translate-y-1">
        {/* Top Header Strip: National Cooperative ID */}
        <div className="flex items-center justify-between pb-4 border-b border-border/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-primary">
              {t("workerCard.verifiedBadge", "Cooperative Verified")}
            </span>
          </div>
          <span className="text-xs font-mono font-semibold text-text-muted bg-surface-2 px-2.5 py-1 rounded-md border border-border">
            {t("workerCard.memberId", "COOP-DL-8821")}
          </span>
        </div>

        {/* Worker Profile Details */}
        <div className="flex items-start gap-4 pt-5">
          {/* Avatar with Initials & Verified Check */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-surface-2 to-indigo-500/20 border-2 border-primary/60 flex items-center justify-center shadow-inner">
              <span className="text-xl font-bold font-heading text-text">
                RS
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 bg-primary text-bg rounded-full shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-lg font-bold text-text truncate">
                {t("workerCard.sampleName", "Ramesh K. Sharma")}
              </h4>
              <div className="flex items-center gap-1 bg-accent/15 text-accent px-2 py-0.5 rounded-md text-xs font-semibold shrink-0">
                <Star className="w-3.5 h-3.5 fill-accent" />
                <span>{t("workerCard.rating", "4.94")}</span>
              </div>
            </div>

            <p className="text-sm font-medium text-primary mt-0.5">
              {t("workerCard.sampleTrade", "Master Electrician & Wireman")}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-text-muted mt-1.5">
              <Building className="w-3.5 h-3.5 text-text-muted shrink-0" />
              <span className="truncate">
                {t("workerCard.federation", "Delhi Craftsperson Guild #04")}
              </span>
            </div>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-border/80">
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-surface-2/60 border border-border text-[11px] font-medium text-text">
            <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">{t("workerCard.ekycVerified", "Aadhaar eKYC Done")}</span>
          </div>

          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-surface-2/60 border border-border text-[11px] font-medium text-text">
            <Award className="w-3.5 h-3.5 text-info shrink-0" />
            <span className="truncate">{t("workerCard.eshramLinked", "e-Shram Linked")}</span>
          </div>
        </div>

        {/* Bottom Interactive QR strip */}
        <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-surface-2 border border-border group-hover:border-primary/50 transition-colors">
              <QrCode className="w-6 h-6 text-primary" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-text block leading-tight">
                Digital ID QR
              </span>
              <span className="text-[10px] text-text-muted">
                {t("workerCard.scanQr", "Scan to verify live credentials")}
              </span>
            </div>
          </div>

          <button
            onClick={onVerifyClick}
            className="text-xs font-semibold text-primary hover:text-primary-hover underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-all"
          >
            Verify Card →
          </button>
        </div>

        {/* Shimmer light bar across card */}
        <div className="absolute top-0 right-0 -mr-16 w-32 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none group-hover:animate-shimmer" />
      </div>
    </div>
  );
}
