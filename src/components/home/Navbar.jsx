import React, { useState, useEffect } from "react";
import { Menu, X, Globe, ShieldCheck, ChevronRight, User } from "lucide-react";
import Logo from "../common/Logo";
import { BRAND } from "../../config/brand";
import { useT } from "../../i18n/useT";

export default function Navbar({ onNavigate }) {
  const { t, lang, toggleLang } = useT();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: t("nav.services", "Services"), route: "/services", hash: "#services" },
    { label: t("nav.howItWorks", "How it works"), route: "#how-it-works", hash: "#how-it-works" },
    { label: t("nav.projects", "Projects"), route: "/projects", hash: "#projects" },
    { label: t("nav.contractors", "For Contractors"), route: "/contractors", hash: "#contractors" },
    { label: t("nav.verify", "Verify Worker"), route: "/verify", hash: "#verify" },
    { label: t("nav.forWorkers", "For Workers"), route: "/worker/join", hash: "#for-workers" },
  ];

  function handleLinkClick(item) {
    setMobileOpen(false);
    if (item.route.startsWith("#")) {
      const el = document.querySelector(item.route);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    onNavigate(item.route);
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-bg/60 backdrop-blur-sm border-b border-border/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label={`${BRAND.name} Home`}
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          >
            <Logo />
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-text-muted"
          >
            {navLinks.map((item) => (
              <button
                key={item.route}
                onClick={() => handleLinkClick(item)}
                className="px-3 py-2 rounded-lg hover:text-text hover:bg-surface/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              aria-label={`Switch language to ${lang === "en" ? "Hindi" : "English"}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-surface hover:bg-surface-2 text-xs font-semibold text-text transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              title="Toggle English / हिंदी"
            >
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>{lang === "en" ? "हिंदी" : "EN"}</span>
            </button>

            {/* Log in ghost button */}
            <button
              onClick={() => onNavigate("/login")}
              className="px-4 py-2 rounded-lg text-sm font-medium text-text hover:text-white hover:bg-surface-2 transition-colors border border-transparent hover:border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {t("nav.login", "Log in")}
            </button>

            {/* Book a service primary CTA */}
            <button
              onClick={() => onNavigate("/book")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-bg hover:bg-primary-hover shadow-glow-primary transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>{t("nav.bookService", "Book a service")}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Right Controls: Lang toggle + Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border bg-surface text-xs font-semibold text-text"
            >
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>{lang === "en" ? "हिंदी" : "EN"}</span>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle mobile menu"
              className="p-2 rounded-lg bg-surface border border-border text-text hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 top-20 z-50 bg-bg/95 backdrop-blur-xl border-t border-border lg:hidden flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-top-4 duration-200"
        >
          <div className="space-y-4">
            <span className="text-xs uppercase font-semibold tracking-wider text-text-muted px-2 block">
              Menu Navigation
            </span>
            <div className="flex flex-col space-y-1">
              {navLinks.map((item) => (
                <button
                  key={item.route}
                  onClick={() => handleLinkClick(item)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-left text-base font-medium text-text hover:bg-surface-2 transition-colors border border-transparent hover:border-border"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-text-muted" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-border space-y-3">
            <button
              onClick={() => {
                setMobileOpen(false);
                onNavigate("/login");
              }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-border bg-surface text-text font-medium hover:bg-surface-2"
            >
              <User className="w-4 h-4 text-primary" />
              <span>{t("nav.login", "Log in")}</span>
            </button>

            <button
              onClick={() => {
                setMobileOpen(false);
                onNavigate("/book");
              }}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-primary text-bg font-semibold hover:bg-primary-hover shadow-glow-primary"
            >
              <span>{t("nav.bookService", "Book a service")}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center text-xs text-text-muted">
              {BRAND.tagline}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
