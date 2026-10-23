import React from "react";
import Logo from "../common/Logo";
import { BRAND } from "../../config/brand";
import { useT } from "../../i18n/useT";
import { Globe, Mail, Phone, MapPin, Award, ExternalLink, ShieldCheck } from "lucide-react";

export default function Footer({ onNavigate }) {
  const { t, lang, toggleLang } = useT();

  return (
    <footer className="bg-surface/90 border-t border-border pt-16 pb-12 text-sm text-text-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border">
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-block"
            >
              <Logo size="large" />
            </a>

            <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-sm">
              {t("footer.about", BRAND.mission)}
            </p>

            <div className="p-3.5 rounded-xl bg-surface-2 border border-border/80 inline-flex items-center gap-2.5 text-xs text-text font-medium">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>{BRAND.tagline}</span>
            </div>

            {/* Language Switcher in Footer */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-text-muted">{t("footer.language", "Language")}:</span>
              <button
                onClick={toggleLang}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-2 border border-border hover:border-primary/50 text-xs font-semibold text-text transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span>{lang === "en" ? "English (Switch to हिंदी)" : "हिंदी (Switch to English)"}</span>
              </button>
            </div>
          </div>

          {/* Col 3: For Customers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text font-heading">
              {t("footer.forCustomers", "For Customers")}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate("/services")}
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.pricingTable", "Transparent Price List")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/book")}
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.emergencyBook", "Book an Urgent Repair")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/projects")}
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.postProject", "Post a Project Scope")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/verify")}
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.verifyId", "Verify Worker QR Card")}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: For Partners & Workers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text font-heading">
              {t("footer.forPartners", "For Partners")}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate("/worker/join")}
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.joinCoop", "Join Local Cooperative")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/contractors")}
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.contractorPortal", "Contractor Network")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/worker/join")}
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.welfare", "Worker Welfare & e-Shram")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/worker/join")}
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.rightsPolicy", "Charter of Worker Rights")}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Hackathon Badge */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text font-heading">
              Support & Presence
            </h4>
            <div className="space-y-2.5 text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>{BRAND.supportEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>{BRAND.supportPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>New Delhi • National Guild Clusters</span>
              </div>
            </div>

            <div className="pt-3">
              <div className="p-3 rounded-xl bg-surface-2 border border-accent/30 text-accent text-xs font-medium space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Award className="w-4 h-4" />
                  <span>National Innovation</span>
                </div>
                <p className="text-[11px] text-text-muted leading-tight">
                  {BRAND.hackathonBadge}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {BRAND.name}.</span>
            <span>{t("footer.copyright", "All rights reserved.")}</span>
          </div>

          {/* Hackathon Line Requirement */}
          <div className="text-center font-medium text-text">
            <span>{BRAND.hackathonBadge}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate("/terms")}
              className="hover:text-text transition-colors"
            >
              {t("footer.terms", "Terms of Service")}
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate("/privacy")}
              className="hover:text-text transition-colors"
            >
              {t("footer.privacy", "Privacy Policy")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
