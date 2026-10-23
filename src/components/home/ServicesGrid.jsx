import React from "react";
import {
  Wrench,
  Zap,
  Wind,
  PaintBucket,
  Sparkles,
  Hammer,
  Car,
  Truck,
  ArrowRight,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { PRICING, PRICING_NOTE, formatPrice } from "../../config/pricing";
import { useT } from "../../i18n/useT";

const iconMap = {
  Wrench,
  Zap,
  Wind,
  PaintBucket,
  Sparkles,
  Hammer,
  Car,
  Truck,
};

export default function ServicesGrid({ onNavigate }) {
  const { t } = useT();

  const servicesList = Object.values(PRICING);

  return (
    <section id="services" className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-semibold text-primary">
              <Tag className="w-3.5 h-3.5" />
              <span>{t("services.badge", "Standardized Cooperative Rates")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text tracking-tight">
              {t("services.title", "Popular Cooperative Services")}
            </h2>
            <p className="text-sm sm:text-base text-text-muted">
              {t(
                "services.subtitle",
                "Fair, predictable pricing governed democratically. No middleman surge commissions."
              )}
            </p>
          </div>

          <button
            onClick={() => onNavigate("/services")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover group self-start md:self-end"
          >
            <span>{t("services.viewAll", "View all services")}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service) => {
            const Icon = iconMap[service.icon] || Wrench;
            const priceFormatted = formatPrice(service);

            return (
              <div
                key={service.id}
                className="group relative rounded-card bg-surface border border-border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-card-hover"
              >
                <div>
                  {/* Top Bar: Icon + Pro Count */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-2 border border-border/80 flex items-center justify-center text-primary group-hover:scale-105 group-hover:bg-primary/10 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-text-muted bg-surface-2 px-2.5 py-1 rounded-full border border-border">
                      {service.prosCount}+ {t("services.pros", "pros")}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-text mb-1.5 font-heading group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted line-clamp-2 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Bar: Price + Find Action Link */}
                <div className="pt-4 border-t border-border/70 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-text-muted block">
                      {t("services.from", "from")}
                    </span>
                    <span className="text-base font-bold text-text font-heading">
                      {priceFormatted}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      onNavigate("/book", { service: service.name })
                    }
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors p-1.5 rounded-lg hover:bg-surface-2"
                  >
                    <span>
                      {t("services.find", "Find")} {service.name}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Note */}
        <div className="mt-8 pt-6 border-t border-border/80 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2/60 border border-border text-xs sm:text-sm text-text-muted">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
            <span>{PRICING_NOTE}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
