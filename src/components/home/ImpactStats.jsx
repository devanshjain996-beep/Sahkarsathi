import React, { useState, useEffect, useRef } from "react";
import { IMPACT_STATS } from "../../config/stats";
import { useT } from "../../i18n/useT";
import { Activity, Target } from "lucide-react";

function useCountUp(endValue, duration = 1500, startAnimating = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimating) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setCount(endValue);
      return;
    }

    let startTime = null;
    let animationFrame;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * endValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    }

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, duration, startAnimating]);

  return count;
}

function StatItem({ stat, isVisible }) {
  const animatedValue = useCountUp(stat.targetValue, 1600, isVisible);

  return (
    <div className="relative rounded-card bg-surface border border-border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-primary/50 hover:shadow-card-hover group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase font-bold tracking-wider text-text-muted">
            {stat.label}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30">
            <Target className="w-3 h-3" />
            <span>{stat.badge}</span>
          </span>
        </div>

        <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-text my-2">
          <span className="text-primary">{stat.prefix}</span>
          <span>{isVisible ? animatedValue.toLocaleString() : stat.targetValue.toLocaleString()}</span>
          <span className="text-primary">{stat.suffix}</span>
        </div>

        <p className="text-xs text-text-muted mt-2 leading-relaxed">
          {stat.description}
        </p>
      </div>

      <div className="w-full h-1 rounded-full bg-surface-2 mt-5 overflow-hidden">
        <div
          className="h-full bg-primary/60 group-hover:bg-primary transition-all duration-700"
          style={{ width: "85%" }}
        />
      </div>
    </div>
  );
}

export default function ImpactStats() {
  const { t } = useT();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="impact" className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-semibold text-primary">
            <Activity className="w-3.5 h-3.5" />
            <span>{t("impact.badge", "Cooperative Impact Target")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text tracking-tight">
            {t("impact.title", "Measuring Real Progress")}
          </h2>

          <p className="text-sm sm:text-base text-text-muted">
            {t(
              "impact.subtitle",
              "Transforming informal gig labor into a structured, dignified, and democratic cooperative economy."
            )}
          </p>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {IMPACT_STATS.map((stat) => (
            <StatItem key={stat.id} stat={stat} isVisible={isVisible} />
          ))}
        </div>

        {/* Note indicating pilot target */}
        <p className="text-center text-xs text-text-muted mt-8">
          * All metrics reflect target capacity goals for our pilot phase clusters under cooperative federations.
        </p>
      </div>
    </section>
  );
}
