import React from "react";
import { BRAND } from "../../config/brand";

export default function Logo({ size = "default", className = "" }) {
  const isLarge = size === "large";
  
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* SVG Icon: Two joined hands forming a house roof */}
      <div className={`relative flex items-center justify-center rounded-xl bg-surface-2 border border-border/80 shadow-inner ${isLarge ? "w-11 h-11" : "w-9 h-9"}`}>
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={isLarge ? "w-7 h-7" : "w-5 h-5"}
          aria-hidden="true"
        >
          {/* Hands joining at the roof peak */}
          <path
            d="M18 6L7 16L10.5 19.5L18 12.5L25.5 19.5L29 16L18 6Z"
            fill="var(--primary)"
          />
          {/* Lower clasping palms framing the house hearth */}
          <path
            d="M11 20.5L18 27L25 20.5V28.5C25 29.6 24.1 30.5 23 30.5H13C11.9 30.5 11 29.6 11 28.5V20.5Z"
            fill="var(--primary-hover)"
            opacity="0.85"
          />
          {/* Cooperative core nodule */}
          <circle cx="18" cy="18.5" r="2.2" fill="var(--text)" />
        </svg>
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary animate-pulse" />
      </div>

      {/* Wordmark: "Sahkar" in text color, "Sathi" in emerald */}
      <div className="flex flex-col">
        <span className={`font-heading font-extrabold tracking-tight leading-none ${isLarge ? "text-2xl" : "text-xl"}`}>
          <span className="text-text">{BRAND.name.substring(0, 6)}</span>
          <span className="text-primary">{BRAND.name.substring(6)}</span>
        </span>
        <span className="text-[10px] tracking-wider uppercase font-medium text-text-muted mt-0.5">
          {BRAND.descriptor}
        </span>
      </div>
    </div>
  );
}
