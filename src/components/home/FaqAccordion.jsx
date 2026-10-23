import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";
import { useT } from "../../i18n/useT";

export default function FaqAccordion() {
  const { t } = useT();
  const [openIndex, setOpenIndex] = useState(0); // first item open by default

  const defaultFaqs = [
    {
      q: "How does SahkarSathi verify workers and ensure home safety?",
      a: "Every craftsperson completes 4-tier verification: Aadhaar-based eKYC, independent police background verification, practical skill trade certification evaluated by cooperative master craftspeople, and formal e-Shram government linkage.",
    },
    {
      q: "How are prices calculated and why is there no surge pricing?",
      a: "Rates are established democratically by the regional trade cooperative councils based on fair living wages and material standards. Because we are a cooperative rather than a venture-backed middleman, we don't hike prices during peak hours or rainy days.",
    },
    {
      q: "How does bulk hiring and team formation work for construction or renovation?",
      a: "When you choose 'Hire a team', our platform assembles the exact composition of verified masons, electricians, carpenters, plumbers, and painters required. A certified Chief Supervisor manages site coordination, timeline, and quality so you only interact with one leader.",
    },
    {
      q: "How does escrow payment protection work?",
      a: "For larger and milestone-based projects, your advance payment is held in a cooperative-governed escrow account. Funds are released to workers only after each agreed project milestone is completed and certified by both the supervisor and the customer.",
    },
    {
      q: "What happens if I have a complaint or the work needs correction?",
      a: "All cooperative services carry a 14-day SahkarSathi Cooperative Service Guarantee. If any repair does not meet standard trade quality, the cooperative dispatches a senior master inspector to resolve it at zero additional cost.",
    },
    {
      q: "How is customer and worker personal data kept private?",
      a: "We strictly respect data privacy. Contact numbers and addresses are shared through masked tokens until a booking is accepted. Aadhaar details are processed via UIDAI-compliant OTP tokens and are never sold or used for advertising.",
    },
  ];

  const rawItems = t("faq.items");
  const items = Array.isArray(rawItems) ? rawItems : defaultFaqs;

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section id="faq" className="py-16 lg:py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-semibold text-primary">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t("faq.badge", "Answers to Common Questions")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text tracking-tight">
            {t("faq.title", "Frequently Asked Questions")}
          </h2>

          <p className="text-sm sm:text-base text-text-muted">
            {t(
              "faq.subtitle",
              "Everything you need to know about our cooperative model, pricing, and safety standards."
            )}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const headingId = `faq-heading-${idx}`;
            const panelId = `faq-panel-${idx}`;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-surface border border-border overflow-hidden transition-colors hover:border-border/80"
              >
                <button
                  type="button"
                  id={headingId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                >
                  <span className="text-base sm:text-lg font-bold text-text font-heading">
                    {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-text-muted shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary border-primary/40" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-text-muted leading-relaxed border-t border-border/50 pt-4 animate-in fade-in duration-150"
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
